"use client"

import React, { useState } from "react";
import Image from "next/image";
import BottomBar from "../components/bottom-bar";
import { Info, X } from "lucide-react";
import Logo from "../components/logo";

const priceRanges = {
  rice: { low: 2.5, medium: 3.2, high: 4.1, premium: 5.0 },
  corn: { low: 1.8, medium: 2.4, high: 3.1, premium: 3.8 },
  wheat: { low: 2.1, medium: 2.8, high: 3.6, premium: 4.3 },
  other: { low: 2.0, medium: 2.6, high: 3.3, premium: 4.0 },
};

const gradeDescriptions = {
  low: "Basic grade - Standard quality",
  medium: "Good grade - Above average quality",
  high: "Premium grade - High quality",
  premium: "Superior grade - Highest quality",
};

export default function BusinessRequest({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState({
    plantType: "",
    amount: "",
    price: "",
    deliveryAddress: "",
  });
  const [showPricePopup, setShowPricePopup] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [customPrice, setCustomPrice] = useState("");
  const [activeTab, setActiveTab] = useState("request");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateEstimatedCost = (grade: string) => {
    if (!form.plantType || !form.amount) return "0.00";
    const basePrice =
      priceRanges[form.plantType as keyof typeof priceRanges]?.[
        grade as keyof typeof priceRanges.rice
      ] || 0;
    return (basePrice * parseFloat(form.amount)).toFixed(2);
  };

  // Removed handleGradeSelect - rows are now unclickable

  const handleConfirmPrice = () => {
    if (!customPrice) {
      alert("Please enter a minimum price");
      return;
    }
    setForm({ ...form, price: customPrice });
    setShowPricePopup(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Final form submitted:", form);
    alert("Request submitted successfully!");
  };

  return (
    <>
      <header className="w-full flex items-center justify-between bg-white shadow px-4 py-2">
        <div className="flex items-center ml-auto">
          <h1>Settings</h1>
        </div>
      </header>
      <Logo/>

      <div className="min-h-screen flex flex-col justify-between bg-gray-50">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-md p-6 space-y-8 mt-4 mb-4"
        >
          <h2 className="text-lg font-semibold text-center text-gray-800">
            Biomatter Request
          </h2>

          <div className="space-y-8">
            {/* Plant Type */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-3">
                Plant Type
              </label>
              <select
                name="plantType"
                value={form.plantType}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white
                ${form.plantType ? "text-gray-900" : "text-gray-400"}`}
                required
              >
                <option value="">Select type</option>
                <option value="rice">Rice</option>
                <option value="corn">Corn</option>
                <option value="wheat">Wheat</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-3">
                Amount (kg)
              </label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                placeholder="Enter amount"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-3">
                Minimum Price Offering
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                placeholder="Enter price"
                required
              />
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-3">
                Delivery Address
              </label>
              <input
                type="text"
                name="deliveryAddress"
                value={form.deliveryAddress}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                placeholder="Enter delivery address"
                required
              />
            </div>
          </div>

        <div className="sticky bottom-0 bg-white pt-4">
          <button
            type="button"
            onClick={() => setShowPricePopup(true)}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 mb-2"
          >
            View Price Estimates
          </button>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            Submit Request
          </button>
        </div>
        </form>

{/* Price Estimation Popup */}
        {showPricePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Info size={20} className="text-blue-600" />
                  Price Estimates
                </h3>
                <button
                  onClick={() => setShowPricePopup(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    For <strong>{form.amount}kg</strong> of <strong className="capitalize">{form.plantType}</strong>
                  </p>
                </div>

                <div className="space-y-3">
                  {Object.entries(gradeDescriptions).map(([grade, description]) => {
                    const estimatedCost = calculateEstimatedCost(grade);
                    const pricePerKg = priceRanges[form.plantType as keyof typeof priceRanges]?.[grade as keyof typeof priceRanges.rice] || 0;
                    
                    return (
                      <div
                        key={grade}
                        className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800 capitalize">{grade} Grade</h4>
                          <span className="text-lg font-bold text-green-600">฿{estimatedCost}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{description}</p>
                        <p className="text-xs text-gray-500">฿{pricePerKg}/kg</p>
                        <div className="mt-2">
                          <div className="text-xs text-gray-500 mb-1">Price Range:</div>
                          <div className="text-xs font-medium text-gray-700">
                            ฿{pricePerKg} - ฿{(pricePerKg * 1.2).toFixed(1)} per kg
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Your Minimum Price Offering (฿)
                  </label>
                  <input
                    type="number"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    className="w-full p-3 border border-gray-400 rounded-lg focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-900 font-medium"
                    placeholder="Enter your minimum price per kg"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Based on {form.amount}kg, total minimum: ฿{(parseFloat(customPrice || "0") * parseFloat(form.amount || "0")).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={handleConfirmPrice}
                  disabled={!customPrice}
                  className={`w-full font-semibold py-3 px-4 rounded-lg transition duration-200 ${
                    customPrice
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Confirm Price Selection
                </button>
              </div>
            </div>
          </div>
        )}

        <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
}
