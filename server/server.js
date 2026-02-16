require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');

// Import all route files
const algorithmsRouter = require('./routes/algorithms');
const quizzesRouter = require('./routes/quizzes');
const progressRouter = require('./routes/progress');
const achievementsRouter = require('./routes/achievements');
const leaderboardRouter = require('./routes/leaderboard');

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
app.use('/api/quiz-results', quizzesRouter);
app.use('/api/progress', progressRouter);
app.use('/api/achievements', achievementsRouter);
app.use('/api/leaderboard', leaderboardRouter);

console.log('✅ Routes loaded');

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'AlgoLearn API is running',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:3000`);
    console.log(`💕 Frontend: http://localhost:3000/index.html`);
    console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard.html`);
    console.log(`🏆 Leaderboard: http://localhost:${PORT}/leaderboard.html`);
    console.log(`🧪 Quiz Test: http://localhost:${PORT}/quiz.html?name=Bubble Sort`);
    console.log(`\n✨ All backend routes active!`);
});