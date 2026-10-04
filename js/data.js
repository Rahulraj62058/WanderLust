// js/data.js - Mock Datasets for WanderLust Travel & Tour Platform

const INITIAL_DESTINATIONS = [
  {
    id: "dest-1",
    name: "Bali, Indonesia",
    country: "Indonesia",
    category: "beach",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 342,
    startingPrice: 599,
    currency: "USD",
    tag: "Trending",
    description: "Tropical beaches, lush rice terraces, sacred temples, and vibrant surf spots in the Island of the Gods."
  },
  {
    id: "dest-2",
    name: "Swiss Alps, Switzerland",
    country: "Switzerland",
    category: "mountain",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    rating: 4.95,
    reviewsCount: 520,
    startingPrice: 1299,
    currency: "USD",
    tag: "Popular",
    description: "Breathtaking snowy peaks, panoramic alpine trains, turquoise lakes, and world-class skiing resorts."
  },
  {
    id: "dest-3",
    name: "Kyoto & Tokyo, Japan",
    country: "Japan",
    category: "cultural",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    rating: 4.88,
    reviewsCount: 410,
    startingPrice: 949,
    currency: "USD",
    tag: "Cultural",
    description: "Historic shrines, cherry blossoms, neon-lit tech districts, and Michelin-starred culinary journeys."
  },
  {
    id: "dest-4",
    name: "Santorini, Greece",
    country: "Greece",
    category: "romantic",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.92,
    reviewsCount: 680,
    startingPrice: 849,
    currency: "USD",
    tag: "Romantic",
    description: "Whitewashed cliffside villas, iconic blue domes, cobalt Aegean waters, and world-famous sunsets."
  },
  {
    id: "dest-5",
    name: "Dubai, United Arab Emirates",
    country: "UAE",
    category: "city",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    rating: 4.85,
    reviewsCount: 290,
    startingPrice: 720,
    currency: "USD",
    tag: "Luxury",
    description: "Futuristic skyscrapers, desert safaris, mega shopping paradises, and ultra-luxurious dining."
  },
  {
    id: "dest-6",
    name: "Costa Rica Rainforest",
    country: "Costa Rica",
    category: "adventure",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    rating: 4.89,
    reviewsCount: 198,
    startingPrice: 650,
    currency: "USD",
    tag: "Adventure",
    description: "Ziplining through misty cloud forests, volcano hot springs, exotic wildlife, and pristine Pacific coastlines."
  },
  {
    id: "dest-7",
    name: "Maasai Mara, Kenya",
    country: "Kenya",
    category: "wildlife",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    rating: 4.97,
    reviewsCount: 310,
    startingPrice: 1450,
    currency: "USD",
    tag: "Safari",
    description: "The Great Migration, Big Five wildlife game drives, luxury tented camps, and hot air balloon sunrises."
  },
  {
    id: "dest-8",
    name: "Amalfi Coast, Italy",
    country: "Italy",
    category: "romantic",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    rating: 4.91,
    reviewsCount: 475,
    startingPrice: 980,
    currency: "USD",
    tag: "Scenic",
    description: "Dramatic Mediterranean coastal cliffs, pastel fishing villages, fragrant lemon groves, and yacht tours."
  },
  {
    id: "dest-9",
    name: "Goa, India",
    country: "India",
    category: "budget",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    rating: 4.88,
    reviewsCount: 620,
    startingPrice: 120,
    currency: "USD",
    tag: "Low Budget (₹10k)",
    description: "Golden sand beaches, Portuguese colonial forts, vibrant beach shacks, water sports, and sunset boat parties."
  },
  {
    id: "dest-10",
    name: "Manali & Kasol, India",
    country: "India",
    category: "mountain",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    rating: 4.93,
    reviewsCount: 540,
    startingPrice: 145,
    currency: "USD",
    tag: "Budget Trek (₹12k)",
    description: "Towering snow peaks, riverside alpine cafes in Kasol, Kheerganga hot springs, and thrilling Solang valley adventures."
  },
  {
    id: "dest-11",
    name: "Rishikesh & Haridwar, India",
    country: "India",
    category: "adventure",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    rating: 4.92,
    reviewsCount: 480,
    startingPrice: 120,
    currency: "USD",
    tag: "Low Budget (₹10k)",
    description: "The Yoga Capital of the World, exhilarating white-water river rafting, cliff jumping, and spiritual evening Ganga Aarti."
  },
  {
    id: "dest-12",
    name: "Jaipur & Udaipur, Rajasthan",
    country: "India",
    category: "cultural",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    rating: 4.94,
    reviewsCount: 510,
    startingPrice: 180,
    currency: "USD",
    tag: "Royal Budget (₹15k)",
    description: "Majestic hill forts, romantic Lake Pichola palaces, vibrant colorful bazaars, and traditional Rajasthani folk heritage."
  },
  {
    id: "dest-13",
    name: "Maldives Luxury Atolls",
    country: "Maldives",
    category: "romantic",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    rating: 4.99,
    reviewsCount: 890,
    startingPrice: 3600,
    currency: "USD",
    tag: "Ultra Luxury (₹3L-5L)",
    description: "Private overwater ocean villas, crystal lagoon seaplane transfers, underwater coral dining, and private yacht charters."
  }
];

