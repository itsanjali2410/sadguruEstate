import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/sadguru_logo.png" 
              alt="Sadguru Estate" 
              className="h-12 w-auto mb-4 bg-white p-2 rounded"
            />
            <p className="text-gray-300 mb-6 leading-relaxed">
              We are committed to delivering premium residential, commercial, and plot projects across Navi Mumbai. With a focus on quality, transparency, and timely delivery, we help you find the perfect space to live or invest.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-light" />
                <span>info@sadguruestate.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary-light mt-1" />
                <div>
                  <div> +91 77159 52067</div>
                  <div> +91 84529 66053</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-light mt-1" />
                <div>
                  <div>Shop No - 03, Reddy's Crown</div>
                  <div>Plot No-358, Sector - 24</div>
                  <div>Ulwe - 410206, Maharashtra</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-primary-light transition-colors">About Us</Link></li>
              <li><Link to="/properties" className="text-gray-300 hover:text-primary-light transition-colors">Properties</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-primary-light transition-colors">Contact</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-primary-light transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="text-gray-300 hover:text-primary-light transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Location Pages */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Popular Locations</h3>
            <ul className="space-y-3">
              <li><Link to="/properties?location=Nerul" className="text-gray-300 hover:text-primary-light transition-colors">Nerul</Link></li>
              <li><Link to="/properties?location=Panvel" className="text-gray-300 hover:text-primary-light transition-colors">Panvel</Link></li>
              <li><Link to="/properties?location=Kharghar" className="text-gray-300 hover:text-primary-light transition-colors">Kharghar</Link></li>
              <li><Link to="/properties?location=Ulwe" className="text-gray-300 hover:text-primary-light transition-colors">Ulwe</Link></li>
              <li><Link to="/properties?location=Taloja" className="text-gray-300 hover:text-primary-light transition-colors">Taloja</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-primary-light transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-light transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/shree_sadguru_realestate/?igsh=MW1jb3VkOGV3Mmhkbg%3D%3D" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-light transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-light transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          <p className="text-gray-400 text-center md:text-right">
            © 2024 Sadguru Estate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;