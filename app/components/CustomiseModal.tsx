"use client";
import { useState } from "react";
import { useNav as useSideNav } from "../nav-context";
import { useTheme } from "../theme-context";
import { Modal } from "./Modal";

export function CustomiseModal({
  open,
  onClose,
  useNav = useSideNav,
  context = "sidebar",
}: {
  open: boolean;
  onClose: () => void;
  useNav?: typeof useSideNav;
  context?: "sidebar" | "hamburger";
}) {
  console.log("[CustomiseModal] Using context:", useNav.name);
  const { update, reset } = useNav();
  const { update: updateTheme } = useTheme();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function submit() {
    console.log("[CustomiseModal] Submitting prompt:", prompt);
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    const res = await fetch("/api/customise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, context }),
    });
    const data = await res.json();
    if (data.error) setError(data.error);
    else {
      console.log("[CustomiseModal] Applying update:", data);
      if (data.order || data.hidden) update(data);
      if (data.theme) updateTheme(data.theme);
    }
    setLoading(false);
    setPrompt("");
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Customize Navigation</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 p-1"
        >
          ✕
        </button>
      </div>
      <div className="mb-2">
        <textarea
          className="w-full border p-2 rounded mb-4"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your customization here..."
        />
        <button
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition mt-2 w-full"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Thinking…" : "Apply"}
        </button>
        <button
          className="border border-blue-600 text-blue-600 rounded px-4 py-2 hover:bg-blue-50 transition mt-2 w-full"
          onClick={() => {
            reset();
            onClose();
          }}
        >
          Reset
        </button>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </Modal>
  );
}
