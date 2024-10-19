import React from 'react';
import { FaChevronRight } from "react-icons/fa";

import { FaScroll } from "react-icons/fa";
import { LuScroll } from "react-icons/lu";

import { BiTrophy, BiSolidTrophy } from "react-icons/bi";


import { BsChatSquareQuote } from "react-icons/bs";
import { BsChatSquareQuoteFill } from "react-icons/bs";

import { BsCalendar2Check, BsCalendar2CheckFill } from "react-icons/bs";


import { PiCirclesThreeLight, PiNotebookDuotone, PiNotebookFill } from "react-icons/pi";

import { BsPeople, BsPeopleFill } from "react-icons/bs";


const Sidebar = () => {
  return (
    <div className="w-96 bg-white p-4 border-r-2 ">
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
          <LuScroll className="mr-3"/>
          <span>Confessions</span>
        </a>

        <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <BiTrophy className="mr-3"/>
          <span>Success stories</span>
        </a>
        <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <BsChatSquareQuote className="mr-3"/>
          <span>Quotes</span>
        </a>
        <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <BsCalendar2Check className="mr-3"/>
          <span>Freedom Streak</span>
        </a>
        <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <PiNotebookDuotone className="mr-3"/>
          <span>Journal</span>
        </a>
        <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <PiCirclesThreeLight className="mr-3"/>
          <span>Healing Circles</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