const INITIAL_PACKAGES = [
  {
    id: "pkg-1",
    destinationId: "dest-1",
    title: "7-Day Bali Tropical Escape & Island Hopping",
    destination: "Bali & Nusa Penida, Indonesia",
    category: "beach",
    durationDays: 7,
    durationNights: 6,
    price: 699,
    originalPrice: 899,
    discount: "22% OFF",
    rating: 4.9,
    reviewsCount: 148,
    featured: true,
    groupSize: "2-12 Travelers",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80"
    ],
    overview: "Immerse yourself in tropical wonderlands, ancient Hindu water temples, cascading jungle waterfalls, and the crystal-blue lagoons of Nusa Penida.",
    highlights: [
      "Sunrise trek on Mount Batur with breakfast at summit",
      "Private speedboat tour to Kelingking Beach & Angel's Billabong",
      "Ubud Sacred Monkey Forest & Tegalalang Rice Terrace Swing",
      "Balinese Cooking Class & Traditional Spa Treatment"
    ],
    inclusions: [
      "6 nights in 4-star boutique villas with private pools",
      "Daily gourmet breakfast and 4 curated dinners",
      "All airport transfers and private AC vehicle transport",
      "English-speaking licensed tour guide",
      "All entrance tickets, speedboat passes, and gear"
    ],
    exclusions: [
      "International airfare",
      "Personal expenses & souvenir shopping",
      "Optional scuba diving certification"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Denpasar & Ubud Transfer", desc: "Welcome to Bali! Airport pickup, check-in to your Ubud jungle resort, and evening welcome dinner." },
      { day: 2, title: "Temples & Rice Terraces", desc: "Explore Tirta Empul Holy Water Temple, stroll through Tegalalang terraces, and take unforgettable photos on the iconic swings." },
      { day: 3, title: "Mount Batur Sunrise Trek", desc: "Early morning hike up Mount Batur volcano. Enjoy hot steam eggs and hot tea as dawn paints the sky." },
      { day: 4, title: "Speedboat to Nusa Penida Island", desc: "Ferry to Nusa Penida. Visit Kelingking 'T-Rex' cliff, Broken Beach, and snorkel with manta rays." },
      { day: 5, title: "Seminyak Beach & Sunset Club", desc: "Transfer to Seminyak. Afternoon chill at famous beach clubs with sunset cocktails and seafood BBQ." },
      { day: 6, title: "Uluwatu Cliff & Kecak Fire Dance", desc: "Visit cliffside Uluwatu temple perched 70m above crashing waves, followed by the enchanting Kecak fire performance." },
      { day: 7, title: "Souvenir Shopping & Departure", desc: "Relaxing Balinese flower massage, visit Ubud Art Market, and private airport drop-off." }
    ]
  },
  {
    id: "pkg-2",
    destinationId: "dest-2",
    title: "5-Day Swiss Alps Grand Glacier & Scenic Train Tour",
    destination: "Interlaken & Zermatt, Switzerland",
    category: "mountain",
    durationDays: 5,
    durationNights: 4,
    price: 1399,
    originalPrice: 1650,
    discount: "15% OFF",
    rating: 4.96,
    reviewsCount: 215,
    featured: true,
    groupSize: "4-10 Travelers",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80"
    ],
    overview: "Witness Europe's highest peaks, traverse the Glacier Express route, and gaze upon the majestic Matterhorn with VIP Swiss Travel Passes included.",
    highlights: [
      "Panoramic Glacier Express ride with 3-course lunch",
      "Ascent to Jungfraujoch - The 'Top of Europe' (3,454m)",
      "Zermatt village exploration with Matterhorn views",
      "Traditional Swiss fondue tasting in an authentic chalet"
    ],
    inclusions: [
      "4 nights in premium Alpine chalet hotels with breakfast",
      "First-Class Swiss Travel Pass covering all trains & boats",
      "Jungfraujoch & Gornergrat mountain railway passes",
      "Certified Swiss alpine guide for all walking trails"
    ],
    exclusions: [
      "International flights to Zurich/Geneva",
      "Ski gear rental (if choosing ski add-on)",
      "Travel insurance"
    ],
    itinerary: [
      { day: 1, title: "Zurich to Lucerne & Lake Cruise", desc: "Arrive in Zurich, take panoramic train to Lucerne, enjoy scenic lake steamer and historic Chapel Bridge." },
      { day: 2, title: "Interlaken & Jungfraujoch Summit", desc: "Climb by cogwheel train to Jungfraujoch, explore the Ice Palace, and view the massive Aletsch Glacier." },
      { day: 3, title: "Glacier Express to Zermatt", desc: "Board the world-famous Glacier Express panorama carriage through bridges, valleys, and deep mountain gorges." },
      { day: 4, title: "Gornergrat & Matterhorn Reflection", desc: "Ride Gornergrat railway for classic views of Matterhorn reflected in Riffelsee alpine lake. Fondue dinner." },
      { day: 5, title: "Geneva Transfer & Departure", desc: "Scenic descent to Geneva, stroll along Lake Geneva, and airport departure transfer." }
    ]
  },
  {
    id: "pkg-3",
    destinationId: "dest-3",
    title: "8-Day Japan Cherry Blossom & Samurai Heritage",
    destination: "Tokyo, Kyoto & Osaka, Japan",
    category: "cultural",
    durationDays: 8,
    durationNights: 7,
    price: 1199,
    originalPrice: 1450,
    discount: "18% OFF",
    rating: 4.91,
    reviewsCount: 310,
    featured: true,
    groupSize: "2-14 Travelers",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
    ],
    overview: "Experience the harmonious blend of cutting-edge technology and ancient traditions across Tokyo, Mount Fuji, Kyoto, and Osaka.",
    highlights: [
      "Shinkansen Bullet Train experience at 320 km/h",
      "Private Tea Ceremony in Kyoto & Geisha district walk",
      "Mount Fuji 5th Station & Lake Kawaguchi cruise",
      "Osaka Dotonbori culinary night street food tour"
    ],
    inclusions: [
      "7 nights in 4-star modern hotels & 1 authentic Ryokan with Onsen",
      "7-Day Japan Rail Pass (Unlimited Bullet Trains)",
      "Daily breakfast + 3 authentic Kaiseki dinners",
      "English-speaking licensed Japanese guides"
    ],
    exclusions: ["Flight tickets", "Beverages not specified", "Personal shopping"],
    itinerary: [
      { day: 1, title: "Arrive in Tokyo & Shinjuku Nightlights", desc: "Tokyo Haneda/Narita pickup. Check-in and evening walk through neon Shibuya crossing and Shinjuku." },
      { day: 2, title: "Asakusa, Senso-ji & Akihabara", desc: "Visit Tokyo's oldest temple, stroll Nakamise street, and explore the futuristic electronics and anime capital." },
      { day: 3, title: "Mt. Fuji & Hakone Hot Springs", desc: "Day excursion to iconic Mount Fuji. Ride Hakone ropeway and cruise Lake Ashi with Fuji backdrop." },
      { day: 4, title: "Bullet Train to Ancient Kyoto", desc: "Zoom to Kyoto on the Shinkansen. Check into traditional Ryokan with soothing thermal onsen baths." },
      { day: 5, title: "Fushimi Inari & Arashiyama Bamboo", desc: "Walk through 10,000 vermilion Torii gates and walk the mystical soaring Arashiyama bamboo forest." },
      { day: 6, title: "Kinkaku-ji Golden Pavilion & Gion", desc: "Marvel at Kinkaku-ji temple reflected in mirror pond. Evening Gion lantern walk looking for Geiko." },
      { day: 7, title: "Osaka Castle & Dotonbori Feast", desc: "Explore Osaka Castle gardens and savor Takoyaki, Okonomiyaki, and Wagyu beef along neon Dotonbori." },
      { day: 8, title: "Departure from Osaka / Kansai", desc: "Last-minute souvenir shopping in Kansai before your departure transfer." }
    ]
  },
  {
    id: "pkg-4",
    destinationId: "dest-4",
    title: "6-Day Santorini & Mykonos Cycladic Dream Cruise",
    destination: "Santorini & Mykonos, Greece",
    category: "romantic",
    durationDays: 6,
    durationNights: 5,
    price: 999,
    originalPrice: 1250,
    discount: "20% OFF",
    rating: 4.94,
    reviewsCount: 189,
    featured: false,
    groupSize: "2-8 Travelers",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80"
    ],
    overview: "Sunbathe in luxury atop dramatic volcanic cliffs, cruise turquoise waters aboard a catamaran, and dance through Mykonos old town.",
    highlights: [
      "Luxury Sunset Catamaran Cruise in Santorini Caldera",
      "Wine tasting tour at 3 cliffside Assyrtiko vineyards",
      "Mykonos Little Venice & iconic Windmills tour",
      "Private beach day at Red Beach & Perissa Black Sand"
    ],
    inclusions: [
      "5 nights in luxury cliffside suites with caldera views",
      "Daily breakfast on private sea-view balconies",
      "High-speed ferry between Santorini & Mykonos",
      "Catamaran sailing cruise with BBQ & Greek wine"
    ],
    exclusions: ["International flights", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrival in Santorini & Oia Sunset", desc: "Transfer to Oia hotel. Watch the sunset illuminate the caldera with champagne." },
      { day: 2, title: "Caldera Catamaran Sailing", desc: "Sail past volcanic hot springs, Red Beach, and White Beach. Snorkeling and fresh seafood lunch." },
      { day: 3, title: "Fira, Pyrgos & Wine Tour", desc: "Discover medieval Pyrgos village and savor 8 volcanic wine varieties at Santo Wines." },
      { day: 4, title: "Ferry to Mykonos & Little Venice", desc: "Fast ferry to Mykonos. Check-in and evening stroll through cobblestone streets to Little Venice." },
      { day: 5, title: "Delos Island Ruins & Beach Club", desc: "Morning ferry to sacred archaeological island of Delos. Afternoon beach club experience." },
      { day: 6, title: "Departure", desc: "Breakfast by the Aegean Sea and airport transfer." }
    ]
  },
  {
    id: "pkg-5",
    destinationId: "dest-5",
    title: "5-Day Dubai Ultra-Luxury Skyline & Desert Safari",
    destination: "Dubai & Abu Dhabi, UAE",
    category: "city",
    durationDays: 5,
    durationNights: 4,
    price: 799,
    originalPrice: 999,
    discount: "20% OFF",
    rating: 4.87,
    reviewsCount: 165,
    featured: false,
    groupSize: "2-15 Travelers",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
    ],
    overview: "Discover the architectural wonders, gold souks, futuristic museums, and luxury desert glamping in the United Arab Emirates.",
    highlights: [
      "Burj Khalifa 148th Floor 'At The Top SKY' VIP entry",
      "Red Dune 4x4 Desert Safari with Falconry & BBQ Show",
      "Abu Dhabi Sheikh Zayed Grand Mosque & Louvre tour",
      "Dubai Marina Luxury Yacht cruise with buffet"
    ],
    inclusions: [
      "4 nights in 5-star Dubai Marina luxury hotel",
      "Daily buffet breakfast & VIP Desert BBQ banquet",
      "Private luxury AC transport for all excursions",
      "All VIP fast-track monument tickets"
    ],
    exclusions: ["Flight tickets", "Tourism Dirham hotel fee", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrive in Dubai & Marina Dhow Cruise", desc: "Luxury airport pickup, check-in, and evening 2-hour Marina dinner cruise." },
      { day: 2, title: "Burj Khalifa, Dubai Mall & Fountain Show", desc: "Ascend the world's tallest tower, explore Dubai Aquarium, and watch choreographed fountains." },
      { day: 3, title: "Red Dune Desert Safari & Bedouin Camp", desc: "Thrilling dune bashing, sandboarding, camel rides, tanoura dance, and open-air BBQ." },
      { day: 4, title: "Abu Dhabi Grand Mosque & Louvre", desc: "Day trip to Abu Dhabi to visit the Grand Mosque and world-class Louvre Abu Dhabi." },
      { day: 5, title: "Old Dubai Souks & Departure", desc: "Cross Dubai Creek on an Abra boat, shop Gold & Spice Souks, and head to DXB airport." }
    ]
  },
  {
    id: "pkg-6",
    destinationId: "dest-6",
    title: "6-Day Costa Rica Volcano, Cloud Forest & Rafting",
    destination: "Arenal & Monteverde, Costa Rica",
    category: "adventure",
    durationDays: 6,
    durationNights: 5,
    price: 849,
    originalPrice: 1050,
    discount: "19% OFF",
    rating: 4.93,
    reviewsCount: 142,
    featured: false,
    groupSize: "2-10 Travelers",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    ],
    overview: "Pure Pura Vida adventure! Hike active volcano trails, soak in thermal river springs, and zip-line through Monteverde canopy.",
    highlights: [
      "Ziplining over canopy with Superman wire & Tarzan swing",
      "Arenal Volcano hike & Tabacón Natural Hot Springs",
      "Class III-IV Pacuare River White Water Rafting",
      "Night jungle safari searching for red-eyed tree frogs & sloths"
    ],
    inclusions: [
      "5 nights in eco-lodges with volcano & rainforest views",
      "All adventure gear, safety equipment, and certified guides",
      "Daily farm-to-table breakfast and 3 adventure lunches",
      "Private group transportation across all regions"
    ],
    exclusions: ["International flights", "Gratuities for river guides"],
    itinerary: [
      { day: 1, title: "Arrive in San Jose & Arenal Transfer", desc: "Scenic drive through pineapple and coffee plantations to Arenal Volcano." },
      { day: 2, title: "Volcano Trails & Tabacón Hot Springs", desc: "Hike over 1968 lava flow fields, followed by soothing baths in natural geothermal hot springs." },
      { day: 3, title: "Lake Arenal Boat & Monteverde Cloud Forest", desc: "Cross Lake Arenal by boat and climb into the misty cloud forest of Monteverde." },
      { day: 4, title: "Canopy Zipline & Hanging Bridges", desc: "Fly through the clouds on 2.5km of ziplines and walk high suspension bridges." },
      { day: 5, title: "White Water Rafting Expedition", desc: "Conquer exhilarating class III & IV rapids through canyon gorges and waterfalls." },
      { day: 6, title: "Manuel Antonio Beach & Departure", desc: "Relax on Manuel Antonio's white sand beaches before return flight." }
    ]
  },
  {
    id: "pkg-7",
    destinationId: "dest-9",
    title: "4-Day Goa Beach & Heritage Backpacking (Low Budget)",
    destination: "North & South Goa, India",
    category: "budget",
    durationDays: 4,
    durationNights: 3,
    price: 120,
    originalPrice: 160,
    discount: "25% OFF",
    rating: 4.88,
    reviewsCount: 230,
    featured: true,
    groupSize: "2-10 Travelers",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
    ],
    overview: "Incredible value budget getaway! Explore Vagator & Anjuna cliffs, Portuguese churches of Old Goa, and Mandovi river sunset cruises.",
    highlights: [
      "Mandovi River Sunset Cruise with Goan folk music",
      "Aguada Fort & Chapora 'Dil Chahta Hai' Fort exploration",
      "Anjuna flea market & beach shack seafood dinner",
      "Dudhsagar Waterfall Jeep safari trek"
    ],
    inclusions: [
      "3 nights in cozy boutique beachside hostel / hotel",
      "Daily breakfast included",
      "Scooter / vehicle transport allowance",
      "Sunset boat cruise tickets"
    ],
    exclusions: ["Personal bar bills & water sports"],
    itinerary: [
      { day: 1, title: "Arrival in Goa & Anjuna Sunset", desc: "Check-in to beach hotel, evening chill at Curlies Anjuna beach shack with live acoustic music." },
      { day: 2, title: "Forts & Watersports in North Goa", desc: "Visit Aguada Fort, lighthouse, and enjoy jet ski and parasailing at Calangute." },
      { day: 3, title: "Old Goa Heritage & Mandovi Cruise", desc: "Explore Basilica of Bom Jesus and board the 2-hour sunset cruise on Mandovi River." },
      { day: 4, title: "South Goa & Departure", desc: "Relax on Palolem beach before heading to airport/railway station." }
    ]
  },
  {
    id: "pkg-8",
    destinationId: "dest-10",
    title: "5-Day Manali & Kasol Parvati Valley Alpine Trek",
    destination: "Himachal Pradesh, India",
    category: "mountain",
    durationDays: 5,
    durationNights: 4,
    price: 145,
    originalPrice: 190,
    discount: "24% OFF",
    rating: 4.94,
    reviewsCount: 312,
    featured: true,
    groupSize: "4-12 Travelers",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
    ],
    overview: "Crisp mountain air, riverside cafes in Kasol, natural thermal springs in Kheerganga, and snow thrills in Solang Valley.",
    highlights: [
      "Kheerganga Himalayan trek with natural hot water springs bath",
      "Riverside luxury Swiss tent camping in Kasol with bonfire",
      "Solang Valley snow activities & Atal Tunnel drive",
      "Old Manali hippie cafes & Hadimba Temple walk"
    ],
    inclusions: [
      "4 nights (2 nights hotel + 2 nights mountain camps)",
      "Daily breakfast and warm camp dinners",
      "Delhi to Manali AC Volvo transfers",
      "Certified Himalayan trek leader & safety equipment"
    ],
    exclusions: ["Personal gear rental"],
    itinerary: [
      { day: 1, title: "Arrival in Manali & Old Manali Stroll", desc: "Check-in to pine view cottage, visit Hadimba Temple and cozy woodfire pizza cafes in Old Manali." },
      { day: 2, title: "Solang Valley & Atal Tunnel", desc: "Experience snow adventures, zip-lining, and cross the engineering marvel of Atal Tunnel." },
      { day: 3, title: "Kasol Parvati River & Manikaran", desc: "Transfer to Kasol. Walk along crystal Parvati river and taste authentic Israeli food." },
      { day: 4, title: "Kheerganga Trek & Night Camp", desc: "Trek through waterfalls and pine forests to Kheerganga summit. Night bonfire under stargazing skies." },
      { day: 5, title: "Descent to Kasol & Return", desc: "Morning hot spring dip, leisurely descent, and return Volvo transfer." }
    ]
  },
  {
    id: "pkg-9",
    destinationId: "dest-11",
    title: "3-Day Rishikesh White Water Rafting & Ganga Camp",
    destination: "Rishikesh, Uttarakhand, India",
    category: "adventure",
    durationDays: 3,
    durationNights: 2,
    price: 120,
    originalPrice: 150,
    discount: "20% OFF",
    rating: 4.92,
    reviewsCount: 198,
    featured: false,
    groupSize: "2-12 Travelers",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
    ],
    overview: "Conquer grade III+ rapids on the sacred Ganges, jump off 30ft cliffs, and enjoy riverside music and barbecue under the stars.",
    highlights: [
      "16km exhilarating Marine Drive to Shivpuri river rafting",
      "Cliff jumping and body surfing under expert guidance",
      "Riverside Swiss camp stay with swimming pool and volleyball",
      "Spiritual Triveni Ghat Ganga Aarti at sunset"
    ],
    inclusions: [
      "2 nights in riverside luxury alpine camps",
      "All meals: 2 Breakfasts, 2 Lunches, 2 Dinners + Evening Snacks",
      "16km river rafting expedition with full safety gear",
      "Campfire with acoustic music"
    ],
    exclusions: ["Bungee jumping ticket (optional add-on)"],
    itinerary: [
      { day: 1, title: "Camp Check-in & Triveni Ghat Aarti", desc: "Arrival at riverside camp. Evening trip to Triveni Ghat for magical flame Aarti ceremony." },
      { day: 2, title: "16km Ganga Rafting & Cliff Jump", desc: "Battle Roller Coaster & Golf Course rapids. Cliff jumping into emerald waters. Evening barbecue." },
      { day: 3, title: "Beatles Ashram & Departure", desc: "Morning yoga session by the river, visit famous Beatles Ashram, and departure." }
    ]
  },
  {
    id: "pkg-10",
    destinationId: "dest-13",
    title: "7-Day Maldives Ultra-Luxury Overwater Ocean Villa",
    destination: "Baa Atoll, Maldives",
    category: "romantic",
    durationDays: 7,
    durationNights: 6,
    price: 3600,
    originalPrice: 4200,
    discount: "14% OFF",
    rating: 4.99,
    reviewsCount: 420,
    featured: true,
    groupSize: "2 Travelers (Couples / VIP)",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80"
    ],
    overview: "The pinnacle of tropical indulgence. Stay in an ultra-luxurious private pool villa perched over crystal turquoise coral lagoons.",
    highlights: [
      "Seaplane transfers with aerial coral atoll views",
      "Private champagne sunset cruise with wild dolphin watching",
      "Underwater 5-course gourmet dining experience",
      "Floating breakfast in your private villa infinity pool"
    ],
    inclusions: [
      "6 nights in 5-star Deluxe Sunset Overwater Pool Villa",
      "All-Inclusive Dine Around: 6 restaurants & premium beverages",
      "Roundtrip seaplane transfers from Male airport",
      "Couples overwater Ayurvedic spa massage"
    ],
    exclusions: ["International airfare"],
    itinerary: [
      { day: 1, title: "Seaplane Arrival & Overwater Check-in", desc: "Scenic seaplane landing right at resort jetty. Welcome Dom Pérignon and villa tour." },
      { day: 2, title: "Snorkeling Safari & Manta Rays", desc: "Snorkel in Hanifaru Bay UNESCO biosphere reserve among gentle manta rays." },
      { day: 3, title: "Underwater Restaurant Dining", desc: "Dine 6 meters below ocean surface watching tropical marine life glide past your table." },
      { day: 4, title: "Private Yacht & Sunset Dolphins", desc: "Charter luxury yacht for private sandbank picnic and sunset dolphin cruise." },
      { day: 5, title: "Floating Breakfast & Spa Day", desc: "Wake up to floating breakfast in your pool followed by soothing overwater massage." },
      { day: 6, title: "Starlit Beach Cinema & Candlelight Dinner", desc: "Private gourmet dinner on private beach beneath blanket of stars." },
      { day: 7, title: "Seaplane Return Transfer", desc: "Final morning lagoon swim before seaplane transfer back to Male." }
    ]
  }
];

