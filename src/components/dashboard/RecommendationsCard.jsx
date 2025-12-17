import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ArrowRight } from 'lucide-react';

const RecommendationsCard = ({ recommendations }) => (
  <Card className="glass-effect border-slate-700 h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl">
        <Lightbulb className="w-6 h-6 text-yellow-400" />
        Technology Recommendations
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {recommendations.map(rec => (
        <Card key={rec.toolName} className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-white">{rec.toolName}</p>
              <p className="text-sm text-slate-400">{rec.plan} Plan</p>
            </div>
            <div className="text-right">
                <div className="text-2xl font-bold gradient-text">{rec.matchPercentage}%</div>
                <p className="text-sm text-slate-400">Match</p>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button className="w-full gradient-button text-white">View Deep Stack Plan <ArrowRight className="w-4 h-4 ml-2" /></Button>
    </CardContent>
  </Card>
);

export default RecommendationsCard;