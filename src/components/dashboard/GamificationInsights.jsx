import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Target, Lightbulb } from 'lucide-react';

const GamificationInsights = () => {
  const badges = [
    { name: 'Stack Explorer', icon: <Award className="w-6 h-6 text-yellow-400" /> },
    { name: 'Optimization Guru', icon: <Target className="w-6 h-6 text-sky-400" /> },
  ];

  return (
    <Card className="glass-effect border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl text-white">Trophies & Tips</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Badges */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">My Badges</h3>
          <div className="grid grid-cols-2 gap-3">
            {badges.map(badge => (
              <div key={badge.name} className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg text-center">
                {badge.icon}
                <p className="text-sm text-slate-300 mt-1">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Milestones - can be expanded later */}
        
        {/* AI Tips */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Insights</h3>
          <div className="p-4 bg-sky-500/10 border border-sky-500/30 rounded-lg space-y-2">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-sky-300 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-sky-200">
                The "Collaboration" category has high overlap. Consider consolidating Notion and Asana to save costs.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GamificationInsights;