const INITIAL_HOTELS = [
  {
    id: "hotel-1",
    name: "The Royal Pita Maha Resort",
    city: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewsCount: 420,
    pricePerNight: 240,
    stars: 5,
    amenities: ["Free WiFi", "Infinity Pool", "Ayurvedic Spa", "Breakfast Included", "Private River Villa", "Yoga Deck"],
    roomTypes: [
      { name: "Deluxe Pool Villa", price: 240, maxGuests: 2, bed: "1 King Bed" },
      { name: "Royal Sanctuary Suite", price: 380, maxGuests: 3, bed: "1 King Bed + 1 Sofa" },
      { name: "Presidential 2-Bedroom Villa", price: 620, maxGuests: 5, bed: "2 King Beds" }
    ],
    description: "Nestled along the sacred Ayung River in Ubud, offering dramatic canyon views and Balinese art architecture."
  },
  {
    id: "hotel-2",
    name: "Grand Hotel Zermatterhof",
    city: "Zermatt",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    rating: 4.95,
    reviewsCount: 310,
    pricePerNight: 450,
    stars: 5,
    amenities: ["Matterhorn View", "Alpine Spa & Sauna", "Michelin Dining", "Ski Valet", "Horse-drawn Carriage Transfer", "Free WiFi"],
    roomTypes: [
      { name: "Classic Alpine Room", price: 450, maxGuests: 2, bed: "1 Queen Bed" },
      { name: "Matterhorn View Chalet Suite", price: 690, maxGuests: 3, bed: "1 King Bed" },
      { name: "Penthouse Panoramic Suite", price: 1100, maxGuests: 4, bed: "2 King Beds" }
    ],
    description: "Historic luxury in the heart of car-free Zermatt with unobstructed panoramic vistas of the Matterhorn."
  },
  {
    id: "hotel-3",
    name: "Hoshinoya Kyoto Luxury Ryokan",
    city: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    rating: 4.92,
    reviewsCount: 280,
    pricePerNight: 390,
    stars: 5,
    amenities: ["Private Boat Arrival", "Traditional Onsen Bath", "Kaiseki Breakfast", "Tatami Rooms", "Zen Garden", "Tea Pavilion"],
    roomTypes: [
      { name: "Tsukihana Riverside Room", price: 390, maxGuests: 2, bed: "2 Futon Beds" },
      { name: "Yamanoha Maple View Suite", price: 560, maxGuests: 3, bed: "King Tatami Bed" }
    ],
    description: "An aristocratic riverside retreat reached by wooden boat along the Oi River amidst maple forests."
  },
  {
    id: "hotel-4",
    name: "Canaves Oia Suites",
    city: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.98,
    reviewsCount: 512,
    pricePerNight: 420,
    stars: 5,
    amenities: ["Cave Pool with Caldera View", "Gourmet Breakfast on Balcony", "Sunset Bar", "Concierge Yacht", "Spa", "Free WiFi"],
    roomTypes: [
      { name: "Junior Cave Suite", price: 420, maxGuests: 2, bed: "1 King Bed" },
      { name: "Superior Caldera Suite with Plunge Pool", price: 650, maxGuests: 2, bed: "1 King Bed" },
      { name: "Infinity Pool Villa", price: 980, maxGuests: 4, bed: "2 King Beds" }
    ],
    description: "17th-century cave architecture carved into volcanic cliffs, offering the world's most romantic caldera views."
  },
  {
    id: "hotel-5",
    name: "Atlantis The Royal Resort",
    city: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    rating: 4.89,
    reviewsCount: 650,
    pricePerNight: 510,
    stars: 5,
    amenities: ["Cloud 22 Sky Pool", "Private Beach", "Waterpark Access", "17 Restaurants", "Helipad", "Luxury Spa"],
    roomTypes: [
      { name: "Seascape King Room", price: 510, maxGuests: 2, bed: "1 King Bed" },
      { name: "Palm View Sky Suite", price: 820, maxGuests: 3, bed: "1 King Bed + Lounge" },
      { name: "Sky Pool Villa", price: 1750, maxGuests: 4, bed: "2 King Beds" }
    ],
    description: "An ultra-luxury architectural marvel on the Palm Jumeirah redefining modern luxury."
  }
];

