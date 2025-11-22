import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { properties } from '../data/properties';
import CircularGallery from './CircularGallery';

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

  // Convert cities data to CircularGallery format
  const galleryItems = cities.map(city => ({
    image: city.image,
    text: city.name
  }));

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-2 sm:mb-4">Explore Navi Mumbai</h2>
          <p className="text-sm sm:text-base lg:text-xl text-gray-300 px-4">Discover premium properties across Navi Mumbai's fastest-growing locations</p>
        </div>

        {/* Circular Gallery - Desktop Only */}
        <div className="hidden lg:block" style={{ height: '500px', position: 'relative' }}>
          <CircularGallery 
            items={galleryItems}
            bend={2.5} 
            textColor="#ffffff" 
            borderRadius={0.05} 
            scrollEase={0.02}
            font="bold 20px sans-serif"
          />
        </div>

        {/* Mobile/Tablet Grid View */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {cities.map((city, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <Link 
                  to={`/properties?location=${city.name}`}
                  className="relative h-48 sm:h-56 rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 block"
                >
                  <motion.img 
                    src={city.image} 
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + 0.3,
                      ease: "easeOut"
                    }}
                  >
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{city.name}</h3>
                    <p className="text-white/90 text-xs sm:text-sm font-medium mb-1">{city.properties}</p>
                    <p className="text-white/70 text-xs sm:text-sm">{city.description}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Properties Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Link 
            to="/properties"
            className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-slate-900 font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreCities;