export interface Property {
  id: string;
  name: string;
  developer: string;
  location: string;
  type: string;
  category: 'buy' | 'rent' | 'commercial'; // New field for Buy/Rent/Commercial
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
  video?: string; // Optional video field
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
}

export const properties: Property[] = [
  // Today Global Developers - Nerul
 

  // Today Global Developers - Giravale Panvel
  {
    id: "today-global-developers-giravale",
    name: "Today Global Developers",
    developer: "Today Global Developers",
    location: "Giravale Panvel",
    type: "Residential",
    category: "buy",
    price: "₹41.54 Lakhs+",
    size: "400-580 sqft",
    possession: "December 2026",
    status: "",
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
    description: "New Township of Luxurious 1 BHK & 2 BHK Residences with all modern amenities at exciting price at Giravale Panvel.",
    image: "/homeimage.png",
    video: "today_global_developer", // Video reference
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

  // NMS Midas - Belapur
  {
    id: "nms-midas-1",
    name: "NMSMidas",
    developer: "NMS Developers",
    location: "Belapur",
    type: "Commercial",
    category: "commercial",
    price: "₹1.67 Cr Onwards",
    size: "Multiple Options",
    possession: "December 2028",
    status: "New Launch",
    featured: true,
    verified: true,
    amenities: [
      "Park",
      "Shopping Centre",
      "Open Space",
      "Car Parking",
      "Fire Fighting Systems",
      "Lifts",
      "Waste Management",
      "Sewage Treatment Plant",
      "24/7 Water Supply",
      "Rain Water Harvesting"
    ],
    description: "NMS Midas offers multiple investment options in varied budget range. Located in Belapur, Navi Mumbai with excellent connectivity and modern amenities.",
    image: "/office_spaces/nms.jpg",
    configurations: [
      {
        type: "Shop",
        size: "867 sq.ft.",
        price: "₹1.67 Cr Onwards"
      },
      {
        type: "Shop",
        size: "948 sq.ft.",
        price: "₹1.83 Cr Onwards"
      },
      {
        type: "Office",
        size: "472 sq.ft.",
        price: "₹2.06 Cr Onwards"
      },
      {
        type: "Office",
        size: "651 sq.ft.",
        price: "₹2.15 Cr Onwards"
      },
      {
        type: "Office",
        size: "947 sq.ft.",
        price: "₹3.13 Cr Onwards"
      },
      {
        type: "Office",
        size: "1302 sq.ft.",
        price: "₹4.3 Cr Onwards"
      },
      {
        type: "Office",
        size: "1620 sq.ft.",
        price: "₹5.35 Cr Onwards"
      },
      {
        type: "Office",
        size: "1720 sq.ft.",
        price: "₹5.68 Cr Onwards"
      },
      {
        type: "Office",
        size: "2505 sq.ft.",
        price: "₹8.27 Cr Onwards"
      },
      {
        type: "Office",
        size: "3468 sq.ft.",
        price: "₹11.45 Cr Onwards"
      },
      {
        type: "Office",
        size: "5010 sq.ft.",
        price: "₹16.55 Cr Onwards"
      },
      {
        type: "Office",
        size: "5261 sq.ft.",
        price: "₹17.38 Cr Onwards"
      },
      {
        type: "Office",
        size: "8266 sq.ft.",
        price: "₹27.3 Cr Onwards"
      },
      {
        type: "Office",
        size: "18222 sq.ft.",
        price: "₹60.18 Cr Onwards"
      }
    ]
  },

  // EMPERIA ICON - Nerul
  {
    id: "emperia-icon-1",
    name: "EMPERIA ICON",
    developer: "Emperia Icon",
    location: "Nerul, Navi Mumbai",
    type: "Office Spaces",
    category: "commercial",
    price: "₹42 Lakhs+",
    size: "Multiple Sizes Available",
    possession: "CC Received",
    status: "Ready for Investment",
    featured: true,
    verified: true,
    amenities: [
      "The first & only Hotel Offices with international hospitality attached",
      "In Nerul, Navi Mumbai, Opposite D Y Patil Stadium 10 mins",
      "Leasing Assistance available for early investors",
      "Special booking price: INR 99,999/-",
      "Safe investment: full CC received",
      "3X Rental Yields over residential real estate",
      "Higher returns with the mixed-used development advantage",
      "The Navi Mumbai Impact of great infra",
      "Commercial real estate investment ensures steady cash flow due to longer-term"
    ],
    description: "Office Spaces with CC Received at the centrally connected address of Nerul by Emperia Icon. Invest in Luxury Offices for 3X Return on your investment. Office Spaces Starting at ₹42 Lakhs+",
    image: "/Emperia-icon.png",
    configurations: [
      {
        type: "Office Space",
        size: "Contact for Details",
        price: "₹42 Lakhs+"
      },
      {
        type: "Special Booking",
        size: "Limited Time Offer",
        price: "₹99,999/-"
      }
    ]
  },

  // Emperia Icon - Prime Commercial Spaces (Buy)
 
  // Raheja Lunaris
  {
    id: "raheja-lunaris-1",
    name: "Raheja Lunaris",
    developer: "Raheja Developers",
    location: "Nerul",
    type: "Residential",
    category: "buy",
    price: "₹1.15 Cr+",
    size: "452-723 sqft",
    possession: "December 2029",
    status: "",
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
    category: "buy",
    price: "₹1.12 Cr+",
    size: "450-662 sqft",
    possession: "Under Construction",
    status: "",
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
    category: "buy",
    price: "₹2.55 Cr+",
    size: "929-1152 sqft",
    carpetArea: "929-1152 sqft",
    possession: "December 2026",
    status: "",
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
    image: "/sai_world_city.png",
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
    category: "buy",
    price: "₹1.03 Cr+",
    size: "673-1690 sqft",
    carpetArea: "673-1014 sqft",
    superArea: "1122-1733 sqft",
    possession: "Under Construction",
    status: "",
    featured: false,
    verified: true,
    amenities: [
      "Premium finishes",
      "Modern amenities",
      "Security system",
      "Parking facilities"
    ],
    description: "Premium 2BHK and 3BHK apartments in Ulwe with spacious layouts.",
    image: "/sai_world_2.png",
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
    category: "buy",
    price: "₹2.20 Cr+",
    size: "817-1704 sqft",
    possession: "Under Construction",
    status: "",
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
    image: "/sai-developers.png",
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
    developer: "Paradise Group",
    location: "Nerul",
    type: "Residential & Commercial",
    category: "buy",
    price: "₹2.10 Cr+",
    size: "865-1290 sqft",
    possession: "Under Construction",
    status: "",
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
    image: "/omkar-regency.png",
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
    category: "buy",
    price: "₹1.55 Cr+",
    size: "757-1054 sqft",
    possession: "December 2026",
    status: "",
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
    image: "/Gemini_Generated_Image_e15qlie15qlie15q.png",
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

  // Sai World City - Panvel
  {
    id: "sai-world-city-panvel-1",
    name: "Sai World City",
    developer: "Paradise Group",
    location: "Panvel",
    type: "Residential Township",
    category: "buy",
    price: "2 BHK",
    size: "38 acres",
    possession: "Under Construction",
    status: "",
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
  },

  // Additional Rent Properties
  {
    id: "rent-apartment-1",
    name: "Premium Rental Apartment",
    developer: "Rental Properties Ltd",
    location: "Nerul",
    type: "Residential",
    category: "rent",
    price: "₹25,000/month",
    size: "2 BHK",
    possession: "Ready to Move",
    status: "Available",
    featured: true,
    verified: true,
    amenities: [
      "Fully furnished",
      "Parking space",
      "Security",
      "Maintenance included"
    ],
    description: "Beautiful 2 BHK apartment available for rent in prime location.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
  },

  {
    id: "rent-apartment-2",
    name: "Modern Rental Villa",
    developer: "Villa Rentals",
    location: "Panvel",
    type: "Residential",
    category: "rent",
    price: "₹45,000/month",
    size: "3 BHK",
    possession: "Ready to Move",
    status: "Available",
    featured: false,
    verified: true,
    amenities: [
      "Garden",
      "Swimming pool",
      "Parking for 2 cars",
      "Fully furnished"
    ],
    description: "Spacious 3 BHK villa with modern amenities.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
  },

  // Additional Commercial Properties
  {
    id: "commercial-office-1",
    name: "Business Hub Office Space",
    developer: "Commercial Developers",
    location: "Kharghar",
    type: "Commercial",
    category: "commercial",
    price: "₹85 Lakhs+",
    size: "2000 sqft",
    possession: "December 2025",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "Modern office space",
      "Parking facilities",
      "Conference rooms",
      "High-speed internet"
    ],
    description: "Premium office space in commercial hub.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
  },

  {
    id: "commercial-retail-1",
    name: "Retail Space Complex",
    developer: "Retail Developers",
    location: "Ulwe",
    type: "Commercial",
    category: "commercial",
    price: "₹1.2 Cr+",
    size: "1500 sqft",
    possession: "March 2025",
    status: "",
    featured: false,
    verified: true,
    amenities: [
      "Prime retail location",
      "High footfall area",
      "Parking space",
      "Modern infrastructure"
    ],
    description: "Prime retail space in upcoming commercial complex.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
  },

  // Properties from Housing.com listings
  {
    id: "vastu-park-kharghar",
    name: "Vastu Park",
    developer: "Vastu Nirvana LLP",
    location: "Kharghar",
    type: "Residential",
    category: "buy",
    price: "₹59.99 L - 89.99 L",
    size: "416 sqft",
    possession: "December 2029",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "RERA Approved",
      "Modern amenities",
      "Security system",
      "Parking facilities",
      "Garden area"
    ],
    description: "1 & 2 BHK Flats in Kharghar with average price ₹14.56 K/sq.ft. RERA approved project.",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "1 BHK",
        size: "416 sqft",
        price: "₹59.99 L"
      },
      {
        type: "2 BHK",
        size: "Contact for details",
        price: "₹89.99 L"
      }
    ]
  },

  {
    id: "rudra-kristina-taloja",
    name: "Rudra Kristina I",
    developer: "Growl Communication Pvt Ltd",
    location: "Taloja",
    type: "Residential",
    category: "buy",
    price: "₹34.0 L - 57.0 L",
    size: "343 sqft",
    possession: "December 2027",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "RERA Approved",
      "Modern amenities",
      "Security system",
      "Parking facilities"
    ],
    description: "1 & 2 BHK Flats in Taloja with average price ₹9.97 K/sq.ft. Zero brokerage project.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "1 BHK",
        size: "343 sqft",
        price: "₹34 L - 38 L"
      },
      {
        type: "2 BHK",
        size: "Contact for details",
        price: "₹56 L - 57 L"
      }
    ]
  },

  {
    id: "siddhivinayak-signature-taloja",
    name: "Siddhivinayak Signature City",
    developer: "Siddhivinayak Homes",
    location: "Taloja",
    type: "Residential",
    category: "buy",
    price: "₹42.0 L - 58.18 L",
    size: "448 sqft",
    possession: "December 2025",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "RERA Approved",
      "Modern amenities",
      "Security system",
      "Parking facilities",
      "Clubhouse"
    ],
    description: "1 & 2 BHK Flats in Taloja with average price ₹9.23 K/sq.ft. Zero brokerage project.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "1 BHK",
        size: "448 sqft",
        price: "₹42 L - 43.5 L"
      },
      {
        type: "2 BHK",
        size: "Contact for details",
        price: "₹57 L - 58.18 L"
      }
    ]
  },

  {
    id: "pushpak-pride-pushpak-nagar",
    name: "Pushpak Pride",
    developer: "Admire Infra & Astell Realty",
    location: "Pushpak Nagar",
    type: "Residential",
    category: "buy",
    price: "₹40.0 L - 63.97 L",
    size: "350 sqft",
    possession: "December 2028",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "RERA Approved",
      "3D View Available",
      "Modern amenities",
      "Security system",
      "Parking facilities"
    ],
    description: "1 & 2 BHK Flats in Pushpak Nagar with average price ₹11.56 K/sq.ft. Zero brokerage project.",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "1 BHK",
        size: "350 sqft",
        price: "₹40 L - 43.61 L"
      },
      {
        type: "2 BHK",
        size: "Contact for details",
        price: "₹60 L - 63.97 L"
      }
    ]
  },

  {
    id: "sai-vrindavan-panvel",
    name: "Sai Vrindavan",
    developer: "KT Infra",
    location: "Panvel",
    type: "Residential",
    category: "buy",
    price: "₹1.2 Cr - 3.84 Cr",
    size: "702 sqft",
    possession: "December 2029",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "RERA Approved",
      "Modern amenities",
      "Security system",
      "Parking facilities",
      "Clubhouse",
      "Swimming pool"
    ],
    description: "2, 3 & 4 BHK Flats in Panvel with average price ₹17.15 K/sq.ft. Zero brokerage project.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "2 BHK",
        size: "Contact for details",
        price: "₹1.2 Cr - 1.34 Cr"
      },
      {
        type: "3 BHK",
        size: "Contact for details",
        price: "₹1.82 Cr - 1.92 Cr"
      },
      {
        type: "4 BHK",
        size: "702 sqft",
        price: "₹3.2 Cr - 3.84 Cr"
      }
    ]
  },

  {
    id: "orchid-castle-panvel",
    name: "Orchid Castle",
    developer: "Kamal Group",
    location: "Panvel",
    type: "Residential",
    category: "buy",
    price: "₹58.87 L - 1.05 Cr",
    size: "388 sqft",
    possession: "May 2027",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "RERA Approved",
      "Modern amenities",
      "Security system",
      "Parking facilities",
      "Clubhouse"
    ],
    description: "1, 2 & 3 BHK Flats in Panvel with average price ₹13.82 K - ₹15.17 K/sq.ft.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "1 BHK",
        size: "388 sqft",
        price: "₹58.87 L - 62.82 L"
      },
      {
        type: "2 BHK",
        size: "Contact for details",
        price: "₹84.55 L - 91.26 L"
      },
      {
        type: "3 BHK",
        size: "Contact for details",
        price: "₹1.02 Cr - 1.05 Cr"
      }
    ]
  },

  {
    id: "ascons-garnet-pushpak-nagar",
    name: "Ascons Garnet",
    developer: "Ascons Assets India Private Limited",
    location: "Pushpak Nagar",
    type: "Residential",
    category: "buy",
    price: "₹37.0 L - 37.84 L",
    size: "277 sqft",
    possession: "March 2027",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "RERA Approved",
      "Modern amenities",
      "Security system",
      "Parking facilities"
    ],
    description: "1 BHK Flat in Pushpak Nagar with average price ₹11.75 K - ₹13.36 K/sq.ft. Zero brokerage project.",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "1 BHK",
        size: "277 sqft",
        price: "₹37 L - 37.84 L"
      }
    ]
  },

  {
    id: "mahaveer-empire-taloja",
    name: "Mahaveer Empire",
    developer: "Millenium Group",
    location: "Taloja",
    type: "Residential",
    category: "buy",
    price: "₹29.0 L - 47.88 L",
    size: "403 sqft",
    possession: "December 2026",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "RERA Approved",
      "Modern amenities",
      "Security system",
      "Parking facilities"
    ],
    description: "1 & 2 BHK Flats in Taloja with average price ₹6.76 K - ₹7.2 K/sq.ft. Zero brokerage project.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "1 BHK",
        size: "403 sqft",
        price: "₹29 L - 29 L"
      },
      {
        type: "2 BHK",
        size: "Contact for details",
        price: "₹46 L - 47.88 L"
      }
    ]
  },

  {
    id: "riu-siddhivinayak-solitaire-pushpak-nagar",
    name: "Riu Siddhivinayak Solitaire",
    developer: "Riu Homes Private Limited",
    location: "Pushpak Nagar",
    type: "Residential",
    category: "buy",
    price: "₹45.0 L - 70.0 L",
    size: "430 sqft",
    possession: "March 2032",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "RERA Approved",
      "Modern amenities",
      "Security system",
      "Parking facilities",
      "Clubhouse"
    ],
    description: "1 & 2 BHK Flats in Pushpak Nagar with average price ₹10.23 K/sq.ft. Zero brokerage project.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "1 BHK",
        size: "430 sqft",
        price: "₹45 L"
      },
      {
        type: "2 BHK",
        size: "Contact for details",
        price: "₹70 L"
      }
    ]
  },

  {
    id: "gami-telon-ghansoli",
    name: "Gami Telon",
    developer: "Gami Group",
    location: "Ghansoli",
    type: "Residential",
    category: "buy",
    price: "₹1.01 Cr - 1.62 Cr",
    size: "385 sqft",
    possession: "December 2029",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "RERA Approved",
      "Modern amenities",
      "Security system",
      "Parking facilities",
      "Clubhouse"
    ],
    description: "1 & 2 BHK Flats in Ghansoli with average price ₹25.69 K/sq.ft. Zero brokerage project.",
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "1 BHK",
        size: "385 sqft",
        price: "₹1.01 Cr"
      },
      {
        type: "2 BHK",
        size: "Contact for details",
        price: "₹1.62 Cr"
      }
    ]
  },

  {
    id: "kamdhenu-pinnacle-nerul",
    name: "Kamdhenu Pinnacle",
    developer: "Kamdhenu Developers",
    location: "Nerul",
    type: "Residential",
    category: "buy",
    price: "₹1.79 Cr - 2.2 Cr",
    size: "Contact for details",
    possession: "Contact for details",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "RERA Approved",
      "Modern amenities",
      "Security system",
      "Parking facilities",
      "Clubhouse"
    ],
    description: "2 & 3 BHK Flats in Nerul. Zero brokerage project with premium amenities.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    configurations: [
      {
        type: "2 BHK",
        size: "Contact for details",
        price: "₹1.79 Cr - 1.85 Cr"
      },
      {
        type: "3 BHK",
        size: "Contact for details",
        price: "₹2.2 Cr"
      }
    ]
  },

  // Prime Avenue Ulwe
  {
    id: "prime-avenue-ulwe-1",
    name: "Prime Avenue",
    developer: "Prime Developers",
    location: "Ulwe",
    type: "Residential",
    category: "buy",
    price: "₹1.03 Cr+",
    size: "673-1014 sqft",
    carpetArea: "673-1014 sqft",
    superArea: "1122-1733 sqft",
    possession: "Under Construction",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "Premium finishes",
      "Modern amenities",
      "Security system",
      "Parking facilities",
      "Clubhouse",
      "Swimming pool",
      "Gymnasium",
      "Landscaped gardens"
    ],
    description: "Premium residential project with 2BHK and 3BHK configurations in Ulwe. Features spacious layouts with excellent connectivity.",
    image: "/homeimage.png",
    configurations: [
      {
        type: "2BHK",
        size: "737 sqft carpet (1229 sqft super)",
        price: "₹1.12 Cr"
      },
      {
        type: "2BHK",
        size: "673 sqft carpet (1122 sqft super)",
        price: "₹1.03 Cr"
      },
      {
        type: "2BHK",
        size: "715 sqft carpet (1193 sqft super)",
        price: "₹1.55 Cr"
      },
      {
        type: "3BHK",
        size: "1014 sqft carpet (1690 sqft super)",
        price: "₹1.52 Cr"
      },
      {
        type: "3BHK",
        size: "1039 sqft carpet (1733 sqft super)",
        price: "₹1.55 Cr"
      }
    ]
  },

  // Platinum Elysium
  {
    id: "platinum-elysium-1",
    name: "Platinum Elysium",
    developer: "Platinum Developers",
    location: "Nerul",
    type: "Residential",
    category: "buy",
    price: "₹2.20 Cr+",
    size: "817-1704 sqft",
    carpetArea: "817-1704 sqft",
    possession: "Under Construction",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "Premium finishes",
      "Modern amenities",
      "Security system",
      "Parking facilities",
      "Clubhouse",
      "Swimming pool",
      "Gymnasium",
      "Landscaped gardens",
      "Terrace area"
    ],
    description: "Grandeur 2, 3 & 4 bed residences located at Plot No 7, Sector 29, Nerul. Premium luxury homes with terrace areas.",
    image: "/homeimage.png",
    configurations: [
      {
        type: "2BHK LUXURIA",
        size: "817 sqft",
        price: "₹2.20 Cr+"
      },
      {
        type: "3BHK LUXURIA",
        size: "1066 sqft",
        price: "₹2.90 Cr+"
      },
      {
        type: "4BHK SUPREMO",
        size: "1704 sqft + 286 sqft Terrace",
        price: "5.50 Cr+"
      }
    ]
  },

  // 9 Meraki Panvel
  {
    id: "meraki-panvel-1",
    name: "9 Meraki",
    developer: "Meraki Developers",
    location: "Panvel",
    type: "Residential",
    category: "buy",
    price: "₹Contact for pricing",
    size: "360-584 sqft",
    carpetArea: "360-584 sqft",
    possession: "Under Construction",
    status: "",
    featured: true,
    verified: true,
    amenities: [
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
      "Amphitheatre",
      "High Street Shopping",
      "Dedicated Parking Tower"
    ],
    description: "A striking 17-storeyed building with Ground + 1st Commercial and 16 Residential Floors. Exclusive 10th-floor amenities with breathtaking views of Prabalmachi Hills.",
    image: "/homeimage.png",
    configurations: [
      {
        type: "1BHK",
        size: "360 sqft carpet",
        price: "Contact for pricing"
      },
      {
        type: "1BHK",
        size: "382 sqft carpet",
        price: "Contact for pricing"
      },
      {
        type: "1BHK",
        size: "395 sqft carpet",
        price: "Contact for pricing"
      },
      {
        type: "2BHK",
        size: "584 sqft carpet",
        price: "Contact for pricing"
      },
      {
        type: "Jodi Flats",
        size: "Available",
        price: "Contact for pricing"
      }
    ]
  },

  // Sai World City Panvel
  {
    id: "sai-world-city-panvel-1",
    name: "Sai World City Panvel",
    developer: "Sai Developers",
    location: "Panvel",
    type: "Residential",
    category: "buy",
    price: "₹Contact for pricing",
    size: "Multiple configurations",
    possession: "Under Construction",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "Club Vegas - 75,000 sq.ft. Clubhouse",
      "4-level parking",
      "50+ amenities",
      "Luxury township across 38 acres",
      "50% open spaces",
      "13 towers inspired by global cities",
      "Marina, Opera, Acropolis, Manhattan towers",
      "Palazzo, Bellagio, Basilica towers",
      "Miami, Lloyd, Sentosa, Atlantis towers"
    ],
    description: "Luxury township across 38 acres with 50% open spaces. Located at Palaspe Junction, Panvel with 13 towers inspired by global cities. Excellent connectivity to NMIA, MTHL, and major highways.",
    image: "/sai_world_city.png",
    configurations: [
      {
        type: "Phase 1 - Marina, Opera, Acropolis (G+27)",
        size: "2/3/4 BHK",
        price: "Contact for pricing"
      },
      {
        type: "Phase 1 - Manhattan (G+31)",
        size: "2/3/4 BHK",
        price: "Contact for pricing"
      },
      {
        type: "Phase 2 - Palazzo, Bellagio, Basilica (G+33)",
        size: "2/2.5/3 BHK & Jodi Flats",
        price: "Contact for pricing"
      },
      {
        type: "Phase 3 - Miami, Lloyd, Sentosa, Atlantis",
        size: "New Launch",
        price: "Contact for pricing"
      }
    ]
  },

  // Sea Queen Park - Kharghar
  {
    id: "sea-queen-park-1",
    name: "Sea Queen Park",
    developer: "National Builders",
    location: "Kharghar",
    type: "Residential",
    category: "buy",
    price: "Contact for pricing",
    size: "1 BHK, 2 BHK",
    possession: "Under Construction",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "Children Play Area",
      "Jogging Track",
      "Fitness Center",
      "Family Funtime In Garden",
      "Community Hall"
    ],
    description: "Sea Queen Park by National Builders - Premium residential project with G+4 and G+6 Storey buildings across 9 wings. Located in Upper Kharghar, just 5 minutes walking distance from Pendhar Metro Station. Excellent connectivity to Mumbai Pune Expressway, Taloja-Kharghar Bridge, and proposed Navi Mumbai Airport. Close to Mega CIDCO Planned City Kharghar and proposed Mega Commercial Hub (BKC-2) of Navi Mumbai.",
    image: "/office_spaces/WhatsApp Image 2025-11-22 at 13.36.24.jpeg",
    links: [
      {
        label: "View Location on Google Maps",
        url: "https://maps.app.goo.gl/uasZn8MDpsyycosR9"
      }
    ],
    configurations: [
      {
        type: "1 BHK",
        size: "Contact for details",
        price: "Contact for pricing"
      },
      {
        type: "2 BHK",
        size: "Contact for details",
        price: "Contact for pricing"
      }
    ]
  },

  // The Oasis By Paradise CHS - Sanpada
  {
    id: "oasis-paradise-chs-1",
    name: "The Oasis By Paradise CHS",
    developer: "Paradise Group",
    location: "Sanpada",
    type: "Residential",
    category: "buy",
    price: "Contact for pricing",
    size: "872-2090 sqft",
    carpetArea: "872-2090 sqft",
    possession: "Plinth Completed",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "1 Acre Amenities-Space",
      "0.5 Acres Miyawaki Forest",
      "Zen & Aroma Gardens",
      "Swimming Pool",
      "40+ Amenities",
      "Jain Derasar adjacent to project",
      "900+ Covered-Surface Car Parks",
      "EV Charging",
      "40+ Guest Parking",
      "IGBC Pre Certified Building",
      "Rain water harvesting",
      "Solar Panels",
      "Smart Lobbies",
      "Walk-in Wardrobes",
      "Creek View"
    ],
    description: "The Oasis By Paradise CHS - A premium residential project on 2.53 acres with 60%+ open green space. G+35 Storey building with 4 flats per floor. First Residential Floor is 90 ft above ground. Vastu-compliant balcony homes with walk-in wardrobes and creek view. Features 1 acre amenities space, 0.5 acres Miyawaki Forest, Zen & Aroma Gardens, swimming pool, and 40+ amenities. IGBC Pre Certified Building with rainwater harvesting, solar panels, and smart lobbies. Approved by ICICI, Axis & other leading banks. Located at Sector 7, Sanpada, opposite Jain Derasar - Sant Tukaram Garden.",
    image: "/office_spaces/WhatsApp Image 2025-11-22 at 13.36.25.jpeg",
    contact: {
      name: "Sajan Selestien",
      phone: "9867991016"
    },
    configurations: [
      {
        type: "2 BHK",
        size: "872 sq.ft",
        price: "Contact for pricing"
      },
      {
        type: "3 BHK",
        size: "1256 sq.ft",
        price: "Contact for pricing"
      },
      {
        type: "4 BHK",
        size: "2090 sq.ft",
        price: "Contact for pricing"
      }
    ]
  }
];

export const locations = [
  "Nerul",
  "Ulwe", 
  "Panvel",
  "Giravale Panvel",
  "Kharghar",
  "Taloja",
  "Pushpak Nagar",
  "Ghansoli",
  "Sanpada"
];

export const propertyTypes = [
  "Residential",
  "Commercial", 
  "Office Spaces",
  "Residential Township"
];

export const developers = [
  "TODAY GLOBAL DEVELOPERS",
  "Emperia Icon",
  "Raheja Developers",
  "Continental Developers", 
  "Prime Developers",
  "Platinum Developers",
  "Sai Developers",
  "Omkar Developers",
  "Meraki Developers",
  "Paradise Group",
  "National Builders",
  "Vastu Nirvana LLP",
  "Growl Communication Pvt Ltd",
  "Siddhivinayak Homes",
  "Admire Infra & Astell Realty",
  "KT Infra",
  "Kamal Group",
  "Ascons Assets India Private Limited",
  "Millenium Group",
  "Riu Homes Private Limited",
  "Gami Group",
  "Kamdhenu Developers"
];
