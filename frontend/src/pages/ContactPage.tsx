import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, User, Home, Instagram, Facebook, Twitter, Linkedin, AlertCircle, Loader } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { PAGE_SEO } from '../utils/seoUtils';
import { sendLead, logFormSubmission } from '../services/emailService';
import HoneypotField from '../components/HoneypotField';

const ContactPage = () => {
  useSEO(PAGE_SEO.contact);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    propertyType: '',
    message: '',
    website: '' // honeypot — stays empty for real users
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Log submission for analytics
      logFormSubmission({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        propertyType: formData.propertyType,
        message: formData.message,
        formType: 'contact'
      });

      // Save lead via backend API (also emails the team)
      const result = await sendLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        propertyType: formData.propertyType,
        message: formData.message,
        formType: 'contact',
        website: formData.website
      });

      if (!result.success) {
        setError(result.message || 'Failed to send message. Please try again.');
        setIsLoading(false);
        return;
      }

      // Reset form and navigate to thank you page
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        propertyType: '',
        message: '',
        website: ''
      });

      navigate('/thank-you');
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to send message. Please try again.');
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold mb-2 sm:mb-4">Get in Touch</h1>
          <p className="text-sm sm:text-base lg:text-xl text-white-light max-w-2xl mx-auto">
            Ready to find your dream property? Our experts are here to help you every step of the way.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6">Send us a Message</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <HoneypotField value={formData.website} onChange={handleChange} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select Location</option>
                      <option value="navi-mumbai">Navi Mumbai</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="pune">Pune</option>
                      <option value="bangalore">Bangalore</option>
                      <option value="delhi">Delhi</option>
                      <option value="hyderabad">Hyderabad</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Interest
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Buy or Rent?</option>
                      <option value="buy">Buy</option>
                      <option value="rent">Rent</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Tell us about your requirements, budget, preferred areas, etc."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-4 px-6 rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white-light p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Office Address</h4>
                    <p className="text-gray-600">
                      Shop No - 03, Reddy's Crown<br />
                      Plot No-358, Sector - 24<br />
                      Ulwe - 410206<br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white-light p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Contact Numbers</h4>
                    <p className="text-gray-600">
                      <div className="mb-2">
                        <a href="tel:+917715952067" className="hover:text-primary">+91 77159 52067</a>
                      </div>
                      <div>
                        <a href="tel:+918452966053" className="hover:text-primary">+91 84529 66053</a>
                      </div>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white-light p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Addresses</h4>
                    <p className="text-gray-600">
                      <a href="mailto:info@sadguruestate.com" className="hover:text-primary">info@sadguruestate.com</a><br />
                      <a href="mailto:sales@sadguruestate.com" className="hover:text-primary">sales@sadguruestate.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white-light p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Working Hours</h4>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: 10:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white-light p-3 rounded-lg">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">RERA Registration</h4>
                    <p className="text-gray-600">
                      Maha RERA Regd No. A51700002627
                    </p>
                  </div>
                </div>
              </div>
            </div>



            {/* Map */}
            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Find Us</h3>
              <div className="bg-gray-200 h-48 sm:h-56 md:h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive Google Map</p>
                  <p className="text-sm text-gray-400">Embedded map will show here</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;