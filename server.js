// server.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3000;

// Storage setup for Multer (for image uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views", "index.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views", "dashboard.html"));
});

app.post("/upload", upload.single("carImage"), (req, res) => {
  res.redirect("/dashboard");
});

app.get("/images", (req, res) => {
  const dirPath = path.join(process.cwd(), "public", "uploads");
  const files = fs.readdirSync(dirPath);
  const imageFiles = files.filter((f) =>
    [".jpg", ".jpeg", ".png", ".gif"].includes(path.extname(f).toLowerCase())
  );
  res.json(imageFiles);
});

// Start server
app.listen(PORT, () => console.log(`🚗 Server running on http://localhost:${PORT}`));
