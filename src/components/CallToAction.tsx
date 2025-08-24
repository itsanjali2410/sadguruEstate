import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Looking for your dream home?
        </h2>
        <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
          Let our experts guide you through every step of your property journey. 
          Get personalized assistance and find the perfect property today.
        </p>
        <Link 
          to="/contact"
          className="bg-white text-amber-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-3 shadow-lg hover:shadow-xl"
        >
          <MessageCircle className="h-6 w-6" />
          <span>Talk to an Expert</span>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;