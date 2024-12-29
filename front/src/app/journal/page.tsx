"use client"

import React, { useState } from 'react';
import Layout from "@/components/layout";
import PortalModal from "@/components/modal";

import { FaFeather } from "react-icons/fa";

import ReactQuill from 'react-quill-new';

import 'react-quill/dist/quill.snow.css';
import { BiPlus } from "react-icons/bi";

type MoodType = {
  name: string,
  value: string,
  color: string,
}

function getTextColor(bgColor) {
  // Convert hex to RGB
  const rgb = parseInt(bgColor.slice(1), 16); // Remove the '#' and parse as int
  const r = (rgb >> 16) & 0xff; // Extract red
  const g = (rgb >> 8) & 0xff; // Extract green
  const b = rgb & 0xff; // Extract blue

  // Calculate luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Return black (#000) for light backgrounds, white (#fff) for dark
  return luminance > 140 ? '#000' : '#fff';
}

const journalOptions = [
  { name: "Happy", value: "happy", color: "#FFD700", textColor: getTextColor("#FFD700") }, // Gold
  { name: "Sad", value: "sad", color: "#87CEEB", textColor: getTextColor("#87CEEB") }, // Sky Blue
  { name: "Reflective", value: "reflective", color: "#D8BFD8", textColor: getTextColor("#D8BFD8") }, // Thistle
  { name: "Motivated", value: "motivated", color: "#FFA500", textColor: getTextColor("#FFA500") }, // Orange
  { name: "Calm", value: "calm", color: "#98FB98", textColor: getTextColor("#98FB98") }, // Pale Green
  { name: "Anxious", value: "anxious", color: "#FFB6C1", textColor: getTextColor("#FFB6C1") }, // Light Pink
  { name: "Excited", value: "excited", color: "#FF4500", textColor: getTextColor("#FF4500") }, // Orange Red
  { name: "Grateful", value: "grateful", color: "#F5DEB3", textColor: getTextColor("#F5DEB3") }, // Wheat
  { name: "Frustrated", value: "frustrated", color: "#F08080", textColor: getTextColor("#F08080") }, // Light Coral
  { name: "Inspired", value: "inspired", color: "#6A5ACD", textColor: getTextColor("#6A5ACD") }, // Slate Blue
  { name: "Lonely", value: "lonely", color: "#708090", textColor: getTextColor("#708090") }, // Slate Gray
  { name: "Neutral", value: "neutral", color: "#D3D3D3", textColor: getTextColor("#D3D3D3") } // Light Gray
];
const toolbarOptions = [
  [
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block', 'link',
    {'list': 'ordered'},
    {'list': 'bullet'},
    {'list': 'check'},
    {'script': 'sub'},
    {'script': 'super'},
    {'indent': '-1'}, {'indent': '+1'},
    {'direction': 'rtl'},
    {'size': ['small', false, 'large', 'huge']},
    {'font': []},
    {'header': [1, 2, 3, 4, 5, 6, false]},
    {'color': []}, {'background': []},
    {'align': []},
    'clean'
  ],
];

type EntryType = {
  date: String;
  content: String;
  mood: MoodType
}
const MyJournal = () => {
  // State for entries and adding new entries
  const [entries, setEntries] = useState<[EntryType]>([]);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [modalOpened, setModalOpened] = useState(false)
  const [value, setValue] = useState('');

  const addNewEntry = () => {
    if (value.trim()) {
      const date = new Date().toISOString().slice(0, 10);

      setEntries([...entries, {
        date,
        content: value,
        mood: selectedMood,
      }]);
      setValue('');
      setSelectedMood('');
      setModalOpened(false);
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
        <div className="w-full mb-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* New Entry Card */}
          <div
            className="bg-[#02caaf24] h-[150px] flex justify-center items-center text-pine-green-700 gap-2 rounded-md cursor-pointer hover:shadow-lg transition-all"
            onClick={() => setModalOpened(true)}
          >
            <BiPlus className={"w-6 h-6"}/>
            <span>New Entry</span>
          </div>

          {/* Existing Entries */}
          {entries?.map((entry, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md bg-opacity-90 ${
                index % 2 === 0 ? 'bg-yellow-100' : 'bg-blue-100'
              } hover:shadow-lg transition-all`}
            >
              <p className="text-sm text-gray-500 italic mb-2">{entry.date}</p>
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full`}
                style={{
                  color: entry.mood.textColor,
                  background: entry.mood.color}}
                  >
                  {entry.mood.name}
                </span>
              </div>

              <p className="text-gray-700 mt-2 leading-snug line-clamp-4"
                 dangerouslySetInnerHTML={{
                   __html:
                     entry.content.length > 100 ? `${entry.content.slice(0, 100)}...` : entry.content
                 }}
              />

            </div>
          ))}
        </div>


        <PortalModal isOpen={modalOpened} onClose={() => setModalOpened(false)}>
          <div className="bg-white rounded-lg p-6 w-full">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">New Journal Entry</h2>
            <ReactQuill value={value} onChange={setValue}

                        className={"border-0"}

                        placeholder={"Write about your day..."}
                        modules={{
                          toolbar: toolbarOptions,
                        }}
            />
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
                    onClick={() => setSelectedMood(entry)}
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
