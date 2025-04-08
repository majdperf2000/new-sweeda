// use-auth.tsx
import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  user: User | null;
  csrfToken: string;
  login: (email: string, password: string, captcha?: string) => Promise<void>;
  logout: (reason?: string) => void;
  verifyMfa: (token: string, method: MfaMethod) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
};

type User = { id: string; email: string; mfaEnabled: boolean };
type MfaMethod = 'email' | 'sms' | 'authenticator';
type RegisterData = { email: string; password: string };

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [requestQueue, setRequestQueue] = useState<number[]>([]);
  const navigate = useNavigate();

  // CSRF Protection
  const renewCsrfToken = async () => {
    try {
      const { data } = await axios.get('/api/auth/csrf-token');
      axios.defaults.headers.common['X-CSRF-TOKEN'] = data.csrfToken;
      setCsrfToken(data.csrfToken);
    } catch (err) {
      console.error('CSRF renewal failed:', err);
      logSecurityEvent('csrf-renewal-failed', { error: err });
    }
  };

  useEffect(() => {
    renewCsrfToken();
    const interval = setInterval(renewCsrfToken, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Brute Force Protection
  const handleBruteForceProtection = () => {
    const delay = Math.min(failedAttempts * 2000, 10000);
    setTimeout(() => {
      setFailedAttempts(prev => prev + 1);
    }, delay);
  };

  // Login with HttpOnly Cookies
  const login = async (email: string, password: string, captcha?: string) => {
    try {
      if (failedAttempts >= 3 && !captcha) {
        throw new Error('CAPTCHA required');
      }

      const response = await axios.post(
        '/api/auth/login',
        { email, password, captcha },
        { withCredentials: true }
      );

      setUser(response.data.user);
      setFailedAttempts(0);
      logSecurityEvent('login-success', { method: 'password' });
    } catch (err) {
      handleLoginError(err);
      handleBruteForceProtection();
      logSecurityEvent('login-failed', { error: error.message });
      throw err;
    }
  };

  // MFA Verification
  const verifyMfa = async (token: string, method: MfaMethod) => {
    try {
      const { data } = await axios.post('/api/auth/mfa/verify', {
        token,
        method,
        deviceInfo: navigator.userAgent
      });
      
      setUser(data.user);
      logSecurityEvent('mfa-success', { method });
    } catch (err) {
      setFailedAttempts(prev => prev + 1);
      logSecurityEvent('mfa-failed', { method });
      throw err;
    }
  };

  // Secure Logout
  const logout = (reason: string = 'user-initiated') => {
    axios.post('/api/auth/logout', { reason });
    localStorage.clear();
    setUser(null);
    navigate('/login', {
      state: {
        referrer: window.location.pathname,
        isSecureRedirect: true
      },
      replace: true
    });
  };

  // Password Policy Validation
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return regex.test(password);
  };

  // Registration
  const register = async (userData: RegisterData) => {
    if (!validatePassword(userData.password)) {
      throw new Error('Password must contain 12+ chars, uppercase, number, and special char');
    }

    await axios.post('/api/auth/register', userData);
    logSecurityEvent('registration-success', { email: userData.email });
  };

  // Security Event Logging
  const logSecurityEvent = (eventType: string, metadata: object) => {
    axios.post('/api/security/logs', {
      eventType,
      userId: user?.id,
      metadata
    });
  };

  // Security Checks
  useEffect(() => {
    const checkSecurityCompliance = async () => {
      try {
        const [audit, updates] = await Promise.all([
          axios.get('/api/security/audit'),
          axios.get('/api/security/updates')
        ]);

        if (audit.data.criticalIssues > 0) {
          logSecurityEvent('critical-vulnerability-detected', audit.data);
        }

        if (updates.data.availableUpdates) {
          logSecurityEvent('security-updates-available', updates.data);
        }
      } catch (err) {
        console.error('Security compliance check failed:', err);
      }
    };

    checkSecurityCompliance();
  }, []);

  // Rate Limiting Interceptor
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 429) {
          const retryAfter = error.response.headers['retry-after'] || 5;
          return new Promise(resolve => {
            setTimeout(() => resolve(axios(error.config)), retryAfter * 1000);
          });
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  return (
    <AuthContext.Provider value={{ user, csrfToken, login, logout, verifyMfa, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Helper functions
const handleLoginError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    const message = err.response?.data?.error || 'Login failed';
    throw new Error(message);
  }
  throw new Error('Unknown error occurred');
};

export const useAuth = () => useContext(AuthContext);