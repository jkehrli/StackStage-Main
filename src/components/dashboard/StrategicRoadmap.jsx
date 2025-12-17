import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Target, ChevronsRight, Send, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const initialRoadmapData = {
  'Consolidate Analytics Tools': { done: false, reason: 'Save $50k/yr', roi: 'Immediate' },
  'Implement HubSpot': { done: false, reason: 'Improve lead capture', roi: '150% in 12 mos' },
  'Upgrade Security Suite': { done: false, reason: 'Mitigate new threats', roi: 'Risk Reduction' },
  'Build Data Warehouse': { done: false, reason: 'Enable predictive analytics', roi: 'Strategic' },
};

const roadmapStructure = {
  quickWins: ['Consolidate Analytics Tools'],
  midTerm: ['Implement HubSpot', 'Upgrade Security Suite'],
  longTerm: ['Build Data Warehouse'],
};

const RoadmapColumn = ({ title, itemKeys, icon, onDone, onSend }) => (
  <div className="space-y-4 w-full">
    <h3 className="flex items-center gap-2 font-bold text-white text-sm">
      {icon}
      <span>{title}</span>
    </h3>
    <div className="space-y-3">
      {itemKeys.map(key => {
        const item = onSend.state[key];
        return (
          <Card key={key} className="bg-slate-800/50 border-slate-700 w-full">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-white text-sm mb-2 leading-tight">{key}</p>
                  <div className="text-xs text-slate-400 space-y-1">
                    <p>Why: {item.reason}</p>
                    <p>ROI: {item.roi}</p>
                  </div>
                </div>
                <div className="flex gap-2 w-full">
                  <Button 
                    size="sm" 
                    variant={item.done ? "default" : "outline"}
                    className={`flex-1 text-xs h-7 px-2 border-slate-600 hover:scale-105 transition-all duration-200 min-w-0 ${item.done ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'hover:bg-slate-700'}`}
                    onClick={() => onDone(key)}
                    disabled={item.done}
                  >
                    <Check className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{item.done ? 'Completed' : 'Done'}</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-xs h-7 px-2 border-slate-600 hover:bg-slate-700 hover:scale-105 transition-all duration-200 min-w-0"
                    onClick={() => onSend.handler(key)}
                  >
                    <Send className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">Send</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
);

export default function StrategicRoadmap() {
    const [roadmapState, setRoadmapState] = useState(initialRoadmapData);
    const [showSendModal, setShowSendModal] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);

    const handleDoneClick = (tool) => {
        setRoadmapState(prev => ({
            ...prev,
            [tool]: { ...prev[tool], done: true }
        }));
    };

    const handleSendClick = (tool) => {
        setSelectedTool(tool);
        setShowSendModal(true);
    };

    const Modal = ({ children, onClose }) => (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="glass-effect border-slate-700 rounded-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );

    return (
      <>
        <Card className="glass-effect border-slate-700 w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-white text-xl">Deep Stack Plan Visualization</CardTitle>
            <Link to={createPageUrl("DeepStackPlan")}>
              <Button variant="outline" className="bg-white border-slate-200 text-slate-900 hover:bg-slate-200 hover:scale-105 transition-all duration-200">
                View Deep Stack Plan
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4 xl:gap-6">
              <RoadmapColumn 
                title="Quick Wins (0-90 Days)" 
                itemKeys={roadmapStructure.quickWins} 
                icon={<Zap className="w-4 h-4 text-emerald-400"/>} 
                onDone={handleDoneClick}
                onSend={{ handler: handleSendClick, state: roadmapState }}
              />
              <RoadmapColumn 
                title="Mid-Term (3-6 Mos)" 
                itemKeys={roadmapStructure.midTerm} 
                icon={<Target className="w-4 h-4 text-sky-400"/>}
                onDone={handleDoneClick}
                onSend={{ handler: handleSendClick, state: roadmapState }}
              />
              <RoadmapColumn 
                title="Long-Term (6-18 Mos)" 
                itemKeys={roadmapStructure.longTerm} 
                icon={<ChevronsRight className="w-4 h-4 text-purple-400"/>}
                onDone={handleDoneClick}
                onSend={{ handler: handleSendClick, state: roadmapState }}
              />
            </div>
          </CardContent>
        </Card>

        {showSendModal && (
            <Modal onClose={() => setShowSendModal(false)}>
                <CardHeader>
                    <CardTitle className="text-white">Send Plan Item</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                    <p className="text-slate-300">This will send the plan for <span className="font-bold text-white">"{selectedTool}"</span> to your selected stakeholders.</p>
                    <Button className="gradient-button text-white w-full" onClick={() => setShowSendModal(false)}>Confirm & Send</Button>
                </CardContent>
            </Modal>
        )}
      </>
    );
}