import React, { useState, useEffect } from 'react';
import ControlPanelsLayout from './ControlPanelsLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Info, Settings, Download } from 'lucide-react';
import { controlPanelsData } from './controlPanelData';
import { toast } from 'sonner';

export const ControlPanelsContent: React.FC = () => {
  const [activePanel, setActivePanel] = useState(controlPanelsData[0].id);
  const [activeTab, setActiveTab] = useState('overview');

  // Listen for hash changes to update the active panel
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && controlPanelsData.some((panel) => panel.id === hash)) {
        setActivePanel(hash);
      }
    };

    // Set initial value from hash if present
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Add click event listener for sidebar menu items
    const handleMenuClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const menuItem = target.closest('[data-panel-id]');
      if (menuItem) {
        const panelId = menuItem.getAttribute('data-panel-id');
        if (panelId) {
          setActivePanel(panelId);
        }
      }
    };

    document.addEventListener('click', handleMenuClick);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleMenuClick);
    };
  }, []);

  // Find the active panel data
  const activePanelData =
    controlPanelsData.find((panel) => panel.id === activePanel) || controlPanelsData[0];

  const generateReport = (type: string) => {
    toast.success(`تم توليد تقرير ${activePanelData.title} بتنسيق ${type}`, {
      description: 'يمكنك تنزيل التقرير الآن',
    });
  };

  const getPanelTypeDescription = (panelId: string) => {
    switch (panelId) {
      case '1':
        return 'الذكاء الاصطناعي';
      case '2':
        return 'إدارة النظام';
      case '3':
        return 'إدارة المتاجر';
      case '4':
        return 'إدارة التوصيل';
      case '5':
        return 'أمان النظام';
      default:
        return 'لوحة تحكم';
    }
  };

  return (
    <div className="container p-4 max-w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center gap-2">
          <h2 className="heading-2 mb-2 md:mb-0">{activePanelData.title}</h2>
          <Badge variant="outline" className="text-sm font-normal">
            {getPanelTypeDescription(activePanelData.id)}
          </Badge>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.info('تم تحديث البيانات', {
                description: 'تم تحديث جميع البيانات في لوحة التحكم',
              });
            }}
          >
            <Settings className="h-4 w-4 mr-1" />
            تحديث
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.info('المساعدة', {
                description: `هذه هي لوحة تحكم ${activePanelData.title}. استخدم القائمة على اليسار للتنقل بين الأقسام المختلفة.`,
              });
            }}
          >
            <Info className="h-4 w-4 mr-1" />
            مساعدة
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
          <TabsTrigger value="content">المحتوى</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>نظرة عامة عن لوحة التحكم</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                تعرض لوحة التحكم هذه البيانات والوظائف المتعلقة بـ {activePanelData.title}. يمكنك
                الوصول إلى جميع الميزات المتاحة من خلال القائمة الجانبية.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>تقارير النظام</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                يمكنك توليد وتنزيل التقارير المتعلقة بـ {activePanelData.title} من هنا.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" onClick={() => generateReport('PDF')}>
                  <Download className="h-4 w-4 mr-1" />
                  تقرير PDF
                </Button>
                <Button variant="outline" onClick={() => generateReport('Excel')}>
                  <Download className="h-4 w-4 mr-1" />
                  تقرير Excel
                </Button>
                <Button variant="outline" onClick={() => generateReport('CSV')}>
                  <Download className="h-4 w-4 mr-1" />
                  تقرير CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>محتوى لوحة التحكم</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                اختر من القائمة اليسرى للوصول إلى محتوى لوحة التحكم {activePanelData.title}.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activePanelData.items.map((item) => (
                  <Card key={item.id} className="p-4">
                    <h3 className="text-base font-medium">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={() => {
                        const element = document.querySelector(
                          `[data-panel-id="${activePanelData.id}"]`
                        );
                        if (element) {
                          (element as HTMLElement).click();
                          setTimeout(() => {
                            setActiveTab('overview');
                          }, 100);

                          toast.success(`تم الانتقال إلى ${item.title}`, {
                            description: 'اختر العنصر من القائمة على اليسار',
                          });
                        }
                      }}
                    >
                      عرض التفاصيل
                    </Button>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ControlPanelsLayout initialActiveTab={activePanel} />
    </div>
  );
};
