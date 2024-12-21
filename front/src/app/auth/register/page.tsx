import React from 'react';
import Layout from "@/components/layout";
import AuthLayout from "@/components/auth-layout";
import Link from "next/link";

const Page = () => {
  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Registration</h2>
      <p className="text-sm text-gray-600 mb-6">
        Existing User? <Link href="/auth" className="text-indigo-600">Login</Link>
      </p>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <input type="email" className="mt-1 block w-full p-2 border rounded-md"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" className="mt-1 block w-full p-2 border rounded-md"/>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-[#047871] text-white font-semibold rounded-md hover:bg-indigo-700">
          Register
        </button>
      </form>

    </AuthLayout>
  );
};

export default Page;
