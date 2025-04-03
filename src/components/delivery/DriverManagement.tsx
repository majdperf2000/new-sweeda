import React, { useState } from 'react';
import {
  Users,
  Star,
  DollarSign,
  FileText,
  Clock,
  Calendar,
  Plus,
  ClipboardCheck,
  Award,
  AlertOctagon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for drivers
const drivers = [
  {
    id: 'DRV-143',
    name: 'عمر حسن',
    phone: '0912345678',
    joinDate: '15/01/2023',
    rating: 4.8,
    onTimePercentage: 96,
    deliveries: {
      total: 587,
      thisMonth: 48,
      today: 5,
    },
    earnings: {
      total: 320000,
      thisMonth: 28000,
      base: 15000,
      bonus: 13000,
    },
    documents: {
      license: { expires: '01/02/2026', status: 'valid' },
      insurance: { expires: '15/07/2024', status: 'expiring_soon' },
      vehicle: { expires: '30/04/2025', status: 'valid' },
    },
    performance: {
      speed: 92,
      safety: 88,
      customerService: 95,
    },
    status: 'active',
  },
  {
    id: 'DRV-156',
    name: 'حسام علي',
    phone: '0923456789',
    joinDate: '03/05/2023',
    rating: 4.5,
    onTimePercentage: 90,
    deliveries: {
      total: 342,
      thisMonth: 38,
      today: 4,
    },
    earnings: {
      total: 245000,
      thisMonth: 22000,
      base: 12000,
      bonus: 10000,
    },
    documents: {
      license: { expires: '12/08/2025', status: 'valid' },
      insurance: { expires: '20/03/2024', status: 'expired' },
      vehicle: { expires: '10/10/2025', status: 'valid' },
    },
    performance: {
      speed: 85,
      safety: 90,
      customerService: 86,
    },
    status: 'active',
  },
  {
    id: 'DRV-178',
    name: 'ليلى سعيد',
    phone: '0934567890',
    joinDate: '22/09/2023',
    rating: 4.9,
    onTimePercentage: 98,
    deliveries: {
      total: 265,
      thisMonth: 52,
      today: 6,
    },
    earnings: {
      total: 210000,
      thisMonth: 34000,
      base: 16000,
      bonus: 18000,
    },
    documents: {
      license: { expires: '05/05/2026', status: 'valid' },
      insurance: { expires: '18/11/2024', status: 'valid' },
      vehicle: { expires: '25/12/2024', status: 'valid' },
    },
    performance: {
      speed: 94,
      safety: 96,
      customerService: 98,
    },
    status: 'active',
  },
  {
    id: 'DRV-192',
    name: 'ماهر عباس',
    phone: '0945678901',
    joinDate: '07/11/2023',
    rating: 4.7,
    onTimePercentage: 92,
    deliveries: {
      total: 178,
      thisMonth: 45,
      today: 3,
    },
    earnings: {
      total: 175000,
      thisMonth: 25000,
      base: 13000,
      bonus: 12000,
    },
    documents: {
      license: { expires: '14/07/2025', status: 'valid' },
      insurance: { expires: '03/01/2025', status: 'valid' },
      vehicle: { expires: '19/03/2024', status: 'expiring_soon' },
    },
    performance: {
      speed: 88,
      safety: 92,
      customerService: 90,
    },
    status: 'inactive',
  },
];

const DriverManagement = () => {
  const [selectedDriver, setSelectedDriver] = useState(drivers[0]);
  const [activeTab, setActiveTab] = useState('performance');

  const getDocumentStatusBadge = (status) => {
    switch (status) {
      case 'valid':
        return (
          <Badge variant="secondary" className="bg-green-500 text-white">
            صالحة
          </Badge>
        );
      case 'expiring_soon':
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            تنتهي قريباً
          </Badge>
        );
      case 'expired':
        return <Badge variant="destructive">منتهية</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-SY', { style: 'currency', currency: 'SYP' })
      .format(amount)
      .replace('SYP', 'ل.س');
  };

  const getDriverStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="secondary" className="bg-green-500 text-white">
            نشط
          </Badge>
        );
      case 'inactive':
        return <Badge variant="outline">غير نشط</Badge>;
      case 'suspended':
        return <Badge variant="destructive">موقوف</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">إدارة السائقين</h2>
          <p className="text-muted-foreground">تقييم أداء السائقين وإدارة الوثائق</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button
            onClick={() => {
              toast.success('إضافة سائق جديد', {
                description: 'تم فتح نموذج إضافة سائق جديد',
              });
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            إضافة سائق
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              السائقين
            </CardTitle>
            <CardDescription>{drivers.length} سائق مسجل</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {drivers.map((driver) => (
                <div
                  key={driver.id}
                  className={`border-b p-4 cursor-pointer hover:bg-accent/50 ${
                    selectedDriver?.id === driver.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => setSelectedDriver(driver)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        {driver.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{driver.name}</div>
                        <div className="text-sm text-muted-foreground">{driver.id}</div>
                      </div>
                    </div>
                    {getDriverStatusBadge(driver.status)}
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="font-medium">{driver.rating}</div>
                      <div className="text-xs text-muted-foreground">التقييم</div>
                    </div>
                    <div>
                      <div className="font-medium">{driver.onTimePercentage}%</div>
                      <div className="text-xs text-muted-foreground">في الوقت</div>
                    </div>
                    <div>
                      <div className="font-medium">{driver.deliveries.thisMonth}</div>
                      <div className="text-xs text-muted-foreground">التوصيل</div>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          {selectedDriver && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      {selectedDriver.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle>{selectedDriver.name}</CardTitle>
                      <CardDescription>
                        {selectedDriver.id} | هاتف: {selectedDriver.phone}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                      <Calendar className="mr-1 h-3 w-3" />
                      تاريخ الانضمام: {selectedDriver.joinDate}
                    </Badge>
                    {getDriverStatusBadge(selectedDriver.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="performance" value={activeTab} onValueChange={setActiveTab}>
                  <div className="border-b px-6">
                    <TabsList className="w-full justify-start">
                      <TabsTrigger value="performance">الأداء</TabsTrigger>
                      <TabsTrigger value="earnings">الأرباح</TabsTrigger>
                      <TabsTrigger value="documents">الوثائق</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="performance" className="m-0 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">التقييم العام</div>
                            <div className="text-lg font-bold flex items-center">
                              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                              {selectedDriver.rating}
                            </div>
                          </div>
                          <Progress value={selectedDriver.rating * 20} className="h-2" />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">التوصيل في الوقت</div>
                            <div className="text-lg font-bold">
                              {selectedDriver.onTimePercentage}%
                            </div>
                          </div>
                          <Progress value={selectedDriver.onTimePercentage} className="h-2" />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">إجمالي التوصيلات</div>
                            <div className="text-lg font-bold">
                              {selectedDriver.deliveries.total}
                            </div>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>هذا الشهر: {selectedDriver.deliveries.thisMonth}</span>
                            <span>اليوم: {selectedDriver.deliveries.today}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">مؤشرات الأداء</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">سرعة التوصيل</span>
                            <span>{selectedDriver.performance.speed}%</span>
                          </div>
                          <Progress value={selectedDriver.performance.speed} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">السلامة والقيادة</span>
                            <span>{selectedDriver.performance.safety}%</span>
                          </div>
                          <Progress value={selectedDriver.performance.safety} className="h-2" />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">خدمة العملاء</span>
                            <span>{selectedDriver.performance.customerService}%</span>
                          </div>
                          <Progress
                            value={selectedDriver.performance.customerService}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <Award className="h-4 w-4 mr-2" />
                          التقديرات والإنجازات
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="border rounded-md p-3 text-center bg-accent/50">
                            <Clock className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                            <div className="font-medium text-sm">تسليم سريع</div>
                            <div className="text-xs text-muted-foreground">
                              أسرع 10% من السائقين
                            </div>
                          </div>

                          <div className="border rounded-md p-3 text-center bg-accent/50">
                            <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                            <div className="font-medium text-sm">تقييم ممتاز</div>
                            <div className="text-xs text-muted-foreground">
                              أكثر من 100 تقييم 5 نجوم
                            </div>
                          </div>

                          <div className="border rounded-md p-3 text-center bg-accent/50">
                            <ClipboardCheck className="h-6 w-6 mx-auto mb-2 text-green-500" />
                            <div className="font-medium text-sm">دقة عالية</div>
                            <div className="text-xs text-muted-foreground">
                              أقل من 1% توصيلات خاطئة
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="earnings" className="m-0 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="font-medium">الشهر الحالي</div>
                            <div className="text-lg font-bold">
                              {formatCurrency(selectedDriver.earnings.thisMonth)}
                            </div>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground mt-2">
                            <span>أساسي: {formatCurrency(selectedDriver.earnings.base)}</span>
                            <span>مكافآت: {formatCurrency(selectedDriver.earnings.bonus)}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="font-medium">المجموع الكلي</div>
                            <div className="text-lg font-bold">
                              {formatCurrency(selectedDriver.earnings.total)}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground mt-2">
                            منذ تاريخ الانضمام: {selectedDriver.joinDate}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="font-medium">متوسط لكل توصيلة</div>
                            <div className="text-lg font-bold">
                              {formatCurrency(
                                Math.round(
                                  selectedDriver.earnings.thisMonth /
                                    selectedDriver.deliveries.thisMonth
                                )
                              )}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground mt-2">
                            محسوب من {selectedDriver.deliveries.thisMonth} توصيلة هذا الشهر
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">تفاصيل الأرباح</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>النوع</TableHead>
                            <TableHead>المبلغ</TableHead>
                            <TableHead>النسبة</TableHead>
                            <TableHead>تفاصيل</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">الراتب الأساسي</TableCell>
                            <TableCell>{formatCurrency(selectedDriver.earnings.base)}</TableCell>
                            <TableCell>
                              {Math.round(
                                (selectedDriver.earnings.base / selectedDriver.earnings.thisMonth) *
                                  100
                              )}
                              %
                            </TableCell>
                            <TableCell className="text-muted-foreground">راتب شهري ثابت</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">عمولة عدد التوصيلات</TableCell>
                            <TableCell>
                              {formatCurrency(Math.round(selectedDriver.earnings.bonus * 0.4))}
                            </TableCell>
                            <TableCell>
                              {Math.round(
                                ((selectedDriver.earnings.bonus * 0.4) /
                                  selectedDriver.earnings.thisMonth) *
                                  100
                              )}
                              %
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              500 ل.س لكل توصيلة
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">مكافآت التقييم</TableCell>
                            <TableCell>
                              {formatCurrency(Math.round(selectedDriver.earnings.bonus * 0.3))}
                            </TableCell>
                            <TableCell>
                              {Math.round(
                                ((selectedDriver.earnings.bonus * 0.3) /
                                  selectedDriver.earnings.thisMonth) *
                                  100
                              )}
                              %
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              مكافآت مبنية على تقييمات العملاء
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">مكافآت الالتزام بالوقت</TableCell>
                            <TableCell>
                              {formatCurrency(Math.round(selectedDriver.earnings.bonus * 0.3))}
                            </TableCell>
                            <TableCell>
                              {Math.round(
                                ((selectedDriver.earnings.bonus * 0.3) /
                                  selectedDriver.earnings.thisMonth) *
                                  100
                              )}
                              %
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              مكافآت الالتزام بمواعيد التوصيل
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          حاسبة الأرباح التقديرية
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="border rounded-md p-4 bg-accent/50">
                            <h4 className="font-medium mb-2">الشهر القادم (تقديري)</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <div className="text-sm text-muted-foreground">عدد التوصيلات</div>
                                <div className="font-medium">
                                  {Math.round(selectedDriver.deliveries.thisMonth * 1.1)} توصيلة
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  المكافآت المتوقعة
                                </div>
                                <div className="font-medium">
                                  {formatCurrency(Math.round(selectedDriver.earnings.bonus * 1.15))}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">إجمالي متوقع</div>
                                <div className="font-medium">
                                  {formatCurrency(
                                    Math.round(selectedDriver.earnings.thisMonth * 1.1)
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-sm text-muted-foreground">
                            * التقديرات مبنية على أداء الشهر الحالي والتوقعات المستقبلية
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="documents" className="m-0 p-6">
                    <div className="grid grid-cols-1 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            وثائق السائق
                          </CardTitle>
                          <CardDescription>
                            حالة الوثائق الرسمية وتواريخ انتهاء الصلاحية
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>الوثيقة</TableHead>
                                <TableHead>تاريخ الانتهاء</TableHead>
                                <TableHead>الحالة</TableHead>
                                <TableHead>الإجراءات</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">رخصة القيادة</TableCell>
                                <TableCell>{selectedDriver.documents.license.expires}</TableCell>
                                <TableCell>
                                  {getDocumentStatusBadge(selectedDriver.documents.license.status)}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      toast.info('عرض وثيقة', {
                                        description:
                                          'عرض رخصة القيادة للسائق ' + selectedDriver.name,
                                      });
                                    }}
                                  >
                                    عرض
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">وثيقة التأمين</TableCell>
                                <TableCell>{selectedDriver.documents.insurance.expires}</TableCell>
                                <TableCell>
                                  {getDocumentStatusBadge(
                                    selectedDriver.documents.insurance.status
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      toast.info('عرض وثيقة', {
                                        description:
                                          'عرض وثيقة التأمين للسائق ' + selectedDriver.name,
                                      });
                                    }}
                                  >
                                    عرض
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">ترخيص المركبة</TableCell>
                                <TableCell>{selectedDriver.documents.vehicle.expires}</TableCell>
                                <TableCell>
                                  {getDocumentStatusBadge(selectedDriver.documents.vehicle.status)}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      toast.info('عرض وثيقة', {
                                        description:
                                          'عرض ترخيص المركبة للسائق ' + selectedDriver.name,
                                      });
                                    }}
                                  >
                                    عرض
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                      {selectedDriver.documents.insurance.status === 'expired' && (
                        <Card className="border-red-200 bg-red-50">
                          <CardContent className="p-4">
                            <div className="flex items-start">
                              <AlertOctagon className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-red-700">
                                  تنبيه: وثيقة التأمين منتهية
                                </h4>
                                <p className="text-sm text-red-600 mt-1">
                                  يجب تحديث وثيقة التأمين الخاصة بالسائق {selectedDriver.name} قبل
                                  استئناف العمل.
                                </p>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="mt-3"
                                  onClick={() => {
                                    toast.success('تم إرسال تذكير', {
                                      description: 'تم إرسال تذكير للسائق لتحديث وثيقة التأمين',
                                    });
                                  }}
                                >
                                  إرسال تذكير
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {selectedDriver.documents.vehicle.status === 'expiring_soon' && (
                        <Card className="border-yellow-200 bg-yellow-50">
                          <CardContent className="p-4">
                            <div className="flex items-start">
                              <AlertOctagon className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-yellow-700">
                                  تنبيه: ترخيص المركبة ينتهي قريباً
                                </h4>
                                <p className="text-sm text-yellow-600 mt-1">
                                  ترخيص المركبة للسائق {selectedDriver.name} ينتهي في{' '}
                                  {selectedDriver.documents.vehicle.expires}. يرجى التذكير بتجديده.
                                </p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-3 border-yellow-300 bg-yellow-100 text-yellow-800"
                                  onClick={() => {
                                    toast.success('تم إرسال تذكير', {
                                      description: 'تم إرسال تذكير للسائق لتجديد ترخيص المركبة',
                                    });
                                  }}
                                >
                                  إرسال تذكير
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          toast.info('تحميل جميع الوثائق', {
                            description: 'جاري تحميل جميع وثائق السائق ' + selectedDriver.name,
                          });
                        }}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        تحميل جميع الوثائق
                      </Button>
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

export default DriverManagement;
