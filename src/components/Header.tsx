import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Phone, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted:', searchQuery);
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleCallNow = () => {
    window.open('tel:+919867984977', '_self');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex-shrink-0">
              <img 
                src="/sadguru_logo.png" 
                alt="Sadguru Estate" 
                className="h-10 sm:h-12 md:h-14 w-auto"
              />
            </div>
          </div>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/properties?type=buy" 
              className={`font-medium transition-colors ${
                isActive('/properties') && new URLSearchParams(location.search).get('type') === 'buy' 
                  ? 'text-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Buy
            </Link>
            <Link 
              to="/properties?type=rent" 
              className={`font-medium transition-colors ${
                isActive('/properties') && new URLSearchParams(location.search).get('type') === 'rent' 
                  ? 'text-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Rent
            </Link>
            <Link 
              to="/properties?type=commercial" 
              className={`font-medium transition-colors ${
                isActive('/properties') && new URLSearchParams(location.search).get('type') === 'commercial' 
                  ? 'text-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Commercial
            </Link>
            <Link 
              to="/properties" 
              className={`font-medium transition-colors ${
                isActive('/properties') && !new URLSearchParams(location.search).get('type') 
                  ? 'text-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Properties
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${
                isActive('/contact') ? 'text-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Contact
            </Link>
            
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button */}
            <button 
              onClick={() => {
                console.log('Search button clicked, current state:', isSearchOpen);
                setIsSearchOpen(!isSearchOpen);
              }}
              className="p-2 text-gray-700 hover:text-primary transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Call Now Button */}
            <button 
              onClick={handleCallNow}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <Link 
                to="/" 
                onClick={closeMobileMenu} 
                className={`block px-3 py-2 ${isActive('/') ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'}`}
              >
                Home
              </Link>
              <Link 
                to="/properties?type=buy" 
                onClick={closeMobileMenu} 
                className={`block px-3 py-2 ${isActive('/properties') && new URLSearchParams(location.search).get('type') === 'buy' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'}`}
              >
                Buy
              </Link>
              <Link 
                to="/properties?type=rent" 
                onClick={closeMobileMenu} 
                className={`block px-3 py-2 ${isActive('/properties') && new URLSearchParams(location.search).get('type') === 'rent' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'}`}
              >
                Rent
              </Link>
              <Link 
                to="/properties?type=commercial" 
                onClick={closeMobileMenu} 
                className={`block px-3 py-2 ${isActive('/properties') && new URLSearchParams(location.search).get('type') === 'commercial' ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'}`}
              >
                Commercial
              </Link>
              <Link 
                to="/properties" 
                onClick={closeMobileMenu} 
                className={`block px-3 py-2 ${isActive('/properties') && !new URLSearchParams(location.search).get('type') ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'}`}
              >
                Properties
              </Link>
              <Link 
                to="/contact" 
                onClick={closeMobileMenu} 
                className={`block px-3 py-2 ${isActive('/contact') ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'}`}
              >
                Contact
              </Link>
              <Link to="/dashboard" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-700 hover:text-primary">Dashboard</Link>
              <div className="flex items-center space-x-2 px-3 py-2">
                <button 
                  onClick={() => {
                    console.log('Mobile search button clicked, current state:', isSearchOpen);
                    setIsSearchOpen(!isSearchOpen);
                  }}
                  className="p-2 text-gray-700 hover:text-primary"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleCallNow}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="text-sm text-gray-500 mb-2">Search form is open (debug)</div>
              <form onSubmit={handleSearch} className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search properties by location, type, or name..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;