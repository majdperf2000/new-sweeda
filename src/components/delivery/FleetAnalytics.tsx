import React, { useState } from 'react';
import {
  Car,
  BarChart,
  FileText,
  Wrench,
  AlertTriangle,
  Leaf,
  Calendar,
  CheckCircle,
  FileWarning,
  Download,
  FileCheck,
  Shield,
  Fuel, // Add missing Fuel icon
  Check, // Add missing Check icon
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// Mock data for vehicles
const vehicles = [
  {
    id: 'VEH-001',
    model: 'تويوتا كامري',
    year: 2021,
    plate: 'دمشق 12345',
    driver: 'عمر حسن',
    driverId: 'DRV-143',
    status: 'active',
    mileage: 45760,
    lastMaintenance: '15/01/2024',
    nextMaintenance: '15/07/2024',
    maintenanceStatus: 'good',
    fuelEfficiency: 7.8,
    carbonFootprint: 142,
    incidents: [],
    maintenanceHistory: [
      { date: '15/01/2024', type: 'routine', description: 'تغيير زيت وفلتر', cost: 45000 },
      {
        date: '15/07/2023',
        type: 'routine',
        description: 'تغيير زيت وفلتر، تبديل فرامل',
        cost: 120000,
      },
      { date: '15/01/2023', type: 'routine', description: 'تغيير زيت وفلتر', cost: 40000 },
    ],
  },
  {
    id: 'VEH-002',
    model: 'هوندا سيفيك',
    year: 2020,
    plate: 'دمشق 54321',
    driver: 'حسام علي',
    driverId: 'DRV-156',
    status: 'active',
    mileage: 68950,
    lastMaintenance: '10/12/2023',
    nextMaintenance: '10/06/2024',
    maintenanceStatus: 'warning',
    fuelEfficiency: 8.2,
    carbonFootprint: 156,
    incidents: [
      {
        date: '05/02/2024',
        type: 'minor',
        description: 'خدش في الباب الأمامي الأيمن',
        status: 'resolved',
      },
    ],
    maintenanceHistory: [
      { date: '10/12/2023', type: 'routine', description: 'تغيير زيت وفلتر', cost: 45000 },
      { date: '10/06/2023', type: 'repair', description: 'إصلاح نظام التكييف', cost: 180000 },
      { date: '10/12/2022', type: 'routine', description: 'تغيير زيت وفلتر', cost: 35000 },
    ],
  },
  {
    id: 'VEH-003',
    model: 'نيسان صني',
    year: 2022,
    plate: 'دمشق 98765',
    driver: 'ليلى سعيد',
    driverId: 'DRV-178',
    status: 'maintenance',
    mileage: 32450,
    lastMaintenance: '20/03/2024',
    nextMaintenance: '20/09/2024',
    maintenanceStatus: 'good',
    fuelEfficiency: 6.9,
    carbonFootprint: 135,
    incidents: [],
    maintenanceHistory: [
      {
        date: '20/03/2024',
        type: 'routine',
        description: 'تغيير زيت وفلتر، تبديل إطارات',
        cost: 250000,
      },
      { date: '20/09/2023', type: 'routine', description: 'تغيير زيت وفلتر', cost: 45000 },
    ],
  },
  {
    id: 'VEH-004',
    model: 'كيا سبورتاج',
    year: 2019,
    plate: 'دمشق 24680',
    driver: 'ماهر عباس',
    driverId: 'DRV-192',
    status: 'inactive',
    mileage: 87350,
    lastMaintenance: '05/11/2023',
    nextMaintenance: '05/05/2024',
    maintenanceStatus: 'critical',
    fuelEfficiency: 9.4,
    carbonFootprint: 172,
    incidents: [
      {
        date: '15/01/2024',
        type: 'moderate',
        description: 'تصادم خفيف في المصد الأمامي',
        status: 'pending',
      },
      { date: '10/07/2023', type: 'minor', description: 'إطار مثقوب', status: 'resolved' },
    ],
    maintenanceHistory: [
      { date: '05/11/2023', type: 'routine', description: 'تغيير زيت وفلتر', cost: 45000 },
      { date: '05/05/2023', type: 'repair', description: 'إصلاح نظام التعليق', cost: 320000 },
      { date: '05/11/2022', type: 'routine', description: 'تغيير زيت وفلتر', cost: 40000 },
    ],
  },
];

const FleetAnalytics = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [activeTab, setActiveTab] = useState('maintenance');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="secondary" className="bg-green-500 text-white">
            نشط
          </Badge>
        );
      case 'maintenance':
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            صيانة
          </Badge>
        );
      case 'inactive':
        return <Badge variant="outline">غير نشط</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getMaintenanceStatusBadge = (status) => {
    switch (status) {
      case 'good':
        return (
          <Badge variant="secondary" className="bg-green-500 text-white">
            جيد
          </Badge>
        );
      case 'warning':
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            بحاجة للفحص
          </Badge>
        );
      case 'critical':
        return <Badge variant="destructive">حرج</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getIncidentStatusBadge = (status) => {
    switch (status) {
      case 'resolved':
        return (
          <Badge variant="secondary" className="bg-green-500 text-white">
            تم الحل
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            قيد المعالجة
          </Badge>
        );
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getIncidentTypeBadge = (type) => {
    switch (type) {
      case 'minor':
        return (
          <Badge variant="secondary" className="bg-blue-500 text-white">
            بسيط
          </Badge>
        );
      case 'moderate':
        return (
          <Badge variant="secondary" className="bg-yellow-500">
            متوسط
          </Badge>
        );
      case 'major':
        return <Badge variant="destructive">خطير</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-SY', { style: 'currency', currency: 'SYP' })
      .format(amount)
      .replace('SYP', 'ل.س');
  };

  const scheduleMaintenanceForVehicle = (vehicleId) => {
    toast.success('تم جدولة الصيانة', {
      description: `تم جدولة صيانة للمركبة ${vehicleId} في تاريخ 05/05/2024`,
    });
  };

  const handleReportIncident = (vehicleId) => {
    toast.success('تم الإبلاغ عن حادث', {
      description: `تم تسجيل حادث جديد للمركبة ${vehicleId}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">تحليلات الأسطول</h2>
          <p className="text-muted-foreground">إدارة المركبات، الصيانة، والحوادث</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            onClick={() => {
              toast.info('عرض تقارير الأسطول', {
                description: 'جاري تحميل تقارير الأسطول للشهر الحالي',
              });
            }}
          >
            <FileText className="mr-2 h-4 w-4" />
            التقارير
          </Button>
          <Button
            onClick={() => {
              toast.success('إضافة مركبة جديدة', {
                description: 'تم فتح نموذج إضافة مركبة جديدة للأسطول',
              });
            }}
          >
            <Car className="mr-2 h-4 w-4" />
            إضافة مركبة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">مركبات نشطة</p>
                <p className="text-2xl font-bold text-green-700">
                  {vehicles.filter((v) => v.status === 'active').length}
                </p>
              </div>
              <Car className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">بحاجة للصيانة</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {
                    vehicles.filter(
                      (v) => v.maintenanceStatus === 'warning' || v.maintenanceStatus === 'critical'
                    ).length
                  }
                </p>
              </div>
              <Wrench className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">متوسط البصمة الكربونية</p>
                <p className="text-2xl font-bold text-blue-700">
                  {Math.round(
                    vehicles.reduce((sum, v) => sum + v.carbonFootprint, 0) / vehicles.length
                  )}{' '}
                  جم/كم
                </p>
              </div>
              <Leaf className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">حوادث مفتوحة</p>
                <p className="text-2xl font-bold text-red-700">
                  {vehicles.reduce(
                    (sum, v) => sum + v.incidents.filter((i) => i.status === 'pending').length,
                    0
                  )}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Car className="mr-2 h-5 w-5" />
              مركبات الأسطول
            </CardTitle>
            <CardDescription>{vehicles.length} مركبة مسجلة</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`border-b p-4 cursor-pointer hover:bg-accent/50 ${
                    selectedVehicle?.id === vehicle.id ? 'bg-accent' : ''
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{vehicle.model}</div>
                      <div className="text-sm text-muted-foreground">
                        {vehicle.id} | {vehicle.plate}
                      </div>
                    </div>
                    {getStatusBadge(vehicle.status)}
                  </div>

                  <div className="mt-3 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" /> {vehicle.year}
                      <span className="mx-2">|</span>
                      <Wrench className="h-3 w-3 mr-1" />{' '}
                      {getMaintenanceStatusBadge(vehicle.maintenanceStatus)}
                    </div>
                  </div>

                  {(vehicle.maintenanceStatus === 'warning' ||
                    vehicle.maintenanceStatus === 'critical' ||
                    vehicle.incidents.some((i) => i.status === 'pending')) && (
                    <div className="mt-2 p-1.5 rounded-md bg-red-50 border border-red-200 text-xs text-red-700 flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1 text-red-500" />
                      {vehicle.maintenanceStatus === 'critical'
                        ? 'بحاجة لصيانة عاجلة!'
                        : vehicle.maintenanceStatus === 'warning'
                          ? 'بحاجة للفحص قريباً'
                          : 'حوادث بحاجة للمعالجة'}
                    </div>
                  )}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          {selectedVehicle && (
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Car className="mr-2 h-5 w-5" />
                    {selectedVehicle.model}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedVehicle.status)}
                    {getMaintenanceStatusBadge(selectedVehicle.maintenanceStatus)}
                  </div>
                </div>
                <CardDescription>
                  {selectedVehicle.id} | {selectedVehicle.plate} | السائق: {selectedVehicle.driver}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="maintenance" value={activeTab} onValueChange={setActiveTab}>
                  <div className="border-b px-6">
                    <TabsList className="w-full justify-start">
                      <TabsTrigger value="maintenance">الصيانة</TabsTrigger>
                      <TabsTrigger value="efficiency">كفاءة الوقود</TabsTrigger>
                      <TabsTrigger value="incidents">الحوادث</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="maintenance" className="m-0 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="border rounded-md p-3">
                        <div className="text-sm text-muted-foreground">عداد المسافات</div>
                        <div className="text-xl font-bold">
                          {selectedVehicle.mileage.toLocaleString()} كم
                        </div>
                      </div>

                      <div className="border rounded-md p-3">
                        <div className="text-sm text-muted-foreground">آخر صيانة</div>
                        <div className="text-xl font-bold">{selectedVehicle.lastMaintenance}</div>
                      </div>

                      <div className="border rounded-md p-3">
                        <div className="text-sm text-muted-foreground">الصيانة القادمة</div>
                        <div className="text-xl font-bold">{selectedVehicle.nextMaintenance}</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">سجل الصيانة</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>التاريخ</TableHead>
                            <TableHead>النوع</TableHead>
                            <TableHead>الوصف</TableHead>
                            <TableHead>التكلفة</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedVehicle.maintenanceHistory.map((maintenance, index) => (
                            <TableRow key={index}>
                              <TableCell>{maintenance.date}</TableCell>
                              <TableCell>
                                {maintenance.type === 'routine' ? (
                                  <Badge variant="secondary" className="bg-blue-500 text-white">
                                    دورية
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary" className="bg-yellow-500">
                                    إصلاح
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>{maintenance.description}</TableCell>
                              <TableCell>{formatCurrency(maintenance.cost)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {selectedVehicle.maintenanceStatus === 'warning' ||
                    selectedVehicle.maintenanceStatus === 'critical' ? (
                      <Card
                        className={`border-${selectedVehicle.maintenanceStatus === 'critical' ? 'red' : 'yellow'}-200 bg-${selectedVehicle.maintenanceStatus === 'critical' ? 'red' : 'yellow'}-50`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <AlertTriangle
                              className={`h-5 w-5 text-${selectedVehicle.maintenanceStatus === 'critical' ? 'red' : 'yellow'}-500 mr-3 mt-0.5`}
                            />
                            <div>
                              <h4
                                className={`font-medium text-${selectedVehicle.maintenanceStatus === 'critical' ? 'red' : 'yellow'}-700`}
                              >
                                {selectedVehicle.maintenanceStatus === 'critical'
                                  ? 'تنبيه: الصيانة مطلوبة بشكل عاجل'
                                  : 'تنبيه: الصيانة الدورية مطلوبة قريباً'}
                              </h4>
                              <p
                                className={`text-sm text-${selectedVehicle.maintenanceStatus === 'critical' ? 'red' : 'yellow'}-600 mt-1`}
                              >
                                {selectedVehicle.maintenanceStatus === 'critical'
                                  ? 'المركبة تجاوزت الحد المسموح وتحتاج إلى صيانة فورية!'
                                  : `الصيانة الدورية القادمة مقررة في ${selectedVehicle.nextMaintenance}`}
                              </p>
                              <Button
                                variant={
                                  selectedVehicle.maintenanceStatus === 'critical'
                                    ? 'destructive'
                                    : 'outline'
                                }
                                size="sm"
                                className={
                                  selectedVehicle.maintenanceStatus === 'warning'
                                    ? 'mt-3 border-yellow-300 bg-yellow-100 text-yellow-800'
                                    : 'mt-3'
                                }
                                onClick={() => scheduleMaintenanceForVehicle(selectedVehicle.id)}
                              >
                                <Wrench className="h-4 w-4 mr-2" />
                                جدولة صيانة
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="border-green-200 bg-green-50">
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-green-700">حالة الصيانة جيدة</h4>
                              <p className="text-sm text-green-600 mt-1">
                                جميع متطلبات الصيانة محدثة. الصيانة الدورية القادمة في{' '}
                                {selectedVehicle.nextMaintenance}
                              </p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-3 border-green-300 bg-green-100 text-green-800"
                                onClick={() => {
                                  toast.success('تم تنزيل تقرير الصيانة', {
                                    description: 'تم تنزيل تقرير صيانة المركبة بنجاح',
                                  });
                                }}
                              >
                                <FileCheck className="h-4 w-4 mr-2" />
                                تحميل تقرير الصيانة
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="efficiency" className="m-0 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <Fuel className="h-4 w-4 mr-2" />
                            كفاءة استهلاك الوقود
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center p-4">
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                              {selectedVehicle.fuelEfficiency} لتر/100كم
                            </div>
                            <div className="text-sm text-muted-foreground mb-4">
                              متوسط استهلاك الوقود
                            </div>

                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between mb-1 text-sm">
                                  <span>مقارنة بمتوسط الأسطول</span>
                                  <span
                                    className={
                                      selectedVehicle.fuelEfficiency < 8
                                        ? 'text-green-600'
                                        : 'text-yellow-600'
                                    }
                                  >
                                    {selectedVehicle.fuelEfficiency < 8 ? '10% أفضل' : '5% أسوأ'}
                                  </span>
                                </div>
                                <Progress
                                  value={selectedVehicle.fuelEfficiency < 8 ? 80 : 60}
                                  className="h-2"
                                />
                              </div>

                              <div className="border rounded-md p-3 bg-accent/50 text-right">
                                <h4 className="font-medium mb-1">توصيات لتحسين كفاءة الوقود:</h4>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  <li>• التأكد من ضغط الإطارات بشكل منتظم</li>
                                  <li>• تجنب الحمولات الزائدة غير الضرورية</li>
                                  <li>• الحفاظ على سرعة ثابتة أثناء القيادة</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <Leaf className="h-4 w-4 mr-2" />
                            البصمة الكربونية
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center p-4">
                            <div className="text-3xl font-bold text-green-600 mb-2">
                              {selectedVehicle.carbonFootprint} جم/كم
                            </div>
                            <div className="text-sm text-muted-foreground mb-4">
                              متوسط انبعاثات ثاني أكسيد الكربون
                            </div>

                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between mb-1 text-sm">
                                  <span>الهدف البيئي (130 جم/كم)</span>
                                  <span
                                    className={
                                      selectedVehicle.carbonFootprint < 140
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                    }
                                  >
                                    {selectedVehicle.carbonFootprint < 140
                                      ? 'تم تحقيق الهدف'
                                      : 'فوق الهدف'}
                                  </span>
                                </div>
                                <Progress
                                  value={Math.min(
                                    100,
                                    (130 / selectedVehicle.carbonFootprint) * 100
                                  )}
                                  className="h-2"
                                />
                              </div>

                              <div className="flex flex-col space-y-2">
                                <div className="border rounded-md p-2 bg-green-50 border-green-200 flex justify-between items-center">
                                  <span className="text-sm font-medium">هذا الشهر</span>
                                  <span className="text-sm">
                                    {Math.round(selectedVehicle.carbonFootprint * 0.8)} جم/كم
                                  </span>
                                </div>
                                <div className="border rounded-md p-2 bg-muted/50 flex justify-between items-center">
                                  <span className="text-sm font-medium">الشهر الماضي</span>
                                  <span className="text-sm">
                                    {selectedVehicle.carbonFootprint} جم/كم
                                  </span>
                                </div>
                                <div className="border rounded-md p-2 bg-muted/50 flex justify-between items-center">
                                  <span className="text-sm font-medium">قبل شهرين</span>
                                  <span className="text-sm">
                                    {Math.round(selectedVehicle.carbonFootprint * 1.1)} جم/كم
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <BarChart className="h-4 w-4 mr-2" />
                          تقرير الوقود والأداء
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 space-y-4">
                          <div className="flex flex-col space-y-1">
                            <div className="font-medium">استهلاك الوقود حسب نوع الطريق:</div>
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between mb-1 text-sm">
                                  <span>طرق سريعة</span>
                                  <span>
                                    {Math.round(selectedVehicle.fuelEfficiency * 0.8)} لتر/100كم
                                  </span>
                                </div>
                                <Progress value={80} className="h-2 bg-blue-100" />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1 text-sm">
                                  <span>طرق داخل المدينة</span>
                                  <span>
                                    {Math.round(selectedVehicle.fuelEfficiency * 1.3)} لتر/100كم
                                  </span>
                                </div>
                                <Progress value={50} className="h-2 bg-blue-100" />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1 text-sm">
                                  <span>طرق جبلية</span>
                                  <span>
                                    {Math.round(selectedVehicle.fuelEfficiency * 1.5)} لتر/100كم
                                  </span>
                                </div>
                                <Progress value={40} className="h-2 bg-blue-100" />
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <div className="font-medium mb-2">التوصيات والتحسينات:</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="border rounded-md p-3 bg-green-50 border-green-200">
                                <div className="font-medium text-green-700">تحسين محتمل:</div>
                                <div className="text-sm text-muted-foreground">
                                  تحسين نمط القيادة يمكن أن يوفر حتى 12% من استهلاك الوقود.
                                </div>
                              </div>
                              <div className="border rounded-md p-3 bg-blue-50 border-blue-200">
                                <div className="font-medium text-blue-700">الصيانة الدورية:</div>
                                <div className="text-sm text-muted-foreground">
                                  ضبط المحرك وفلاتر الهواء النظيفة تحسن الكفاءة بنسبة 5-10%.
                                </div>
                              </div>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            className="w-full mt-2"
                            onClick={() => {
                              toast.success('تم تنزيل تقرير الأداء', {
                                description: 'تم تنزيل تقرير مفصل عن أداء المركبة واستهلاك الوقود',
                              });
                            }}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            تنزيل التقرير الكامل
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="incidents" className="m-0 p-6">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">سجل الحوادث والوقائع</h3>
                        <Button onClick={() => handleReportIncident(selectedVehicle.id)} size="sm">
                          <FileWarning className="h-4 w-4 mr-2" />
                          تسجيل حادث جديد
                        </Button>
                      </div>

                      {selectedVehicle.incidents.length > 0 ? (
                        <div className="space-y-4">
                          {selectedVehicle.incidents.map((incident, index) => (
                            <Card
                              key={index}
                              className={`border-${incident.status === 'pending' ? 'yellow' : 'green'}-200`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start">
                                  {incident.status === 'pending' ? (
                                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                                  ) : (
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                                  )}
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <div className="flex items-center">
                                          <span className="font-medium">حادث {index + 1}</span>
                                          <span className="mx-2">|</span>
                                          <span className="text-sm text-muted-foreground">
                                            {incident.date}
                                          </span>
                                        </div>
                                        <div className="mt-1 flex items-center gap-2">
                                          {getIncidentTypeBadge(incident.type)}
                                          {getIncidentStatusBadge(incident.status)}
                                        </div>
                                      </div>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          toast.info('عرض تفاصيل الحادث', {
                                            description: `عرض التفاصيل الكاملة للحادث بتاريخ ${incident.date}`,
                                          });
                                        }}
                                      >
                                        عرض التفاصيل
                                      </Button>
                                    </div>
                                    <p className="text-sm mt-2">{incident.description}</p>

                                    {incident.status === 'pending' && (
                                      <div className="mt-3">
                                        <Button
                                          size="sm"
                                          onClick={() => {
                                            toast.success('تم تحديث حالة الحادث', {
                                              description: "تم تغيير حالة الحادث إلى 'تم الحل'",
                                            });
                                          }}
                                        >
                                          <Check className="h-4 w-4 mr-2" />
                                          تحديث إلى محلول
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="border rounded-md p-8 text-center bg-accent/50">
                          <Shield className="h-12 w-12 mx-auto mb-3 text-green-500" />
                          <h4 className="text-lg font-medium">لا توجد حوادث مسجلة</h4>
                          <p className="text-sm text-muted-foreground mt-2 mb-4 max-w-md mx-auto">
                            لم يتم تسجيل أي حوادث لهذه المركبة. استمر في الحفاظ على سجل السلامة
                            الممتاز!
                          </p>
                        </div>
                      )}

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            نصائح السلامة والوقاية
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="p-3 border rounded-md bg-blue-50 border-blue-200">
                              <div className="font-medium text-blue-700">الصيانة الوقائية</div>
                              <div className="text-sm text-muted-foreground">
                                تأكد من فحص الفرامل والإطارات بانتظام لتجنب الحوادث المرتبطة
                                بالأعطال الميكانيكية.
                              </div>
                            </div>

                            <div className="p-3 border rounded-md bg-purple-50 border-purple-200">
                              <div className="font-medium text-purple-700">تدريب السائقين</div>
                              <div className="text-sm text-muted-foreground">
                                تأكد من حصول السائقين على تدريب دوري حول القيادة الآمنة وتقنيات تجنب
                                الحوادث.
                              </div>
                            </div>

                            <div className="p-3 border rounded-md bg-green-50 border-green-200">
                              <div className="font-medium text-green-700">معدات السلامة</div>
                              <div className="text-sm text-muted-foreground">
                                تأكد من وجود معدات السلامة في جميع المركبات: طفايات الحريق، صندوق
                                الإسعافات الأولية، مثلث التحذير.
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          toast.success('تم تنزيل تقرير السلامة', {
                            description: 'تم تنزيل تقرير مفصل عن سلامة المركبة وسجل الحوادث',
                          });
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        تنزيل تقرير السلامة الكامل
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

export default FleetAnalytics;
