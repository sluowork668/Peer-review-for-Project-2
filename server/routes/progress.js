//Author @shriyays

// server/routes/progress.js - Progress Routes (SHRIYA)
const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db');

const router = express.Router();

// POST /api/progress - Update user progress
router.post('/', async (req, res) => {
    try {
        const { userId, algorithmId, algorithmName, completed, timeSpent, visualizationCount, mastered } = req.body;
        
        // Validate required fields
        if (!userId || !algorithmName) {
            return res.status(400).json({ error: 'Missing required fields: userId and algorithmName' });
        }
        
        const db = getDB();
        
        // Check if progress already exists
        const existingProgress = await db.collection('user_progress').findOne({ 
            userId, 
            algorithmName 
        });
        
        if (existingProgress) {
            // Update existing progress
            const update = {
                completed: completed !== undefined ? completed : existingProgress.completed,
                timeSpent: timeSpent ? existingProgress.timeSpent + timeSpent : existingProgress.timeSpent,
                visualizationCount: visualizationCount ? existingProgress.visualizationCount + 1 : existingProgress.visualizationCount,
                mastered: mastered !== undefined ? mastered : existingProgress.mastered,
                lastAccessed: new Date()
            };
            
            await db.collection('user_progress').updateOne(
                { userId, algorithmName },
                { $set: update }
            );
            
            res.json({ success: true, message: 'Progress updated' });
        } else {
            // Create new progress entry
            const newProgress = {
                userId,
                algorithmId: algorithmId ? new ObjectId(algorithmId) : null,
                algorithmName,
                completed: completed || false,
                timeSpent: timeSpent || 0,
                visualizationCount: visualizationCount || 1,
                mastered: mastered || false,
                lastAccessed: new Date(),
                createdAt: new Date()
            };
            
            await db.collection('user_progress').insertOne(newProgress);
            
            res.json({ success: true, message: 'Progress created' });
        }
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

// GET /api/progress/:userId - Get user's progress
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const db = getDB();
        
        const progress = await db.collection('user_progress')
            .find({ userId })
            .toArray();
        
        res.json(progress);
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).json({ error: 'Failed to fetch progress' });
    }
});

// DELETE /api/progress/:userId/:algorithmName - Delete specific algorithm progress
router.delete('/:userId/:algorithmName', async (req, res) => {
    try {
        const { userId, algorithmName } = req.params;
        const db = getDB();
        
        await db.collection('user_progress').deleteOne({ userId, algorithmName });
        
        res.json({ success: true, message: 'Progress deleted' });
    } catch (error) {
        console.error('Error deleting progress:', error);
        res.status(500).json({ error: 'Failed to delete progress' });
    }
});

module.exports = router;