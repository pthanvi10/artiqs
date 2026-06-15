import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import imgRoutes from './routes/imgRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://artiqs-drab.vercel.app/"], // <-- Put your exact Vercel URL here
  credentials: true
})); // Allows your React frontend to communicate with this API
app.use(express.json()); // Allows the server to accept JSON data in the body

app.use('/api/auth', authRoutes);
app.use('/api/image', imgRoutes);

// A simple test route to verify the server is working
app.get('/', (req, res) => {
  res.send('Artiqs API is running perfectly!');
});

// Define the port (defaults to 5000 if not specified in .env)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Artiqs Server is running on http://localhost:${PORT}`);
});

