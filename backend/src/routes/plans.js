const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a plan (Nutritionist only)
router.post('/', auth, (req, res) => {
  if (req.user.role !== 'nutritionist') {
    return res.status(403).json({ error: 'Only nutritionists can create plans' });
  }

  const { patient_id, portions } = req.body; // portions: [{ food_group_id, daily_allowance }, ...]

  if (!patient_id || !portions || !Array.isArray(portions)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transaction = db.transaction(() => {
    // Deactivate previous plans for this patient
    db.prepare('UPDATE plans SET is_active = 0 WHERE patient_id = ?').run(patient_id);

    // Create new plan
    const info = db.prepare('INSERT INTO plans (nutritionist_id, patient_id) VALUES (?, ?)').run(req.user.id, patient_id);
    const planId = info.lastInsertRowid;

    // Insert portions
    const insertPortion = db.prepare('INSERT INTO plan_portions (plan_id, food_group_id, daily_allowance) VALUES (?, ?, ?)');
    for (const portion of portions) {
      insertPortion.run(planId, portion.food_group_id, portion.daily_allowance);
    }

    return planId;
  });

  try {
    const planId = transaction();
    res.status(201).json({ id: planId, message: 'Plan created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get active plan for current user (Patient)
router.get('/active', auth, (req, res) => {
  const plan = db.prepare('SELECT * FROM plans WHERE patient_id = ? AND is_active = 1').get(req.user.id);
  
  if (!plan) {
    return res.status(404).json({ error: 'No active plan found' });
  }

  const portions = db.prepare(`
    SELECT pp.*, fg.name, fg.icon, fg.color 
    FROM plan_portions pp
    JOIN food_groups fg ON pp.food_group_id = fg.id
    WHERE pp.plan_id = ?
  `).all(plan.id);

  res.json({ ...plan, portions });
});

// Get active plan for a specific patient (Nutritionist)
router.get('/patient/:id', auth, (req, res) => {
  if (req.user.role !== 'nutritionist') {
    return res.status(403).json({ error: 'Only nutritionists can access this' });
  }

  const patientId = req.params.id;
  const plan = db.prepare('SELECT * FROM plans WHERE patient_id = ? AND is_active = 1').get(patientId);
  
  if (!plan) {
    return res.status(404).json({ error: 'No active plan found for this patient' });
  }

  const portions = db.prepare(`
    SELECT pp.*, fg.name, fg.icon, fg.color 
    FROM plan_portions pp
    JOIN food_groups fg ON pp.food_group_id = fg.id
    WHERE pp.plan_id = ?
  `).all(plan.id);

  res.json({ ...plan, portions });
});

module.exports = router;
