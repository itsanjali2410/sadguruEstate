import { MapPin, Clock, Headphones, Building2, Shield, TrendingUp } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: MapPin,
      title: "Projects Across Navi Mumbai",
      description: "From Kharghar to Panvel, Ulwe to Taloja—we offer homes, plots, and shops in prime, fast-growing locations with excellent connectivity and infrastructure."
    },
    {
      icon: Building2,
      title: "Direct Dealing, No Middlemen",
      description: "Buy directly from the developer with full project details, clear pricing, and zero hidden charges. We ensure complete transparency in every transaction."
    },
    {
      icon: TrendingUp,
      title: "Spaces Built for Future Value",
      description: "Every space is designed with smart layouts, quality materials, and strong long-term growth potential to maximize your investment returns."
    },
    {
      icon: Shield,
      title: "Trusted Delivery",
      description: "On-time possession backed by clear documentation and RERA compliance. We deliver what we promise, when we promise it."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance to address your queries and provide seamless service throughout your property journey."
    },
    {
      icon: Headphones,
      title: "Instant Booking Assistance",
      description: "Quick and hassle-free booking process with dedicated support and transparent communication at every step."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold mb-4 text-gray-900">Why Choose Sadguru Estate</h2>
          {/* <p className="text-xl text-gray-600">We create spaces that match your ambitions—whether you're looking for a dream home or a smart opportunity across Navi Mumbai's fastest-growing locations.</p> */}
        </div>

        {/* Scrollable Features Container */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide pb-4">
            <div className="flex space-x-6 min-w-max px-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 to-white text-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-br from-primary to-primary-dark w-16 h-16 rounded-full flex items-center justify-center mr-6 shadow-lg">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Scroll Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {features.map((_, index) => (
              <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* About Us Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 max-w-4xl mx-auto border border-gray-100 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">About Us</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-primary mb-2">Prime Locations</h4>
                <p className="text-sm text-gray-600">Homes and spaces in well-connected, high-potential areas</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-primary mb-2">Developer Advantage</h4>
                <p className="text-sm text-gray-600">Direct project access—no middlemen, no hidden costs</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-primary mb-2">Quality Assurance</h4>
                <p className="text-sm text-gray-600">Premium finishes and modern amenities in every project</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;