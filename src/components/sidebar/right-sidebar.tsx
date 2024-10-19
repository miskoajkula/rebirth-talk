import React from 'react';
import { FaBook, FaChartLine, FaChevronRight, FaHeart, FaPenFancy, FaTrophy, FaUsers } from "react-icons/fa";
import { BsChatQuote, BsFillChatQuoteFill } from "react-icons/bs";
import { ImQuotesLeft } from "react-icons/im";

const RightSidebar = () => {
  return (
    <div className="w-96 bg-white p-4 border-l-2 ">


      <div>
        <p className={"mb-8 text-[#067168] text-xl font-bold text-end"}>Today's Quoute</p>
        <div className={"thought"}  >
          <p>
            <BsChatQuote className="w-64 h-60 rounded-full" />
            <span>
            Your self-worth is determined by you. You don't have to depend on someone telling you who you are.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
