const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Routes to serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/cars', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cars.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// ✅ Dealer login route fixed
app.get('/dealer', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dealer-login.html'));
});

// ✅ Dashboard route
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// ✅ Uploads route (for images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Simple POST handler for messages (temporary success)
app.post('/send-message', (req, res) => {
  console.log('Message received:', req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
