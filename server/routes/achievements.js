//Author @shriyays

// server/routes/achievements.js - Achievements Routes (SHRIYA)
import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getDB } from '../db.js';

const router = Router();

const achievementTypes = {
    sorting_master: {
        title: "Sorting Master",
        description: "Completed all sorting algorithms",
        icon: "🏆"
    },
    perfect_score: {
        title: "Perfect Score",
        description: "Got 5/5 on a quiz",
        icon: "💯"
    },
    speed_learner: {
        title: "Speed Learner",
        description: "Completed 3 algorithms in one day",
        icon: "⚡"
    },
    week_warrior: {
        title: "Week Warrior",
        description: "Maintained a 7-day streak",
        icon: "🔥"
    },
    first_steps: {
        title: "First Steps",
        description: "Completed your first quiz",
        icon: "👣"
    },
    dedication: {
        title: "Dedication",
        description: "Completed 10 quizzes total",
        icon: "💪"
    }
};

// POST /api/achievements - Award achievement
router.post('/', async (req, res) => {
    try {
        const { userId, achievementType, algorithmId, algorithmName } = req.body;
        
        if (!userId || !achievementType) {
            return res.status(400).json({ error: 'Missing required fields: userId and achievementType' });
        }
        
        if (!achievementTypes[achievementType]) {
            return res.status(400).json({ error: 'Invalid achievement type' });
        }
        
        const db = getDB();
        
        // Check if achievement already exists
        const existing = await db.collection('achievements').findOne({ 
            userId, 
            achievementType 
        });
        
        if (existing) {
            return res.json({ 
                success: false, 
                message: 'Achievement already unlocked',
                achievement: existing
            });
        }
        
        // Create achievement
        const achievement = {
            userId,
            achievementType,
            title: achievementTypes[achievementType].title,
            description: achievementTypes[achievementType].description,
            icon: achievementTypes[achievementType].icon,
            algorithmId: algorithmId ? new ObjectId(algorithmId) : null,
            algorithmName: algorithmName || null,
            unlockedAt: new Date(),
            displayed: false
        };
        
        const result = await db.collection('achievements').insertOne(achievement);
        
        res.json({ 
            success: true, 
            achievement: { ...achievement, _id: result.insertedId },
            message: 'Achievement unlocked!'
        });
    } catch (error) {
        console.error('Error awarding achievement:', error);
        res.status(500).json({ error: 'Failed to award achievement' });
    }
});

// GET /api/achievements/:userId - Get user's achievements
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const db = getDB();
        
        const achievements = await db.collection('achievements')
            .find({ userId })
            .sort({ unlockedAt: -1 })
            .toArray();
        
        res.json(achievements);
    } catch (error) {
        console.error('Error fetching achievements:', error);
        res.status(500).json({ error: 'Failed to fetch achievements' });
    }
});

// PUT /api/achievements/:id/displayed - Mark achievement as displayed
router.put('/:id/displayed', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid achievement ID' });
        }
        
        const db = getDB();
        
        await db.collection('achievements').updateOne(
            { _id: new ObjectId(id) },
            { $set: { displayed: true } }
        );
        
        res.json({ success: true, message: 'Achievement marked as displayed' });
    } catch (error) {
        console.error('Error updating achievement:', error);
        res.status(500).json({ error: 'Failed to update achievement' });
    }
});

// GET /api/achievements/types/all - Get all achievement types (for reference)
router.get('/types/all', (req, res) => {
    res.json(achievementTypes);
});

export default router;