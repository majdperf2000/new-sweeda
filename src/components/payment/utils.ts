export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return 'CheckCircle';
    case 'processing':
      return 'Clock';
    case 'failed':
      return 'AlertCircle';
    case 'pending':
      return 'Clock';
    default:
      return null;
  }
};

export const getStatusIconClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-green-500';
    case 'processing':
      return 'text-blue-500 animate-pulse';
    case 'failed':
      return 'text-red-500';
    case 'pending':
      return 'text-amber-500';
    default:
      return '';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 border-green-200';
    case 'processing':
      return 'bg-blue-100 border-blue-200';
    case 'failed':
      return 'bg-red-100 border-red-200';
    case 'pending':
      return 'bg-amber-100 border-amber-200';
    default:
      return 'bg-gray-100 border-gray-200';
  }
};
