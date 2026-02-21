import process from 'process';
import { MongoClient } from 'mongodb'; 

let db;
let client;



async function connectDB() {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        console.log('🔄 Connecting to MongoDB...');
        client = new MongoClient(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000,
        });
        
        await client.connect();
        db = client.db('algolearn');
        console.log('✅ Connected to MongoDB');
        
        // Seed data on first run
        await seedData();
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.log('⚠️  Running without database (some features will not work)');
        // Don't exit - let server run anyway
    }
}
async function seedData() {
    try {
        if (!db) return;
        
        const algorithmsCollection = db.collection('algorithms');
        
        // FORCE DELETE OLD DATA
        console.log('🗑️  Deleting old algorithm data...');
        await algorithmsCollection.deleteMany({});
        
        // RESEED WITH NEW DATA
        console.log('📦 Seeding fresh algorithm data...');
        const { algorithmData } = await import('./data/algorithmData.js');
        await algorithmsCollection.insertMany(algorithmData);
        console.log('✅ Seeded 4 algorithms with complete pseudocode');
        
    } catch (error) {
        console.error('❌ Error seeding data:', error.message);
    }
}

function getDB() {
    if (!db) {
        throw new Error('Database not connected');
    }
    return db;
}

export { connectDB, getDB };