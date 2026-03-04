/**
 * SEO Utilities - Helper functions for SEO optimization
 */

export interface SEOMetaTags {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

/**
 * Update page meta tags dynamically
 * This helps with SEO for SPA (Single Page Application)
 */
export const updateMetaTags = (seo: SEOMetaTags) => {
  // Update title
  document.title = seo.title;

  // Update or create meta description
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (!descriptionMeta) {
    descriptionMeta = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    document.head.appendChild(descriptionMeta);
  }
  descriptionMeta.setAttribute('content', seo.description);

  // Update keywords if provided
  if (seo.keywords) {
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', seo.keywords);
  }

  // Update OG tags for social sharing
  if (seo.ogTitle) {
    updateOrCreateOGTag('og:title', seo.ogTitle);
  }
  if (seo.ogDescription) {
    updateOrCreateOGTag('og:description', seo.ogDescription);
  }
  if (seo.ogImage) {
    updateOrCreateOGTag('og:image', seo.ogImage);
  }
  if (seo.ogUrl) {
    updateOrCreateOGTag('og:url', seo.ogUrl);
  }
};

/**
 * Helper function to update or create OG meta tags
 */
const updateOrCreateOGTag = (property: string, content: string) => {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};

/**
 * Generate structured data for a property
 */
export const generatePropertyStructuredData = (property: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateProperty',
    name: property.name,
    description: property.description,
    image: property.image,
    url: `https://itsanjali2410.github.io/sadguruEstate/property/${property.id}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
      addressRegion: 'Maharashtra',
      addressCountry: 'IN'
    },
    priceCurrency: 'INR',
    price: property.price,
    propertyType: property.type,
    numberOfRooms: property.size,
    availability: property.status || 'Available',
    realEstateAgent: {
      '@type': 'RealEstateAgent',
      name: 'Sadguru Estate',
      url: 'https://itsanjali2410.github.io/sadguruEstate/'
    }
  };
};

/**
 * Add structured data to page
 */
export const addStructuredData = (data: any) => {
  let script = document.querySelector('script[type="application/ld+json"]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
};

/**
 * SEO metadata for different pages
 */
export const PAGE_SEO = {
  home: {
    title: 'Sadguru Estate - Premium Properties in Navi Mumbai | Buy, Rent, Commercial',
    description: 'Find your dream property with Sadguru Estate. Premium residential, commercial, and rental properties in Navi Mumbai, Panvel, Nerul, Kharghar & more. RERA verified, 24/7 support.',
    keywords: 'property in navi mumbai, residential properties, commercial spaces, rent apartments, buy property, real estate navi mumbai'
  },
  properties: {
    title: 'Properties for Sale & Rent | Sadguru Estate',
    description: 'Browse premium residential, commercial, and rental properties in Navi Mumbai. Find your dream home with expert guidance and 24/7 support.',
    keywords: 'properties for sale, properties for rent, real estate listings, navi mumbai properties'
  },
  buy: {
    title: 'Properties for Buy | Sadguru Estate',
    description: 'Buy premium residential properties in Navi Mumbai. Explore RERA verified projects with modern amenities. Get expert guidance today.',
    keywords: 'buy property, residential properties, navi mumbai buy, real estate investment'
  },
  rent: {
    title: 'Properties for Rent in Navi Mumbai | Sadguru Estate',
    description: 'Find rental apartments and villas in Navi Mumbai. Fully furnished, modern properties with 24/7 support. Start your home search today.',
    keywords: 'properties for rent, rental apartments, rental villas, navi mumbai rent'
  },
  commercial: {
    title: 'Commercial Properties & Office Spaces | Sadguru Estate',
    description: 'Invest in premium commercial spaces and office properties in Navi Mumbai. High returns, RERA verified projects.',
    keywords: 'commercial properties, office spaces, retail shops, navi mumbai commercial'
  },
  contact: {
    title: 'Contact Sadguru Estate | Real Estate Support',
    description: 'Get in touch with Sadguru Estate. Our expert team is available 24/7 to help you find your perfect property.',
    keywords: 'contact real estate, sadguru estate contact, property inquiry'
  },
  about: {
    title: 'About Sadguru Estate | Premium Real Estate',
    description: 'Learn about Sadguru Estate - your trusted partner for premium residential and commercial properties in Navi Mumbai.',
    keywords: 'about sadguru estate, real estate company, property developer'
  }
};
