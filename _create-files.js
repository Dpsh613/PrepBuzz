// _create-files.js
import fs from "fs/promises";
import path from "path";

// Paste your list here. This is its only purpose.
const EXAMS_TO_SCRAPE = [
  {
    id: 1,
    name: "JEE (Joint Entrance Examination - Main & Advanced)",
    shortName: "jee-main-advanced",
  },
  {
    id: 2,
    name: "NEET-UG (National Eligibility cum Entrance Test)",
    shortName: "neet-ug",
  },
  { id: 3, name: "CUET (Common University Entrance Test)", shortName: "cuet" },

  {
    id: 4,
    name: "UGC-NET (National Eligibility Test)",
    shortName: "ugc-net",
  },
  {
    id: 5,
    name: "GATE (Graduate Aptitude Test in Engineering)",
    shortName: "gate",
  },
  {
    id: 6,
    name: "CAT (Common Admission Test)",
    shortName: "cat",
  },
  {
    id: 7,
    name: "UPSC Civil Services Exam (CSE)",
    shortName: "upsc-cse",
  },
  {
    id: 8,
    name: "UPSC CDS (Combined Defence Services) Exam",
    shortName: "upsc-cds",
  },
  {
    id: 9,
    name: "UPSC NDA & NA (National Defence Academy) Exam",
    shortName: "upsc-nda-na",
  },
  {
    id: 10,
    name: "AFCAT (Air Force Common Admission Test)",
    shortName: "afcat",
  },
  {
    id: 11,
    name: "UPSC IES/ESE (Engineering Services Exam)",
    shortName: "upsc-ies-ese",
  },
  {
    id: 12,
    name: "UPSC CMS (Combined Medical Services)",
    shortName: "upsc-cms",
  },
  {
    id: 13,
    name: "IB ACIO (Intelligence Bureau Exam)",
    shortName: "ib-acio",
  },
  {
    id: 14,
    name: "SSC CGL (Combined Graduate Level Exam)",
    shortName: "ssc-cgl",
  },
  {
    id: 15,
    name: "SSC CHSL (Combined Higher Secondary Level Exam)",
    shortName: "ssc-chsl",
  },
  {
    id: 16,
    name: "SSC GD Constable Exam",
    shortName: "ssc-gd",
  },
  {
    id: 17,
    name: "SSC CPO (Central Police Organization Exam)",
    shortName: "ssc-cpo",
  },
  {
    id: 18,
    name: "RRB NTPC (Non-Technical Popular Categories)",
    shortName: "rrb-ntpc",
  },
  {
    id: 19,
    name: "RRB Group D",
    shortName: "rrb-group-d",
  },
  {
    id: 20,
    name: "IBPS PO (Probationary Officer)",
    shortName: "ibps-po",
  },
  {
    id: 21,
    name: "IBPS Clerk",
    shortName: "ibps-clerk",
  },
  {
    id: 22,
    name: "SBI PO (Probationary Officer)",
    shortName: "sbi-po",
  },
  {
    id: 23,
    name: "SBI Clerk (Junior Associates)",
    shortName: "sbi-clerk",
  },
  {
    id: 24,
    name: "RBI Grade B Officer",
    shortName: "rbi-grade-b",
  },
  {
    id: 25,
    name: "RBI Assistant",
    shortName: "rbi-assistant",
  },
  {
    id: 26,
    name: "CTET (Central Teacher Eligibility Test)",
    shortName: "ctet",
  },
  {
    id: 27,
    name: "CA (Chartered Accountancy) Exams",
    shortName: "icai-ca",
  },
  {
    id: 28,
    name: "CS (Company Secretary) Exams",
    shortName: "icsi-cs",
  },
  {
    id: 29,
    name: "CMA (Cost and Management Accountancy) Exams",
    shortName: "icmai-cma",
  },
  // ... add all 29 of your exams here
];

// This is the template for ONE exam file.
const singleExamTemplate = {
  name: "",
  shortName: "",
  description: "",
  conductingBody: "",
  officialWebsite: "",
  eligibility: {
    ageLimit: "",
    educationalQualification: "",
    nationality: "",
    numberOfAttempts: null,
  },
  timeline: {
    notificationDate: null,
    applicationStartDate: null,
    applicationEndDate: null,
    examDate: "",
    resultDate: null,
  },
  examPattern: {
    mode: null,
    stages: [],
    negativeMarking: false,
    markingScheme: "",
  },
  syllabus: [],
  latestUpdate: { title: "", date: "", link: "" },
  updates: [],
  books: [],
  youtubeVideos: [],
};

async function createExamFiles() {
  const dataDir = "exam-data";
  // Check if the directory exists, if not, create it.
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (e) {
    // It's okay if the directory already exists
  }

  for (const exam of EXAMS_TO_SCRAPE) {
    // Merge the template with the basic info from your list
    const fileContent = {
      ...singleExamTemplate, // Start with the full empty structure
      name: exam.name, // Overwrite with data from your list
      shortName: exam.shortName,
      conductingBody: exam.conductingBody || "",
      officialWebsite: exam.officialWebsite || "",
    };

    const fileName = `${exam.shortName}.json`;
    const filePath = path.join(dataDir, fileName);

    // Write the file
    await fs.writeFile(filePath, JSON.stringify(fileContent, null, 2));
    console.log(`Created file: ${filePath}`);
  }

  console.log('\n✅ All 29 files have been created in the "exam-data" folder!');
}

createExamFiles();
