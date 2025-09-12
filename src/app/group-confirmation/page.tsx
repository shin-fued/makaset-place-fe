"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BottomBar from "../components/bottom-bar";
import Logo from "../components/logo";

// Sample matched farmers data
const matchedFarmers = [
  {
    id: 1,
    name: "Somchai Jaidee",
    location: "Chiang Mai",
    distance: 12, // km
    experience: 12,
    expertise: ["Rice", "Organic Farming"],
    landSize: 15,
    image: "/field-map.jpg"
  },
  {
    id: 2,
    name: "Pranee Suksai",
    location: "Chiang Mai",
    distance: 5, // km
    experience: 8,
    expertise: ["Rice", "Water Management"],
    landSize: 10,
    image: "/field-map.jpg"
  },
  {
    id: 3,
    name: "Wichai Thongdee",
    location: "Lamphun",
    distance: 25, // km
    experience: 15,
    expertise: ["Rice", "Pest Management"],
    landSize: 12,
    image: "/field-map.jpg"
  },
  {
    id: 4, // This is you
    name: "You",
    location: "Chiang Mai",
    distance: 0, // km
    experience: 5,
    expertise: ["Rice", "Technology"],
    landSize: 8,
    image: "/field-map.jpg"
  }
];

// Group stats
const groupStats = {
  totalLandSize: 45,
  primaryCrops: ["Rice"],
  secondaryCrops: ["Vegetables", "Fruit"],
  estimatedYield: "4.2 tons/rai",
  locationCoverage: "Chiang Mai, Lamphun"
};

export default function GroupConfirmationPage() {
  const [decision, setDecision] = useState<'undecided' | 'accepted' | 'declined'>('undecided');
  const [showThankYou, setShowThankYou] = useState(false);
  const router = useRouter();
  
  const handleDecision = (choice: 'accepted' | 'declined') => {
    setDecision(choice);
    setShowThankYou(true);
    
    // Simulate redirect after showing thank you message
    setTimeout(() => {
      if (choice === 'accepted') {
        router.push('/my_land'); // Redirect to My Land or dashboard page
      } else {
        router.push('/auto-match'); // Go back to auto-match to try again
      }
    }, 2500);
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50">
        <Logo />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
            <div className={`text-2xl font-bold mb-6 ${decision === 'accepted' ? 'text-green-600' : 'text-gray-600'}`}>
              {decision === 'accepted' ? 'Thank You For Joining!' : 'Maybe Next Time'}
            </div>
            
            {decision === 'accepted' ? (
              <>
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Image 
                      src="/field-map.jpg" 
                      alt="Success"
                      width={150} 
                      height={150}
                      className="rounded-full border-4 border-green-500 object-cover"
                    />
                    <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  You have successfully joined the farming group. We'll notify all members and help you get started together.
                </p>
                
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500"></div>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  No problem. We'll find other potential matches for you. Redirecting back to matching...
                </p>
                
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500"></div>
                </div>
              </>
            )}
          </div>
        </div>
        <BottomBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Logo />
      <div className="flex flex-col items-center pt-4 px-4">
        <h1 className="text-xl md:text-2xl font-bold text-green-700 mb-2 text-center">Your New Farming Group</h1>
        <p className="text-sm text-center text-gray-600 mb-6 max-w-md">
          We've matched you with compatible farmers to form a new group. Review the details below and decide if you want to join.
        </p>
      </div>

      {/* Group Stats Card */}
      <div className="px-4">
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow p-4 mb-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-green-700 mb-3 text-center border-b border-gray-100 pb-2">Group Overview</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500">Total Members</div>
              <div className="font-medium text-green-600">{matchedFarmers.length} Farmers</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Total Land Size</div>
              <div className="font-medium text-green-600">{groupStats.totalLandSize} Rai</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Primary Crops</div>
              <div className="font-medium text-green-600">{groupStats.primaryCrops.join(", ")}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Est. Yield</div>
              <div className="font-medium text-green-600">{groupStats.estimatedYield}</div>
            </div>
            <div className="col-span-2">
              <div className="text-xs text-gray-500">Location Coverage</div>
              <div className="font-medium text-green-600">{groupStats.locationCoverage}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Farmer Cards */}
      <div className="flex-1 px-4 pb-24 overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-gray-800 my-3">Group Members</h2>
          <div className="flex flex-col gap-3 mb-6">
            {matchedFarmers.map(farmer => (
              <div 
                key={farmer.id}
                className={`flex bg-white rounded-xl shadow border ${farmer.name === "You" ? "border-green-300 bg-green-50" : "border-gray-200"} overflow-hidden`}
              >
                <div className="w-1/4 relative">
                  <Image
                    src={farmer.image}
                    alt={farmer.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                  {farmer.name === "You" && (
                    <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                      You
                    </div>
                  )}
                </div>
                <div className="w-3/4 p-3">
                  <div className="flex justify-between items-start">
                    <div className="font-bold text-gray-800">
                      {farmer.name}
                    </div>
                    {farmer.distance > 0 && (
                      <div className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {farmer.distance} km away
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mb-1">
                    {farmer.location} • {farmer.landSize} Rai
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Expertise:</span> {farmer.expertise.join(", ")}
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Experience:</span> {farmer.experience} years
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Decision buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleDecision('accepted')}
              className="w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
            >
              Accept & Join Group
            </button>
            <button
              onClick={() => handleDecision('declined')}
              className="w-full py-3 bg-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-300 transition-colors"
            >
              Decline & Find Other Matches
            </button>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
