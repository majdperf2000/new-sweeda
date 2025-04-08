import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.js';
import { Button } from '@/components/ui/button.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.js';
import { Badge } from '@/components/ui/Badge.js';
import { toast } from 'sonner';
import {
  ShoppingBag,
  Truck,
  RefreshCw,
  Filter,
  MapPin,
  ArrowUpDown,
  RotateCcw,
} from 'lucide-react';

const OrderManagement = () => {
  const [activeSubTab, setActiveSubTab] = useState('all');

  // Sample orders data
  const orders = [
    {
      id: 'ORD-001',
      customer: 'أحمد محمد',
      items: 3,
      total: 150,
      status: 'new',
      source: 'website',
      date: '28/03/2025',
    },
    {
      id: 'ORD-002',
      customer: 'سارة عبدالله',
      items: 1,
      total: 75,
      status: 'processing',
      source: 'social',
      date: '27/03/2025',
    },
    {
      id: 'ORD-003',
      customer: 'محمد علي',
      items: 5,
      total: 320,
      status: 'shipped',
      source: 'pos',
      date: '26/03/2025',
    },
    {
      id: 'ORD-004',
      customer: 'فاطمة أحمد',
      items: 2,
      total: 95,
      status: 'delivered',
      source: 'website',
      date: '25/03/2025',
    },
    {
      id: 'ORD-005',
      customer: 'خالد حسين',
      items: 4,
      total: 210,
      status: 'returned',
      source: 'website',
      date: '24/03/2025',
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-500">جديد</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-500">قيد المعالجة</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-500">تم الشحن</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">تم التوصيل</Badge>;
      case 'returned':
        return <Badge variant="destructive">مرتجع</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getSourceBadge = (source) => {
    switch (source) {
      case 'website':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            موقع الويب
          </Badge>
        );
      case 'social':
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            وسائل التواصل
          </Badge>
        );
      case 'pos':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            نقطة البيع
          </Badge>
        );
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const handleRouteOrder = (orderId) => {
    toast.success(`توجيه الطلب ${orderId}`, {
      description: 'تم توجيه الطلب إلى أقرب مركز توصيل بنجاح',
    });
  };

  const filteredOrders =
    activeSubTab === 'all' ? orders : orders.filter((order) => order.status === activeSubTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">إدارة الطلبات</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-1" />
            تصفية
          </Button>
          <Button variant="outline">
            <ArrowUpDown className="h-4 w-4 mr-1" />
            ترتيب
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-1" />
            تحديث
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">طلبات جديدة</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">قيد المعالجة</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <RefreshCw className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">تم الشحن</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <Truck className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">مرتجعات</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <RotateCcw className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList>
          <TabsTrigger value="all">جميع الطلبات</TabsTrigger>
          <TabsTrigger value="new">جديد</TabsTrigger>
          <TabsTrigger value="processing">قيد المعالجة</TabsTrigger>
          <TabsTrigger value="shipped">تم الشحن</TabsTrigger>
          <TabsTrigger value="delivered">تم التوصيل</TabsTrigger>
          <TabsTrigger value="returned">مرتجع</TabsTrigger>
        </TabsList>

        <TabsContent value={activeSubTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="ml-2 h-5 w-5" />
                الطلبات
              </CardTitle>
              <CardDescription>
                {activeSubTab === 'all'
                  ? 'جميع الطلبات'
                  : activeSubTab === 'new'
                    ? 'الطلبات الجديدة'
                    : activeSubTab === 'processing'
                      ? 'الطلبات قيد المعالجة'
                      : activeSubTab === 'shipped'
                        ? 'الطلبات المشحونة'
                        : activeSubTab === 'delivered'
                          ? 'الطلبات المسلمة'
                          : 'الطلبات المرتجعة'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-right">رقم الطلب</th>
                      <th className="p-3 text-right">العميل</th>
                      <th className="p-3 text-right">العناصر</th>
                      <th className="p-3 text-right">المجموع</th>
                      <th className="p-3 text-right">المصدر</th>
                      <th className="p-3 text-right">التاريخ</th>
                      <th className="p-3 text-right">الحالة</th>
                      <th className="p-3 text-right">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-t">
                        <td className="p-3">{order.id}</td>
                        <td className="p-3">{order.customer}</td>
                        <td className="p-3">{order.items}</td>
                        <td className="p-3">{order.total} ر.س</td>
                        <td className="p-3">{getSourceBadge(order.source)}</td>
                        <td className="p-3">{order.date}</td>
                        <td className="p-3">{getStatusBadge(order.status)}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                toast.info(`تفاصيل الطلب ${order.id}`, {
                                  description: 'عرض تفاصيل الطلب الكاملة',
                                });
                              }}
                            >
                              عرض
                            </Button>
                            {order.status === 'new' && (
                              <Button size="sm" onClick={() => handleRouteOrder(order.id)}>
                                <Truck className="h-3 w-3 mr-1" />
                                توجيه
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {activeSubTab === 'all' && (
            <div className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="ml-2 h-5 w-5" />
                    توجيه الطلبات التلقائي
                  </CardTitle>
                  <CardDescription>توجيه الطلبات تلقائياً إلى أقرب مركز توصيل</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border rounded-md bg-blue-50">
                    <h3 className="text-lg font-semibold mb-2">مراكز التوصيل النشطة</h3>
                    <div className="mb-4">
                      <p className="text-muted-foreground">
                        يتم توجيه الطلبات تلقائياً إلى أقرب مركز توصيل بناءً على موقع العميل.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">المركز الرئيسي</h4>
                            <Badge className="bg-green-500">نشط</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">السعة: 70%</p>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: '70%' }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">المركز الشمالي</h4>
                            <Badge className="bg-green-500">نشط</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">السعة: 45%</p>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: '45%' }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">المركز الجنوبي</h4>
                            <Badge className="bg-green-500">نشط</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">السعة: 90%</p>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: '90%' }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <RotateCcw className="ml-2 h-5 w-5" />
                    تحليل المرتجعات
                  </CardTitle>
                  <CardDescription>تحليل أسباب المرتجعات</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-semibold mb-4">أسباب المرتجعات الشائعة</h3>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>منتج معيب</span>
                          <span>40%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: '40%' }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>غير مطابق للوصف</span>
                          <span>30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: '30%' }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>تأخر التوصيل</span>
                          <span>15%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: '15%' }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>تغيير رأي العميل</span>
                          <span>10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: '10%' }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>أسباب أخرى</span>
                          <span>5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gray-500 h-2 rounded-full"
                            style={{ width: '5%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrderManagement;
