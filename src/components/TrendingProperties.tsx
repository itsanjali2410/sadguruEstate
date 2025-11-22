import { Link } from 'react-router-dom';
import { MapPin, Eye } from 'lucide-react';
import { properties } from '../data/properties';

const TrendingProperties = () => {
  // Get featured properties for trending section
  const featuredProperties = properties.filter(property => property.featured).slice(0, 6);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">Trending Properties</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProperties.map((property) => (
            <div key={property.id} className="group cursor-pointer">
              <Link to={`/property/${property.id}`} className="block">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={property.image} 
                    alt={property.name}
                    className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-1">{property.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl sm:text-2xl font-semibold text-gray-900">{property.price}</span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>View</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Properties Button */}
        <div className="text-center mt-12 sm:mt-16">
          <Link 
            to="/properties"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingProperties;