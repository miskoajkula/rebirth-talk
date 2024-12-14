import React from 'react';
import Calendar from "react-calendar";
import './calendar.css'

const RightSidebar = () => {
  return (
    <div className="w-96  pl-4 border-l-2 bg-gray-50">

      <Calendar className={"react-calendar mt-8"} />

    </div>
  );
};

export default RightSidebar;
