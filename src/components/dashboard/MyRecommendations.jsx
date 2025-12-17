import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';

const MyRecommendations = ({ recommendations, onViewDetails }) => {
  const categoryColors = {
    'Marketing Automation': 'bg-purple-500/20 text-purple-300',
    'Customer Support': 'bg-emerald-500/20 text-emerald-300', 
    'Collaboration': 'bg-sky-500/20 text-sky-300',
  };

  return (
    <Card className="glass-effect border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl text-white">My Saved Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map(rec => (
            <div key={rec.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center gap-3 col-span-2">
                <img src={rec.logo} alt={rec.toolName} className="w-10 h-10 rounded-lg bg-white p-1" />
                <div>
                  <p className="font-semibold text-white">{rec.toolName}</p>
                  <Badge className={`${categoryColors[rec.category] || 'bg-slate-600 text-slate-300'}`}>{rec.category}</Badge>
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-sky-400">{rec.matchScore}%</p>
                <p className="text-xs text-slate-400">Match</p>
              </div>
              <div className="flex items-center justify-center">
                {rec.status === 'Reviewed' ? (
                  <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 bg-emerald-500/10">
                    <CheckCircle className="w-3 h-3 mr-1.5" /> Reviewed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10">
                    <AlertCircle className="w-3 h-3 mr-1.5" /> Needs Review
                  </Badge>
                )}
              </div>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" className="h-8 bg-slate-700 border-slate-600 text-white hover:bg-slate-600" onClick={() => onViewDetails(rec)}>
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MyRecommendations;