"use client";

/**
 * Editor Page - Fullscreen Writing Experience
 * 
 * Trải nghiệm viết tập trung, khác biệt với home page
 * - Fullscreen editor với minimal UI
 * - Focus mode
 * - Real-time stats
 * - Dark theme optimized
 * - Text highlighting support
 */

import { useState, useRef, useEffect } from "react";
import type { Content } from "@tiptap/react";

// Import TiptapEditor từ standalone package
import TiptapEditor, { type TiptapEditorRef } from "../../../tiptap-editor-standalone";

// Import styles
import "../../../tiptap-editor-standalone/styles/index.scss";

export default function EditorPage() {
  const [content, setContent] = useState<string>("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const editorRef = useRef<TiptapEditorRef>(null);

  const handleChange = (value: Content) => {
    if (typeof value === "string") {
      setContent(value);
    } else if (value !== null) {
      setContent(JSON.stringify(value, null, 2));
    } else {
      setContent("");
    }
    
    // Update stats
    if (editorRef.current) {
      const editor = editorRef.current;
      const words = editor.storage.characterCount?.words() || 0;
      const chars = editor.storage.characterCount?.characters() || 0;
      setWordCount(words);
      setCharCount(chars);
    }
  };

  const handleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
    if (!isFocusMode) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  };

  const handleExport = () => {
    if (editorRef.current) {
      const html = editorRef.current.getHTML();
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `document-${Date.now()}.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.commands.clearContent();
      setWordCount(0);
      setCharCount(0);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* CSS Variables để match với editor gốc */}
      <style jsx global>{`
        :root {
          --rte-bg: #ffffff;
          --rte-fg: #1f2328;
          --rte-border: #d1d9e0;
          --rte-primary: #0969da;
          --rte-primary-fg: #ffffff;
          --rte-secondary: #f6f8fa;
          --rte-secondary-fg: #1f2328;
          --rte-accent: #f6f8fa;
          --rte-accent-fg: #1f2328;
          --rte-muted: #f6f8fa;
          --rte-muted-fg: #656d76;
          --rte-tooltip: #1f2328;
          --rte-tooltip-fg: #ffffff;
          --rte-bubble: #ffffff;
          --rte-overlay: rgba(0, 0, 0, 0.5);
          --rte-radius: 0.5rem;
          --rte-editor-font-size: 1rem;
          --rte-editor-line-height: 1.75;
          --rte-editor-selection: rgba(9, 105, 218, 0.2);
          --rte-editor-code-bg: #f6f8fa;
          --rte-editor-link: #0969da;
        }

        html.dark {
          --rte-bg: #0d1018;
          --rte-fg: #f0f6fc;
          --rte-border: #3d444d;
          --rte-primary: #58a6ff;
          --rte-primary-fg: #ffffff;
          --rte-secondary: #161b22;
          --rte-secondary-fg: #f0f6fc;
          --rte-accent: #161b22;
          --rte-accent-fg: #f0f6fc;
          --rte-muted: #161b22;
          --rte-muted-fg: #8b949e;
          --rte-tooltip: #f0f6fc;
          --rte-tooltip-fg: #1f2328;
          --rte-bubble: #161b22;
          --rte-overlay: rgba(0, 0, 0, 0.7);
          --rte-editor-selection: rgba(88, 166, 255, 0.2);
          --rte-editor-code-bg: #161b22;
          --rte-editor-link: #58a6ff;
        }

        /* Đảm bảo text selection/highlighting hoạt động */
        .rte-editor__container ::selection {
          background-color: var(--rte-editor-selection);
          color: inherit;
        }

        .rte-editor__container .ProseMirror ::selection {
          background-color: var(--rte-editor-selection);
        }
      `}</style>

      <div className={`min-h-screen transition-all duration-300 ${
        isFocusMode 
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      }`}>
        {/* Header Bar - Minimal */}
        {!isFocusMode && (
          <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    ✍️ Writing Studio
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Focus on your words
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Stats */}
                  {showStats && (
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-gray-600 dark:text-gray-300">
                        <span className="font-semibold">{wordCount}</span> words
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        <span className="font-semibold">{charCount}</span> chars
                      </div>
                    </div>
                  )}
                  
                  {/* Toggle Stats */}
                  <button
                    onClick={() => setShowStats(!showStats)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    title="Toggle stats"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </button>
                  
                  {/* Focus Mode */}
                  <button
                    onClick={handleFocusMode}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                  >
                    {isFocusMode ? "Exit Focus" : "Focus Mode"}
                  </button>
                  
                  {/* Export */}
                  <button
                    onClick={handleExport}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    Export
                  </button>
                  
                  {/* Clear */}
                  <button
                    onClick={handleClear}
                    className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Clear all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Focus Mode Header */}
        {isFocusMode && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-transparent">
            <div className="max-w-4xl mx-auto px-8 py-4">
              <div className="flex items-center justify-between text-white/60">
                <div className="text-sm">
                  Focus Mode • {wordCount} words
                </div>
                <button
                  onClick={handleFocusMode}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors backdrop-blur-sm"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Editor Area */}
        <div className={`transition-all duration-300 ${
          isFocusMode 
            ? "pt-20 pb-16" 
            : "pt-8 pb-16"
        }`}>
          <div className={`mx-auto transition-all duration-300 ${
            isFocusMode 
              ? "max-w-4xl px-8" 
              : "max-w-6xl px-6"
          }`}>
            {/* Editor Container */}
            <div className={`
              transition-all duration-300
              ${isFocusMode 
                ? "bg-transparent" 
                : "bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
              }
            `}>
              <TiptapEditor
                ref={editorRef}
                content={content}
                output="html"
                onChange={handleChange}
                placeholder={isFocusMode 
                  ? "Start writing your story..." 
                  : "Begin writing... Press Cmd/Ctrl + K for focus mode"
                }
                minHeight={isFocusMode ? 600 : 500}
                maxHeight={isFocusMode ? undefined : 900}
                throttleDelay={500}
              />
            </div>

            {/* Floating Action Button (Focus Mode) */}
            {isFocusMode && (
              <div className="fixed bottom-8 right-8 z-50">
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleExport}
                    className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all hover:scale-110 shadow-lg"
                    title="Export"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button
                    onClick={handleClear}
                    className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all hover:scale-110 shadow-lg"
                    title="Clear"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Stats (Non-focus mode) */}
        {!isFocusMode && showStats && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-6 py-3">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">{wordCount}</span> words
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">{charCount}</span> characters
                  </div>
                  <div>
                    Reading time: <span className="font-semibold text-gray-900 dark:text-white">
                      {Math.max(1, Math.ceil(wordCount / 200))}
                    </span> min
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  Auto-saved
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
