import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY! as string,
});

export const generateEmail = async (
  objective: string,
  audience: string,
  cta: string,
) => {
  const prompt = `
    You are an expert email marketing copywriter.
    Generate a professional marketing email based on the following details.

    Campaign Objective:
    ${objective}

    Target Audience:
    ${audience}

    Call To Action:
    ${cta}

    Return ONLY valid JSON in the following format.

    {
    "subjectLine": "...",
    "previewText": "...",
    "emailContent": "...",
    "ctaSuggestion": "..."
    }

    Do not include markdown, code fences, explanations, or any extra text.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text!);
};
