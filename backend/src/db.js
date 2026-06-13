const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../porcio.db');
const db = new Database(dbPath);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT CHECK(role IN ('patient', 'nutritionist')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS food_groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    icon TEXT,
    color TEXT,
    order_index INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nutritionist_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    date TEXT, -- YYYY-MM-DD
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nutritionist_id) REFERENCES users(id),
    FOREIGN KEY (patient_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS plan_portions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id INTEGER NOT NULL,
    food_group_id INTEGER NOT NULL,
    daily_allowance INTEGER NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES plans(id),
    FOREIGN KEY (food_group_id) REFERENCES food_groups(id)
  );

  CREATE TABLE IF NOT EXISTS portion_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    food_group_id INTEGER NOT NULL,
    plan_id INTEGER NOT NULL,
    logged_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES users(id),
    FOREIGN KEY (food_group_id) REFERENCES food_groups(id),
    FOREIGN KEY (plan_id) REFERENCES plans(id)
  );
`);

// Seed food groups if empty
const foodGroupsCount = db.prepare('SELECT COUNT(*) as count FROM food_groups').get();
if (foodGroupsCount.count === 0) {
  const insertFoodGroup = db.prepare('INSERT INTO food_groups (name, icon, color, order_index) VALUES (?, ?, ?, ?)');
  const defaultGroups = [
    ['Cereales', '🌾', '#F4D03F', 1],
    ['Frutas', '🍎', '#E74C3C', 2],
    ['Lácteos', '🥛', '#AED6F1', 3],
    ['Proteínas', '🥩', '#EB984E', 4],
    ['Vegetales', '🥦', '#52BE80', 5],
    ['Grasas', '🥑', '#F5B041', 6],
    ['Azúcares', '🍩', '#AF7AC5', 7]
  ];
  
  for (const group of defaultGroups) {
    insertFoodGroup.run(...group);
  }
}

module.exports = db;
