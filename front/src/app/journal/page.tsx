"use client";

import React, { useState } from "react";
import Layout from "@/components/layout";
import PortalModal from "@/components/modal";
import ReactQuill from "react-quill-new";
import "quill/dist/quill.snow.css";
import { BiPlus } from "react-icons/bi";

const journalOptions = [
  { name: "Happy", value: "happy", color: "#FFD700" },
  { name: "Sad", value: "sad", color: "#87CEEB" },
  { name: "Reflective", value: "reflective", color: "#D8BFD8" },
  { name: "Motivated", value: "motivated", color: "#FFA500" },
  { name: "Calm", value: "calm", color: "#98FB98" },
  { name: "Anxious", value: "anxious", color: "#FFB6C1" },
  { name: "Excited", value: "excited", color: "#FF4500" },
  { name: "Grateful", value: "grateful", color: "#F5DEB3" },
  { name: "Frustrated", value: "frustrated", color: "#F08080" },
  { name: "Inspired", value: "inspired", color: "#6A5ACD" },
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

  const getTextColor = (bg: string) => {
    const rgb = parseInt(bg.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return lum > 140 ? "#000" : "#fff";
  };

  const addEntry = () => {
    if (!content.trim() || !selectedMood) return;
    const date = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    setEntries([{ date, content, mood: selectedMood }, ...entries]);
    setContent("");
    setSelectedMood(null);
    setModalOpen(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6">
        <div className="max-w-5xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-pine-green-700">My Journal</h1>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-pine-green-600 hover:bg-pine-green-700 text-white px-4 py-2 rounded-full shadow-md transition"
            >
              <BiPlus size={20} /> New Entry
            </button>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry, idx) => (
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
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: entry.mood.color,
                      color: getTextColor(entry.mood.color),
                    }}
                  >
                    {entry.mood.name}
                  </span>
                  <time className="text-gray-400 text-sm">{entry.date}</time>
                </div>
                <div
                  className="text-gray-700"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* New Entry Modal */}
        <PortalModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          wrapperClassName="bg-gray-900 bg-opacity-50 backdrop-blur-sm"
          contentClassName="bg-white rounded-2xl p-8 shadow-2xl"
          contentStyle={{ maxWidth: "600px" }}
        >
          <div>
            <h2 className="text-xl font-semibold mb-4">New Journal Entry</h2>
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={{ toolbar: toolbarOptions }}
              placeholder="Reflect on your day..."
              className="mb-4"
            />
            <div className="mb-4">
              <p className="text-gray-600 mb-2">Select Mood:</p>
              <div className="flex flex-wrap gap-3">
                {journalOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedMood(opt)}
                    className={`px-4 py-1 rounded-md font-medium shadow-sm transition
                      ${selectedMood?.value === opt.value ? "ring-2 ring-offset-2 ring-pine-green-500" : ""}`}
                    style={{ backgroundColor: opt.color, color: getTextColor(opt.color) }}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModalOpen(false)}
                className="py-2 px-4 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={addEntry}
                className="py-2 px-6 bg-pine-green-600 text-white rounded-md"
              >
                Save
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
              <h2 className="text-xl font-semibold">{viewEntry?.date}</h2>
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: viewEntry?.mood.color ?? "#FFF",
                  color: viewEntry ? getTextColor(viewEntry.mood.color) : "#000",
                }}
              >
                {viewEntry?.mood.name}
              </span>
            </div>
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: viewEntry?.content ?? "" }}
            />
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewEntry(null)}
                className="py-2 px-4 bg-pine-green-600 text-white rounded-md"
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
