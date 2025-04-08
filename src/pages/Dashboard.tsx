import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/animations/page-transition.js';
import MainLayout from '@/components/layout/MainLayout.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.js';
import { Button } from '@/components/ui/button.js';
import { Separator } from '@/components/ui/separator.js';
import {
  User,
  Package,
  CreditCard,
  Settings,
  LogOut,
  LayoutDashboard,
  Store,
  Truck,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const navigateToControlPanel = (panelId: string) => {
    navigate(`/control-panels#${panelId}`);
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-12">
          <h1 className="heading-2 mb-8">حسابي</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="md:col-span-1 glass-card">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {[
                    { id: 'profile', label: 'الملف الشخصي', icon: User },
                    { id: 'orders', label: 'الطلبات', icon: Package },
                    { id: 'payment', label: 'طرق الدفع', icon: CreditCard },
                    { id: 'settings', label: 'الإعدادات', icon: Settings },
                    { id: 'controlPanels', label: 'لوحات التحكم', icon: LayoutDashboard },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant={activeTab === item.id ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setActiveTab(item.id)}
                      >
                        <Icon className="ml-2 h-4 w-4" />
                        {item.label}
                      </Button>
                    );
                  })}
                  <Separator className="my-2" />
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground"
                    onClick={() => {
                      toast.success('تم تسجيل الخروج بنجاح');
                      navigate('/auth');
                    }}
                  >
                    <LogOut className="ml-2 h-4 w-4" />
                    تسجيل الخروج
                  </Button>
                </nav>
              </CardContent>
            </Card>

            <Card className="md:col-span-3 glass-card">
              <CardHeader>
                <CardTitle>
                  {activeTab === 'profile' && 'الملف الشخصي'}
                  {activeTab === 'orders' && 'الطلبات'}
                  {activeTab === 'payment' && 'طرق الدفع'}
                  {activeTab === 'settings' && 'إعدادات الحساب'}
                  {activeTab === 'controlPanels' && 'لوحات التحكم'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">
                        JD
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">John Doe</h3>
                        <p className="text-muted-foreground">john.doe@example.com</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          تغيير الصورة
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">الاسم الكامل</h4>
                        <p>John Doe</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">البريد الإلكتروني</h4>
                        <p>john.doe@example.com</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">الهاتف</h4>
                        <p>+963 (555) 123-4567</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">الموقع</h4>
                        <p>دمشق، سوريا</p>
                      </div>
                    </div>
                    <Button className="mt-4">تعديل الملف الشخصي</Button>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="space-y-4">
                    {[
                      {
                        id: 'ORD-12345',
                        date: '15 مايو، 2023',
                        status: 'تم التوصيل',
                        total: '$299.99',
                      },
                      {
                        id: 'ORD-12346',
                        date: '28 أبريل، 2023',
                        status: 'قيد المعالجة',
                        total: '$149.50',
                      },
                      {
                        id: 'ORD-12347',
                        date: '10 مارس، 2023',
                        status: 'تم التوصيل',
                        total: '$520.75',
                      },
                    ].map((order) => (
                      <Card key={order.id} className="hover:shadow transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex flex-wrap justify-between items-center">
                            <div>
                              <h4 className="font-medium">{order.id}</h4>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div>
                                <span
                                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    order.status === 'تم التوصيل'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-blue-100 text-blue-800'
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{order.total}</p>
                                <Button variant="link" className="p-0 h-auto text-xs">
                                  عرض التفاصيل
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {activeTab === 'payment' && (
                  <div className="space-y-4">
                    <div className="bg-accent rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-4">طرق الدفع المحفوظة</p>

                      {[
                        { type: 'فيزا', last4: '4242', expires: '05/25' },
                        { type: 'ماستركارد', last4: '8888', expires: '12/24' },
                      ].map((card, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center p-3 bg-background rounded mb-2"
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-6 bg-primary/10 rounded ml-3 flex items-center justify-center text-xs">
                              {card.type}
                            </div>
                            <div>
                              <p className="font-medium">•••• {card.last4}</p>
                              <p className="text-xs text-muted-foreground">
                                تنتهي في {card.expires}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            تعديل
                          </Button>
                        </div>
                      ))}

                      <Button className="mt-4" variant="outline">
                        إضافة طريقة دفع
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">الإشعارات</h3>
                      <div className="space-y-2">
                        {[
                          'تحديثات الطلبات',
                          'منتجات جديدة',
                          'العروض والتخفيضات',
                          'تقييمات المنتجات',
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span>{item}</span>
                            <div
                              className="h-6 w-10 bg-primary rounded-full flex items-center px-1"
                              role="checkbox"
                            >
                              <div className="h-4 w-4 bg-white rounded-full ml-auto"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-medium mb-3">الخصوصية</h3>
                      <div className="space-y-2">
                        {[
                          'إظهار ملفي الشخصي للمستخدمين الآخرين',
                          'استخدام بياناتي للتوصيات المخصصة',
                          'تخزين معلومات الدفع الخاصة بي',
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span>{item}</span>
                            <div
                              className="h-6 w-10 bg-primary rounded-full flex items-center px-1"
                              role="checkbox"
                            >
                              <div className="h-4 w-4 bg-white rounded-full ml-auto"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button className="mt-4">حفظ الإعدادات</Button>
                  </div>
                )}

                {activeTab === 'controlPanels' && (
                  <div className="space-y-6">
                    <p className="text-muted-foreground mb-4">
                      اختر لوحة التحكم التي ترغب في الوصول إليها استنادًا إلى نوع حسابك
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card
                        className="hover:shadow-md transition-all cursor-pointer"
                        onClick={() => navigateToControlPanel('1')}
                      >
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <Cpu className="h-10 w-10 text-primary my-2" />
                          <CardTitle className="text-lg mb-1">مالك النظام (AI CORE)</CardTitle>
                          <CardDescription>
                            لوحة تحكم المالك الرئيسية مع الوصول الكامل إلى جميع الوظائف
                          </CardDescription>
                          <Button variant="outline" className="mt-4">
                            الوصول إلى لوحة التحكم
                          </Button>
                        </CardContent>
                      </Card>

                      <Card
                        className="hover:shadow-md transition-all cursor-pointer"
                        onClick={() => navigateToControlPanel('2')}
                      >
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <LayoutDashboard className="h-10 w-10 text-primary my-2" />
                          <CardTitle className="text-lg mb-1">المدير (ADMIN)</CardTitle>
                          <CardDescription>
                            لوحة تحكم للمديرين مع واجهة لإدارة كافة جوانب النظام
                          </CardDescription>
                          <Button variant="outline" className="mt-4">
                            الوصول إلى لوحة التحكم
                          </Button>
                        </CardContent>
                      </Card>

                      <Card
                        className="hover:shadow-md transition-all cursor-pointer"
                        onClick={() => navigateToControlPanel('3')}
                      >
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <Store className="h-10 w-10 text-primary my-2" />
                          <CardTitle className="text-lg mb-1">المتجر (STORE OWNER)</CardTitle>
                          <CardDescription>
                            لوحة تحكم لأصحاب المتاجر لإدارة المنتجات والطلبات
                          </CardDescription>
                          <Button variant="outline" className="mt-4">
                            الوصول إلى لوحة التحكم
                          </Button>
                        </CardContent>
                      </Card>

                      <Card
                        className="hover:shadow-md transition-all cursor-pointer"
                        onClick={() => navigateToControlPanel('4')}
                      >
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <Truck className="h-10 w-10 text-primary my-2" />
                          <CardTitle className="text-lg mb-1">التوصيل (DELIVERY)</CardTitle>
                          <CardDescription>
                            لوحة تحكم لموظفي التوصيل لتتبع ومعالجة الطلبات
                          </CardDescription>
                          <Button variant="outline" className="mt-4">
                            الوصول إلى لوحة التحكم
                          </Button>
                        </CardContent>
                      </Card>

                      <Card
                        className="hover:shadow-md transition-all cursor-pointer"
                        onClick={() => navigateToControlPanel('5')}
                      >
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <ShieldCheck className="h-10 w-10 text-primary my-2" />
                          <CardTitle className="text-lg mb-1">الأمان (SECURITY)</CardTitle>
                          <CardDescription>لوحة تحكم خاصة بالأمان ومراقبة النظام</CardDescription>
                          <Button variant="outline" className="mt-4">
                            الوصول إلى لوحة التحكم
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Dashboard;
