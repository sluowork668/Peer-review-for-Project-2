//Author @shriyays
// server/routes/quizzes.js - Quiz Routes (SHRIYA)
const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db');

const router = express.Router();

// POST /api/quiz-results - Save quiz result
router.post('/', async (req, res) => {
    try {
        const { userId, algorithmId, algorithmName, questions, score, totalQuestions, percentage, completedAt } = req.body;
        
        // Validate required fields
        if (!userId || !algorithmName || score === undefined || !totalQuestions) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const db = getDB();
        const quizResult = {
            userId,
            algorithmId: (algorithmId && ObjectId.isValid(algorithmId)) ? new ObjectId(algorithmId) : null,
            algorithmName,
            questions: questions || [],
            score,
            totalQuestions,
            percentage: percentage || Math.round((score / totalQuestions) * 100),
            completedAt: completedAt ? new Date(completedAt) : new Date()
        };
        
        const result = await db.collection('quiz_results').insertOne(quizResult);
        
        res.json({ 
            success: true, 
            resultId: result.insertedId,
            message: 'Quiz result saved successfully'
        });
    } catch (error) {
        console.error('Error saving quiz result:', error);
        res.status(500).json({ error: 'Failed to save quiz result' });
    }
});

// GET /api/quiz-results/:userId - Get user's quiz history
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const db = getDB();
        
        const results = await db.collection('quiz_results')
            .find({ userId })
            .sort({ completedAt: -1 })
            .toArray();
        
        res.json(results);
    } catch (error) {
        console.error('Error fetching quiz results:', error);
        res.status(500).json({ error: 'Failed to fetch quiz results' });
    }
});

// GET /api/quiz-results/:userId/:algorithmName - Get quiz results for specific algorithm
router.get('/:userId/:algorithmName', async (req, res) => {
    try {
        const { userId, algorithmName } = req.params;
        const db = getDB();
        
        const results = await db.collection('quiz_results')
            .find({ userId, algorithmName })
            .sort({ completedAt: -1 })
            .toArray();
        
        res.json(results);
    } catch (error) {
        console.error('Error fetching algorithm quiz results:', error);
        res.status(500).json({ error: 'Failed to fetch algorithm quiz results' });
    }
});

module.exports = router;