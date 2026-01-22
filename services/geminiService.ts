import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedHabit } from "../types";

const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateHabitPlan = async (identity: string): Promise<GeneratedHabit | null> => {
  if (!ai) {
    console.error("API Key missing");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is struggling with long-term stress/anxiety and wants to embody this identity: "${identity}". 
      
      Act as a clinical psychologist and a wise wabi-sabi coach. 
      Your goal is to suggest a non-medicinal "Atomic Habits" plan to regulate their nervous system.
      
      1. Suggest 3 small daily rituals (Atomic Habits) that are scientifically proven to lower cortisol or reduce overthinking (e.g., box breathing, 5-minute nature walk, morning journaling).
      2. Describe a unique, virtual "Peace Tree" that reflects their internal state. Use wabi-sabi metaphors (imperfect bark, resilient roots, seasonal change).
      3. Provide one sentence of philosophical advice focused on "The Beauty of the Unfinished" to alleviate the pressure of perfectionism.
      
      Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            habits: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 stress-reducing atomic habits",
            },
            treeDescription: {
              type: Type.STRING,
              description: "A poetic description of their resilience tree",
            },
            advice: {
              type: Type.STRING,
              description: "A philosophical quote for anxiety relief",
            },
          },
          required: ["habits", "treeDescription", "advice"],
        },
      },
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as GeneratedHabit;

  } catch (error) {
    console.error("Error generating peace plan:", error);
    return null;
  }
};

export const generateScienceArt = async (): Promise<string | null> => {
  if (!ai) return null;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A high-end, minimalist piece of fine art representing the human nervous system intertwined with a wabi-sabi bonsai tree. The style is Japanese Sumi-e (ink wash painting) with modern charcoal sketch details. Muted sage green, deep charcoal, and parchment white palette. Atmospheric, serene, and deeply scientific yet soulful. 16:9 aspect ratio, high resolution, artistic composition.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating science art:", error);
    return null;
  }
};