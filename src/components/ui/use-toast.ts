// إنشاء ملف use-toast.ts إذا كان مفقودًا
import { toast } from 'sonner';

export const useToast = () => {
  return {
    toast: (message: string, options?: any) => toast(message, options),
  };
};
