import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.js';
import type { PaymentSystemArchitectureProps } from './types.js';
import { ProcessFlowTab } from './ProcessFlowTab.js';
import { WorkflowTab } from './WorkflowTab.js';
import { MetricsTab } from './MetricsTab.js';

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
