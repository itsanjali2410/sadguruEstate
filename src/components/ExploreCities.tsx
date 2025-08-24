import React from 'react';
import { Link } from 'react-router-dom';
import { properties } from '../data/properties';

const ExploreCities = () => {
  // Get property counts for each location
  const getPropertyCount = (location: string) => {
    return properties.filter(p => p.location === location).length;
  };

  const cities = [
    {
      name: "Nerul",
      image: "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop",
      properties: `${getPropertyCount("Nerul")}+ Properties`,
      description: "Premium residential and commercial projects"
    },
    {
      name: "Panvel",
      image: "https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop",
      properties: `${getPropertyCount("Panvel")}+ Properties`,
      description: "Luxury townships and modern living"
    },
    {
      name: "Kharghar",
      image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop",
      properties: `${getPropertyCount("Kharghar")}+ Properties`,
      description: "Smart city with excellent connectivity"
    },
    {
      name: "Ulwe",
      image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop",
      properties: `${getPropertyCount("Ulwe")}+ Properties`,
      description: "Emerging residential hub"
    },
    {
      name: "Taloja",
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop",
      properties: `${getPropertyCount("Taloja")}+ Properties`,
      description: "Industrial and residential growth center"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Navi Mumbai</h2>
          <p className="text-xl text-gray-600">Discover premium properties across Navi Mumbai's fastest-growing locations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <Link 
              key={index} 
              to={`/properties?location=${city.name}`}
              className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
            >
              <img 
                src={city.image} 
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                <p className="text-amber-300 font-medium mb-2">{city.properties}</p>
                <p className="text-sm text-gray-200">{city.description}</p>
              </div>
              <div className="absolute inset-0 bg-amber-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </Link>
          ))}
        </div>

        {/* View All Properties Button */}
        <div className="text-center mt-12">
          <Link 
            to="/properties"
            className="inline-flex items-center px-8 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreCities;