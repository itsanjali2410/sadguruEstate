import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Building2, Calendar, Star, Phone, Mail, Share2, Heart, ArrowLeft } from 'lucide-react';
import { properties } from '../data/properties';
import PopupForm from '../components/PopupForm';

const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [showPopup, setShowPopup] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Find the property by ID
  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <Link 
            to="/properties" 
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  // Mock images for the property (in real app, these would come from the property data)
  const propertyImages = [
    property.image,
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white shadow-sm border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/properties"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Images */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <img 
                  src={propertyImages[activeImage]} 
                  alt={property.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
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
              </div>
              
              {/* Thumbnail Images */}
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {propertyImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      activeImage === index ? 'border-amber-600' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${property.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Building2 className="h-5 w-5 mr-2" />
                    <span>{property.developer}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Possession: {property.possession}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-amber-600 mb-2">{property.price}</div>
                  <div className="text-sm text-gray-500">{property.status}</div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Property Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{property.size}</div>
                    <div className="text-sm text-gray-600">Total Area</div>
                  </div>
                  {property.carpetArea && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{property.carpetArea}</div>
                      <div className="text-sm text-gray-600">Carpet Area</div>
                    </div>
                  )}
                  {property.superArea && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{property.superArea}</div>
                      <div className="text-sm text-gray-600">Super Area</div>
                    </div>
                  )}
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{property.type}</div>
                    <div className="text-sm text-gray-600">Property Type</div>
                  </div>
                </div>
              </div>

              {/* Configurations */}
              {property.configurations && property.configurations.length > 0 && (
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Available Configurations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.configurations.map((config, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-semibold text-gray-900 mb-2">{config.type}</div>
                        <div className="text-sm text-gray-600 mb-2">Size: {config.size}</div>
                        <div className="text-lg font-bold text-amber-600">{config.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-amber-600" />
                        <span className="text-gray-600">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sticky top-32">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Interested in this property?</h3>
              <p className="text-gray-600 mb-6">Get in touch with us for more details and pricing information.</p>
              
              <button
                onClick={() => setShowPopup(true)}
                className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors mb-4"
              >
                Get Quote
              </button>
              
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors mb-4">
                Schedule Site Visit
              </button>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Phone className="h-5 w-5 text-amber-600" />
                  <span className="text-gray-600">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-amber-600" />
                  <span className="text-gray-600">info@sadguruestate.com</span>
                </div>
              </div>
            </div>

            {/* Similar Properties */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Similar Properties</h3>
              <div className="space-y-4">
                {properties
                  .filter(p => p.location === property.location && p.id !== property.id)
                  .slice(0, 3)
                  .map((similarProperty) => (
                    <Link 
                      key={similarProperty.id}
                      to={`/property/${similarProperty.id}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <img 
                          src={similarProperty.image} 
                          alt={similarProperty.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                            {similarProperty.name}
                          </h4>
                          <p className="text-sm text-gray-600">{similarProperty.location}</p>
                          <p className="text-sm font-semibold text-amber-600">{similarProperty.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <PopupForm 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
      />
    </div>
  );
};

export default PropertyDetailsPage;