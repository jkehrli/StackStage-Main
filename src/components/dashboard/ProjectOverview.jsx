import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const StatCard = ({ label, value }) => (
  <div className="bg-slate-800/50 p-4 rounded-xl text-center">
    <p className="text-2xl lg:text-3xl font-bold gradient-text">{value}</p>
    <p className="text-sm text-slate-400">{label}</p>
  </div>
);

const ProjectOverview = ({ companyName, progress, savedCount, categoryCount, stackScore }) => {
  return (
    <Card className="glass-effect border-slate-700">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* Project Title & Progress */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-2">{companyName} Stack Optimization</h2>
            <div className="flex items-center gap-4">
              <Progress value={progress} className="h-3 bg-slate-700" />
              <span className="font-semibold text-slate-300 whitespace-nowrap">{progress}% Complete</span>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Matches Saved" value={savedCount} />
            <StatCard label="Categories" value={categoryCount} />
            <div className="bg-slate-800/50 p-4 rounded-xl text-center relative flex flex-col items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-700" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-sky-400" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray={`${stackScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                 <span className="absolute text-xl font-bold text-white">{stackScore}</span>
                <p className="text-sm text-slate-400 mt-1">StackScore</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectOverview;