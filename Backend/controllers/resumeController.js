import supabase from "../db/supabaseClient.js";
import { GoogleGenAI } from "@google/genai";
import { PDFParse } from "pdf-parse";
import multer from "multer";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter(req, file, cb) {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only pdf files are allowed"));
        }
    }
});

export async function resumeParser(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const parser = new PDFParse({ data: req.file.buffer });
        const result = await parser.getText();
        const resumeText = result.text;

        const userId = req.user.id;
        const fileName = req.file.originalname;

        const { data: existing } = await supabase
            .from("resumes")
            .select("id")
            .eq("user_id", userId)
            .single();

        if (existing) {
            //update
            const { error } = await supabase
                .from("resumes")
                .update({ resume_text: resumeText, file_name: fileName })
                .eq("user_id", userId);

            if (error) throw (error);

        } else {
            //insert
            const { error } = await supabase
                .from("resumes")
                .insert({ user_id: userId, resume_text: resumeText, file_name: fileName })

            if (error) throw (error);
        }

        res.status(200).json({ message: "Resume uploaded successfully", file_name: fileName });
    } catch (error) {
        console.error("Resume upload error: ", error.message);
        res.status(500).json({ message: "Failed to upload resume" });
    }
}

export async function resumeAnalyzer(req, res) {
    try {
        const userId = req.user.id;
        const { jd_text } = req.body;

        if (!jd_text) return res.status(400).json({ message: "JD description is required" })

        const { data, error } = await supabase
            .from('resumes')
            .select('resume_text')
            .eq('user_id', userId)
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ message: "No resume found. Please upload your resume first." });

        const resumeText = data.resume_text;

        const prompt = `
            You are a strict ATS and resume expert. Analyze the resume against the job description using this exact scoring rubric:

            SCORING RUBRIC (total 100):
            - Keyword match (exact and close matches): 25 points
            - Required skills coverage: 25 points  
            - Relevant experience/projects quality: 20 points
            - Education relevance: 10 points
            - Missing critical requirements (deduct 5 points each, max -30): -30 points

            Be strict and realistic.
            Penalize heavily for missing required skills, no work experience, and missing tools mentioned in JD.

            RESUME:
            ${resumeText}

            JOB DESCRIPTION:
            ${jd_text}

            Provide your analysis in this exact JSON format:
            {
                "match_score": <0-100, be strict and realistic>,
                "score_breakdown": {
                    "keyword_match": <0-25>,
                    "skills_coverage": <0-25>,
                    "experience_quality": <0-20>,
                    "education": <0-10>,
                    "deductions": <0 to -30>
                },
                "missing_keywords": ["keyword1", "keyword2"],
                "bullet_changes": [
                    {
                        "section": "project/section name",
                        "changes": [
                            {
                                "original": "original bullet",
                                "suggested": "improved bullet",
                                "reason": "why"
                            },
                            {
                                "original": "original bullet 2",
                                "suggested": "improved bullet 2",
                                "reason": "why"
                            }
                        ]
                    }
                ],
                "global_new_bullets": [
                    {
                        "section": "Skills/Summary/etc to add",
                        "bullet": "new bullet or line to add",
                        "reason": "why this helps"
                    }
                ],
                "summary": "honest 2-3 line overall assessment"
            }
            Return only valid JSON, no extra text.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        let raw = "";
        for await (const chunk of responseStream) {
            raw += chunk.text;
        }
        const clean = raw.replace(/```json|```/g, "").trim();
        const suggestions = JSON.parse(clean);

        res.status(200).json(suggestions);

    } catch (err) {
        console.err("Analyze error: ", err.message);
        res.status(500).json({ message: "Failed to analyze" });
    }
}
