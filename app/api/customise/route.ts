import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const system = `
You are a UI assistant.
Respond only with JSON.
If the user request can be satisfied with hiding/reordering items or changing the theme, return:
  { 
    "order": ["item-id1", "item-id2", ...], // Must include ALL visible items in their desired order
    "hidden": ["item-id"], // Optional array of items to hide
    "theme": { "mode": "light|dark", "foreground": "#hex", "background": "#hex" } // Optional theme changes
  }
Else return:
  { "error": "Sorry, that's not supported yet. The team has been notified." }

Available items for the hamburger menu: item1, item2, item3, item4, item5, item6, item7
You can hide (remove) or reorder these items. For example, to remove item1, add it to the "hidden" array: { "hidden": ["item1"] }
To move item7 to the top, put it first in the "order" array.
Supported actions: Hide, Remove, Move, Reorder.
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
