import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const system = `
You are a UI assistant.
Respond only with JSON.
If the user request can be satisfied with hiding/reordering items or changing the theme, return:
  { "order": ["item-…"], "hidden": ["item-…"], "theme": { "mode": "light|dark", "foreground": "#hex", "background": "#hex" } }
Else return:
  { "error": "Sorry, that's not supported yet. The team has been notified." }
`;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const { choices } = await openai.chat.completions.create({
    model: "gpt-4",
    temperature: 0,
    messages: [
      { role: "system", content: system },
      { role: "user", content: String(prompt).slice(0, 400) },
    ],
  });
  try {
    const content = choices[0].message.content?.trim() || "{}";
    return NextResponse.json(JSON.parse(content));
  } catch (_) {
    return NextResponse.json({ error: "Bad response from AI" });
  }
}