const INITIAL_FLIGHTS = [
  {
    id: "flt-1",
    airline: "Emirates",
    airlineCode: "EK-358",
    logo: "✈️",
    origin: "New York (JFK)",
    originCity: "New York",
    destination: "Dubai (DXB)",
    destinationCity: "Dubai",
    departureTime: "22:20",
    arrivalTime: "19:30 (+1)",
    duration: "13h 10m",
    stops: "Non-stop",
    classes: [
      { name: "Economy", price: 680, baggage: "2 x 23kg", seatPitch: "32 in" },
      { name: "Business", price: 2450, baggage: "2 x 32kg", seatPitch: "Lie-Flat" },
      { name: "First Class", price: 5800, baggage: "3 x 32kg", seatPitch: "Private Suite" }
    ]
  },
  {
    id: "flt-2",
    airline: "Singapore Airlines",
    airlineCode: "SQ-942",
    logo: "✈️",
    origin: "London (LHR)",
    originCity: "London",
    destination: "Bali (DPS)",
    destinationCity: "Bali",
    departureTime: "11:25",
    arrivalTime: "12:10 (+1)",
    duration: "16h 45m",
    stops: "1 Stop (SIN)",
    classes: [
      { name: "Economy", price: 740, baggage: "2 x 23kg", seatPitch: "32 in" },
      { name: "Premium Economy", price: 1290, baggage: "2 x 23kg", seatPitch: "38 in" },
      { name: "Business", price: 2890, baggage: "2 x 32kg", seatPitch: "Lie-Flat" }
    ]
  },
  {
    id: "flt-3",
    airline: "Swiss International",
    airlineCode: "LX-18",
    logo: "✈️",
    origin: "San Francisco (SFO)",
    originCity: "San Francisco",
    destination: "Zurich (ZRH)",
    destinationCity: "Zurich",
    departureTime: "19:45",
    arrivalTime: "15:40 (+1)",
    duration: "10h 55m",
    stops: "Non-stop",
    classes: [
      { name: "Economy", price: 810, baggage: "1 x 23kg", seatPitch: "31 in" },
      { name: "Business", price: 2750, baggage: "2 x 32kg", seatPitch: "Lie-Flat" }
    ]
  },
  {
    id: "flt-4",
    airline: "Qatar Airways",
    airlineCode: "QR-802",
    logo: "✈️",
    origin: "Paris (CDG)",
    originCity: "Paris",
    destination: "Tokyo (NRT)",
    destinationCity: "Tokyo",
    departureTime: "15:10",
    arrivalTime: "17:55 (+1)",
    duration: "17h 45m",
    stops: "1 Stop (DOH)",
    classes: [
      { name: "Economy", price: 780, baggage: "2 x 23kg", seatPitch: "32 in" },
      { name: "QSuite Business", price: 3100, baggage: "2 x 32kg", seatPitch: "Private Suite" }
    ]
  }
];

