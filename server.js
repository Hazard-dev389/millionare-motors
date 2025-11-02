const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Serve specific HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/cars', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cars.html'));
});

app.get('/dealer-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dealer-login.html'));
});

// Example image upload or contact route (optional)
app.post('/send', (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

// Run the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
