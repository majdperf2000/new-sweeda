// mockData.ts
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
    name: 'سماعات لاسلكية متميزة',
    description: 'استمتع بجودة صوت فائقة وتوصيل سلس مع سماعاتنا اللاسلكية المتميزة',
    price: 149.99,
    oldPrice: 199.99,
    image: '/products/earbuds.jpg',
    category: 'إلكترونيات',
    rating: 4.8,
    reviewCount: 124,
    features: ['إلغاء الضوضاء', 'بطارية 24 ساعة'],
    colors: ['أسود', 'أبيض'],
    stock: 45,
  },
  {
    id: '2',
    name: 'حاسوب محمول فائق',
    description: 'أداء قوي وتصميم أنيق مع بطارية تدوم طوال اليوم',
    price: 1299.99,
    image: '/products/laptop.jpg',
    category: 'أجهزة كمبيوتر',
    rating: 4.9,
    reviewCount: 215,
    stock: 17,
  },
];

export const stores: Store[] = [
  {
    id: '1',
    name: 'المتجر الرئيسي',
    address: 'شارع الملك عبدالعزيز',
    city: 'الرياض',
    phone: '0112345678',
    email: 'store@example.com',
    hours: '8 صباحًا - 10 مساءً',
    image: '/stores/main-store.jpg',
    lat: 24.7136,
    lng: 46.6753,
  },
];

export const orders: Order[] = [
  {
    id: 'ORD-123',
    date: '2024-01-15',
    status: 'delivered',
    total: 299.98,
    items: [
      {
        id: '1',
        name: 'سماعات لاسلكية متميزة',
        price: 149.99,
        quantity: 2,
        image: '/products/earbuds.jpg',
      },
    ],
  },
];
