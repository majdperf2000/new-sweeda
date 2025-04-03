import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageTransition } from '@/components/ui/page-transition';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Clock, Phone, X } from 'lucide-react';

// Need to set your own Mapbox access token in a real application
// This would typically be set via an environment variable
mapboxgl.accessToken = 'pk.placeholder'; // Replace with your actual token

const StoresMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [searchParams] = useSearchParams();
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock store data (same as in Stores.tsx)
  const stores = [
    {
      id: 1,
      name: 'élite - New York SoHo',
      address: '123 Broadway, New York, NY 10013',
      phone: '(212) 555-1234',
      hours: 'Mon-Sat: 10am-8pm, Sun: 11am-6pm',
      coordinates: [-74.006, 40.7128], // New York
    },
    {
      id: 2,
      name: 'élite - Los Angeles',
      address: '456 Rodeo Drive, Beverly Hills, CA 90210',
      phone: '(310) 555-5678',
      hours: 'Mon-Sat: 10am-9pm, Sun: 12pm-6pm',
      coordinates: [-118.2437, 34.0522], // LA
    },
    {
      id: 3,
      name: 'élite - Chicago',
      address: '789 Michigan Avenue, Chicago, IL 60611',
      phone: '(312) 555-9012',
      hours: 'Mon-Sat: 9am-8pm, Sun: 11am-5pm',
      coordinates: [-87.6298, 41.8781], // Chicago
    },
    {
      id: 4,
      name: 'élite - Miami',
      address: '321 Collins Avenue, Miami Beach, FL 33139',
      phone: '(305) 555-3456',
      hours: 'Mon-Sun: 10am-9pm',
      coordinates: [-80.1918, 25.7617], // Miami
    },
    {
      id: 5,
      name: 'élite - San Francisco',
      address: '555 Union Square, San Francisco, CA 94108',
      phone: '(415) 555-7890',
      hours: 'Mon-Sat: 10am-8pm, Sun: 11am-7pm',
      coordinates: [-122.4194, 37.7749], // San Francisco
    },
    {
      id: 6,
      name: 'élite - Seattle',
      address: '888 Pine Street, Seattle, WA 98101',
      phone: '(206) 555-2345',
      hours: 'Mon-Sat: 9am-7pm, Sun: 10am-6pm',
      coordinates: [-122.3321, 47.6062], // Seattle
    },
  ];

  // Filter stores based on search query
  const filteredStores = searchQuery
    ? stores.filter(
        (store) =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : stores;

  // Initialize map when component mounts

  if (mapContainer.current && !map.current) {
    const initialStore = searchParams.get('store')
      ? parseInt(searchParams.get('store') || '1')
      : null;

    const defaultCenter = initialStore
      ? stores.find((s) => s.id === initialStore)?.coordinates
      : [-98.5795, 39.8283]; // Center of USA

    const defaultZoom = initialStore ? 13 : 3;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: defaultCenter as [number, number],
      zoom: defaultZoom,
    });

    const mapInstance = map.current;

    // Add navigation controls
    mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Set initial selected store
    if (initialStore) {
      setSelectedStore(initialStore);
    }

    // Wait for map to load before adding markers
    mapInstance.on('load', () => {
      // Add store markers
      stores.forEach((store) => {
        const markerElement = document.createElement('div');
        markerElement.className = 'store-marker';
        markerElement.innerHTML = `<div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>`;

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat(store.coordinates as [number, number])
          .addTo(mapInstance);

        // Add click event to marker
        markerElement.addEventListener('click', () => {
          setSelectedStore(store.id);
          mapInstance.flyTo({
            center: store.coordinates as [number, number],
            zoom: 13,
          });
        });
      });
    });
  }

  // Cleanup function to remove map
  return () => {
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {...}
  }, []);
    // Logic here
  }, [stores]);
  // Function to fly to store
  const flyToStore = (storeId: number) => {
    const store = stores.find((s) => s.id === storeId);
    if (store && map.current) {
      map.current.flyTo({
        center: store.coordinates as [number, number],
        zoom: 13,
      });
      setSelectedStore(storeId);
    }
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="h-[calc(100vh-80px)] flex flex-col">
          <div className="container mx-auto px-4 py-4">
            <h1 className="heading-3 mb-4">Store Locations</h1>

            <div className="mb-4">
              <Input
                placeholder="Search by location or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex-1 flex">
            {/* Store list sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4 bg-background border-r overflow-y-auto">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className={`p-4 border-b cursor-pointer transition-colors ${
                    selectedStore === store.id ? 'bg-primary/10' : 'hover:bg-accent'
                  }`}
                  onClick={() => flyToStore(store.id)}
                >
                  <h3 className="font-medium mb-1">{store.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{store.address}</p>
                  <div className="flex text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{store.hours.split(',')[0]}</span>
                  </div>
                </div>
              ))}

              {filteredStores.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">No stores matching your search.</p>
                  <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
                    View All Stores
                  </Button>
                </div>
              )}
            </div>

            {/* Map container */}
            <div className="hidden md:block md:w-2/3 lg:w-3/4 relative">
              <div ref={mapContainer} className="h-full w-full" />

              {/* Selected store popup */}
              {selectedStore && (
                <Card className="absolute bottom-8 left-8 w-80 glass-card">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">
                        {stores.find((s) => s.id === selectedStore)?.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setSelectedStore(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {stores.find((s) => s.id === selectedStore) && (
                      <div className="space-y-2">
                        <div className="flex">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm">
                            {stores.find((s) => s.id === selectedStore)?.address}
                          </span>
                        </div>
                        <div className="flex">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm">
                            {stores.find((s) => s.id === selectedStore)?.hours}
                          </span>
                        </div>
                        <div className="flex">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm">
                            {stores.find((s) => s.id === selectedStore)?.phone}
                          </span>
                        </div>

                        <div className="pt-2">
                          <Button className="w-full" size="sm">
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};
export default StoresMap;
