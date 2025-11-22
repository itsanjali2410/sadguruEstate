import { Property } from '../data/properties';

export interface SearchFilters {
  searchQuery: string;
  selectedLocation: string;
  selectedType: string;
  selectedCategory: string;
  budget: string;
}

export const searchProperties = (properties: Property[], filters: SearchFilters): Property[] => {
  return properties.filter(property => {
    // Search query filter (searches in name, location, developer, and description)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchableText = [
        property.name,
        property.location,
        property.developer,
        property.description
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    // Location filter
    if (filters.selectedLocation) {
      if (!property.location.toLowerCase().includes(filters.selectedLocation.toLowerCase())) {
        return false;
      }
    }

    // Property type filter
    if (filters.selectedType) {
      if (!property.type.toLowerCase().includes(filters.selectedType.toLowerCase())) {
        return false;
      }
    }

    // Category filter
    if (filters.selectedCategory) {
      if (property.category !== filters.selectedCategory) {
        return false;
      }
    }

    // Budget filter
    if (filters.budget) {
      const propertyPrice = parsePropertyPrice(property.price);
      const budgetRange = parseBudgetRange(filters.budget);
      
      if (propertyPrice && budgetRange) {
        if (propertyPrice < budgetRange.min || propertyPrice > budgetRange.max) {
          return false;
        }
      }
    }

    return true;
  });
};

// Helper function to parse property price string to number
const parsePropertyPrice = (priceStr: string): number | null => {
  // Remove currency symbols and convert to lowercase
  const cleanPrice = priceStr.replace(/[₹,]/g, '').toLowerCase();
  
  // Extract number and multiplier
  const match = cleanPrice.match(/(\d+(?:\.\d+)?)\s*(lakh|lac|cr|crore|k|thousand)?/);
  
  if (!match) return null;
  
  const number = parseFloat(match[1]);
  const unit = match[2] || '';
  
  // Convert to lakhs for consistent comparison
  switch (unit) {
    case 'k':
    case 'thousand':
      return number / 100; // Convert thousands to lakhs
    case 'lakh':
    case 'lac':
      return number;
    case 'cr':
    case 'crore':
      return number * 100; // Convert crores to lakhs
    default:
      // Assume lakhs if no unit specified
      return number;
  }
};

// Helper function to parse budget range string
const parseBudgetRange = (budgetStr: string): { min: number; max: number } | null => {
  const cleanBudget = budgetStr.toLowerCase();
  
  if (cleanBudget.includes('under') && cleanBudget.includes('50l')) {
    return { min: 0, max: 50 };
  } else if (cleanBudget.includes('50l') && cleanBudget.includes('1cr')) {
    return { min: 50, max: 100 };
  } else if (cleanBudget.includes('1cr') && cleanBudget.includes('2cr')) {
    return { min: 100, max: 200 };
  } else if (cleanBudget.includes('2cr') && cleanBudget.includes('5cr')) {
    return { min: 200, max: 500 };
  } else if (cleanBudget.includes('above') && cleanBudget.includes('5cr')) {
    return { min: 500, max: Infinity };
  }
  
  return null;
};

// Get search suggestions for autocomplete
export const getLocationSuggestions = (query: string, properties: Property[]): string[] => {
  if (!query || query.length < 2) return [];
  
  const locations = new Set<string>();
  const queryLower = query.toLowerCase();
  
  properties.forEach(property => {
    if (property.location.toLowerCase().includes(queryLower)) {
      locations.add(property.location);
    }
  });
  
  return Array.from(locations).slice(0, 5);
};

