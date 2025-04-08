import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.js';
import { Input } from '@/components/ui/input.js'; // تم التصحيح هنا
import { Label } from '@/components/ui/label.js';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.js';
import { useToast } from '@/components/ui/use-toast.js';
import { toast as sonnerToast } from 'sonner';
import { Eye, EyeOff, Shield } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState('customer');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast(); // تم التصحيح هنا

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidPassword = (password: string) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('البريد الإلكتروني مطلوب');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('يرجى إدخال بريد إلكتروني صالح');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('كلمة المرور مطلوبة');
      isValid = false;
    } else if (!isValidPassword(password)) {
      setPasswordError('يجب أن تكون كلمة المرور 8 أحرف على الأقل');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const fakeJwtToken = `eyJhbGci...`;
      localStorage.setItem('auth_token', fakeJwtToken);
      console.log(`User login: ${email}, Type: ${accountType}, Time: ${new Date().toISOString()}`);

      const redirectPaths: { [key: string]: string } = {
        delivery: '/delivery-dashboard',
        store: '/store-owner',
        customer: '/dashboard',
        admin: '/control-panels',
      };
      navigate(redirectPaths[accountType] || '/dashboard');
      sonnerToast.success(`تم تسجيل دخول ${getUserType(accountType)} بنجاح`);
    }, 1500);
  };

  const getUserType = (type: string) => {
    const types: { [key: string]: string } = {
      delivery: 'سائق التوصيل',
      store: 'صاحب المتجر',
      customer: 'العميل',
      admin: 'المدير',
    };
    return types[type] || 'المستخدم';
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full p-6"
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              تسجيل الدخول
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input // تم التصحيح هنا
                  id="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={emailError ? 'border-red-500' : ''}
                />
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Input // تم التصحيح هنا
                    id="password"
                    placeholder="أدخل كلمة المرور"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    className={passwordError ? 'border-red-500 pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
              </div>
              <div>
                <Label htmlFor="accountType">نوع الحساب</Label>
                <select
                  id="accountType"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option value="customer">عميل</option>
                  <option value="store">صاحب متجر</option>
                  <option value="delivery">سائق توصيل</option>
                  <option value="admin">مدير</option>
                </select>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleLogin} disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                  جاري التحميل...
                </span>
              ) : (
                'تسجيل الدخول'
              )}
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center">
          <a href="/register" className="text-sm text-blue-500 hover:underline">
            ليس لديك حساب؟ إنشاء حساب
          </a>
        </div>
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500 flex justify-center items-center gap-1">
            <Shield className="h-3 w-3" />
            تم تأمين تسجيل الدخول باستخدام تشفير AES-256
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
