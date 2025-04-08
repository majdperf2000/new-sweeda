import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.js';
import { Button } from '@/components/ui/button.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.js';
import { Badge } from '@/components/ui/Badge.js';
import { toast } from 'sonner';
import {
  BarChart3,
  LineChart,
  Download,
  Calendar,
  TrendingUp,
  FileText,
  Settings,
  Grid,
  BarChart,
  ArrowUp,
  ArrowDown,
  Users,
} from 'lucide-react';

const SalesReports = () => {
  const [activeSubTab, setActiveSubTab] = useState('trends');
  const [timeRange, setTimeRange] = useState('weekly');

  const handleExport = (format) => {
    toast.success(`تصدير التقرير بتنسيق ${format}`, {
      description: 'تم تصدير التقرير بنجاح',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">تقارير المبيعات</h2>
        <div className="flex gap-2">
          <Tabs value={timeRange} onValueChange={setTimeRange} className="mr-2">
            <TabsList>
              <TabsTrigger value="daily">يومي</TabsTrigger>
              <TabsTrigger value="weekly">أسبوعي</TabsTrigger>
              <TabsTrigger value="monthly">شهري</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button variant="outline" onClick={() => handleExport('PDF')}>
            <Download className="h-4 w-4 mr-1" />
            PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport('CSV')}>
            <Download className="h-4 w-4 mr-1" />
            CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">المبيعات الإجمالية</p>
                <p className="text-2xl font-bold">12,540 ر.س</p>
                <div className="flex items-center text-green-500 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>15.3%</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">عدد الطلبات</p>
                <p className="text-2xl font-bold">86</p>
                <div className="flex items-center text-green-500 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>8.2%</span>
                </div>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">متوسط قيمة الطلب</p>
                <p className="text-2xl font-bold">145 ر.س</p>
                <div className="flex items-center text-green-500 text-sm">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>6.7%</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">معدل الارتجاع</p>
                <p className="text-2xl font-bold">5.8%</p>
                <div className="flex items-center text-red-500 text-sm">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  <span>2.1%</span>
                </div>
              </div>
              <ArrowDown className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList>
          <TabsTrigger value="trends">اتجاهات المبيعات</TabsTrigger>
          <TabsTrigger value="performance">أداء المنتجات</TabsTrigger>
          <TabsTrigger value="custom">تقارير مخصصة</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="ml-2 h-5 w-5" />
                اتجاهات المبيعات{' '}
                {timeRange === 'daily'
                  ? 'اليومية'
                  : timeRange === 'weekly'
                    ? 'الأسبوعية'
                    : 'الشهرية'}
              </CardTitle>
              <CardDescription>تحليل اتجاهات المبيعات على مدار الفترة المحددة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-md">
                <div className="h-64 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md flex items-end p-4 gap-1">
                  {/* رسم بياني محاكي للمبيعات */}
                  {Array(14)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-blue-500 rounded-t"
                        style={{
                          height: `${20 + Math.floor(Math.random() * 70)}%`,
                          opacity: 0.7 + i / 30,
                        }}
                      ></div>
                    ))}
                </div>
                <div className="mt-2 text-sm flex justify-between text-muted-foreground">
                  {timeRange === 'daily' ? (
                    <>
                      <span>صباحاً</span>
                      <span>ظهراً</span>
                      <span>مساءً</span>
                    </>
                  ) : timeRange === 'weekly' ? (
                    <>
                      <span>السبت</span>
                      <span>الأحد</span>
                      <span>الإثنين</span>
                      <span>الثلاثاء</span>
                      <span>الأربعاء</span>
                      <span>الخميس</span>
                      <span>الجمعة</span>
                    </>
                  ) : (
                    <>
                      <span>يناير</span>
                      <span>فبراير</span>
                      <span>مارس</span>
                      <span>أبريل</span>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">توزيع المبيعات حسب المنتج</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 bg-gradient-to-r from-purple-50 to-purple-100 rounded-md p-4 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-8 border-purple-200 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full">
                          <div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{
                              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)',
                              background: 'rgba(139, 92, 246, 0.7)',
                            }}
                          ></div>
                          <div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{
                              clipPath: 'polygon(0 0, 100% 100%, 0 100%, 0 0)',
                              background: 'rgba(16, 185, 129, 0.7)',
                            }}
                          ></div>
                          <div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{
                              clipPath: 'polygon(100% 0, 100% 100%, 40% 100%, 0 0)',
                              background: 'rgba(59, 130, 246, 0.7)',
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-sm">منتج 1 (45%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">منتج 2 (30%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">منتج 3 (25%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">المبيعات حسب الوقت</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md p-4 flex items-end">
                      <div className="flex-1 mx-1">
                        <div className="h-12 bg-blue-500 rounded-t"></div>
                        <div className="text-xs text-center mt-1">صباحاً</div>
                      </div>
                      <div className="flex-1 mx-1">
                        <div className="h-28 bg-blue-500 rounded-t"></div>
                        <div className="text-xs text-center mt-1">ظهراً</div>
                      </div>
                      <div className="flex-1 mx-1">
                        <div className="h-36 bg-blue-500 rounded-t"></div>
                        <div className="text-xs text-center mt-1">مساءً</div>
                      </div>
                      <div className="flex-1 mx-1">
                        <div className="h-20 bg-blue-500 rounded-t"></div>
                        <div className="text-xs text-center mt-1">ليلاً</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        ذروة المبيعات: <span className="font-medium">7:00 مساءً - 9:00 مساءً</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Grid className="ml-2 h-5 w-5" />
                خريطة حرارية لأداء المنتجات
              </CardTitle>
              <CardDescription>تحليل أداء المنتجات بناءً على المبيعات والربح</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-md mb-6">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  <div className="h-16 bg-red-200 rounded flex items-center justify-center text-xs text-red-800">
                    منخفض
                  </div>
                  <div className="h-16 bg-red-300 rounded flex items-center justify-center text-xs text-red-800"></div>
                  <div className="h-16 bg-yellow-300 rounded flex items-center justify-center text-xs text-yellow-800">
                    متوسط
                  </div>
                  <div className="h-16 bg-green-300 rounded flex items-center justify-center text-xs text-green-800"></div>
                  <div className="h-16 bg-green-500 rounded flex items-center justify-center text-xs text-white">
                    مرتفع
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-2 border rounded-md p-2">
                  <div className="flex items-center justify-center text-xs font-medium p-2"></div>
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center text-xs font-medium p-2 bg-gray-100 rounded"
                      >
                        {i === 0 ? 'منخفض' : i === 4 ? 'مرتفع' : ''}
                        {i === 2 && 'الربح'}
                      </div>
                    ))}

                  {Array(5)
                    .fill(0)
                    .map((_, row) => (
                      <React.Fragment key={`row-${row}`}>
                        <div className="flex items-center justify-center text-xs font-medium p-2 bg-gray-100 rounded">
                          {row === 0 ? 'مرتفع' : row === 4 ? 'منخفض' : ''}
                          {row === 2 && 'المبيعات'}
                        </div>

                        {Array(5)
                          .fill(0)
                          .map((_, col) => {
                            // Create different cells with different colors based on position
                            const colorIndex = Math.abs((col - row) * 3) % 5; // just for variety
                            const colors = [
                              'bg-red-200',
                              'bg-red-300',
                              'bg-yellow-300',
                              'bg-green-300',
                              'bg-green-500',
                            ];
                            const textColors = [
                              'text-red-800',
                              'text-red-800',
                              'text-yellow-800',
                              'text-green-800',
                              'text-white',
                            ];

                            // Add product names to specific cells
                            let productName = '';
                            if (row === 1 && col === 3) productName = 'منتج 1';
                            if (row === 0 && col === 4) productName = 'منتج 2';
                            if (row === 2 && col === 2) productName = 'منتج 3';
                            if (row === 3 && col === 1) productName = 'منتج 4';
                            if (row === 4 && col === 0) productName = 'منتج 5';

                            return (
                              <div
                                key={`cell-${row}-${col}`}
                                className={`flex items-center justify-center text-xs p-2 rounded-md ${colors[colorIndex]} ${textColors[colorIndex]}`}
                              >
                                {productName}
                              </div>
                            );
                          })}
                      </React.Fragment>
                    ))}
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-right">المنتج</th>
                      <th className="p-3 text-right">المبيعات</th>
                      <th className="p-3 text-right">الربح</th>
                      <th className="p-3 text-right">النمو</th>
                      <th className="p-3 text-right">التصنيف</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3">منتج 1</td>
                      <td className="p-3">1,250 ر.س</td>
                      <td className="p-3">450 ر.س</td>
                      <td className="p-3">
                        <span className="text-green-500">+15%</span>
                      </td>
                      <td className="p-3">
                        <Badge className="bg-green-500">مرتفع الأداء</Badge>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">منتج 2</td>
                      <td className="p-3">980 ر.س</td>
                      <td className="p-3">340 ر.س</td>
                      <td className="p-3">
                        <span className="text-green-500">+8%</span>
                      </td>
                      <td className="p-3">
                        <Badge className="bg-green-500">مرتفع الأداء</Badge>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">منتج 3</td>
                      <td className="p-3">750 ر.س</td>
                      <td className="p-3">210 ر.س</td>
                      <td className="p-3">
                        <span className="text-yellow-500">+2%</span>
                      </td>
                      <td className="p-3">
                        <Badge className="bg-yellow-500">متوسط الأداء</Badge>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">منتج 4</td>
                      <td className="p-3">420 ر.س</td>
                      <td className="p-3">120 ر.س</td>
                      <td className="p-3">
                        <span className="text-red-500">-5%</span>
                      </td>
                      <td className="p-3">
                        <Badge variant="destructive">منخفض الأداء</Badge>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">منتج 5</td>
                      <td className="p-3">320 ر.س</td>
                      <td className="p-3">80 ر.س</td>
                      <td className="p-3">
                        <span className="text-red-500">-10%</span>
                      </td>
                      <td className="p-3">
                        <Badge variant="destructive">منخفض الأداء</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="ml-2 h-5 w-5" />
                بناء تقارير مخصصة
              </CardTitle>
              <CardDescription>إنشاء تقارير مخصصة حسب احتياجاتك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">التقارير المحفوظة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">تقرير أداء المنتجات الأسبوعي</h4>
                          <p className="text-sm text-muted-foreground">آخر تحديث: 28/03/2025</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleExport('PDF')}>
                            <Download className="h-3 w-3 mr-1" />
                            PDF
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleExport('CSV')}>
                            <Download className="h-3 w-3 mr-1" />
                            CSV
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">تقرير العملاء ومبيعاتهم</h4>
                          <p className="text-sm text-muted-foreground">آخر تحديث: 27/03/2025</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleExport('PDF')}>
                            <Download className="h-3 w-3 mr-1" />
                            PDF
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleExport('CSV')}>
                            <Download className="h-3 w-3 mr-1" />
                            CSV
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="p-4 border rounded-md mb-6">
                <h3 className="text-lg font-semibold mb-4">إنشاء تقرير جديد</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-base font-medium mb-2">نوع التقرير</h4>
                      <div className="grid grid-cols-1 gap-2">
                        <Card className="cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                          <CardContent className="p-3 flex items-center">
                            <BarChart className="h-4 w-4 mr-2 text-blue-600" />
                            <span>مبيعات المنتجات</span>
                          </CardContent>
                        </Card>
                        <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                          <CardContent className="p-3 flex items-center">
                            <LineChart className="h-4 w-4 mr-2 text-green-600" />
                            <span>تحليل العملاء</span>
                          </CardContent>
                        </Card>
                        <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                          <CardContent className="p-3 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
                            <span>تقرير الربحية</span>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-medium mb-2">الفترة الزمنية</h4>
                      <div className="grid grid-cols-1 gap-2">
                        <Card className="cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                          <CardContent className="p-3 flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                            <span>الأسبوع الحالي</span>
                          </CardContent>
                        </Card>
                        <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                          <CardContent className="p-3 flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-green-600" />
                            <span>الشهر الحالي</span>
                          </CardContent>
                        </Card>
                        <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                          <CardContent className="p-3 flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                            <span>مخصص</span>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-medium mb-2">تنسيق التصدير</h4>
                      <div className="grid grid-cols-1 gap-2">
                        <Card className="cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                          <CardContent className="p-3 flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-blue-600" />
                            <span>PDF</span>
                          </CardContent>
                        </Card>
                        <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                          <CardContent className="p-3 flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-green-600" />
                            <span>Excel</span>
                          </CardContent>
                        </Card>
                        <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                          <CardContent className="p-3 flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-purple-600" />
                            <span>CSV</span>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    onClick={() => {
                      toast.success('إنشاء التقرير', {
                        description: 'جاري إنشاء تقرير مبيعات المنتجات للأسبوع الحالي',
                      });
                    }}
                  >
                    إنشاء التقرير
                  </Button>
                </div>
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="text-lg font-semibold mb-2">تقارير مقترحة</h3>
                <p className="text-muted-foreground mb-4">
                  بناءً على نشاط متجرك، قد تكون هذه التقارير مفيدة لك:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      toast.info('إنشاء تقرير', {
                        description: 'جاري إنشاء تقرير أفضل المنتجات مبيعاً',
                      });
                    }}
                  >
                    <BarChart className="h-4 w-4 mr-2" />
                    تقرير أفضل المنتجات مبيعاً
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      toast.info('إنشاء تقرير', {
                        description: 'جاري إنشاء تقرير مقارنة المبيعات الشهرية',
                      });
                    }}
                  >
                    <LineChart className="h-4 w-4 mr-2" />
                    تقرير مقارنة المبيعات الشهرية
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      toast.info('إنشاء تقرير', {
                        description: 'جاري إنشاء تقرير أداء العملاء الجدد',
                      });
                    }}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    تقرير أداء العملاء الجدد
                  </Button>

                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      toast.info('إنشاء تقرير', {
                        description: 'جاري إنشاء تقرير تحليل مرتجعات المنتجات',
                      });
                    }}
                  >
                    <ArrowDown className="h-4 w-4 mr-2" />
                    تقرير تحليل مرتجعات المنتجات
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesReports;
