"use client"

import React from 'react';
import { FaChevronRight, FaScroll } from "react-icons/fa";
import { LuScroll } from "react-icons/lu";

import { BiSolidTrophy, BiTrophy } from "react-icons/bi";


import { BsCalendar2Check, BsCalendar2CheckFill, BsChatSquareQuote, BsChatSquareQuoteFill } from "react-icons/bs";


import { PiCirclesThreeFill, PiCirclesThreeLight, PiNotebookDuotone, PiNotebookFill } from "react-icons/pi";
import { usePathname } from "next/navigation";

const nav = [
  {
    name: "Confessions",
    path: "/confessions",
    icon: LuScroll,
    selectedIcon: FaScroll
  },
  // {
  //   name: "Success stories",
  //   path: "/success-stories",
  //   icon: BiTrophy,
  //   selectedIcon: BiSolidTrophy
  // },
  {
    name: "Daily Quotes",
    path: "/quotes",
    icon: BsChatSquareQuote,
    selectedIcon: BsChatSquareQuoteFill
  },
  {
    name: "Freedom Streak",
    path: "/freedom-streak",
    icon: BsCalendar2Check,
    selectedIcon: BsCalendar2CheckFill
  },
  {
    name: "Journal",
    path: "/journal",
    icon: PiNotebookDuotone,
    selectedIcon: PiNotebookFill
  },
  {
    name: "Healing Circles",
    path: "/healing-circles",
    icon: PiCirclesThreeLight,
    selectedIcon: PiCirclesThreeFill
  }
]

const Sidebar = () => {
  const pathname = usePathname()

  console.log(pathname)
  return (
    <div className="w-96  p-4 border-r-2 bg-gray-50">
      <div className="mb-8">
        <div className="mt-12">
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
        {
          nav.map(item => {
            let selected = pathname && pathname.indexOf(item.path) > -1

            // if homepage
            if(pathname === "/" && item.name === "Confessions") {
              selected = true
            }

            return <a key={item.name} href={item.path}
                      className={`flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg ${selected ? "bg-gray-50" : ''}`}>
              {selected ? <item.selectedIcon/> : <item.icon/>}
              <span className={`ml-3 ${selected ? ' font-extrabold ' : 'font-light'}`}>{item.name}</span>
            </a>
          })
        }

      </nav>
    </div>
  );
};

export default Sidebar;
