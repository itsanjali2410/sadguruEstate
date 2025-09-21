import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Phone, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
  <div className="flex-shrink-0">
    <img 
      src="/Sadguru_Estate_logo.jpg" 
      alt="Sadguru Estate" 
      className="h-12 w-auto"
    />
  </div>
  <span className="text-xl font-semibold text-blue-800">Sadguru Estate</span>
</div>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/properties?type=buy" 
              className={`font-medium transition-colors ${
                isActive('/properties') && new URLSearchParams(location.search).get('type') === 'buy' 
                  ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'
              }`}
            >
              Buy
            </Link>
            <Link 
              to="/properties?type=rent" 
              className={`font-medium transition-colors ${
                isActive('/properties') && new URLSearchParams(location.search).get('type') === 'rent' 
                  ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'
              }`}
            >
              Rent
            </Link>
            <Link 
              to="/properties?type=commercial" 
              className={`font-medium transition-colors ${
                isActive('/properties') && new URLSearchParams(location.search).get('type') === 'commercial' 
                  ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'
              }`}
            >
              Commercial
            </Link>
            <Link 
              to="/properties" 
              className={`font-medium transition-colors ${
                isActive('/properties') ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'
              }`}
            >
              Properties
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${
                isActive('/contact') ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-amber-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-amber-600">Home</Link>
              <Link to="/properties?type=buy" className="block px-3 py-2 text-gray-700 hover:text-amber-600">Buy</Link>
              <Link to="/properties?type=rent" className="block px-3 py-2 text-gray-700 hover:text-amber-600">Rent</Link>
              <Link to="/properties?type=commercial" className="block px-3 py-2 text-gray-700 hover:text-amber-600">Commercial</Link>
              <Link to="/properties" className="block px-3 py-2 text-gray-700 hover:text-amber-600">Properties</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-amber-600">Contact</Link>
              <div className="flex items-center space-x-2 px-3 py-2">
                <button className="p-2 text-gray-700 hover:text-amber-600">
                  <Search className="h-5 w-5" />
                </button>
                <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;