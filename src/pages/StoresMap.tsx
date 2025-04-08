// StoresMap.tsx
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageTransition from '@/components/animations/page-transition.js';
import MainLayout from '@/components/layout/MainLayout.js';
import { Card, CardContent } from '@/components/ui/card.js';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Clock, Phone } from 'lucide-react';

// Define the Store type
interface Store {
  id: number;
  name: string;
  address: string;
  coordinates: [number, number];
  workingHours: string;
  phone: string;
}

// ✅ صحيح:
declare global {
  interface Window {
    mapboxgl: any;
  }
}
window.mapboxgl.accessToken = 'pk.actual-token'; // استخدم token صحيح

const StoresMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [searchParams] = useSearchParams();
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const stores: Store[] = [
    {
      id: 1,
      name: 'Store 1',
      address: '123 Main St, City',
      coordinates: [-98.5795, 39.8283],
      workingHours: '9AM - 6PM',
      phone: '+1234567890',
    },
    // Add more stores as needed
  ];

  const filteredStores = searchQuery
    ? stores.filter(
        (store) =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : stores;

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const initialStore = searchParams.get('store') ? parseInt(searchParams.get('store')!) : null;

    const defaultCenter = initialStore
      ? stores.find((s) => s.id === initialStore)?.coordinates
      : [-98.5795, 39.8283];

    const defaultZoom = initialStore ? 13 : 3;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: defaultCenter as [number, number],
      zoom: defaultZoom,
    });

    const mapInstance = map.current;

    mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');

    if (initialStore) setSelectedStore(initialStore);

    mapInstance.on('load', () => {
      stores.forEach((store) => {
        const markerElement = document.createElement('div');
        markerElement.className = 'store-marker';
        markerElement.innerHTML = `
          <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        `;

        new mapboxgl.Marker(markerElement).setLngLat(store.coordinates).addTo(mapInstance);

        markerElement.addEventListener('click', () => {
          setSelectedStore(store.id);
          mapInstance.flyTo({
            center: store.coordinates,
            zoom: 13,
          });
        });
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [searchParams]);

  const flyToStore = (storeId: number) => {
    const store = stores.find((s) => s.id === storeId);
    if (store && map.current) {
      map.current.flyTo({
        center: store.coordinates,
        zoom: 13,
      });
      setSelectedStore(storeId);
    }
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="h-[calc(100vh-80px)] flex flex-col">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3 h-[400px] md:h-full overflow-y-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5" />
                    <h2 className="text-xl font-bold">Our Stores</h2>
                  </div>
                  <input
                    type="text"
                    placeholder="Search stores..."
                    className="w-full p-2 border rounded mb-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="space-y-4">
                    {filteredStores.map((store) => (
                      <div
                        key={store.id}
                        className={`p-4 border rounded cursor-pointer ${
                          selectedStore === store.id ? 'border-primary' : ''
                        }`}
                        onClick={() => flyToStore(store.id)}
                      >
                        <h3 className="font-bold">{store.name}</h3>
                        <p className="text-sm text-gray-600">{store.address}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{store.workingHours}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                          <Phone className="w-4 h-4" />
                          <span>{store.phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-2/3 h-[400px] md:h-full rounded-lg overflow-hidden">
                  <div ref={mapContainer} className="w-full h-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default StoresMap;
