import React from 'react';
import { FaBell, FaBook, FaChartLine, FaHeart, FaPenFancy, FaTrophy, FaUsers, FaChevronRight } from 'react-icons/fa';
import { BsFillChatQuoteFill } from "react-icons/bs";
import Layout from "@/components/layout";

export default function Home() {
  return (

    <Layout>
      <div className={"text-black mt-5 relative "}>test</div>
      <div className={"text-black"}>test</div>
      <div className={"text-black"}>test</div>
      <div className={"text-black"}>test</div>
      <div className={"text-black"}>test</div>
      <div className={"text-black"}>test</div>
      <div className={"text-black"}>test</div>
      <div className={"text-black"}>test</div>


    </Layout>
    // <div className="flex h-screen">
    //   {/* Sidebar */}
    //   <div className="w-64 bg-white shadow-md p-4">
    //     <div className="mb-8">
    //       <h2 className="text-xl font-semibold">Rebirth Talk</h2>
    //       <div className="mt-4">
    //         <div className="flex items-center space-x-2">
    //           <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center text-xl">A</div>
    //           <div className={"flex-col gap-0"}>
    //             <span className={"text-black"}>Alexa Harrison</span>
    //             <a href="/" className="text-blue-500 block">View profile</a>
    //           </div>
    //
    //           <FaChevronRight color={"black"}/>
    //
    //         </div>
    //       </div>
    //     </div>
    //     <nav className="space-y-4">
    //     <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
    //         <FaBook className="mr-3"/>
    //         <span>Confessions</span>
    //       </a>
    //       <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
    //         <FaHeart className="mr-3"/>
    //         <span>Success stories</span>
    //       </a>
    //       <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
    //         <BsFillChatQuoteFill className="mr-3"/>
    //         <span>Motivational Quotes</span>
    //       </a>
    //       <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
    //         <FaChartLine className="mr-3"/>
    //         <span>Tracker</span>
    //       </a>
    //       <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
    //         <FaPenFancy className="mr-3"/>
    //         <span>Journal</span>
    //       </a>
    //       <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
    //         <FaUsers className="mr-3"/>
    //         <span>Support Groups</span>
    //       </a>
    //       <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
    //         <FaTrophy className="mr-3"/>
    //         <span>Achievements and Badges</span>
    //       </a>
    //     </nav>
    //   </div>
    //
    //   {/* Main content */}
    //   <div className="flex-1 bg-gray-50 p-6">
    //     <header className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-6">
    //       <div className="flex items-center space-x-4">
    //         <h1 className="text-2xl font-semibold">Campfire</h1>
    //         <input
    //           type="text"
    //           placeholder="Search for topics and discussions"
    //           className="bg-gray-100 p-2 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         />
    //       </div>
    //       <div className="flex items-center space-x-6">
    //         <button className="bg-blue-500 text-white p-2 rounded-full">+</button>
    //         <img
    //           src="https://via.placeholder.com/40"
    //           alt="User Profile"
    //           className="w-10 h-10 rounded-full"
    //         />
    //       </div>
    //     </header>
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //       {/* Profile Strength */}
    //       <div className="bg-purple-100 p-4 rounded-lg">
    //         <h2 className="font-semibold">Your profile strength</h2>
    //         <p className="mt-2">Youngling 🌱</p>
    //         <div className="bg-purple-300 w-full h-2 rounded-lg mt-2">
    //           <div className="bg-purple-600 w-1/3 h-2 rounded-lg"></div>
    //         </div>
    //       </div>
    //       {/* Next Steps */}
    //       <div className="bg-white shadow-lg p-4 rounded-lg col-span-2">
    //         <h2 className="text-lg font-semibold">Let's start with the basics</h2>
    //         <ul className="list-disc list-inside mt-2 space-y-1">
    //           <li><span className="line-through">Verify email</span></li>
    //           <li><span className="line-through">Fill up your experience level</span></li>
    //           <li>Book your first session</li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="mt-8">
    //       <h2 className="font-semibold text-lg mb-4">Your top matches</h2>
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //         <div className="bg-white shadow-lg p-4 rounded-lg">
    //           <div className="flex items-center space-x-4">
    //             <img
    //               src="https://via.placeholder.com/150"
    //               alt="Chelsey"
    //               className="w-16 h-16 rounded-full"
    //             />
    //             <div>
    //               <h4 className="font-semibold">Chelsey MacNeill</h4>
    //               <p>Senior Analytics Product Manager</p>
    //               <p>Compass</p>
    //               <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg">Confirm Session</button>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="bg-white shadow-lg p-4 rounded-lg">
    //           <div className="flex items-center space-x-4">
    //             <img
    //               src="https://via.placeholder.com/150"
    //               alt="Elba"
    //               className="w-16 h-16 rounded-full"
    //             />
    //             <div>
    //               <h4 className="font-semibold">Elba Francis</h4>
    //               <p>Video Production Specialist</p>
    //               <p>Nexstar</p>
    //               <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg">Confirm Session</button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
