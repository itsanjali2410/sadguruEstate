import React from 'react';
import { MapPin, Clock, Headphones, Building2, Shield, TrendingUp } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: MapPin,
      title: "Projects Across Navi Mumbai",
      description: "From Kharghar to Panvel, Ulwe to Taloja—we offer homes, plots, and shops in prime, fast-growing locations."
    },
    {
      icon: Building2,
      title: "Direct Dealing, No Middlemen",
      description: "Buy directly from the developer with full project details, clear pricing, and zero hidden charges."
    },
    {
      icon: TrendingUp,
      title: "Spaces Built for Future Value",
      description: "Every space is designed with smart layouts, quality materials, and strong long-term growth potential."
    },
    {
      icon: Shield,
      title: "Trusted Delivery",
      description: "On-time possession backed by clear documentation and RERA compliance."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance to address your queries and provide seamless service throughout your journey."
    },
    {
      icon: Headphones,
      title: "Instant Booking Assistance",
      description: "Quick and hassle-free booking process with dedicated support and transparent communication."
    }
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose Sadguru Estate</h2>
          <p className="text-xl text-gray-300">We create spaces that match your ambitions—whether you're looking for a dream home or a smart opportunity across Navi Mumbai's fastest-growing locations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-500 transition-colors">
                  <IconComponent className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* About Us Section */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">About Us</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              We create high-quality homes, commercial spaces, and plots across Navi Mumbai. Our projects are designed to offer comfort, value, and convenience for people looking to live or invest. We focus on timely delivery, clear communication, and complete customer support—without the hassle of dealing with agents.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-400 mb-2">Prime Locations</h4>
                <p className="text-sm text-gray-300">Homes and spaces in well-connected, high-potential areas</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-400 mb-2">Developer Advantage</h4>
                <p className="text-sm text-gray-300">Direct project access—no middlemen, no hidden costs</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-400 mb-2">Quality Assurance</h4>
                <p className="text-sm text-gray-300">Premium finishes and modern amenities in every project</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;