const INITIAL_GALLERY = [
  {
    id: "gal-1",
    title: "Sunrise at Mount Batur",
    location: "Bali, Indonesia",
    category: "nature",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    photographer: "Alexandre Chambon",
    likes: 428
  },
  {
    id: "gal-2",
    title: "Matterhorn Peak in Summer",
    location: "Zermatt, Switzerland",
    category: "mountains",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    photographer: "Lucas Favre",
    likes: 615
  },
  {
    id: "gal-3",
    title: "Fushimi Inari Torii Shrine",
    location: "Kyoto, Japan",
    category: "culture",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    photographer: "Su San Lee",
    likes: 589
  },
  {
    id: "gal-4",
    title: "Oia Sunset & Blue Domes",
    location: "Santorini, Greece",
    category: "beaches",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    photographer: "Heidi Kaden",
    likes: 830
  },
  {
    id: "gal-5",
    title: "Futuristic Burj Khalifa Lights",
    location: "Dubai, UAE",
    category: "cities",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    photographer: "Zheng Zhou",
    likes: 390
  },
  {
    id: "gal-6",
    title: "Misty Arenal Cloud Forest",
    location: "Arenal, Costa Rica",
    category: "nature",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    photographer: "Javier Trueba",
    likes: 312
  },
  {
    id: "gal-7",
    title: "Shibuya Crossing at Dusk",
    location: "Tokyo, Japan",
    category: "cities",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    photographer: "Jezael Melgoza",
    likes: 742
  },
  {
    id: "gal-8",
    title: "Positano Cliffside Beauty",
    location: "Amalfi Coast, Italy",
    category: "beaches",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    photographer: "Ricardo Gomez Angel",
    likes: 671
  }
];

