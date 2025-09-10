"use client";

import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, Truck, FileText, Users, CreditCard, Leaf } from 'lucide-react';
import Logo from './components/logo';
import BottomBar from './components/bottom-bar';

interface TrackingEvent {
  id: number;
  status: string;
  timestamp: string;
  location?: string;
}

interface StatusCount {
  status: string;
  count: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
}

interface DeliveryData {
  trackingNumber: string;
  from: string;
  to: string;
  currentStatus: string;
  progress: number;
  events: TrackingEvent[];
}

export default function DeliveryTracker() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("tracking");
  
  const [statusCounts] = useState<StatusCount[]>([
    {
      status: "Pending Request",
      count: 12,
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-100 hover:bg-orange-200 border-orange-300"
    },
    {
      status: "Match Made",
      count: 8,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 hover:bg-blue-200 border-blue-300"
    },
    {
      status: "Tractor Gathering",
      count: 5,
      icon: Leaf,
      color: "text-purple-600",
      bgColor: "bg-purple-100 hover:bg-purple-200 border-purple-300"
    },
    {
      status: "Transport",
      count: 3,
      icon: Truck,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100 hover:bg-indigo-200 border-indigo-300"
    },
    {
      status: "Pending Payment",
      count: 7,
      icon: CreditCard,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300"
    },
    {
      status: "Completed",
      count: 0,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100 hover:bg-green-200 border-green-300"
    }
  ]);

  const [trackingData] = useState<DeliveryData>({
    trackingNumber: "BM001234567",
    from: "Bulacan",
    to: "Oriental Mindoro",
    currentStatus: "In Progress",
    progress: 60,
    events: [
      {
        id: 1,
        status: "Order received by origin outlet",
        timestamp: "2024-04-02 20:10:05",
        location: "Bulacan Hub"
      },
      {
        id: 2,
        status: "Order outbound to next station",
        timestamp: "2024-04-02 20:30:40",
        location: "Bulacan Hub"
      },
      {
        id: 3,
        status: "Order arrived at outlet",
        timestamp: "2024-04-02 23:54:34",
        location: "Manila Transit"
      },
      {
        id: 4,
        status: "Order outbound to next station",
        timestamp: "2024-04-03 04:51:06",
        location: "Manila Transit"
      },
      {
        id: 5,
        status: "Order arrived at outlet",
        timestamp: "2024-04-04 07:17:06",
        location: "Oriental Mindoro Hub"
      }
    ]
  });

  const handleStatusClick = (status: string) => {
    setSelectedStatus(selectedStatus === status ? null : status);
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <Logo/>

      {/* Interactive Status Progress Bar */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-4">
          <div className="text-sm font-medium text-gray-700 mb-6">Request Status Overview</div>
          
          {/* Horizontal Progress Steps */}
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200 rounded-full"></div>
            <div className="absolute top-8 left-8 h-1 bg-green-500 rounded-full transition-all duration-500" style={{width: '75%'}}></div>
            
            {/* Status Steps */}
            <div className="flex justify-between relative">
              {statusCounts.map((status, index) => {
                const IconComponent = status.icon;
                const isSelected = selectedStatus === status.status;
                const isCompleted = index < 4; // First 4 steps are completed
                
                return (
                  <div key={status.status} className="flex flex-col items-center">
                    <button
                      onClick={() => handleStatusClick(status.status)}
                      className={`
                        relative w-12 h-12 rounded-full border-4 transition-all duration-300 transform
                        ${isCompleted 
                          ? 'bg-green-500 border-green-500 text-white shadow-lg' 
                          : isSelected
                          ? 'bg-blue-500 border-blue-500 text-white shadow-md'
                          : 'bg-white border-gray-300 text-gray-400 hover:border-gray-400'
                        }
                        ${isSelected ? 'scale-110' : 'hover:scale-105'}
                        active:scale-95
                      `}
                    >
                      <IconComponent className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      
                      {/* Count Badge */}
                      <div className={`
                        absolute -top-2 -right-2 min-w-6 h-6 rounded-full text-xs font-bold
                        flex items-center justify-center px-1
                        ${isCompleted || isSelected
                          ? 'bg-white text-gray-800 border-2 border-current'
                          : 'bg-red-500 text-white'
                        }
                      `}>
                        {status.count}
                      </div>
                      
                      {/* Completion Check */}
                      {isCompleted && !isSelected && (
                        <div className="absolute inset-0 bg-green-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 text-white fill-current" />
                        </div>
                      )}
                    </button>
                    
                    {/* Status Label */}
                    <div className="mt-3 text-center max-w-20">
                      <div className={`
                        text-xs font-medium leading-tight
                        ${isCompleted || isSelected ? 'text-gray-800' : 'text-gray-500'}
                      `}>
                        {status.status}
                      </div>
                      {status.count > 0 && (
                        <div className={`
                          text-xs mt-1
                          ${isCompleted ? 'text-green-600' : isSelected ? 'text-blue-600' : 'text-gray-400'}
                        `}>
                          ({status.count})
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Status Details */}
        {selectedStatus && (
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-4 animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-gray-800">{selectedStatus} Details</div>
              <button
                onClick={() => setSelectedStatus(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="text-sm text-gray-600">
              <div className="mb-2">
                <span className="font-medium">Count:</span> {statusCounts.find(s => s.status === selectedStatus)?.count} requests
              </div>
              <div className="mb-2">
                <span className="font-medium">Status:</span> Active processing
              </div>
              <div>
                <span className="font-medium">Next Action:</span> Awaiting completion of {selectedStatus.toLowerCase()} phase
              </div>
            </div>
          </div>
        )}

        {/* Detailed Timeline */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="text-green-600 font-medium">Current Tracking: {trackingData.trackingNumber}</div>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <span>{trackingData.from}</span>
              <span>→</span>
              <span>{trackingData.to}</span>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {trackingData.events.map((event, index) => (
                <div key={event.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    {index < trackingData.events.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="text-sm font-medium text-gray-800">
                      {event.status}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.timestamp}
                    </div>
                    {event.location && (
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
       <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}