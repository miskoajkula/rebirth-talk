import React from 'react';
import Calendar from "react-calendar";
import './calendar.css'

const RightSidebar = () => {
  return (
    <div className="w-96  pl-4 border-l-2 bg-gray-50 overflow-scroll pb-24 max-h-[90vh]">

      <h2 className={"text-center mt-8 text-lg font-medium text-gray-600"}>Your activity</h2>
      <hr/>

      <Calendar className={"react-calendar  "}/>
      <hr/>
      <h2 className={"text-center mt-8 text-gray-600 text-lg font-medium"}>Weekly Highlights</h2>
      <div>
        <p className={"text-left mt-8 text-sm font-medium text-gray-600"}>
          - 2 Journal Entries
        </p>
        <p className={"text-left mt-8 text-sm font-medium text-gray-600"}>
          - 5-Day Freedom Streak
        </p>
      </div>
      <h2 className={"text-center mt-8 text-gray-600 text-lg font-medium"}>Today Motivation</h2>
      <p className={"text-left mt-8 text-sm font-medium text-gray-600"}>
        "Document progress, not perfection."
      </p>
    </div>
  );
};

export default RightSidebar;
