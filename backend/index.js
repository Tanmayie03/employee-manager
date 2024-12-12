import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import loginRouter from "./routes/login.js";
import employeeRouter from "./routes/employee.js";
import connectDB from "./config/mongodb.js";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend port
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow common HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    credentials: true, // Allow credentials (cookies, session)
  })
);

app.use("/api/login", loginRouter);
app.use("/api/employee", employeeRouter);
app.get("/api/test", (req, res) => {
  res.json({ message: "Proxy works!" });
});
const PORT = process.env.PORT || 5000;

// Logging request
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
