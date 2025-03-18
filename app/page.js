// app/page.js - Dark mode support
import React from "react";
import TypingTest from "@/components/TypingTest";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 py-12">
        <div className="w-full max-w-3xl p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">
            Speed Test
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Test and improve your typing speed
          </p>
          <Suspense fallback={<p className="text-center">Loading...</p>}>
            <TypingTest />
          </Suspense>
        </div>

        <div className="mt-8 max-w-3xl w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            Why Practice Typing?
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Regular typing practice can significantly improve your
              productivity. The average typing speed is around 40 WPM, but with
              practice, you can reach 80-100+ WPM.
            </p>
            <p>Benefits of faster typing include:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Increased productivity at work or school</li>
              <li>Reduced strain and fatigue when typing for long periods</li>
              <li>
                Better focus on content rather than the mechanical process of
                typing
              </li>
              <li>
                Improved communication speed in chats, emails, and documents
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
