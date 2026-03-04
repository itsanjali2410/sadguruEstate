import { Link } from 'react-router-dom';
import { CheckCircle, Home, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const ThankYouPage = () => {
  useSEO({
    title: 'Thank You | Sadguru Estate',
    description: 'Thank you for contacting Sadguru Estate. Our team will get back to you soon.',
    keywords: 'thank you, contact confirmation'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="bg-green-100 rounded-full p-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-xl text-gray-600 mb-2">
          Your inquiry has been received successfully.
        </p>
        <p className="text-gray-500 mb-8">
          Our team will contact you within 24 hours to discuss your property requirements in detail.
        </p>

        {/* Details */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">✓</span>
              <span>Our team will review your request</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">✓</span>
              <span>You'll receive a call or message within 24 hours</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">✓</span>
              <span>We'll help you find the perfect property</span>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
          <Link
            to="/properties"
            className="flex items-center justify-center gap-2 w-full bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Explore Properties
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500">
          <p className="mb-2">Need immediate assistance?</p>
          <a href="tel:+919867984977" className="text-primary hover:underline font-medium">
            Call us: +91 98679 84977
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
