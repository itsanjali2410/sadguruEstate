import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import TrendingProperties from '../components/TrendingProperties';
import ExploreCities from '../components/ExploreCities';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import PopupForm from '../components/PopupForm';

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Show popup on exit intent (when mouse leaves the viewport)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return (
    <div>
      <HeroSection />
      <TrendingProperties />
      <ExploreCities />
      <WhyChooseUs />
      <AboutUs />
      <Testimonials />
      <CallToAction />
      
      <PopupForm 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
      />
    </div>
  );
};

export default HomePage;