const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'GTAvicecity123!',
  database: 'db',
});

// Root path route
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Latest entries route
app.get('/latestEntries', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, company_name,ComplianceStatus,SummaryText FROM compliance_data ORDER BY id DESC LIMIT 1');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
