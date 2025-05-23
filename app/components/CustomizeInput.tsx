"use client";
import { useState, useRef, useEffect } from "react";
import { Settings, Send, X, Loader2 } from "lucide-react";

interface CustomizeInputProps {
  onSubmit: (prompt: string) => Promise<void>;
  onReset: () => void;
  context: "sidebar" | "hamburger";
  onInputChange?: (prompt: string) => void;
  onExpand?: (expanded: boolean) => void;
  position?: "bottom-center" | "bottom-right";
}

export function CustomizeInput({
  onSubmit,
  onReset,
  context,
  onInputChange,
  onExpand,
  position = "bottom-center",
}: CustomizeInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
    onExpand?.(isExpanded);
  }, [isExpanded, onExpand]);

  const handleSubmit = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    await onSubmit(prompt);
    setLoading(false);
    setPrompt("");
    setIsExpanded(false);
    onInputChange?.("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      setIsExpanded(false);
      setPrompt("");
      onInputChange?.("");
    }
  };

  const positionClasses =
    position === "bottom-center"
      ? "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      : "fixed bottom-6 right-6 z-50";

  return (
    <div className={positionClasses}>
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-110 hover:shadow-xl"
          title="Customize UI"
        >
          <Settings className="w-5 h-5" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl p-4 w-96 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                onInputChange?.(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder={`Customize ${
                context === "sidebar" ? "sidebar" : "menu"
              }...`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !prompt.trim()}
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => {
                setIsExpanded(false);
                setPrompt("");
                onInputChange?.("");
              }}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>
              Try: &quot;remove notifications&quot; or &quot;move settings to
              top&quot;
            </span>
            <button
              onClick={onReset}
              className="text-blue-600 hover:text-blue-700"
            >
              Reset all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
