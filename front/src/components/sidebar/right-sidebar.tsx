"use client";

import React from "react";
import Calendar from "react-calendar";
import { FaCalendarAlt, FaChartLine, FaQuoteRight } from "react-icons/fa";
import "./calendar.css";

const RightSidebar = () => {
  return (
    <aside className="w-96 pl-6 border-l bg-gray-50 overflow-y-auto max-h-[90vh] py-6">
      <div className="sticky top-4 space-y-8">
        {/* Activity Section */}
        <Calendar className="react-calendar rounded-lg overflow-hidden" />

        {/* Weekly Highlights */}
        <div>
          <div className="flex items-center">
            <FaChartLine className="text-green-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-700">Weekly Highlights</h2>
          </div>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2" />2
              Journal Entries
            </li>
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2" />
              5-Day Freedom Streak
            </li>
          </ul>
        </div>

        {/* Motivation */}
        <section className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center mb-2">
            <FaQuoteRight className="text-purple-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-700">Today's Motivation</h2>
          </div>
          <p className="mt-2 text-gray-600 italic">
            “Document progress, not perfection.”
          </p>
        </section>
      </div>
    </aside>
  );
};

export default RightSidebar;
