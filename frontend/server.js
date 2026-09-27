const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const response = await axios.post(`${BACKEND_URL}/api/submit`, {
      name,
      email,
      message
    });
    res.render('result', { result: response.data });
  } catch (error) {
    res.status(500).render('result', {
      result: {
        status: 'error',
        message: 'Could not communicate with Flask backend: ' + error.message
      }
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend running on http://0.0.0.0:${PORT}`);
});
