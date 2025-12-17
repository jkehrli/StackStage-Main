
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Signal, DollarSign, Users, Calendar, Layers, Tag, Bookmark, Check, Bell, Filter, X, CheckCircle, Send } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const mockSignals = [
  { id: 1, stackFit: 'High', score: 92, categories: ['UCaaS', 'AI Support Tools'], stackStage: 'Discovery', timeline: 'Q4 2024', budget: '$50K–$100K', companySize: '500–1000', engagementWindow: 75 },
  { id: 2, stackFit: 'High', score: 88, categories: ['Onboarding Automation'], stackStage: 'Optimization', timeline: 'Q1 2025', budget: '$25K–$50K', companySize: '200–500', engagementWindow: 40 },
  { id: 3, stackFit: 'Medium', score: 78, categories: ['CCaaS', 'Analytics'], stackStage: 'Setup', timeline: 'Q4 2024', budget: '$100K+', companySize: '1000–5000', engagementWindow: 90 },
  { id: 4, stackFit: 'Medium', score: 72, categories: ['Data Security', 'Compliance'], stackStage: 'Discovery', timeline: 'Q1 2025', budget: '$50K–$100K', companySize: '5000+', engagementWindow: 20 },
  { id: 5, stackFit: 'Low', score: 65, categories: ['Project Management'], stackStage: 'Optimization', timeline: 'Q2 2025', budget: '$10K–$25K', companySize: '50-200', engagementWindow: 10 },
  { id: 6, stackFit: 'High', score: 95, categories: ['AI Support Tools', 'CRM'], stackStage: 'Discovery', timeline: 'Q4 2024', budget: '$100K+', companySize: '1000-5000', engagementWindow: 85 },
];

const fitStyles = {
    High: "border-emerald-500/50 bg-emerald-500/10 text-emerald-300",
    Medium: "border-yellow-500/50 bg-yellow-500/10 text-yellow-300",
    Low: "border-red-500/50 bg-red-500/10 text-red-300",
};

const SignalCard = ({ signal, onTrack, isTracked }) => (
    <Card className="glass-effect border-slate-700 flex flex-col hover:border-slate-600 transition-all duration-200">
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <Badge className={fitStyles[signal.stackFit]}>{signal.stackFit} Fit</Badge>
                    <CardTitle className="text-2xl font-bold text-white mt-2">{signal.score}%</CardTitle>
                    <CardDescription>StackFit Score</CardDescription>
                </div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`w-10 h-10 ${isTracked ? 'text-sky-400' : 'text-slate-400'}`}
                            onClick={() => onTrack(signal.id)}
                            disabled={isTracked}
                        >
                            {isTracked ? <Check className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="glass-effect border-slate-700 text-white">
                        <p>{isTracked ? 'Tracking Opportunity' : 'Track Opportunity'}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </CardHeader>
        <CardContent className="space-y-4 flex-grow">
            <div className="flex flex-wrap gap-2">
                {signal.categories.map(cat => <Badge key={cat} variant="secondary" className="bg-slate-700 text-slate-300">{cat}</Badge>)}
            </div>
            <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3"><Layers className="w-4 h-4 text-slate-400" /> <span className="text-slate-200">{signal.stackStage} Stage</span></div>
                <div className="flex items-center gap-3"><Calendar className="w-4 h-4 text-slate-400" /> <span className="text-slate-200">{signal.timeline} Timeline</span></div>
                <div className="flex items-center gap-3"><DollarSign className="w-4 h-4 text-slate-400" /> <span className="text-slate-200">{signal.budget} Budget</span></div>
                <div className="flex items-center gap-3"><Users className="w-4 h-4 text-slate-400" /> <span className="text-slate-200">{signal.companySize} Employees</span></div>
            </div>
            
        </CardContent>
        <div className="p-6 pt-2">
            <label className="text-xs text-slate-400 mb-1 block">Engagement Window</label>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div 
                    className="bg-gradient-to-r from-sky-600 to-sky-400 h-2.5 rounded-full" 
                    style={{width: `${signal.engagementWindow}%`}}
                ></div>
            </div>
        </div>
    </Card>
);

