const express = require('express');
const db = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

// Get list of patients for this nutritionist
router.get('/patients', auth, (req, res) => {
  if (req.user.role !== 'nutritionist') {
    return res.status(403).json({ error: 'Only nutritionists can access this' });
  }

  // In a real app, there might be a nutritionist_patients table
  // For now, let's assume any patient can be seen if they have a plan with this nutritionist
  // Or just list all patients for simplicity in this MVP
  const patients = db.prepare('SELECT id, name, email FROM users WHERE role = "patient"').all();
  res.json(patients);
});

// Get patient progress
router.get('/patient/:id/progress', auth, (req, res) => {
  if (req.user.role !== 'nutritionist') {
    return res.status(403).json({ error: 'Only nutritionists can access this' });
  }

  const patientId = req.params.id;
  const plan = db.prepare('SELECT id FROM plans WHERE patient_id = ? AND is_active = 1').get(patientId);
  
  if (!plan) {
    return res.status(404).json({ error: 'No active plan found for this patient' });
  }

  // Get logs for the last 7 days
  const progress = db.prepare(`
    SELECT date(logged_at) as date, food_group_id, COUNT(*) as count
    FROM portion_logs
    WHERE patient_id = ? AND plan_id = ? AND logged_at >= date('now', '-7 days')
    GROUP BY date, food_group_id
  `).all(patientId, plan.id);

  res.json({ patient_id: patientId, plan_id: plan.id, progress });
});

module.exports = router;
