import { Building2, MapPin, Shield, Users, Award, Clock } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { icon: Building2, number: "50+", label: "Projects Completed" },
    { icon: MapPin, number: "20+", label: "Cities Covered" },
    { icon: Users, number: "1000+", label: "Happy Customers" },
    { icon: Award, number: "15+", label: "Years Experience" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "We maintain the highest standards of quality in all our projects, ensuring premium finishes and modern amenities."
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "Our commitment to on-time possession is backed by clear documentation and transparent communication."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Complete customer support without the hassle of dealing with agents or middlemen."
    }
  ];

  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">About Sadguru Estate</h2>
          
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-10 sm:mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-primary w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* What Makes Us Different */}
        {/* <div className="mb-16">
          <h3 className="text-3xl font-semibold text-gray-900 text-center mb-12">What Makes Us Different</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Projects Across Navi Mumbai</h4>
              <p className="text-gray-600 leading-relaxed">
                From Kharghar to Panvel, Ulwe to Taloja—we offer homes, plots, and shops in prime, fast-growing locations with excellent connectivity and infrastructure.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Direct Dealing, No Middlemen</h4>
              <p className="text-gray-600 leading-relaxed">
                Buy directly from the developer with full project details, clear pricing, and zero hidden charges. We ensure complete transparency in every transaction.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Spaces Built for Future Value</h4>
              <p className="text-gray-600 leading-relaxed">
                Every space is designed with smart layouts, quality materials, and strong long-term growth potential to maximize your investment returns.
              </p>
            </div>
          </div>
        </div> */}

        {/* Our Commitment */}
        <div className="bg-gray-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6">Our Commitment</h3>
          <p className="text-sm sm:text-base lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We are committed to delivering premium residential, commercial, and plot projects across Navi Mumbai. With a focus on quality, transparency, and timely delivery, we help you find the perfect space to live or invest.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="bg-primary px-4 py-2 rounded-full text-sm font-medium">Quality Assurance</span>
            <span className="bg-primary px-4 py-2 rounded-full text-sm font-medium">Timely Delivery</span>
            <span className="bg-primary px-4 py-2 rounded-full text-sm font-medium">Transparent Pricing</span>
            <span className="bg-primary px-4 py-2 rounded-full text-sm font-medium">Customer Support</span>
            <span className="bg-primary px-4 py-2 rounded-full text-sm font-medium">RERA Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
