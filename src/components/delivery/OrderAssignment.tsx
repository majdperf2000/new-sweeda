import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.js';
import DeliveryTypeSelection from './DeliveryTypeSelection.js';
import { Button } from '@/components/ui/button.js';
import {
  Truck,
  User,
  Package,
  FileCheck,
  Clock,
  MapPin,
  BarChart4,
  Sliders,
  Filter,
  Car,
  Bike,
  Bike as BicycleAlternative,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge.js';
import { toast } from 'sonner';

const OrderAssignment = () => {
  const [, setActiveTab] = useState('pending');

  const orders = [
    {
      id: 'ORD-1001',
      customer: 'محمد علي',
      address: 'شارع الملك فهد، الرياض',
      items: 3,
      priority: 'high',
      assignedTo: null,
      vehicle: 'car',
      eta: '30 دقيقة',
    },
    {
      id: 'ORD-1002',
      customer: 'فاطمة أحمد',
      address: 'شارع التحلية، جدة',
      items: 1,
      priority: 'medium',
      assignedTo: 'أحمد محمود',
      vehicle: 'motorcycle',
      eta: '15 دقيقة',
    },
    {
      id: 'ORD-1003',
      customer: 'خالد عبدالله',
      address: 'شارع الأمير سلطان، الدمام',
      items: 5,
      priority: 'low',
      assignedTo: null,
      vehicle: 'truck',
      eta: '45 دقيقة',
    },
    {
      id: 'ORD-1004',
      customer: 'نورة سعيد',
      address: 'شارع الستين، مكة المكرمة',
      items: 2,
      priority: 'high',
      assignedTo: 'محمد فهد',
      vehicle: 'bicycle',
      eta: '20 دقيقة',
    },
  ];

  const drivers = [
    {
      id: 'DRV-501',
      name: 'عبدالله محمد',
      status: 'available',
      vehicle: 'car',
      location: 'الرياض، حي الورود',
      capacity: 7,
      orders: 4,
    },
    {
      id: 'DRV-502',
      name: 'سارة أحمد',
      status: 'busy',
      vehicle: 'motorcycle',
      location: 'الرياض، حي الملز',
      capacity: 3,
      orders: 3,
    },
    {
      id: 'DRV-503',
      name: 'فهد عبدالرحمن',
      status: 'available',
      vehicle: 'truck',
      location: 'الرياض، حي النزهة',
      capacity: 15,
      orders: 8,
    },
    {
      id: 'DRV-504',
      name: 'محمد علي',
      status: 'available',
      vehicle: 'bicycle',
      location: 'الرياض، حي الروضة',
      capacity: 2,
      orders: 0,
    },
  ];

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500">عالية</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">متوسطة</Badge>;
      case 'low':
        return <Badge className="bg-green-500">منخفضة</Badge>;
      default:
        return <Badge variant="outline">غير محددة</Badge>;
    }
  };

  {
    const getVehicleIcon = (vehicle) => {
      switch (vehicle) {
        case 'truck':
          return <Truck className="h-4 w-4" />;
        case 'car':
          return <Car className="h-4 w-4" />;
        case 'motorcycle':
          return <Bike className="h-4 w-4" />;
        case 'bicycle':
          return <BicycleAlternative className="h-4 w-4" />;
        default:
          return <Package className="h-4 w-4" />;
      }
    };

    toast.success(`تم توزيع الطلب ${orderId} إلى السائق ${driverId}`, {
      description: 'سيتم إشعار السائق بالطلب الجديد',
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-2xl font-bold">إدارة توزيع الطلبات</h2>

        <div className="flex gap-2 mt-2 md:mt-0">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            فلترة
          </Button>
          <Button variant="outline" size="sm">
            <Sliders className="h-4 w-4 mr-1" />
            إعدادات التوزيع
          </Button>
          <Button size="sm">
            <BarChart4 className="h-4 w-4 mr-1" />
            تقارير
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">طلبات في الانتظار</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">قيد التوصيل</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Truck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">متوسط وقت التوصيل</p>
                <p className="text-2xl font-bold">28 د</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">سائقين متاحين</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <User className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>اختيار نوع التوصيل</CardTitle>
          <CardDescription>حدد نوع التوصيل المناسب لطلبك</CardDescription>
        </CardHeader>
        <CardContent>
          <DeliveryTypeSelection />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileCheck className="h-5 w-5 mr-2" />
            نظام التوزيع الذكي للطلبات
          </CardTitle>
          <CardDescription>توزي�� الطلبات حسب الأولوية والموقع ونوع المركبة</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="pending">طلبات في الانتظار</TabsTrigger>
              <TabsTrigger value="assigned">طلبات موزعة</TabsTrigger>
              <TabsTrigger value="company">توصيل الشركات</TabsTrigger>
              <TabsTrigger value="freelance">توصيل فردي</TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-right">رقم الطلب</th>
                      <th className="p-3 text-right">العميل</th>
                      <th className="p-3 text-right">العنوان</th>
                      <th className="p-3 text-right">العناصر</th>
                      <th className="p-3 text-right">الأولوية</th>
                      <th className="p-3 text-right">نوع المركبة</th>
                      <th className="p-3 text-right">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .filter((order) => !order.assignedTo)
                      .map((order) => (
                        <tr key={order.id} className="border-t">
                          <td className="p-3">{order.id}</td>
                          <td className="p-3">{order.customer}</td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 ml-1 text-gray-500" />
                              <span className="text-sm">{order.address}</span>
                            </div>
                          </td>
                          <td className="p-3">{order.items}</td>
                          <td className="p-3">{getPriorityBadge(order.priority)}</td>
                          <td className="p-3">
                            <div className="flex items-center">
                              {getVehicleIcon(order.vehicle)}
                              <span className="mr-1">
                                {order.vehicle === 'truck'
                                  ? 'شاحنة'
                                  : order.vehicle === 'car'
                                    ? 'سيارة'
                                    : order.vehicle === 'motorcycle'
                                      ? 'دراجة نارية'
                                      : 'دراجة هوائية'}
                              </span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Button
                              size="sm"
                              onClick={() => {
                                toast.success(`اختيار سائق للطلب ${order.id}`, {
                                  description: 'يمكنك اختيار السائق المناسب من القائمة',
                                });
                              }}
                            >
                              توزيع
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="assigned">
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-right">رقم الطلب</th>
                      <th className="p-3 text-right">العميل</th>
                      <th className="p-3 text-right">السائق</th>
                      <th className="p-3 text-right">الوقت المتوقع</th>
                      <th className="p-3 text-right">حالة التوصيل</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .filter((order) => order.assignedTo)
                      .map((order) => (
                        <tr key={order.id} className="border-t">
                          <td className="p-3">{order.id}</td>
                          <td className="p-3">{order.customer}</td>
                          <td className="p-3">{order.assignedTo}</td>
                          <td className="p-3">{order.eta}</td>
                          <td className="p-3">
                            <Badge className="bg-green-500">قيد التوصيل</Badge>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="company">
              <div className="p-4 text-center border rounded-lg bg-blue-50">
                <Truck className="h-16 w-16 mx-auto text-blue-500 mb-2" />
                <h3 className="text-lg font-medium mb-2">نظام توصيل الشركات</h3>
                <p className="mb-4 text-sm text-gray-600">
                  يتيح هذا النظام توزيع الطلبات على أسطول الشركة حسب نوع المركبة والسعة والموقع
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-3">
                      <h4 className="font-medium mb-2">توزيع حسب نوع المركبة</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>شاحنات</span>
                          <span>7 طلبات</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>سيارات</span>
                          <span>12 طلب</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>دراجات نارية</span>
                          <span>5 طلبات</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-3">
                      <h4 className="font-medium mb-2">حالة المركبات</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>متاحة</span>
                          <span>15 مركبة</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>مشغولة</span>
                          <span>22 مركبة</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>في الصيانة</span>
                          <span>3 مركبات</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="freelance">
              <div className="p-4 text-center border rounded-lg bg-purple-50">
                <User className="h-16 w-16 mx-auto text-purple-500 mb-2" />
                <h3 className="text-lg font-medium mb-2">نظام التوصيل الفردي</h3>
                <p className="mb-4 text-sm text-gray-600">
                  يتيح هذا النظام للسائقين المستقلين قبول الطلبات القريبة من موقعهم
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardContent className="p-3">
                      <h4 className="font-medium mb-2">حالة السائقين</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>متاحون</span>
                          <Badge className="bg-green-500">24 سائق</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>مشغولون</span>
                          <Badge className="bg-yellow-500">18 سائق</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>متصلون الآن</span>
                          <Badge className="bg-blue-500">42 سائق</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-3">
                      <h4 className="font-medium mb-2">معدل القبول</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>معدل قبول الطلبات</span>
                          <span>78%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>متوسط وقت القبول</span>
                          <span>45 ثانية</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>معدل إكمال الطلبات</span>
                          <span>96%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            السائقون المتاحون
          </CardTitle>
          <CardDescription>
            قائمة بالسائقين المتاحين حاليًا ويمكن توزيع الطلبات إليهم
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-right">رقم السائق</th>
                  <th className="p-3 text-right">الاسم</th>
                  <th className="p-3 text-right">الحالة</th>
                  <th className="p-3 text-right">المركبة</th>
                  <th className="p-3 text-right">الموقع</th>
                  <th className="p-3 text-right">السعة المتبقية</th>
                  <th className="p-3 text-right">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {drivers
                  .filter((driver) => driver.status === 'available')
                  .map((driver) => (
                    <tr key={driver.id} className="border-t">
                      <td className="p-3">{driver.id}</td>
                      <td className="p-3">{driver.name}</td>
                      <td className="p-3">
                        <Badge className="bg-green-500">متاح</Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          {getVehicleIcon(driver.vehicle)}
                          <span className="mr-1">
                            {driver.vehicle === 'truck'
                              ? 'شاحنة'
                              : driver.vehicle === 'car'
                                ? 'سيارة'
                                : driver.vehicle === 'motorcycle'
                                  ? 'دراجة نارية'
                                  : 'دراجة هوائية'}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 ml-1 text-gray-500" />
                          <span className="text-sm">{driver.location}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <span>{driver.capacity - driver.orders}</span>
                          <span className="mx-1">/</span>
                          <span>{driver.capacity}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            toast.success(`عرض الطلبات المتاحة للسائق ${driver.name}`, {
                              description: 'يمكنك اختيار الطلب المناسب من القائمة',
                            });
                          }}
                        >
                          عرض الطلبات
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderAssignment;
