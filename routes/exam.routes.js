import express from "express";
import {
  getAllExams,
  getExamByShortName,
} from "../controllers/exam.controller.js";

const router = express.Router();

// Route to get all exams
// GET request to /api/exams/
router.get("/", getAllExams);

// Route to get a single exam by its shortName
// GET request to /api/exams/upsc-cse (for example)
router.get("/:shortName", getExamByShortName);

export default router;
