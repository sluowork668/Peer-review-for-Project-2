const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../db');

const router = express.Router();

// GET /api/algorithms - Get all algorithms
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const algorithms = await db.collection('algorithms').find({}).toArray();
        res.json(algorithms);
    } catch (error) {
        console.error('Error fetching algorithms:', error);
        res.status(500).json({ error: 'Failed to fetch algorithms' });
    }
});

// GET /api/algorithms/:id - Get single algorithm by ID
router.get('/:id', async (req, res) => {
    try {
        const db = getDB();
        const algorithm = await db.collection('algorithms').findOne({ 
            _id: new ObjectId(req.params.id) 
        });
        
        if (!algorithm) {
            return res.status(404).json({ error: 'Algorithm not found' });
        }
        
        res.json(algorithm);
    } catch (error) {
        console.error('Error fetching algorithm:', error);
        res.status(500).json({ error: 'Failed to fetch algorithm' });
    }
});

module.exports = router;