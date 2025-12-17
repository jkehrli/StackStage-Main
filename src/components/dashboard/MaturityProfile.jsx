import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Check } from 'lucide-react';
import { Label } from '@/components/ui/label';

const MaturityProfileCard = ({ profile }) => (
  <Card className="glass-effect border-slate-700 h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl">
        <Briefcase className="w-6 h-6 text-sky-400" />
        Maturity Profile
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label>Organizational Maturity</Label>
        <div className="relative pt-2">
          <div className="flex h-2 overflow-hidden rounded-full bg-slate-700">
            <div style={{ width: '66%'}} className="flex flex-col justify-center bg-gradient-to-r from-yellow-500 to-orange-500"></div>
          </div>
        </div>
      </div>
      <div>
        <Label>Tech Stack Complexity</Label>
        <div className="relative pt-2">
          <div className="flex h-2 overflow-hidden rounded-full bg-slate-700">
            <div style={{ width: '50%'}} className="flex flex-col justify-center bg-gradient-to-r from-sky-500 to-cyan-500"></div>
          </div>
        </div>
      </div>
      <div>
        <Label>Detected Business Goals</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {profile.detectedGoals.map(goal => (
            <div key={goal} className="flex items-center gap-2 text-sm bg-slate-700/50 px-3 py-1 rounded-full">
              <Check className="w-4 h-4 text-emerald-400" /> {goal}
            </div>
          ))}
        </div>
      </div>
       <div>
        <Label>Recommended Next Actions</Label>
        <div className="space-y-2 mt-2">
          {profile.nextActions.map(action => (
            <Button key={action} variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:text-white">
              {action}
            </Button>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default MaturityProfileCard;