"use client";

import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, Truck, FileText, Users, CreditCard, Leaf, X, Package, User, Phone, Calendar, ArrowLeft } from 'lucide-react';
import Logo from '../components/logo';
import BottomBar from '../components/bottom-bar';

interface TrackingEvent {
  id: number;
  status: string;
  timestamp: string;
  location?: string;
  details?: string;
  responsible?: string;
  contact?: string;
  estimatedDuration?: string;
  notes?: string;
  documents?: string[];
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
  materialType: string;
  weight: string;
  value: string;
  events: TrackingEvent[];
}

interface DeliveryRequest {
  id: number;
  trackingNumber: string;
  from: string;
  to: string;
  materialType: string;
  weight: string;
  value: string;
  currentStatus: string;
  lastUpdate: string;
  farmer: string;
  buyer: string;
}

export default function ThailandDeliveryTracker() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TrackingEvent | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<DeliveryRequest | null>(null);
  const [activeTab, setActiveTab] = useState("tracking");
  
  const [statusCounts] = useState<StatusCount[]>([
    {
      status: "Biomatter Posted",
      count: 15,
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-100 hover:bg-orange-200 border-orange-300"
    },
    {
      status: "Match Found",
      count: 12,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 hover:bg-blue-200 border-blue-300"
    },
    {
      status: "Collection Scheduled",
      count: 8,
      icon: Leaf,
      color: "text-purple-600",
      bgColor: "bg-purple-100 hover:bg-purple-200 border-purple-300"
    },
    {
      status: "In Transit",
      count: 5,
      icon: Truck,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100 hover:bg-indigo-200 border-indigo-300"
    },
    {
      status: "Quality Check",
      count: 3,
      icon: CreditCard,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300"
    },
    {
      status: "Delivered & Paid",
      count: 2,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100 hover:bg-green-200 border-green-300"
    }
  ]);

  // Mock delivery requests for different statuses
  const [deliveryRequests] = useState<{[key: string]: DeliveryRequest[]}>({
    "Biomatter Posted": [
      {
        id: 1,
        trackingNumber: "TH001234567",
        from: "Jasmine Rice Farm - Surin Province",
        to: "Bio-Energy Plant - Rayong Province",
        materialType: "Jasmine Rice Husk",
        weight: "3,200kg",
        value: "฿8,000",
        currentStatus: "Biomatter Posted",
        lastUpdate: "2024-04-02 08:30:00",
        farmer: "Somchai Jaidee",
        buyer: "Pending Match"
      },
      {
        id: 2,
        trackingNumber: "TH001234568",
        from: "Cassava Plantation - Nakhon Ratchasima",
        to: "Bioethanol Factory - Chonburi",
        materialType: "Cassava Pulp",
        weight: "5,500kg",
        value: "฿11,000",
        currentStatus: "Biomatter Posted",
        lastUpdate: "2024-04-02 10:15:00",
        farmer: "Niran Pholsri",
        buyer: "Pending Match"
      },
      {
        id: 3,
        trackingNumber: "TH001234569",
        from: "Sugarcane Farm - Kanchanaburi",
        to: "Biomass Power Plant - Bangkok",
        materialType: "Sugarcane Bagasse",
        weight: "4,800kg",
        value: "฿12,000",
        currentStatus: "Biomatter Posted",
        lastUpdate: "2024-04-02 14:20:00",
        farmer: "Apinya Thanakit",
        buyer: "Pending Match"
      }
    ],
    "In Transit": [
      {
        id: 4,
        trackingNumber: "TH001234570",
        from: "Coconut Grove - Prachuap Khiri Khan",
        to: "Activated Carbon Factory - Samut Prakan",
        materialType: "Coconut Coir",
        weight: "2,100kg",
        value: "฿6,300",
        currentStatus: "In Transit",
        lastUpdate: "2024-04-03 10:00:00",
        farmer: "Malee Songkram",
        buyer: "Green Tech Industries"
      },
      {
        id: 5,
        trackingNumber: "TH001234571",
        from: "Palm Oil Plantation - Chumphon",
        to: "Biofuel Plant - Pattaya",
        materialType: "Palm Kernel Shell",
        weight: "3,800kg",
        value: "฿9,500",
        currentStatus: "In Transit",
        lastUpdate: "2024-04-03 12:30:00",
        farmer: "Kamon Rattana",
        buyer: "Thai Renewable Energy Co."
      }
    ]
  });

  // Detailed tracking data for selected request
  const [trackingData] = useState<{[key: string]: DeliveryData}>({
    "TH001234570": {
      trackingNumber: "TH001234570",
      from: "Coconut Grove - Prachuap Khiri Khan",
      to: "Activated Carbon Factory - Samut Prakan",
      materialType: "Coconut Coir",
      weight: "2,100kg",
      value: "฿6,300",
      currentStatus: "In Transit",
      progress: 60,
      events: [
        {
          id: 1,
          status: "Biomatter posted for sale",
          timestamp: "2024-04-02 09:15:00",
          location: "Coconut Grove - Prachuap Khiri Khan",
          details: "Farmer posted 2,100kg of coconut coir biomass on Makaset Place marketplace. Quality inspection completed and verified organic certification.",
          responsible: "Malee Songkram (Farmer)",
          contact: "+66 81 234 5678",
          estimatedDuration: "2 hours",
          notes: "Coconut coir from fresh harvest. Moisture content: 15%. Quality grade: Premium. Price: ฿3.00 per kg. Organic certified by Thailand Organic Agriculture Foundation.",
          documents: ["Organic Certificate", "Quality Report", "Weight Verification", "Farm Registration"]
        },
        {
          id: 2,
          status: "Match found with buyer",
          timestamp: "2024-04-02 15:30:00",
          location: "Makaset Place Platform",
          details: "Green Tech Industries matched with coconut coir listing. Purchase agreement confirmed and payment secured through escrow.",
          responsible: "Preecha Suwan (Platform Manager)",
          contact: "+66 82 987 6543",
          estimatedDuration: "45 minutes",
          notes: "Buyer: Green Tech Industries Co. Ltd. Total value: ฿6,300. Payment method: Bank transfer via Kasikorn Bank. Delivery timeline: 2 days",
          documents: ["Purchase Agreement", "Payment Confirmation", "Buyer Certificate", "Insurance Policy"]
        },
        {
          id: 3,
          status: "Collection scheduled",
          timestamp: "2024-04-02 17:45:00",
          location: "Coconut Grove - Prachuap Khiri Khan",
          details: "Logistics partner Thai Agri Transport scheduled collection. Specialized biomass vehicle assigned for pickup tomorrow morning.",
          responsible: "Siriporn Nakorn (Logistics Manager)",
          contact: "+66 83 456 7890",
          estimatedDuration: "30 minutes",
          notes: "Collection time: 2024-04-03 08:00 AM. Vehicle: Bio-Transport Truck BT-2024-TH-015. Route: Highway 4 to Highway 35",
          documents: ["Collection Schedule", "Transport License", "Driver Assignment", "Route Optimization"]
        },
        {
          id: 4,
          status: "Biomatter collected",
          timestamp: "2024-04-03 08:20:00",
          location: "Coconut Grove - Prachuap Khiri Khan",
          details: "Coconut coir successfully collected from farm. Quality verified and loaded onto climate-controlled transport vehicle.",
          responsible: "Wirat Chaisri (Collection Driver)",
          contact: "+66 84 111 2222",
          estimatedDuration: "40 minutes",
          notes: "Actual weight: 2,080kg (within acceptable variance). Loading completed 20 minutes past schedule due to morning traffic.",
          documents: ["Collection Receipt", "Final Weight Check", "Loading Photos", "Temperature Log"]
        },
        {
          id: 5,
          status: "In transit to processing facility",
          timestamp: "2024-04-03 09:00:00",
          location: "Highway 4 - Hua Hin",
          details: "Coconut coir in transit to activated carbon factory. Real-time GPS tracking and temperature monitoring active.",
          responsible: "Wirat Chaisri (Transport Driver)",
          contact: "+66 84 111 2222",
          estimatedDuration: "5 hours",
          notes: "Route: Prachuap → Hua Hin → Bangkok → Samut Prakan. ETA: 2:00 PM. Temperature: 28°C (optimal). Traffic conditions: Normal",
          documents: ["Transport Manifest", "GPS Tracking", "Temperature Monitoring", "Traffic Updates"]
        },
        {
          id: 6,
          status: "Quality verification at destination",
          timestamp: "2024-04-03 14:15:00",
          location: "Activated Carbon Factory - Samut Prakan",
          details: "Arrived at Green Tech Industries facility. Quality inspection in progress for activated carbon production suitability.",
          responsible: "Dr. Chanida Wongsa (Quality Engineer)",
          contact: "+66 85 333 4444",
          estimatedDuration: "90 minutes",
          notes: "Arrival: 2:15 PM (15 min delay due to Bangkok traffic). Initial inspection: Excellent condition. Moisture content stable at 15%.",
          documents: ["Arrival Certificate", "Quality Assessment", "Lab Test Results", "Production Readiness Report"]
        }
      ]
    }
  });

  const handleStatusClick = (status: string) => {
    if (selectedStatus === status) {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(status);
      setSelectedRequest(null); // Clear selected request when changing status
    }
  };

  const handleRequestClick = (request: DeliveryRequest) => {
    setSelectedRequest(request);
  };

  const handleBackToRequests = () => {
    setSelectedRequest(null);
  };

  const handleEventClick = (event: TrackingEvent) => {
    setSelectedEvent(event);
  };

  const closeEventPopup = () => {
    setSelectedEvent(null);
  };

  const currentRequests = selectedStatus ? (deliveryRequests[selectedStatus] || []) : [];
  const currentTrackingData = selectedRequest ? trackingData[selectedRequest.trackingNumber] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Logo/>

      <div className="p-4">
        {!selectedStatus ? (
          // Main Status Overview
          <>
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-4">
              <div className="text-sm font-medium text-gray-700 mb-6">Biomatter Transaction Status Overview</div>
              
              <div className="relative">
                <div className="flex justify-between relative">
                  {statusCounts.map((status, index) => {
                    const IconComponent = status.icon;
                    const isCompleted = index < 4;
                    
                    return (
                      <div key={status.status} className="flex flex-col items-center">
                        <button
                          onClick={() => handleStatusClick(status.status)}
                          className={`
                            relative w-12 h-12 rounded-full border-4 transition-all duration-300 transform
                            ${isCompleted 
                              ? 'bg-green-500 border-green-500 text-white shadow-lg' 
                              : 'bg-white border-gray-300 text-gray-400 hover:border-gray-400'
                            }
                            hover:scale-105 active:scale-95
                          `}
                        >
                          <IconComponent className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                          
                          <div className={`
                            absolute -top-2 -right-2 min-w-6 h-6 rounded-full text-xs font-bold
                            flex items-center justify-center px-1
                            ${isCompleted
                              ? 'bg-white text-gray-800 border-2 border-current'
                              : 'bg-red-500 text-white'
                            }
                          `}>
                            {status.count}
                          </div>
                          
                          {isCompleted && (
                            <div className="absolute inset-0 bg-green-600 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-8 h-8 text-white fill-current" />
                            </div>
                          )}
                        </button>
                        
                        <div className="mt-3 text-center max-w-20">
                          <div className={`
                            text-xs font-medium leading-tight
                            ${isCompleted ? 'text-gray-800' : 'text-gray-500'}
                          `}>
                            {status.status}
                          </div>
                          <div className={`
                            text-xs mt-1
                            ${isCompleted ? 'text-green-600' : 'text-gray-400'}
                          `}>
                            ({status.count})
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">45</div>
                  <div className="text-sm text-gray-600">Total Transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">฿156,800</div>
                  <div className="text-sm text-gray-600">Total Value</div>
                </div>
              </div>
            </div>
          </>
        ) : !selectedRequest ? (
          // Requests List for Selected Status
          <>
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setSelectedStatus(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{selectedStatus}</h2>
                  <p className="text-sm text-gray-600">{currentRequests.length} active transactions</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {currentRequests.map((request) => (
                <div
                  key={request.id}
                  onClick={() => handleRequestClick(request)}
                  className="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium text-gray-900">{request.trackingNumber}</div>
                    <div className="text-sm text-blue-600 font-medium">View Timeline →</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">From</div>
                      <div className="text-sm text-gray-900">{request.from}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">To</div>
                      <div className="text-sm text-gray-900">{request.to}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Material</div>
                      <div className="text-sm text-gray-900">{request.materialType}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Weight</div>
                      <div className="text-sm text-gray-900">{request.weight}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Value</div>
                      <div className="text-sm text-gray-900 font-medium">{request.value}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Farmer: {request.farmer}</span>
                    <span>Updated: {request.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // Detailed Timeline for Selected Request
          <>
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={handleBackToRequests}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-green-600 font-medium">Tracking: {selectedRequest.trackingNumber}</div>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    <span>{selectedRequest.from}</span>
                    <span>→</span>
                    <span>{selectedRequest.to}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <span className="font-medium">Material:</span> {selectedRequest.materialType} | 
                    <span className="font-medium"> Weight:</span> {selectedRequest.weight} | 
                    <span className="font-medium"> Value:</span> {selectedRequest.value}
                  </div>
                </div>
              </div>
            </div>

            {currentTrackingData && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4">
                  <div className="space-y-4">
                    {currentTrackingData.events.map((event, index) => (
                      <div 
                        key={event.id} 
                        className="flex gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          {index < currentTrackingData.events.length - 1 && (
                            <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="text-sm font-medium text-gray-800 flex items-center justify-between">
                            <span>{event.status}</span>
                            <span className="text-xs text-blue-600 font-medium">Click for details →</span>
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
            )}
          </>
        )}
      </div>

      {/* Event Details Popup */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Event Details</h2>
              <button
                onClick={closeEventPopup}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.status}</h3>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{selectedEvent.timestamp}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedEvent.location && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-700">Location</span>
                    </div>
                    <p className="text-gray-900">{selectedEvent.location}</p>
                  </div>
                )}

                {selectedEvent.responsible && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-700">Responsible</span>
                    </div>
                    <p className="text-gray-900">{selectedEvent.responsible}</p>
                  </div>
                )}

                {selectedEvent.contact && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-700">Contact</span>
                    </div>
                    <p className="text-gray-900">{selectedEvent.contact}</p>
                  </div>
                )}

                {selectedEvent.estimatedDuration && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-gray-700">Duration</span>
                    </div>
                    <p className="text-gray-900">{selectedEvent.estimatedDuration}</p>
                  </div>
                )}
              </div>

              {selectedEvent.details && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-2">Event Details</h4>
                  <p className="text-gray-900">{selectedEvent.details}</p>
                </div>
              )}

              {selectedEvent.notes && (
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-2">Notes</h4>
                  <p className="text-gray-900">{selectedEvent.notes}</p>
                </div>
              )}

              {selectedEvent.documents && selectedEvent.documents.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Related Documents
                  </h4>
                  <div className="space-y-2">
                    {selectedEvent.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-900">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={closeEventPopup}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
  );
}