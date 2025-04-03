import { Calendar, Clock, MapPin } from 'lucide-react';

interface OrderStatusProps {
  orderTracking: string[];
  currentLocation: string;
  orderDate: string;
  estimatedDelivery: string;
  language: 'en' | 'ar';
}

export const OrderStatus = ({
  orderTracking,
  currentLocation,
  orderDate,
  estimatedDelivery,
  language,
}: OrderStatusProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <span className="text-sm text-muted-foreground">
            {language === 'en' ? 'Order Date' : 'تاريخ الطلب'}
          </span>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{orderDate}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-sm text-muted-foreground">
            {language === 'en' ? 'Estimated Delivery' : 'التسليم المتوقع'}
          </span>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{estimatedDelivery}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1 mt-4">
        <h3 className="font-medium">{language === 'en' ? 'Current Location' : 'الموقع الحالي'}</h3>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{currentLocation}</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-3">
          {language === 'en' ? 'Tracking History' : 'سجل التتبع'}
        </h3>
        <div className="relative border-l pl-6 space-y-6 ml-2">
          {orderTracking.map((event, index) => (
            <div key={index} className="relative pb-4">
              <div className="absolute -left-[25px] top-1">
                {index === 0 ? (
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                ) : (
                  <div className="w-3 h-3 rounded-full border-2 border-primary bg-background"></div>
                )}
              </div>
              <div>
                <p className="font-medium">{event.status[language]}</p>
                <div className="flex gap-2 text-sm text-muted-foreground mt-1">
                  <span>
                    {event.date} • {event.time}
                  </span>
                  <span>•</span>
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
