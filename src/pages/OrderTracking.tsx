import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout.js';
import PageTransition from '@/components/animations/page-transition.js';
import { Card } from '@/components/ui/card.js';
import { OrderSearch } from '@/components/tracking/OrderSearch.js';
import { OrderHeader } from '@/components/tracking/OrderHeader.js';
import { OrderTabs } from '@/components/tracking/OrderTabs.js';
import { OrderItems } from '@/components/tracking/OrderItems.js';
import type { OrderData } from '@/components/tracking/types.js';
import type { PaymentFlow } from '@/components/payment/types.js';

const OrderTracking = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [orderFound, setOrderFound] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const handleOrderFound = (data: OrderData) => {
    setOrderData(data);
    setOrderFound(true);
    setIsTracking(true);
  };

  const handleTrackAnother = () => {
    setIsTracking(false);
    setOrderFound(false);
    setOrderData(null);
  };

  const paymentFlowData: PaymentFlow = {
    nodes: [
      {
        id: 'payment-request',
        label: language === 'en' ? 'Payment Request' : 'طلب الدفع',
        status: 'completed',
        description:
          language === 'en'
            ? 'Payment request received from customer'
            : 'تم استلام طلب الدفع من العميل',
      },
      {
        id: 'fraud-detection',
        label: language === 'en' ? 'Fraud Analysis' : 'تحليل الاحتيال',
        status: 'completed',
        description:
          language === 'en'
            ? 'AI-powered fraud detection system verified transaction'
            : 'نظام كشف الاحتيال بالذكاء الاصطناعي تحقق من المعاملة',
      },
      {
        id: 'payment-processing',
        label: language === 'en' ? 'Payment Processing' : 'معالجة الدفع',
        status: 'completed',
        description:
          language === 'en'
            ? 'Transaction processed through payment gateway'
            : 'تمت معالجة المعاملة من خلال بوابة الدفع',
      },
      {
        id: 'order-confirmation',
        label: language === 'en' ? 'Order Confirmation' : 'تأكيد الطلب',
        status: 'completed',
        description:
          language === 'en' ? 'Payment confirmed and order created' : 'تم تأكيد الدفع وإنشاء الطلب',
      },
    ],
    currentNodeId: 'order-confirmation',
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-3xl font-bold text-center mb-8">
                {language === 'en' ? 'Track Your Order' : 'تتبع طلبيتك'}
              </h1>

              {!isTracking ? (
                <OrderSearch onOrderFound={handleOrderFound} language={language} />
              ) : (
                orderData && (
                  <div className="space-y-6">
                    <OrderHeader
                      orderId={orderData.id}
                      orderStatus={orderData.status}
                      statusText={orderData.statusText}
                      onTrackAnother={handleTrackAnother}
                      language={language}
                    />

                    <Card>
                      <div className="p-6">
                        <OrderTabs
                          orderData={orderData}
                          paymentFlowData={paymentFlowData}
                          language={language}
                        />
                      </div>
                    </Card>

                    <OrderItems
                      items={orderData.items}
                      customerAddress={orderData.customer.address}
                      language={language}
                    />
                  </div>
                )
              )}
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default OrderTracking;
