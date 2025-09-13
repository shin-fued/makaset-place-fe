"use client";

import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, Truck, FileText, Users, CreditCard, Leaf, X, Package, User, Phone, Calendar } from 'lucide-react';
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
  events: TrackingEvent[];
}

export default function DeliveryTracker() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TrackingEvent | null>(null);
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

  const [trackingData] = useState<DeliveryData>({
    trackingNumber: "BM001234567",
    from: "Rice Farm - Bulacan",
    to: "Biomass Processing Plant - Oriental Mindoro",
    currentStatus: "In Transit",
    progress: 60,
    events: [
      {
        id: 1,
        status: "Biomatter posted for sale",
        timestamp: "2024-04-02 08:30:00",
        location: "Rice Farm - Bulacan",
        details: "Farmer posted 2,500kg of rice husk biomass for sale on the marketplace. Quality inspection and weight verification completed.",
        responsible: "Maria Santos (Farmer)",
        contact: "+63 912 345 6789",
        estimatedDuration: "2 hours",
        notes: "Rice husk from recent harvest. Moisture content: 12%. Quality grade: A+. Price: ₿2.50 per kg",
        documents: ["Biomass Quality Certificate", "Weight Verification", "Farm Registration", "Harvest Certificate"]
      },
      {
        id: 2,
        status: "Match found with buyer",
        timestamp: "2024-04-02 14:45:00",
        location: "Makaset Place Platform",
        details: "Business buyer matched with this biomatter listing. Purchase agreement initiated and payment secured.",
        responsible: "Juan Dela Cruz (Platform Manager)",
        contact: "+63 917 123 4567",
        estimatedDuration: "1 hour",
        notes: "Buyer: Green Energy Corp. Total value: ₿6,250. Payment method: Bank transfer",
        documents: ["Purchase Agreement", "Payment Confirmation", "Buyer Verification", "Transaction Receipt"]
      },
      {
        id: 3,
        status: "Collection scheduled",
        timestamp: "2024-04-02 16:20:00",
        location: "Rice Farm - Bulacan",
        details: "Collection appointment scheduled with logistics partner. Biomatter prepared for pickup.",
        responsible: "Ana Rodriguez (Logistics Coordinator)",
        contact: "+63 918 987 6543",
        estimatedDuration: "30 minutes",
        notes: "Collection time: 2024-04-03 09:00 AM. Vehicle: Biomass Truck BMT-2024-001",
        documents: ["Collection Schedule", "Logistics Agreement", "Driver Assignment", "Route Plan"]
      },
      {
        id: 4,
        status: "Biomatter collected",
        timestamp: "2024-04-03 09:15:00",
        location: "Rice Farm - Bulacan",
        details: "Biomatter successfully collected from farm. Loaded onto specialized biomass transport vehicle.",
        responsible: "Roberto Garcia (Collection Driver)",
        contact: "+63 919 555 1234",
        estimatedDuration: "45 minutes",
        notes: "Actual weight: 2,480kg. Collection completed 15 minutes ahead of schedule.",
        documents: ["Collection Receipt", "Weight Verification", "Driver License", "Vehicle Registration"]
      },
      {
        id: 5,
        status: "In transit to processing plant",
        timestamp: "2024-04-03 10:00:00",
        location: "En Route",
        details: "Biomatter is currently in transit to the processing plant. GPS tracking active.",
        responsible: "Roberto Garcia (Transport Driver)",
        contact: "+63 919 555 1234",
        estimatedDuration: "6 hours",
        notes: "Route: Bulacan → Manila → Oriental Mindoro. ETA: 4:00 PM. Temperature monitoring active.",
        documents: ["Transport Manifest", "GPS Tracking Log", "Temperature Records", "Route Documentation"]
      },
      {
        id: 6,
        status: "Quality check at processing plant",
        timestamp: "2024-04-03 16:30:00",
        location: "Biomass Processing Plant - Oriental Mindoro",
        details: "Biomatter arrived at processing plant. Quality inspection and moisture testing in progress.",
        responsible: "Lisa Chen (Quality Inspector)",
        contact: "+63 920 777 8888",
        estimatedDuration: "2 hours",
        notes: "Arrival time: 4:30 PM (30 min delay due to traffic). Quality check: In progress",
        documents: ["Arrival Receipt", "Quality Test Results", "Moisture Analysis", "Processing Log"]
      }
    ]
  });

  const handleStatusClick = (status: string) => {
    setSelectedStatus(selectedStatus === status ? null : status);
  };

  const handleEventClick = (event: TrackingEvent) => {
    setSelectedEvent(event);
  };

  const closeEventPopup = () => {
    setSelectedEvent(null);
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <Logo/>

      {/* Interactive Status Progress Bar */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-4">
          <div className="text-sm font-medium text-gray-700 mb-6">Biomatter Transaction Status Overview</div>
          
          {/* Horizontal Progress Steps */}
          <div className="relative">
            
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
                <span className="font-medium">Count:</span> {statusCounts.find(s => s.status === selectedStatus)?.count} transactions
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
              <div className="text-green-600 font-medium">Biomatter Tracking: {trackingData.trackingNumber}</div>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <span>{trackingData.from}</span>
              <span>→</span>
              <span>{trackingData.to}</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <span className="font-medium">Material:</span> Rice Husk Biomass | <span className="font-medium">Weight:</span> 2,500kg | <span className="font-medium">Value:</span> ₿6,250
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {trackingData.events.map((event, index) => (
                <div 
                  key={event.id} 
                  className="flex gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    {index < trackingData.events.length - 1 && (
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
        </div>

        {/* Event Details Popup */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Event Details</h2>
                <button
                  onClick={closeEventPopup}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Event Status */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.status}</h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{selectedEvent.timestamp}</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location */}
                  {selectedEvent.location && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-700">Location</span>
                      </div>
                      <p className="text-gray-900">{selectedEvent.location}</p>
                    </div>
                  )}

                  {/* Responsible Person */}
                  {selectedEvent.responsible && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-700">Responsible</span>
                      </div>
                      <p className="text-gray-900">{selectedEvent.responsible}</p>
                    </div>
                  )}

                  {/* Contact */}
                  {selectedEvent.contact && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Phone className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-gray-700">Contact</span>
                      </div>
                      <p className="text-gray-900">{selectedEvent.contact}</p>
                    </div>
                  )}

                  {/* Duration */}
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

                {/* Details */}
                {selectedEvent.details && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Event Details</h4>
                    <p className="text-gray-900">{selectedEvent.details}</p>
                  </div>
                )}

                {/* Notes */}
                {selectedEvent.notes && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-2">Notes</h4>
                    <p className="text-gray-900">{selectedEvent.notes}</p>
                  </div>
                )}

                {/* Documents */}
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

              {/* Footer */}
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

       <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}