const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    author: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    destination: "Bali Tropical Escape Tour",
    rating: 5,
    date: "August 18, 2026",
    comment: "The 7-day Bali trip was the most seamless, breathtaking vacation of my life. The villa in Ubud was sheer luxury, and our guide made us feel like family. Snorkeling with manta rays in Nusa Penida is a memory I will cherish forever!",
    likes: 47,
    status: "approved"
  },
  {
    id: "rev-2",
    author: "Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    destination: "Swiss Alps Grand Glacier Tour",
    rating: 5,
    date: "July 29, 2026",
    comment: "WanderLust arranged everything down to the minute. First-class Swiss rail passes and the Glacier Express meal were world class. The Matterhorn view from our hotel room took our breath away.",
    likes: 38,
    status: "approved"
  },
  {
    id: "rev-3",
    author: "Sophie Chen",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    destination: "Japan Heritage & Bullet Train Tour",
    rating: 5,
    date: "June 14, 2026",
    comment: "From the traditional tea ceremony in Kyoto to the neon buzz of Shinjuku, every single day was packed with authentic Japanese culture. Will definitely book my next travel through WanderLust!",
    likes: 52,
    status: "approved"
  }
];

const INITIAL_BOOKINGS = [
  {
    id: "BK-9021",
    type: "tour",
    itemTitle: "7-Day Bali Tropical Escape & Island Hopping",
    customerName: "Elena Rostova",
    customerEmail: "elena@example.com",
    customerPhone: "+1 (555) 234-5678",
    date: "2026-09-15",
    travelers: 2,
    totalAmount: 1398,
    status: "Confirmed",
    paymentMethod: "Credit Card (Visa ending in 4242)",
    bookingDate: "2026-08-10",
    specialRequests: "Vegetarian meals preferred"
  },
  {
    id: "BK-9022",
    type: "hotel",
    itemTitle: "Grand Hotel Zermatterhof (Matterhorn View Suite)",
    customerName: "Marcus Vance",
    customerEmail: "marcus.v@example.com",
    customerPhone: "+1 (555) 987-6543",
    date: "2026-10-02 to 2026-10-06",
    travelers: 2,
    totalAmount: 1800,
    status: "Confirmed",
    paymentMethod: "PayPal",
    bookingDate: "2026-08-12",
    specialRequests: "High floor requested"
  },
  {
    id: "BK-9023",
    type: "flight",
    itemTitle: "Emirates (EK-358) - JFK to DXB",
    customerName: "David Miller",
    customerEmail: "david.m@example.com",
    customerPhone: "+44 7700 900123",
    date: "2026-09-20",
    travelers: 1,
    totalAmount: 680,
    status: "Pending",
    paymentMethod: "Apple Pay",
    bookingDate: "2026-08-25",
    specialRequests: "Window seat"
  }
];

const INITIAL_USERS = [
  {
    id: "usr-admin",
    name: "Rahul Raj (Admin)",
    email: "rahul.raj@wanderlust.com",
    password: "admin",
    role: "Admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    joinedDate: "2025-01-10",
    status: "Active"
  },
  {
    id: "usr-1",
    name: "John Traveler",
    email: "john@traveler.com",
    password: "user123",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    joinedDate: "2026-03-12",
    status: "Active"
  },
  {
    id: "usr-2",
    name: "Elena Rostova",
    email: "elena@example.com",
    password: "password",
    role: "User",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    joinedDate: "2026-05-20",
    status: "Active"
  }
];
