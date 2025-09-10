"use client"

import { 
  Home,
  ShoppingCart,
  QrCode,
} from 'lucide-react';

export default function BottomBar(){
    return(
        <div className="fixed bottom-0 left-0 right-0 bg-yellow-700 rounded-t-3xl px-2 py-3 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <div className="flex flex-col items-center gap-1">
            <Home size={22} className="text-gray-400" />
            <span className="text-xs text-gray-400 font-medium">Dashboard</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ShoppingCart size={22} className="text-black-500" />
            <span className="text-xs text-black-500">Market Place</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <button className="bg-green-600 rounded-full p-3 shadow-lg hover:bg-green-700 transition flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="text-xs text-white font-medium">Request</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <QrCode size={22} className="text-gray-400" />
            <span className="text-xs text-gray-400">Tracking</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="5" cy="12" r="2" fill="#9CA3AF" />
              <circle cx="12" cy="12" r="2" fill="#9CA3AF" />
              <circle cx="19" cy="12" r="2" fill="#9CA3AF" />
            </svg>
            <span className="text-xs text-gray-400">Others</span>
          </div>
        </div>
      </div>
    )
}