"use client";

import { Home, ShoppingCart, QrCode } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface BottomBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomBar({ activeTab, setActiveTab }: BottomBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case "dashboard":
        router.push("/dashboard");
        break;
      case "market":
        router.push("/marketplace-farmers");
        break;
      case "request":
        router.push("/request-farmers");
        break;
      case "tracking":
        router.push("/tracking");
        break;
      case "others":
        router.push("/profile-settings");
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-100 rounded-t-3xl px-2 py-3 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        
        {/* Dashboard */}
        <button
          onClick={() => navigate("dashboard")}
          className="flex flex-col items-center gap-1"
        >
          <Home size={22} className={activeTab === "dashboard" ? "text-green-600" : "text-gray-400"} />
          <span className={`text-xs font-medium ${activeTab === "dashboard" ? "text-green-600" : "text-gray-400"}`}>
            Dashboard
          </span>
        </button>

        {/* Market Place */}
        <button
          onClick={() => navigate("market")}
          className="flex flex-col items-center gap-1"
        >
          <ShoppingCart size={22} className={activeTab === "market" ? "text-green-600" : "text-gray-400"} />
          <span className={`text-xs font-medium ${activeTab === "market" ? "text-green-600" : "text-gray-400"}`}>
            Market Place
          </span>
        </button>

        {/* Request */}
        <button
          onClick={() => navigate("request")}
          className="flex flex-col items-center gap-1"
        >
          <div className={`rounded-full p-3 shadow-lg transition flex items-center justify-center 
            ${activeTab === "request" ? "bg-green-700" : "bg-green-600 hover:bg-green-700"}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className={`text-xs font-medium ${activeTab === "request" ? "text-green-700" : "text-gray-400"}`}>
            Request
          </span>
        </button>

        {/* Tracking */}
        <button
          onClick={() => navigate("tracking")}
          className="flex flex-col items-center gap-1"
        >
          <QrCode size={22} className={activeTab === "tracking" ? "text-green-600" : "text-gray-400"} />
          <span className={`text-xs font-medium ${activeTab === "tracking" ? "text-green-600" : "text-gray-400"}`}>
            Tracking
          </span>
        </button>

        {/* Others */}
        <button
          onClick={() => navigate("others")}
          className="flex flex-col items-center gap-1"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="5" cy="12" r="2" fill={activeTab === "others" ? "#16A34A" : "#9CA3AF"} />
            <circle cx="12" cy="12" r="2" fill={activeTab === "others" ? "#16A34A" : "#9CA3AF"} />
            <circle cx="19" cy="12" r="2" fill={activeTab === "others" ? "#16A34A" : "#9CA3AF"} />
          </svg>
          <span className={`text-xs font-medium ${activeTab === "others" ? "text-green-600" : "text-gray-400"}`}>
            Others
          </span>
        </button>
      </div>
    </div>
  );
}
