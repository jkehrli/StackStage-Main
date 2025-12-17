
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const stages = ["Ad Hoc", "Aligned", "Optimized", "Scalable"];
const currentStageIndex = 1; // "Aligned"

const MaturityProgress = () => (
  <Card className="glass-effect border-slate-700">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl text-white">
        <Zap className="w-6 h-6 text-sky-400" />
        Your Stack Maturity
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="relative mb-4">
        <div className="flex h-2 overflow-hidden rounded-full bg-slate-700">
          {stages.map((_, index) => (
            <div key={index} style={{ width: '25%' }} className={`
              ${index < currentStageIndex ? 'bg-sky-400' : ''}
              ${index === currentStageIndex ? 'bg-gradient-to-r from-sky-400 to-cyan-400' : ''}
            `}></div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-2">
            {stages.map(stage => <span key={stage}>{stage}</span>)}
        </div>
      </div>
      <div className="text-center bg-slate-800/50 p-3 rounded-lg">
          <p className="font-bold text-white">You're at Stage 2 – Mid-Term Optimization.</p>
          <p className="text-sm text-slate-300">Focus: Consolidation & Alignment</p>
      </div>
      <Link to={createPageUrl("DeepStackPlan")}>
        <Button className="w-full mt-4 gradient-button text-white">
          View Deep Stack Plan
        </Button>
      </Link>
    </CardContent>
  </Card>
);

export default MaturityProgress;
