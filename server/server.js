const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');
const algorithmsRouter = require('./routes/algorithms');

console.log('🎀 Starting AlgoLearn server...');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

console.log('✅ Middleware loaded');

// Connect to MongoDB
connectDB();

console.log('✅ Database connection initiated');

// API Routes
app.use('/api/algorithms', algorithmsRouter);

console.log('✅ Routes loaded');

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:3000`);
    console.log(`💕 Frontend: http://localhost:3000/index.html`);
});