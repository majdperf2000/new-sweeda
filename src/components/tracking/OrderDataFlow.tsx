import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.js';

export const OrderDataFlow = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <div className="p-4 border rounded-lg">
      <Tabs defaultValue="flow">
        <TabsList className="mb-4">
          <TabsTrigger value="flow">
            {language === 'en' ? 'Data Flow' : 'تدفق البيانات'}
          </TabsTrigger>
          <TabsTrigger value="security">{language === 'en' ? 'Security' : 'الأمان'}</TabsTrigger>
          <TabsTrigger value="system">
            {language === 'en' ? 'System Architecture' : 'بنية النظام'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flow" className="space-y-4">
          <div className="overflow-auto border p-4 rounded-md bg-muted/30 text-sm whitespace-pre-wrap font-mono">
            {`graph TD
    A[Raw GPS Data] --> B[Apache Kafka]
    B --> C[Spark Streaming]
    C --> D{AI Microservices}
    D --> E[Route Optimization]
    D --> F[ETA Prediction]
    D --> G[Fraud Detection]
    E --> H[Driver App]
    F --> I[Customer App]
    G --> J[Admin Dashboard]
    H --> K[Performance Feedback]
    K --> C
    I --> L[Localized Pricing]`}
          </div>

          <div className="p-4 bg-accent/30 rounded-md">
            <h4 className="font-medium mb-2">
              {language === 'en' ? 'How Your Order Is Tracked' : 'كيف يتم تتبع طلبيتك'}
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>
                {language === 'en'
                  ? "Driver's device sends real-time GPS data"
                  : 'يرسل جهاز السائق بيانات GPS في الوقت الفعلي'}
              </li>
              <li>
                {language === 'en'
                  ? 'Kafka messaging system processes data streams'
                  : 'يعالج نظام رسائل Kafka تدفقات البيانات'}
              </li>
              <li>
                {language === 'en'
                  ? 'Spark Streaming analyzes location data in real-time'
                  : 'يحلل Spark Streaming بيانات الموقع في الوقت الفعلي'}
              </li>
              <li>
                {language === 'en'
                  ? 'AI services optimize routes and predict delivery times'
                  : 'تقوم خدمات الذكاء الاصطناعي بتحسين المسارات والتنبؤ بأوقات التسليم'}
              </li>
              <li>
                {language === 'en'
                  ? 'Customer app receives updates with precise ETA'
                  : 'يتلقى تطبيق العميل تحديثات مع وقت وصول دقيق'}
              </li>
            </ol>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="overflow-auto border p-4 rounded-md bg-muted/30 text-sm whitespace-pre-wrap font-mono">
            {`graph LR
A[طلب تسجيل الدخول] --> B{التحقق من:}
B --> C[سلوك الكتابة (Keystroke Dynamics)]
B --> D[نمط الاستخدام الزمني]
B --> E[مخاطر الجهاز/IP]
C & D & E --> F[نموذج تقييم المخاطر]
F -->|مخاطر منخفضة| G[الدخول المباشر]
F -->|مخاطر عالية| H[طلب OTP/بيومتري]`}
          </div>

          <div className="overflow-auto border p-4 rounded-md bg-muted/30 text-sm whitespace-pre-wrap font-mono">
            {`if (رقم الهاتف الجديد) in blacklist_db:  
  رفض الإضافة + تنبيه الإدارة`}
          </div>

          <div className="p-4 bg-accent/30 rounded-md">
            <h4 className="font-medium mb-2">
              {language === 'en' ? 'Security Measures' : 'إجراءات الأمان'}
            </h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>
                {language === 'en'
                  ? 'Multi-factor authentication for sensitive operations'
                  : 'المصادقة متعددة العوامل للعمليات الحساسة'}
              </li>
              <li>
                {language === 'en'
                  ? 'Behavioral analysis to detect suspicious activities'
                  : 'تحليل سلوكي للكشف عن الأنشطة المشبوهة'}
              </li>
              <li>
                {language === 'en'
                  ? 'Real-time fraud detection on all transactions'
                  : 'الكشف عن الاحتيال في الوقت الفعلي على جميع المعاملات'}
              </li>
              <li>
                {language === 'en'
                  ? 'Blacklist database for known fraudulent accounts'
                  : 'قاعدة بيانات القائمة السوداء للحسابات الاحتيالية المعروفة'}
              </li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="overflow-auto border p-4 rounded-md bg-muted/30 text-sm whitespace-pre-wrap font-mono">
            {`graph TD
    A[واجهة المستخدم] --> B[API Gateway]
    B --> C[خدمة المصادقة]
    C --> D[(قاعدة بيانات)]
    C --> E[خدمات الذكاء الاصطناعي]
    E --> F[نموذج كشف الاحتيال]
    E --> G[نموذج التعرف على الوثائق]
    E --> H[نظام التوصية]
    F & G & H --> I[سجل الأحداث]
    I --> J[لوحة مراقبة الإدارة]`}
          </div>

          <div className="p-4 bg-accent/30 rounded-md">
            <h4 className="font-medium mb-2">
              {language === 'en' ? 'Technology Stack' : 'مجموعة التقنيات'}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="font-medium">Frontend:</span> React, TypeScript, Tailwind
              </li>
              <li>
                <span className="font-medium">Backend:</span> Node.js, Express, GraphQL
              </li>
              <li>
                <span className="font-medium">Real-time:</span> Apache Kafka, WebSockets
              </li>
              <li>
                <span className="font-medium">AI/ML:</span> TensorFlow, PyTorch, Spark ML
              </li>
              <li>
                <span className="font-medium">Database:</span> PostgreSQL, Redis, MongoDB
              </li>
              <li>
                <span className="font-medium">DevOps:</span> Docker, Kubernetes, GitHub Actions
              </li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
