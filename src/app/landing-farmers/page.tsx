"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import BottomBar from '../components/bottom-bar';

export default function KPlusBankingApp({ children }: { children: React.ReactNode })  {
  const [form, setForm] = useState({
      plantType: "",
      selectedField: "",
      timeFrame: "",
      priceMin: "",
      priceMax: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Form submitted!");
  };
  return (
    <><header className="w-full flex items-center justify-between bg-white shadow px-4 py-2">

      {/* Right side (profile icon) */}
    <div className="flex items-center ml-auto">
      <h1>Settings</h1>
    </div>
    </header><div className="min-h-screen flex flex-col justify-between bg-gray-50 p-0 m-0">
        <div className="flex flex-col items-center justify-start pt-6 pb-2 px-4">
          <Image
            src="/makasetPlace logo.jpg"
            alt="A healthy plant"
            width={120}
            height={80}
            className="rounded-lg shadow" />
        </div>
        <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-md p-6 space-y-8 mt-4 mb-4">
          <h2 className="text-lg font-semibold text-center text-gray-800">
            Sell Biomatter
          </h2>

          <div className="space-y-8">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-3">
                Plant Type
              </label>
              <select
                name="plantType"
                value={form.plantType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white"
                required
              >
                <option value="">Select type</option>
                <option value="rice">Rice</option>
                <option value="corn">Corn</option>
                <option value="wheat">Wheat</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-3">
                Selected Field
              </label>
              <select
                name="selectedField"
                value={form.selectedField}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white"
                required
              >
                <option value="">Select Field</option>
                <option value="field1">Field 1</option>
                <option value="field2">Field 2</option>
              </select>
            </div>

            <div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-3">
                Time Frame
              </label>
              <select
                name="timeFrame"
                value={form.timeFrame}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white"
                required
              >
                <option value="">timeFrame</option>
                <option value="days1">1 day</option>
                <option value="days2">2 days</option>
                <option value="week">7 days</option>
              </select>
            </div>
          </div>
           <div>
              <label className="block text-xs font-medium text-gray-700 mb-3">
                Sell Price Range (per kg)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="priceMin"
                  value={form.priceMin || ""}
                  onChange={handleChange}
                  className="mt-1 block w-1/2 rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Min"
                  required
                />
                <input
                  type="number"
                  name="priceMax"
                  value={form.priceMax || ""}
                  onChange={handleChange}
                  className="mt-1 block w-1/2 rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Max"
                  required
                />
              </div>
            </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 mt-8"
          >
            Confirm
          </button>
        </div>
        <div>
        
        </div>
        <BottomBar/>
      </div>
    </>
  );
}