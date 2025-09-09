"use client"

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronUp, 
  ChevronDown, 
  Home, 
  ShoppingCart, 
  QrCode 
} from 'lucide-react';
import Image from 'next/image';

export default function BiomatterApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: "", direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);

  // Sample biomatter data
  const [data] = useState([
    {
      id: 1,
      name: 'Somchai Jaidee',
      location: 'Chiang Mai',
      phoneNumber: '081-234-5678',
      plantType: 'Rice',
      raiSize: '15 rai',
      maxPrice: '₿25,000',
      minPrice: '₿20,000',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Malee Suksawat',
      location: 'Nakhon Pathom',
      phoneNumber: '089-876-5432',
      plantType: 'Corn',
      raiSize: '8 rai',
      maxPrice: '₿18,000',
      minPrice: '₿15,000',
      joinDate: '2024-02-20'
    },
    {
      id: 3,
      name: 'Prayut Kaewta',
      location: 'Surin',
      phoneNumber: '092-345-6789',
      plantType: 'Cassava',
      raiSize: '20 rai',
      maxPrice: '₿35,000',
      minPrice: '₿30,000',
      joinDate: '2024-03-10'
    },
    {
      id: 4,
      name: 'Siriporn Thanakit',
      location: 'Ubon Ratchathani',
      phoneNumber: '087-654-3210',
      plantType: 'Sugar Cane',
      raiSize: '12 rai',
      maxPrice: '₿22,000',
      minPrice: '₿18,000',
      joinDate: '2024-01-28'
    }
  ]);

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
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
      case 'sugar cane': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Logo Section */}
      <div className="flex flex-col items-center justify-start pt-6 pb-4 px-4">
        <Image
                    src="/makasetPlace logo.jpg"
                    alt="A healthy plant"
                    width={120}
                    height={80}
                    className="rounded-lg shadow" />
      </div>

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
                    onClick={() => handleSort('location')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
                  >
                    Location
                    {sortConfig.key === 'location' && (
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
                    onClick={() => handleSort('raiSize')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
                  >
                    Farm Size
                    {sortConfig.key === 'raiSize' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => handleSort('maxPrice')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
                  >
                    Max Price
                    {sortConfig.key === 'maxPrice' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => handleSort('minPrice')}
                    className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
                  >
                    Min Price
                    {sortConfig.key === 'minPrice' && (
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
                  <p className="text-gray-500">No farmers found matching your search.</p>
                </div>
              ) : (
                filteredAndSortedData.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    {/* Mobile Card Layout */}
                    <div className="md:hidden space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.phoneNumber}</p>
                          <p className="text-sm text-gray-500">{item.location}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlantTypeColor(item.plantType)}`}>
                          {item.plantType}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-500">Farm Size:</span>
                          <span className="ml-1 text-gray-900">{item.raiSize}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Price Range:</span>
                          <div className="ml-1 text-gray-900">
                            <div className="text-green-600 font-semibold">{item.minPrice}</div>
                            <div className="text-gray-500 text-xs">to {item.maxPrice}</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-500">Joined:</span>
                        <span className="ml-1 text-gray-900">{item.joinDate}</span>
                      </div>
                    </div>

                    {/* Desktop Row Layout */}
                    <div className="hidden md:grid md:grid-cols-6 md:gap-4 md:items-center">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-gray-500">{item.location}</div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlantTypeColor(item.plantType)}`}>
                          {item.plantType}
                        </span>
                      </div>
                      <div className="text-gray-900">{item.raiSize}</div>
                      <div className="font-semibold text-green-600">{item.maxPrice}</div>
                      <div className="font-semibold text-gray-900">{item.minPrice}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div>
              Showing {filteredAndSortedData.length} of {data.length} farmers
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-700 rounded-t-3xl px-2 py-3 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <div className="flex flex-col items-center gap-1">
            <Home size={22} className="text-gray-400" />
            <span className="text-xs text-gray-400 font-medium">Dashboard</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ShoppingCart size={22} className="text-black-500" />
            <span className="text-xs text-black-500">Market Place</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <button className="bg-green-600 rounded-full p-3 shadow-lg hover:bg-green-700 transition flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="text-xs text-white font-medium">Request</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <QrCode size={22} className="text-gray-400" />
            <span className="text-xs text-gray-400">Tracking</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="5" cy="12" r="2" fill="#9CA3AF" />
              <circle cx="12" cy="12" r="2" fill="#9CA3AF" />
              <circle cx="19" cy="12" r="2" fill="#9CA3AF" />
            </svg>
            <span className="text-xs text-gray-400">Others</span>
          </div>
        </div>
      </div>
    </div>
  );
}