import { Truck } from 'lucide-react';
import { Button } from '@/components/ui/button.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.js';
import { OrderStatus } from './OrderStatus.js';
import { TrackingMap } from './TrackingMap.js';
import PaymentSystemArchitecture from '@/components/payment/PaymentSystemArchitecture.js';
import { OrderDataFlow } from './OrderDataFlow.js';
import type { PaymentFlow } from '@/components/payment/types.js';

interface OrderTabsProps {
  orderData: string;
  paymentFlowData: PaymentFlow;
  language: 'en' | 'ar';
}

export const OrderTabs = ({ orderData, paymentFlowData, language }: OrderTabsProps) => {
  return (
    <Tabs defaultValue="status">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="status">{language === 'en' ? 'Status' : 'الحالة'}</TabsTrigger>
        <TabsTrigger value="map">{language === 'en' ? 'Live Map' : 'الخريطة المباشرة'}</TabsTrigger>
        <TabsTrigger value="payment">{language === 'en' ? 'Payment' : 'الدفع'}</TabsTrigger>
        <TabsTrigger value="data-flow">
          {language === 'en' ? 'Data Flow' : 'تدفق البيانات'}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="status" className="pt-2">
        <OrderStatus
          orderTracking={orderData.tracking}
          currentLocation={orderData.currentLocation}
          orderDate={orderData.orderDate}
          estimatedDelivery={orderData.estimatedDelivery}
          language={language}
        />
      </TabsContent>

      <TabsContent value="map">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {language === 'en'
              ? 'Live tracking of your delivery - updated in real-time'
              : 'تتبع مباشر للتوصيل - يتم التحديث في الوقت الفعلي'}
          </p>
          <div className="h-[350px] w-full border rounded-md overflow-hidden">
            <TrackingMap
              driverLocation={orderData.driverLocation}
              deliveryAddress={orderData.customer.address}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-accent/50 rounded-md mt-2">
            <div className="flex items-center">
              <Truck className="h-5 w-5 mr-3 text-primary" />
              <div>
                <p className="text-sm font-medium">
                  {language === 'en' ? 'Driver Update' : 'تحديث السائق'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === 'en' ? 'Last updated: ' : 'آخر تحديث: '}
                  {orderData.driverLocation.lastUpdated}
                </p>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              {language === 'en' ? 'Contact Driver' : 'الاتصال بالسائق'}
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="payment">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {language === 'en'
              ? 'Payment processing system information'
              : 'معلومات نظام معالجة الدفع'}
          </p>
          <PaymentSystemArchitecture paymentFlow={paymentFlowData} />
        </div>
      </TabsContent>

      <TabsContent value="data-flow">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {language === 'en'
              ? 'Order tracking data flow architecture'
              : 'هندسة تدفق بيانات تتبع الطلبات'}
          </p>
          <OrderDataFlow />
        </div>
      </TabsContent>
    </Tabs>
  );
};
