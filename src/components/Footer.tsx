import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/Sadguru_Estate_logo.jpg" 
              alt="Sadguru Estate" 
              className="h-12 w-auto mb-4 bg-white p-2 rounded"
            />
            <p className="text-gray-300 mb-6 leading-relaxed">
              We are committed to delivering premium residential, commercial, and plot projects across Navi Mumbai. With a focus on quality, transparency, and timely delivery, we help you find the perfect space to live or invest.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-400" />
                <span>info@sadguruestate.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-amber-400" />
                <span>Navi Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Properties</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Developers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Location Pages */}
          <div>
            <h3 className="text-xl font-bold mb-6">Popular Locations</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Nerul</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Panvel</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Kharghar</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Ulwe</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Taloja</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
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