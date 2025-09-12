"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Settings,
  ChevronDown,
  ChevronRight,
  X,
  Check,
} from "lucide-react";
import Logo from "../components/logo";
import BottomBar from "../components/bottom-bar";

// 🔹 Define item and submenu types
interface DropdownItem {
  id: string;
  title: string;
  icon: React.ReactNode; // can be <User /> or emoji string
  subItems?: string[] | null;
}

const MobileAccountSettings: React.FC = () => {
  // 🔹 State with strict typing
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("others");

  // 🔹 Data arrays
  const accountItems: DropdownItem[] = [
    {
      id: "profile",
      title: "Profile Management",
      icon: <User size={16} />,
      subItems: [
        "Personal Information",
        "Profile Picture",
        "Bio & Description",
        "Contact Details",
      ],
    },
    {
      id: "security",
      title: "Security",
      icon: "🔒",
      subItems: [
        "Change Password",
        "Two-Factor Authentication",
        "Login History",
        "Active Sessions",
        "Security Questions",
      ],
    },
    {
      id: "billing",
      title: "Billing & Payments",
      icon: "💳",
      subItems: ["Payment Methods", "Billing History", "Subscriptions", "Invoices"],
    },
    {
      id: "stats",
      title: "Account Statistics",
      icon: "📊",
      subItems: null,
    },
  ];

  const settingsItems: DropdownItem[] = [
    {
      id: "preferences",
      title: "Preferences",
      icon: "🎨",
      subItems: ["Language & Region", "Time Zone", "Theme Settings", "Accessibility"],
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: "🔔",
      subItems: ["Email Notifications", "Push Notifications", "SMS Alerts", "Newsletter Subscription"],
    },
    {
      id: "privacy",
      title: "Privacy & Data",
      icon: "🛡️",
      subItems: [
        "Privacy Settings",
        "Data Export",
        "Data Deletion",
        "Cookie Preferences",
        "Third-party Integrations",
      ],
    },
    {
      id: "advanced",
      title: "Advanced Settings",
      icon: "⚙️",
      subItems: ["API Configuration", "Developer Tools", "Backup & Restore", "System Logs"],
    },
  ];

  // 🔹 Toggle dropdown open/close
  const toggleDropdown = (dropdownType: string) => {
    if (activeDropdown === dropdownType) {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    } else {
      setActiveDropdown(dropdownType);
      setActiveSubmenu(null);
    }
  };

  // 🔹 Toggle submenu
  const toggleSubmenu = (submenuId: string) => {
    setActiveSubmenu(activeSubmenu === submenuId ? null : submenuId);
  };

  // 🔹 Handle item selection
  const handleSelection = (selection: string) => {
    setNotification(selection);
    setActiveDropdown(null);
    setActiveSubmenu(null);

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // 🔹 Close all menus
  const closeAll = () => {
    setActiveDropdown(null);
    setActiveSubmenu(null);
  };

  // 🔹 Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!(event.target as HTMLElement).closest(".dropdown-container")) {
        closeAll();
      }
    };

    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // 🔹 Render dropdown items
  const renderDropdownItems = (items: DropdownItem[]) => {
    return items.map((item) => (
      <div key={item.id} className="border-b border-gray-100 last:border-b-0">
        <div
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
          onClick={() =>
            item.subItems ? toggleSubmenu(item.id) : handleSelection(item.title)
          }
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium text-gray-700">{item.title}</span>
          </div>
          {item.subItems && (
            <ChevronRight
              size={18}
              className={`text-gray-400 transition-transform duration-200 ${
                activeSubmenu === item.id ? "rotate-90" : ""
              }`}
            />
          )}
        </div>

        {/* Submenu */}
        {item.subItems && (
          <div
            className={`bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out ${
              activeSubmenu === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {item.subItems.map((subItem, index) => (
              <div
                key={index}
                className="pl-12 pr-4 py-3 cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-colors border-t border-gray-200"
                onClick={() => handleSelection(subItem)}
              >
                <span className="text-gray-600 text-sm font-medium">{subItem}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <Logo/>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-4 dropdown-container">
        {/* Account Dropdown */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <button
            onClick={() => toggleDropdown("account")}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-lg active:scale-98 transition-transform"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <User size={24} />
              </div>
              <span>My Account</span>
            </div>
            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                activeDropdown === "account" ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`transition-all duration-300 ease-in-out ${
              activeDropdown === "account" ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            {renderDropdownItems(accountItems)}
          </div>
        </div>

        {/* Settings Dropdown */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <button
            onClick={() => toggleDropdown("settings")}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold text-lg active:scale-98 transition-transform"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Settings size={24} />
              </div>
              <span>Settings</span>
            </div>
            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                activeDropdown === "settings" ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`transition-all duration-300 ease-in-out ${
              activeDropdown === "settings" ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            {renderDropdownItems(settingsItems)}
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className="bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Check size={20} />
              <span className="font-medium">Selected: {notification}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

        <BottomBar setActiveTab={setActiveTab} activeTab={activeTab} />
      {/* Bottom Safe Area */}
      <div className="h-8"></div>
    </div>
  );
};

export default MobileAccountSettings;
