// server/seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// IMPORTANT: We import the Exam model that you just updated!
import Exam from "./models/exam.model.js";

// --- Setup ---
dotenv.config(); // Load environment variables from .env file

// This is a standard way to get the directory name in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This creates the full, correct path to your data folder
const dataDir = path.join(__dirname, "exam-data");

// --- Main Seeding Function ---
const seedDatabase = async () => {
  // 1. CONNECT TO MONGODB
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in your .env file!");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding...");

    // 2. READ ALL JSON FILES
    const files = fs.readdirSync(dataDir);
    console.log(`🔍 Found ${files.length} files in exam-data/`);

    for (const file of files) {
      // Process only .json files
      if (path.extname(file) === ".json") {
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const examData = JSON.parse(fileContent);

        // 3. SAVE EACH FILE TO THE DATABASE
        // This is the magic part. It finds an exam by its 'shortName'.
        // - If it finds one, it UPDATES it.
        // - If it doesn't find one, it CREATES it.
        // This means you can run this script many times without creating duplicates!
        await Exam.findOneAndUpdate(
          { shortName: examData.shortName }, // Find document by this unique key
          examData, // The data to insert/update
          {
            upsert: true, // Create a new document if one doesn't exist
            runValidators: true, // Ensure the data follows your schema rules
          }
        );
        console.log(`  -> Successfully seeded/updated: ${examData.name}`);
      }
    }

    console.log("🏆 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error during database seeding:", error);
  } finally {
    // 4. DISCONNECT
    // Always close the connection when the script is done.
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected.");
  }
};

// --- RUN THE SCRIPT ---
seedDatabase();
