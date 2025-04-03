import { useEffect, useRef, useState } from 'react';
import { Map, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface DriverLocation {
  lat: number;
  lng: number;
  lastUpdated: string;
}

interface TrackingMapProps {
  driverLocation: DriverLocation;
  deliveryAddress: string;
}

// Mock component that simulates a map without requiring Mapbox integration
export const TrackingMap = ({ driverLocation, deliveryAddress }: TrackingMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showMapboxInput, setShowMapboxInput] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { toast } = useToast();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  // Simulate loading a map
  useEffect(() => {
    if (!showMapboxInput && mapboxToken && mapContainerRef.current) {
      // Simulate loading map
      const timer = setTimeout(() => {
        setMapLoaded(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showMapboxInput, mapboxToken]);

  const handleMapboxTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken) {
      toast({
        title: language === 'en' ? 'Map token saved' : 'تم حفظ رمز الخريطة',
        description:
          language === 'en'
            ? 'Your Mapbox token has been saved for this session'
            : 'تم حفظ رمز Mapbox الخاص بك لهذه الجلسة',
      });
      setShowMapboxInput(false);
    } else {
      toast({
        variant: 'destructive',
        title: language === 'en' ? 'Token required' : 'الرمز مطلوب',
        description:
          language === 'en' ? 'Please enter your Mapbox token' : 'الرجاء إدخال رمز Mapbox الخاص بك',
      });
    }
  };

  if (showMapboxInput) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
        <Map className="h-12 w-12 text-primary mb-2" />
        <h3 className="text-lg font-semibold">
          {language === 'en' ? 'Enter Mapbox Token' : 'أدخل رمز Mapbox'}
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {language === 'en'
            ? 'To display the live tracking map, please enter your Mapbox public token. You can get one for free at mapbox.com'
            : 'لعرض خريطة التتبع المباشر، يرجى إدخال رمز Mapbox العام الخاص بك. يمكنك الحصول على واحد مجانًا من mapbox.com'}
        </p>

        <form onSubmit={handleMapboxTokenSubmit} className="w-full max-w-md space-y-3">
          <div className="space-y-2">
            <Label htmlFor="mapboxToken" className="text-left block">
              {language === 'en' ? 'Mapbox Public Token' : 'رمز Mapbox العام'}
            </Label>
            <Input
              id="mapboxToken"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              placeholder="pk.eyJ1IjoieW91..."
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            {language === 'en' ? 'Load Map' : 'تحميل الخريطة'}
          </Button>

          <p className="text-xs text-muted-foreground mt-2">
            {language === 'en'
              ? "For demonstration purposes, you can click 'Load Map' without entering a token to see a simulated map."
              : "لأغراض العرض التوضيحي، يمكنك النقر على 'تحميل الخريطة' دون إدخال رمز لرؤية خريطة محاكاة."}
          </p>
        </form>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">
          {language === 'en' ? 'Loading map...' : 'جارٍ تحميل الخريطة...'}
        </p>
      </div>
    );
  }

  // Render a mock map
  return (
    <div ref={mapContainerRef} className="h-full w-full relative bg-zinc-100">
      {/* Mock map UI */}
      <div className="absolute inset-0 bg-zinc-100 p-4">
        <div className="h-full w-full relative border border-zinc-200 rounded-md bg-white overflow-hidden">
          {/* Mock map image */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-zinc-200">
            {/* Grid lines to simulate map */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            ></div>

            {/* Driver location marker */}
            <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center text-white animate-pulse">
                <Navigation className="h-3 w-3" />
              </div>
              <div className="text-xs font-medium bg-white px-2 py-1 rounded-md shadow-sm mt-1 text-center">
                {language === 'en' ? 'Driver' : 'السائق'}
              </div>
            </div>

            {/* Destination marker */}
            <div className="absolute right-1/3 bottom-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="h-6 w-6 bg-destructive rounded-full flex items-center justify-center text-white">
                <Map className="h-3 w-3" />
              </div>
              <div className="text-xs font-medium bg-white px-2 py-1 rounded-md shadow-sm mt-1 text-center">
                {language === 'en' ? 'Destination' : 'الوجهة'}
              </div>
            </div>

            {/* Route line */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
              <path
                d="M 50% 33% Q 60% 50%, 66% 66%"
                stroke="#7e69ab"
                strokeWidth="3"
                strokeDasharray="5,5"
                fill="none"
              />
            </svg>
          </div>

          {/* Map controls */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <Button variant="secondary" size="icon" className="h-8 w-8 bg-white shadow-md">
              <span className="text-lg">+</span>
            </Button>
            <Button variant="secondary" size="icon" className="h-8 w-8 bg-white shadow-md">
              <span className="text-lg">−</span>
            </Button>
          </div>

          {/* Map overlay with delivery info */}
          <div className="absolute bottom-3 left-3 right-3 bg-white rounded-md shadow-md p-3 text-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {language === 'en' ? 'Estimated Arrival' : 'الوصول المتوقع'}
                </p>
                <p className="text-muted-foreground">
                  {language === 'en' ? '15-20 minutes' : '15-20 دقيقة'}
                </p>
              </div>
              <div>
                <p className="font-medium">{language === 'en' ? 'Distance' : 'المسافة'}</p>
                <p className="text-muted-foreground">
                  {language === 'en' ? '2.3 km away' : '2.3 كم متبقية'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
