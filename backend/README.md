# Porcio API

App backend for Porcio, a nutrition portion-tracking app.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **Auth**: JWT

## Getting Started
1. `npm install`
2. Create a `.env` file (see `.env.example`)
3. `npm start`

## API Endpoints

### Auth
- `POST /api/auth/register`: Register a new user (`name`, `email`, `password`, `role`).
- `POST /api/auth/login`: Login and receive a JWT token (`email`, `password`).

### Food Groups
- `GET /api/food-groups`: Retrieve all food groups with their icons and colors.

### Plans
- `POST /api/plans`: Create a new portion plan for a patient (Nutritionist only).
  - Body: `{ patient_id, portions: [{ food_group_id, daily_allowance }, ...] }`
- `GET /api/plans/active`: Get the currently active plan for the logged-in patient.
- `GET /api/plans/patient/:id`: Get the active plan for a specific patient (Nutritionist only).

### Portion Logs
- `POST /api/logs`: Log a consumed portion.
  - Body: `{ food_group_id, plan_id }`
- `GET /api/logs/today`: Get today's logs and remaining portion balance.

### Nutritionist Dashboard
- `GET /api/nutritionist/patients`: List all patients.
- `GET /api/nutritionist/patient/:id/progress`: Get a patient's portion tracking progress for the last 7 days.
