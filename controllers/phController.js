import db from '../db.js';
import moment from 'moment-timezone';

const jakartaTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

export const getReadings = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM readings ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('DB Read Error:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
};

export const addReading = async (req, res) => {
  try {
    const { ph, temperature, tds } = req.body;
    if (ph == null || temperature == null || tds == null) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    await db.query(
      'INSERT INTO readings (ph, temperature, tds, created_at) VALUES (?, ?, ?, ?)',
      [ph, temperature, tds, jakartaTime]
    );

    res.status(201).json({ message: 'Reading stored' });
  } catch (err) {
    console.error('Insert Error:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
};
