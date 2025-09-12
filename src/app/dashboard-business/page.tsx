"use client";

import React, { useState, useEffect } from 'react';
import { DollarSign, Clock, CheckCircle, AlertCircle, TrendingUp, Package, Users, ShoppingCart, BarChart3, Calendar } from 'lucide-react';
import Logo from '../components/logo';
import BottomBar from '../components/bottom-bar';

export default function DashboardBusinessPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [time, setTime] = useState("");

  // Sample data for monthly mass orders by crop type
  const monthlyOrders = [
    {
      crop: 'Rice',
      totalMass: 2500,
      unit: 'kg',
      value: 12500.00,
      growth: 8.5,
      color: 'green',
      icon: '🌾'
    },
    {
      crop: 'Corn',
      totalMass: 1800,
      unit: 'kg', 
      value: 9000.00,
      growth: 12.3,
      color: 'yellow',
      icon: '🌽'
    },
    {
      crop: 'Wheat',
      totalMass: 1200,
      unit: 'kg',
      value: 7200.00,
      growth: -2.1,
      color: 'amber',
      icon: '🌾'
    },
    {
      crop: 'Soybean',
      totalMass: 800,
      unit: 'kg',
      value: 4800.00,
      growth: 15.7,
      color: 'emerald',
      icon: '🫘'
    },
    {
      crop: 'Potato',
      totalMass: 3200,
      unit: 'kg',
      value: 6400.00,
      growth: 5.2,
      color: 'orange',
      icon: '🥔'
    },
    {
      crop: 'Cassava',
      totalMass: 1500,
      unit: 'kg',
      value: 4500.00,
      growth: 18.9,
      color: 'lime',
      icon: '🥔'
    }
  ];

  // Sample data for matched orders
  const matchedOrders = [
    {
      id: 'MO001',
      crop: 'Rice',
      quantity: '500kg',
      farmer: 'John Smith Farm',
      progress: 75,
      status: 'in-progress',
      estimatedCompletion: '2 days',
      value: 2500.00,
      orderDate: '2024-01-15'
    },
    {
      id: 'MO002', 
      crop: 'Corn',
      quantity: '300kg',
      farmer: 'Green Valley Agriculture',
      progress: 45,
      status: 'in-progress',
      estimatedCompletion: '5 days',
      value: 1800.00,
      orderDate: '2024-01-18'
    },
    {
      id: 'MO003',
      crop: 'Wheat',
      quantity: '200kg',
      farmer: 'Sunrise Farms',
      progress: 90,
      status: 'near-completion',
      estimatedCompletion: '1 day',
      value: 1200.00,
      orderDate: '2024-01-10'
    },
    {
      id: 'MO004',
      crop: 'Soybean',
      quantity: '150kg',
      farmer: 'Organic Harvest Co.',
      progress: 30,
      status: 'in-progress',
      estimatedCompletion: '7 days',
      value: 900.00,
      orderDate: '2024-01-20'
    }
  ];

  // Sample data for unmatched buy orders
  const unmatchedOrders = [
    {
      id: 'UO001',
      crop: 'Rice',
      quantity: '400kg',
      maxPrice: 5.50,
      elapsedTime: '2h 15m',
      status: 'waiting',
      orderDate: '2024-01-22'
    },
    {
      id: 'UO002',
      crop: 'Corn', 
      quantity: '250kg',
      maxPrice: 4.20,
      elapsedTime: '1h 30m',
      status: 'waiting',
      orderDate: '2024-01-22'
    },
    {
      id: 'UO003',
      crop: 'Potato',
      quantity: '600kg',
      maxPrice: 2.80,
      elapsedTime: '45m',
      status: 'waiting',
      orderDate: '2024-01-22'
    },
    {
      id: 'UO004',
      crop: 'Wheat',
      quantity: '300kg',
      maxPrice: 6.00,
      elapsedTime: '3h 20m',
      status: 'waiting',
      orderDate: '2024-01-22'
    }
  ];

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'near-completion': return 'bg-green-100 text-green-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress': return 'In Progress';
      case 'near-completion': return 'Near Completion';
      case 'waiting': return 'Waiting for Match';
      default: return 'Unknown';
    }
  };

  const getCropColorClasses = (color: string) => {
    const colorMap = {
      green: 'bg-green-100 text-green-800 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      amber: 'bg-amber-100 text-amber-800 border-amber-200',
      emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      lime: 'bg-lime-100 text-lime-800 border-lime-200'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCropIconBg = (color: string) => {
    const colorMap = {
      green: 'bg-green-50',
      yellow: 'bg-yellow-50',
      amber: 'bg-amber-50',
      emerald: 'bg-emerald-50',
      orange: 'bg-orange-50',
      lime: 'bg-lime-50'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      {/* Header */}
      <Logo />

      {/* Monthly Mass Orders by Crop Type */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Monthly Mass Orders by Crop Type
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {monthlyOrders.map((order, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${getCropIconBg(order.color)} rounded-full flex items-center justify-center text-2xl`}>
                    {order.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{order.crop}</h3>
                    <p className="text-sm text-gray-500">This month</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium px-2 py-1 rounded-full ${getCropColorClasses(order.color)}`}>
                  <TrendingUp className="w-3 h-3" />
                  <span>{order.growth > 0 ? '+' : ''}{order.growth}%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-800">
                  {order.totalMass.toLocaleString()} {order.unit}
                </div>
                <div className="text-lg font-semibold text-blue-600">
                  ${order.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
          {matchedOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">{order.crop}</h3>
                    <p className="text-sm text-blue-500">{order.quantity}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
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
                  <span className="font-medium">Value: ${order.value.toLocaleString()}</span>
                  <span>ETA: {order.estimatedCompletion}</span>
                </div>

                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>Ordered: {new Date(order.orderDate).toLocaleDateString()}</span>
                </div>

                {/* Simplified Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-blue-600">
                    <span>Progress</span>
                    <span>{order.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(order.progress)}`}
                      style={{ width: `${order.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ongoing Unmatched Buy Orders */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Ongoing Unmatched Buy Orders ({unmatchedOrders.length})
        </h2>
        
        <div className="space-y-4">
          {unmatchedOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">{order.crop}</h3>
                    <p className="text-sm text-blue-500">{order.quantity}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-blue-600">
                  <span className="font-medium">Max Price: ${order.maxPrice}/kg</span>
                  <span className="text-orange-600 font-medium">Elapsed: {order.elapsedTime}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-blue-600">
                  <span className="font-medium">Total Value: ${(parseFloat(order.quantity) * order.maxPrice).toFixed(2)}</span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-blue-500">
        Last updated: {time}
      </div>

      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
