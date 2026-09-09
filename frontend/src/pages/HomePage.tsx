import HeroSection from '../components/HeroSection';
import TrendingProperties from '../components/TrendingProperties';
import ExploreCities from '../components/ExploreCities';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import PopupForm from '../components/PopupForm';
import { useLeadPopup } from '../hooks/useLeadPopup';
import { useSEO } from '../hooks/useSEO';
import { PAGE_SEO } from '../utils/seoUtils';

const HomePage = () => {
  // SEO Optimization
  useSEO(PAGE_SEO.home);

  const { isOpen: showPopup, close: closePopup } = useLeadPopup();

  return (
    <div>
      <HeroSection />
      <TrendingProperties />
      <ExploreCities />
      <WhyChooseUs />
      <AboutUs />
      <Testimonials />
      <CallToAction />

      <PopupForm isOpen={showPopup} onClose={closePopup} />
    </div>
  );
};

export default HomePage;
