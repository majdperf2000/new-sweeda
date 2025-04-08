import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.js';
import { Button } from '@/components/ui/button.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.js';
import { Badge } from '@/components/ui/Badge.js';
import { toast } from 'sonner';
import {
  AlertTriangle,
  AlertCircle,
  Download,
  Upload,
  TrendingUp,
  Package,
  Plus,
  FileSpreadsheet,
  Truck,
  RefreshCw,
  Brain,
} from 'lucide-react';

const InventoryManagement = () => {
  const [activeSubTab, setActiveSubTab] = useState('tracking');

  // Sample inventory items with alerts
  const inventoryItems = [
    { id: 1, name: 'منتج 1', sku: 'SKU001', stock: 5, status: 'low', restockSuggestion: 15 },
    { id: 2, name: 'منتج 2', sku: 'SKU002', stock: 0, status: 'out', restockSuggestion: 20 },
    {
      id: 3,
      name: 'منتج 3',
      sku: 'SKU003',
      stock: 150,
      status: 'overstock',
      restockSuggestion: -50,
    },
    { id: 4, name: 'منتج 4', sku: 'SKU004', stock: 25, status: 'normal', restockSuggestion: 0 },
    { id: 5, name: 'منتج 5', sku: 'SKU005', stock: 8, status: 'low', restockSuggestion: 12 },
  ];

  const handleImport = () => {
    toast.info('استيراد البيانات', {
      description: 'يرجى اختيار ملف CSV أو Excel لاستيراد بيانات المخزون',
    });
  };

  const handleExport = () => {
    toast.success('تصدير البيانات', {
      description: 'تم تصدير بيانات المخزون بنجاح',
    });
  };

  const handleGeneratePO = () => {
    toast.success('إنشاء أمر شراء', {
      description: 'تم إنشاء أمر شراء للمنتجات ذات المخزون المنخفض',
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'low':
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            منخفض
          </Badge>
        );
      case 'out':
        return <Badge variant="destructive">نفد</Badge>;
      case 'overstock':
        return (
          <Badge variant="secondary" className="bg-blue-500 text-white">
            فائض
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-green-500 text-white">
            طبيعي
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">إدارة المخزون</h2>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleImport}>
            <Upload className="h-4 w-4 mr-1" />
            استيراد
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-1" />
            تصدير
          </Button>
          <Button variant="outline" onClick={handleGeneratePO}>
            <Plus className="h-4 w-4 mr-1" />
            إنشاء أمر شراء
          </Button>
        </div>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList>
          <TabsTrigger value="tracking">تتبع المخزون</TabsTrigger>
          <TabsTrigger value="suggestions">اقتراحات الذكاء الاصطناعي</TabsTrigger>
          <TabsTrigger value="import">استيراد/تصدير</TabsTrigger>
          <TabsTrigger value="suppliers">الموردين</TabsTrigger>
        </TabsList>

        <TabsContent value="tracking" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="ml-2 h-5 w-5" />
                تتبع المخزون في الوقت الفعلي
              </CardTitle>
              <CardDescription>مراقبة حالة المخزون والتنبيهات</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">نفد من المخزون</p>
                        <p className="text-2xl font-bold">1</p>
                      </div>
                      <AlertCircle className="h-8 w-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">مخزون منخفض</p>
                        <p className="text-2xl font-bold">2</p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">فائض في المخزون</p>
                        <p className="text-2xl font-bold">1</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-right">الاسم</th>
                      <th className="p-3 text-right">رمز المنتج</th>
                      <th className="p-3 text-right">المخزون الحالي</th>
                      <th className="p-3 text-right">الحالة</th>
                      <th className="p-3 text-right">اقتراح الذكاء الاصطناعي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryItems.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">{item.sku}</td>
                        <td className="p-3">{item.stock}</td>
                        <td className="p-3">{getStatusBadge(item.status)}</td>
                        <td className="p-3">
                          {item.restockSuggestion > 0 ? (
                            <span className="text-green-600">+{item.restockSuggestion}</span>
                          ) : item.restockSuggestion < 0 ? (
                            <span className="text-red-600">{item.restockSuggestion}</span>
                          ) : (
                            <span className="text-gray-600">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="ml-2 h-5 w-5" />
                اقتراحات الذكاء الاصطناعي
              </CardTitle>
              <CardDescription>
                اقتراحات إعادة التخزين بناءً على نماذج ARIMA/XGBoost
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-md bg-blue-50">
                  <h3 className="text-lg font-semibold mb-2">توقعات الطلب للشهر القادم</h3>
                  <p className="text-muted-foreground mb-4">
                    تم تحليل بيانات المبيعات السابقة باستخدام نماذج التعلم الآلي للتنبؤ بالطلب
                    المستقبلي.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">منتج 1</CardTitle>
                        <CardDescription>التنبؤ بالطلب الشهري</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-40 bg-gradient-to-r from-blue-100 to-blue-200 rounded-md flex items-end p-2">
                          <div className="w-1/4 h-20 bg-blue-500 mx-1 rounded-t"></div>
                          <div className="w-1/4 h-32 bg-blue-500 mx-1 rounded-t"></div>
                          <div className="w-1/4 h-24 bg-blue-500 mx-1 rounded-t"></div>
                          <div className="w-1/4 h-16 bg-blue-500 mx-1 rounded-t"></div>
                        </div>
                        <div className="mt-2 text-sm text-center text-muted-foreground">
                          <span>الأشهر الأربعة القادمة</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">منتج 2</CardTitle>
                        <CardDescription>التنبؤ بالطلب الموسمي</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-40 bg-gradient-to-r from-green-100 to-green-200 rounded-md flex items-end p-2">
                          <div className="w-1/4 h-10 bg-green-500 mx-1 rounded-t"></div>
                          <div className="w-1/4 h-36 bg-green-500 mx-1 rounded-t"></div>
                          <div className="w-1/4 h-28 bg-green-500 mx-1 rounded-t"></div>
                          <div className="w-1/4 h-14 bg-green-500 mx-1 rounded-t"></div>
                        </div>
                        <div className="mt-2 text-sm text-center text-muted-foreground">
                          <span>موسم العطلات (توقعات عالية)</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    toast.success('تطبيق الاقتراحات', {
                      description: 'تم تطبيق اقتراحات إعادة التخزين بنجاح',
                    });
                  }}
                >
                  تطبيق اقتراحات الذكاء الاصطناعي
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileSpreadsheet className="ml-2 h-5 w-5" />
                استيراد/تصدير المخزون
              </CardTitle>
              <CardDescription>استيراد وتصدير بيانات المخزون بتنسيقات CSV/Excel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">استيراد البيانات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="mb-2">قم بسحب وإفلات ملف CSV/Excel هنا</p>
                      <p className="text-sm text-muted-foreground mb-4">أو</p>
                      <Button onClick={handleImport}>تصفح الملفات</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">تصدير البيانات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>اختر تنسيق التصدير:</p>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" onClick={handleExport}>
                          <Download className="h-4 w-4 mr-1" />
                          تصدير كملف CSV
                        </Button>
                        <Button variant="outline" onClick={handleExport}>
                          <Download className="h-4 w-4 mr-1" />
                          تصدير كملف Excel
                        </Button>
                      </div>
                      <div className="pt-4">
                        <p className="text-sm text-muted-foreground">تاريخ آخر تصدير: 28/03/2025</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="ml-2 h-5 w-5" />
                تكامل الموردين
              </CardTitle>
              <CardDescription>إنشاء أوامر شراء تلقائية ومتابعة الموردين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">الموردين النشطين</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-right">اسم المورد</th>
                        <th className="p-3 text-right">المنتجات</th>
                        <th className="p-3 text-right">وقت التسليم المقدر</th>
                        <th className="p-3 text-right">حالة التكامل</th>
                        <th className="p-3 text-right">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3">مورد 1</td>
                        <td className="p-3">15</td>
                        <td className="p-3">3-5 أيام</td>
                        <td className="p-3">
                          <Badge className="bg-green-500">مفعل</Badge>
                        </td>
                        <td className="p-3">
                          <Button variant="outline" size="sm" onClick={handleGeneratePO}>
                            إنشاء أمر شراء
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">مورد 2</td>
                        <td className="p-3">8</td>
                        <td className="p-3">1-2 أيام</td>
                        <td className="p-3">
                          <Badge className="bg-green-500">مفعل</Badge>
                        </td>
                        <td className="p-3">
                          <Button variant="outline" size="sm" onClick={handleGeneratePO}>
                            إنشاء أمر شراء
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">مورد 3</td>
                        <td className="p-3">22</td>
                        <td className="p-3">7-10 أيام</td>
                        <td className="p-3">
                          <Badge variant="outline">غير مفعل</Badge>
                        </td>
                        <td className="p-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              toast.success('تفعيل التكامل', {
                                description: 'تم تفعيل التكامل مع المورد 3 بنجاح',
                              });
                            }}
                          >
                            تفعيل التكامل
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <Button
                onClick={() => {
                  toast.info('إضافة مورد جديد', {
                    description: 'قم بإدخال معلومات المورد الجديد',
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-1" />
                إضافة مورد جديد
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryManagement;
