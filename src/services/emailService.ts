/**
 * Email Service
 * Handles form submissions and sends emails to configured recipients
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  location?: string;
  propertyType?: string;
  message: string;
  formType: 'contact' | 'property_inquiry' | 'quick_info';
}

// Email recipients
export const EMAIL_CONFIG = {
  primary: 'ambikamantole@gmail.com',
  secondary: 'mantolev@gmail.com',
  company: 'info@sadguruestate.com'
};

/**
 * Send email via Formspree (free service, no backend required)
 * Alternative: Use SendGrid, Nodemailer, or your own backend
 */
export const sendEmailViaFormspree = async (data: ContactFormData) => {
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location || 'Not specified',
        propertyType: data.propertyType || 'Not specified',
        message: data.message,
        formType: data.formType,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      return { success: true, message: 'Email sent successfully!' };
    } else {
      return { success: false, message: 'Failed to send email' };
    }
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      message: 'Error sending email. Please try again.',
    };
  }
};

/**
 * Generate email body for manual review
 */
export const generateEmailBody = (data: ContactFormData): string => {
  return `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Location: ${data.location || 'Not specified'}
Property Type: ${data.propertyType || 'Not specified'}
Form Type: ${data.formType}
Date: ${new Date().toLocaleString()}

Message:
${data.message}

---
This email was submitted from Sadguru Estate website
  `;
};

/**
 * Log form submission (for debugging)
 */
export const logFormSubmission = (data: ContactFormData) => {
  console.log('Form Submission Log:', {
    timestamp: new Date().toISOString(),
    ...data,
  });

  // You can also send this to an analytics service
  if (window.gtag) {
    window.gtag('event', 'form_submission', {
      form_type: data.formType,
      location: data.location,
      property_type: data.propertyType,
    });
  }
};

/**
 * Validate form data
 */
export const validateFormData = (
  data: ContactFormData
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!data.email || !data.email.includes('@')) {
    errors.push('Valid email is required');
  }

  if (!data.phone || data.phone.length < 10) {
    errors.push('Valid phone number is required');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
