import React from 'react';
import Layout from "@/components/layout";

const Quotes = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center pt-14 px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Daily Motivational Quotes</h1>
          <p className="text-lg text-gray-500 mb-6">Fuel Your Journey, One Quote at a Time</p>

          <div className="bg-teal-100 p-6 rounded-lg mb-6">
            <blockquote className="text-xl font-semibold text-teal-700">"Believe you can and you're halfway there."</blockquote>
            <cite className="block text-teal-500 mt-2">- Theodore Roosevelt</cite>
            <p className="text-gray-400 text-sm mt-1">November 9, 2024</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">"The only limit to our realization of tomorrow is our doubts of today."</p>
              <span className="block text-gray-400 text-sm mt-2">- Franklin D. Roosevelt</span>
              <p className="text-gray-400 text-xs mt-1">November 8, 2024</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">"Success is not final, failure is not fatal: It is the courage to continue that counts."</p>
              <span className="block text-gray-400 text-sm mt-2">- Winston Churchill</span>
              <p className="text-gray-400 text-xs mt-1">November 7, 2024</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">"What lies behind us and what lies before us are tiny matters compared to what lies within us."</p>
              <span className="block text-gray-400 text-sm mt-2">- Ralph Waldo Emerson</span>
              <p className="text-gray-400 text-xs mt-1">November 6, 2024</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">"It always seems impossible until it’s done."</p>
              <span className="block text-gray-400 text-sm mt-2">- Nelson Mandela</span>
              <p className="text-gray-400 text-xs mt-1">November 5, 2024</p>
            </div>
          </div>

          <button className="mt-6 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none">
            Load More Quotes
          </button>
        </div>
      </div>

    </Layout>
  );
};

export default Quotes;
