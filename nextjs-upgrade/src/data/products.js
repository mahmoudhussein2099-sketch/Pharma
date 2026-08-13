export const products = [
  // Prescription Medicines - Antibiotics
  {
    id: 1,
    name: "Amoxicillin 500mg",
    price: 25.50,
    originalPrice: 30.00,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop",
    category: "prescription",
    subcategory: "Antibiotics",
    rating: 4.8,
    reviews: 245,
    discount: 15,
    inStock: true,
    description: "Broad-spectrum antibiotic for bacterial infections"
  },
  {
    id: 2,
    name: "Azithromycin 250mg",
    price: 35.75,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=300&h=300&fit=crop",
    category: "prescription",
    subcategory: "Antibiotics",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    description: "Macrolide antibiotic for respiratory infections"
  },
  
  // Blood Pressure Medications
  {
    id: 3,
    name: "Lisinopril 10mg",
    price: 18.25,
    image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=300&h=300&fit=crop",
    category: "prescription",
    subcategory: "Blood Pressure",
    rating: 4.7,
    reviews: 312,
    inStock: true,
    description: "ACE inhibitor for high blood pressure"
  },
  {
    id: 4,
    name: "Amlodipine 5mg",
    price: 22.00,
    originalPrice: 28.00,
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&h=300&fit=crop",
    category: "prescription",
    subcategory: "Blood Pressure",
    rating: 4.5,
    reviews: 198,
    discount: 21,
    inStock: true,
    description: "Calcium channel blocker for hypertension"
  },

  // Pain Relief
  {
    id: 5,
    name: "Panadol Extra",
    price: 15.50,
    originalPrice: 18.00,
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=300&h=300&fit=crop",
    category: "otc",
    subcategory: "Pain Relief",
    rating: 4.8,
    reviews: 456,
    discount: 14,
    inStock: true,
    description: "Fast relief from headaches and body pain"
  },
  {
    id: 6,
    name: "Ibuprofen 400mg",
    price: 12.75,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&h=300&fit=crop",
    category: "otc",
    subcategory: "Pain Relief",
    rating: 4.6,
    reviews: 289,
    inStock: true,
    description: "Anti-inflammatory pain reliever"
  },

  // Cold & Flu
  {
    id: 22,
    name: "Cold & Flu Relief Tablets",
    price: 18.75,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&h=300&fit=crop",
    category: "otc",
    subcategory: "Cold & Flu",
    rating: 4.4,
    reviews: 167,
    inStock: true,
    description: "Multi-symptom cold and flu relief"
  },

  // Vitamins & Supplements
  {
    id: 7,
    name: "Vitamin C 1000mg",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
    category: "vitamins",
    subcategory: "Multivitamins",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    description: "Immune system support with high-dose Vitamin C"
  },
  {
    id: 8,
    name: "Omega-3 Fish Oil",
    price: 55.25,
    originalPrice: 65.00,
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&h=300&fit=crop",
    category: "vitamins",
    subcategory: "Omega-3",
    rating: 4.8,
    reviews: 178,
    discount: 15,
    inStock: true,
    description: "Heart and brain health support"
  },
  {
    id: 9,
    name: "Multivitamin Complex",
    price: 38.50,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&h=300&fit=crop",
    category: "vitamins",
    subcategory: "Multivitamins",
    rating: 4.5,
    reviews: 345,
    inStock: true,
    description: "Complete daily vitamin and mineral supplement"
  },
  {
    id: 23,
    name: "Vitamin D3 2000 IU",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=300&h=300&fit=crop",
    category: "vitamins",
    subcategory: "Vitamin D",
    rating: 4.6,
    reviews: 289,
    inStock: true,
    description: "Bone health and immune support"
  },

  // Baby Care
  {
    id: 10,
    name: "Baby Formula Stage 1",
    price: 89.50,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    category: "baby",
    subcategory: "Baby Formula",
    rating: 4.9,
    reviews: 567,
    inStock: true,
    description: "Complete nutrition for newborns 0-6 months"
  },
  {
    id: 11,
    name: "Premium Diapers Size 3",
    price: 45.75,
    originalPrice: 52.00,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
    category: "baby",
    subcategory: "Diapers & Wipes",
    rating: 4.8,
    reviews: 423,
    discount: 12,
    inStock: true,
    description: "Ultra-absorbent diapers with 12-hour protection"
  },
  {
    id: 24,
    name: "Baby Skincare Lotion",
    price: 22.50,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop",
    category: "baby",
    subcategory: "Baby Skincare",
    rating: 4.7,
    reviews: 198,
    inStock: true,
    description: "Gentle moisturizing lotion for baby's delicate skin"
  },

  // Beauty & Personal Care
  {
    id: 12,
    name: "Anti-Aging Face Cream",
    price: 75.00,
    originalPrice: 95.00,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    category: "beauty",
    subcategory: "Skincare Products",
    rating: 4.6,
    reviews: 234,
    discount: 21,
    inStock: true,
    description: "Reduces wrinkles and fine lines"
  },
  {
    id: 13,
    name: "Hydrating Shampoo",
    price: 28.50,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=300&fit=crop",
    category: "beauty",
    subcategory: "Hair Care",
    rating: 4.4,
    reviews: 189,
    inStock: true,
    description: "Moisturizing shampoo for dry hair"
  },
  {
    id: 14,
    name: "SPF 50 Sunscreen",
    price: 32.25,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop",
    category: "beauty",
    subcategory: "Sunscreen",
    rating: 4.7,
    reviews: 298,
    inStock: true,
    description: "Broad spectrum UV protection"
  },
  {
    id: 25,
    name: "Electric Toothbrush",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&h=300&fit=crop",
    category: "beauty",
    subcategory: "Oral Care",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    description: "Advanced plaque removal with timer"
  },

  // Medical Devices
  {
    id: 15,
    name: "Digital Blood Pressure Monitor",
    price: 125.00,
    originalPrice: 150.00,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop",
    category: "medical",
    subcategory: "Blood Pressure Monitors",
    rating: 4.8,
    reviews: 156,
    discount: 17,
    inStock: true,
    description: "Accurate home blood pressure monitoring"
  },
  {
    id: 16,
    name: "Digital Thermometer",
    price: 25.75,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop",
    category: "medical",
    subcategory: "Thermometers",
    rating: 4.6,
    reviews: 234,
    inStock: true,
    description: "Fast and accurate temperature reading"
  },
  {
    id: 17,
    name: "Glucose Meter Kit",
    price: 85.50,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=300&fit=crop",
    category: "medical",
    subcategory: "Glucose Meters",
    rating: 4.7,
    reviews: 178,
    inStock: true,
    description: "Complete blood glucose monitoring system"
  },
  {
    id: 26,
    name: "Pulse Oximeter",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=300&h=300&fit=crop",
    category: "medical",
    subcategory: "Pulse Oximeters",
    rating: 4.5,
    reviews: 134,
    inStock: true,
    description: "Measures blood oxygen levels and pulse rate"
  },

  // First Aid & Safety
  {
    id: 18,
    name: "First Aid Kit Complete",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1603398938795-b6d0b6b1b1b1?w=300&h=300&fit=crop",
    category: "firstaid",
    subcategory: "First Aid Kits",
    rating: 4.8,
    reviews: 267,
    inStock: true,
    description: "Complete emergency first aid supplies"
  },
  {
    id: 19,
    name: "Hand Sanitizer 500ml",
    price: 18.25,
    originalPrice: 22.00,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop",
    category: "firstaid",
    subcategory: "Hand Sanitizers",
    rating: 4.5,
    reviews: 345,
    discount: 17,
    inStock: true,
    description: "70% alcohol-based hand sanitizer"
  },
  {
    id: 27,
    name: "Surgical Face Masks",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=300&h=300&fit=crop",
    category: "firstaid",
    subcategory: "Face Masks",
    rating: 4.3,
    reviews: 289,
    inStock: true,
    description: "3-layer protective face masks (50 pack)"
  },

  // Eye Care
  {
    id: 20,
    name: "Daily Contact Lenses",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=300&fit=crop",
    category: "eye",
    subcategory: "Contact Lenses",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    description: "Comfortable daily disposable lenses"
  },
  {
    id: 21,
    name: "Lubricating Eye Drops",
    price: 15.75,
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop",
    category: "eye",
    subcategory: "Eye Drops",
    rating: 4.4,
    reviews: 123,
    inStock: true,
    description: "Relief for dry and irritated eyes"
  },
  {
    id: 28,
    name: "Reading Glasses +2.0",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=300&fit=crop",
    category: "eye",
    subcategory: "Reading Glasses",
    rating: 4.2,
    reviews: 98,
    inStock: true,
    description: "Comfortable reading glasses with anti-glare coating"
  }
];

export const getProductsByCategory = (category, subcategory = null) => {
  let filtered = products.filter(product => product.category === category);
  if (subcategory) {
    filtered = filtered.filter(product => product.subcategory === subcategory);
  }
  return filtered;
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.rating >= 4.5).slice(0, 8);
};

export const getDiscountedProducts = () => {
  return products.filter(product => product.discount).slice(0, 6);
};