import React from 'react';
import Layout from "@/components/layout";
import AuthLayout from "@/components/auth-layout";
import Link from "next/link";

const Page = () => {
  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome Back!</h2>
      <p className="text-sm text-gray-600 mb-6">
        New user? <Link href="/auth/register" className="text-indigo-600">Register</Link>
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
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            {/*<input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>*/}
            {/*<span className="ml-2 text-sm text-gray-700">Remember this device</span>*/}
          </label>
          <Link href={"/auth/password-reset"} className={"text-sm text-indigo-600"}>
            Forgot password?
          </Link>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-[#047871] text-white font-semibold rounded-md hover:bg-indigo-700">
          Sign in
        </button>
      </form>

    </AuthLayout>
  );
};

export default Page;
