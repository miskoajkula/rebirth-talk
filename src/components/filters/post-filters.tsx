"use client"

import React, { useState, useEffect } from 'react';
import { FaHashtag } from "react-icons/fa6";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { GiConvergenceTarget } from "react-icons/gi";
import { VscTarget } from 'react-icons/vsc';
import { FaTags, FaUsers } from "react-icons/fa";
import { BiCategory, BiFilter } from "react-icons/bi";
import { HiOutlineFilter } from "react-icons/hi";

const PostFilters = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [throttleTimeout, setThrottleTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleScroll = () => {
    const mainContent = document.getElementById('main-content');
    const currentScrollY = mainContent?.scrollTop || 0;

    if (currentScrollY > lastScrollY) {
      setShowFilters(false); // Scrolling down
    } else {
      setShowFilters(true); // Scrolling up
    }
    setLastScrollY(currentScrollY);
  };

  // Throttle the scroll event handler
  const throttleScroll = () => {
    if (!throttleTimeout) {
      setThrottleTimeout(setTimeout(() => {
        console.log("handleScroll");
        handleScroll();
        setThrottleTimeout(null); // Clear timeout
        }, 100)); // Adjust the delay as needed
    }
  };

  useEffect(() => {
    const mainContent = document.getElementById('main-content');

    mainContent?.addEventListener('scroll', throttleScroll);

    return () => {
      mainContent?.removeEventListener('scroll', throttleScroll);
    };
  }, [lastScrollY, throttleTimeout]);

  return (
    <div
      className={`border-b-2 pt-1 sticky top-0 z-10 bg-white pb-1 flex justify-center gap-4 w-full transition-transform duration-300 ${
        showFilters ? 'transform translate-y-0' : 'transform -translate-y-full'
      }`}
    >
      <button
        className="text-black gap-2 focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button">
        <FaUsers color={"black"} className={"w-4 h-4"}/>
        Focus Community
      </button>

      <button
        className="text-black gap-2 focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button">
        <HiOutlineFilter color={"black"} className={"w-4 h-4"}/>
        Filter
      </button>

      <button
        className="text-black gap-2 focus:ring-1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button">
        <HiOutlineArrowsUpDown color={"black"} className={"w-4 h-4"}/>
        Sort
      </button>
    </div>
  );
};

export default PostFilters;
