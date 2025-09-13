"use client";

import React, { useState, useEffect } from 'react';
import { DollarSign, CheckCircle, TrendingUp, Package, Users, ChevronRight, Truck, Clock, MapPin, Leaf } from 'lucide-react';
import Logo from '../components/logo';
import BottomBar from '../components/bottom-bar';
import { useRouter } from 'next/navigation';

export default function DashboardFarmerPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [time, setTime] = useState("");
  const router = useRouter();

  // Sample data for earnings
  const totalEarnings = 12450.75;
  const monthlyGrowth = 12.5;

  // Sample data for matched orders
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

  // Sample data for trucks and tractors
  const vehicles = [
    {
      id: 'TRK001',
      type: 'truck',
      driver: 'John Smith',
      route: 'Route A - Downtown',
      estimatedArrival: '10:30 AM',
      status: 'on-time',
      cargo: 'cassava'
    },
    {
      id: 'TRC002', 
      type: 'tractor',
      driver: 'Maria Garcia',
      route: 'Route B - Industrial',
      estimatedArrival: '11:15 AM',
      status: 'delayed',
      cargo: 'rice'
    },
    {
      id: 'TRK003',
      type: 'truck',
      driver: 'David Chen',
      route: 'Route C - Residential',
      estimatedArrival: '12:00 PM',
      status: 'early',
      cargo: 'corn'
    },
    {
      id: 'TRC004',
      type: 'tractor',
      driver: 'Sarah Johnson',
      route: 'Route D - Warehouse',
      estimatedArrival: '1:45 PM',
      status: 'on-time',
      cargo: 'soybean'
    }
  ];

  // Separate vehicles by type
  const trucks = vehicles.filter(vehicle => vehicle.type === 'truck');
  const tractors = vehicles.filter(vehicle => vehicle.type === 'tractor');

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

  const getPlantTypeColor = (plantType: string) => {
    switch (plantType.toLowerCase()) {
      case 'rice': return 'bg-green-100 text-green-800';
      case 'corn': return 'bg-yellow-100 text-yellow-800';
      case 'cassava': return 'bg-purple-100 text-purple-800';
      case 'sugar cane': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVehicleStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-green-500';
      case 'delayed': return 'bg-red-500';
      case 'early': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getVehicleStatusText = (status: string) => {
    switch (status) {
      case 'on-time': return 'On Time';
      case 'delayed': return 'Delayed';
      case 'early': return 'Early';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 pb-24">
      {/* Header */}
      <Logo />

      {/* Total Earnings Card */}
      <div className="mb-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-green-800">Total Earnings</h2>
                <p className="text-sm text-green-500">This month</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+{monthlyGrowth}%</span>
            </div>
          </div>
          
          <div className="text-3xl font-bold text-green-800 mb-2">
            ${totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          
          <div className="flex items-center text-sm text-green-600">
            <span>Up from last month</span>
          </div>
        </div>
      </div>

      {/* Ongoing Matched Orders */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Ongoing Matched Orders ({matchedOrders.length})
        </h2>
        
        <div className="space-y-4">
          {matchedOrders.slice(0, 3).map((order) => (
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
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-green-600" />
                  <span className="font-medium text-green-600">Buyer:</span>
                  <span className="ml-1 text-green-800">{order.buyer}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-green-600">Value: ${order.value.toLocaleString()}</span>
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

        {/* See All Button */}
        {matchedOrders.length > 3 && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => router.push('/all-orders-farmers')}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors shadow-sm"
            >
              <span className="font-medium">See All Orders</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Tractors Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
          <Leaf className="w-5 h-5 mr-2" />
          Tractors ({tractors.length})
        </h2>
        <div className="space-y-4">
          {tractors.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">{vehicle.id}</h3>
                    <p className="text-sm text-green-500 capitalize">{vehicle.type}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs text-white ${getVehicleStatusColor(vehicle.status)}`}>
                  {getVehicleStatusText(vehicle.status)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-green-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-medium">ETA: {vehicle.estimatedArrival}</span>
                </div>
                
                <div className="flex items-center text-sm text-green-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{vehicle.route}</span>
                </div>
                
                <div className="flex items-start text-sm text-green-600">
                  <div className="w-4 h-4 mr-2 mt-0.5">
                    📦
                  </div>
                  <div className="space-y-2">
                    <p><span className="font-medium">Driver:</span> {vehicle.driver}</p>
                    <p><span className={`font-semibold px-2 py-1 rounded-lg ${getPlantTypeColor(vehicle.cargo)}`}>{vehicle.cargo.charAt(0).toUpperCase() + vehicle.cargo.slice(1)}</span></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trucks Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
          <Truck className="w-5 h-5 mr-2" />
          Trucks ({trucks.length})
        </h2>
        <div className="space-y-4">
          {trucks.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">{vehicle.id}</h3>
                    <p className="text-sm text-green-500 capitalize">{vehicle.type}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs text-white ${getVehicleStatusColor(vehicle.status)}`}>
                  {getVehicleStatusText(vehicle.status)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-green-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-medium">ETA: {vehicle.estimatedArrival}</span>
                </div>
                
                <div className="flex items-center text-sm text-green-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{vehicle.route}</span>
                </div>
                
                <div className="flex items-start text-sm text-green-600">
                  <div className="w-4 h-4 mr-2 mt-0.5">
                    📦
                  </div>
                  <div className="space-y-2">
                    <p><span className="font-medium">Driver:</span> {vehicle.driver}</p>
                    <p><span className={`font-semibold px-2 py-1 rounded-lg ${getPlantTypeColor(vehicle.cargo)}`}>{vehicle.cargo.charAt(0).toUpperCase() + vehicle.cargo.slice(1)}</span></p>
                  </div>
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
