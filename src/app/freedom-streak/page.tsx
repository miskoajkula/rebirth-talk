'use client'

import React, { useState } from 'react';
import Layout from "@/components/layout";

const Quotes = () => {

  // State to track days and motivational quotes
  const [streakDays, setStreakDays] = useState(0);

  const incrementStreak = () => setStreakDays(streakDays + 1);


  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-blue-600">Freedom Streak</h1>
          <p className="text-gray-600 mt-4">
            Track your journey to freedom, one day at a time.
          </p>

          {/* Streak Counter */}
          <div className="my-8">
            <div className="text-6xl font-extrabold text-green-500">
              {streakDays} <span className="text-2xl text-gray-500">days</span>
            </div>
            <p className="text-sm text-gray-500">Keep going, you're doing great!</p>
          </div>

          {/* Streak Progress Bar */}
          <div className="h-3 w-full bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{width: `${streakDays * 10}%`}}
            ></div>
          </div>

          {/* Motivational Quote */}
          <div className="mt-6 bg-blue-50 p-4 rounded-lg shadow-inner">
            <p className="text-blue-600 italic">"Small steps, big changes."</p>
          </div>

          {/* Streak Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={incrementStreak}
              className="px-6 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition"
            >
              +1 Day
            </button>
            <button
              onClick={() => setStreakDays(0)}
              className="px-6 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition"
            >
              Reset Streak
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quotes;
