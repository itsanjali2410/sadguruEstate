import { useState } from 'react';
import { Search, Filter, Grid, List, MapPin, Eye, Heart, Share2, Building2, Calendar } from 'lucide-react';
import PopupForm from '../components/PopupForm';
import { properties, locations, propertyTypes, developers, Property } from '../data/properties';

const PropertiesPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: '',
    priceRange: [0, 10000000],
    bedrooms: '',
    propertyType: '',
    developer: '',
    amenities: [] as string[]
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Filter properties based on current filters
  const filteredProperties = properties.filter(property => {
    if (filters.location && property.location !== filters.location) return false;
    if (filters.propertyType && property.type !== filters.propertyType) return false;
    if (filters.developer && property.developer !== filters.developer) return false;
    if (searchQuery && !property.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !property.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const PropertyCard = ({ property, isListView = false }: { property: Property, isListView?: boolean }) => (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${isListView ? 'flex' : ''}`}>
      <div className={`relative ${isListView ? 'w-80 flex-shrink-0' : ''}`}>
        <img 
          src={property.image} 
          alt={property.name}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${isListView ? 'h-48' : 'h-64'}`}
        />
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {property.featured && (
            <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </span>
          )}
          {property.verified && (
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Verified
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
          <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all">
            <Share2 className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
          {property.status}
        </div>
      </div>
      
      <div className={`p-6 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
            {property.name}
          </h3>
          <span className="text-sm text-gray-500">{property.type}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <Building2 className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.developer}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="text-sm">Possession: {property.possession}</span>
        </div>

        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <span>{property.size}</span>
          {property.carpetArea && (
            <span>CA: {property.carpetArea}</span>
          )}
          {property.superArea && (
            <span>SA: {property.superArea}</span>
          )}
        </div>

        {/* Configurations */}
        {property.configurations && property.configurations.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Configurations:</h4>
            <div className="space-y-1">
              {property.configurations.slice(0, 3).map((config, index) => (
                <div key={index} className="text-xs text-gray-600">
                  <span className="font-medium">{config.type}:</span> {config.size} - {config.price}
                </div>
              ))}
              {property.configurations.length > 3 && (
                <div className="text-xs text-amber-600 font-medium">
                  +{property.configurations.length - 3} more configurations
                </div>
              )}
            </div>
          </div>
        )}

        {/* Amenities Preview */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Amenities:</h4>
            <div className="flex flex-wrap gap-1">
              {property.amenities.slice(0, 4).map((amenity, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 4 && (
                <span className="text-xs text-amber-600 font-medium">
                  +{property.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-amber-600">{property.price}</span>
            </div>
          </div>
          <button 
            onClick={() => setShowPopup(true)}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Properties in Navi Mumbai</h1>
              <span className="text-gray-500">({filteredProperties.length} results)</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-amber-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-amber-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-32">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Filters</h3>
                
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
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white text-gray-900"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white text-gray-900"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white text-gray-900"
                    value={filters.developer}
                    onChange={(e) => setFilters({...filters, developer: e.target.value})}
                  >
                    <option value="">All Developers</option>
                    {developers.map((developer) => (
                      <option key={developer} value={developer}>{developer}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="space-y-2">
                    <input type="range" min="0" max="10000000" className="w-full" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹0</span>
                      <span>₹1 Cr+</span>
                    </div>
                  </div>
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

                <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white text-gray-900">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Area: Low to High</option>
                </select>
              </div>
            </div>

            {/* Properties Grid/List */}
            {filteredProperties.length > 0 ? (
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-6'}`}>
                {filteredProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    isListView={viewMode === 'list'} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}

            {/* Pagination */}
            {filteredProperties.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Previous
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-amber-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Inquiry Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="fixed bottom-6 right-6 bg-amber-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-amber-700 transition-colors z-50"
      >
        Quick Inquiry
      </button>

      <PopupForm 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
      />
    </div>
  );
};

export default PropertiesPage;