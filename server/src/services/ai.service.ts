import { GoogleGenAI } from "@google/genai";

export const generateEmail = async (
  objective: string,
  audience: string,
  cta: string,
) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey,
  });

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
    "ctaText": "..."
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
