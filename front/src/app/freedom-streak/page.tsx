"use client";

import React, { useState } from "react";
import Layout from "@/components/layout";

const Quotes = () => {
  const [streakDays, setStreakDays] = useState(0);

  return (
    <Layout>
      <div className="bg-gradient-to-br from-teal-50 to-white min-h-screen flex items-center justify-center px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl text-center">
          <h1 className="text-4xl font-bold text-pine-green-700 mb-2">Freedom Streak</h1>
          <p className="text-gray-600 mb-6">
            Your journey to healing, tracked one day at a time.
          </p>

          {/* Streak Display */}
          <div className="mb-6">
            <div className="text-7xl font-extrabold text-pine-green-600">
              {streakDays} <span className="text-2xl text-gray-500">days</span>
            </div>
            <p className="text-md text-gray-500 mt-2">
              Consistency builds strength. Keep going!
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-6">
            <div
              className="bg-green-500 h-full transition-all duration-500"
              style={{ width: `${Math.min(streakDays * 10, 100)}%` }}
            />
          </div>

          {/* Inspirational Quote */}
          <div className="bg-pine-green-100 text-pine-green-900 italic p-4 rounded-lg shadow-inner mb-8">
            "Small steps, big changes."
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setStreakDays(streakDays + 1)}
              className="bg-pine-green-600 hover:bg-pine-green-700 text-white px-6 py-2 rounded-full font-semibold shadow-md transition"
            >
              +1 Day
            </button>
            <button
              onClick={() => setStreakDays(0)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quotes;
