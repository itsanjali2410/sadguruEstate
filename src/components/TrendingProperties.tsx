import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Eye, Building2, Calendar } from 'lucide-react';
import { properties, Property } from '../data/properties';

const TrendingProperties = () => {
  // Get featured properties for trending section
  const featuredProperties = properties.filter(property => property.featured).slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Properties</h2>
          <p className="text-xl text-gray-600">Discover the most sought-after properties in prime locations across Navi Mumbai</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
                {property.verified && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Verified
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{property.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Building2 className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.developer}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.possession}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{property.type} • {property.size}</p>
                
                {/* Configurations Preview */}
                {property.configurations && property.configurations.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-600 space-y-1">
                      {property.configurations.slice(0, 2).map((config, index) => (
                        <div key={index}>
                          <span className="font-medium">{config.type}:</span> {config.price}
                        </div>
                      ))}
                      {property.configurations.length > 2 && (
                        <div className="text-amber-600 font-medium">
                          +{property.configurations.length - 2} more configurations
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-600">{property.price}</span>
                  <Link 
                    to={`/property/${property.id}`}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Properties Button */}
        <div className="text-center mt-12">
          <Link 
            to="/properties"
            className="inline-flex items-center px-8 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
          >
            View All Properties
            <Eye className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingProperties;