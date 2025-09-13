"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  TrendingUp,
  Package,
  Users,
  BarChart3,
  Calendar,
  ChevronRight,
} from "lucide-react";
import Logo from "../components/logo";
import BottomBar from "../components/bottom-bar";
import { useRouter } from "next/navigation";

export default function DashboardBusinessPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [time, setTime] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Sample data for monthly mass orders by crop type
  const monthlyOrders = [
    {
      crop: "Rice",
      totalMass: 2500,
      unit: "kg",
      value: 12500.0,
      growth: 8.5,
      color: "green",
      icon: "🌾",
    },
    {
      crop: "Corn",
      totalMass: 1800,
      unit: "kg",
      value: 9000.0,
      growth: 12.3,
      color: "yellow",
      icon: "🌽",
    },
    {
      crop: "Wheat",
      totalMass: 1200,
      unit: "kg",
      value: 7200.0,
      growth: -2.1,
      color: "amber",
      icon: "🌾",
    },
    {
      crop: "Soybean",
      totalMass: 800,
      unit: "kg",
      value: 4800.0,
      growth: 15.7,
      color: "emerald",
      icon: "🫘",
    },
    {
      crop: "Potato",
      totalMass: 3200,
      unit: "kg",
      value: 6400.0,
      growth: 5.2,
      color: "orange",
      icon: "🥔",
    },
    {
      crop: "Cassava",
      totalMass: 1500,
      unit: "kg",
      value: 4500.0,
      growth: 18.9,
      color: "lime",
      icon: "🥔",
    },
  ];

  // Sample data for matched orders
  const matchedOrders = [
    {
      id: "MO001",
      crop: "Rice",
      quantity: "500kg",
      farmer: "John Smith Farm",
      progress: 75,
      status: "in-progress",
      estimatedCompletion: "2 days",
      value: 2500.0,
      orderDate: "2024-01-15",
    },
    {
      id: "MO002",
      crop: "Corn",
      quantity: "300kg",
      farmer: "Green Valley Agriculture",
      progress: 45,
      status: "in-progress",
      estimatedCompletion: "5 days",
      value: 1800.0,
      orderDate: "2024-01-18",
    },
    {
      id: "MO003",
      crop: "Wheat",
      quantity: "200kg",
      farmer: "Sunrise Farms",
      progress: 90,
      status: "near-completion",
      estimatedCompletion: "1 day",
      value: 1200.0,
      orderDate: "2024-01-10",
    },
    {
      id: "MO004",
      crop: "Soybean",
      quantity: "150kg",
      farmer: "Organic Harvest Co.",
      progress: 30,
      status: "in-progress",
      estimatedCompletion: "7 days",
      value: 900.0,
      orderDate: "2024-01-20",
    },
  ];

  useEffect(() => {
    setIsClient(true);
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "near-completion":
        return "bg-green-100 text-green-800";
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "near-completion":
        return "Near Completion";
      case "waiting":
        return "Waiting for Match";
      default:
        return "Unknown";
    }
  };

  const getCropColorClasses = (color: string) => {
    const colorMap = {
      green: "bg-green-100 text-green-800 border-green-200",
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
      amber: "bg-amber-100 text-amber-800 border-amber-200",
      emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200",
      lime: "bg-lime-100 text-lime-800 border-lime-200",
    };
    return (
      colorMap[color as keyof typeof colorMap] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getCropIconBg = (color: string) => {
    const colorMap = {
      green: "bg-green-50",
      yellow: "bg-yellow-50",
      amber: "bg-amber-50",
      emerald: "bg-emerald-50",
      orange: "bg-orange-50",
      lime: "bg-lime-50",
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 pb-24">
      {/* Header */}
      <Logo />

      {/* Monthly Mass Orders by Crop Type */}
      <div className="mt-6 mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Monthly Mass Orders by Crop Type
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {monthlyOrders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 ${getCropIconBg(
                      order.color
                    )} rounded-full flex items-center justify-center text-2xl`}
                  >
                    {order.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {order.crop}
                    </h3>
                    <p className="text-sm text-gray-500">This month</p>
                  </div>
                </div>
                <div
                  className={`flex items-center space-x-1 text-sm font-medium px-2 py-1 rounded-full ${getCropColorClasses(
                    order.color
                  )}`}
                >
                  <TrendingUp className="w-3 h-3" />
                  <span>
                    {order.growth > 0 ? "+" : ""}
                    {order.growth}%
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-800">
                  {order.totalMass.toLocaleString()} {order.unit}
                </div>
                <div className="text-lg font-semibold text-blue-600">
                  $
                  {order.value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>January 2024</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ongoing Matched Orders */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Ongoing Matched Orders ({matchedOrders.length})
        </h2>

        <div className="space-y-4">
          {matchedOrders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-blue-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">
                      {order.crop}
                    </h3>
                    <p className="text-sm text-blue-500">{order.quantity}</p>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusText(order.status)}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-blue-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="font-medium">Farmer:</span>
                  <span className="ml-1">{order.farmer}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-blue-600">
                  <span className="font-medium">
                    Value: ${order.value.toLocaleString()}
                  </span>
                  <span>ETA: {order.estimatedCompletion}</span>
                </div>

                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>
                    Ordered: {new Date(order.orderDate).toLocaleDateString()}
                  </span>
                </div>

                {/* Simplified Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-blue-600">
                    <span>Progress</span>
                    <span>{order.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(
                        order.progress
                      )}`}
                      style={{ width: `${order.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See All Button */}
        {matchedOrders.length > 3 && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => router.push("/all-orders-business")}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              <span className="font-medium">See All Orders</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-blue-500">
        {isClient && `Last updated: ${time}`}
      </div>

      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
