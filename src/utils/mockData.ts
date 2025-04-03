export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  features?: string[];
  colors?: string[];
  sizes?: string[];
  stock: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
  lat: number;
  lng: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  tracking?: {
    number: string;
    carrier: string;
    estimatedDelivery: string;
    currentLocation?: string;
    events: {
      date: string;
      status: string;
      location: string;
    }[];
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Earbuds',
    description:
      'Experience crystal-clear sound and seamless connectivity with our premium wireless earbuds. Featuring active noise cancellation, water resistance, and a sleek, ergonomic design for all-day comfort.',
    price: 149.99,
    oldPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1606751071446-a9104d9aba9a?q=80&w=1000',
    category: 'Audio',
    rating: 4.8,
    reviewCount: 124,
    features: [
      'Active noise cancellation',
      '24-hour battery life',
      'Water and sweat resistant',
      'Touch controls',
      'Wireless charging case',
    ],
    colors: ['Black', 'White', 'Navy'],
    stock: 45,
  },
  {
    id: '2',
    name: 'Smart Home Hub',
    description:
      'Control your entire smart home ecosystem with this intuitive hub. Connect all your devices, create automated routines, and enjoy the convenience of voice control.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1558002038-1055e2eae2f7?q=80&w=1000',
    category: 'Smart Home',
    rating: 4.5,
    reviewCount: 86,
    features: [
      'Voice control compatibility',
      'Intuitive app interface',
      'Works with 1000+ smart devices',
      'Energy usage monitoring',
      'Custom automation scenarios',
    ],
    colors: ['White', 'Black'],
    stock: 23,
  },
  {
    id: '3',
    name: 'Ultra-Thin Laptop',
    description:
      "Powerful performance meets elegant design in our ultra-thin laptop. With a stunning display, lightning-fast processor, and all-day battery life, it's perfect for work and play.",
    price: 1299.99,
    oldPrice: 1499.99,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000',
    category: 'Computers',
    rating: 4.9,
    reviewCount: 215,
    features: [
      '14-inch Retina display',
      'Next-gen processor',
      '16GB unified memory',
      '512GB SSD storage',
      'All-day battery life',
    ],
    colors: ['Space Gray', 'Silver', 'Gold'],
    stock: 17,
  },
  {
    id: '4',
    name: 'Smart Fitness Watch',
    description:
      'Track your health and fitness goals with precision using our advanced fitness watch. Monitor heart rate, sleep patterns, and workout metrics while staying connected.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000',
    category: 'Wearables',
    rating: 4.6,
    reviewCount: 173,
    features: [
      'Heart rate monitoring',
      'Sleep tracking',
      'GPS tracking',
      'Water resistant to 50m',
      '7-day battery life',
    ],
    colors: ['Black', 'Silver', 'Rose Gold'],
    sizes: ['S', 'M', 'L'],
    stock: 32,
  },
  {
    id: '5',
    name: 'Professional Camera Kit',
    description:
      'Capture stunning photos and videos with our professional-grade camera kit. Includes a high-resolution camera body, versatile lens, and essential accessories.',
    price: 1899.99,
    oldPrice: 2099.99,
    image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=1000',
    category: 'Photography',
    rating: 4.9,
    reviewCount: 98,
    features: [
      '45MP full-frame sensor',
      '8K video recording',
      'In-body image stabilization',
      'Dual memory card slots',
      'Weather-sealed construction',
    ],
    colors: ['Black'],
    stock: 8,
  },
  {
    id: '6',
    name: 'Designer Desk Lamp',
    description:
      'Illuminate your workspace with this elegant designer lamp. Featuring adjustable brightness, color temperature control, and a sleek, modern design.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000',
    category: 'Home',
    rating: 4.7,
    reviewCount: 64,
    features: [
      'Adjustable brightness levels',
      'Color temperature control',
      'Touch-sensitive controls',
      'Built-in USB charging port',
      'Energy-efficient LED',
    ],
    colors: ['Matte Black', 'Brushed Gold', 'White'],
    stock: 27,
  },
];

