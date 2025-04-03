import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SecurityArchitecture from './SecurityArchitecture';
import { Shield, Lock, Server, FileCode } from 'lucide-react';

const SecurityImplementation = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>المصادقة</span>
            </CardTitle>
            <CardDescription className="text-xs">التحقق من الهوية وإدارة الصلاحيات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>JWT مع الصلاحيات حسب الدور</li>
                <li>المصادقة الثنائية (2FA)</li>
                <li>تأكيد البريد الإلكتروني</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <span>التشفير</span>
            </CardTitle>
            <CardDescription className="text-xs">حماية البيانات الحساسة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>AES-256 للبيانات الشخصية</li>
                <li>TLS 1.3 لطلبات API</li>
                <li>تشفير التخزين المحلي</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileCode className="h-4 w-4 text-primary" />
              <span>المراقبة والتدقيق</span>
            </CardTitle>
            <CardDescription className="text-xs">تتبع وسجل النشاطات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>سجلات النشاط مع وسم IP/الموقع</li>
                <li>كشف الأنشطة المشبوهة</li>
                <li>تنبيهات الأمان في الوقت الفعلي</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="architecture">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="architecture">هيكل الأمان</TabsTrigger>
          <TabsTrigger value="implementation">تنفيذ الحماية</TabsTrigger>
        </TabsList>
        <TabsContent value="architecture">
          <SecurityArchitecture />
        </TabsContent>
        <TabsContent value="implementation">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                تنفيذ طبقات الحماية
              </CardTitle>
              <CardDescription>نظرة عامة على تنفيذ إجراءات الأمان في التطبيق</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">قواعد الأمان في Firestore:</h3>
                  <pre className="text-xs bg-gray-100 p-3 rounded-md overflow-auto">
                    {`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /services/{serviceId} {
      allow read: if true; // للقراءة العامة
      allow write: if request.auth != null; // الكتابة للمستخدمين المسجلين فقط
    }
  }
}`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium mb-2">تنفيذ المصادقة الثنائية:</h3>
                  <pre className="text-xs bg-gray-100 p-3 rounded-md overflow-auto">
                    {`// تنفيذ مصادقة OTP
const setupTwoFactorAuth = async (userId) => {
  // إنشاء سر TOTP للمستخدم
  const secret = authenticator.generateSecret();
  
  // تخزين السر في Firestore
  await firebase.firestore()
    .collection('users')
    .doc(userId)
    .update({
      twoFactorEnabled: true,
      twoFactorSecret: secret
    });
    
  // إنشاء QR code للمستخدم
  const otpAuthUrl = authenticator.keyuri(userId, 'AppName', secret);
  return otpAuthUrl;
};

// التحقق من رمز OTP
const verifyTwoFactorCode = (userSecret, token) => {
  return authenticator.verify({
    token,
    secret: userSecret
  });
};`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium mb-2">تشفير البيانات المحلية:</h3>
                  <pre className="text-xs bg-gray-100 p-3 rounded-md overflow-auto">
                    {`const masterKey = "YOUR_SECRET_KEY"; // استخدم مفتاح آمن

// تشفير البيانات
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), masterKey).toString();
};

// فك تشفير البيانات
const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, masterKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// استخدام في localStorage
const secureLocalStorage = {
  setItem: (key, data) => {
    const encryptedData = encryptData(data);
    localStorage.setItem(key, encryptedData);
  },
  getItem: (key) => {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;
    return decryptData(encryptedData);
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  }
};`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityImplementation;
