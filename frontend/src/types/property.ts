export interface Property {
  id: string; // slug from the API — used in /property/:id routes
  _id?: string; // Mongo id — needed for admin edit/delete
  slug?: string;
  name: string;
  developer: string;
  location: string;
  type: string;
  category: 'buy' | 'rent' | 'commercial';
  price: string;
  size: string;
  carpetArea?: string;
  superArea?: string;
  possession: string;
  status: string;
  featured: boolean;
  verified: boolean;
  published?: boolean;
  amenities: string[];
  description: string;
  image: string;
  gallery?: string[];
  video?: string;
  brochureUrl?: string;
  links?: {
    label: string;
    url: string;
  }[];
  contact?: {
    name: string;
    phone: string;
  };
  configurations?: {
    type: string;
    size: string;
    price: string;
  }[];
  details?: Record<string, string>;
}

export interface Revision {
  _id: string;
  propertyId: string;
  slug: string;
  name: string;
  action: 'update' | 'delete';
  createdAt: string;
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  formType: 'contact' | 'property_inquiry' | 'quick_info' | 'brochure_download';
  propertySlug?: string;
  propertyName?: string;
  meta?: Record<string, string>;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}
