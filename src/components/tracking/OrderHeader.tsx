import { Button } from '@/components/ui/button';

interface OrderHeaderProps {
  orderId: string;
  orderStatus: string;
  statusText: { en: string; ar: string };
  onTrackAnother: () => void;
  language: 'en' | 'ar';
}

export const OrderHeader = ({
  orderId,
  orderStatus,
  statusText,
  onTrackAnother,
  language,
}: OrderHeaderProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500 text-white';
      case 'in_transit':
        return 'bg-blue-500 text-white';
      case 'processing':
        return 'bg-yellow-500 text-white';
      case 'canceled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">
        {language === 'en' ? 'Order ' : 'الطلبية '}
        {orderId}
      </h2>
      <div className="flex items-center gap-3">
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(orderStatus)}`}
        >
          {statusText[language]}
        </div>
        <Button variant="outline" size="sm" onClick={onTrackAnother}>
          {language === 'en' ? 'Track Another Order' : 'تتبع طلبية أخرى'}
        </Button>
      </div>
    </div>
  );
};
