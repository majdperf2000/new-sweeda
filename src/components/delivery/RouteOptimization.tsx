import React, { useState } from 'react';
import {
  Truck,
  LayoutList,
  Route,
  Fuel,
  Camera,
  Pencil,
  Check,
  CheckCircle,
  FileImage,
  MapPin,
  Clock,
  Download,
  PlusCircle,
  ArrowUpDown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.js';
import { Badge } from '@/components/ui/Badge.js';
import { Button } from '@/components/ui/button.js';
import {} from '@/components/ui/table.js';
import { ScrollArea } from '@/components/ui/scroll-area.js';
import { toast } from 'sonner';
import { TrackingMap } from '@/components/tracking/TrackingMap.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.js';

// Mock data for routes
const routes = [
  {
    id: 'ROUTE-123',
    driver: 'عمر حسن',
    driverId: 'DRV-143',
    status: 'active',
    stops: 5,
    completedStops: 2,
    estimatedTime: '45 دقيقة',
    distance: '12.5 كم',
    fuelConsumption: '1.3 لتر',
    startTime: '10:15',
    locations: [
      {
        id: 'STOP-1',
        address: 'دمشق - المزة - شارع الجلاء',
        status: 'completed',
        time: '10:30',
        type: 'pickup',
      },
      {
        id: 'STOP-2',
        address: 'دمشق - المزة - جبل الرادار',
        status: 'completed',
        time: '10:45',
        type: 'delivery',
      },
      {
        id: 'STOP-3',
        address: 'دمشق - المزة - اتوستراد المزة',
        status: 'in_progress',
        time: '11:00',
        type: 'delivery',
      },
      {
        id: 'STOP-4',
        address: 'دمشق - المهاجرين',
        status: 'pending',
        time: '11:20',
        type: 'delivery',
      },
      {
        id: 'STOP-5',
        address: 'دمشق - الروضة',
        status: 'pending',
        time: '11:35',
        type: 'delivery',
      },
    ],
    proofOfDelivery: [
      { stopId: 'STOP-1', type: 'signature', status: 'verified', time: '10:35' },
      { stopId: 'STOP-2', type: 'photo', status: 'verified', time: '10:50' },
    ],
  },
  {
    id: 'ROUTE-124',
    driver: 'حسام علي',
    driverId: 'DRV-156',
    status: 'completed',
    stops: 4,
    completedStops: 4,
    estimatedTime: '35 دقيقة',
    distance: '8.7 كم',
    fuelConsumption: '0.9 لتر',
    startTime: '09:30',
    locations: [
      {
        id: 'STOP-6',
        address: 'دمشق - الروضة - شارع بغداد',
        status: 'completed',
        time: '09:45',
        type: 'pickup',
      },
      {
        id: 'STOP-7',
        address: 'دمشق - الروضة - شارع الثورة',
        status: 'completed',
        time: '10:00',
        type: 'delivery',
      },
      {
        id: 'STOP-8',
        address: 'دمشق - أبو رمانة',
        status: 'completed',
        time: '10:15',
        type: 'delivery',
      },
      {
        id: 'STOP-9',
        address: 'دمشق - كفرسوسة',
        status: 'completed',
        time: '10:25',
        type: 'delivery',
      },
    ],
    proofOfDelivery: [
      { stopId: 'STOP-6', type: 'signature', status: 'verified', time: '09:48' },
      { stopId: 'STOP-7', type: 'photo', status: 'verified', time: '10:05' },
      { stopId: 'STOP-8', type: 'signature', status: 'verified', time: '10:18' },
      { stopId: 'STOP-9', type: 'photo', status: 'verified', time: '10:28' },
    ],
  },
  {
    id: 'ROUTE-125',
    driver: 'ليلى سعيد',
    driverId: 'DRV-178',
    status: 'pending',
    stops: 6,
    completedStops: 0,
    estimatedTime: '55 دقيقة',
    distance: '14.2 كم',
    fuelConsumption: '1.5 لتر',
    startTime: '11:30',
    locations: [
      {
        id: 'STOP-10',
        address: 'دمشق - مشروع دمر',
        status: 'pending',
        time: '11:45',
        type: 'pickup',
      },
      {
        id: 'STOP-11',
        address: 'دمشق - المالكي',
        status: 'pending',
        time: '12:00',
        type: 'delivery',
      },
      {
        id: 'STOP-12',
        address: 'دمشق - الصالحية',
        status: 'pending',
        time: '12:15',
        type: 'delivery',
      },
      {
        id: 'STOP-13',
        address: 'دمشق - ساروجة',
        status: 'pending',
        time: '12:30',
        type: 'delivery',
      },
      {
        id: 'STOP-14',
        address: 'دمشق - القصاع',
        status: 'pending',
        time: '12:45',
        type: 'delivery',
      },
      {
        id: 'STOP-15',
        address: 'دمشق - باب توما',
        status: 'pending',
        time: '13:00',
        type: 'delivery',
      },
    ],
    proofOfDelivery: [],
  },
];

const RouteOptimization = () => {
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);
  const [activeTab, setActiveTab] = useState('map');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="secondary" className="bg-blue-500 text-white">
            نشط
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="secondary" className="bg-green-500 text-white">
            مكتمل
          </Badge>
        );
      case 'pending':
        return <Badge variant="outline">قيد الانتظار</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getStopStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="secondary" className="bg-green-500 text-white">
            تم
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge variant="secondary" className="bg-blue-500 text-white">
            جاري
          </Badge>
        );
      case 'pending':
        return <Badge variant="outline">قيد الانتظار</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getStopTypeBadge = (type) => {
    switch (type) {
      case 'pickup':
        return (
          <Badge variant="secondary" className="bg-purple-500 text-white">
            استلام
          </Badge>
        );
      case 'delivery':
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            توصيل
          </Badge>
        );
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const handleOptimizeRoute = (routeId) => {
    toast.success('تم تحسين المسار', {
      description: `تم تحسين مسار التوصيل ${routeId} وتوفير 15% من المسافة`,
    });
  };

  const handleCollectProof = (stopId, type) => {
    toast.success('تم جمع إثبات التوصيل', {
      description: `تم تسجيل ${type === 'photo' ? 'صورة' : 'توقيع'} كإثبات تسليم للمحطة ${stopId}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">تحسين المسارات</h2>
          <p className="text-muted-foreground">تنظيم وتحسين مسارات التوصيل وجمع إثباتات التسليم</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            onClick={() => {
              toast.info('مساعدة تحسين المسارات', {
                description: 'تعرض هذه الصفحة المسارات النشطة وتوفر أدوات لتحسينها وتتبعها',
              });
            }}
          >
            جدولة مسار جديد
          </Button>
          <Button
            onClick={() => {
              toast.success('تم تحسين جميع المسارات', {
                description: 'تم تحديد أفضل المسارات لجميع التوصيلات النشطة',
              });
            }}
          >
            <Route className="mr-2 h-4 w-4" />
            تحسين جميع المسارات
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LayoutList className="mr-2 h-5 w-5" />
                المسارات النشطة
              </CardTitle>
              <CardDescription>{routes.length} مسار مجدول</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {routes.map((route) => (
                  <div
                    key={route.id}
                    className={`border-b p-4 cursor-pointer hover:bg-accent/50 ${
                      selectedRoute?.id === route.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => setSelectedRoute(route)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{route.id}</div>
                        <div className="text-sm text-muted-foreground">السائق: {route.driver}</div>
                      </div>
                      {getStatusBadge(route.status)}
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-sm mt-3">
                      <div>
                        <div className="font-medium">{route.stops}</div>
                        <div className="text-xs text-muted-foreground">محطات</div>
                      </div>
                      <div>
                        <div className="font-medium">{route.distance}</div>
                        <div className="text-xs text-muted-foreground">المسافة</div>
                      </div>
                      <div>
                        <div className="font-medium">{route.estimatedTime}</div>
                        <div className="text-xs text-muted-foreground">الوقت</div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            route.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${(route.completedStops / route.stops) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground text-center mt-1">
                        {route.completedStops}/{route.stops} مكتمل
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedRoute && (
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Route className="mr-2 h-5 w-5" />
                    المسار {selectedRoute.id}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {selectedRoute.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                        onClick={() => handleOptimizeRoute(selectedRoute.id)}
                      >
                        <ArrowUpDown className="h-4 w-4 mr-1" />
                        تحسين المسار
                      </Button>
                    )}
                  </div>
                </div>
                <CardDescription>
                  السائق: {selectedRoute.driver} | وقت البدء: {selectedRoute.startTime} | المحطات:{' '}
                  {selectedRoute.completedStops}/{selectedRoute.stops}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="map" value={activeTab} onValueChange={setActiveTab}>
                  <div className="border-b px-6">
                    <TabsList className="w-full justify-start">
                      <TabsTrigger value="map">الخريطة</TabsTrigger>
                      <TabsTrigger value="stops">المحطات</TabsTrigger>
                      <TabsTrigger value="fuel">استهلاك الوقود</TabsTrigger>
                      <TabsTrigger value="proof">إثبات التسليم</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="map" className="m-0">
                    <div className="h-[500px]">
                      <TrackingMap
                        driverLocation={{
                          lat: 32.7089,
                          lng: 36.5717,
                          lastUpdated: 'منذ 2 دقيقة',
                        }}
                        deliveryAddress={
                          selectedRoute.locations[selectedRoute.locations.length - 1].address
                        }
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="stops" className="m-0 p-6">
                    <div className="space-y-1">
                      {selectedRoute.locations.map((stop, index) => (
                        <div
                          key={stop.id}
                          className={`p-3 border rounded-md mb-3 ${
                            stop.status === 'completed'
                              ? 'bg-green-50 border-green-200'
                              : stop.status === 'in_progress'
                                ? 'bg-blue-50 border-blue-200'
                                : ''
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="flex flex-col items-center mr-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  stop.status === 'completed'
                                    ? 'bg-green-500 text-white'
                                    : stop.status === 'in_progress'
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-gray-200'
                                }`}
                              >
                                {index + 1}
                              </div>
                              {index < selectedRoute.locations.length - 1 && (
                                <div
                                  className={`w-0.5 h-8 ${
                                    stop.status === 'completed'
                                      ? 'bg-green-500'
                                      : stop.status === 'in_progress'
                                        ? 'bg-blue-500'
                                        : 'bg-gray-200'
                                  }`}
                                ></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">{stop.address}</div>
                                  <div className="text-sm text-muted-foreground flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {stop.time}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getStopTypeBadge(stop.type)}
                                  {getStopStatusBadge(stop.status)}
                                </div>
                              </div>

                              {stop.status === 'in_progress' && (
                                <div className="mt-3 flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-blue-50 text-blue-700 border-blue-200"
                                    onClick={() => handleCollectProof(stop.id, 'signature')}
                                  >
                                    <Pencil className="h-3 w-3 mr-1" />
                                    توقيع
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-blue-50 text-blue-700 border-blue-200"
                                    onClick={() => handleCollectProof(stop.id, 'photo')}
                                  >
                                    <Camera className="h-3 w-3 mr-1" />
                                    صورة
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      toast.success('تم اكتمال المحطة', {
                                        description: `تم تأكيد اكتمال المحطة ${stop.id}`,
                                      });
                                    }}
                                  >
                                    <Check className="h-3 w-3 mr-1" />
                                    إكمال
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="fuel" className="m-0 p-6">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <Fuel className="h-4 w-4 mr-2" />
                            تفاصيل استهلاك الوقود
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="border rounded-md p-3 text-center">
                              <div className="text-2xl font-bold text-blue-600">
                                {selectedRoute.fuelConsumption}
                              </div>
                              <div className="text-sm text-muted-foreground">إجمالي الاستهلاك</div>
                            </div>
                            <div className="border rounded-md p-3 text-center">
                              <div className="text-2xl font-bold text-green-600">0.10 لتر/كم</div>
                              <div className="text-sm text-muted-foreground">معدل الاستهلاك</div>
                            </div>
                            <div className="border rounded-md p-3 text-center">
                              <div className="text-2xl font-bold text-purple-600">5%</div>
                              <div className="text-sm text-muted-foreground">توفير متوقع</div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-sm font-medium">توصيات تحسين استهلاك الوقود:</h4>
                            <div className="border rounded-md p-3 bg-accent/50">
                              <div className="flex items-start">
                                <Route className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                                <div>
                                  <h5 className="font-medium">ضبط مسار التوصيل</h5>
                                  <p className="text-sm text-muted-foreground">
                                    تعديل ترتيب المحطات لتقليل المسافة الإجمالية. يمكن توفير 1.2 كم.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border rounded-md p-3 bg-accent/50">
                              <div className="flex items-start">
                                <Truck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                <div>
                                  <h5 className="font-medium">نصائح القيادة</h5>
                                  <p className="text-sm text-muted-foreground">
                                    الحفاظ على سرعة ثابتة وتجنب التسارع المفاجئ يمكن أن يوفر حتى 10%
                                    من استهلاك الوقود.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                toast.success('تم تحديث توصيات استهلاك الوقود', {
                                  description: 'تم تحليل البيانات الأخيرة وتحديث التوصيات',
                                });
                              }}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              تحميل تقرير استهلاك الوقود
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            مخطط المسار واستهلاك الوقود
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="p-4 border rounded-md bg-accent/50">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <span className="font-medium">المسار الأصلي:</span>
                                <span className="mr-2">
                                  {selectedRoute.distance} | {selectedRoute.fuelConsumption}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium">المسار المُحسّن:</span>
                                <span className="mr-2 text-green-600">
                                  {parseFloat(selectedRoute.distance) - 1.2} كم |{' '}
                                  {(parseFloat(selectedRoute.fuelConsumption) - 0.1).toFixed(1)} لتر
                                </span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              {selectedRoute.locations.map((stop, index) => (
                                <div key={stop.id} className="flex items-center text-sm">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mr-2">
                                    {index + 1}
                                  </div>
                                  <div>{stop.address}</div>

                                  {index < selectedRoute.locations.length - 1 && (
                                    <div className="mx-2">
                                      <ArrowUpDown className="h-4 w-4 text-muted-foreground rotate-90" />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="proof" className="m-0 p-6">
                    <div className="space-y-6">
                      <div className="border rounded-md p-4">
                        <h3 className="text-lg font-medium mb-4">
                          إثباتات التسليم المجمعة ({selectedRoute.proofOfDelivery.length}/
                          {selectedRoute.stops})
                        </h3>

                        {selectedRoute.proofOfDelivery.length > 0 ? (
                          <div className="space-y-4">
                            {selectedRoute.proofOfDelivery.map((proof) => (
                              <div
                                key={proof.stopId}
                                className="p-3 border rounded-md bg-green-50 border-green-200"
                              >
                                <div className="flex items-start">
                                  {proof.type === 'signature' ? (
                                    <Pencil className="h-5 w-5 text-green-500 mr-3" />
                                  ) : (
                                    <Camera className="h-5 w-5 text-green-500 mr-3" />
                                  )}
                                  <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <div className="font-medium">
                                          {proof.type === 'signature' ? 'توقيع' : 'صورة'} -{' '}
                                          {proof.stopId}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          <Clock className="h-3 w-3 inline-block mr-1" />
                                          {proof.time}
                                        </div>
                                      </div>
                                      <Badge
                                        variant="secondary"
                                        className="bg-green-500 text-white flex items-center"
                                      >
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        {proof.status === 'verified'
                                          ? 'تم التحقق'
                                          : 'بانتظار التحقق'}
                                      </Badge>
                                    </div>
                                    <div className="mt-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          toast.info('عرض إثبات التسليم', {
                                            description: `عرض ${proof.type === 'signature' ? 'التوقيع' : 'الصورة'} للمحطة ${proof.stopId}`,
                                          });
                                        }}
                                      >
                                        <FileImage className="h-3 w-3 mr-1" />
                                        عرض
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}

                            {selectedRoute.proofOfDelivery.length < selectedRoute.stops && (
                              <div className="p-3 border rounded-md bg-blue-50 border-blue-200">
                                <div className="flex items-center">
                                  <PlusCircle className="h-5 w-5 text-blue-500 mr-3" />
                                  <div>
                                    <div className="font-medium">جمع إثباتات تسليم إضافية</div>
                                    <div className="text-sm text-muted-foreground">
                                      بقيت{' '}
                                      {selectedRoute.stops - selectedRoute.proofOfDelivery.length}{' '}
                                      إثباتات تسليم مطلوبة
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center p-6 border rounded-md bg-muted/50">
                            <FileImage className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                            <h4 className="text-lg font-medium">لا توجد إثباتات تسليم مجمعة</h4>
                            <p className="text-sm text-muted-foreground mt-2 mb-4">
                              لم يتم جمع أي إثباتات تسليم لهذا المسار حتى الآن.
                            </p>
                            {selectedRoute.status === 'active' && (
                              <Button
                                onClick={() => {
                                  toast.info('طلب إثبات تسليم', {
                                    description:
                                      'تم إرسال طلب للسائق لتسجيل إثبات التسليم للمحطة الحالية',
                                  });
                                }}
                              >
                                <Camera className="h-4 w-4 mr-2" />
                                طلب إثبات تسليم
                              </Button>
                            )}
                          </div>
                        )}
                      </div>

                      {selectedRoute.proofOfDelivery.length > 0 && (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            toast.success('تم تحميل جميع إثباتات التسليم', {
                              description: 'جاري تحميل ملف PDF يحتوي على جميع إثباتات التسليم',
                            });
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          تحميل جميع إثباتات التسليم
                        </Button>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RouteOptimization;
