//Author @shriyays

// server/routes/leaderboard.js - Leaderboard Routes (SHRIYA)
const express = require('express');
const { getDB } = require('../db');

const router = express.Router();

// GET /api/leaderboard - Get top learners
router.get('/', async (req, res) => {
    try {
        const { limit = 10, sortBy = 'algorithmsCompleted' } = req.query;
        const db = getDB();
        
        // Aggregate user progress to calculate stats
        const leaderboard = await db.collection('user_progress').aggregate([
            {
                $group: {
                    _id: '$userId',
                    algorithmsCompleted: {
                        $sum: { $cond: ['$mastered', 1, 0] }
                    },
                    totalTimeSpent: { $sum: '$timeSpent' }
                }
            },
            {
                $lookup: {
                    from: 'quiz_results',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'quizzes'
                }
            },
            {
                $addFields: {
                    averageScore: {
                        $cond: [
                            { $gt: [{ $size: '$quizzes' }, 0] },
                            { $avg: '$quizzes.score' },
                            0
                        ]
                    },
                    totalQuizzes: { $size: '$quizzes' }
                }
            },
            {
                $project: {
                    userId: '$_id',
                    algorithmsCompleted: 1,
                    totalTimeSpent: 1,
                    averageScore: { $round: ['$averageScore', 1] },
                    totalQuizzes: 1,
                    _id: 0
                }
            },
            {
                $sort: { 
                    [sortBy]: -1,
                    averageScore: -1 // Secondary sort
                }
            },
            {
                $limit: parseInt(limit)
            }
        ]).toArray();
        
        // Add rank to each user
        const rankedLeaderboard = leaderboard.map((user, index) => ({
            rank: index + 1,
            ...user
        }));
        
        res.json(rankedLeaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

// GET /api/leaderboard/:userId/rank - Get specific user's rank
router.get('/:userId/rank', async (req, res) => {
    try {
        const { userId } = req.params;
        const { sortBy = 'algorithmsCompleted' } = req.query;
        const db = getDB();
        
        // Get all users sorted
        const allUsers = await db.collection('user_progress').aggregate([
            {
                $group: {
                    _id: '$userId',
                    algorithmsCompleted: {
                        $sum: { $cond: ['$mastered', 1, 0] }
                    },
                    totalTimeSpent: { $sum: '$timeSpent' }
                }
            },
            {
                $lookup: {
                    from: 'quiz_results',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'quizzes'
                }
            },
            {
                $addFields: {
                    averageScore: {
                        $cond: [
                            { $gt: [{ $size: '$quizzes' }, 0] },
                            { $avg: '$quizzes.score' },
                            0
                        ]
                    }
                }
            },
            {
                $project: {
                    userId: '$_id',
                    algorithmsCompleted: 1,
                    totalTimeSpent: 1,
                    averageScore: { $round: ['$averageScore', 1] },
                    _id: 0
                }
            },
            {
                $sort: { 
                    [sortBy]: -1,
                    averageScore: -1
                }
            }
        ]).toArray();
        
        // Find user's rank
        const userIndex = allUsers.findIndex(u => u.userId === userId);
        
        if (userIndex === -1) {
            return res.json({ 
                rank: null, 
                message: 'User not found in leaderboard',
                totalUsers: allUsers.length
            });
        }
        
        res.json({
            rank: userIndex + 1,
            totalUsers: allUsers.length,
            userStats: allUsers[userIndex]
        });
    } catch (error) {
        console.error('Error fetching user rank:', error);
        res.status(500).json({ error: 'Failed to fetch user rank' });
    }
});

module.exports = router;