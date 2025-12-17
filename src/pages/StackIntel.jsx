
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Layers, Lightbulb, BarChart3, GanttChartSquare, Compass, Bell, RefreshCw, Upload, Download, AlertTriangle, X, CheckCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, Cell } from 'recharts';

const insightCardsData = [
  { text: "Q4 renewals for 'Onboarding Automation' tools are surging among mid-market buyers.", icon: <GanttChartSquare /> },
  { text: "30% of 500–1,000 employee buyers are revisiting 'AI Support Tools' platforms.", icon: <BarChart3 /> },
  { text: "60% of tools with low internal NPS scores are being evaluated for replacement.", icon: <AlertTriangle /> }
];

const maturityData = [
  { stage: 'Setup', buyers: 87, segment: 'Mid-Market' },
  { stage: 'Discovery', buyers: 152, segment: 'Mid-Market' },
  { stage: 'Optimization', buyers: 65, segment: 'Mid-Market' },
  { stage: 'Setup', buyers: 45, segment: 'Enterprise' },
  { stage: 'Discovery', buyers: 98, segment: 'Enterprise' },
  { stage: 'Optimization', buyers: 112, segment: 'Enterprise' },
];

const renewalData = [
    { category: 'CRM', month: 'Oct 2024', count: 12, type: 'competitor' },
    { category: 'Analytics', month: 'Nov 2024', count: 8, type: 'competitor' },
    { category: 'Your Tool', month: 'Nov 2024', count: 3, type: 'mine' },
    { category: 'UCaaS', month: 'Dec 2024', count: 18, type: 'competitor' },
    { category: 'Security', month: 'Jan 2025', count: 22, type: 'competitor' },
    { category: 'Your Tool', month: 'Jan 2025', count: 5, type: 'mine' },
];

const triggersData = [
  { category: 'Analytics', trigger: 'Usage dropped 40%', volume: 15, timing: '60-90 days' },
  { category: 'Project Mgmt', trigger: 'Low NPS score', volume: 8, timing: '30-60 days' },
  { category: 'CRM', trigger: 'Feature overlap with new tool', volume: 21, timing: '90-120 days' },
  { category: 'Security', trigger: 'Compliance needs changed', volume: 12, timing: 'ASAP' },
];

const landscapeData = [
    ["Analytics", "CRM", "Security", "DevOps"],
    [ 7, 3, 8, 2 ], // Your overlap with these categories
    [ 5, 9, 4, 1 ], // Competitor A
    [ 2, 4, 6, 8 ], // Competitor B
];

const InsightCard = ({ text, icon }) => (
    <div className="bg-sky-500/10 border border-sky-500/30 text-sky-300 p-4 rounded-lg flex items-start gap-4 mb-8 w-full">
        <div className="w-10 h-10 bg-sky-500/20 rounded-lg flex items-center justify-center flex-shrink-0 text-sky-300">{icon}</div>
        <div>
            <h4 className="font-bold text-white">Market Trend</h4>
            <p className="text-sm">{text}</p>
        </div>
    </div>
);

const ExportInsightsModal = ({ onClose }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = () => {
        setIsSubmitted(true);
        setTimeout(() => onClose(), 2000);
    };
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="glass-effect border-slate-700 rounded-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <CardHeader>
                    <CardTitle className="text-white">Export Market Insights</CardTitle>
                    <CardDescription>Download the current dashboard view as a report.</CardDescription>
                </CardHeader>
                <CardContent>
                    {!isSubmitted ? (
                        <div className="space-y-6">
                            <div>
                                <Label className="text-slate-300">Choose Format</Label>
                                <RadioGroup defaultValue="pdf" className="mt-2 grid grid-cols-2 gap-4">
                                    <div>
                                        <RadioGroupItem value="pdf" id="pdf" className="peer sr-only" />
                                        <Label htmlFor="pdf" className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-transparent p-4 hover:bg-slate-800/50 hover:text-slate-300 peer-data-[state=checked]:border-sky-500 [&:has([data-state=checked])]:border-sky-500">
                                            PDF Report
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="csv" id="csv" className="peer sr-only" />
                                        <Label htmlFor="csv" className="flex flex-col items-center justify-between rounded-md border-2 border-slate-700 bg-transparent p-4 hover:bg-slate-800/50 hover:text-slate-300 peer-data-[state=checked]:border-sky-500 [&:has([data-state=checked])]:border-sky-500">
                                            CSV Data
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <Button onClick={handleSubmit} className="w-full gradient-button">
                                <Download className="w-4 h-4 mr-2"/>
                                Export Now
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-white mb-2">Exporting...</h4>
                            <p className="text-slate-300">Your report will be downloaded shortly.</p>
                        </div>
                    )}
                </CardContent>
            </div>
        </div>
    );
};

