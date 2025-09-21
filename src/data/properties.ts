export interface Property {
  id: string;
  name: string;
  developer: string;
  location: string;
  type: string;
  price: string;
  size: string;
  carpetArea?: string;
  superArea?: string;
  possession: string;
  status: string;
  featured: boolean;
  verified: boolean;
  amenities: string[];
  description: string;
  image: string;
  configurations?: {
    type: string;
    size: string;
    price: string;
  }[];
}

export const properties: Property[] = [
  // EMPERIA ICON - Nerul
  {
    id: "emperia-icon-1",
    name: "EMPERIA ICON",
    developer: "Opposite D Y Patil Stadium",
    location: "Nerul",
    type: "Office Spaces",
    price: "₹42 Lakhs+",
    size: "5 acres",
    possession: "December 2026",
    status: "Under Construction",
    featured: true,
    verified: true,
    amenities: [
      "5 acres of Magnificent Township",
      "G+18 Storey Towers",
      "30+ Amenities",
      "Ample Car Parking Space",
      "Swimming pools and gyms",
      "Business Lounge & Library",
      "Jogging track"
    ],
    description: "Opposite D Y Patil Stadium, 10 mins from possession. Premium office spaces in a magnificent township.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "1BHK",
        size: "400-430 sqft",
        price: "₹41.54-45 Lakhs (All in)"
      },
      {
        type: "2BHK",
        size: "578-580 sqft",
        price: "₹65.70 Lakhs (All in)"
      }
    ]
  },

  // Raheja Lunaris
  {
    id: "raheja-lunaris-1",
    name: "Raheja Lunaris",
    developer: "Raheja Developers",
    location: "Nerul",
    type: "Residential",
    price: "₹1.15 Cr+",
    size: "452-723 sqft",
    possession: "December 2029",
    status: "Under Construction",
    featured: true,
    verified: true,
    amenities: [
      "Premium finishes",
      "Modern amenities",
      "Security system",
      "Parking facilities"
    ],
    description: "Premium residential project with 1.5, 2, and 2.5 BHK configurations. All prices are negotiable.",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "1.5 BHK",
        size: "452 sqft",
        price: "₹1.15 Cr (All in, negotiable)"
      },
      {
        type: "2 BHK",
        size: "645 sqft",
        price: "₹1.60 Cr (All in, negotiable)"
      },
      {
        type: "2.5 BHK",
        size: "723 sqft",
        price: "₹2.25 Cr (All in, negotiable)"
      }
    ]
  },

  // Raheja Jade City
  {
    id: "raheja-jade-city-1",
    name: "Raheja Jade City",
    developer: "Raheja Developers",
    location: "Nerul",
    type: "Residential",
    price: "₹1.12 Cr+",
    size: "450-662 sqft",
    possession: "Under Construction",
    status: "Under Construction",
    featured: false,
    verified: true,
    amenities: [
      "Premium finishes",
      "Modern amenities",
      "Security system",
      "Parking facilities"
    ],
    description: "Premium residential project with 1 and 2 BHK configurations. All prices are inclusive.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "1 BHK",
        size: "450 sqft",
        price: "₹1.12-1.15 Cr (All inclusive)"
      },
      {
        type: "2 BHK",
        size: "662 sqft",
        price: "₹1.53-1.64 Cr (All inclusive)"
      }
    ]
  },

  // Continental World
  {
    id: "continental-world-1",
    name: "Continental World",
    developer: "Continental Developers",
    location: "Nerul",
    type: "Residential",
    price: "₹2.55 Cr+",
    size: "929-1152 sqft",
    carpetArea: "929-1152 sqft",
    possession: "December 2026",
    status: "Under Construction",
    featured: true,
    verified: true,
    amenities: [
      "Premium finishes",
      "Modern amenities",
      "Security system",
      "Parking facilities",
      "Garden area"
    ],
    description: "Premium 3 BHK apartments with three area variants. Prices plus SDR & GST.",
    image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "3 BHK",
        size: "929 sqft",
        price: "₹2.55 Cr + SDR & GST"
      },
      {
        type: "3 BHK",
        size: "1132 sqft",
        price: "₹2.99 Cr + SDR & GST"
      },
      {
        type: "3 BHK",
        size: "1152 sqft",
        price: "₹3.09 Cr + SDR & GST"
      }
    ]
  },

  // Prime Avenue - Ulwe
  {
    id: "prime-avenue-1",
    name: "Prime Avenue",
    developer: "Prime Developers",
    location: "Ulwe",
    type: "Residential",
    price: "₹1.03 Cr+",
    size: "673-1690 sqft",
    carpetArea: "673-1014 sqft",
    superArea: "1122-1733 sqft",
    possession: "Under Construction",
    status: "Under Construction",
    featured: false,
    verified: true,
    amenities: [
      "Premium finishes",
      "Modern amenities",
      "Security system",
      "Parking facilities"
    ],
    description: "Premium 2BHK and 3BHK apartments in Ulwe with spacious layouts.",
    image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "2 BHK",
        size: "673 sqft (CA) / 1122 sqft (SA)",
        price: "₹1.03 Cr"
      },
      {
        type: "2 BHK",
        size: "715 sqft (CA) / 1193 sqft (SA)",
        price: "₹1.55 Cr"
      },
      {
        type: "2 BHK",
        size: "737 sqft (CA) / 1229 sqft (SA)",
        price: "₹1.12 Cr"
      },
      {
        type: "3 BHK",
        size: "1014 sqft (CA) / 1690 sqft (SA)",
        price: "₹1.52 Cr"
      },
      {
        type: "3 BHK",
        size: "1039 sqft (CA) / 1733 sqft (SA)",
        price: "₹1.55 Cr"
      }
    ]
  },

  // Platinum Elysium
  {
    id: "platinum-elysium-1",
    name: "PLATINUM ELYSIUM",
    developer: "Platinum Developers",
    location: "Nerul",
    type: "Residential",
    price: "₹2.20 Cr+",
    size: "817-1704 sqft",
    possession: "Under Construction",
    status: "Under Construction",
    featured: true,
    verified: true,
    amenities: [
      "Premium finishes",
      "Modern amenities",
      "Security system",
      "Parking facilities",
      "Terrace area"
    ],
    description: "Grandeur 2, 3 & 4 bed residences starting from ₹2.20 Cr+. Located at Plot No 7, Sector 29, Nerul.",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "2 BHK LUXURIA",
        size: "817 sqft",
        price: "₹2.20 Cr+"
      },
      {
        type: "3 BHK LUXURIA",
        size: "1066 sqft",
        price: "₹2.20 Cr+"
      },
      {
        type: "4 BHK SUPREMO",
        size: "1704 sqft + 286 sqft Terrace",
        price: "₹2.20 Cr+"
      }
    ]
  },

  // Sai World City - Nerul
  {
    id: "sai-world-city-nerul-1",
    name: "Sai World City",
    developer: "Sai Developers",
    location: "Nerul",
    type: "Residential & Commercial",
    price: "₹2.10 Cr+",
    size: "865-1290 sqft",
    possession: "Under Construction",
    status: "Under Construction",
    featured: true,
    verified: true,
    amenities: [
      "2 Iconic Towers (G+36 Storeys)",
      "Designer Lobby",
      "Lavish Club Life",
      "Infinity Pool",
      "Pickle ball court",
      "Dual Gyms",
      "Multipurpose Sports Turf",
      "3-Tier Security",
      "Ample Parking"
    ],
    description: "ONE WORLD. ONE LIFE. A MASTERPIECE UNVEILED IN NERUL. Opposite D.Y. Patil Stadium, Thane - Belapur Rd.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "2 BHK",
        size: "865 sqft (carpet)",
        price: "₹2.10 Cr + taxes"
      },
      {
        type: "2 BHK",
        size: "896 sqft (carpet)",
        price: "₹2.20 Cr + taxes"
      },
      {
        type: "3 BHK",
        size: "1290 sqft (carpet)",
        price: "₹3.20 Cr + taxes"
      }
    ]
  },

  // Omkar Regency
  {
    id: "omkar-regency-1",
    name: "Omkar Regency",
    developer: "Omkar Developers",
    location: "Nerul",
    type: "Residential",
    price: "₹1.55 Cr+",
    size: "757-1054 sqft",
    possession: "December 2026",
    status: "Under Construction",
    featured: false,
    verified: true,
    amenities: [
      "G+19 Storey Tower",
      "Yoga Room",
      "Fitness Centre",
      "Indoor Games",
      "Clubhouse",
      "Infant Play Area",
      "Party Hall",
      "Swimming Pool",
      "Garden",
      "Kids Play Area"
    ],
    description: "Premium 2 & 3 BHK Deck Residences. RERA & CC Approved. Plot 01, Sector 9, Nerul East.",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "2 BHK",
        size: "757 sqft (Carpet)",
        price: "₹1.55 Cr++"
      },
      {
        type: "3 BHK",
        size: "1054 sqft (Carpet)",
        price: "₹2.30 Cr++"
      }
    ]
  },

  // 9 Meraki - Panvel
  {
    id: "9-meraki-1",
    name: "9 Meraki",
    developer: "Meraki Developers",
    location: "Panvel",
    type: "Residential",
    price: "₹360 sqft+",
    size: "360-584 sqft",
    possession: "Under Construction",
    status: "Under Construction",
    featured: true,
    verified: true,
    amenities: [
      "17-storeyed building",
      "High Street Shopping",
      "Dedicated Parking Tower",
      "Swimming Pool",
      "Clubhouse",
      "Indoor Games Zone",
      "Viewing Decks",
      "Grand Entrance Lobby",
      "Landscaped Gardens",
      "Walking and Jogging Tracks",
      "Kids' Play Area",
      "Multipurpose Courts",
      "Themed Gardens",
      "Senior Citizens' Sitout",
      "Yoga and Meditation Area",
      "Amphitheatre"
    ],
    description: "A landmark project offering seamless connectivity and modern living. Exclusive 10th-floor amenities.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "1 BHK",
        size: "360 | 382 | 395 sqft (Carpet)",
        price: "Contact for pricing"
      },
      {
        type: "2 BHK",
        size: "584 sqft (Carpet)",
        price: "Contact for pricing"
      }
    ]
  },

  // Sai World City - Panvel
  {
    id: "sai-world-city-panvel-1",
    name: "Sai World City",
    developer: "Sai Developers",
    location: "Panvel",
    type: "Residential Township",
    price: "₹2 BHK+",
    size: "38 acres",
    possession: "Under Construction",
    status: "Under Construction",
    featured: true,
    verified: true,
    amenities: [
      "38 acres luxury township",
      "50% open spaces",
      "13 towers inspired by global cities",
      "Club Vegas - 75,000 sqft clubhouse",
      "4-level parking",
      "50+ amenities",
      "Schools, hospitals & malls within 10-20 mins"
    ],
    description: "Luxury township across 38 acres with 50% open spaces. Located at Palaspe Junction, Panvel.",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "Phase 1",
        size: "Marina, Opera, Acropolis (G+27), Manhattan (G+31)",
        price: "2/3/4 BHK - Contact for pricing"
      },
      {
        type: "Phase 2",
        size: "Palazzo, Bellagio, Basilica (G+33)",
        price: "2/2.5/3 BHK & Jodi Flats - Contact for pricing"
      },
      {
        type: "Phase 3",
        size: "Miami, Lloyd, Sentosa, Atlantis",
        price: "New Launch - Contact for pricing"
      }
    ]
  }
];

export const locations = [
  "Nerul",
  "Ulwe", 
  "Panvel",
  "Kharghar",
  "Taloja"
];

export const propertyTypes = [
  "Residential",
  "Commercial", 
  "Office Spaces",
  "Residential Township"
];

export const developers = [
  "TODAY GLOBAL DEVELOPERS",
  "Raheja Developers",
  "Continental Developers", 
  "Prime Developers",
  "Platinum Developers",
  "Sai Developers",
  "Omkar Developers",
  "Meraki Developers"
];
