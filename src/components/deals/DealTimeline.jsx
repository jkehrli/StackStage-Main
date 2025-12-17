import React from 'react';
import { Check, Circle, GitMerge, Send, Briefcase, Award } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const stageConfig = [
  { label: "Internal Evaluation", icon: <Circle />, color: "slate", description: "Buyer is in the early stages of identifying needs and evaluating their current stack internally." },
  { label: "Stack Alignment", icon: <GitMerge />, color: "blue", description: "Buyer is actively using StackStage to align their tech stack needs. StackFit score is developing." },
  { label: "Procurement Planning", icon: <Briefcase />, color: "blue", description: "Buyer has a defined need and is planning their procurement process, including budget and timeline." },
  { label: "Invite Sent", icon: <Send />, color: "green", description: "Ready to engage! The buyer has sent an EngageSignal, inviting you to connect." },
  { label: "Active Deal Room", icon: <Briefcase />, color: "gold", description: "You are actively engaged with the buyer in a private deal room." },
  { label: "Feedback & Renewal", icon: <Award />, color: "purple", description: "The deal is closed. Focus is now on feedback collection and preparing for future renewal." }
];

const getColors = (color, isComplete) => {
    if (!isComplete) color = "slate";
    const colors = {
        slate: { icon: "bg-slate-700 text-slate-400", line: "bg-slate-700", text: "text-slate-400" },
        blue: { icon: "bg-sky-500/20 text-sky-400", line: "bg-sky-500", text: "text-sky-300" },
        green: { icon: "bg-emerald-500/20 text-emerald-400", line: "bg-emerald-500", text: "text-emerald-300" },
        gold: { icon: "bg-amber-500/20 text-amber-400", line: "bg-amber-500", text: "text-amber-300" },
        purple: { icon: "bg-purple-500/20 text-purple-400", line: "bg-purple-500", text: "text-purple-300" }
    };
    return colors[color];
};

const DealTimeline = ({ deal }) => {
  const currentStageIndex = deal.currentStage;

  const getCTA = (index) => {
    if (index === 2 && currentStageIndex === 2) return <Button size="sm" variant="outline" className="h-7 text-xs border-slate-600">Log Assumption</Button>;
    if (index === 3 && currentStageIndex === 3) return <Button size="sm" variant="outline" className="h-7 text-xs border-slate-600">Download Brief</Button>;
    if (index === 4 && currentStageIndex >= 4) return <Button size="sm" className="h-7 text-xs gradient-button">Enter Room</Button>;
    return null;
  };
  
  return (
    <TooltipProvider>
      <div className="space-y-4">
        {stageConfig.map((stage, index) => {
          const isComplete = index < currentStageIndex;
          const isActive = index === currentStageIndex;
          const { icon, line, text } = getColors(stage.color, isComplete || isActive);

          return (
            <div key={index} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${icon} border ${isComplete || isActive ? 'border-transparent' : 'border-slate-700'} ${isActive ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-sky-400' : ''}`}>
                            {isComplete ? <Check className="w-4 h-4" /> : React.cloneElement(stage.icon, {className: "w-4 h-4"})}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className="glass-effect border-slate-700 text-white">
                        <p className="font-semibold">{stage.label}</p>
                        <p className="text-xs max-w-xs">{stage.description}</p>
                        {deal.timelineEvents?.[index] && <p className="text-xs text-slate-400 mt-1">Last activity: {deal.timelineEvents[index].date}</p>}
                    </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex-1">
                <p className={`font-medium ${text}`}>{stage.label}</p>
              </div>
              <div className="min-w-[120px] text-right">
                {getCTA(index)}
              </div>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default DealTimeline;