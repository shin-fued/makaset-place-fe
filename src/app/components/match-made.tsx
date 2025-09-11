"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function MatchMadePopUp() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup once when page loads
    setShowPopup(true);
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
        <h2 className="text-lg text-gray-800 font-semibold mb-3">Your request has been matched!</h2>
        <p className="text-gray-800 mb-6">
          A match for your request has been found. There is now enough biomatter for us to dispatch machinery and a vehicle to collect it. Track the ETA in the dashboard.
        </p>
        <Image
          src="/linking image.jpg"
          alt="Match Made"
          width={150}
          height={150}
          className="mx-auto mb-6"
        />
        <button
          onClick={() => setShowPopup(false)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
