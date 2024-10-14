import React from 'react';
import { FaBook, FaChartLine, FaChevronRight, FaHeart, FaPenFancy, FaTrophy, FaUsers } from "react-icons/fa";
import { BsFillChatQuoteFill } from "react-icons/bs";

const RightSidebar = () => {
  return (
    <div className="w-96 bg-white p-4 border-l-2">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Rebirth Talk</h2>
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center text-xl">A</div>
            <div className={"flex-col gap-0"}>
              <span className={"text-black"}>Alexa Harrison</span>
              <a href="/" className="text-blue-500 block">View profile</a>
            </div>

            <FaChevronRight color={"black"}/>

          </div>
        </div>
      </div>
      <nav className="space-y-4">
        <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <FaBook className="mr-3"/>
          <span>Confessions</span>
        </a>
        <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <FaHeart className="mr-3"/>
          <span>Success stories</span>
        </a>
        <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <BsFillChatQuoteFill className="mr-3"/>
          <span>Motivational Quotes</span>
        </a>
        <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <FaChartLine className="mr-3"/>
          <span>Tracker</span>
        </a>
        <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <FaPenFancy className="mr-3"/>
          <span>Journal</span>
        </a>
        <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <FaUsers className="mr-3"/>
          <span>Support Groups</span>
        </a>
        <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <FaTrophy className="mr-3"/>
          <span>Achievements and Badges</span>
        </a>
      </nav>
    </div>
  );
};

export default RightSidebar;
