"use client";

import React, { useState, useEffect } from 'react';
import { Truck, Clock, MapPin, Bell, X , Leaf} from 'lucide-react';
import Logo from '../components/logo';
import BottomBar from '../components/bottom-bar';
import MatchMadePopUp from '../components/match-made';

const Dashboard = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [time, setTime] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  
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
    },
    {
      id: 'TRK005',
      type: 'truck',
      driver: 'Mike Wilson',
      route: 'Route E - Shopping Center',
      estimatedArrival: '2:30 PM',
      status: 'on-time',
      cargo: 'sugar cane'
    }
  ];

  const getPlantTypeColor = (plantType: string) => {
    switch (plantType.toLowerCase()) {
      case 'rice': return 'bg-green-100 text-green-800';
      case 'corn': return 'bg-yellow-100 text-yellow-800';
      case 'cassava': return 'bg-purple-100 text-purple-800';
      case 'sugar cane': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Separate vehicles by type
  const trucks = vehicles.filter(vehicle => vehicle.type === 'truck');
  const tractors = vehicles.filter(vehicle => vehicle.type === 'tractor');

  // Show notification when component mounts
  useEffect(() => {
    setShowNotification(true);
    // Auto-hide notification after 3 seconds
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-green-500';
      case 'delayed': return 'bg-red-500';
      case 'early': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on-time': return 'On Time';
      case 'delayed': return 'Delayed';
      case 'early': return 'Early';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-4">
      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center justify-between animate-slide-down">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span className="font-medium">Dashboard Updated</span>
          </div>
          <button 
            onClick={() => setShowNotification(false)}
            className="p-1 hover:bg-green-700 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <MatchMadePopUp/>

      {/* Header */}
      <Logo/>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Truck className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-600">Trucks</p>
              <p className="text-xl font-bold text-green-800">{trucks.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Leaf className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-600">Tractors</p>
              <p className="text-xl font-bold text-green-800">{tractors.length}</p>
            </div>
          </div>
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
                <div className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(vehicle.status)}`}>
                  {getStatusText(vehicle.status)}
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
                  <div>
                    <p><span className="font-medium">Driver:</span> {vehicle.driver}</p>
                    <p><span className={`font-semibold ${getPlantTypeColor(vehicle.cargo)}`}>{vehicle.cargo}</span></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
                <div className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(vehicle.status)}`}>
                  {getStatusText(vehicle.status)}
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
                  <div>
                    <p><span className="font-medium">Driver:</span> {vehicle.driver}</p>
                    <p><span className={`font-semibold ${getPlantTypeColor(vehicle.cargo)}`}>{vehicle.cargo}</span></p>
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

      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
        <BottomBar activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
  );
};

export default Dashboard;