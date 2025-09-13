"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import BottomBar from "../components/bottom-bar";
import Logo from "../components/logo";
import { useRouter } from "next/navigation";

export default function AutoMatchPage() {
  const [matchingStatus, setMatchingStatus] = useState<'matching' | 'matched' | 'failed'>('matching');
  const [matchingProgress, setMatchingProgress] = useState(0);
  const router = useRouter();
  const [matchingTime, setMatchingTime] = useState(0);
  const [activeTab, setActiveTab] = useState("tracking");

  // Simulate the matching process
  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    // Start progress animation
    // eslint-disable-next-line prefer-const
    progressTimer = setInterval(() => {
      setMatchingProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressTimer);
          return 95;
        }
        return prev + Math.random() * 5;
      });
    }, 800);

    // Track matching time
    // eslint-disable-next-line prefer-const
    timer = setInterval(() => {
      setMatchingTime(prev => prev + 1);
    }, 1000);

    // Simulate success after 6-10 seconds
    const matchTimeout = setTimeout(() => {
      setMatchingProgress(100);
      setMatchingStatus('matched');
      clearInterval(timer);
      clearInterval(progressTimer);
      
      // Redirect after showing the "match found" message
      setTimeout(() => {
        router.push('/group-confirmation');
      }, 2500);
    }, 6000 + Math.random() * 4000);

    // Cleanup
    return () => {
      clearTimeout(matchTimeout);
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [router]);

  // Cancel matching and go back
  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Logo />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h1 className="text-xl md:text-2xl font-bold text-green-700 mb-3 text-center">Finding Your Farming Team</h1>
          
          {matchingStatus === 'matching' ? (
            <>
              <div className="text-center text-sm md:text-base text-gray-600 mb-8">
                Matching you with compatible farmers to form an optimal new group...
              </div>
              
              {/* Pulsing farm icons with animation suggesting matching */}
              <div className="flex justify-center mb-8">
                <div className="relative flex items-center">
                  {/* Your farm */}
                  <div className="relative mr-4">
                    <Image 
                      src="/field-map.jpg" 
                      alt="Your farm"
                      width={90} 
                      height={90}
                      className="rounded-full border-4 border-green-500 object-cover"
                    />
                    <div className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-30"></div>
                  </div>
                  
                  {/* Animation connecting icon */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-1 bg-green-400 rounded mb-1 animate-pulse"></div>
                    <div className="w-8 h-1 bg-green-400 rounded mb-1 animate-pulse delay-75"></div>
                    <div className="w-6 h-1 bg-green-400 rounded animate-pulse delay-150"></div>
                  </div>
                  
                  {/* Other farms */}
                  <div className="relative ml-4 flex flex-col">
                    <div className="flex mb-1">
                      <Image 
                        src="/field-map.jpg" 
                        alt="Other farm 1"
                        width={40} 
                        height={40}
                        className="rounded-full border-2 border-green-500 object-cover mr-1"
                      />
                      <Image 
                        src="/field-map.jpg" 
                        alt="Other farm 2"
                        width={40} 
                        height={40}
                        className="rounded-full border-2 border-green-500 object-cover"
                      />
                    </div>
                    <div className="flex">
                      <Image 
                        src="/field-map.jpg" 
                        alt="Other farm 3"
                        width={40} 
                        height={40}
                        className="rounded-full border-2 border-green-500 object-cover mr-1"
                      />
                      <Image 
                        src="/field-map.jpg" 
                        alt="Other farm 4"
                        width={40} 
                        height={40}
                        className="rounded-full border-2 border-green-500 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${matchingProgress}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mb-8">
                <span>Finding farmers...</span>
                <span>{Math.round(matchingProgress)}%</span>
              </div>
              
              {/* Matching status messages */}
              <div className="text-center text-sm text-gray-600 mb-4">
                {matchingTime < 3 && "Analyzing your crop specialties and land characteristics..."}
                {matchingTime >= 3 && matchingTime < 5 && "Finding farmers with complementary skills..."}
                {matchingTime >= 5 && matchingTime < 8 && "Evaluating group compatibility and minimum requirements..."}
                {matchingTime >= 8 && "Finalizing your optimal farming team..."}
              </div>
              
              <div className="text-center text-xs text-gray-500">
                Matching for {matchingTime} seconds
              </div>
              
              <button
                onClick={handleCancel}
                className="w-full py-2 mt-6 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : matchingStatus === 'matched' ? (
            <>
              <div className="text-center text-green-600 font-semibold mb-6">
                New Group Formed!
              </div>
              
              <div className="flex justify-center mb-6">
                {/* Group of matched farmers visualization */}
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <Image 
                      src="/field-map.jpg" 
                      alt="Your farm"
                      width={80} 
                      height={80}
                      className="rounded-full border-4 border-green-500 object-cover z-10"
                    />
                    <Image 
                      src="/field-map.jpg" 
                      alt="Other farm 1"
                      width={60} 
                      height={60}
                      className="rounded-full border-2 border-green-500 object-cover -ml-4 mt-6"
                    />
                    <Image 
                      src="/field-map.jpg" 
                      alt="Other farm 2"
                      width={60} 
                      height={60}
                      className="rounded-full border-2 border-green-500 object-cover -ml-4 -mt-6"
                    />
                    <Image 
                      src="/field-map.jpg" 
                      alt="Other farm 3"
                      width={60} 
                      height={60}
                      className="rounded-full border-2 border-green-500 object-cover -ml-4"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-gray-600 mb-6">
                We have formed a compatible group of farmers! Redirecting to review and confirm your new group...
              </div>
              
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center text-red-600 font-semibold mb-6">
                Matching Failed
              </div>
              
              <div className="text-center text-gray-600 mb-6">
                We could not find enough compatible farmers at this time. Please try again later.
              </div>
              
              <button
                onClick={() => setMatchingStatus('matching')}
                className="w-full py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                Try Again
              </button>
              
              <button
                onClick={handleCancel}
                className="w-full py-2 mt-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
              >
                Go Back
              </button>
            </>
          )}
        </div>
      </div>
      <BottomBar setActiveTab={setActiveTab} activeTab={activeTab}/>
    </div>
  );
}
