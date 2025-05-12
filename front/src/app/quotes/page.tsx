"use client";

import React from "react";
import Layout from "@/components/layout";

const quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
    date: "November 8, 2024",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
    date: "November 7, 2024",
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
    date: "November 6, 2024",
  },
  {
    text: "It always seems impossible until it’s done.",
    author: "Nelson Mandela",
    date: "November 5, 2024",
  },
];

const Quotes = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
            Daily Motivational Quotes
          </h1>
          <p className="text-center text-lg text-gray-600 mb-10">
            Fuel Your Journey, One Inspiring Thought at a Time
          </p>

          {/* Featured Quote */}
          <div className="bg-white p-8 rounded-3xl shadow-xl mb-12 relative overflow-hidden">
            <span className="absolute top-4 left-4 text-8xl text-gray-100">“</span>
            <blockquote className="text-2xl font-semibold text-gray-800 relative">
              "Believe you can and you're halfway there."
            </blockquote>
            <cite className="block text-gray-500 mt-4">- Theodore Roosevelt</cite>
            <p className="text-gray-400 text-sm mt-1">November 9, 2024</p>
          </div>

          {/* Quotes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {quotes.map((q, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <blockquote className="text-lg text-gray-700">"{q.text}"</blockquote>
                <span className="block text-gray-500 text-sm mt-3">- {q.author}</span>
                <p className="text-gray-400 text-xs mt-1">{q.date}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-purple-600 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-purple-700 transition">
              Load More Quotes
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quotes;
