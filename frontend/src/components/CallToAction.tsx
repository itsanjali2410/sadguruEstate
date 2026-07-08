import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail, ArrowRight, CheckCircle, Home } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-white">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-primary/20 text-primary-light rounded-full text-sm font-medium mb-4">
                <Home className="h-4 w-4 mr-2" />
                Ready to Make a Move?
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight mb-4 sm:mb-6">
                Let's Find Your
                <span className="block text-primary-light">Perfect Property</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-xl text-gray-300 leading-relaxed mb-6 sm:mb-8">
                Our expert team is here to guide you through every step of your property journey. 
                From initial consultation to final possession, we ensure a seamless experience.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-primary-light flex-shrink-0" />
                <span className="text-gray-300">Free property consultation</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-primary-light flex-shrink-0" />
                <span className="text-gray-300">Direct developer pricing</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-primary-light flex-shrink-0" />
                <span className="text-gray-300">Legal documentation support</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-primary-light flex-shrink-0" />
                <span className="text-gray-300">Post-purchase assistance</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact"
                className="bg-primary hover:bg-amber-700 text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl group"
              >
                <MessageCircle className="h-6 w-6" />
                <span>Talk to an Expert</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a 
                href="tel:+919876543210"
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center space-x-3 border border-white/20 hover:border-white/40"
              >
                <Phone className="h-6 w-6" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Right Content - Contact Card */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8 relative">
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-7 w-7 sm:h-10 sm:w-10 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Get Expert Advice</h3>
                <p className="text-gray-600">Our property experts are ready to help you find the perfect home</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Call Us</div>
                    <div className="text-gray-600">+91 98765 43210</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email Us</div>
                    <div className="text-gray-600">info@sadguruestate.com</div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm">!</span>
                    </div>
                    <div>
                      <div className="font-semibold text-amber-800 mb-1">Quick Response</div>
                      <div className="text-amber-700 text-sm">We typically respond within 2 hours during business hours</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                Free Consultation
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -z-10 top-4 left-4 w-full h-full bg-primary/20 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;