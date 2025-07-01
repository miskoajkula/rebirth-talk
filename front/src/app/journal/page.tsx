"use client";

import React, { useState } from "react";
import Layout from "@/components/layout";
import PortalModal from "@/components/modal";
import ReactQuill from "react-quill-new";
import "quill/dist/quill.snow.css";
import { BiPlus } from "react-icons/bi";

// Ordered by color spectrum: warm colors → cool colors → neutrals
const journalOptions = [
  { name: "Excited", value: "excited", color: "#FF4500" },
  { name: "Frustrated", value: "frustrated", color: "#F08080" },
  { name: "Anxious", value: "anxious", color: "#FFB6C1" },
  { name: "Motivated", value: "motivated", color: "#FFA500" },
  { name: "Happy", value: "happy", color: "#FFD700" },
  { name: "Grateful", value: "grateful", color: "#F5DEB3" },
  { name: "Calm", value: "calm", color: "#98FB98" },
  { name: "Inspired", value: "inspired", color: "#6A5ACD" },
  { name: "Reflective", value: "reflective", color: "#D8BFD8" },
  { name: "Sad", value: "sad", color: "#87CEEB" },
  { name: "Lonely", value: "lonely", color: "#708090" },
  { name: "Neutral", value: "neutral", color: "#D3D3D3" },
];

const toolbarOptions = [
  ["bold", "italic", "underline"],
  [{ list: "bullet" }, { list: "ordered" }],
  ["blockquote", "code-block"],
  ["link"],
  [{ header: [1, 2, 3, false] }],
];

type EntryType = {
  date: string;
  content: string;
  mood: (typeof journalOptions)[number];
};

const JournalPage = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [selectedMood, setSelectedMood] = useState<(typeof journalOptions)[0] | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [viewEntry, setViewEntry] = useState<EntryType | null>(null);
  const [errors, setErrors] = useState({ content: "", mood: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTextColor = (bg: string) => {
    const rgb = parseInt(bg.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return lum > 140 ? "#000" : "#fff";
  };

  const validateForm = () => {
    const newErrors = { content: "", mood: "" };
    let isValid = true;

    // Content validation
    const textContent = content.replace(/<[^>]*>/g, "").trim(); // Strip HTML tags
    if (!textContent) {
      newErrors.content = "Please write something in your journal entry.";
      isValid = false;
    } else if (textContent.length < 10) {
      newErrors.content = "Your entry should be at least 10 characters long.";
      isValid = false;
    } else if (textContent.length > 5000) {
      newErrors.content = "Your entry is too long. Please keep it under 5000 characters.";
      isValid = false;
    }

    // Mood validation
    if (!selectedMood) {
      newErrors.mood = "Please select how you're feeling today.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addEntry = async () => {
    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const date = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      setEntries([{ date, content, mood: selectedMood! }, ...entries]);

      // Reset form
      setContent("");
      setSelectedMood(null);
      setErrors({ content: "", mood: "" });
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving entry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setErrors({ content: "", mood: "" });
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: "" }));
    }
  };

  const handleMoodSelect = (mood: (typeof journalOptions)[0]) => {
    setSelectedMood(mood);
    if (errors.mood) {
      setErrors((prev) => ({ ...prev, mood: "" }));
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
        <div className="max-w-5xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-pine-green-700">My Journal</h1>
            {entries.length > 0 && (
              <>
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 bg-pine-green-600 hover:bg-pine-green-700 text-white px-4 py-2 rounded-full shadow-md transition text-sm font-medium"
                >
                  <BiPlus size={18} /> New Entry
                </button>
              </>
            )}
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.length === 0 ? (
              // Empty State
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-pine-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Start Your Journey
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    Your journal is a safe space to reflect, process emotions, and track
                    your progress. Each entry is a step forward in your recovery journey.
                  </p>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 bg-pine-green-600 hover:bg-pine-green-700 text-white px-6 py-3 rounded-full shadow-md transition mx-auto text-sm font-medium"
                  >
                    <BiPlus size={18} /> Write Your First Entry
                  </button>
                </div>
              </div>
            ) : (
              // Existing entries
              entries.map((entry, idx) => (
                <div
                  key={idx}
                  onClick={() => setViewEntry(entry)}
                  className="cursor-pointer bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 h-2/3 w-1/4 opacity-20"
                    style={{ backgroundColor: entry.mood.color }}
                  />
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: entry.mood.color,
                        color: getTextColor(entry.mood.color),
                      }}
                    >
                      {entry.mood.name}
                    </span>
                    <time className="text-gray-500 text-xs">{entry.date}</time>
                  </div>
                  <div
                    className="text-gray-700 text-sm leading-relaxed"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                    dangerouslySetInnerHTML={{ __html: entry.content }}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* New Entry Modal */}
        <PortalModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          wrapperClassName="bg-gray-900 bg-opacity-50 backdrop-blur-sm"
          contentClassName="bg-white rounded-2xl p-8 shadow-2xl"
          contentStyle={{ maxWidth: "600px", minWidth: "300px" }}
        >
          <div>
            <h2 className="text-lg font-semibold mb-4">New Journal Entry</h2>

            {/* Content Editor */}
            <div className="mb-4">
              <ReactQuill
                value={content}
                onChange={handleContentChange}
                modules={{ toolbar: toolbarOptions }}
                placeholder="Reflect on your day..."
                className={`mb-2 ${errors.content ? "border-red-300" : ""}`}
              />
              {errors.content && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.content}
                </p>
              )}

              {/* Character count */}
              <div className="text-right text-xs text-gray-400 mt-1">
                {content.replace(/<[^>]*>/g, "").length} / 5000 characters
              </div>
            </div>

            {/* Mood Selection */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                Your Mood: <span className="text-red-500">*</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {journalOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleMoodSelect(opt)}
                    className={`px-3 py-2 rounded-xl font-medium text-xs shadow-sm transition
                      ${selectedMood?.value === opt.value ? "ring-2 ring-offset-2 ring-pine-green-500 transform scale-105" : "hover:scale-105"}`}
                    style={{ backgroundColor: opt.color, color: getTextColor(opt.color) }}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
              {errors.mood && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.mood}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={handleModalClose}
                className="py-2 px-4 text-gray-700 hover:text-gray-900 transition text-sm"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={addEntry}
                disabled={isSubmitting}
                className={`py-2 px-6 rounded-md font-medium transition flex items-center gap-2 text-sm ${
                  isSubmitting
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-pine-green-600 hover:bg-pine-green-700 text-white"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Entry"
                )}
              </button>
            </div>
          </div>
        </PortalModal>

        {/* View Entry Modal */}
        <PortalModal
          isOpen={!!viewEntry}
          onClose={() => setViewEntry(null)}
          wrapperClassName="bg-gray-900 bg-opacity-50 backdrop-blur-sm"
          contentClassName="bg-white rounded-2xl p-8 shadow-2xl"
          contentStyle={{ maxWidth: "800px" }}
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{viewEntry?.date}</h2>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: viewEntry?.mood.color ?? "#FFF",
                  color: viewEntry ? getTextColor(viewEntry.mood.color) : "#000",
                }}
              >
                {viewEntry?.mood.name}
              </span>
            </div>
            <div
              className="prose max-w-none text-gray-700 text-sm leading-relaxed pt-4"
              dangerouslySetInnerHTML={{ __html: viewEntry?.content ?? "" }}
              style={{
                borderTop: "1px solid #0000001a",
              }}
            />
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewEntry(null)}
                className="py-2 px-4 bg-pine-green-600 text-white rounded-md text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </PortalModal>
      </div>
    </Layout>
  );
};

export default JournalPage;
