// server.js
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Serve static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Route: Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route: Dashboard form
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

// Route: Handle car upload
app.post("/upload", upload.single("image"), (req, res) => {
  const { name, year, price, description, password } = req.body;
  const imagePath = "uploads/" + req.file.filename;

  // Password check
  if (password !== ADMIN_PASSWORD) {
    fs.unlinkSync(req.file.path); // delete uploaded image
    return res.send("<h3 style='color:red;'>❌ Incorrect password.</h3><a href='/dashboard'>Try again</a>");
  }

  // Add car details to cars.html
  const carCard = `
    <div class="car-card">
      <img src="${imagePath}" alt="${name}">
      <h3>${name}</h3>
      <p>${description}</p>
      <p><strong>Year:</strong> ${year} | <strong>Price:</strong> ${price}</p>
    </div>
  `;

  const carsFile = path.join(__dirname, "public", "cars.html");
  fs.appendFileSync(carsFile, carCard);

  res.send("<h3 style='color:green;'>✅ Car uploaded successfully!</h3><a href='/'>Go Home</a>");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));