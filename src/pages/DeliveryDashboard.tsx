import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { PageTransition } from '@/components/ui/page-transition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import OrderAssignment from '@/components/delivery/OrderAssignment';
import LiveTracking from '@/components/delivery/LiveTracking';
import DriverManagement from '@/components/delivery/DriverManagement';
import RouteOptimization from '@/components/delivery/RouteOptimization';
import FleetAnalytics from '@/components/delivery/FleetAnalytics';
import DeliverySystemStructure from '@/components/delivery/DeliverySystemStructure';

const DeliveryDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">لوحة تحكم التوصيل</h1>
              <p className="text-muted-foreground mt-1">إدارة التوصيل والتتبع والسائقين</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-6 mb-8">
              <TabsTrigger value="structure">الهيكل العام</TabsTrigger>
              <TabsTrigger value="orders">إدارة الطلبات</TabsTrigger>
              <TabsTrigger value="tracking">التتبع المباشر</TabsTrigger>
              <TabsTrigger value="drivers">إدارة السائقين</TabsTrigger>
              <TabsTrigger value="routes">تحسين المسارات</TabsTrigger>
              <TabsTrigger value="fleet">تحليلات الأسطول</TabsTrigger>
            </TabsList>

            <TabsContent value="structure" className="w-full">
              <DeliverySystemStructure />
            </TabsContent>

            <TabsContent value="orders" className="w-full">
              <OrderAssignment />
            </TabsContent>

            <TabsContent value="tracking" className="w-full">
              <LiveTracking />
            </TabsContent>

            <TabsContent value="drivers" className="w-full">
              <DriverManagement />
            </TabsContent>

            <TabsContent value="routes" className="w-full">
              <RouteOptimization />
            </TabsContent>

            <TabsContent value="fleet" className="w-full">
              <FleetAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default DeliveryDashboard;
