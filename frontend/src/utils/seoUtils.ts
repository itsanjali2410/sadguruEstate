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
    url: `https://sadguruestate.com/property/${property.id}`,
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
      url: 'https://sadguruestate.com/'
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
    title: 'Sadguru Estate - Best Property Dealer in Navi Mumbai | Flats, Shops, Offices',
    description: 'Sadguru Estate - RERA registered real estate consultant in Ulwe. Buy/Rent 1BHK, 2BHK, 3BHK flats in Panvel, Nerul, Kharghar, Ulwe, Dronagiri. Commercial shops & offices. 30+ verified projects. Call +91 77159 52067.',
    keywords: 'property in navi mumbai, flat in panvel, 2bhk in ulwe, flat in kharghar, property dealer navi mumbai, buy flat nerul, sadguru estate, new projects navi mumbai 2025'
  },
  properties: {
    title: 'All Properties for Sale & Rent in Navi Mumbai | Sadguru Estate',
    description: 'Browse 30+ RERA verified flats, shops & offices in Panvel, Nerul, Kharghar, Ulwe, Dronagiri, Taloja. 1BHK from ₹41 Lakhs. Expert guidance & site visits.',
    keywords: 'properties in navi mumbai, flats for sale panvel, apartments nerul, property listing ulwe, real estate kharghar, new launch navi mumbai'
  },
  buy: {
    title: 'Buy Flats & Apartments in Navi Mumbai | ₹41 Lakhs Onwards | Sadguru Estate',
    description: 'Buy 1BHK, 2BHK, 3BHK flats in Panvel, Nerul, Kharghar, Ulwe from ₹41 Lakhs. RERA verified new & ready possession projects. Free site visits. Call +91 77159 52067.',
    keywords: 'buy flat panvel, 1bhk panvel price, 2bhk kharghar, buy property ulwe, new flats nerul, under construction flats navi mumbai, ready possession flat, affordable flat navi mumbai'
  },
  rent: {
    title: 'Rent Flats & Apartments in Navi Mumbai | Sadguru Estate',
    description: 'Rent furnished & semi-furnished 1BHK, 2BHK, 3BHK apartments in Navi Mumbai. Properties near railway stations in Panvel, Nerul, Kharghar, Ulwe. Immediate move-in.',
    keywords: 'rent flat navi mumbai, rental apartment panvel, 2bhk for rent kharghar, furnished flat nerul rent, pg in ulwe, flat on rent near railway station navi mumbai'
  },
  commercial: {
    title: 'Commercial Shops & Office Spaces in Navi Mumbai | Sadguru Estate',
    description: 'Invest in RERA verified commercial shops, office spaces & retail properties in Belapur, Nerul, Panvel. Premium locations with high rental returns. Starting ₹42 Lakhs.',
    keywords: 'commercial property navi mumbai, office space belapur, shop for sale panvel, retail space nerul, commercial investment navi mumbai, office on rent navi mumbai'
  },
  contact: {
    title: 'Contact Sadguru Estate | Property Dealer Ulwe Navi Mumbai | +91 77159 52067',
    description: 'Contact Sadguru Estate at Shop No 03, Reddy\'s Crown, Sector 24, Ulwe 410206. Call +91 77159 52067 or +91 84529 66053. Mon-Sat 9AM-7PM, Sun 10AM-5PM. Free property consultation.',
    keywords: 'sadguru estate contact, property dealer ulwe, real estate consultant navi mumbai, property inquiry navi mumbai'
  },
  about: {
    title: 'About Sadguru Estate | Trusted Real Estate Consultant Since Day 1 | Navi Mumbai',
    description: 'Sadguru Estate is a RERA registered (Maha RERA A51700002627) real estate consultancy in Ulwe, Navi Mumbai. 30+ verified projects, 500+ happy families, expert property guidance across Panvel, Nerul, Kharghar.',
    keywords: 'about sadguru estate, RERA registered agent navi mumbai, trusted property dealer ulwe, real estate company navi mumbai'
  }
};
