export interface DriverLocation {
  lat: number;
  lng: number;
  lastUpdated: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface TrackingEvent {
  date: string;
  time: string;
  status: {
    en: string;
    ar: string;
  };
  location: string;
}

export interface OrderData {
  id: string;
  status: string;
  statusText: {
    en: string;
    ar: string;
  };
  customer: {
    name: string;
    address: string;
  };
  orderDate: string;
  estimatedDelivery: string;
  currentLocation: string;
  items: OrderItem[];
  tracking: TrackingEvent[];
  driverLocation: DriverLocation;
}
