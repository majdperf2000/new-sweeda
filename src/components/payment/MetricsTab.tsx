import React from 'react';
import { ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.js';

export const MetricsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Key AI Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h4 className="font-medium flex items-center mb-3">
              <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
              Fraud Detection Performance
            </h4>
            <div className="text-sm space-y-2">
              <p className="font-mono bg-white p-2 rounded">precision_score = TP / (TP + FP)</p>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Target</span>
                <span className="font-medium text-green-600">&gt; 98%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Measures the accuracy of fraud detection to minimize false positives
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-medium flex items-center mb-3">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Payment Success Improvement
            </h4>
            <div className="text-sm space-y-2">
              <p className="font-mono bg-white p-2 rounded">
                lift = (success_rate_with_AI - baseline_rate) / baseline_rate
              </p>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Target</span>
                <span className="font-medium text-blue-600">&gt; 25% lift</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Measures the improvement in successful payment transactions compared to non-AI
                baseline
              </p>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h4 className="font-medium flex items-center mb-3">
              <ArrowRight className="h-5 w-5 mr-2 text-purple-600" />
              Currency Savings
            </h4>
            <div className="text-sm space-y-2">
              <p className="font-mono bg-white p-2 rounded">
                savings = manual_conversion_cost - AI_optimized_cost
              </p>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Target</span>
                <span className="font-medium text-purple-600">&gt; 15% reduction</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Measures cost savings through intelligent currency conversion compared to manual
                methods
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
