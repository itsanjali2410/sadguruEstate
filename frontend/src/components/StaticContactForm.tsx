import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, User, MessageSquare, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { validateFormData, logFormSubmission, sendLead } from '../services/emailService';
import HoneypotField from './HoneypotField';

interface StaticContactFormProps {
  propertyName?: string;
  className?: string;
}

const StaticContactForm = ({ propertyName, className = "" }: StaticContactFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirements: '',
    website: '' // honeypot — stays empty for real users
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
    if (errors.length > 0) setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setErrors([]);

    // Validate form data
    const validation = validateFormData({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.requirements,
      formType: 'quick_info'
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      setIsLoading(false);
      return;
    }

    try {
      // Log the submission for analytics
      logFormSubmission({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.requirements,
        formType: 'quick_info'
      });

      // Save lead via backend API (also emails the team)
      const emailResult = await sendLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.requirements,
        formType: 'quick_info',
        propertyName,
        website: formData.website
      });

      if (!emailResult.success) {
        setError(emailResult.message || 'Failed to submit form. Please try again.');
        setIsLoading(false);
        return;
      }

      // Success - show thank you state
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        requirements: ''
      });

      // Navigate to thank you page after 2 seconds
      setTimeout(() => {
        navigate('/thank-you');
      }, 2000);
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to submit form. Please try again.');
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 sm:p-8 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 text-sm">
            We'll contact you within 24 hours with more details about your property interest.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
          {propertyName ? '🏠 Property Inquiry' : '📋 Get Information'}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {propertyName
            ? `Interested in ${propertyName}? Fill out the form below and our experts will help you.`
            : 'Get detailed information about our premium properties. Our team is here to assist you.'}
        </p>
      </div>

      {/* Error Messages */}
      {error && (
        <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {errors.length > 0 && (
        <div className="mb-4 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3 mb-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-yellow-800 text-sm font-medium">Please fix the following errors:</p>
          </div>
          <ul className="space-y-1 ml-8">
            {errors.map((err, idx) => (
              <li key={idx} className="text-yellow-700 text-sm">• {err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <HoneypotField value={formData.website} onChange={handleInputChange} />
        {/* Name Input */}
        <div>
          <div className="relative">
            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
              placeholder="Full Name *"
            />
          </div>
        </div>

        {/* Email Input */}
        <div>
          <div className="relative">
            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
              placeholder="Email Address *"
            />
          </div>
        </div>

        {/* Phone Input */}
        <div>
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
              placeholder="Mobile Number (10 digits) *"
            />
          </div>
        </div>

        {/* Requirements/Message */}
        <div>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              rows={4}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm transition-colors"
              placeholder="Tell us about your requirements or which property interests you most *"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-1">Min. 10 characters</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-3.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Phone className="h-4 w-4" />
              <span>Submit Inquiry</span>
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          We'll respond within 24 hours • Your data is secure with us
        </p>
      </form>

      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-xs text-gray-600 font-medium">RERA Verified</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-blue-500 flex-shrink-0" />
            <span className="text-xs text-gray-600 font-medium">24/7 Support</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-xs text-gray-600 font-medium">Fast Response</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-purple-500 flex-shrink-0" />
            <span className="text-xs text-gray-600 font-medium">Expert Guidance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticContactForm;
