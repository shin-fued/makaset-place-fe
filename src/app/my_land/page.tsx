"use client";

import React, { useState } from "react";
import Logo from "../components/logo";
import Image from "next/image";
import BottomBar from "../components/bottom-bar";

const myFields = [
  {
    id: 1,
    name: "North Field",
    location: "Chiang Mai",
    plantType: "Rice",
    size: "15 rai",
    image: "/field-map.jpg",
  },
  {
    id: 2,
    name: "East Field",
    location: "Chiang Mai",
    plantType: "Corn",
    size: "8 rai",
    image: "/field-map.jpg",
  },
  {
    id: 3,
    name: "South Field",
    location: "Chiang Mai",
    plantType: "Cassava",
    size: "20 rai",
    image: "/field-map.jpg",
  },
];

export default function MyLandPage() {
  const [selectedField, setSelectedField] = useState(myFields[0]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* GPS Location Section */}
      <div className="flex flex-col items-center justify-start pt-6 pb-4 px-4">
        <Logo />
        <h2 className="text-lg font-semibold text-gray-800 mb-2 mt-2">
          My Land Location
        </h2>
        <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-md">
          <Image
            src={selectedField.image}
            alt={selectedField.name}
            width={400}
            height={200}
            className="object-cover w-full h-48"
          />
        </div>
        <div className="mt-2 text-gray-600 text-sm">
          {selectedField.name} - {selectedField.location}
          <br />
          GPS: 18.7883° N, 98.9853° E (Chiang Mai)
        </div>
      </div>

      {/* My Fields List */}
      <div className="flex-1 px-4 pb-20">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-md font-semibold text-gray-800 mb-4">
            My Fields
          </h3>
          <div className="space-y-4">
            {myFields.map((field) => (
              <button
                key={field.id}
                onClick={() => setSelectedField(field)}
                className={`flex items-center gap-4 p-4 rounded-xl border border-gray-200 shadow-sm hover:bg-green-50 transition-colors w-full text-left ${
                  selectedField.id === field.id
                    ? "border-green-500 bg-green-50"
                    : ""
                }`}
              >
                <Image
                  src={field.image}
                  alt={field.name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {field.name}
                  </div>
                  <div className="text-sm text-gray-500">{field.location}</div>
                  <div className="text-xs text-gray-600">
                    {field.plantType} &bull; {field.size}
                  </div>
                </div>
                {selectedField.id === field.id && (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                    Selected
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
