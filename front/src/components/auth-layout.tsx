import React from 'react';
import { Hind, Roboto } from 'next/font/google';
import Link from 'next/link';

const roboto = Hind({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300','400', '500', '600', '700']
});

const AuthLayout = ({ children }: any) => {
  return (
    <div className={`${roboto.className} flex min-h-screen bg-gray-100`}>
      {/* Left Side - Information Section */}
      <div className="hidden overflow-hidden md:flex flex-col justify-center items-start bg-pine-green-700 text-white p-16 w-full relative">
        <img src={"/test2.jpg"} className={'absolute opacity-20 object-cover left-0 w-full h-full animated-image'}/>

        <div className={"z-10"}>
          <h1 className="text-4xl font-bold mb-4">Rebirth Talk</h1>
          <p className="text-lg leading-relaxed mb-6">
            A supportive platform for mindfulness, confessions, and recovery.<br/>
            Join us on your journey to self-growth and healing.
          </p>
          <Link href={"/"}>
            <button className="px-6 py-2 bg-white text-[#047871] rounded-md font-medium hover:bg-gray-100">
              Back to Homepage
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex flex-col justify-center items-center w-full max-w-md p-8 bg-white shadow-lg">
        <div className="w-full max-w-xs">
          {children} {/* Insert the form component here */}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
