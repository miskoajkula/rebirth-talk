"use client"

import React, { useState } from 'react';
import Layout from "@/components/layout";
import PortalModal from "@/components/modal";

import ReactQuill from 'react-quill-new';

import 'react-quill/dist/quill.snow.css';

const journalOptions = [
  {name: "Happy", value: "happy", color: "#FFD700"}, // Gold
  {name: "Sad", value: "sad", color: "#87CEEB"}, // Sky Blue
  {name: "Reflective", value: "reflective", color: "#D8BFD8"}, // Thistle
  {name: "Motivated", value: "motivated", color: "#FFA500"}, // Orange
  {name: "Calm", value: "calm", color: "#98FB98"}, // Pale Green
  {name: "Anxious", value: "anxious", color: "#FFB6C1"}, // Light Pink
  {name: "Excited", value: "excited", color: "#FF4500"}, // Orange Red
  {name: "Grateful", value: "grateful", color: "#F5DEB3"}, // Wheat
  {name: "Frustrated", value: "frustrated", color: "#F08080"}, // Light Coral
  {name: "Inspired", value: "inspired", color: "#6A5ACD"}, // Slate Blue
  {name: "Lonely", value: "lonely", color: "#708090"}, // Slate Gray
  {name: "Neutral", value: "neutral", color: "#D3D3D3"} // Light Gray
]
const toolbarOptions = [
  [
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block' , 'link',
    { 'list': 'ordered'},
    { 'list': 'bullet' },
    { 'list': 'check' },
    { 'script': 'sub'},
    { 'script': 'super' },
    { 'indent': '-1'}, { 'indent': '+1' },
    { 'direction': 'rtl' },
    { 'size': ['small', false, 'large', 'huge'] },
    { 'font': [] },
    { 'header': [1, 2, 3, 4, 5, 6, false] },
    { 'color': [] }, { 'background': [] },
    { 'align': [] },
    'clean'
  ],
];
const MyJournal = () => {
  // State for entries and adding new entries
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [modalOpened, setModalOpened] = useState(false)
  const [value, setValue] = useState('');

  const addNewEntry = () => {
    if (newEntry.trim()) {
      const date = new Date().toISOString().slice(0, 10);
      setEntries([
        ...entries,
        {date, content: newEntry, mood: selectedMood || 'Neutral'},
      ]);
      setNewEntry('');
      setSelectedMood('');
    }
  };

  const closeModal = () => {
    setModalOpened(false)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-pine-green-700 mb-4">My Journal</h1>

        {/* Entry Cards */}
        <div className="w-full max-w-lg space-y-4 mb-20">
          {entries.map((entry, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md bg-opacity-90 bg-${
                index % 2 === 0 ? 'yellow-100' : 'blue-100'
              }`}
            >
              <p className="text-sm text-gray-500 italic mb-2">{entry.date}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-blue-200 px-2 py-1 rounded-full text-blue-600">{entry.mood}</span>
              </div>
              <p className="text-gray-700 mt-2 leading-snug line-clamp-4">
                {entry.content.length > 100 ? `${entry.content.slice(0, 100)}...` : entry.content}
              </p>
            </div>
          ))}
        </div>

        {/* Floating Action Button (FAB) */}
        <button
          onClick={() => setModalOpened(true)}
          className="fixed min-w-[10vw] bottom-6 bg-pine-green-700 text-white p-4 rounded-full shadow-lg"
        >
          + Thought
        </button>

        <PortalModal isOpen={modalOpened} onClose={() => setModalOpened(false)}>
          <div className="bg-white rounded-lg p-6 w-full">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">New Journal Entry</h2>
            <ReactQuill theme={"snow"} value={value} onChange={setValue}
            modules={{
              toolbar: toolbarOptions,
            }}
            />;
            <textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Write about your day..."
              // className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none"
              className="w-full h-32 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"

            ></textarea>
            <div className="mt-4">
              <p className="block text-sm  text-gray-600 mb-2">Select Mood:</p>

              <div className="flex flex-wrap gap-4">
                {journalOptions.map((entry) => (
                  <div
                    key={entry.value} // Add a unique key
                    style={{background: entry.color}}
                    className={`px-4 py-2 rounded-md text-white cursor-pointer shadow-md hover:shadow-lg transition-all ${
                      selectedMood === entry.value ? "ring-2 ring-offset-2 ring-black" : ""
                    }`}
                    onClick={() => setSelectedMood(entry.value)} // Handle selection
                  >
                    {entry.name}
                  </div>
                ))}
              </div>

            </div>

            <div className={"flex justify-end items-end gap-4"}>
              <button
                onClick={closeModal}
                className="mt-4 py-2 text-black rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={addNewEntry}
                className="mt-4 py-2 px-4 bg-pine-green-700 text-white rounded-md"
              >
                Save Entry
              </button>
            </div>

          </div>
        </PortalModal>
      </div>
    </Layout>
  );
};

export default MyJournal;
