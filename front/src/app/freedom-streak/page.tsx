"use client";

import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout";
import {
  FiSun,
  FiMoon,
  FiSunrise,
  FiActivity,
  FiCompass,
  FiAnchor,
  FiFeather,
  FiStar,
  FiAward,
  FiHeart,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";
import {
  RiLeafLine,
  RiFlowerLine,
  RiTreeLine,
  RiFireLine,
  RiSeedlingLine,
  RiPlantLine,
} from "react-icons/ri";

const milestones = [
  { days: 1, title: "First Light", icon: FiSunrise, color: "bg-amber-400" },
  { days: 3, title: "Growing", icon: RiSeedlingLine, color: "bg-green-400" },
  { days: 7, title: "Week Bloom", icon: RiFlowerLine, color: "bg-pink-400" },
  { days: 14, title: "Two Week Rise", icon: FiActivity, color: "bg-blue-400" },
  { days: 21, title: "Three Week Flow", icon: FiFeather, color: "bg-purple-400" },
  { days: 30, title: "Month Bright", icon: FiSun, color: "bg-yellow-500" },
  { days: 45, title: "Freedom Path", icon: FiCompass, color: "bg-orange-400" },
  { days: 60, title: "Two Month Strong", icon: FiAnchor, color: "bg-teal-400" },
  { days: 90, title: "Quarter Tree", icon: RiTreeLine, color: "bg-emerald-500" },
  { days: 120, title: "Four Month Shine", icon: FiStar, color: "bg-indigo-400" },
  { days: 150, title: "Five Month Leaf", icon: RiLeafLine, color: "bg-green-500" },
  { days: 180, title: "Half Year Fire", icon: RiFireLine, color: "bg-red-500" },
  { days: 210, title: "Seven Month Rise", icon: FiTrendingUp, color: "bg-cyan-400" },
  { days: 240, title: "Eight Month Gem", icon: FiAward, color: "bg-violet-400" },
  { days: 270, title: "Nine Month Heart", icon: FiHeart, color: "bg-rose-400" },
  { days: 300, title: "Ten Month Star", icon: FiStar, color: "bg-amber-500" },
  { days: 330, title: "Eleven Month Bloom", icon: RiPlantLine, color: "bg-lime-400" },
  {
    days: 365,
    title: "Year Sunrise",
    icon: FiSun,
    color: "bg-gradient-to-r from-yellow-400 to-orange-500",
  },
  {
    days: 500,
    title: "Beyond Heights",
    icon: FiAward,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  {
    days: 730,
    title: "Two Year Moon",
    icon: FiMoon,
    color: "bg-gradient-to-r from-blue-500 to-purple-500",
  },
  {
    days: 1000,
    title: "Thousand Days",
    icon: FiTarget,
    color: "bg-gradient-to-r from-yellow-500 to-red-500",
  },
  {
    days: 1095,
    title: "Three Year Light",
    icon: FiSun,
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
      const milestoneWidth = 100; // Compact width + gap
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

          {/* Milestones - Compact Horizontal Scroll */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">
              Your Journey
            </h2>
            <div
              ref={milestonesRef}
              className="overflow-x-auto pb-2 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-6 px-2 py-3" style={{ minWidth: "max-content" }}>
                {milestones.map((milestone, index) => {
                  const isAchieved = streakDays >= milestone.days;
                  const isNext = milestone === nextMilestone;

                  return (
                    <div
                      key={milestone.days}
                      className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl transition-all duration-300 w-40 ${
                        isAchieved
                          ? "bg-white shadow-md ring-2 ring-pine-green-600 transform scale-105"
                          : isNext
                            ? "bg-white shadow-md ring-2 ring-blue-300 transform scale-110"
                            : "bg-white shadow-sm hover:shadow-md opacity-50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                          isAchieved
                            ? milestone.color
                            : isNext
                              ? "bg-blue-400"
                              : "bg-gray-300"
                        }`}
                      >
                        <milestone.icon
                          className={`w-4 h-4 ${isAchieved || isNext ? "text-white" : "text-gray-500"}`}
                        />
                      </div>
                      <div className="text-center">
                        <div
                          className={`font-medium text-xs leading-tight mb-1 ${
                            isAchieved
                              ? "text-green-700"
                              : isNext
                                ? "text-blue-700"
                                : "text-gray-600"
                          }`}
                        >
                          {milestone.title}
                        </div>
                        <div className="text-xs text-gray-500">{milestone.days}d</div>
                      </div>
                      {isAchieved && <div className="text-green-600 text-sm mt-1">✓</div>}
                      {isNext && (
                        <div className="text-blue-600 text-xs font-medium mt-1">Next</div>
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
