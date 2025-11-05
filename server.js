const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// === ROUTES ===

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Cars
app.get('/cars', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cars.html'));
});

// Contact
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Dealer login
app.get('/dealer', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dealer-login.html'));
});

// Dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Upload cars (view)
app.get('/upload-cars', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'upload-cars.html'));
});

// Handle car uploads
app.post('/upload-car', upload.single('carImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  console.log('Car image uploaded:', req.file.filename);
  res.status(200).send('Car uploaded successfully!');
});

// Contact form
app.post('/send-message', (req, res) => {
  console.log('Message received:', req.body);
  res.sendStatus(200);
});

// Server
app.listen(PORT, () => console.log(`🚗 Millionare Motors running on port ${PORT}`));
