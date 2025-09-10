"use client"

import React, { useState } from 'react';
import Logo from '../components/logo';
import { 
  Search, 
  Filter, 
  ChevronUp, 
  ChevronDown,
  X,
  Check,
  Phone,
  MapPin,
  Calendar,
  Package
} from 'lucide-react';
import BottomBar from '../components/bottom-bar';

interface RowData {
  id: number;
  name: string;
  deliveryAddress: string;
  phoneNumber: string;
  plantType: string;
  price: string;
  amount: string;
  PostedDate: string;
}

export default function BiomatterApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: "", direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RowData | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
const [activeTab, setActiveTab] = useState("marketPlace");

  // Sample biomatter data
  const [data] = useState([
    {
      id: 1,
      name: 'Bangchak',
      deliveryAddress: 'Chiang Mai',
      phoneNumber: '081-234-5678',
      plantType: 'Rice',
      price: '₿2.5',
      amount: '20000 kg',
      PostedDate: '2025-01-15'
    },
    {
      id: 2,
      name: 'Sompong Farm',
      deliveryAddress: 'Bangkok',
      phoneNumber: '089-765-4321',
      plantType: 'Corn',
      price: '₿1.8',
      amount: '15000 kg',
      PostedDate: '2025-01-18'
    },
    {
      id: 3,
      name: 'Golden Valley Co.',
      deliveryAddress: 'Phuket',
      phoneNumber: '092-345-6789',
      plantType: 'Sugarcane',
      price: '₿3.2',
      amount: '35000 kg',
      PostedDate: '2025-01-20'
    },
    {
      id: 4,
      name: 'Green Harvest Ltd.',
      deliveryAddress: 'Pattaya',
      phoneNumber: '087-654-3210',
      plantType: 'Cassava',
      price: '₿2.1',
      amount: '25000 kg',
      PostedDate: '2025-01-22'
    },
    {
      id: 5,
      name: 'Nakhon Agriculture',
      deliveryAddress: 'Nakhon Ratchasima',
      phoneNumber: '083-987-6543',
      plantType: 'Soybeans',
      price: '₿2.8',
      amount: '18000 kg',
      PostedDate: '2025-01-25'
    },
    {
      id: 6,
      name: 'Sunshine Crops',
      deliveryAddress: 'Khon Kaen',
      phoneNumber: '095-123-4567',
      plantType: 'Rice',
      price: '₿2.3',
      amount: '22000 kg',
      PostedDate: '2025-01-28'
    }
  ]);

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleRowClick = (item: RowData) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handleConfirmRequest = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowPopup(false);
    
    // Show success message or navigate
    alert(`Request sent to ${selectedItem?.name}!`);
    setSelectedItem(null);
  };

  const handleCancelRequest = () => {
    setShowPopup(false);
    setSelectedItem(null);
  };

  const filteredAndSortedData = React.useMemo(() => {
    const filteredData = data.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return filteredData;
  }, [data, searchTerm]);

  const getPlantTypeColor = (plantType: string) => {
    switch (plantType.toLowerCase()) {
      case 'rice': return 'bg-green-100 text-green-800';
      case 'corn': return 'bg-yellow-100 text-yellow-800';
      case 'cassava': return 'bg-purple-100 text-purple-800';
      case 'sugarcane': return 'bg-blue-100 text-blue-800';
      case 'soybeans': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      {/* Logo Section */}
      <Logo/>
      

      {/* Main Content */}
      <div className="flex-1 px-4 pb-20">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
          
          {/* Search and Filter Bar */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search farmers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={16} />
                Filters
              </button>
            </div>
          </div>

          {/* Mobile Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Desktop Table Header */}
            <div className="hidden md:block">
              <div className="bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-6 gap-4 px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
                  >
                    Farmer Name
                    {sortConfig.key === 'name' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => handleSort('deliveryAddress')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
                  >
                    Location
                    {sortConfig.key === 'deliveryAddress' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => handleSort('plantType')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
                  >
                    Plant Type
                    {sortConfig.key === 'plantType' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => handleSort('amount')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
                  >
                    Amount
                    {sortConfig.key === 'amount' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => handleSort('price')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
                  >
                    Price per kg
                    {sortConfig.key === 'price' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => handleSort('PostedDate')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
                  >
                    Posted Date
                    {sortConfig.key === 'PostedDate' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-200">
              {filteredAndSortedData.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-gray-500">No Sellers found matching your search.</p>
                </div>
              ) : (
                filteredAndSortedData.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => handleRowClick(item)}
                    className="p-4 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer mb-4 active:scale-[0.98]"
                  >
                    {/* Mobile Card Layout */}
                    <div className="md:hidden space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.phoneNumber}</p>
                          <p className="text-sm text-gray-500">{item.deliveryAddress}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlantTypeColor(item.plantType)}`}>
                          {item.plantType}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-500">Amount wanted:</span>
                          <span className="ml-1 text-gray-900">{item.amount}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Price per kg:</span>
                          <div className="ml-1 text-gray-900">
                            <div className="text-green-600 font-semibold">{item.price}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-500">Posted:</span>
                        <span className="ml-1 text-gray-900">{item.PostedDate}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-xs text-blue-600 font-medium">👆 Tap to start request</p>
                      </div>
                    </div>

                    {/* Desktop Row Layout */}
                    <div className="hidden md:grid md:grid-cols-6 md:gap-4 md:items-center">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-gray-500">{item.deliveryAddress}</div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlantTypeColor(item.plantType)}`}>
                          {item.plantType}
                        </span>
                      </div>
                      <div className="text-gray-900">{item.amount}</div>
                      <div className="font-semibold text-green-600">{item.price}</div>
                      <div className="text-gray-500">{item.PostedDate}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div>
              Showing {filteredAndSortedData.length} of {data.length} sellers
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Request Confirmation Popup */}
      {showPopup && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Confirm Request</h2>
              <button
                onClick={handleCancelRequest}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-600 mb-2">You are about to sell biomatter to:</p>
                <h3 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h3>
              </div>

              {/* Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Package size={16} className="text-gray-500" />
                  <div>
                    <span className="font-medium text-gray-700">Plant Type:</span>
                    <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPlantTypeColor(selectedItem.plantType)}`}>
                      {selectedItem.plantType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Package size={16} className="text-gray-500" />
                  <div>
                    <span className="font-medium text-gray-700">Amount:</span>
                    <span className="ml-2 text-gray-900">{selectedItem.amount}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-600 font-bold">₿</span>
                  <div>
                    <span className="font-medium text-gray-700">Price per kg:</span>
                    <span className="ml-2 text-green-600 font-bold">{selectedItem.price}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-gray-500" />
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <span className="ml-2 text-gray-900">{selectedItem.deliveryAddress}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gray-500" />
                  <div>
                    <span className="font-medium text-gray-700">Contact:</span>
                    <span className="ml-2 text-gray-900">{selectedItem.phoneNumber}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-gray-500" />
                  <div>
                    <span className="font-medium text-gray-700">Posted:</span>
                    <span className="ml-2 text-gray-900">{selectedItem.PostedDate}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> By confirming this request, you will be connected with the buyer to discuss details and arrange the biomatter purchase.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCancelRequest}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRequest}
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Confirm Request
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Simple Bottom Bar Placeholder */}
      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}