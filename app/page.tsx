"use client";
import { useState } from "react";
import { useNav } from "./nav-context";
import { useTheme } from "./theme-context";

export default function Home() {
  const { update, reset } = useNav();
  const { update: updateTheme, reset: resetTheme } = useTheme();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    const res = await fetch("/api/customise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (data.error) setError(data.error);
    else {
      if (data.order || data.hidden) update(data);
      if (data.theme) updateTheme(data.theme);
    }
    setLoading(false);
    setPrompt("");
  }

  return (
    <section className="space-y-4 max-w-xl">
      <textarea
        className="w-full border p-2 rounded"
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. 'Hide sales and move analytics first'"
      />
      <div className="flex gap-4">
        <button
          onClick={submit}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Thinking…" : "Apply"}
        </button>
        <button
          onClick={() => {
            reset();
            resetTheme();
          }}
          className="underline text-sm"
        >
          Reset
        </button>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </section>
  );
}
