"use client";

import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout";
import {
  FiAward,
  FiHeart,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiStar,
  FiZap,
  FiGift,
  FiSun,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

const milestones = [
  { days: 1, title: "First Step", icon: FiHeart, color: "bg-pink-500" },
  { days: 3, title: "Finding Strength", icon: FiTrendingUp, color: "bg-blue-500" },
  { days: 7, title: "Week Warrior", icon: FiShield, color: "bg-green-500" },
  { days: 14, title: "Two Week Hero", icon: FiStar, color: "bg-purple-500" },
  { days: 21, title: "Three Week Strong", icon: FiTarget, color: "bg-indigo-500" },
  { days: 30, title: "Month Champion", icon: FiAward, color: "bg-yellow-500" },
  { days: 45, title: "Freedom Fighter", icon: FiZap, color: "bg-orange-500" },
  { days: 60, title: "Two Month Strong", icon: FiShield, color: "bg-teal-500" },
  { days: 90, title: "Quarter Master", icon: FaCrown, color: "bg-emerald-500" },
  { days: 120, title: "Four Month Hero", icon: FiGift, color: "bg-red-500" },
  { days: 150, title: "Five Month Star", icon: FiStar, color: "bg-cyan-500" },
  { days: 180, title: "Half Year King", icon: FaCrown, color: "bg-violet-500" },
  { days: 210, title: "Seven Month Pro", icon: FiTarget, color: "bg-lime-500" },
  { days: 240, title: "Eight Month Elite", icon: FiZap, color: "bg-rose-500" },
  { days: 270, title: "Nine Month Legend", icon: FiAward, color: "bg-sky-500" },
  { days: 300, title: "Ten Month Master", icon: FaCrown, color: "bg-amber-500" },
  { days: 330, title: "Eleven Month Pro", icon: FiStar, color: "bg-fuchsia-500" },
  {
    days: 365,
    title: "Year Champion",
    icon: FiSun,
    color: "bg-gradient-to-r from-yellow-400 to-orange-500",
  },
  {
    days: 500,
    title: "Legend Status",
    icon: FaCrown,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    days: 730,
    title: "Two Year Master",
    icon: FiSun,
    color: "bg-gradient-to-r from-blue-500 to-purple-500",
  },
  {
    days: 1000,
    title: "Thousand Days",
    icon: FiGift,
    color: "bg-gradient-to-r from-yellow-500 to-red-500",
  },
  {
    days: 1095,
    title: "Three Year King",
    icon: FaCrown,
    color: "bg-gradient-to-r from-green-500 to-blue-500",
  },
];

const inspirationalQuotes = [
  "One day at a time, one choice at a time.",
  "Every day sober is a victory worth celebrating.",
  "You are stronger than your struggles.",
  "Progress, not perfection.",
  "Small steps, big changes.",
];

const FreedomStreak = () => {
  const [streakDays, setStreakDays] = useState(5);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const milestonesRef = useRef(null);

  const nextMilestone = milestones.find((m) => m.days > streakDays);
  const lastAchievedMilestone = milestones.filter((m) => m.days <= streakDays).pop();

  const progressToNext = nextMilestone ? (streakDays / nextMilestone.days) * 100 : 100;
  const daysToNext = nextMilestone ? nextMilestone.days - streakDays : 0;

  // Auto scroll to current milestone
  useEffect(() => {
    if (milestonesRef.current && nextMilestone) {
      const milestoneIndex = milestones.findIndex((m) => m.days === nextMilestone.days);
      const scrollContainer = milestonesRef.current;
      const milestoneWidth = 144; // 128px width + 16px gap
      const scrollPosition = Math.max(0, (milestoneIndex - 1) * milestoneWidth);

      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [streakDays, nextMilestone]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleAddDay = () => {
    const newStreak = streakDays + 1;
    setStreakDays(newStreak);

    if (milestones.some((m) => m.days === newStreak)) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2500);
    }
  };

  const handleReset = () => {
    if (window.confirm("Start a new beginning?")) {
      setStreakDays(0);
    }
  };

  const getStreakMessage = () => {
    if (streakDays === 0) return "Today is day one of your journey.";
    if (streakDays < 7) return "You're building momentum, keep going!";
    if (streakDays < 30) return "Your strength is growing every day!";
    return "You're an inspiration!";
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-pine-green-700 mb-2">
              Freedom Streak
            </h1>
            <p className="text-gray-600">
              Your journey to healing, tracked one day at a time.
            </p>
          </header>

          {/* Celebration */}
          {showCelebration && lastAchievedMilestone && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4">
                <div
                  className={`w-16 h-16 ${lastAchievedMilestone.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <lastAchievedMilestone.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  🎉 {lastAchievedMilestone.title}!
                </h2>
              </div>
            </div>
          )}

          {/* Milestones - Horizontal Scroll */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Your Journey
            </h2>
            <div
              ref={milestonesRef}
              className="overflow-x-auto pb-2 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-4 px-2" style={{ minWidth: "max-content" }}>
                {milestones.map((milestone, index) => {
                  const isAchieved = streakDays >= milestone.days;
                  const isNext = milestone === nextMilestone;
                  const isCurrent = isNext && index > 0;

                  return (
                    <div
                      key={milestone.days}
                      className={`flex-shrink-0 flex flex-col items-center p-4 rounded-xl transition-all duration-300 w-32 ${
                        isAchieved
                          ? "bg-white shadow-lg ring-2 ring-green-200 transform scale-105"
                          : isNext
                            ? "bg-white shadow-lg ring-2 ring-blue-400 transform scale-110"
                            : "bg-white shadow-md hover:shadow-lg"
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all ${
                          isAchieved
                            ? milestone.color
                            : isNext
                              ? "bg-blue-500"
                              : "bg-gray-300"
                        }`}
                      >
                        <milestone.icon
                          className={`w-6 h-6 ${isAchieved || isNext ? "text-white" : "text-gray-500"}`}
                        />
                      </div>
                      <div className="text-center">
                        <div
                          className={`font-semibold text-sm leading-tight mb-1 ${
                            isAchieved
                              ? "text-green-800"
                              : isNext
                                ? "text-blue-800"
                                : "text-gray-600"
                          }`}
                        >
                          {milestone.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {milestone.days} day{milestone.days !== 1 ? "s" : ""}
                        </div>
                      </div>
                      {isAchieved && <div className="text-green-600 text-lg mt-2">✓</div>}
                      {isNext && (
                        <div className="text-blue-600 text-xs font-medium mt-2">Next</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>

          {/* Main Card */}
          <div className="bg-white shadow-xl rounded-3xl p-8 text-center">
            {/* Streak Display */}
            <div className="mb-8">
              <div className="text-8xl font-extrabold text-pine-green-600 mb-2">
                {streakDays}
              </div>
              <div className="text-xl text-gray-500 font-medium mb-3">
                {streakDays === 1 ? "day strong" : "days strong"}
              </div>
              <p className="text-gray-600 text-lg">{getStreakMessage()}</p>
            </div>

            {/* Next Milestone Progress */}
            {nextMilestone && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Next: {nextMilestone.title}</span>
                  <span className="text-pine-green-600 font-medium">
                    {daysToNext} days to go
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-pine-green-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(progressToNext, 8)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Quote */}
            <div className="bg-pine-green-50 border-l-4 border-pine-green-500 p-4 rounded-lg mb-8">
              <p className="text-pine-green-900 italic text-lg">
                "{inspirationalQuotes[currentQuote]}"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAddDay}
                className="bg-pine-green-600 hover:bg-pine-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition transform hover:scale-105"
              >
                +1 Day Clean
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition"
              >
                New Beginning
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FreedomStreak;
