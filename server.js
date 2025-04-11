const express = require('express');
const db = require('./db/database');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Fitness Tracker API is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// user entry
app.post('/users', (req, res) => {
  const { username, password } = req.body;

  const sql = `
    INSERT INTO users (username, password)
    VALUES (?, ?)
  `;
  const params = [username, password];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'User created', user_id: this.lastID });
  });
});

//workout entry
app.post('/workouts', (req, res) => {
  const { user_id, date, exercise, sets, reps, weight } = req.body;

  const sql = `
    INSERT INTO workouts (user_id, date, exercise, sets, reps, weight)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [user_id, date, exercise, sets, reps, weight];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Workout added', workout_id: this.lastID });
  });
});

//progress entry
app.post('/progress', (req, res) => {
  const { user_id, weight, date } = req.body;

  const sql = `
    INSERT INTO progress (user_id, weight, date)
    VALUES (?, ?, ?)
  `;
  const params = [user_id, weight, date];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Progress entry added', id: this.lastID });
  });
});

//meal entry
app.post('/meals', (req, res) => {
  const { user_id, date, meal_name, calories } = req.body;

  const sql = `
    INSERT INTO meals (user_id, date, meal_name, calories)
    VALUES (?, ?, ?, ?)
  `;
  const params = [user_id, date, meal_name, calories];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Meal entry added', meal_id: this.lastID });
  });
});

//get workouts
app.get('/workouts', (req, res) => {
  db.all('SELECT * FROM workouts', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});
//get one workout by ID
app.get('/workouts/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM workouts WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(row);
  });
});
//put/update workout
app.put('/workouts/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, date, exercise, sets, reps, weight } = req.body;

  const sql = `
    UPDATE workouts
    SET user_id = ?, date = ?, exercise = ?, sets = ?, reps = ?, weight = ?
    WHERE id = ?
  `;
  const params = [user_id, date, exercise, sets, reps, weight, id];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json({ message: 'Workout updated' });
  });
});
//delete workout
app.delete('/workouts/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM workouts WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted' });
  });
});

//get users
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
//get one user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: 'User not found' });
    res.json(row);
  });
});
//put/update user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  db.run(
    `UPDATE users SET username = ?, password = ? WHERE id = ?`,
    [username, password, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User updated' });
    }
  );
});
//delete user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  });
});

//get progress entries
app.get('/progress', (req, res) => {
  db.all('SELECT * FROM progress', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
//get one progress entry by ID
app.get('/progress/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM progress WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: 'Progress not found' });
    res.json(row);
  });
});
//put/update progress entry
app.put('/progress/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, weight, date } = req.body;

  db.run(
    'UPDATE progress SET user_id = ?, weight = ?, date = ? WHERE id = ?',
    [user_id, weight, date, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ message: 'Progress not found' });
      res.json({ message: 'Progress updated' });
    }
  );
});
//delete progress entry
app.delete('/progress/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM progress WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Progress not found' });
    res.json({ message: 'Progress deleted' });
  });
});

//get meals
app.get('/meals', (req, res) => {
  db.all('SELECT * FROM meals', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
//get one meal by ID
app.get('/meals/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM meals WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: 'Meal not found' });
    res.json(row);
  });
});
//put/update meal entry
app.put('/meals/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, date, meal_name, calories } = req.body;

  db.run(
    'UPDATE meals SET user_id = ?, date = ?, meal_name = ?, calories = ? WHERE id = ?',
    [user_id, date, meal_name, calories, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ message: 'Meal not found' });
      res.json({ message: 'Meal updated' });
    }
  );
});
//delete meal entry
app.delete('/meals/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM meals WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Meal not found' });
    res.json({ message: 'Meal deleted' });
  });
});