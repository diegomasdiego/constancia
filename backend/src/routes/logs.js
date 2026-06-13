const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

// Log a portion
router.post('/', auth, (req, res) => {
  if (req.user.role !== 'patient') {
    return res.status(403).json({ error: 'Only patients can log portions' });
  }

  const { food_group_id, plan_id } = req.body;

  if (!food_group_id || !plan_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    db.prepare('INSERT INTO portion_logs (patient_id, food_group_id, plan_id) VALUES (?, ?, ?)').run(req.user.id, food_group_id, plan_id);
    res.status(201).json({ message: 'Portion logged' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get today's logs + remaining balance
router.get('/today', auth, (req, res) => {
  const patientId = req.user.id;
  
  // Get active plan
  const plan = db.prepare('SELECT id FROM plans WHERE patient_id = ? AND is_active = 1').get(patientId);
  if (!plan) {
    return res.status(404).json({ error: 'No active plan found' });
  }

  // Get daily allowance per food group
  const allowances = db.prepare(`
    SELECT pp.food_group_id, pp.daily_allowance, fg.name, fg.icon, fg.color
    FROM plan_portions pp
    JOIN food_groups fg ON pp.food_group_id = fg.id
    WHERE pp.plan_id = ?
  `).all(plan.id);

  // Get today's logs
  const today = new Date().toISOString().split('T')[0];
  const logs = db.prepare(`
    SELECT food_group_id, COUNT(*) as count
    FROM portion_logs
    WHERE patient_id = ? AND plan_id = ? AND date(logged_at) = ?
    GROUP BY food_group_id
  `).all(patientId, plan.id, today);

  // Calculate remaining balance
  const summary = allowances.map(allowance => {
    const log = logs.find(l => l.food_group_id === allowance.food_group_id);
    const consumed = log ? log.count : 0;
    return {
      ...allowance,
      consumed,
      remaining: Math.max(0, allowance.daily_allowance - consumed)
    };
  });

  res.json({ plan_id: plan.id, date: today, summary });
});

// Delete last portion log for a food group today
router.delete('/last', auth, (req, res) => {
  if (req.user.role !== 'patient') {
    return res.status(403).json({ error: 'Only patients can delete logs' });
  }

  const { food_group_id } = req.query;
  if (!food_group_id) {
    return res.status(400).json({ error: 'Missing food_group_id' });
  }

  const today = new Date().toISOString().split('T')[0];
  
  try {
    const lastLog = db.prepare(`
      SELECT id FROM portion_logs 
      WHERE patient_id = ? AND food_group_id = ? AND date(logged_at) = ?
      ORDER BY logged_at DESC LIMIT 1
    `).get(req.user.id, food_group_id, today);

    if (lastLog) {
      db.prepare('DELETE FROM portion_logs WHERE id = ?').run(lastLog.id);
      res.json({ message: 'Last portion log deleted' });
    } else {
      res.status(404).json({ error: 'No logs found for today' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
