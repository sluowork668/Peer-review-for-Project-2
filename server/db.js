import process from "process";
import { MongoClient } from "mongodb";

let db;
let client;

async function connectDB() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    console.log("🔄 Connecting to MongoDB...");
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    await client.connect();
    db = client.db("algolearn");
    console.log("✅ Connected to MongoDB");

    // Seed data on first run
    await seedData();
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.log("⚠️  Running without database (some features will not work)");
    // Don't exit - let server run anyway
  }
}
async function seedData() {
  try {
    if (!db) return;

    const algorithmsCollection = db.collection("algorithms");

    // FORCE DELETE OLD DATA
    console.log("🗑️  Deleting old algorithm data...");
    await algorithmsCollection.deleteMany({});

    // RESEED WITH NEW DATA
    console.log("📦 Seeding fresh algorithm data...");
    const { algorithmData } = await import("./data/algorithmData.js");
    await algorithmsCollection.insertMany(algorithmData);
    console.log("✅ Seeded 4 algorithms with complete pseudocode");
    
    // SEED 1000+ USER PROGRESS RECORDS
    const progressCollection = db.collection("user_progress");
    const progressCount = await progressCollection.countDocuments();
    
    if (progressCount < 1000) {
      console.log("📊 Generating 1000+ user progress records...");
      
      const userProgress = [];
      const algorithmIds = [
        '000000000000000000000001',
        '000000000000000000000002',
        '000000000000000000000003',
        '000000000000000000000004'
      ];
      
      // Generate 1200 records (300 per algorithm)
      for (let i = 0; i < 1200; i++) {
        userProgress.push({
          userId: `user_${Math.floor(i / 4)}`,
          algorithmId: algorithmIds[i % 4],
          completed: Math.random() > 0.3,
          timeSpent: Math.floor(Math.random() * 600) + 60,
          visualizationCount: Math.floor(Math.random() * 5) + 1,
          lastAccessed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          mastered: Math.random() > 0.5,
        });
      }
      
      await progressCollection.insertMany(userProgress);
      console.log(`✅ Seeded ${userProgress.length} user progress records`);
    } else {
      console.log(`✅ Database already has ${progressCount} progress records`);
    }
    
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
}

export { connectDB, getDB };