export const stores: Store[] = [
  {
    id: '1',
    name: 'Downtown Flagship Store',
    address: '123 Main Street',
    city: 'New York, NY 10001',
    phone: '(212) 555-1234',
    email: 'nyc@elite-store.com',
    hours: 'Mon-Sat: 10am-8pm, Sun: 11am-6pm',
    image: 'https://images.unsplash.com/photo-1604664834921-a7c9adeb4eae?q=80&w=1000',
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: '2',
    name: 'West Coast Experience Center',
    address: '456 Tech Boulevard',
    city: 'San Francisco, CA 94105',
    phone: '(415) 555-6789',
    email: 'sf@elite-store.com',
    hours: 'Mon-Sat: 9am-7pm, Sun: 10am-6pm',
    image: 'https://images.unsplash.com/photo-1582193607281-dde5d7f5747e?q=80&w=1000',
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: '3',
    name: 'Midwest Design Hub',
    address: '789 Innovation Drive',
    city: 'Chicago, IL 60611',
    phone: '(312) 555-9876',
    email: 'chicago@elite-store.com',
    hours: 'Mon-Sat: 10am-7pm, Sun: 11am-5pm',
    image: 'https://images.unsplash.com/photo-1581775530863-9290a76f07d8?q=80&w=1000',
    lat: 41.8781,
    lng: -87.6298,
  },
];

export const orders: Order[] = [
  {
    id: 'ORD-12345',
    date: '2023-05-15T10:30:00',
    status: 'delivered',
    total: 299.98,
    items: [
      {
        id: '1',
        name: 'Premium Wireless Earbuds',
        price: 149.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1606751071446-a9104d9aba9a?q=80&w=1000',
      },
      {
        id: '2',
        name: 'Smart Home Hub',
        price: 129.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1558002038-1055e2eae2f7?q=80&w=1000',
      },
    ],
    tracking: {
      number: 'TRK9876543210',
      carrier: 'Premium Delivery',
      estimatedDelivery: '2023-05-18',
      events: [
        {
          date: '2023-05-15T14:30:00',
          status: 'Order placed',
          location: 'Elite Warehouse',
        },
        {
          date: '2023-05-16T09:15:00',
          status: 'Package processed',
          location: 'Elite Warehouse',
        },
        {
          date: '2023-05-16T17:45:00',
          status: 'In transit',
          location: 'Regional Distribution Center',
        },
        {
          date: '2023-05-17T08:30:00',
          status: 'Out for delivery',
          location: 'Local Delivery Facility',
        },
        {
          date: '2023-05-17T14:20:00',
          status: 'Delivered',
          location: 'Customer Address',
        },
      ],
    },
  },
  {
    id: 'ORD-67890',
    date: '2023-06-02T14:45:00',
    status: 'shipped',
    total: 1349.99,
    items: [
      {
        id: '3',
        name: 'Ultra-Thin Laptop',
        price: 1299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000',
      },
      {
        id: '6',
        name: 'Designer Desk Lamp',
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000',
      },
    ],
    tracking: {
      number: 'TRK1234567890',
      carrier: 'Elite Express',
      estimatedDelivery: '2023-06-07',
      currentLocation: 'Regional Distribution Center',
      events: [
        {
          date: '2023-06-02T14:45:00',
          status: 'Order placed',
          location: 'Elite Warehouse',
        },
        {
          date: '2023-06-03T10:30:00',
          status: 'Package processed',
          location: 'Elite Warehouse',
        },
        {
          date: '2023-06-04T08:15:00',
          status: 'In transit',
          location: 'Regional Distribution Center',
        },
      ],
    },
  },
  {
    id: 'ORD-54321',
    date: '2023-06-10T09:20:00',
    status: 'processing',
    total: 249.99,
    items: [
      {
        id: '4',
        name: 'Smart Fitness Watch',
        price: 249.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000',
      },
    ],
  },
];
