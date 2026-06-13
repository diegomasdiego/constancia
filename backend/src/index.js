require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const foodGroupRoutes = require('./routes/foodGroups');
const planRoutes = require('./routes/plans');
const logRoutes = require('./routes/logs');
const nutritionistRoutes = require('./routes/nutritionist');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Porcio API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/food-groups', foodGroupRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/nutritionist', nutritionistRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
