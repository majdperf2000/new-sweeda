import React from 'react';
import {
  Shield,
  Lock,
  KeyRound,
  FileText,
  Server,
  Database,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.js';
import { Badge } from '@/components/ui/Badge.js';
import { Separator } from '@/components/ui/separator.js';

const SecurityArchitecture = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              نظام الأمان المشترك
            </CardTitle>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" /> متوافق مع معايير OWASP
            </Badge>
          </div>
          <CardDescription>
            هيكل الأمان المقترح للنظام، يتضمن المصادقة، التشفير، والتدقيق
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="authentication">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="authentication">المصادقة</TabsTrigger>
              <TabsTrigger value="encryption">التشفير</TabsTrigger>
              <TabsTrigger value="audit">التدقيق والمراقبة</TabsTrigger>
            </TabsList>

            <TabsContent value="authentication" className="space-y-4 mt-4">
              <Alert className="bg-blue-50 border-blue-200">
                <KeyRound className="h-4 w-4 text-blue-500" />
                <AlertTitle>المصادقة باستخدام JWT</AlertTitle>
                <AlertDescription>
                  نظام مصادقة متكامل يستخدم رموز JWT مع صلاحيات مستندة إلى الأدوار
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card className="border-2 border-blue-100">
                  <CardHeader className="py-3 px-4 bg-blue-50">
                    <CardTitle className="text-base font-semibold">الدخول والتسجيل</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">التحقق من البريد الإلكتروني</p>
                        <p className="text-gray-500">إرسال رسالة تأكيد للتحقق من هوية المستخدم</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">التحقق من كلمة المرور</p>
                        <p className="text-gray-500">
                          فرض سياسات كلمات مرور قوية (8+ أحرف، رموز، أرقام)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">المصادقة الثنائية (2FA)</p>
                        <p className="text-gray-500">طبقة إضافية من الأمان عبر رمز OTP</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-100">
                  <CardHeader className="py-3 px-4 bg-purple-50">
                    <CardTitle className="text-base font-semibold">
                      الصلاحيات المستندة إلى الأدوار
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">صلاحيات العميل</p>
                        <p className="text-gray-500">
                          عرض الطلبات، إنشاء طلبات جديدة، تتبع الطلبات
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">صلاحيات المتجر</p>
                        <p className="text-gray-500">إدارة المخزون، معالجة الطلبات، عرض المبيعات</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">صلاحيات التوصيل</p>
                        <p className="text-gray-500">
                          عرض الطلبات المتاحة، تحديث حالة الطلب، تسجيل التسليم
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">مثال على تنفيذ JWT:</h3>
                <pre className="bg-gray-100 p-3 rounded-md text-xs overflow-auto">
                  {`// تخزين التوكن بعد تسجيل الدخول
const loginUser = async (email, password) => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = response.user;
    const token = await user.getIdToken();
    
    // تخزين التوكن في localStorage بشكل آمن
    localStorage.setItem('auth_token', token);
    
    // إضافة التوكن إلى header لكل الطلبات
    axios.defaults.headers.common['Authorization'] = \`Bearer \${token}\`;
    
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};`}
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="encryption" className="space-y-4 mt-4">
              <Alert className="bg-green-50 border-green-200">
                <Lock className="h-4 w-4 text-green-500" />
                <AlertTitle>تشفير البيانات</AlertTitle>
                <AlertDescription>
                  استراتيجية متعددة المستويات لتشفير البيانات أثناء النقل والتخزين
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card className="border-2 border-green-100">
                  <CardHeader className="py-3 px-4 bg-green-50">
                    <CardTitle className="text-base font-semibold">
                      تشفير البيانات أثناء النقل
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">TLS 1.3</p>
                        <p className="text-gray-500">لجميع طلبات API وتفاعلات المستخدم</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">HTTPS فقط</p>
                        <p className="text-gray-500">إجبار HTTPS عبر توجيه HTTP إلى HTTPS</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-100">
                  <CardHeader className="py-3 px-4 bg-green-50">
                    <CardTitle className="text-base font-semibold">
                      تشفير البيانات المخزنة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">AES-256</p>
                        <p className="text-gray-500">للبيانات الشخصية والمعلومات الحساسة</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">تشفير Local Storage</p>
                        <p className="text-gray-500">حماية البيانات المخزنة محليًا على المتصفح</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">مثال على تنفيذ تشفير البيانات المحلية:</h3>
                <pre className="bg-gray-100 p-3 rounded-md text-xs overflow-auto">
                  {`// تشفير البيانات في localStorage
import CryptoJS from 'crypto-js';

// دالة لتشفير البيانات وتخزينها
const secureStore = {
  setItem: (key, data, secretKey) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    localStorage.setItem(key, encryptedData);
  },
  
  getItem: (key, secretKey) => {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;
    
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(
      decryptedBytes.toString(CryptoJS.enc.Utf8)
    );
    return decryptedData;
  }
};`}
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="audit" className="space-y-4 mt-4">
              <Alert className="bg-amber-50 border-amber-200">
                <FileText className="h-4 w-4 text-amber-500" />
                <AlertTitle>تدقيق النشاط والمراقبة</AlertTitle>
                <AlertDescription>
                  تسجيل وتتبع جميع الأنشطة المهمة في النظام للمراقبة والأمان
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card className="border-2 border-amber-100">
                  <CardHeader className="py-3 px-4 bg-amber-50">
                    <CardTitle className="text-base font-semibold">سجلات النشاط</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">تسجيل المستخدمين</p>
                        <p className="text-gray-500">
                          تسجيل عمليات تسجيل الدخول/الخروج مع بيانات IP
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">تسجيل الطلبات</p>
                        <p className="text-gray-500">تتبع إنشاء وتعديل وإلغاء الطلبات</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">تغييرات البيانات</p>
                        <p className="text-gray-500">تسجيل أي تغييرات على البيانات الحساسة</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-amber-100">
                  <CardHeader className="py-3 px-4 bg-amber-50">
                    <CardTitle className="text-base font-semibold">
                      الكشف عن الأنشطة المشبوهة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">اكتشاف الاختراق</p>
                        <p className="text-gray-500">
                          مراقبة محاولات تسجيل الدخول الفاشلة المتكررة
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">تتبع الموقع الجغرافي</p>
                        <p className="text-gray-500">كشف تسجيل الدخول من مواقع غير معتادة</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">مثال على تنفيذ سجل النشاط:</h3>
                <pre className="bg-gray-100 p-3 rounded-md text-xs overflow-auto">
                  {`// سجل نشاط المستخدم
const logUserActivity = async (userId, action, details) => {
  try {
    const timestamp = new Date().toISOString();
    const ipAddress = await fetchIPAddress();
    const geoData = await fetchGeoData(ipAddress);
    
    await firebase.firestore().collection('activity_logs').add({
      userId,
      action,
      details,
      timestamp,
      ipAddress,
      location: {
        country: geoData.country,
        city: geoData.city,
        coordinates: {
          latitude: geoData.latitude,
          longitude: geoData.longitude
        }
      }
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};`}
                </pre>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          <div>
            <h3 className="text-xl font-semibold mb-4">المكونات التقنية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-3 px-4 bg-blue-50">
                  <CardTitle className="text-base font-semibold">الواجهة الأمامية</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">إطار العمل</span>
                      <span>React.js + Redux</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">الخرائط</span>
                      <span>Mapbox GL JS</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">الإشعارات</span>
                      <span>Socket.IO</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="py-3 px-4 bg-green-50">
                  <CardTitle className="text-base font-semibold">واجهات API والأدوات</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">تنبيهات المخزون</span>
                      <span>Twilio API, Slack Webhook</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">تحسين المسارات</span>
                      <span>Google OR-Tools, HERE Maps</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">رؤى العملاء</span>
                      <span>Segment.com, Mixpanel</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">أفضل الممارسات للتنفيذ</h3>
            <div className="space-y-3">
              <Alert className="bg-gray-50">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertTitle>تجنب تخزين البيانات الحساسة في التعليمات البرمجية</AlertTitle>
                <AlertDescription>
                  استخدم متغيرات البيئة أو خدمات إدارة الأسرار لتخزين مفاتيح API والأسرار
                </AlertDescription>
              </Alert>

              <Alert className="bg-gray-50">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertTitle>صلاحيات محددة في قواعد البيانات</AlertTitle>
                <AlertDescription>
                  تنفيذ قواعد Firestore التي تحد من الوصول إلى البيانات بناءً على الأدوار
                </AlertDescription>
              </Alert>

              <Alert className="bg-gray-50">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertTitle>تحديث التبعيات بانتظام</AlertTitle>
                <AlertDescription>
                  الحفاظ على تحديث مكتبات Firebase وجميع التبعيات الأخرى لضمان تطبيق إصلاحات الأمان
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityArchitecture;
