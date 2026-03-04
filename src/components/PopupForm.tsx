import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle, User, Phone, MessageSquare } from 'lucide-react';
import { sendEmailViaFormspree, logFormSubmission } from '../services/emailService';

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

const PopupForm = ({ isOpen, onClose, propertyName }: PopupFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirements: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Log submission for analytics
    logFormSubmission({
      name: formData.name,
      email: formData.email || 'not-provided@sadguruestate.com',
      phone: formData.phone,
      message: formData.requirements,
      formType: 'property_inquiry'
    });

    // Send email via Formspree
    await sendEmailViaFormspree({
      name: formData.name,
      email: formData.email || 'not-provided@sadguruestate.com',
      phone: formData.phone,
      message: formData.requirements,
      formType: 'property_inquiry'
    });

    setIsSubmitted(true);

    // Navigate to thank you page after 2 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        requirements: ''
      });
      onClose();
      navigate('/thank-you');
    }, 2000);
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <div className="relative w-full max-w-md bg-white rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600">
            We'll contact you within 24 hours with more details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Form Header */}
        <div className="p-6 pb-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Get Information</h2>
            <p className="text-gray-600 text-sm">
              {propertyName ? `Interested in ${propertyName}?` : 'Get detailed information about properties'}
            </p>
            </div>
            
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="Your Name"
                />
              </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="Email Address (Optional)"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="Mobile Number"
              />
            </div>
            
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
                <textarea
                name="requirements"
                value={formData.requirements}
                  onChange={handleInputChange}
                  rows={3}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
                placeholder="Your Requirements"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors text-sm"
            >
              Submit
            </button>
          </form>

          {/* Trust Indicators */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>RERA Verified</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3 text-primary" />
                <span>24/7 Support</span>
              </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default PopupForm;