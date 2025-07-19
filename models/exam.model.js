// server/models/exam.model.js
import mongoose from "mongoose";
const { Schema } = mongoose;

// --- Sub-Schemas

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  source: { type: String, default: "Amazon" },
  link: { type: String },
});

const VideoSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  channelName: String,
});

const TimelineSchema = new Schema({
  notificationDate: String,
  applicationStartDate: String,
  applicationEndDate: String,
  examDate: String,
  resultDate: String,
});

const ExamPatternStageSchema = new Schema({
  name: String,
  description: String,
});

const ExamPatternSchema = new Schema({
  mode: { type: String },
  stages: [ExamPatternStageSchema],
  negativeMarking: { type: Boolean, default: false },
  markingScheme: String,
});

const SyllabusItemSchema = new Schema({
  name: String,
  topics: [String],
});

// --- The Main Exam Schema ---
const ExamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    shortName: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    conductingBody: { type: String, required: true },
    officialWebsite: { type: String, required: true },
    eligibility: {
      ageLimit: String,
      educationalQualification: String,
      nationality: String,
      numberOfAttempts: mongoose.Schema.Types.Mixed,
    },
    timeline: TimelineSchema,
    examPattern: ExamPatternSchema,
    syllabus: [SyllabusItemSchema],
    latestUpdate: {
      title: String,
      date: String,
      link: String,
    },
    books: [BookSchema],
    youtubeVideos: [VideoSchema],
    lastScraped: { type: Date },
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", ExamSchema);

export default Exam;
