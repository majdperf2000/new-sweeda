import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.js';
import { Button } from '@/components/ui/button.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.js';
import { Badge } from '@/components/ui/Badge.js';
import { toast } from 'sonner';
import {
  Zap,
  CreditCard,
  BarChart,
  MessageCircle,
  Settings,
  Link,
  CheckCircle,
  XCircle,
  RefreshCw,
} from 'lucide-react';

const ToolsIntegrations = () => {
  const [activeSubTab, setActiveSubTab] = useState('payments');

  // Sample integrations data
  const integrations = [
    { id: 1, name: 'Stripe', type: 'payment', status: 'connected', lastSync: '28/03/2025' },
    { id: 2, name: 'PayPal', type: 'payment', status: 'not-connected', lastSync: '-' },
    {
      id: 3,
      name: 'Google Analytics 4',
      type: 'analytics',
      status: 'connected',
      lastSync: '27/03/2025',
    },
    {
      id: 4,
      name: 'WhatsApp Business API',
      type: 'communication',
      status: 'connected',
      lastSync: '25/03/2025',
    },
    { id: 5, name: 'Facebook Pixel', type: 'analytics', status: 'not-connected', lastSync: '-' },
  ];

  const handleConnect = (name) => {
    toast.info(`توصيل ${name}`, {
      description: `جاري إعداد توصيل ${name}. يرجى اتباع التعليمات.`,
    });
  };

  const handleSync = (name) => {
    toast.success(`مزامنة ${name}`, {
      description: `تمت مزامنة بيانات ${name} بنجاح.`,
    });
  };

  const filteredIntegrations =
    activeSubTab === 'all'
      ? integrations
      : integrations.filter((integration) => integration.type === activeSubTab);

  const getStatusBadge = (status) => {
    return status === 'connected' ? (
      <Badge className="bg-green-500">متصل</Badge>
    ) : (
      <Badge variant="outline">غير متصل</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">الأدوات والتكاملات</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              toast.success('تحديث الإتصالات', {
                description: 'تم تحديث جميع الإتصالات بنجاح',
              });
            }}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            تحديث الإتصالات
          </Button>
          <Button
            onClick={() => {
              toast.info('إضافة تكامل جديد', {
                description: 'اختر من قائمة التكاملات المتاحة أو أدخل API مخصص',
              });
            }}
          >
            <Zap className="h-4 w-4 mr-1" />
            تكامل جديد
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">جميع التكاملات</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <Zap className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">تكاملات نشطة</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">تكاملات غير متصلة</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList>
          <TabsTrigger value="all">جميع التكاملات</TabsTrigger>
          <TabsTrigger value="payment">المدفوعات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="communication">التواصل</TabsTrigger>
        </TabsList>

        <TabsContent value={activeSubTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Link className="ml-2 h-5 w-5" />
                {activeSubTab === 'all'
                  ? 'جميع التكاملات'
                  : activeSubTab === 'payment'
                    ? 'تكاملات المدفوعات'
                    : activeSubTab === 'analytics'
                      ? 'تكاملات التحليلات'
                      : 'تكاملات التواصل'}
              </CardTitle>
              <CardDescription>إدارة تكاملات متجرك مع خدمات الطرف الثالث</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-right">الخدمة</th>
                      <th className="p-3 text-right">النوع</th>
                      <th className="p-3 text-right">الحالة</th>
                      <th className="p-3 text-right">آخر مزامنة</th>
                      <th className="p-3 text-right">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIntegrations.map((integration) => (
                      <tr key={integration.id} className="border-t">
                        <td className="p-3">{integration.name}</td>
                        <td className="p-3">
                          {integration.type === 'payment'
                            ? 'مدفوعات'
                            : integration.type === 'analytics'
                              ? 'تحليلات'
                              : 'تواصل'}
                        </td>
                        <td className="p-3">{getStatusBadge(integration.status)}</td>
                        <td className="p-3">{integration.lastSync}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            {integration.status === 'connected' ? (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleSync(integration.name)}
                                >
                                  <RefreshCw className="h-3 w-3 mr-1" />
                                  مزامنة
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    toast.info(`إعدادات ${integration.name}`, {
                                      description: `تعديل إعدادات ${integration.name}`,
                                    });
                                  }}
                                >
                                  <Settings className="h-3 w-3 mr-1" />
                                  إعدادات
                                </Button>
                              </>
                            ) : (
                              <Button size="sm" onClick={() => handleConnect(integration.name)}>
                                <Link className="h-3 w-3 mr-1" />
                                توصيل
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {activeSubTab === 'payment' && (
                <div className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="ml-2 h-5 w-5" />
                        تتبع المدفوعات
                      </CardTitle>
                      <CardDescription>تتبع مدفوعات Stripe/PayPal</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 border rounded-md">
                        <h3 className="text-lg font-semibold mb-4">ملخص المدفوعات (Stripe)</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <Card>
                            <CardContent className="p-3">
                              <p className="text-sm text-muted-foreground">إجمالي المبيعات</p>
                              <p className="text-xl font-bold">12,540 ر.س</p>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-3">
                              <p className="text-sm text-muted-foreground">رسوم المنصة</p>
                              <p className="text-xl font-bold">320 ر.س</p>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-3">
                              <p className="text-sm text-muted-foreground">صافي المدفوعات</p>
                              <p className="text-xl font-bold">12,220 ر.س</p>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium">آخر المدفوعات</p>
                            <div className="mt-2 border rounded-md overflow-hidden">
                              <table className="w-full text-sm">
                                <thead className="bg-muted">
                                  <tr>
                                    <th className="p-2 text-right">التاريخ</th>
                                    <th className="p-2 text-right">المبلغ</th>
                                    <th className="p-2 text-right">الحالة</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-t">
                                    <td className="p-2">28/03/2025</td>
                                    <td className="p-2">150 ر.س</td>
                                    <td className="p-2">
                                      <Badge className="bg-green-500">مكتمل</Badge>
                                    </td>
                                  </tr>
                                  <tr className="border-t">
                                    <td className="p-2">27/03/2025</td>
                                    <td className="p-2">320 ر.س</td>
                                    <td className="p-2">
                                      <Badge className="bg-green-500">مكتمل</Badge>
                                    </td>
                                  </tr>
                                  <tr className="border-t">
                                    <td className="p-2">26/03/2025</td>
                                    <td className="p-2">95 ر.س</td>
                                    <td className="p-2">
                                      <Badge className="bg-green-500">مكتمل</Badge>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSubTab === 'analytics' && (
                <div className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart className="ml-2 h-5 w-5" />
                        تكامل Google Analytics 4
                      </CardTitle>
                      <CardDescription>بيانات التحليلات من Google Analytics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 border rounded-md">
                        <h3 className="text-lg font-semibold mb-4">ملخص بيانات Google Analytics</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <Card>
                            <CardContent className="p-3">
                              <p className="text-sm text-muted-foreground">إجمالي الزوار</p>
                              <p className="text-xl font-bold">1,245</p>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-3">
                              <p className="text-sm text-muted-foreground">معدل التحويل</p>
                              <p className="text-xl font-bold">3.8%</p>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-3">
                              <p className="text-sm text-muted-foreground">متوسط وقت الجلسة</p>
                              <p className="text-xl font-bold">4:32 دقيقة</p>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="h-40 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md flex items-end p-2 gap-1 mb-4">
                          {/* رسم بياني محاكي للزوار */}
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

                        <Button
                          variant="outline"
                          onClick={() => {
                            toast.info('فتح لوحة تحكم Google Analytics', {
                              description: 'جاري فتح لوحة تحكم Google Analytics الخاصة بك',
                            });
                          }}
                        >
                          <BarChart className="h-4 w-4 mr-1" />
                          فتح لوحة تحكم Google Analytics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeSubTab === 'communication' && (
                <div className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MessageCircle className="ml-2 h-5 w-5" />
                        واتساب للأعمال
                      </CardTitle>
                      <CardDescription>إدارة إشعارات واتساب للأعمال</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 border rounded-md mb-4">
                        <h3 className="text-lg font-semibold mb-4">حالة تكامل واتساب للأعمال</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <Card>
                            <CardContent className="p-3">
                              <p className="text-sm text-muted-foreground">الرسائل المرسلة</p>
                              <p className="text-xl font-bold">245</p>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-3">
                              <p className="text-sm text-muted-foreground">معدل الفتح</p>
                              <p className="text-xl font-bold">92%</p>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="p-3">
                              <p className="text-sm text-muted-foreground">معدل الرد</p>
                              <p className="text-xl font-bold">45%</p>
                            </CardContent>
                          </Card>
                        </div>

                        <h4 className="font-medium mb-2">قوالب الرسائل النشطة</h4>
                        <div className="border rounded-md overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-muted">
                              <tr>
                                <th className="p-2 text-right">اسم القالب</th>
                                <th className="p-2 text-right">الحالة</th>
                                <th className="p-2 text-right">الإستخدامات</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-t">
                                <td className="p-2">تأكيد الطلب</td>
                                <td className="p-2">
                                  <Badge className="bg-green-500">مفعل</Badge>
                                </td>
                                <td className="p-2">120</td>
                              </tr>
                              <tr className="border-t">
                                <td className="p-2">حالة الشحن</td>
                                <td className="p-2">
                                  <Badge className="bg-green-500">مفعل</Badge>
                                </td>
                                <td className="p-2">85</td>
                              </tr>
                              <tr className="border-t">
                                <td className="p-2">استطلاع الرضا</td>
                                <td className="p-2">
                                  <Badge className="bg-green-500">مفعل</Badge>
                                </td>
                                <td className="p-2">40</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            toast.info('إرسال إشعار للعملاء', {
                              description: 'إنشاء إشعار جديد لإرساله للعملاء عبر واتساب للأعمال',
                            });
                          }}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          إرسال إشعار
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            toast.info('إدارة القوالب', {
                              description: 'تعديل قوالب الرسائل في واتساب للأعمال',
                            });
                          }}
                        >
                          <Settings className="h-4 w-4 mr-1" />
                          إدارة القوالب
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ToolsIntegrations;
