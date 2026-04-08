import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Building2, Users } from "lucide-react";
import { searchProperties, SearchFilters, getLocationSuggestions } from "../utils/searchUtils";
import { properties } from "../data/properties";

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Calculate actual property counts
  const totalProperties = properties.length;
  const buyProperties = properties.filter(p => p.category === 'buy').length;
  const rentProperties = properties.filter(p => p.category === 'rent').length;

  // Featured properties for slider
  const featuredProperties = [
    {
      id: "emperia-icon-1",
      name: "EMPERIA ICON",
      location: "Nerul, Navi Mumbai",
      type: "Premium Office Spaces",
      price: "₹42 Lakhs+",
      possession: "Dec 2026",
      status: "Under Construction",
      image: "/properties/emperia-icon.webp"
    },
    {
      id: "today-global-developers-giravale",
      name: "Today Global Developers",
      location: "Giravale Panvel",
      type: "Luxurious Residences",
      price: "₹41.54 Lakhs+",
      possession: "Dec 2026",
      status: "Under Construction",
      image: "/properties/today-global-developers.webp"
    },
    {
      id: "sai-world-city-nerul-1",
      name: "Sai World City",
      location: "Nerul, Navi Mumbai",
      type: "Residential & Commercial",
      price: "₹2.10 Cr+",
      possession: "Under Construction",
      status: "Under Construction",
      image: "/properties/sai-world-city-nerul.webp"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProperties.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle location suggestions
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const suggestions = getLocationSuggestions(searchQuery, properties);
      setLocationSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setLocationSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    const searchFilters: SearchFilters = {
      searchQuery: searchQuery.trim(),
      selectedLocation: "",
      selectedType: "",
      selectedCategory: "",
      budget: ""
    };

    const searchResults = searchProperties(properties, searchFilters);
    sessionStorage.setItem('searchResults', JSON.stringify(searchResults));
    sessionStorage.setItem('searchFilters', JSON.stringify(searchFilters));
    navigate('/properties');
  };

  return (
    <div className="relative h-[70vh] sm:h-[80vh] lg:h-screen flex items-center justify-center overflow-hidden">

       {/* Full Banner Background Image */}
       <div className="absolute inset-0">
         <img
           src="/properties/emperia-icon.webp"
           alt="EMPERIA ICON - Premium Office Spaces"
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/80"></div>
       </div>

       {/* Main Content Overlay */}
       <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between h-full py-4 sm:py-6 lg:py-16">

         {/* Left Content - Search and Stats */}
         <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left mb-4 sm:mb-6 lg:mb-0 lg:pr-12 w-full lg:w-auto">

           {/* Desktop-only Creative Elements */}
           <div className="hidden lg:block absolute -left-8 top-1/2 transform -translate-y-1/2">
             <div className="flex flex-col space-y-4">
               <div className="w-1 h-16 bg-gradient-to-b from-white/30 to-transparent"></div>
               <div className="w-1 h-12 bg-gradient-to-b from-white/20 to-transparent"></div>
               <div className="w-1 h-8 bg-gradient-to-b from-white/10 to-transparent"></div>
             </div>
           </div>

           {/* Hero Text */}
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2, duration: 0.8 }}
             className="mb-4 sm:mb-6 lg:mb-8"
           >
             <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-medium text-white mb-2 sm:mb-3 lg:mb-4 leading-tight">
               THE ADDRESS OF YOUR HOME.
             </h1>
           </motion.div>

         {/* Clean Search Bar */}
         <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
           className="w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-xl mx-2 sm:mx-4 mb-3 sm:mb-4"
         >
           <form onSubmit={handleSearch} className="relative">
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                 <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
               </div>
               <input
                 type="text"
                 placeholder="Search properties..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onFocus={() => setShowSuggestions(searchQuery.length >= 2)}
                 onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                 className="w-full pl-9 xs:pl-10 sm:pl-12 pr-12 xs:pr-16 sm:pr-20 lg:pr-24 py-2 xs:py-2.5 sm:py-3 lg:py-4 text-xs xs:text-sm sm:text-base border-0 rounded-lg sm:rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800 placeholder-gray-500 bg-white/90 backdrop-blur-sm"
               />
               <div className="absolute inset-y-0 right-0 flex items-center pr-1 sm:pr-2">
                 <button
                   type="submit"
                   className="bg-white text-slate-900 px-1.5 xs:px-2 sm:px-4 lg:px-6 py-1 xs:py-1.5 sm:py-2 rounded-md sm:rounded-full font-medium transition-all duration-300 hover:bg-gray-100 flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm lg:text-base"
                 >
                   <Search className="h-3 w-3 xs:h-3 xs:w-3 sm:h-4 sm:w-4" />
                   <span className="hidden xs:inline sm:inline">Search</span>
                 </button>
               </div>

               {/* Location Suggestions Dropdown */}
               {showSuggestions && locationSuggestions.length > 0 && (
                 <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-60 overflow-y-auto">
                   <div className="p-2">
                     <div className="flex items-center px-3 py-2 text-xs sm:text-sm text-gray-500 border-b border-gray-100">
                       <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                       <span>Popular Locations</span>
                     </div>
                     {locationSuggestions.map((suggestion, index) => (
                       <button
                         key={index}
                         type="button"
                         onClick={() => {
                           setSearchQuery(suggestion);
                           setShowSuggestions(false);
                         }}
                         className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-gray-50 text-gray-800 text-xs sm:text-sm rounded-md transition-colors duration-200 flex items-center space-x-2"
                       >
                         <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600" />
                         <span>{suggestion}</span>
                       </button>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           </form>

           {/* Quick Search Tags */}
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 0.6 }}
             className="mt-2 sm:mt-3 lg:mt-4 flex flex-wrap justify-center gap-1 xs:gap-2 sm:gap-3"
           >
             {["Panvel", "Navi Mumbai", "Ulwe", "Nerul"].map((location, index) => (
               <button
                 key={index}
                 onClick={() => setSearchQuery(location)}
                 className="px-1.5 xs:px-2 sm:px-3 lg:px-4 py-0.5 xs:py-1 sm:py-1.5 lg:py-2 bg-white/10 backdrop-blur-sm text-white text-xs xs:text-xs sm:text-sm rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
               >
                 {location}
               </button>
             ))}
           </motion.div>
         </motion.div>

         {/* Enhanced Stats */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4, duration: 0.8 }}
           className="mt-2 sm:mt-3 lg:mt-6 grid grid-cols-3 gap-1 xs:gap-2 sm:gap-3 lg:gap-8 max-w-xs sm:max-w-sm lg:max-w-none mx-auto lg:mx-0"
         >
           {[
             { number: `${totalProperties}+`, label: "Properties", icon: Building2 },
             { number: `${buyProperties}+`, label: "For Sale", icon: Building2 },
             { number: `${rentProperties}+`, label: "For Rent", icon: Users }
           ].map((stat, index) => (
             <motion.div
               key={index}
               className="text-center lg:text-left group"
               whileHover={{ scale: 1.05 }}
               transition={{ duration: 0.2 }}
             >
               <div className="hidden lg:block text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                 <stat.icon className="h-8 w-8 text-white" />
               </div>
               <div className="text-sm xs:text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold text-white mb-0.5 sm:mb-1 lg:mb-2">
                 {stat.number}
               </div>
               <div className="text-xs xs:text-xs sm:text-sm lg:text-base text-gray-300 lg:text-white/70">
                 {stat.label}
               </div>
               <div className="hidden lg:block w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 mt-1"></div>
             </motion.div>
           ))}
         </motion.div>
       </div>

         {/* Right Content - Property Slider */}
         <div className="flex-1 flex items-center justify-center lg:justify-end mt-4 sm:mt-6 lg:mt-0 w-full lg:w-auto">
           {/* Desktop-only floating elements */}
           <div className="hidden lg:block absolute -right-8 top-1/2 transform -translate-y-1/2">
             <div className="flex flex-col space-y-6">
               <motion.div
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="w-2 h-2 bg-white/40 rounded-full"
               ></motion.div>
               <motion.div
                 animate={{ y: [0, 10, 0] }}
                 transition={{ duration: 2.5, repeat: Infinity }}
                 className="w-1 h-1 bg-white/30 rounded-full"
               ></motion.div>
               <motion.div
                 animate={{ y: [0, -8, 0] }}
                 transition={{ duration: 3.5, repeat: Infinity }}
                 className="w-1.5 h-1.5 bg-white/50 rounded-full"
               ></motion.div>
             </div>
           </div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
             className="w-full max-w-[300px] xs:max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px]"
           >
             {/* Property Slider Container */}
             <div className="relative overflow-hidden rounded-xl lg:rounded-2xl">
               {/* Slider Track */}
               <div
                 className="flex transition-transform duration-500 ease-in-out"
                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}
               >
                 {featuredProperties.map((property, index) => (
                   <div key={property.id} className="w-full flex-shrink-0">
                     <div className="bg-white/15 backdrop-blur-lg rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/30 shadow-xl lg:shadow-2xl hover:shadow-3xl transition-all duration-500 group">

                       <div className="flex justify-between items-start mb-3 sm:mb-4">
                         <div className="text-white/60 text-xs">
                           {index + 1} / {featuredProperties.length}
                         </div>
                         <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
                           Featured
                         </div>
                       </div>

                       <div className="mb-4 sm:mb-5">
                         <h3 className="text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-2 leading-tight">
                           {property.name}
                         </h3>
                         <p className="text-white/90 text-xs sm:text-sm lg:text-base mb-3 sm:mb-4">
                           {property.type} • {property.location}
                         </p>

                         <div className="bg-white/10 rounded-lg p-3 mb-3">
                           <div className="flex items-center justify-between">
                             <span className="text-white/80 text-xs sm:text-sm">Starting Price</span>
                             <span className="text-white font-bold text-lg sm:text-xl lg:text-2xl">{property.price}</span>
                           </div>
                           <div className="flex items-center justify-between mt-1">
                             <span className="text-white/70 text-xs">Possession: {property.possession}</span>
                             <span className="text-green-400 text-xs font-medium">{property.status}</span>
                           </div>
                         </div>
                       </div>

                       <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                         <button
                           onClick={() => navigate(`/property/${property.id}`)}
                           className="bg-gradient-to-r from-white to-gray-100 text-slate-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:from-gray-100 hover:to-white transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg group-hover:scale-105"
                         >
                           <span>View Details</span>
                           <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                           </svg>
                         </button>

                         <button className="bg-white/10 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-xs sm:text-sm hover:bg-white/20 transition-colors duration-300 border border-white/20 flex items-center justify-center space-x-2">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                           </svg>
                           <span>Call Now</span>
                         </button>
                       </div>

                       <div className="mt-3 pt-3 border-t border-white/20">
                         <div className="flex items-center justify-between text-xs text-white/70">
                           <div className="flex items-center space-x-1">
                             <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                             </svg>
                             <span>RERA Verified</span>
                           </div>
                           <div className="flex items-center space-x-1">
                             <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                             </svg>
                             <span>Secure</span>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>

               {/* Slider Indicators */}
               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                 {featuredProperties.map((_, index) => (
                   <button
                     key={index}
                     onClick={() => setCurrentSlide(index)}
                     className={`w-2 h-2 rounded-full transition-all duration-300 ${
                       index === currentSlide
                         ? 'bg-white scale-125'
                         : 'bg-white/40 hover:bg-white/60'
                     }`}
                   />
                 ))}
               </div>

               {/* Navigation Arrows */}
               <button
                 onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredProperties.length) % featuredProperties.length)}
                 className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                 </svg>
               </button>

               <button
                 onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredProperties.length)}
                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
               </button>
             </div>
           </motion.div>
         </div>
       </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-2 sm:bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 border border-white/50 rounded-full flex items-center justify-center text-white/70 text-xs sm:text-sm lg:text-lg"
        >
          ↓
        </motion.div>
      </motion.div>
    </div>
  );
}
