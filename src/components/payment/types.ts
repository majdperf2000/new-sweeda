export interface PaymentNode {
  id: string;
  label: string;
  status: 'processing' | 'completed' | 'pending' | 'failed';
  description: string;
}

export interface PaymentFlow {
  nodes: PaymentNode[];
  currentNodeId: string;
}

export interface PaymentSystemArchitectureProps {
  paymentFlow: PaymentFlow;
}
