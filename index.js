const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const moment = require('moment-timezone');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/api/ph', (req, res) => {
  const { ph, temperature } = req.body;

  if (ph == null || temperature == null) {
    return res.status(400).json({ error: 'Missing pH or temperature' });
  }

  const sql = 'INSERT INTO readings (ph, temperature) VALUES (?, ?)';
  db.query(sql, [ph, temperature], (err, result) => {
    if (err) {
      console.error('DB Insert Error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({ message: 'Data saved', id: result.insertId });
  });
});

app.get('/api/ph', (req, res) => {
    const sql = 'SELECT * FROM readings ORDER BY created_at DESC';
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error('DB Read Error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      const formatted = results.map(row => ({
        ...row,
        created_at: moment(row.created_at).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
      }));
  
      res.json(formatted);
    });
  });
  

const PORT = 3000;
app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:3000');
  });
