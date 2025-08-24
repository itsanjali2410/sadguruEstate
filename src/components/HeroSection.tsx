import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, IndianRupee, Bed } from 'lucide-react';
import { locations, propertyTypes } from '../data/properties';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('Buy');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/properties?type=${activeTab.toLowerCase()}`);
  };

  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Find Your <span className="text-amber-400">Dream Home</span> in <span className="text-amber-400">Navi Mumbai</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Discover premium properties across Nerul, Panvel, Kharghar, Ulwe & Taloja
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-1 flex">
            {['Buy', 'Rent', 'Commercial'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'text-white hover:bg-white hover:bg-opacity-20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900">
                  <option>Select Location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Property Type</label>
              <div className="relative">
                <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900">
                  <option>All Types</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900">
                  <option>Any Price</option>
                  <option>₹10L - ₹25L</option>
                  <option>₹25L - ₹50L</option>
                  <option>₹50L - ₹1Cr</option>
                  <option>₹1Cr - ₹2Cr</option>
                  <option>₹2Cr+</option>
                </select>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
              <div className="relative">
                <Bed className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900">
                  <option>Any</option>
                  <option>1 BHK</option>
                  <option>1.5 BHK</option>
                  <option>2 BHK</option>
                  <option>2.5 BHK</option>
                  <option>3 BHK</option>
                  <option>4+ BHK</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div>
              <button 
                onClick={handleSearch}
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2 font-medium"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-white">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">50+</div>
            <div className="text-sm text-gray-200">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">5+</div>
            <div className="text-sm text-gray-200">Locations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">1000+</div>
            <div className="text-sm text-gray-200">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">15+</div>
            <div className="text-sm text-gray-200">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;