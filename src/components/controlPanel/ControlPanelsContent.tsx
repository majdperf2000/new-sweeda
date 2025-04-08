// ControlPanelsContent.tsx
import React, { useState, useEffect } from 'react';
import ControlPanelsLayout from '@/components/controlPanel/ControlPanelsLayout.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.js';
import { Badge } from '@/components/ui/Badge.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.js';
import { Button } from '@/components/ui/button.js';
import { Info, Settings, Download } from 'lucide-react';
import { controlPanelsData } from './controlPanelData.js';
import { toast } from 'sonner';

export const ControlPanelsContent: React.FC = () => {
  const [activePanel, setActivePanel] = useState(controlPanelsData[0]?.id || '1');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const isValidPanel = controlPanelsData.some((panel) => panel.id === hash);
      if (isValidPanel) setActivePanel(hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    const handleMenuClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const panelId = target.closest('[data-panel-id]')?.getAttribute('data-panel-id');
      if (panelId) setActivePanel(panelId);
    };

    document.addEventListener('click', handleMenuClick);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleMenuClick);
    };
  }, []);

  const activePanelData =
    controlPanelsData.find((panel) => panel.id === activePanel) || controlPanelsData[0];

  const generateReport = (type: string) => {
    toast.success(`تم توليد تقرير ${activePanelData.title}`, {
      description: `التنسيق: ${type} - جاهز للتنزيل`,
    });
  };

  const getPanelTypeDescription = (panelId: string) => {
    const descriptions: Record<string, string> = {
      '1': 'الذكاء الاصطناعي',
      '2': 'إدارة النظام',
      '3': 'إدارة المتاجر',
      '4': 'إدارة التوصيل',
      '5': 'أمان النظام',
    };
    return descriptions[panelId] || 'لوحة تحكم';
  };

  return (
    <div className="container p-4 max-w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">{activePanelData.title}</h2>
          <Badge variant="outline" className="text-sm font-normal">
            {getPanelTypeDescription(activePanelData.id)}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.info('تم تحديث بيانات اللوحة')}>
            <Settings className="h-4 w-4 mr-1" />
            تحديث
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.info(activePanelData.helpText)}>
            <Info className="h-4 w-4 mr-1" />
            مساعدة
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-3 w-full md:w-1/2">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
          <TabsTrigger value="content">المحتوى</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>ملخص الأداء</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activePanelData.metrics?.map((metric) => (
                  <div key={metric.id} className="border p-4 rounded-lg">
                    <h3 className="font-medium">{metric.title}</h3>
                    <p className="text-muted-foreground">{metric.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>إدارة التقارير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {['PDF', 'Excel', 'CSV'].map((format) => (
                  <Button key={format} variant="outline" onClick={() => generateReport(format)}>
                    <Download className="h-4 w-4 mr-1" />
                    {`تقرير ${format}`}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>الوحدات الفرعية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activePanelData.subModules?.map((module) => (
                  <Card key={module.id} className="p-4 hover:bg-accent transition-colors">
                    <h3 className="font-medium">{module.title}</h3>
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                    <Button
                      size="sm"
                      variant="link"
                      className="mt-2 px-0"
                      onClick={() => {
                        window.location.hash = `#${module.id}`;
                        setActiveTab('overview');
                      }}
                    >
                      عرض التفاصيل →
                    </Button>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ControlPanelsLayout activePanel={activePanel} onPanelChange={setActivePanel} />
    </div>
  );
};
