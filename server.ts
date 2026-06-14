import express from "express";
import path from "path";
import multer from "multer";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON parse limits for large prompts
app.use(express.json({ limit: "50mb" }));

// Configure upload storage in-memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 40 * 1024 * 1024 } // 40MB limit for rich PDF documents
});

// Lazy-loaded Gemini Client following best-practice fullstack guidelines
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please configure it in Settings > Secrets to activate real-time BABOK deep verification.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Robust helper to parse JSON outputs in case any markdown delimiters are returned
function cleanAndParseJSON(text: string | undefined): any {
  if (!text) return {};
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```[a-zA-Z]*\n/, ""); // strip opening codeblocks
    cleaned = cleaned.replace(/\n```$/, "");         // strip closing codeblocks
    cleaned = cleaned.trim();
  }
  return JSON.parse(cleaned);
}

// Endpoint to verify a specific question with the official BABOK V3 Guide
app.post("/api/verify-answer", async (req, res) => {
  try {
    const { text, options, correctAnswer, userSelected } = req.body;

    if (!text || !options) {
      return res.status(400).json({ error: "Missing question text or options." });
    }

    const prompt = `
You are an elite BABOK V3 (Business Analysis Body of Knowledge) tutor and Certified Business Analysis Professional (CBAP) exam content validator.
Verify the correctness of the following multiple-choice question against the BABOK V3 official body of knowledge:

Question Text:
"${text}"

Choices:
A: ${options.A}
B: ${options.B}
C: ${options.C}
D: ${options.D}

The designated correct answer in our key is: "${correctAnswer}"
The user selected: "${userSelected || 'None'}"

Perform a deep analysis:
1. Identify the correct answer (A, B, C, or D) strictly based on BABOK v3.
2. Provide the BABOK V3 section citation (e.g., Chapter 3: Business Analysis Planning and Monitoring, Section 3.1).
3. If the designated key is wrong, point it out respectfully and provide the correct option with proof.
4. Give a clear explanation of *why* the correct answer is correct and analyze/neutralize the distractors (other choices).
    `;

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an official CBAP exam validation engine using BABOK V3. Return responses strictly in the requested JSON structure.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            correctAnswer: { type: Type.STRING, description: "The verified correct answer choice: A, B, C, or D" },
            babokSection: { type: Type.STRING, description: "The exact BABOK V3 Chapter and Section title/number" },
            knowledgeArea: { type: Type.STRING, description: "The BABOK V3 Knowledge Area name" },
            explanation: { type: Type.STRING, description: "Comprehensive breakdown explaining the correct choice and analyzing distractors." },
            confidenceScore: { type: Type.NUMBER, description: "Verification confidence matching rate between 0 and 100" }
          },
          required: ["correctAnswer", "babokSection", "knowledgeArea", "explanation", "confidenceScore"]
        }
      }
    });

    const result = cleanAndParseJSON(response.text);
    res.json(result);
  } catch (error: any) {
    console.error("Error in verify-answer:", error);
    res.status(500).json({ error: error.message || "Failed to verify response with Gemini." });
  }
});

// Endpoint to parse uploaded files (PDFs, TXT, etc.) into structured questions
app.post("/api/parse-document", upload.single("questionFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded. Please upload a PDF or text file." });
    }

    const mimeType = req.file.mimetype;
    const base64Data = req.file.buffer.toString("base64");

    const prompt = `
You are a high-speed BABOK v3 Exam paper parser.
Parse the attached document and extract multiple-choice questions.

For each question:
1. Locate the question text, the options (A, B, C, D).
2. Trace and find the correct answer (usually provided in the text option list, highlighted, or listed in an answer key at the back of the document).
3. If no answer is listed in the document for a question, determine the correct answer yourself by applying BABOK V3 definitions.
4. Categorize the question under the correct BABOK V3 Knowledge Area (Topic) and provide a concise BABOK citation or section explanation.

Please extract as many questions as possible from the document (up to 40 max in a single slice to avoid token overflow).
    `;

    const chatContent = {
      parts: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data
          }
        },
        {
          text: prompt
        }
      ]
    };

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatContent,
      config: {
        systemInstruction: "You are an automated document parsing engine. Parse test papers of multiple choice questions into structured JSON matching the provided schema.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  number: { type: Type.INTEGER, description: "Original question number index from document" },
                  topic: { type: Type.STRING, description: "BABOK V3 Knowledge Area or Topic" },
                  text: { type: Type.STRING, description: "Cleaned question text" },
                  options: {
                    type: Type.OBJECT,
                    properties: {
                      A: { type: Type.STRING },
                      B: { type: Type.STRING },
                      C: { type: Type.STRING },
                      D: { type: Type.STRING }
                    },
                    required: ["A", "B", "C", "D"]
                  },
                  correctAnswer: { type: Type.STRING, description: "Single character choice: A, B, C, or D" },
                  explanation: { type: Type.STRING, description: "Short explanation of the choice" },
                  babokSection: { type: Type.STRING, description: "The chapter/section name from BABOK" }
                },
                required: ["number", "text", "options", "correctAnswer"]
              }
            }
          },
          required: ["questions"]
        }
      }
    });

    const result = cleanAndParseJSON(response.text);
    res.json(result);
  } catch (error: any) {
    console.error("Error in parse-document:", error);
    res.status(500).json({ error: error.message || "Failed to process the uploaded file with Gemini." });
  }
});

// Configure Vite or Static files depending on running environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BABOK Exam Prep fullstack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
