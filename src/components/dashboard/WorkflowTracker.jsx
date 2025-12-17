import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WorkflowTracker = ({ currentStep }) => {
  const steps = [
    { name: 'Onboarding Complete' },
    { name: 'Recommendations Reviewed' },
    { name: 'Shortlist Finalized' },
    { name: 'Stakeholder Review' },
    { name: 'Vendor Evaluation' },
    { name: 'Final Decision' },
  ];

  return (
    <Card className="glass-effect border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl text-white">My StackStage Workflow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Dotted Line */}
          <div className="absolute left-5 top-2 h-full border-l-2 border-dashed border-slate-600"></div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;

              return (
                <div key={step.name} className="flex items-center gap-4 relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                    isCompleted ? 'bg-emerald-500 border-emerald-500' :
                    isActive ? 'bg-sky-500 border-sky-500' :
                    'bg-slate-800 border-slate-600'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5 text-white" /> : <Circle className="w-5 h-5 text-slate-400" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${isCompleted ? 'text-slate-400' : 'text-white'}`}>{step.name}</p>
                    {isActive && (
                       <Button size="sm" className="mt-1 h-7 text-xs gradient-button text-white">
                         Continue Here <ArrowRight className="w-3 h-3 ml-1.5"/>
                       </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowTracker;