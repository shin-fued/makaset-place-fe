"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle, Package, Users, Clock } from 'lucide-react';
import Logo from '../components/logo';
import BottomBar from '../components/bottom-bar';
import { useRouter } from 'next/navigation';

export default function AllOrdersPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [time, setTime] = useState("");
  const router = useRouter();

  // Sample data for matched orders (same as dashboard but showing all)
  const matchedOrders = [
    {
      id: 'MO001',
      crop: 'Rice',
      quantity: '500kg',
      buyer: 'Green Valley Foods',
      progress: 75,
      status: 'in-progress',
      estimatedCompletion: '2 days',
      value: 2500.00
    },
    {
      id: 'MO002', 
      crop: 'Corn',
      quantity: '300kg',
      buyer: 'Farm Fresh Co.',
      progress: 45,
      status: 'in-progress',
      estimatedCompletion: '5 days',
      value: 1800.00
    },
    {
      id: 'MO003',
      crop: 'Cassava',
      quantity: '200kg',
      buyer: 'Organic Harvest',
      progress: 90,
      status: 'near-completion',
      estimatedCompletion: '1 day',
      value: 1200.00
    },
    {
      id: 'MO004',
      crop: 'Wheat',
      quantity: '400kg',
      buyer: 'Grain Masters Ltd.',
      progress: 30,
      status: 'in-progress',
      estimatedCompletion: '8 days',
      value: 3200.00
    },
    {
      id: 'MO005',
      crop: 'Soybean',
      quantity: '350kg',
      buyer: 'Protein Plus Co.',
      progress: 60,
      status: 'in-progress',
      estimatedCompletion: '4 days',
      value: 2450.00
    }
  ];

  // Sample data for unmatched orders
  const unmatchedOrders = [
    {
      id: 'UO001',
      crop: 'Wheat',
      quantity: '400kg',
      price: 3.50,
      elapsedTime: '2h 15m',
      status: 'waiting'
    },
    {
      id: 'UO002',
      crop: 'Soybean', 
      quantity: '250kg',
      price: 4.20,
      elapsedTime: '1h 30m',
      status: 'waiting'
    },
    {
      id: 'UO003',
      crop: 'Potato',
      quantity: '600kg',
      price: 2.80,
      elapsedTime: '45m',
      status: 'waiting'
    },
    {
      id: 'UO004',
      crop: 'Tomato',
      quantity: '150kg',
      price: 5.50,
      elapsedTime: '3h 20m',
      status: 'waiting'
    },
    {
      id: 'UO005',
      crop: 'Lettuce',
      quantity: '100kg',
      price: 4.80,
      elapsedTime: '1h 45m',
      status: 'waiting'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 pb-24">
      {/* Header with Back Button */}
      <div className="flex items-center justify-center mb-6 relative">
        <button
          onClick={() => router.back()}
          className="absolute left-0 p-2 rounded-full bg-white shadow-sm border border-green-100 hover:bg-green-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-green-600" />
        </button>
        <Logo />
      </div>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-800 mb-2">All Orders</h1>
        <p className="text-green-600">View all your ongoing matched and unmatched orders</p>
      </div>

      {/* Ongoing Matched Orders */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Ongoing Matched Orders ({matchedOrders.length})
        </h2>
        
        <div className="space-y-4">
          {matchedOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">{order.crop}</h3>
                    <p className="text-sm text-green-500">{order.quantity}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-green-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="font-medium">Buyer:</span>
                  <span className="ml-1 text-green-800">{order.buyer}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-green-600">
                  <span className="font-medium">Value: ${order.value.toLocaleString()}</span>
                  <span className="text-green-800">ETA: {order.estimatedCompletion}</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-green-600">
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

      {/* Ongoing Unmatched Orders */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Ongoing Unmatched Orders ({unmatchedOrders.length})
        </h2>
        
        <div className="space-y-4">
          {unmatchedOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-yellow-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">{order.crop}</h3>
                    <p className="text-sm text-green-500">{order.quantity}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-green-600">
                  <span className="font-medium">Price: ${order.price}/kg</span>
                  <span className="text-yellow-600 font-medium">Elapsed: {order.elapsedTime}</span>
                </div>
                
                <div className="flex items-center text-sm text-green-600">
                  <span className="font-medium">Total Value: ${(parseFloat(order.quantity) * order.price).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-green-500">
        Last updated: {time}
      </div>

      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
