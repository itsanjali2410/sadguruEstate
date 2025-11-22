import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Eye, Share2, Heart, Train, Map, Shield, Home } from 'lucide-react';
import { properties, type Property } from '../data/properties';
import StaticContactForm from '../components/StaticContactForm';

const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundProperty = properties.find(p => p.id === id);
    setProperty(foundProperty ?? null);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Property Not Found</h1>
          <Link to="/properties" className="text-slate-600 hover:text-slate-800">
            ← Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/properties" 
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Back to Properties</span>
            </Link>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Image/Video/Gallery */}
            <div className="relative overflow-hidden rounded-2xl">
              {property.id === 'today-global-developers-giravale' ? (
                <video 
                  className="w-full h-96 sm:h-[500px] object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  poster={property.image}
                >
                  <source src="/today_global_developers.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : property.id === 'emperia-icon-1' ? (
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src={property.image} 
                      alt={property.name}
                      className="w-full h-96 sm:h-[500px] object-cover"
                    />
                  </div>
                  
                  {/* Office Spaces Gallery */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/office1.jpg" 
                        alt="Office Space 1"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/office2.jpg" 
                        alt="Office Space 2"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/office3.jpg" 
                        alt="Office Space 3"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/office4.jpg" 
                        alt="Office Space 4"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/office5.jpg" 
                        alt="Office Space 5"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/office6.jpg" 
                        alt="Office Space 6"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              ) : property.id === 'sea-queen-park-1' ? (
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src={property.image} 
                      alt={property.name}
                      className="w-full h-96 sm:h-[500px] object-cover"
                    />
                  </div>
                  
                  {/* Image Gallery */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/IMG-20251015-WA0021.jpg" 
                        alt="Sea Queen Park 1"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/IMG-20251015-WA0022.jpg" 
                        alt="Sea Queen Park 2"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/IMG-20251015-WA0023.jpg" 
                        alt="Sea Queen Park 3"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/IMG-20251015-WA0024.jpg" 
                        alt="Sea Queen Park 4"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/IMG-20251015-WA0025.jpg" 
                        alt="Sea Queen Park 5"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/IMG-20251015-WA0026.jpg" 
                        alt="Sea Queen Park 6"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              ) : property.id === 'oasis-paradise-chs-1' ? (
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src={property.image} 
                      alt={property.name}
                      className="w-full h-96 sm:h-[500px] object-cover"
                    />
                  </div>
                  
                  {/* Image Gallery */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/WhatsApp Image 2025-11-22 at 13.36.24.jpeg" 
                        alt="The Oasis 1"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/WhatsApp Image 2025-11-22 at 13.36.24 (1).jpeg" 
                        alt="The Oasis 2"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/WhatsApp Image 2025-11-22 at 13.36.25.jpeg" 
                        alt="The Oasis 3"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src="/office_spaces/WhatsApp Image 2025-11-22 at 13.36.25 (1).jpeg" 
                        alt="The Oasis 4"
                        className="w-full h-32 sm:h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="w-full h-96 sm:h-[500px] object-cover"
                />
              )}
            </div>

            {/* Property Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">{property.name}</h1>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{property.location}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-semibold text-gray-900">{property.price}</div>
              </div>

              {/* Basic Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-b border-gray-100">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Type</div>
                  <div className="font-medium text-gray-900">{property.type}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Size</div>
                  <div className="font-medium text-gray-900">{property.size}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Developer</div>
                  <div className="font-medium text-gray-900">{property.developer}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Possession</div>
                  <div className="font-medium text-gray-900">{property.possession}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Property</h2>
                <p className="text-gray-600 leading-relaxed">
                  {property.description || "This premium property offers modern living in one of Navi Mumbai's most sought-after locations. Featuring contemporary design and world-class amenities, it provides the perfect blend of comfort and luxury."}
                </p>
              </div>

              {/* Investment Benefits - Special for EMPERIA ICON */}
              {property.id === 'emperia-icon-1' && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">1 Investment, 5 Mega Benefits</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Safe Investment</h3>
                        <p className="text-sm text-gray-600">Full CC received</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">3X Rental Yields</h3>
                        <p className="text-sm text-gray-600">Over residential real estate</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Higher Returns</h3>
                        <p className="text-sm text-gray-600">Mixed-used development advantage</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Navi Mumbai Impact</h3>
                        <p className="text-sm text-gray-600">Great infrastructure development</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 sm:col-span-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Steady Cash Flow</h3>
                        <p className="text-sm text-gray-600">Commercial real estate investment ensures steady cash flow due to longer-term leases</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* External Links */}
              {property.links && property.links.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
                  <div className="flex flex-wrap gap-3">
                    {property.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-slate-700 hover:bg-gray-50 transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Ratings Section */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mr-2">Ratings based on features</h2>
                  <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs text-gray-600 font-medium">i</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Connectivity */}
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-gray-200"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-emerald-400"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="90, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Train className="w-6 h-6 text-gray-600" />
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">4.5/5</div>
                    <div className="text-sm text-gray-500">Connectivity</div>
                  </div>

                  {/* Neighbourhood */}
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-gray-200"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-emerald-400"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="88, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Map className="w-6 h-6 text-gray-600" />
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">4.4/5</div>
                    <div className="text-sm text-gray-500">Neighbourhood</div>
                  </div>

                  {/* Safety */}
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-gray-200"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-emerald-400"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="88, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-gray-600" />
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">4.4/5</div>
                    <div className="text-sm text-gray-500">Safety</div>
                  </div>

                  {/* Livability */}
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-gray-200"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-emerald-400"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="88, 100"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Home className="w-6 h-6 text-gray-600" />
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">4.4/5</div>
                    <div className="text-sm text-gray-500">Livability</div>
                  </div>
                </div>
              </div>

              {/* Property Configurations - Show for Commercial Properties */}
              {property.category === 'commercial' && property.configurations && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Available Configurations</h3>
                  <div className="space-y-4">
                    {property.configurations.map((config, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{config.type}</div>
                          <div className="text-sm text-gray-600">{config.size}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{config.price}</div>
                          <div className="text-sm text-gray-600">Possession: {property.possession}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Property Configurations - Show for Residential Properties */}
              {property.category !== 'commercial' && property.configurations && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Available Units</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.configurations.map((config, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900 mb-2">{config.type}</div>
                        <div className="text-sm text-gray-600 mb-2">{config.size}</div>
                        <div className="font-semibold text-gray-900">{config.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {property.amenities && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {property.category === 'commercial' ? 'Facilities' : 'Amenities'}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {property.amenities.map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Static Contact Form */}
            <StaticContactForm propertyName={property.name} />

            {/* Quick Actions */}
            <div className="space-y-3">
              <button 
                onClick={() => {
                  const phoneNumber = '8454057780';
                  const message = `Hi! I am interested in scheduling a site visit for ${property.name}. Can you help me?`;
                  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                Schedule Site Visit
              </button>
            </div>

            {/* Property Highlights */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Highlights</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="text-sm font-medium text-green-600">{property.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Verified</span>
                  <span className="text-sm font-medium text-blue-600">✓ RERA Approved</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Developer</span>
                  <span className="text-sm font-medium text-gray-900">{property.developer}</span>
                </div>
              </div>
            </div>

            {/* Direct Contact */}
            {property.contact && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Direct Contact</h3>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-base font-medium text-gray-900">{property.contact.name}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={`tel:${property.contact.phone}`}
                    className="w-full bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors text-center"
                  >
                    Call {property.contact.phone}
                  </a>
                  <a
                    href={`https://wa.me/${property.contact.phone}?text=${encodeURIComponent(`Hi ${property.contact.name}, I am interested in ${property.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border border-slate-900 text-slate-900 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors text-center"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;