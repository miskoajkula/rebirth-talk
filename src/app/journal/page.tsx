"use client"

import React, { useState } from 'react';
import Layout from "@/components/layout";
import PortalModal from "@/components/modal";

const MyJournal = () => {
  // State for entries and adding new entries
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [modalOpened,setModalOpened] = useState(false)

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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">My Journal</h1>

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
          className="fixed bottom-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
        >
          + Thought
        </button>

        <PortalModal isOpen={modalOpened} onClose={() => setModalOpened(false)}>
          <div className="bg-white rounded-lg p-6 w-full">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Entry</h2>
            <textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Write about your day..."
              className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none"
            ></textarea>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">Mood:</label>
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              >
                <option value="">Select Mood</option>
                <option value="Happy">Happy</option>
                <option value="Sad">Sad</option>
                <option value="Reflective">Reflective</option>
                <option value="Motivated">Motivated</option>
              </select>
            </div>
            <button
              onClick={addNewEntry}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Entry
            </button>
          </div>
        </PortalModal>
      </div>
    </Layout>
  );
};

export default MyJournal;