const ConfigureWebhookModal = ({ onClose }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = () => {
        setIsSubmitted(true);
        setTimeout(() => onClose(), 2000);
    };
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="glass-effect border-slate-700 rounded-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <CardHeader>
                    <CardTitle className="text-white">Configure Webhook</CardTitle>
                    <CardDescription>Send real-time insights to your internal tools.</CardDescription>
                </CardHeader>
                <CardContent>
                     {!isSubmitted ? (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="webhook-url" className="text-slate-300">Webhook URL</Label>
                                <Input id="webhook-url" placeholder="https://yourapi.com/stackstage-webhook" className="bg-slate-800 border-slate-700 text-white" />
                            </div>
                            <p className="text-xs text-slate-400">We'll send a POST request with a JSON payload for new market triggers.</p>
                            <Button onClick={handleSubmit} className="w-full gradient-button">Save Webhook</Button>
                        </div>
                    ) : (
                         <div className="text-center py-8">
                            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-white mb-2">Webhook Saved!</h4>
                            <p className="text-slate-300">We've successfully connected to your endpoint.</p>
                        </div>
                    )}
                </CardContent>
            </div>
        </div>
    );
};


export default function StackIntel() {
    const [currentInsight, setCurrentInsight] = useState(0);
    const [maturityFilter, setMaturityFilter] = useState('All');
    const [showMyToolsOnly, setShowMyToolsOnly] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [showConfigureModal, setShowConfigureModal] = useState(false);


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentInsight((prev) => (prev + 1) % insightCardsData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);
    
    const filteredMaturityData = useMemo(() => {
        if (maturityFilter === 'All') return maturityData;
        return maturityData.filter(d => d.segment === maturityFilter);
    }, [maturityFilter]);
    
    const filteredRenewalData = useMemo(() => {
        const months = ["Oct 2024", "Nov 2024", "Dec 2024", "Jan 2025"];
        const sourceData = showMyToolsOnly ? renewalData.filter(d => d.type === 'mine') : renewalData;
        const grouped = sourceData.reduce((acc, item) => {
            if (!acc[item.month]) acc[item.month] = 0;
            acc[item.month] += item.count;
            return acc;
        }, {});
        return months.map(month => ({ month, count: grouped[month] || 0 }));
    }, [showMyToolsOnly]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-effect p-3 border border-slate-700 rounded-lg">
                    <p className="text-white font-semibold">{label}</p>
                    {payload.map((p, i) => (
                        <p key={i} style={{ color: p.color || '#fff' }}>{`${p.name}: ${p.value}`}</p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <TooltipProvider>
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-white">StackIntel</h1>
                    <p className="text-slate-300 mt-2 max-w-3xl">This is your command center for market intelligence. Understand why, when, and where demand is emerging based on aggregated, anonymized buyer activity.</p>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentInsight}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <InsightCard text={insightCardsData[currentInsight].text} icon={insightCardsData[currentInsight].icon} />
                    </motion.div>
                </AnimatePresence>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Stack Maturity Distribution */}
                    <Card className="glass-effect border-slate-700">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-white">Stack Maturity Distribution</CardTitle>
                                <Select value={maturityFilter} onValueChange={setMaturityFilter}>
                                    <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                        <SelectItem value="All">All Segments</SelectItem>
                                        <SelectItem value="Mid-Market">Mid-Market</SelectItem>
                                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={filteredMaturityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="stage" tick={{ fill: '#94a3b8' }} />
                                    <YAxis tick={{ fill: '#94a3b8' }} />
                                    <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}/>
                                    <Legend wrapperStyle={{ color: '#f1f5f9' }} />
                                    <Bar dataKey="buyers" name="Buyers" fill="#0ea5e9" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Renewal Windows */}
                    <Card className="glass-effect border-slate-700">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-white">Renewal Windows</CardTitle>
                                <div className="flex items-center space-x-2">
                                    <Switch id="tool-filter" checked={showMyToolsOnly} onCheckedChange={setShowMyToolsOnly} />
                                    <Label htmlFor="tool-filter" className="text-slate-300">My Tools Only</Label>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={filteredRenewalData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis type="number" tick={{ fill: '#94a3b8' }} />
                                    <YAxis type="category" dataKey="month" tick={{ fill: '#94a3b8' }} width={80}/>
                                    <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}/>
                                    <Bar dataKey="count" name="Renewals" fill="#22c55e" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Replacement Triggers */}
                <Card className="glass-effect border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white">AI Replacement Triggers</CardTitle>
                        <CardDescription className="text-slate-400">Inferred opportunities based on anonymized buyer planning data.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-slate-700">
                                    <TableHead className="text-slate-300">Category</TableHead>
                                    <TableHead className="text-slate-300">Trigger</TableHead>
                                    <TableHead className="text-center text-slate-300">Volume</TableHead>
                                    <TableHead className="text-right text-slate-300">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {triggersData.map((trigger, i) => (
                                    <TableRow key={i} className="border-slate-800 hover:bg-slate-800/50">
                                        <TableCell className="font-medium text-white">{trigger.category}</TableCell>
                                        <TableCell className="text-slate-300">{trigger.trigger}</TableCell>
                                        <TableCell className="text-center text-slate-300">{trigger.volume}</TableCell>
                                        <TableCell className="text-right text-slate-300">{trigger.timing}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Competitive Landscape */}
                <Card className="glass-effect border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white">Competitive Landscape</CardTitle>
                        <CardDescription className="text-slate-400">Heatmap showing your product's mention frequency vs. competitors across categories.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-5 gap-1 text-center text-xs">
                            <div className="p-2"></div>
                            {landscapeData[0].map(cat => <div key={cat} className="p-2 font-bold text-slate-300">{cat}</div>)}
                            
                            <div className="p-2 font-bold text-slate-300 text-left">You</div>
                            {landscapeData[1].map((val, i) => <div key={i} className="p-4 rounded-md" style={{ background: `rgba(14, 165, 233, ${val/10})`}}>{val}</div>)}
                            
                            <div className="p-2 font-bold text-slate-300 text-left">Competitor A</div>
                            {landscapeData[2].map((val, i) => <div key={i} className="p-4 rounded-md" style={{ background: `rgba(239, 68, 68, ${val/10})`}}>{val}</div>)}
                            
                            <div className="p-2 font-bold text-slate-300 text-left">Competitor B</div>
                            {landscapeData[3].map((val, i) => <div key={i} className="p-4 rounded-md" style={{ background: `rgba(234, 179, 8, ${val/10})`}}>{val}</div>)}
                        </div>
                    </CardContent>
                </Card>
                
                <div className="flex justify-end gap-4 mt-8">
                    <Button className="bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white" onClick={() => setShowExportModal(true)}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Insights
                    </Button>
                    <Button className="gradient-button" onClick={() => setShowConfigureModal(true)}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Configure Webhook
                    </Button>
                </div>
            </div>
            {showExportModal && <ExportInsightsModal onClose={() => setShowExportModal(false)} />}
            {showConfigureModal && <ConfigureWebhookModal onClose={() => setShowConfigureModal(false)} />}
        </TooltipProvider>
    );
}
