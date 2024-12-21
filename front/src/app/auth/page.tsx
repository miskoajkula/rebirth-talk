import React from 'react';
import Layout from "@/components/layout";
import AuthLayout from "@/components/auth-layout";
import Link from "next/link";

const Page = () => {
  return (
    <AuthLayout>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get Started</h2>

      <form className="space-y-4" action={"/auth/login"}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <input type="email" className="mt-1 block w-full p-2 border rounded-md" placeholder={"user@example.com"}/>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-[#047871] text-white font-semibold rounded-md hover:bg-indigo-700">
          Continue
        </button>
        {/*<button type="submit" className="w-full py-2 px-4 bg-[#047871] text-white font-semibold rounded-md hover:bg-indigo-700">*/}
        {/*  Continue REgister*/}
        {/*</button>*/}
        <hr/>
        <p className={"text-center"}>Or</p>
        <a href={"/auth"} className={"flex items-center justify-center gap-4 bg-gray-100 py-2 rounded-md font-medium"}>
          <img src={'/google.svg'}/>
          Continue with Google
        </a>

      </form>

    </AuthLayout>
  );
};

export default Page;
