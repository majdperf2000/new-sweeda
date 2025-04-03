import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { PaymentSystemArchitectureProps } from './types';
import { ProcessFlowTab } from './ProcessFlowTab';
import { WorkflowTab } from './WorkflowTab';
import { MetricsTab } from './MetricsTab';

const PaymentSystemArchitecture: React.FC<PaymentSystemArchitectureProps> = ({ paymentFlow }) => {
  return (
    <div className="w-full p-6 glass-card">
      <Tabs defaultValue="flow">
        <TabsList className="mb-4">
          <TabsTrigger value="flow">Process Flow</TabsTrigger>
          <TabsTrigger value="workflow">AI Workflow</TabsTrigger>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="flow">
          <ProcessFlowTab paymentFlow={paymentFlow} />
        </TabsContent>

        <TabsContent value="workflow">
          <WorkflowTab />
        </TabsContent>

        <TabsContent value="metrics">
          <MetricsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentSystemArchitecture;
