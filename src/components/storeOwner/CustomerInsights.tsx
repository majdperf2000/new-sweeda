import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Users,
  UserCheck,
  Heart,
  Award,
  TrendingUp,
  Layers,
  MessageCircle,
  Gift,
} from 'lucide-react';

const CustomerInsights = () => {
  const [activeSubTab, setActiveSubTab] = useState('segments');

  // Sample customer segments data
  const customerSegments = [
    { id: 1, name: 'العملاء الجدد', count: 45, growth: 12, color: 'blue' },
    { id: 2, name: 'العملاء الدائمين', count: 82, growth: 5, color: 'green' },
    { id: 3, name: 'العملاء المتساقطين', count: 28, growth: -8, color: 'red' },
    { id: 4, name: 'عملاء VIP', count: 15, growth: 20, color: 'purple' },
    { id: 5, name: 'عملاء غير نشطين', count: 63, growth: -3, color: 'yellow' },
  ];

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      customer: 'أحمد محمد',
      product: 'منتج 1',
      rating: 5,
      comment: 'منتج رائع، سأشتري المزيد!',
      sentiment: 'positive',
      date: '28/03/2025',
    },
    {
      id: 2,
      customer: 'سارة عبدالله',
      product: 'منتج 2',
      rating: 4,
      comment: 'جودة جيدة ولكن التوصيل كان متأخراً',
      sentiment: 'mixed',
      date: '27/03/2025',
    },
    {
      id: 3,
      customer: 'محمد علي',
      product: 'منتج 3',
      rating: 2,
      comment: 'المنتج لا يطابق الوصف تماماً',
      sentiment: 'negative',
      date: '26/03/2025',
    },
    {
      id: 4,
      customer: 'فاطمة أحمد',
      product: 'منتج 1',
      rating: 5,
      comment: 'ممتاز! سأوصي أصدقائي به',
      sentiment: 'positive',
      date: '25/03/2025',
    },
  ];

  const getSentimentBadge = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <Badge className="bg-green-500">إيجابي</Badge>;
      case 'negative':
        return <Badge variant="destructive">سلبي</Badge>;
      case 'mixed':
        return <Badge className="bg-yellow-500">مختلط</Badge>;
      default:
        return <Badge variant="outline">محايد</Badge>;
    }
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">تحليل العملاء</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              toast.success('تحديث البيانات', {
                description: 'تم تحديث بيانات العملاء بنجاح',
              });
            }}
          >
            تحديث البيانات
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي العملاء</p>
                <p className="text-2xl font-bold">233</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">العملاء النشطين</p>
                <p className="text-2xl font-bold">142</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">متوسط قيمة العميل</p>
                <p className="text-2xl font-bold">320 ر.س</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList>
          <TabsTrigger value="segments">تقسيم العملاء</TabsTrigger>
          <TabsTrigger value="sentiment">تحليل المشاعر</TabsTrigger>
          <TabsTrigger value="loyalty">برنامج الولاء</TabsTrigger>
        </TabsList>

        <TabsContent value="segments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Layers className="ml-2 h-5 w-5" />
                تقسيم العملاء (RFM)
              </CardTitle>
              <CardDescription>تحليل العملاء حسب الحداثة، التكرار والقيمة المالية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="p-4 border rounded-md bg-blue-50">
                  <h3 className="text-lg font-semibold mb-2">نموذج RFM</h3>
                  <p className="text-muted-foreground mb-4">
                    يتم تقسيم العملاء بناءً على ثلاثة عوامل رئيسية:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-3">
                        <h4 className="font-medium text-blue-600 mb-2">الحداثة (Recency)</h4>
                        <p className="text-sm text-muted-foreground">
                          متى كان آخر طلب للعميل؟ كلما كان أحدث، كلما كان أفضل.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-3">
                        <h4 className="font-medium text-green-600 mb-2">التكرار (Frequency)</h4>
                        <p className="text-sm text-muted-foreground">
                          عدد المرات التي اشترى فيها العميل. زيادة التكرار تعني ولاء أكبر.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-3">
                        <h4 className="font-medium text-purple-600 mb-2">
                          القيمة المالية (Monetary)
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          إجمالي ما أنفقه العميل. ارتفاع القيمة يعني أهمية أكبر.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-right">الشريحة</th>
                      <th className="p-3 text-right">عدد العملاء</th>
                      <th className="p-3 text-right">النمو</th>
                      <th className="p-3 text-right">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerSegments.map((segment) => (
                      <tr key={segment.id} className="border-t">
                        <td className="p-3">
                          <div className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full bg-${segment.color}-500 mr-2`}
                            ></div>
                            {segment.name}
                          </div>
                        </td>
                        <td className="p-3">{segment.count}</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            {segment.growth > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            ) : (
                              <TrendingUp className="h-4 w-4 text-red-500 mr-1 transform rotate-180" />
                            )}
                            <span
                              className={segment.growth > 0 ? 'text-green-500' : 'text-red-500'}
                            >
                              {segment.growth > 0 ? '+' : ''}
                              {segment.growth}%
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              toast.info(`حملة تسويقية لـ ${segment.name}`, {
                                description: 'إنشاء حملة تسويقية مخصصة لهذه الشريحة من العملاء',
                              });
                            }}
                          >
                            إنشاء حملة
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="ml-2 h-5 w-5" />
                تحليل مشاعر التقييمات
              </CardTitle>
              <CardDescription>تحليل مشاعر العملاء باستخدام نموذج RoBERTa NLP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">إيجابي</p>
                          <p className="text-2xl font-bold">70%</p>
                        </div>
                        <div className="text-3xl text-green-500">😀</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-yellow-50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">محايد</p>
                          <p className="text-2xl font-bold">20%</p>
                        </div>
                        <div className="text-3xl text-yellow-500">😐</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-red-50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">سلبي</p>
                          <p className="text-2xl font-bold">10%</p>
                        </div>
                        <div className="text-3xl text-red-500">😞</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-right">العميل</th>
                      <th className="p-3 text-right">المنتج</th>
                      <th className="p-3 text-right">التقييم</th>
                      <th className="p-3 text-right">التعليق</th>
                      <th className="p-3 text-right">المشاعر</th>
                      <th className="p-3 text-right">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <tr key={review.id} className="border-t">
                        <td className="p-3">{review.customer}</td>
                        <td className="p-3">{review.product}</td>
                        <td className="p-3">{renderStars(review.rating)}</td>
                        <td className="p-3">{review.comment}</td>
                        <td className="p-3">{getSentimentBadge(review.sentiment)}</td>
                        <td className="p-3">{review.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4">
                <Button
                  onClick={() => {
                    toast.success('تحليل التقييمات', {
                      description: 'تم تحليل جميع التقييمات الجديدة بنجاح',
                    });
                  }}
                >
                  تحليل التقييمات الجديدة
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loyalty" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="ml-2 h-5 w-5" />
                برنامج الولاء
              </CardTitle>
              <CardDescription>إدارة برنامج الولاء والمكافآت</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">إجمالي النقاط الممنوحة</p>
                          <p className="text-2xl font-bold">12,450</p>
                        </div>
                        <Award className="h-8 w-8 text-amber-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">النقاط المستبدلة</p>
                          <p className="text-2xl font-bold">8,320</p>
                        </div>
                        <Gift className="h-8 w-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            العملاء النشطين في البرنامج
                          </p>
                          <p className="text-2xl font-bold">85</p>
                        </div>
                        <Heart className="h-8 w-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="p-4 border rounded-md bg-purple-50 mb-6">
                <h3 className="text-lg font-semibold mb-2">مستويات برنامج الولاء</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-3">
                        <div className="flex items-center mb-2">
                          <Badge className="bg-gray-500">برونزي</Badge>
                        </div>
                        <p className="text-sm">0 - 500 نقطة</p>
                        <p className="text-sm text-muted-foreground">25 عميل</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-3">
                        <div className="flex items-center mb-2">
                          <Badge className="bg-gray-400">فضي</Badge>
                        </div>
                        <p className="text-sm">501 - 1000 نقطة</p>
                        <p className="text-sm text-muted-foreground">35 عميل</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-3">
                        <div className="flex items-center mb-2">
                          <Badge className="bg-yellow-500">ذهبي</Badge>
                        </div>
                        <p className="text-sm">1001 - 2000 نقطة</p>
                        <p className="text-sm text-muted-foreground">18 عميل</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-3">
                        <div className="flex items-center mb-2">
                          <Badge className="bg-purple-500">ماسي</Badge>
                        </div>
                        <p className="text-sm">2001+ نقطة</p>
                        <p className="text-sm text-muted-foreground">7 عميل</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">المكافآت المتاحة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-center">
                      <div className="mr-4">
                        <Gift className="h-10 w-10 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">خصم 10%</h4>
                        <p className="text-sm text-muted-foreground">500 نقطة</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            toast.info('إدارة المكافأة', {
                              description: 'تعديل تفاصيل مكافأة خصم 10%',
                            });
                          }}
                        >
                          تعديل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex items-center">
                      <div className="mr-4">
                        <Gift className="h-10 w-10 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">شحن مجاني</h4>
                        <p className="text-sm text-muted-foreground">750 نقطة</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            toast.info('إدارة المكافأة', {
                              description: 'تعديل تفاصيل مكافأة الشحن المجاني',
                            });
                          }}
                        >
                          تعديل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex items-center">
                      <div className="mr-4">
                        <Gift className="h-10 w-10 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">هدية مجانية</h4>
                        <p className="text-sm text-muted-foreground">1000 نقطة</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            toast.info('إدارة المكافأة', {
                              description: 'تعديل تفاصيل مكافأة الهدية المجانية',
                            });
                          }}
                        >
                          تعديل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex items-center">
                      <div className="mr-4">
                        <Gift className="h-10 w-10 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">خصم 25%</h4>
                        <p className="text-sm text-muted-foreground">2000 نقطة</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            toast.info('إدارة المكافأة', {
                              description: 'تعديل تفاصيل مكافأة خصم 25%',
                            });
                          }}
                        >
                          تعديل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Button
                onClick={() => {
                  toast.info('إضافة مكافأة جديدة', {
                    description: 'إنشاء مكافأة جديدة في برنامج الولاء',
                  });
                }}
              >
                إضافة مكافأة جديدة
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerInsights;
