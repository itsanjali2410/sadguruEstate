/**
 * Lead submission service.
 * Form submissions are stored in MongoDB via the backend (POST /api/leads),
 * which also emails the configured recipients via SMTP.
 */
import { submitLead } from './api';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  location?: string;
  propertyType?: string;
  message: string;
  formType: 'contact' | 'property_inquiry' | 'quick_info';
  propertyName?: string;
  propertySlug?: string;
}

/**
 * Send a form submission to the backend leads API.
 */
export const sendLead = async (data: ContactFormData) => {
  try {
    const meta: Record<string, string> = {};
    if (data.location) meta.location = data.location;
    if (data.propertyType) meta.propertyType = data.propertyType;

    await submitLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      formType: data.formType,
      propertyName: data.propertyName,
      propertySlug: data.propertySlug,
      meta,
    });
    return { success: true, message: 'Submitted successfully!' };
  } catch (error) {
    console.error('Lead submission error:', error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Error submitting form. Please try again.',
    };
  }
};

/**
 * Log form submission (for analytics)
 */
export const logFormSubmission = (data: ContactFormData) => {
  console.log('Form Submission Log:', {
    timestamp: new Date().toISOString(),
    ...data,
  });

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

  if (data.email && !data.email.includes('@')) {
    errors.push('Valid email is required');
  }

  if (!data.phone || data.phone.replace(/\D/g, '').length < 10) {
    errors.push('Valid phone number is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
