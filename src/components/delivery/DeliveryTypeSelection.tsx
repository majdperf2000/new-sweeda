import React from 'react';
import { Building2, User, ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const DeliveryTypeSelection = () => {
  const handleSelectDeliveryType = (type: 'company' | 'freelance') => {
    toast.success(`تم اختيار نوع التوصيل: ${type === 'company' ? 'شركة توصيل' : 'توصيل فردي'}`);
    // هنا يمكن إضافة منطق التوجيه إلى الواجهة المناسبة
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-2 bg-blue-50">
          <CardTitle className="flex justify-between items-center">
            <span>طلب عبر شركة توصيل</span>
            <Building2 className="h-10 w-10 text-blue-500" />
          </CardTitle>
          <CardDescription>التوصيل عبر شركات متخصصة مع تتبع مباشر</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-blue-500" />
              <span className="text-sm">تنوع في أنواع المركبات (شاحنات، سيارات، دراجات)</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-blue-500" />
              <span className="text-sm">توصيل الطلبات الكبيرة والثقيلة</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-blue-500" />
              <span className="text-sm">تغطية واسعة للمناطق</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() => handleSelectDeliveryType('company')}
          >
            اختيار توصيل الشركات
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-md">
        <CardHeader className="pb-2 bg-purple-50">
          <CardTitle className="flex justify-between items-center">
            <span>طلب توصيل فردي</span>
            <User className="h-10 w-10 text-purple-500" />
          </CardTitle>
          <CardDescription>توصيل عبر سائقين مستقلين في منطقتك</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-purple-500" />
              <span className="text-sm">وصول أسرع للطلبات الصغيرة</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-purple-500" />
              <span className="text-sm">مرونة في مواعيد التوصيل</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-purple-500" />
              <span className="text-sm">نظام تقييم للسائقين</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-purple-500 hover:bg-purple-600"
            onClick={() => handleSelectDeliveryType('freelance')}
          >
            اختيار التوصيل الفردي
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeliveryTypeSelection;
