import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface OrderSearchProps {
  onOrderFound: (orderData: string) => void;
  language: 'en' | 'ar';
}

export const OrderSearch = ({ onOrderFound, language }: OrderSearchProps) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTrackOrder = () => {
    if (!orderNumber) {
      toast({
        variant: 'destructive',
        title: language === 'en' ? 'Error' : 'خطأ',
        description:
          language === 'en' ? 'Please enter an order number' : 'الرجاء إدخال رقم الطلبية',
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // Mock data for the example
      const orderData = {
        id: 'ORD-12345-6789',
        status: 'in_transit',
        statusText: {
          en: 'In Transit',
          ar: 'في الطريق',
        },
        customer: {
          name: 'Alex Johnson',
          address: '123 Main St, Sweida, Syria',
        },
        orderDate: '2023-05-15',
        estimatedDelivery: '2023-05-18',
        currentLocation: 'Sweida Distribution Center',
        items: [
          { name: 'Wireless Headphones', quantity: 1, price: 89.99 },
          { name: 'Smart Watch', quantity: 1, price: 199.99 },
        ],
        tracking: [
          {
            date: '2023-05-15',
            time: '09:30',
            status: { en: 'Order Placed', ar: 'تم الطلب' },
            location: 'Online',
          },
          {
            date: '2023-05-15',
            time: '14:45',
            status: { en: 'Payment Confirmed', ar: 'تأكيد الدفع' },
            location: 'Payment Gateway',
          },
          {
            date: '2023-05-16',
            time: '08:20',
            status: { en: 'Order Processed', ar: 'تمت معالجة الطلب' },
            location: 'Sweida Warehouse',
          },
          {
            date: '2023-05-17',
            time: '10:15',
            status: { en: 'Out for Delivery', ar: 'خرج للتوصيل' },
            location: 'Sweida Distribution Center',
          },
        ],
        driverLocation: {
          lat: 32.7089,
          lng: 36.5717,
          lastUpdated: '10 minutes ago',
        },
      };

      if (orderNumber === '12345' || orderNumber === orderData.id) {
        onOrderFound(orderData);
        toast({
          title: language === 'en' ? 'Order Found' : 'تم العثور على الطلبية',
          description:
            language === 'en' ? `Tracking order ${orderData.id}` : `تتبع الطلبية ${orderData.id}`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: language === 'en' ? 'Order Not Found' : 'لم يتم العثور على الطلبية',
          description:
            language === 'en'
              ? 'Please check your order number and try again'
              : 'يرجى التحقق من رقم الطلبية والمحاولة مرة أخرى',
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-center">
          {language === 'en' ? 'Enter your order details' : 'أدخل تفاصيل طلبيتك'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orderNumber">
              {language === 'en' ? 'Order Number' : 'رقم الطلبية'}
            </Label>
            <Input
              id="orderNumber"
              placeholder={language === 'en' ? 'e.g. ORD-12345-6789' : 'مثال: ORD-12345-6789'}
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {language === 'en'
                ? 'You can find your order number in the confirmation email'
                : 'يمكنك العثور على رقم الطلبية في البريد الإلكتروني للتأكيد'}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleTrackOrder} disabled={loading}>
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {language === 'en' ? 'Tracking...' : 'جارٍ التتبع...'}
            </span>
          ) : language === 'en' ? (
            'Track Order'
          ) : (
            'تتبع الطلبية'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
