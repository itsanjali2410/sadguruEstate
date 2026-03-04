import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { PAGE_SEO } from '../utils/seoUtils';

const AboutPage = () => {
  useSEO(PAGE_SEO.about);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-8">About Sadguru Estate</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Sadguru Estate, we are committed to delivering premium residential, commercial, and plot projects across Navi Mumbai. With a focus on quality, transparency, and timely delivery, we help you find the perfect space to live or invest.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              To provide exceptional real estate solutions that exceed expectations, creating value for our clients through innovative design, superior quality, and unmatched service excellence.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Vision</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              To be the most trusted and preferred real estate partner in Navi Mumbai, known for our integrity, quality, and customer-centric approach.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why Choose Us</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Premium quality construction with modern amenities</li>
              <li>Transparent pricing and documentation</li>
              <li>Timely project delivery</li>
              <li>Expert team with years of experience</li>
              <li>Prime locations across Navi Mumbai</li>
              <li>Excellent customer support</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Team</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our experienced team of real estate professionals is dedicated to helping you find the perfect property. From initial consultation to final handover, we ensure a smooth and hassle-free experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
