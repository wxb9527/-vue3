
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiChatResponse = async (history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history,
      config: {
        systemInstruction: "你是一个专业的高校心理咨询AI助手。你的目标是提供共情、专业、温暖且安全的心理支持。如果检测到用户有严重的自残或自杀倾向，请立即建议他们寻求专业医疗机构或拨打紧急心理援助热线。说话语气要温柔、客观且富有洞察力。",
        temperature: 0.7,
      }
    });
    return response.text || "抱歉，我现在无法回答。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "连接智能助手时出现了一点小状况，请稍后再试。";
  }
};
