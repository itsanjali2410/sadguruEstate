import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Eye } from 'lucide-react';
import PopupForm from '../components/PopupForm';
import StaticContactForm from '../components/StaticContactForm';
import { properties, locations, propertyTypes, developers, Property } from '../data/properties';
import { useSEO } from '../hooks/useSEO';
import { PAGE_SEO } from '../utils/seoUtils';

const PropertiesPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Dynamic SEO based on page type
  const propertyType = searchParams.get('type');
  const seoData = propertyType === 'buy' ? PAGE_SEO.buy :
                  propertyType === 'rent' ? PAGE_SEO.rent :
                  propertyType === 'commercial' ? PAGE_SEO.commercial :
                  PAGE_SEO.properties;
  useSEO(seoData);
  const [filters, setFilters] = useState({
    location: '',
    priceRange: [0, 10000000],
    bedrooms: '',
    propertyType: '',
    developer: '',
    amenities: [] as string[]
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Property[] | null>(null);

  // Handle search results from home page
  useEffect(() => {
    const storedResults = sessionStorage.getItem('searchResults');
    const storedFilters = sessionStorage.getItem('searchFilters');
    
    if (storedResults && storedFilters) {
      const parsedResults = JSON.parse(storedResults);
      // Only set search results if there are actual results
      if (parsedResults && parsedResults.length > 0) {
        setSearchResults(parsedResults);
      }
      
      // Clear the stored data after using it
      sessionStorage.removeItem('searchResults');
      sessionStorage.removeItem('searchFilters');
    }
  }, []);

  // Handle URL parameters for location, category filtering, and search
  useEffect(() => {
    const locationParam = searchParams.get('location');
    const searchParam = searchParams.get('search');
    
    // Clear search results if there's no search parameter
    if (!searchParam && searchResults) {
      setSearchResults(null);
    }
    
    if (locationParam) {
      setFilters(prev => ({ ...prev, location: locationParam }));
    } else {
      setFilters(prev => ({ ...prev, location: '' }));
    }
    
    // Don't set propertyType from categoryParam - category (buy/rent/commercial) is different from property.type (Residential/Commercial)
    // propertyType filter is handled separately in the filter logic
    
    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery('');
    }
  }, [searchParams, searchResults]);

  // Use search results if available, otherwise filter properties based on current filters
  const filteredProperties = (searchResults && searchResults.length > 0) ? searchResults : properties.filter(property => {
    // Handle category filtering
    const categoryParam = searchParams.get('type');

    // Buy page shows only buy properties
    if (categoryParam === 'buy' && property.category !== 'buy') return false;

    // Rent page shows only rent properties
    if (categoryParam === 'rent' && property.category !== 'rent') return false;

    // Commercial page shows only commercial properties
    if (categoryParam === 'commercial' && property.category !== 'commercial') return false;
    
    // If no type parameter, show ALL properties (no category filter)
    
    // Additional filters
    if (filters.location && property.location !== filters.location) return false;
    if (filters.propertyType && property.type !== filters.propertyType) return false;
    if (filters.developer && property.developer !== filters.developer) return false;
    
    if (searchQuery && !property.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !property.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });


  const PropertyCard = ({ property }: { property: Property }) => (
    <div className="group cursor-pointer" onClick={() => navigate(`/property/${property.id}`)}>
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img 
          src={property.image} 
          alt={property.name}
          className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = '/homeimage.png';
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        {property.featured && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            Featured
          </div>
        )}
        {property.verified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            RERA
          </div>
        )}
        {property.status && (
          <div className="absolute bottom-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {property.status}
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-1">{property.name}</h3>
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.location}</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-medium">{property.type}</span> • {property.developer}
          </div>
          <div className="text-sm text-gray-600">
            Possession: {property.possession}
          </div>
          {property.category === 'commercial' && property.configurations && (
            <div className="text-sm text-blue-600 font-medium mt-2">
              {property.configurations.length} configurations available
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-semibold text-gray-900">{property.price}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowPopup(true);
            }}
            className="flex items-center text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            <Eye className="h-4 w-4 mr-1" />
            <span>View</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Button - Both Mobile and Desktop */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar - Now Hidden by Default */}
          {showFilters && (
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Static Contact Form */}
                <StaticContactForm />
                

              </div>
            </div>
          )}
          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilters(false)}></div>
              <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                
                  {/* Search */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search Properties</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by name or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                    >
                      <option value="">All Locations</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  {/* Property Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      value={filters.propertyType}
                      onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                    >
                      <option value="">All Types</option>
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Developer */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Developer</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      value={filters.developer}
                      onChange={(e) => setFilters({...filters, developer: e.target.value})}
                    >
                      <option value="">All Developers</option>
                      {developers.map((developer) => (
                        <option key={developer} value={developer}>{developer}</option>
                      ))}
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      value={filters.bedrooms}
                      onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                    >
                      <option value="">Any</option>
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4 BHK</option>
                      <option value="5">5+ BHK</option>
                    </select>
                  </div>

                  <button 
                    onClick={() => setFilters({
                      location: '',
                      priceRange: [0, 10000000],
                      bedrooms: '',
                      propertyType: '',
                      developer: '',
                      amenities: []
                    })}
                    className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors mb-4"
                  >
                    Clear Filters
                  </button>

                  <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Filters</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Properties</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  value={filters.propertyType}
                  onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                >
                  <option value="">All Types</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Developer */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Developer</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  value={filters.developer}
                  onChange={(e) => setFilters({...filters, developer: e.target.value})}
                >
                  <option value="">All Developers</option>
                  {developers.map((developer) => (
                    <option key={developer} value={developer}>{developer}</option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                >
                  <option value="">Any</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK</option>
                </select>
              </div>

              <button 
                onClick={() => setFilters({
                  location: '',
                  priceRange: [0, 10000000],
                  bedrooms: '',
                  propertyType: '',
                  developer: '',
                  amenities: []
                })}
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors mb-4"
              >
                Clear Filters
              </button>

              <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors">
                Apply Filters
              </button>

              {/* Static Contact Form */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <StaticContactForm />
              </div>
              
              {/* Quick Contact */}

            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                {searchResults ? 'Search Results' :
                 searchParams.get('type') === 'commercial' ? 'Commercial Properties' :
                 searchParams.get('type') === 'buy' ? 'Properties for Buy' :
                 searchParams.get('type') === 'rent' ? 'Properties for Rent' :
                 'All Properties'} ({filteredProperties.length})
              </h2>
              {searchParams.get('type') === 'commercial' && (
                <p className="text-gray-600">Premium commercial spaces and office properties</p>
              )}
            </div>

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup Form */}
      <PopupForm 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
        propertyName="Selected Property"
      />
    </div>
  );
};

export default PropertiesPage;