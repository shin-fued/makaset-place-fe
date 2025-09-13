"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import BottomBar from '../components/bottom-bar';
import { X } from 'lucide-react';

export default function FarmerRequest({ children }: { children: React.ReactNode })  {
  const [form, setForm] = useState({
      plantType: "",
      selectedFields: [] as string[],
      timeFrame: "",
    });
  const [showFieldDropdown, setShowFieldDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [activeTab, setActiveTab] = useState("request");

  const fieldOptions = [
    { value: "field1", label: "North Field - 5 rai (Rice)" },
    { value: "field2", label: "South Field - 3 rai (Corn)" },
    { value: "field3", label: "East Field - 7 rai (Wheat)" },
    { value: "field4", label: "West Field - 4 rai (Vegetables)" },
    { value: "field5", label: "Central Field - 6 rai (Sugarcane)" },
  ];

  const toggleField = (fieldValue: string) => {
    setForm(prev => ({
      ...prev,
      selectedFields: prev.selectedFields.includes(fieldValue)
        ? prev.selectedFields.filter(f => f !== fieldValue)
        : [...prev.selectedFields, fieldValue]
    }));
  };

  const removeField = (fieldValue: string) => {
    setForm(prev => ({
      ...prev,
      selectedFields: prev.selectedFields.filter(f => f !== fieldValue)
    }));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFieldDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
                className={`mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white
    ${form.plantType ? "text-gray-900" : "text-gray-400"}
  `}
                required
              >
                <option value="">Select type</option>
                <option value="rice" className="text-gray-900 font-medium">Rice</option>
                <option value="corn" className="text-gray-900 font-medium">Corn</option>
                <option value="wheat" className="text-gray-900 font-medium">Wheat</option>
                <option value="other" className="text-gray-900 font-medium">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-3">
                Select Fields
              </label>
              
              {/* Selected Fields Display */}
              {form.selectedFields.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {form.selectedFields.map(fieldValue => {
                    const field = fieldOptions.find(f => f.value === fieldValue);
                    return (
                      <div key={fieldValue} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        <span>{field?.label}</span>
                        <button
                          type="button"
                          onClick={() => removeField(fieldValue)}
                          className="hover:bg-green-200 rounded-full p-0.5"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Field Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowFieldDropdown(!showFieldDropdown)}
                  className={`mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white text-left
                    ${form.selectedFields.length > 0 ? "text-gray-900" : "text-gray-400"}
                  `}
                >
                  {form.selectedFields.length > 0 
                    ? `${form.selectedFields.length} field(s) selected`
                    : "Select your fields"
                  }
                </button>
                
                {showFieldDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {fieldOptions.map(field => (
                      <div
                        key={field.value}
                        className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${
                          form.selectedFields.includes(field.value) ? 'bg-green-50' : ''
                        }`}
                        onClick={() => toggleField(field.value)}
                      >
                        <input
                          type="checkbox"
                          checked={form.selectedFields.includes(field.value)}
                          onChange={() => {}}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-900">{field.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                className={`mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 bg-white
    ${form.plantType ? "text-gray-900" : "text-gray-400"}
  `}
                required
              >
                <option value="">timeFrame</option>
                <option value="days1" className="text-gray-900 font-medium">1 day</option>
                <option value="days2" className="text-gray-900 font-medium">2 days</option>
                <option value="week" className="text-gray-900 font-medium">7 days</option>
              </select>
            </div>
          </div>


          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 mt-8"
          >
            Confirm
          </button>
        </div>
        <div>
        
        </div>
       <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
}