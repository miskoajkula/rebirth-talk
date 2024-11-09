import React from 'react';
import Layout from "@/components/layout";
import AuthLayout from "@/components/auth-layout";
import Link from "next/link";

const Page = () => {
  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Password Reset!</h2>
      <p className="text-sm text-gray-600 mb-6">
         <Link href="/auth" className="text-indigo-600">Back to Login</Link>
      </p>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <input type="email" className="mt-1 block w-full p-2 border rounded-md"/>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            {/*<input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>*/}
            {/*<span className="ml-2 text-sm text-gray-700">Remember this device</span>*/}
          </label>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-[#047871] text-white font-semibold rounded-md hover:bg-indigo-700">
          Submit
        </button>
      </form>

    </AuthLayout>
  );
};

export default Page;
