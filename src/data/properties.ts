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
  gallery?: string[];
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
    image: "/properties/today-global-developers.webp",
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
    image: "/properties/nms-midas.webp",
    gallery: [
      "/properties/gallery/nms-midas-1/1.webp"
    ],
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

  // EMPERIA ICON - Nerul (Plot D-113, TTC Industrial Area)
  {
    id: "emperia-icon-1",
    name: "EMPERIA ICON",
    developer: "Emperia Projects",
    location: "Plot D-113, TTC Industrial Area, Nerul, Navi Mumbai",
    type: "Office Spaces",
    category: "commercial",
    price: "₹42 Lakhs+",
    size: "Multiple Sizes Available",
    possession: "CC Received",
    status: "Ready for Investment",
    featured: true,
    verified: true,
    amenities: [
      "Commercial IT Complex",
      "Double Height Entrance Lobby",
      "Multiple Lifts (6+ elevators)",
      "Fire Fighting Systems with Fire Lifts",
      "Fire Towers & Staircases",
      "9M Wide Fire Drive Way",
      "Ample Basement Parking (100+ spaces)",
      "Service Corridors",
      "The first & only Hotel Offices with international hospitality attached",
      "Opposite D Y Patil Stadium (10 mins)",
      "Leasing Assistance for early investors",
      "Full CC Received - Safe Investment",
      "3X Rental Yields over residential real estate"
    ],
    description: "Emperia Icon - Commercial IT Complex at Plot D-113, TTC Industrial Area, Nerul. Office Spaces with CC Received featuring double height entrance lobby, multiple lifts, fire safety systems, and ample parking. Invest in luxury offices for 3X return on investment. Starting at ₹42 Lakhs+.",
    image: "/properties/emperia-icon.webp",
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
    image: "/properties/raheja-lunaris.webp",
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

  // Raheja Jade City - Tower 11 (KRC)
  {
    id: "raheja-jade-city-1",
    name: "Raheja Jade City",
    developer: "K Raheja Corp (Newfound Properties and Leasing Pvt Ltd)",
    location: "Juinagar, Navi Mumbai",
    type: "Residential",
    category: "buy",
    price: "₹1.12 Cr+",
    size: "556-1068 sqft",
    carpetArea: "556-1068 sqft",
    possession: "Under Construction",
    status: "MahaRERA: P51700080277",
    featured: true,
    verified: true,
    amenities: [
      "Fully Integrated Community - Live-Work-Learn-Play",
      "Surrounded by Parsik Hills & Central Greens",
      "70% Open Spaces",
      "Vehicle Free Eco-Deck Level",
      "Imposing Double Height Entrance Lobby",
      "Spa & Sports Facilities",
      "Walk to Work - Mindspace Juinagar",
      "Off Sion-Panvel Highway & Thane-Belapur Road",
      "Near DY Patil University (950m)",
      "Juinagar Railway Station (2.4 km)",
      "Navi Mumbai Metro Phase 1",
      "Near BKC 2.0 & Navi Mumbai International Airport"
    ],
    description: "Raheja Jade City by K Raheja Corp - A fully integrated community offering holistic living with 70% open spaces, surrounded by Parsik hills and cityscape. Thoughtfully planned 2 & 3 BHK residences with decks, vehicle-free eco-deck level, and a plethora of lifestyle amenities. MahaRERA Registered: P51700080277.",
    image: "/properties/raheja-jade-city.webp",
    gallery: [
      "/properties/gallery/krc-residency/1.webp",
      "/properties/gallery/krc-residency/2.webp",
      "/properties/gallery/krc-residency/3.webp",
      "/properties/gallery/krc-residency/4.webp",
      "/properties/gallery/krc-residency/5.webp",
      "/properties/gallery/krc-residency/6.webp"
    ],
    configurations: [
      {
        type: "2 BHK ELITE",
        size: "556 sqft carpet (663 sqft total)",
        price: "₹1.12-1.15 Cr (All inclusive)"
      },
      {
        type: "2 BHK REGAL",
        size: "599 sqft carpet (708 sqft total)",
        price: "₹1.15-1.30 Cr (All inclusive)"
      },
      {
        type: "2 BHK SUPREME",
        size: "739 sqft carpet (804 sqft total)",
        price: "₹1.53-1.64 Cr (All inclusive)"
      },
      {
        type: "3 BHK",
        size: "1068 sqft carpet (1148 sqft total)",
        price: "Contact for pricing"
      }
    ]
  },

  // Continental Signature - Nerul
  {
    id: "continental-world-1",
    name: "Continental Signature",
    developer: "Sacvir Realtors LLP",
    location: "Sector 17, Nerul, Navi Mumbai",
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
      "Magnificent 24 Floors Residential Tower",
      "Vastu Compliant Luxurious Homes",
      "15+ Podium Landscape Lifestyle Facilities",
      "10+ Sky-High Luxury Living Amenities",
      "3 Tier 24x7 Security with CCTV Surveillance",
      "Six Levels of Convenient Parking",
      "Swimming Pool with Wooden Deck",
      "Turf (Net Cricket)",
      "Kids Play Area",
      "Amphitheatre",
      "Fitness Centre",
      "Indoor Games",
      "Outdoor Games",
      "Party Lawn",
      "Cabana & Hammock Seating",
      "Bar Counter with Seating Area",
      "Reflexology Pathway",
      "Jogging Track",
      "Water Fountain",
      "Leisure Deck",
      "Swing Plaza",
      "Gazebo Seating",
      "Creche"
    ],
    description: "Continental Signature Premium Residences at Nerul's prime locale. A magnificent 24-floor residential tower with vastu compliant luxurious homes, 25+ lifestyle avenues across podium & rooftop levels, designer podium landscape, and curated lifestyle facilities. Seamlessly connected to Nerul Railway Station (900m), DY Patil University (1 km), and Navi Mumbai International Airport (7.6 km).",
    image: "/properties/continental-world.webp",
    gallery: [
      "/properties/gallery/continental-world-1/3.webp",
      "/properties/gallery/continental-world-1/4.webp",
      "/properties/gallery/continental-world-1/5.webp",
      "/properties/gallery/continental-world-1/6.webp"
    ],
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
    image: "/properties/prime-avenue.webp",
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
    image: "/properties/platinum-elysium.webp",
    gallery: [
      "/properties/gallery/platinum-elysium-1/1.webp",
      "/properties/gallery/platinum-elysium-1/2.webp"
    ],
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
    image: "/properties/sai-world-city-nerul.webp",
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

  // Omkar Residency (Regency)
  {
    id: "omkar-regency-1",
    name: "Omkar Residency",
    developer: "Omkar Developers",
    location: "Nerul",
    type: "Residential",
    category: "buy",
    price: "₹1.55 Cr+",
    size: "757-1054 sqft",
    possession: "December 2026",
    status: "",
    featured: true,
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
    image: "/properties/omkar-regency.webp",
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

  // Sai World City - Panvel (with Club Vegas)
  {
    id: "sai-world-city-panvel-1",
    name: "Sai World City",
    developer: "Paradise Group",
    location: "Palaspe Junction, Panvel",
    type: "Residential Township",
    category: "buy",
    price: "Contact for pricing",
    size: "38 acres",
    possession: "Under Construction",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "38 Acres Luxury Township",
      "50% Open Spaces",
      "13 Towers Inspired by Global Cities",
      "Club Vegas - 75,000 sqft Clubhouse",
      "4-Level Parking",
      "50+ World-Class Amenities",
      "Schools, Hospitals & Malls within 10-20 mins",
      "Near NMIA, MTHL & Major Highways",
      "Swimming Pool & Fitness Center",
      "Landscaped Gardens & Walking Tracks"
    ],
    description: "Sai World City - Luxury township across 38 acres with 50% open spaces at Palaspe Junction, Panvel. Features 13 towers inspired by global cities and Club Vegas, a magnificent 75,000 sqft clubhouse. Excellent connectivity to NMIA, MTHL, and major highways.",
    image: "/properties/sai-world-city-panvel.webp",
    gallery: [
      "/properties/gallery/sai-world-city-panvel-1/1.webp",
      "/properties/gallery/sai-world-city-panvel-1/2.webp",
      "/properties/gallery/sai-world-city-panvel-1/3.webp",
      "/properties/gallery/sai-world-city-panvel-1/4.webp",
      "/properties/gallery/sai-world-city-panvel-1/5.webp",
      "/properties/gallery/sai-world-city-panvel-1/6.webp"
    ],
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
    image: "/properties/rental-apartment.webp",
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
    image: "/properties/rental-villa.webp",
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
    image: "/properties/business-hub.webp",
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
    image: "/properties/retail-space.webp",
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
    image: "/properties/vastu-park.webp",
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
    image: "/properties/rudra-kristina.webp",
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
    image: "/properties/siddhivinayak-signature-city.webp",
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
    image: "/properties/pushpak-pride.webp",
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
    image: "/properties/sai-vrindavan.webp",
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
    image: "/properties/orchid-castle.webp",
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
    image: "/properties/ascons-garnet.webp",
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
    image: "/properties/mahaveer-empire.webp",
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
    image: "/properties/riu-siddhivinayak-solitaire.webp",
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
    image: "/properties/gami-telon.webp",
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
    image: "/properties/kamdhenu-pinnacle.webp",
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
    image: "/properties/prime-avenue.webp",
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
    id: "platinum-elysium-2",
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
    image: "/properties/platinum-elysium.webp",
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
      "Ground + 17 Storey Tower",
      "Swimming Pool",
      "Modern Clubhouse",
      "Gym & Fitness Studio",
      "Jogging Track & Walking Track",
      "Meditation Room & Yoga Room",
      "Sauna Room & Massage Room",
      "Multipurpose Court",
      "Reflexology Pathway",
      "10th Floor Recreational Amenities",
      "Grand Entrance Lobby",
      "High Street Retail",
      "Creche Facility",
      "Guest Waiting Lounge",
      "Business Center (24/7)",
      "Senior Citizen Area",
      "Amphitheatre",
      "Rain Water Harvesting",
      "Solar Energy",
      "Ample Car Parking",
      "CCTV Surveillance",
      "Fire Fighting System",
      "Digital Security Access",
      "Video Door Phone",
      "Power Back Up"
    ],
    description: "9 Meraki - A striking Ground + 17 Storey tower with 1 & 2 BHK apartments in Mumbai 3.0 (Third Mumbai). Features exclusive 10th-floor recreational amenities with breathtaking views of Prabalmachi Hills. Strategically located near the upcoming Navi Mumbai International Airport, MTHL, and major infrastructure projects. Smart city living with eco-friendly development and enhanced connectivity.",
    image: "/properties/9-meraki.webp",
    gallery: [
      "/properties/gallery/meraki-panvel-1/1.webp",
      "/properties/gallery/meraki-panvel-1/2.webp",
      "/properties/gallery/meraki-panvel-1/3.webp",
      "/properties/gallery/meraki-panvel-1/4.webp",
      "/properties/gallery/meraki-panvel-1/5.webp",
      "/properties/gallery/meraki-panvel-1/6.webp"
    ],
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
    id: "sai-world-city-panvel-2",
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
    image: "/properties/sai-world-city-panvel.webp",
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
    image: "/properties/sea-queen-park.webp",
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
    image: "/properties/the-oasis-paradise.webp",
    gallery: [
      "/properties/gallery/oasis-paradise-chs-1/1.webp",
      "/properties/gallery/oasis-paradise-chs-1/2.webp",
      "/properties/gallery/oasis-paradise-chs-1/3.webp",
      "/properties/gallery/oasis-paradise-chs-1/4.webp"
    ],
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
  },

  // Balaji Sapphire - Nerul
  {
    id: "balaji-sapphire-nerul",
    name: "Balaji Sapphire",
    developer: "Balaji Developers",
    location: "Nerul, Navi Mumbai",
    type: "Residential",
    category: "buy",
    price: "Contact for pricing",
    size: "Contact for details",
    possession: "Under Construction",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "Premium Residences",
      "Modern amenities",
      "Security system",
      "Parking facilities",
      "Prime Nerul Location"
    ],
    description: "Balaji Sapphire - Premium residential project in Nerul, Navi Mumbai. Contact for detailed pricing and configurations.",
    image: "/properties/balaji-sapphire-nerul.webp",
    gallery: [
      "/properties/gallery/balaji-sapphire-nerul/1.webp",
      "/properties/gallery/balaji-sapphire-nerul/2.webp",
      "/properties/gallery/balaji-sapphire-nerul/3.webp",
      "/properties/gallery/balaji-sapphire-nerul/4.webp",
      "/properties/gallery/balaji-sapphire-nerul/5.webp",
      "/properties/gallery/balaji-sapphire-nerul/6.webp"
    ],
    configurations: [
      {
        type: "Contact for details",
        size: "Contact for details",
        price: "Contact for pricing"
      }
    ]
  },

  // Cyber Square - Sanpada (Kavita Greenscape)
  {
    id: "cyber-square-sanpada",
    name: "Cyber Square",
    developer: "Kavita Greenscape",
    location: "Plot D-102/103/104, TTC Industrial Area, Sanpada, Navi Mumbai",
    type: "Commercial",
    category: "commercial",
    price: "Contact for pricing",
    size: "661-927 sqft",
    possession: "Under Construction",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "Mixed-Use Development",
      "Retail Spaces (Ground Floor)",
      "Commercial Offices",
      "Lift Access",
      "Ample Parking",
      "Terrace",
      "Prime Sanpada Location",
      "Near Palm Beach Road"
    ],
    description: "Cyber Square - Proposed mixed-use development by Kavita Greenscape at Sanpada, Navi Mumbai. Features retail shops (661-927 sqft) on ground floor and commercial office spaces on upper floors. Strategically located in TTC Industrial Area near Palm Beach Road.",
    image: "/properties/cyber-square.webp",
    gallery: [
      "/properties/gallery/cyber-square/1.webp",
      "/properties/gallery/cyber-square/2.webp",
      "/properties/gallery/cyber-square/3.webp"
    ],
    configurations: [
      {
        type: "Retail Shop",
        size: "661-780 sqft",
        price: "Contact for pricing"
      },
      {
        type: "Retail Shop",
        size: "725-927 sqft",
        price: "Contact for pricing"
      },
      {
        type: "Office Space",
        size: "Contact for details",
        price: "Contact for pricing"
      }
    ]
  },

  // Varsha Group
  {
    id: "varsha-group",
    name: "Varsha Group",
    developer: "Varsha Group",
    location: "Navi Mumbai",
    type: "Residential",
    category: "buy",
    price: "Contact for pricing",
    size: "Contact for details",
    possession: "Under Construction",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "Modern amenities",
      "Parking facilities",
      "Security system"
    ],
    description: "Varsha Group - Premium residential project in Navi Mumbai. Contact for detailed pricing and configurations.",
    image: "/properties/varsha-group.webp",
    configurations: [
      {
        type: "Contact for details",
        size: "Contact for details",
        price: "Contact for pricing"
      }
    ]
  },

  // Sai Palm View - Paradise Group
  {
    id: "sai-palm-view",
    name: "Sai Palm View",
    developer: "Paradise Group",
    location: "Nerul, Navi Mumbai",
    type: "Residential",
    category: "buy",
    price: "Contact for pricing",
    size: "Contact for details",
    possession: "Under Construction",
    status: "",
    featured: true,
    verified: true,
    amenities: [
      "Grand Entrance Lobby",
      "Swimming Pool",
      "Kids Play Area",
      "Private Theatre",
      "Indoor Games Zone",
      "Panoramic Sea Views",
      "Bonfire Terrace",
      "Party Lawn & Bar",
      "Sculpture Lawn",
      "Balcony Ocean View",
      "Podium Landscape",
      "Pergola Seating"
    ],
    description: "Sai Palm View by Paradise Group - Premium residences in Nerul with panoramic sea views, grand lobby, private theatre, swimming pool, and 35+ lifestyle amenities. Experience luxury living with breathtaking ocean vistas and world-class amenities.",
    image: "/properties/gallery/sai-palm-view/11.webp",
    gallery: [
      "/properties/gallery/sai-palm-view/1.webp",
      "/properties/gallery/sai-palm-view/2.webp",
      "/properties/gallery/sai-palm-view/3.webp",
      "/properties/gallery/sai-palm-view/5.webp",
      "/properties/gallery/sai-palm-view/6.webp",
      "/properties/gallery/sai-palm-view/7.webp",
      "/properties/gallery/sai-palm-view/8.webp",
      "/properties/gallery/sai-palm-view/9.webp",
      "/properties/gallery/sai-palm-view/11.webp",
      "/properties/gallery/sai-palm-view/12.webp",
      "/properties/gallery/sai-palm-view/13.webp",
      "/properties/gallery/sai-palm-view/14.webp",
      "/properties/gallery/sai-palm-view/15.webp",
      "/properties/gallery/sai-palm-view/16.webp"
    ],
    video: "SAI PALM VIEW LOCATION AV - FINAL - DEC 2025",
    configurations: [
      {
        type: "Contact for details",
        size: "Contact for details",
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
  "Sanpada",
  "Juinagar",
  "Belapur"
];

export const propertyTypes = [
  "Residential",
  "Commercial", 
  "Office Spaces",
  "Residential Township"
];

export const developers = [
  "TODAY GLOBAL DEVELOPERS",
  "Emperia Projects",
  "K Raheja Corp",
  "Sacvir Realtors LLP",
  "Prime Developers",
  "Platinum Developers",
  "Paradise Group",
  "Omkar Developers",
  "Meraki Developers",
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
  "Kamdhenu Developers",
  "Balaji Developers",
  "Kavita Greenscape",
  "Varsha Group"
];
