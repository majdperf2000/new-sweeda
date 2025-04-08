// إزالة React من الاستيراد لأننا نستخدم JSX تلقائيًا في React 17+
import { useState } from 'react';
import PageTransition from '@/components/animations/page-transition.js';
import MainLayout from '@/components/layout/MainLayout.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.js';
import { Card, CardContent } from '@/components/ui/card.js';
import { Badge } from '@/components/ui/Badge.js';
import { Button } from '@/components/ui/button.js';
import { AlertCircle, RefreshCw, Package } from 'lucide-react';
import { toast } from 'sonner';
import InventoryManagement from '@/components/storeOwner/InventoryManagement.js';
import OrderManagement from '@/components/storeOwner/OrderManagement.js';
import CustomerInsights from '@/components/storeOwner/CustomerInsights.js';
import SalesReports from '@/components/storeOwner/SalesReports.js';
import ToolsIntegrations from '@/components/storeOwner/ToolsIntegrations.js';

const StoreOwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');

  const notificationCount = {
    inventory: 3,
    orders: 5,
    customers: 1,
    sales: 0,
    tools: 2,
  };

  const totalNotifications = Object.values(notificationCount).reduce((a, b) => a + b, 0);

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="heading-2 mb-2">لوحة تحكم صاحب المتجر</h1>
              <p className="text-muted-foreground">
                مرحباً بك في لوحة تحكم المتجر. يمكنك إدارة المخزون، الطلبات، العملاء والمبيعات.
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast.success('تم تحديث البيانات', {
                    description: 'تم تحديث جميع البيانات في لوحة التحكم',
                  });
                }}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                تحديث البيانات
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="relative"
                onClick={() => {
                  toast.info(`لديك ${totalNotifications} إشعارات جديدة`, {
                    description: 'انقر لعرض جميع الإشعارات',
                  });
                }}
              >
                <AlertCircle className="h-4 w-4 mr-1" />
                الإشعارات
                {totalNotifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalNotifications}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <Card
              className="bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
              onClick={() => setActiveTab('inventory')}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">المخزون</h3>
                  <p className="text-sm text-muted-foreground">إدارة المخزون</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </CardContent>
            </Card>

            {/* تكرار البطاقات الأخرى بنفس النمط */}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="mb-6 grid grid-cols-5 w-full">
              <TabsTrigger value="inventory" className="relative">
                المخزون
                {notificationCount.inventory > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notificationCount.inventory}
                  </Badge>
                )}
              </TabsTrigger>
              {/* تكرار TabsTrigger الأخرى بنفس النمط */}
            </TabsList>

            <TabsContent value="inventory">
              <InventoryManagement />
            </TabsContent>

            {/* تكرار TabsContent الأخرى */}
          </Tabs>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default StoreOwnerDashboard;
