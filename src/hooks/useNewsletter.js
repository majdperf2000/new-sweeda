// hooks/useNewsletter.js
import { useState } from 'react';
import { toast } from 'sonner';

export const useNewsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // هنا يمكنك إضافة منطق إرسال البريد الإلكتروني إلى الخادم
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      setEmail('');
      toast.success('Subscribed successfully!');
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { email, setEmail, handleSubmit, isLoading, isSuccess };
};
