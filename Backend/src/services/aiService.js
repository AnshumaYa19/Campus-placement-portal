module.exports = require('../services/aiService');


const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeResume(resumeText) {

    const prompt = `
    You are an ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON.

Do not add markdown.
Do not use \`\`\`json.
Do not explain anything.

Return in this exact format:

{
  "score": 85,
  "technicalSkills": [],
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "jobRoles": []
}

Resume:

${resumeText}
`

    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
    });

    let text = response.text;

    // Remove markdown if Gemini accidentally adds it
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(text);
}

module.exports = {
    analyzeResume,
};