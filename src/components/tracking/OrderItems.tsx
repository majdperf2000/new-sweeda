import { MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderItemsProps {
  items: OrderItem[];
  customerAddress: string;
  language: 'en' | 'ar';
}

export const OrderItems = ({ items, customerAddress, language }: OrderItemsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Order Details' : 'تفاصيل الطلبية'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">{language === 'en' ? 'Items' : 'العناصر'}</h3>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center">
                    <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                  </div>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 font-semibold">
                <span>{language === 'en' ? 'Total' : 'المجموع'}</span>
                <span>
                  ${items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">
              {language === 'en' ? 'Shipping Address' : 'عنوان الشحن'}
            </h3>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
              <span>{customerAddress}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-2">
          <p className="text-sm text-muted-foreground">
            {language === 'en'
              ? 'Need help with your order? Contact our support team.'
              : 'بحاجة إلى مساعدة بخصوص طلبيتك؟ اتصل بفريق الدعم لدينا.'}
          </p>
          <Button variant="outline" className="w-full">
            {language === 'en' ? 'Contact Support' : 'الاتصال بالدعم'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
