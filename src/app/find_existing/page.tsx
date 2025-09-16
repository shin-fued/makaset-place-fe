"use client";

import React, { useState } from "react";
import Image from "next/image";
import BottomBar from "../components/bottom-bar";
import Logo from "../components/logo";

const groups = [
  {
    id: 1,
    name: "Chiang Mai Rice Collective",
    location: "Chiang Mai",
    members: 12,
    image: "/field-map.jpg",
  },
  {
    id: 2,
    name: "Northern Corn Growers",
    location: "Chiang Mai",
    members: 8,
    image: "/field-map.jpg",
  },
  {
    id: 3,
    name: "Surin Cassava Clan",
    location: "Surin",
    members: 15,
    image: "/field-map.jpg",
  },
];

export default function FindExistingGroupsPage() {
  const [joinedGroupId, setJoinedGroupId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("others");

  const handleJoin = (id: number) => {
    setJoinedGroupId(id);
    alert("You have requested to join the group!");
  };

  // Filter groups by search term
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Logo />
      <div className="flex flex-col items-center px-4 pb-2">
        <h1 className="text-xl md:text-2xl font-bold text-green-700 mb-2 text-center">
          Find Existing Groups
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-4 text-center px-2 max-w-md">
          Search and request to join a group to collaborate and meet minimum
          requirements for service.
        </p>
        <div className="w-full max-w-md mx-auto mb-4">
          <input
            type="text"
            placeholder="Search group name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
          />
        </div>
      </div>
      <div className="flex-1 px-4 pb-24 overflow-y-auto">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
          <div className="flex flex-col gap-4">
            {filteredGroups.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                No groups found.
              </div>
            ) : (
              filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className="flex flex-row items-stretch bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="w-1/3 relative">
                    <Image
                      src={group.image}
                      alt={group.name}
                      width={120}
                      height={140}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-3 flex flex-col justify-between bg-white">
                    <div>
                      <div className="font-bold text-green-700 mb-1">
                        {group.name}
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        Location: {group.location}
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        Members: {group.members}
                      </div>
                      <div className="text-xs text-gray-600">
                        Total Rai: {group.members * 10} rai
                      </div>
                    </div>
                    <button
                      onClick={() => handleJoin(group.id)}
                      disabled={joinedGroupId === group.id}
                      className={`w-full py-2 mt-2 rounded-lg font-semibold text-sm transition-colors
													${
                            joinedGroupId === group.id
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                    >
                      {joinedGroupId === group.id
                        ? "Requested"
                        : "Request to Join"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <BottomBar setActiveTab={setActiveTab} activeTab={activeTab}/>
    </div>
  );
}
