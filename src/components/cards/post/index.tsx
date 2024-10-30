"use client"

import React, { FC } from 'react'
import { BiCommentDetail, BiHeart, BiShare, BiSolidBadgeCheck } from "react-icons/bi";
// import labelMap from "@/constants/label-map";
import { GiPodiumWinner } from "react-icons/gi";
import { AiOutlineBulb, AiOutlineExclamationCircle, AiOutlineMessage, AiOutlineStar } from "react-icons/ai";
import { FaCircle, FaFistRaised, FaHandHoldingHeart, FaLeaf } from "react-icons/fa";
import { MdOutlinePsychology, MdOutlineSelfImprovement } from "react-icons/md";
import { BsMoonStars } from "react-icons/bs";

interface PostCardProps {
  isSuccess?: boolean;
}

interface PostCardProps {
  labelType: keyof typeof labelMap; // Define label type prop based on the labelMap keys
}

export const labelMap = {
  success: {
    text: "Success Story",
    bgColor: "bg-green-600",
    icon: <BiSolidBadgeCheck />
  },
  confession: {
    text: "Confession",
    bgColor: "bg-blue-500",
    icon: <AiOutlineMessage />
  },
  struggle: {
    text: "Struggles & Strength",
    bgColor: "bg-teal-500",
    icon: <GiPodiumWinner />
  },
  reflection: {
    text: "True Reflections",
    bgColor: "bg-purple-500",
    icon: <AiOutlineBulb />
  },
  learning: {
    text: "Learning Moments",
    bgColor: "bg-yellow-500",
    icon: <AiOutlineStar />
  },
  turningPoint: {
    text: "Turning Point",
    bgColor: "bg-emerald-500",
    icon: <FaLeaf />
  },
  lettingGo: {
    text: "Letting Go",
    bgColor: "bg-blue-400",
    icon: <FaHandHoldingHeart />
  },
  vulnerability: {
    text: "Vulnerability",
    bgColor: "bg-rose-500",
    icon: <BiHeart />
  },
  temptation: {
    text: "Overcoming Temptation",
    bgColor: "bg-purple-700",
    icon: <AiOutlineExclamationCircle />
  },
  innerBattles: {
    text: "Inner Battles",
    bgColor: "bg-gray-500",
    icon: <MdOutlinePsychology />
  },
  growth: {
    text: "Growth in Progress",
    bgColor: "bg-green-400",
    icon: <FaLeaf />
  },
  silentStruggles: {
    text: "Silent Struggles",
    bgColor: "bg-purple-400",
    icon: <FaFistRaised />
  },
  breakingPatterns: {
    text: "Breaking Patterns",
    bgColor: "bg-orange-500",
    icon: <AiOutlineExclamationCircle />
  },
  clarity: {
    text: "Finding Clarity",
    bgColor: "bg-sky-400",
    icon: <AiOutlineBulb />
  },
  forgiveness: {
    text: "Seeking Forgiveness",
    bgColor: "bg-pink-400",
    icon: <FaHandHoldingHeart />
  },
  renewal: {
    text: "Renewal & Hope",
    bgColor: "bg-green-300",
    icon: <FaLeaf />
  },
  pastShadows: {
    text: "Past Shadows",
    bgColor: "bg-gray-700",
    icon: <BsMoonStars />
  },
  selfAcceptance: {
    text: "Accepting Myself",
    bgColor: "bg-beige-400",
    icon: <MdOutlineSelfImprovement />
  }
};
const PostCard: FC<PostCardProps> = ({ labelType }) => {
  const label = labelMap[labelType] || labelMap.success; // Default to "success" if none provided

  return (
    <div className="flex flex-col w-full mx-auto my-6 border-b-2">
      <div className="md:flex">
        <div className="flex-shrink-0">
          <img
            className="h-12 w-12 rounded-full mx-4 mt-4"
            src="https://thispersondoesnotexist.com/"
            alt="User Profile"
          />
        </div>
        <div className="p-4">
          <div className="flex gap-2 items-center">
            <div className="tracking-wide text-sm text-gray-500">#show • 4d</div>
            <div className={`flex gap-1 items-center  ${label.bgColor} rounded-xl text-white px-2 py-1`}>
              {label.icon}
              <span className="text-xs">{label.text}</span>
            </div>
          </div>
          <p className="mt-1 text-lg font-semibold text-black">
            I recently started documenting my thoughts while coding!
          </p>
          <p className="mt-1 text-gray-700">
            Initially, it feels more of a time-consuming thing, but it helps a lot in clear thinking, reducing the complexities and you can
            make sure that nothing is overlooked.
          </p>
          <p className="mt-2 text-gray-700">
            So far, liking this process.
          </p>
          <div className="flex items-center mt-4 gap-8">
            <button className="text-gray-500 text-sm flex items-center gap-1">
              <BiHeart className="w-[16px] h-[16px]" />
              <span>12</span>
            </button>
            <button className="text-gray-500 text-sm flex items-center gap-1">
              <BiCommentDetail className="w-[16px] h-[16px]" />
              <span>12</span>
            </button>
            <button className="text-gray-500 text-sm flex items-center gap-1">
              <BiShare className="w-[16px] h-[16px] scale-x-[-1]" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
