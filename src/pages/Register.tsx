import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PageTransition } from '@/components/ui/page-transition';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FileUpload } from '@/components/auth/FileUpload';
import { toast } from 'sonner';
import { User, Store, Truck, ShieldCheck, LayoutDashboard } from 'lucide-react';

const Register = () => {
  const [userType, setUserType] = useState<'customer' | 'store' | 'delivery' | 'admin' | 'owner'>(
    'customer'
  );
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('ar');
  const [otp, setOtp] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const verifyDocuments = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(step + 1);
      toast({
        title: language === 'en' ? 'Documents verified' : 'تم التحقق من المستندات',
        description:
          language === 'en'
            ? 'Your documents have been verified successfully'
            : 'تم التحقق من مستنداتك بنجاح',
      });
    }, 2000);
  };

  const verifyOTP = () => {
    if (otp.length === 6) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(step + 1);
        toast({
          title: language === 'en' ? 'OTP verified' : 'تم التحقق من الرمز',
          description:
            language === 'en' ? 'Your phone number has been verified' : 'تم التحقق من رقم هاتفك',
        });
      }, 1500);
    } else {
      toast({
        variant: 'destructive',
        title: language === 'en' ? 'Invalid OTP' : 'رمز غير صالح',
        description:
          language === 'en'
            ? 'Please enter a valid 6-digit OTP'
            : 'الرجاء إدخال رمز صالح مكون من 6 أرقام',
      });
    }
  };

  const completeRegistration = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: language === 'en' ? 'Registration complete' : 'اكتمل التسجيل',
        description:
          language === 'en' ? 'Your account has been created successfully' : 'تم إنشاء حسابك بنجاح',
      });

      switch (userType) {
        case 'customer':
          navigate('/dashboard');
          break;
        case 'store':
          navigate('/control-panels#3');
          break;
        case 'delivery':
          navigate('/control-panels#4');
          break;
        case 'admin':
          navigate('/control-panels#2');
          break;
        case 'owner':
          navigate('/control-panels#1');
          break;
        default:
          navigate('/dashboard');
      }
    }, 1500);
  };

  const renderCustomerRegistration = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{language === 'en' ? 'Email' : 'البريد الإلكتروني'}</Label>
              <Input
                id="email"
                type="email"
                placeholder={language === 'en' ? 'your@email.com' : 'بريدك@الإلكتروني.كوم'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                {language === 'en' ? 'Phone Number (Optional)' : 'رقم الهاتف (اختياري)'}
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder={language === 'en' ? '+963 XXX XXX XXX' : '963+ XXX XXX XXX'}
              />
            </div>
            <Button onClick={() => setStep(2)} className="w-full mt-2" disabled={isLoading}>
              {language === 'en' ? 'Continue' : 'متابعة'}
            </Button>

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  {language === 'en' ? 'Or continue with' : 'أو تابع باستخدام'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button variant="outline" type="button">
                Google
              </Button>
              <Button variant="outline" type="button">
                Apple
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'Verify Your Identity' : 'تحقق من هويتك'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? "We've sent a verification code to your email/phone"
                  : 'لقد أرسلنا رمز التحقق إلى بريدك الإلكتروني/هاتفك'}
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button onClick={verifyOTP} className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {language === 'en' ? 'Verifying...' : 'جارٍ التحقق...'}
                </span>
              ) : language === 'en' ? (
                'Verify OTP'
              ) : (
                'تحقق من الرمز'
              )}
            </Button>

            <div className="text-center mt-4">
              <Button variant="link" size="sm">
                {language === 'en' ? 'Resend Code' : 'إعادة إرسال الرمز'}
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'Set Your Password' : 'تعيين كلمة المرور'}
              </h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{language === 'en' ? 'Password' : 'كلمة المرور'}</Label>
              <Input id="password" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {language === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور'}
              </Label>
              <Input id="confirmPassword" type="password" />
            </div>

            <Button onClick={completeRegistration} className="w-full mt-4" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {language === 'en' ? 'Creating Account...' : 'جارٍ إنشاء الحساب...'}
                </span>
              ) : language === 'en' ? (
                'Complete Registration'
              ) : (
                'إكمال التسجيل'
              )}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderStoreRegistration = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">{language === 'en' ? 'Store Name' : 'اسم المتجر'}</Label>
              <Input
                id="storeName"
                placeholder={language === 'en' ? 'Your Store Name' : 'اسم متجرك'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeEmail">
                {language === 'en' ? 'Business Email' : 'البريد الإلكتروني للعمل'}
              </Label>
              <Input
                id="storeEmail"
                type="email"
                placeholder={language === 'en' ? 'store@example.com' : 'متجر@مثال.كوم'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storePhone">
                {language === 'en' ? 'Business Phone' : 'هاتف العمل'}
              </Label>
              <Input
                id="storePhone"
                type="tel"
                placeholder={language === 'en' ? '+963 XXX XXX XXX' : '963+ XXX XXX XXX'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeAddress">
                {language === 'en' ? 'Store Address' : 'عنوان المتجر'}
              </Label>
              <Input
                id="storeAddress"
                placeholder={language === 'en' ? 'Full address' : 'العنوان الكامل'}
              />
            </div>

            <Button onClick={() => setStep(2)} className="w-full mt-2" disabled={isLoading}>
              {language === 'en' ? 'Continue' : 'متابعة'}
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'Upload Documents' : 'تحميل المستندات'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? 'Please upload the required documents for verification'
                  : 'يرجى تحميل المستندات المطلوبة للتحقق'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">
                  {language === 'en' ? 'Business License' : 'رخصة العمل'}
                </Label>
                <FileUpload accept=".pdf,.jpg,.jpeg,.png" />
              </div>

              <div>
                <Label className="mb-2 block">
                  {language === 'en' ? 'ID Document' : 'وثيقة الهوية'}
                </Label>
                <FileUpload accept=".pdf,.jpg,.jpeg,.png" />
              </div>

              <div>
                <Label className="mb-2 block">
                  {language === 'en' ? 'Additional Documents (Optional)' : 'وثائق إضافية (اختياري)'}
                </Label>
                <FileUpload accept=".pdf,.jpg,.jpeg,.png" />
              </div>
            </div>

            <Button onClick={verifyDocuments} className="w-full mt-4" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {language === 'en' ? 'Verifying...' : 'جارٍ التحقق...'}
                </span>
              ) : language === 'en' ? (
                'Submit for Verification'
              ) : (
                'تقديم للتحقق'
              )}
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'Set Store Account Password' : 'تعيين كلمة مرور حساب المتجر'}
              </h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="storePassword">
                {language === 'en' ? 'Password' : 'كلمة المرور'}
              </Label>
              <Input id="storePassword" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeConfirmPassword">
                {language === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور'}
              </Label>
              <Input id="storeConfirmPassword" type="password" />
            </div>

            <Button onClick={completeRegistration} className="w-full mt-4" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {language === 'en' ? 'Activating Store...' : 'جارٍ تفعيل المتجر...'}
                </span>
              ) : language === 'en' ? (
                'Activate Store Account'
              ) : (
                'تفعيل حساب المتجر'
              )}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderDeliveryRegistration = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deliveryName">
                {language === 'en' ? 'Full Name' : 'الاسم الكامل'}
              </Label>
              <Input
                id="deliveryName"
                placeholder={language === 'en' ? 'Your Full Name' : 'اسمك الكامل'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryEmail">
                {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
              </Label>
              <Input
                id="deliveryEmail"
                type="email"
                placeholder={language === 'en' ? 'your@email.com' : 'بريدك@الإلكتروني.كوم'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryPhone">
                {language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
              </Label>
              <Input
                id="deliveryPhone"
                type="tel"
                placeholder={language === 'en' ? '+963 XXX XXX XXX' : '963+ XXX XXX XXX'}
              />
            </div>

            <div className="space-y-2">
              <Label>{language === 'en' ? 'Vehicle Type' : 'نوع المركبة'}</Label>
              <RadioGroup defaultValue="motorcycle">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="motorcycle" id="motorcycle" />
                  <Label htmlFor="motorcycle">
                    {language === 'en' ? 'Motorcycle' : 'دراجة نارية'}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="car" id="car" />
                  <Label htmlFor="car">{language === 'en' ? 'Car' : 'سيارة'}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bicycle" id="bicycle" />
                  <Label htmlFor="bicycle">{language === 'en' ? 'Bicycle' : 'دراجة هوائية'}</Label>
                </div>
              </RadioGroup>
            </div>

            <Button onClick={() => setStep(2)} className="w-full mt-2" disabled={isLoading}>
              {language === 'en' ? 'Continue' : 'متابعة'}
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'Upload Documents' : 'تحميل المستندات'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? 'Please upload your license and ID for verification'
                  : 'يرجى تحميل الرخصة والهوية للتحقق'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">
                  {language === 'en' ? "Driver's License" : 'رخصة القيادة'}
                </Label>
                <FileUpload accept=".pdf,.jpg,.jpeg,.png" />
              </div>

              <div>
                <Label className="mb-2 block">
                  {language === 'en' ? 'ID Document' : 'وثيقة الهوية'}
                </Label>
                <FileUpload accept=".pdf,.jpg,.jpeg,.png" />
              </div>

              <div>
                <Label className="mb-2 block">
                  {language === 'en' ? 'Vehicle Registration' : 'تسجيل المركبة'}
                </Label>
                <FileUpload accept=".pdf,.jpg,.jpeg,.png" />
              </div>
            </div>

            <Button onClick={verifyDocuments} className="w-full mt-4" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {language === 'en' ? 'Verifying...' : 'جارٍ التحقق...'}
                </span>
              ) : language === 'en' ? (
                'Submit for Verification'
              ) : (
                'تقديم للتحقق'
              )}
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'Competency Test' : 'اختبار الكفاءة'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? 'Complete this short test to demonstrate your knowledge'
                  : 'أكمل هذا الاختبار القصير لإظهار معرفتك'}
              </p>
            </div>

            <div className="space-y-4 border rounded-md p-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {language === 'en'
                    ? '1. What should you do if a customer is not available at delivery location?'
                    : '1. ماذا يجب أن تفعل إذا لم يكن العميل متواجدًا في موقع التسليم؟'}
                </p>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? 'Select option' : 'اختر إجابة'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wait">
                      {language === 'en'
                        ? 'Wait for 15 minutes then call'
                        : 'انتظر 15 دقيقة ثم اتصل'}
                    </SelectItem>
                    <SelectItem value="leave">
                      {language === 'en' ? 'Leave the package at the door' : 'اترك الطرد عند الباب'}
                    </SelectItem>
                    <SelectItem value="return">
                      {language === 'en'
                        ? 'Return to the store immediately'
                        : 'عد إلى المتجر فورًا'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {language === 'en'
                    ? '2. How would you handle a damaged package?'
                    : '2. كيف تتعامل مع طرد تالف؟'}
                </p>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? 'Select option' : 'اختر إجابة'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">
                      {language === 'en' ? 'Document and notify supervisor' : 'وثق وأبلغ المشرف'}
                    </SelectItem>
                    <SelectItem value="deliver">
                      {language === 'en' ? 'Deliver anyway' : 'قم بالتسليم على أي حال'}
                    </SelectItem>
                    <SelectItem value="hide">
                      {language === 'en' ? 'Hide the damage from customer' : 'أخف التلف عن العميل'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={completeRegistration} className="w-full mt-4" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {language === 'en' ? 'Submitting...' : 'جارٍ التقديم...'}
                </span>
              ) : language === 'en' ? (
                'Complete Test & Register'
              ) : (
                'إكمال الاختبار والتسجيل'
              )}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderAdminRegistration = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminName">{language === 'en' ? 'Full Name' : 'الاسم الكامل'}</Label>
              <Input
                id="adminName"
                placeholder={language === 'en' ? 'Admin Full Name' : 'اسم المدير الكامل'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail">
                {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
              </Label>
              <Input
                id="adminEmail"
                type="email"
                placeholder={language === 'en' ? 'admin@example.com' : 'مدير@مثال.كوم'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminPhone">
                {language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
              </Label>
              <Input
                id="adminPhone"
                type="tel"
                placeholder={language === 'en' ? '+963 XXX XXX XXX' : '963+ XXX XXX XXX'}
              />
            </div>

            <div className="space-y-2">
              <Label>{language === 'en' ? 'Admin Level' : 'مستوى الإدارة'}</Label>
              <Select defaultValue="system">
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Select level' : 'اختر المستوى'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">
                    {language === 'en' ? 'System Admin' : 'مدير النظام'}
                  </SelectItem>
                  <SelectItem value="content">
                    {language === 'en' ? 'Content Admin' : 'مدير المحتوى'}
                  </SelectItem>
                  <SelectItem value="support">
                    {language === 'en' ? 'Support Admin' : 'مدير الدعم'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={() => setStep(2)} className="w-full mt-2" disabled={isLoading}>
              {language === 'en' ? 'Continue' : 'متابعة'}
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'Verification' : 'التحقق'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? 'Please upload identification documents'
                  : 'يرجى تحميل وثائق التعريف'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">
                  {language === 'en' ? 'ID Document' : 'وثيقة الهوية'}
                </Label>
                <FileUpload accept=".pdf,.jpg,.jpeg,.png" />
              </div>

              <div>
                <Label className="mb-2 block">
                  {language === 'en' ? 'Employment Certificate' : 'شهادة العمل'}
                </Label>
                <FileUpload accept=".pdf,.jpg,.jpeg,.png" />
              </div>
            </div>

            <Button onClick={verifyDocuments} className="w-full mt-4" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {language === 'en' ? 'Verifying...' : 'جارٍ التحقق...'}
                </span>
              ) : language === 'en' ? (
                'Submit for Verification'
              ) : (
                'تقديم للتحقق'
              )}
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'Set Admin Password' : 'تعيين كلمة مرور المدير'}
              </h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminPassword">
                {language === 'en' ? 'Password' : 'كلمة المرور'}
              </Label>
              <Input id="adminPassword" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminConfirmPassword">
                {language === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور'}
              </Label>
              <Input id="adminConfirmPassword" type="password" />
            </div>

            <Button onClick={completeRegistration} className="w-full mt-4" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {language === 'en' ? 'Creating Admin Account...' : 'جارٍ إنشاء حساب المدير...'}
                </span>
              ) : language === 'en' ? (
                'Activate Admin Account'
              ) : (
                'تفعيل حساب المدير'
              )}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderOwnerRegistration = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ownerName">{language === 'en' ? 'Full Name' : 'الاسم الكامل'}</Label>
              <Input
                id="ownerName"
                placeholder={language === 'en' ? 'Owner Full Name' : 'اسم المالك الكامل'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerEmail">
                {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
              </Label>
              <Input
                id="ownerEmail"
                type="email"
                placeholder={language === 'en' ? 'owner@example.com' : 'مالك@مثال.كوم'}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerPhone">
                {language === 'en' ? 'Phone Number' : 'رقم الهاتف'}
              </Label>
              <Input
                id="ownerPhone"
                type="tel"
                placeholder={language === 'en' ? '+963 XXX XXX XXX' : '963+ XXX XXX XXX'}
              />
            </div>

            <div className="space-y-2">
              <Label>{language === 'en' ? 'Ownership Documents' : 'وثائق الملكية'}</Label>
              <FileUpload accept=".pdf,.jpg,.jpeg,.png" />
            </div>

            <Button onClick={() => setStep(2)} className="w-full mt-2" disabled={isLoading}>
              {language === 'en' ? 'Continue' : 'متابعة'}
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'Security Verification' : 'التحقق الأمني'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? 'For maximum security, please set up two-factor authentication'
                  : 'لأقصى درجات الأمان، يرجى إعداد المصادقة الثنائية'}
              </p>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'Enter Security Code' : 'أدخل رمز الأمان'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? "We've sent a verification code to your email/phone"
                  : 'لقد أرسلنا رمز التحقق إلى بريدك الإلكتروني/هاتفك'}
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button onClick={verifyOTP} className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {language === 'en' ? 'Verifying...' : 'جارٍ التحقق...'}
                </span>
              ) : language === 'en' ? (
                'Verify Code'
              ) : (
                'تحقق من الرمز'
              )}
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'Set Owner Password' : 'تعيين كلمة مرور المالك'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? 'Create a strong password for your owner account'
                  : 'أنشئ كلمة مرور قوية لحساب المالك الخاص بك'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerPassword">
                {language === 'en' ? 'Password' : 'كلمة المرور'}
              </Label>
              <Input id="ownerPassword" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerConfirmPassword">
                {language === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور'}
              </Label>
              <Input id="ownerConfirmPassword" type="password" />
            </div>

            <Button onClick={completeRegistration} className="w-full mt-4" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {language === 'en' ? 'Activating Owner Account...' : 'جارٍ تفعيل حساب المالك...'}
                </span>
              ) : language === 'en' ? (
                'Activate Owner Account'
              ) : (
                'تفعيل حساب المالك'
              )}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Card className="glass-card">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">
                    {language === 'en' ? 'Register' : 'تسجيل حساب جديد'}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {step === 1 && (
                    <div className="mb-6">
                      <Label className="mb-2 block">{language === 'en' ? 'I am a' : 'أنا'}</Label>
                      <RadioGroup
                        value={userType}
                        onValueChange={(value) =>
                          setUserType(
                            value as 'customer' | 'store' | 'delivery' | 'admin' | 'owner'
                          )
                        }
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="customer" id="customer" />
                          <Label htmlFor="customer" className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {language === 'en' ? 'Customer' : 'عميل'}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="store" id="store" />
                          <Label htmlFor="store" className="flex items-center gap-1">
                            <Store className="h-4 w-4" />
                            {language === 'en' ? 'Store' : 'متجر'}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="delivery" id="delivery" />
                          <Label htmlFor="delivery" className="flex items-center gap-1">
                            <Truck className="h-4 w-4" />
                            {language === 'en' ? 'Delivery Person' : 'موصل طلبات'}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="admin" id="admin" />
                          <Label htmlFor="admin" className="flex items-center gap-1">
                            <LayoutDashboard className="h-4 w-4" />
                            {language === 'en' ? 'Admin' : 'مدير'}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="owner" id="owner" />
                          <Label htmlFor="owner" className="flex items-center gap-1">
                            <ShieldCheck className="h-4 w-4" />
                            {language === 'en' ? 'Owner' : 'مالك'}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {userType === 'customer' && renderCustomerRegistration()}
                  {userType === 'store' && renderStoreRegistration()}
                  {userType === 'delivery' && renderDeliveryRegistration()}
                  {userType === 'admin' && renderAdminRegistration()}
                  {userType === 'owner' && renderOwnerRegistration()}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Register;
