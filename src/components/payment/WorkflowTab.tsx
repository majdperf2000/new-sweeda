import React from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, CircleCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const WorkflowTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">AI Workflow Stages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-medium">1</span>
              </div>
              <div className="ml-4">
                <h4 className="font-medium mb-1">New Transaction</h4>
                <p className="text-sm text-muted-foreground">
                  Payment request is received from customer
                </p>
              </div>
            </div>
          </div>

          <div className="ml-5 h-6 border-l border-dashed border-muted-foreground"></div>

          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-medium">2</span>
              </div>
              <div className="ml-4">
                <h4 className="font-medium mb-1">Preprocessing (Feature Extraction)</h4>
                <p className="text-sm text-muted-foreground">
                  Transaction data is normalized and features are extracted for AI models
                </p>
              </div>
            </div>
          </div>

          <div className="ml-5 h-6 border-l border-dashed border-muted-foreground"></div>

          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-medium">3</span>
              </div>
              <div className="ml-4">
                <h4 className="font-medium mb-1">Parallel AI Analysis</h4>
                <div className="grid md:grid-cols-3 gap-3 mt-3">
                  <div className="p-3 bg-blue-50 rounded border border-blue-100">
                    <div className="flex items-center mb-2">
                      <ShieldCheck className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm font-medium">Fraud Score Calculation</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Determines likelihood of fraudulent activity
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded border border-green-100">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm font-medium">Success Probability Prediction</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Calculates likelihood of successful transaction
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded border border-purple-100">
                    <div className="flex items-center mb-2">
                      <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="text-sm font-medium">Optimal Currency Path</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Determines best conversion rates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-5 h-6 border-l border-dashed border-muted-foreground"></div>

          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-medium">4</span>
              </div>
              <div className="ml-4">
                <h4 className="font-medium mb-1">Real-Time Decisions</h4>
                <div className="grid md:grid-cols-3 gap-3 mt-3">
                  <div className="p-3 bg-amber-50 rounded border border-amber-100">
                    <div className="flex items-center mb-2">
                      <CircleCheck className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm font-medium">Approve/Block Transaction</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Based on fraud detection results
                    </p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded border border-amber-100">
                    <div className="flex items-center mb-2">
                      <CircleCheck className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm font-medium">Alternative Payment Methods</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Suggestions based on success probability
                    </p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded border border-amber-100">
                    <div className="flex items-center mb-2">
                      <CircleCheck className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm font-medium">Apply Dynamic Pricing</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Based on currency optimization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
