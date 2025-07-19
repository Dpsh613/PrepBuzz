// Step 3: How to Use the Data Later
// When you have finished collecting the data for all 29 exams, you will have a folder full of clean JSON files. Now, if you need to load them all into your application or database, you can easily combine them with another simple, one-off script.

import fs from "fs/promises";
import path from "path";

async function combineData() {
  const dataDir = "exam-data";
  const allExamData = [];

  // Read all file names from the directory
  const files = await fs.readdir(dataDir);

  for (const file of files) {
    // Make sure we're only reading .json files
    if (path.extname(file) === ".json") {
      const filePath = path.join(dataDir, file);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const jsonData = JSON.parse(fileContent);
      allExamData.push(jsonData);
    }
  }

  // Now you have a single array with all 29 exam objects
  console.log(`Combined ${allExamData.length} exam files.`);

  // You can save this combined array to a single file if you want
  await fs.writeFile(
    "all_exams_combined.json",
    JSON.stringify(allExamData, null, 2)
  );
  console.log("✅ Created a single combined file: all_exams_combined.json");

  // Or, you could directly use 'allExamData' to insert into a database here.
}

//combineData();
