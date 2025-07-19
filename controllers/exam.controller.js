import Exam from "../models/exam.model.js";
import asyncHandler from "express-async-handler";

// Get all exams
export const getAllExams = asyncHandler(async (req, res) => {
  const exams = await Exam.find().select("name shortName description");
  res.status(200).json(exams);
});

// Get one specific exam by its shortName (for the detail page)
export const getExamByShortName = asyncHandler(async (req, res) => {
  const exam = await Exam.findOne({ shortName: req.params.shortName });
  if (!exam) {
    // We still need to handle 404s specifically
    res.status(404);
    throw new Error("Exam not found"); // This error gets passed to the global handler
  }
  res.status(200).json(exam);
});
