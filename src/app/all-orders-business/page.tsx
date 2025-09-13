"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, Package, Users, Calendar } from 'lucide-react';
import Logo from '../components/logo';
import BottomBar from '../components/bottom-bar';
import { useRouter } from 'next/navigation';

export default function AllOrdersBusinessPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [time, setTime] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Sample data for matched orders (same as dashboard-business but showing all)
  const matchedOrders = [
    {
      id: 'MO001',
      crop: 'Rice',
      quantity: '500kg',
      farmer: 'Green Valley Farm',
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
      farmer: 'Farm Fresh Co.',
      progress: 45,
      status: 'in-progress',
      estimatedCompletion: '5 days',
      value: 1800.00,
      orderDate: '2024-01-18'
    },
    {
      id: 'MO003',
      crop: 'Cassava',
      quantity: '200kg',
      farmer: 'Organic Harvest',
      progress: 90,
      status: 'near-completion',
      estimatedCompletion: '1 day',
      value: 1200.00,
      orderDate: '2024-01-20'
    },
    {
      id: 'MO004',
      crop: 'Wheat',
      quantity: '400kg',
      farmer: 'Grain Masters Ltd.',
      progress: 30,
      status: 'in-progress',
      estimatedCompletion: '8 days',
      value: 3200.00,
      orderDate: '2024-01-22'
    },
    {
      id: 'MO005',
      crop: 'Soybean',
      quantity: '350kg',
      farmer: 'Protein Plus Co.',
      progress: 60,
      status: 'in-progress',
      estimatedCompletion: '4 days',
      value: 2450.00,
      orderDate: '2024-01-25'
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
    },
    {
      id: 'UO005',
      crop: 'Tomato',
      quantity: '150kg',
      maxPrice: 7.50,
      elapsedTime: '2h 45m',
      status: 'waiting',
      orderDate: '2024-01-22'
    }
  ];

  useEffect(() => {
    setIsClient(true);
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
      case 'waiting': return 'bg-orange-100 text-orange-800';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 pb-24">
      {/* Header with Back Button */}
      <div className="flex items-center justify-center mb-6 relative">
        <button
          onClick={() => router.back()}
          className="absolute left-0 p-2 rounded-full bg-white shadow-sm border border-blue-100 hover:bg-blue-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-blue-600" />
        </button>
        <Logo />
      </div>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-2">All Orders</h1>
        <p className="text-blue-600">View all your ongoing matched and unmatched orders</p>
      </div>

      {/* Ongoing Matched Orders */}
      <div className="mb-8">
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

                {/* Progress Bar */}
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
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Ongoing Unmatched Buy Orders ({unmatchedOrders.length})
        </h2>
        
        <div className="space-y-4">
          {unmatchedOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-orange-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-orange-600" />
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
        {isClient && `Last updated: ${time}`}
      </div>

      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
