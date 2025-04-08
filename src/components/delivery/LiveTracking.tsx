import React, { useState } from 'react';
import { Map, Navigation, Share, RefreshCw, Truck, MapPin, Clock, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.js';
import { Badge } from '@/components/ui/Badge.js';
import { Button } from '@/components/ui/button.js';
import { TrackingMap } from '@/components/tracking/TrackingMap.js';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.js';
import { ScrollArea } from '@/components/ui/scroll-area.js';
import { Input } from '@/components/ui/input.js';
import { toast } from 'sonner';

// Mock data for active deliveries
const activeDeliveries = [
  {
    id: 'DEL-1234',
    orderId: 'ORD-5678',
    driver: 'أحمد محمد',
    driverId: 'DRV-156',
    customer: 'سامي علي',
    location: 'دمشق - المزة',
    destination: 'دمشق - المهاجرين',
    status: 'in_transit',
    eta: '10 دقائق',
    completedStops: 2,
    totalStops: 5,
    lastUpdate: 'منذ 2 دقيقة',
  },
  {
    id: 'DEL-1235',
    orderId: 'ORD-5679',
    driver: 'محمود خالد',
    driverId: 'DRV-157',
    customer: 'ليلى سعيد',
    location: 'دمشق - الروضة',
    destination: 'دمشق - المزرعة',
    status: 'delivered',
    eta: 'وصل',
    completedStops: 3,
    totalStops: 3,
    lastUpdate: 'منذ 5 دقائق',
  },
  {
    id: 'DEL-1236',
    orderId: 'ORD-5680',
    driver: 'عمر عبد الله',
    driverId: 'DRV-158',
    customer: 'فاطمة أحمد',
    location: 'دمشق - ركن الدين',
    destination: 'دمشق - باب توما',
    status: 'in_transit',
    eta: '15 دقيقة',
    completedStops: 1,
    totalStops: 4,
    lastUpdate: 'منذ 1 دقيقة',
  },
  {
    id: 'DEL-1237',
    orderId: 'ORD-5681',
    driver: 'حسن محمد',
    driverId: 'DRV-159',
    customer: 'محمد حسين',
    location: 'دمشق - القصاع',
    destination: 'دمشق - الحلبوني',
    status: 'picking_up',
    eta: '25 دقيقة',
    completedStops: 0,
    totalStops: 3,
    lastUpdate: 'منذ 3 دقائق',
  },
];

const LiveTracking = () => {
  const [selectedDelivery, setSelectedDelivery] = useState(activeDeliveries[0]);
  const [trackingLink, setTrackingLink] = useState('');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in_transit':
        return (
          <Badge variant="secondary" className="bg-blue-500 text-white">
            في الطريق
          </Badge>
        );
      case 'delivered':
        return (
          <Badge variant="secondary" className="bg-green-500 text-white">
            تم التوصيل
          </Badge>
        );
      case 'picking_up':
        return (
          <Badge variant="secondary" className="bg-purple-500 text-white">
            جاري الاستلام
          </Badge>
        );
      case 'delayed':
        return <Badge variant="destructive">متأخر</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const handleGenerateLink = (deliveryId) => {
    const link = `https://delivery-tracking.com/${deliveryId}`;
    setTrackingLink(link);
    toast.success('تم إنشاء رابط التتبع', {
      description: 'يمكنك مشاركة الرابط مع العميل',
    });
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(trackingLink);
    toast.success('تم نسخ رابط التتبع', {
      description: 'يمكنك لصق الرابط ومشاركته',
    });
  };

  const handleRefreshLocation = () => {
    toast.success('تم تحديث موقع التوصيل', {
      description: 'آخر تحديث: الآن',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">التتبع المباشر</h2>
          <p className="text-muted-foreground">تتبع السائقين والتوصيل في الوقت الفعلي</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={handleRefreshLocation}>
            <RefreshCw className="mr-2 h-4 w-4" />
            تحديث المواقع
          </Button>
          <Button
            onClick={() => {
              toast.info('مساعدة التتبع المباشر', {
                description: 'يمكنك اختيار توصيل من القائمة لعرض موقعه على الخريطة',
              });
            }}
          >
            <Info className="mr-2 h-4 w-4" />
            مساعدة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                التوصيلات النشطة
              </CardTitle>
              <CardDescription>جميع التوصيلات الجارية حالياً</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {activeDeliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className={`border-b p-3 cursor-pointer hover:bg-accent/50 ${
                      selectedDelivery?.id === delivery.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => setSelectedDelivery(delivery)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{delivery.id}</div>
                        <div className="text-sm text-muted-foreground">{delivery.driver}</div>
                      </div>
                      {getStatusBadge(delivery.status)}
                    </div>

                    <div className="text-sm">
                      <div className="flex items-center mb-1">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>الوصول المتوقع: {delivery.eta}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{delivery.destination}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            delivery.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{
                            width: `${(delivery.completedStops / delivery.totalStops) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground text-center mt-1">
                        {delivery.completedStops}/{delivery.totalStops} نقاط
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Map className="mr-2 h-5 w-5" />
                  خريطة التتبع المباشرة
                </CardTitle>
                {selectedDelivery && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGenerateLink(selectedDelivery.id)}
                    >
                      <Share className="h-4 w-4 mr-1" />
                      إنشاء رابط تتبع
                    </Button>
                  </div>
                )}
              </div>
              {selectedDelivery && (
                <CardDescription className="flex items-center justify-between">
                  <span>
                    توصيل: {selectedDelivery.id} | سائق: {selectedDelivery.driver}
                  </span>
                  <span>آخر تحديث: {selectedDelivery.lastUpdate}</span>
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="p-0">
              {selectedDelivery ? (
                <div className="relative">
                  <div className="h-[400px] w-full">
                    <TrackingMap
                      driverLocation={{
                        lat: 32.7089,
                        lng: 36.5717,
                        lastUpdated: selectedDelivery.lastUpdate,
                      }}
                      deliveryAddress={selectedDelivery.destination}
                    />
                  </div>

                  {trackingLink && (
                    <div className="mt-4 p-4 border-t">
                      <div className="flex items-center">
                        <div className="flex-1 mr-2">
                          <Input value={trackingLink} readOnly className="bg-muted" />
                        </div>
                        <Button variant="secondary" size="sm" onClick={handleShareLink}>
                          <Share className="h-4 w-4 mr-1" />
                          نسخ
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        يمكن مشاركة هذا الرابط مع العميل لتتبع التوصيل
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
                  <Map className="h-12 w-12 mb-4" />
                  <h3 className="text-lg font-medium">اختر توصيل للعرض</h3>
                  <p className="max-w-md mt-2">
                    الرجاء اختيار توصيل من القائمة على اليسار لعرض موقعه على الخريطة.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Navigation className="mr-2 h-5 w-5" />
            تفاصيل أوقات الوصول المتوقعة
          </CardTitle>
          <CardDescription>
            حسابات أوقات الوصول المتوقعة بناءً على حركة المرور والطقس
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم التوصيل</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>الوجهة</TableHead>
                <TableHead>الوصول المتوقع</TableHead>
                <TableHead>الظروف</TableHead>
                <TableHead>التعديلات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeDeliveries
                .filter((d) => d.status !== 'delivered')
                .map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-medium">{delivery.id}</TableCell>
                    <TableCell>{delivery.customer}</TableCell>
                    <TableCell>{delivery.destination}</TableCell>
                    <TableCell>{delivery.eta}</TableCell>
                    <TableCell>
                      {delivery.id === 'DEL-1234' ? (
                        <Badge variant="secondary" className="bg-yellow-500">
                          ازدحام متوسط
                        </Badge>
                      ) : delivery.id === 'DEL-1236' ? (
                        <Badge variant="secondary" className="bg-blue-500 text-white">
                          طقس ممطر
                        </Badge>
                      ) : (
                        <Badge variant="outline">عادية</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {delivery.id === 'DEL-1234' ? (
                        <span className="text-yellow-500">+5 دقائق</span>
                      ) : delivery.id === 'DEL-1236' ? (
                        <span className="text-yellow-500">+8 دقائق</span>
                      ) : (
                        <span className="text-green-500">+0 دقائق</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveTracking;
