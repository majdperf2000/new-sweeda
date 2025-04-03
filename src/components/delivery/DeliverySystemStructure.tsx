import React from 'react';
import {
  Truck,
  Car,
  Bike,
  Bike as BicycleAlternative,
  Building2,
  Users,
  ArrowDown,
  Award,
  Zap,
  Map,
  BarChart4,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const DeliverySystemStructure = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            هيكل نظام التوصيل
          </CardTitle>
          <CardDescription>نظرة عامة على هيكل نظام التوصيل والعلاقات بين مكوناته</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* نظام شركة التوصيل */}
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-xl">القسم 1: نظام شركة التوصيل</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">المركبات:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                      <Truck className="h-8 w-8 text-gray-600 mb-1" />
                      <span className="text-sm">شاحنات</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                      <Car className="h-8 w-8 text-gray-600 mb-1" />
                      <span className="text-sm">سيارات</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                      <Bike className="h-8 w-8 text-gray-600 mb-1" />
                      <span className="text-sm">دراجات نارية</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                      <BicycleAlternative className="h-8 w-8 text-gray-600 mb-1" />
                      <span className="text-sm">دراجات هوائية</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">التراتبية:</h3>
                  <div className="space-y-2 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <ArrowDown className="h-4 w-4 text-blue-500" />
                      <span>إدارة توزيع الطلبات حسب نوع المركبة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowDown className="h-4 w-4 text-blue-500" />
                      <span>نظام تحديد أولوية الطلبات (حسب المسافة أو وقت التسليم)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">لوحة تحكم الشركة:</h3>
                  <div className="space-y-2 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-500" />
                      <span>مراقبة حالة الطلبات في الوقت الفعلي</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Map className="h-4 w-4 text-green-500" />
                      <span>تتبع المركبات عبر الخريطة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart4 className="h-4 w-4 text-green-500" />
                      <span>إحصائيات الأداء (عدد الطلبات اليومية، متوسط وقت التسليم)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* نظام التوصيل الفردي */}
            <Card className="border-2 border-purple-200">
              <CardHeader className="bg-purple-50">
                <CardTitle className="text-xl">القسم 2: نظام التوصيل الفردي (Freelance)</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2 p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span>تسجيل الموصلين الأفراد</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Map className="h-4 w-4 text-purple-500" />
                    <span>اختيار الطلبات المتاحة حسب الموقع</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-purple-500" />
                    <span>تقييم الموصلين من قبل العملاء</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">ميزات التوصيل الفردي:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex flex-col p-2 border rounded-lg">
                      <div className="bg-purple-100 p-2 rounded-md mb-2 text-center">
                        <h4 className="font-medium">مرونة أكبر</h4>
                      </div>
                      <p className="text-sm text-gray-600">توصيل حسب الجدول الزمني للسائق</p>
                    </div>
                    <div className="flex flex-col p-2 border rounded-lg">
                      <div className="bg-purple-100 p-2 rounded-md mb-2 text-center">
                        <h4 className="font-medium">نظام تقييم</h4>
                      </div>
                      <p className="text-sm text-gray-600">تحسين جودة الخدمة عبر التقييمات</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">هيكل البيانات المقترح:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-3 bg-blue-50">
                  <CardTitle className="text-base">companies</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <pre className="text-xs bg-gray-100 p-2 rounded-md overflow-auto">
                    {`{
  companyId: string,
  name: string,
  vehicles: array
  // [{type: "truck", capacity: "1000kg", status: "available"}]
}`}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-3 bg-green-50">
                  <CardTitle className="text-base">delivery_orders</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <pre className="text-xs bg-gray-100 p-2 rounded-md overflow-auto">
                    {`{
  orderId: string,
  companyId: string, // (إذا كانت عبر الشركة)
  deliveryPersonId: string, // (إذا كانت فردية)
  status: "pending" | "in_progress" | "delivered",
  vehicleType: "truck" | "car" | "motorcycle" | "bicycle",
  location: { lat: number, lng: number }
}`}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-3 bg-purple-50">
                  <CardTitle className="text-base">delivery_persons</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <pre className="text-xs bg-gray-100 p-2 rounded-md overflow-auto">
                    {`{
  userId: string,
  type: "company" | "freelance",
  rating: number,
  currentOrderId: string | null
}`}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">خطوات التنفيذ المقترحة:</h3>
            <ol className="space-y-2 list-decimal pr-6">
              <li className="text-sm">
                إنشاء واجهات المستخدم الجديدة (اختيار نوع التوصيل، لوحة تحكم الشركة، واجهة الموصل
                الفردي)
              </li>
              <li className="text-sm">إنشاء قواعد البيانات اللازمة وتنظيم العلاقات بين الجداول</li>
              <li className="text-sm">دمج واجهة برمجة الخرائط للتتبع المباشر للمركبات والسائقين</li>
              <li className="text-sm">تطوير خوارزميات توزيع الطلبات وتحديد الأولويات</li>
              <li className="text-sm">إنشاء نظام التقييم والمتابعة للموصلين</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliverySystemStructure;
