require('dotenv').config(); // Load environment variables at the top

const express = require('express'); // Import Express
const cors = require('cors'); // Import CORS middleware
const connectDB = require('./config/db'); // Import the database connection function
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const summaryRoutes = require('./routes/summaryRoutes'); // Import summarization routes
const historyRoutes = require('./routes/historyRoutes'); // Import history routes
const authMiddleware = require('./middleware/authMiddleware')
const cookieParser = require('cookie-parser');


// Initialize the Express app
const app = express();

// Log the MongoDB URI for debugging purposes (ensure sensitive data isn't exposed in production)
if (process.env.NODE_ENV !== 'production') {
  console.log('MongoDB URI:', process.env.MONGOOSE_URI); // Log URI only in non-production environments
}

// Connect to MongoDB
connectDB();
app.use(cookieParser());

// Middleware
app.use(
  cors({
    origin: true, // Allow frontend URL from environment variable or default to localhost
    methods: ["GET", "POST", "PUT", "DELETE"], // Define allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers for requests
    credentials: true, // Enable cookies and authentication tokens to be sent with requests
  })
);

app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/pam", (req, res) => {
  return res.status(200).json({ "message": "pampam" });
});
app.use('/api/auth', authRoutes);           // Authentication routes
app.use('/api/summary', summaryRoutes);     // Summarization routes
app.use('/api/history', authMiddleware,historyRoutes);     // History routes

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Set the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});