const ConfigureAlertsModal = ({ onClose }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(90);

    const handleSubmit = () => {
        setIsSubmitted(true);
        setTimeout(() => onClose(), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="glass-effect border-slate-700 rounded-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <CardHeader className="relative">
                    <CardTitle className="text-white">Configure Smart Alerts</CardTitle>
                    <CardDescription>Get notified when high-fit signals match your criteria.</CardDescription>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-4 right-4 text-slate-400 hover:text-white"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </CardHeader>
                <CardContent>
                    {!isSubmitted ? (
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="fit-score" className="text-slate-300">Notify when StackFit Score is above</Label>
                                <div className="flex items-center gap-4 mt-2">
                                    <Slider 
                                        defaultValue={[90]} 
                                        max={100} 
                                        step={1} 
                                        className="flex-1" 
                                        onValueChange={([val]) => setScore(val)}
                                    />
                                    <span className="text-white font-semibold w-12 text-center">{score}%</span>
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="timeline-select" className="text-slate-300">And timeline is within</Label>
                                <Select defaultValue="q4-2024">
                                    <SelectTrigger id="timeline-select" className="w-full bg-slate-800 border-slate-700 text-white mt-2">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                        <SelectItem value="next-30">Next 30 Days</SelectItem>
                                        <SelectItem value="q4-2024">Q4 2024</SelectItem>
                                        <SelectItem value="q1-2025">Q1 2025</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={handleSubmit} className="w-full gradient-button">
                                <Send className="w-4 h-4 mr-2" />
                                Save Alert
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-white mb-2">Alert Saved!</h4>
                            <p className="text-slate-300">We'll notify you when new signals match your criteria.</p>
                        </div>
                    )}
                </CardContent>
            </div>
        </div>
    );
};

export default function FitSignal() {
    const [signals, setSignals] = useState(mockSignals);
    const [filteredSignals, setFilteredSignals] = useState(mockSignals);
    const [filters, setFilters] = useState({ stackFit: 'all', category: 'all', size: 'all', timeline: 'all' });
    const [tracked, setTracked] = useState([]);
    const [alertsEnabled, setAlertsEnabled] = useState(true);
    const [showConfigureAlertsModal, setShowConfigureAlertsModal] = useState(false);

    const allCategories = [...new Set(mockSignals.flatMap(s => s.categories))];

    useEffect(() => {
        let tempSignals = [...signals];
        if (filters.stackFit !== 'all') {
            tempSignals = tempSignals.filter(s => s.stackFit === filters.stackFit);
        }
        if (filters.category !== 'all') {
            tempSignals = tempSignals.filter(s => s.categories.includes(filters.category));
        }
        if (filters.size !== 'all') {
            tempSignals = tempSignals.filter(s => s.companySize === filters.size);
        }
        if (filters.timeline !== 'all') {
            tempSignals = tempSignals.filter(s => s.timeline === filters.timeline);
        }
        setFilteredSignals(tempSignals);
    }, [filters, signals]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    const handleTrack = (id) => {
        setTracked(prev => [...prev, id]);
    };

    return (
        <TooltipProvider>
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-white">FitSignal</h1>
                    <p className="text-slate-300 mt-2 max-w-3xl">
                        This is your real-time buyer alignment feed. Track high-fit, anonymized opportunities and get ready to engage when the timing is right.
                    </p>
                </div>

                <Card className="glass-effect border-slate-700">
                    <CardHeader className="flex-row items-center justify-between">
                        <div className="flex items-center gap-3">
                           <Filter className="w-5 h-5 text-slate-400" />
                           <h3 className="text-lg font-semibold text-white">Smart Filters</h3>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Switch id="alerts-toggle" checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                                <Label htmlFor="alerts-toggle" className="text-slate-300">Enable Alerts</Label>
                            </div>
                            <Button className="gradient-button" onClick={() => setShowConfigureAlertsModal(true)}>
                                <Bell className="w-4 h-4 mr-2" />
                                Configure Alerts
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Select onValueChange={(v) => handleFilterChange('stackFit', v)}>
                            <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white"><SelectValue placeholder="StackFit Score" /></SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                <SelectItem value="all">All Fit Scores</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select onValueChange={(v) => handleFilterChange('category', v)}>
                            <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white"><SelectValue placeholder="Category" /></SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                <SelectItem value="all">All Categories</SelectItem>
                                {allCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                            </SelectContent>
                        </Select>
                         <Select onValueChange={(v) => handleFilterChange('size', v)}>
                            <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white"><SelectValue placeholder="Company Size" /></SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                <SelectItem value="all">All Sizes</SelectItem>
                                <SelectItem value="50-200">50-200</SelectItem>
                                <SelectItem value="200–500">200–500</SelectItem>
                                <SelectItem value="500–1000">500–1000</SelectItem>
                                <SelectItem value="1000–5000">1000–5000</SelectItem>
                                <SelectItem value="5000+">5000+</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select onValueChange={(v) => handleFilterChange('timeline', v)}>
                            <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white"><SelectValue placeholder="Timeline" /></SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                <SelectItem value="all">All Timelines</SelectItem>
                                <SelectItem value="Q4 2024">Q4 2024</SelectItem>
                                <SelectItem value="Q1 2025">Q1 2025</SelectItem>
                                <SelectItem value="Q2 2025">Q2 2025</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSignals.map(signal => (
                        <SignalCard 
                            key={signal.id} 
                            signal={signal} 
                            onTrack={handleTrack}
                            isTracked={tracked.includes(signal.id)}
                        />
                    ))}
                </div>
            </div>
            {showConfigureAlertsModal && <ConfigureAlertsModal onClose={() => setShowConfigureAlertsModal(false)} />}
        </TooltipProvider>
    );
}
