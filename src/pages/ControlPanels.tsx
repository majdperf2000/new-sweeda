import React, { useState } from 'react';
import { PageTransition } from '@/components/ui/page-transition';
import MainLayout from '@/components/layout/MainLayout';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { ControlPanelsContent } from '@/components/controlPanel/ControlPanelsContent';
import { LayoutDashboard, Store, Truck, ShieldCheck, Cpu, Bell, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Panel types based on existing data
const panelItems = [
  { id: '1', title: 'AI CORE', icon: Cpu, notifications: 3 },
  { id: '2', title: 'ADMIN', icon: LayoutDashboard, notifications: 5 },
  { id: '3', title: 'STORE OWNER', icon: Store, notifications: 2 },
  { id: '4', title: 'DELIVERY', icon: Truck, notifications: 1 },
  { id: '5', title: 'SECURITY', icon: ShieldCheck, notifications: 0 },
];

const ControlPanels = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleShowNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      toast.success('تم تحديث الإشعارات', {
        description: 'الإشعارات الجديدة: 11 إشعار',
      });
    }
  };

  const totalNotifications = panelItems.reduce((sum, item) => sum + item.notifications, 0);

  return (
    <MainLayout>
      <PageTransition>
        <SidebarProvider defaultOpen={true}>
          <div className="min-h-screen flex w-full">
            <Sidebar variant="sidebar" collapsible="icon">
              <SidebarHeader className="pt-6">
                <h2 className="px-4 text-lg font-semibold">لوحات التحكم</h2>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>أنواع لوحات التحكم</SidebarGroupLabel>
                  <SidebarMenu>
                    {panelItems.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton asChild tooltip={item.title} className="relative">
                          <a href={`#${item.id}`} data-panel-id={item.id}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            {item.notifications > 0 && (
                              <Badge
                                variant="destructive"
                                className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center p-0 text-xs"
                              >
                                {item.notifications}
                              </Badge>
                            )}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            <SidebarInset>
              <div className="relative flex flex-1 flex-col overflow-hidden">
                <div className="flex items-center justify-between h-14 px-4 border-b">
                  <div className="flex items-center">
                    <SidebarTrigger />
                    <h1 className="ml-4 text-lg font-semibold">نظام إدارة لوحات التحكم</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="relative"
                      onClick={handleShowNotifications}
                    >
                      <Bell className="h-4 w-4 mr-1" />
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast.info('مرحباً بك في نظام لوحات التحكم', {
                          description: 'يمكنك الوصول إلى جميع لوحات التحكم من القائمة الجانبية',
                        });
                      }}
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      المساعدة
                    </Button>
                  </div>
                </div>
                <div className="flex-1 overflow-auto">
                  <ControlPanelsContent />
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </PageTransition>
    </MainLayout>
  );
};

export default ControlPanels;
