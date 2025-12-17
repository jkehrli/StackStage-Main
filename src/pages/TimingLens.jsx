
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input'; // New import for form fields
import { Textarea } from '@/components/ui/textarea'; // New import for form fields
import { Clock, Bell, Calendar, TrendingUp, Users, DollarSign, RefreshCw, Target, AlertTriangle, X, CheckCircle } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, AreaChart, Area } from 'recharts';

const timingInsights = [
  { text: "41% of mid-market CX tools are in budgeting phase now", icon: <DollarSign /> },
  { text: "Q4 shows highest readiness spike for AI Automation tools", icon: <TrendingUp /> },
  { text: "Buyers in Optimization stage are 2.4x more likely to engage in procurement within 90 days", icon: <Target /> }
];

const radarData = [
  { dimension: 'Evaluation Start', thisWeek: 65, nextWeek: 78, in30Days: 85 },
  { dimension: 'Budgeting Phase', thisWeek: 45, nextWeek: 52, in30Days: 71 },
  { dimension: 'Stakeholder Mapping', thisWeek: 38, nextWeek: 44, in30Days: 58 },
  { dimension: 'Renewal Window', thisWeek: 72, nextWeek: 68, in30Days: 45 },
  { dimension: 'Readiness Score', thisWeek: 58, nextWeek: 65, in30Days: 73 }
];

const readinessOverTime = [
  { period: 'Week 1', highFit: 45, mediumFit: 32, lowFit: 18 },
  { period: 'Week 2', highFit: 52, mediumFit: 38, lowFit: 22 },
  { period: 'Week 3', highFit: 61, mediumFit: 44, lowFit: 25 },
  { period: 'Week 4', highFit: 73, mediumFit: 51, lowFit: 28 },
  { period: 'Week 5', highFit: 78, mediumFit: 56, lowFit: 31 },
  { period: 'Week 6', highFit: 85, mediumFit: 62, lowFit: 34 },
  { period: 'Week 7', highFit: 88, mediumFit: 65, lowFit: 37 },
  { period: 'Week 8', highFit: 92, mediumFit: 68, lowFit: 39 },
];

// Updated account data structure with real company names
const accounts = [
  { id: 'Snowflake', readiness: 89, tags: ['UCaaS', 'Optimization'], companySize: '500-1000', readinessLabel: 'High Fit', nextMilestone: 'Budget Approval', timing: '12 days', riskFactors: ['Competing Solution'] },
  { id: 'Shopify', readiness: 76, tags: ['AI Support', 'Discovery'], companySize: '1000-5000', readinessLabel: 'Medium Fit', nextMilestone: 'Stakeholder Demo', timing: '18 days', riskFactors: [] },
  { id: 'Stripe', readiness: 93, tags: ['Analytics', 'Optimization'], companySize: '200-500', readinessLabel: 'High Fit', nextMilestone: 'Contract Review', timing: '5 days', riskFactors: ['Budget Constraints'] },
  { id: 'Canva', readiness: 67, tags: ['CRM', 'Setup'], companySize: '50-200', readinessLabel: 'Low Fit', nextMilestone: 'Requirements Gathering', timing: '25 days', riskFactors: ['Technical Complexity'] },
  { id: 'Figma', readiness: 84, tags: ['Security', 'Discovery'], companySize: '1000-5000', readinessLabel: 'Medium Fit', nextMilestone: 'Security Review', timing: '8 days', riskFactors: [] },
];

const TimingInsightCard = ({ text, icon }) => (
  <div className="bg-purple-500/10 border border-purple-500/30 text-purple-300 p-4 rounded-lg flex items-start gap-4 mb-8 w-full">
    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-300">{icon}</div>
    <div>
      <h4 className="font-bold text-white">Timing Insight</h4>
      <p className="text-sm">{text}</p>
    </div>
  </div>
);

const AccountCard = ({ account, onSchedulePrep }) => {
  const getReadinessColor = (score) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-slate-400';
  };

  const getMilestoneColor = (milestone) => {
    if (milestone.includes('Contract') || milestone.includes('Budget')) return 'bg-red-900/50 border-red-700/50';
    if (milestone.includes('Demo') || milestone.includes('Requirements')) return 'bg-blue-900/50 border-blue-700/50';
    return 'bg-slate-800/50 border-slate-700/50';
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">{account.id}</h3>
          <div className="flex gap-2 mt-2">
            {account.tags.map(tag => (
              <Badge key={tag} variant="outline" className="border-slate-600 text-slate-300">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${getReadinessColor(account.readiness)}`}>
            {account.readiness}%
          </div>
          <div className="text-sm text-slate-400">
            {account.companySize} {account.readinessLabel}
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg border ${getMilestoneColor(account.nextMilestone)}`}>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">Next Milestone</div>
            <div className="font-semibold text-white">{account.nextMilestone}</div>
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">Est. Timing</div>
            <div className="font-semibold text-white">{account.timing}</div>
          </div>
        </div>
      </div>

      {account.riskFactors && account.riskFactors.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">Risk Factors:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {account.riskFactors.map(risk => (
              <Badge key={risk} variant="outline" className="border-yellow-600/50 text-yellow-400">
                {risk}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Button
        onClick={() => onSchedulePrep(account)}
        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium"
      >
        <Calendar className="w-4 h-4 mr-2 text-white" />
        Schedule Prep
      </Button>
    </div>
  );
};

const SchedulePrepModal = ({ account, onClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    agenda: '',
    participants: '',
    materials: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Schedule Prep Call</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {!isSubmitted ? (
            <>
              <div className="mb-6 p-4 bg-slate-700/50 rounded-lg">
                <p className="text-slate-300">
                  Schedule a call with <strong className="text-white">{account?.id}</strong> to discuss their {account?.nextMilestone.toLowerCase()} requirements.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="prep-date" className="text-slate-300 font-medium">Preferred Date & Time</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <Input
                      id="prep-date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white [color-scheme:dark]"
                      required
                    />
                    <Input
                      id="prep-time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white [color-scheme:dark]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="prep-agenda" className="text-slate-300 font-medium">Meeting Agenda</Label>
                  <Textarea
                    id="prep-agenda"
                    value={formData.agenda}
                    onChange={(e) => setFormData({...formData, agenda: e.target.value})}
                    placeholder="Key topics to discuss..."
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 mt-2"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="prep-participants" className="text-slate-300 font-medium">Internal Participants</Label>
                  <Input
                    id="prep-participants"
                    value={formData.participants}
                    onChange={(e) => setFormData({...formData, participants: e.target.value})}
                    placeholder="Sales rep, solution engineer, etc."
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="prep-materials" className="text-slate-300 font-medium">Materials to Prepare</Label>
                  <Textarea
                    id="prep-materials"
                    value={formData.materials}
                    onChange={(e) => setFormData({...formData, materials: e.target.value})}
                    placeholder="Demo environment, case studies, pricing sheets..."
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 mt-2"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 bg-sky-600 hover:bg-sky-700 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Call Scheduled!</h3>
              <p className="text-slate-300">
                Your prep call has been scheduled. Calendar invite and preparation materials will be sent shortly.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-effect p-3 border border-slate-700 rounded-lg">
                <p className="text-white font-semibold">{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color }}>{`${p.name}: ${p.value}`}</p>
                ))}
            </div>
        );
    }
    return null;
};

export default function TimingLens() {
    const [currentInsight, setCurrentInsight] = useState(0);
    const [alertsEnabled, setAlertsEnabled] = useState(true);
    const [showScheduleModal, setShowScheduleModal] = useState(false); // Updated state name
    const [selectedAccount, setSelectedAccount] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentInsight((prev) => (prev + 1) % timingInsights.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleSchedulePrep = (account) => {
        setSelectedAccount(account);
        setShowScheduleModal(true);
    };

    const closeScheduleModal = () => {
      setShowScheduleModal(false);
      setSelectedAccount(null);
    };

    return (
        <TooltipProvider>
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                        <Clock className="w-10 h-10 text-purple-400" />
                        TimingLens
                    </h1>
                    <p className="text-slate-300 mt-2 max-w-3xl">Anticipate—don't chase—momentum. This is your real-time radar for buyer readiness, based on budget cycles, planning signals, and renewal timelines.</p>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentInsight}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <TimingInsightCard text={timingInsights[currentInsight].text} icon={timingInsights[currentInsight].icon} />
                    </motion.div>
                </AnimatePresence>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                        <Card className="glass-effect border-slate-700 h-full">
                            <CardHeader>
                                <CardTitle className="text-white">Readiness Over Time</CardTitle>
                                <CardDescription className="text-slate-400">Projected buyer readiness scores for different fit segments.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={350}>
                                    <AreaChart data={readinessOverTime} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                        <XAxis dataKey="period" tick={{ fill: '#94a3b8' }} />
                                        <YAxis tick={{ fill: '#94a3b8' }} />
                                        <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(148, 163, 184, 0.2)', strokeWidth: 1 }} />
                                        <Legend wrapperStyle={{ color: '#f1f5f9' }}/>
                                        <Area type="monotone" dataKey="highFit" name="High-Fit" stackId="1" stroke="#22c55e" fill="rgba(34, 197, 94, 0.2)" />
                                        <Area type="monotone" dataKey="mediumFit" name="Medium-Fit" stackId="1" stroke="#eab308" fill="rgba(234, 179, 8, 0.2)" />
                                        <Area type="monotone" dataKey="lowFit" name="Low-Fit" stackId="1" stroke="#ef4444" fill="rgba(239, 68, 68, 0.2)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-2">
                        <Card className="glass-effect border-slate-700 h-full">
                            <CardHeader>
                                <CardTitle className="text-white">Procurement Radar</CardTitle>
                                <CardDescription className="text-slate-400">Aggregated signals across key procurement dimensions.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={350}>
                                    <RadarChart data={radarData} outerRadius="80%">
                                        <PolarGrid stroke="rgba(255,255,255,0.2)" />
                                        <PolarAngleAxis dataKey="dimension" tick={{ fill: '#cbd5e1' }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'transparent' }} />
                                        <Radar name="Next 30 Days" dataKey="in30Days" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                        <RechartsTooltip content={<CustomTooltip />} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Card className="glass-effect border-slate-700">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-white">High-Intent Accounts</CardTitle>
                                <CardDescription className="text-slate-400">Anonymized buyers nearing engagement readiness.</CardDescription>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="alerts-toggle" checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                                <Label htmlFor="alerts-toggle" className="text-slate-300">Notify on 85%+ Readiness</Label>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {accounts
                          .sort((a,b) => b.readiness - a.readiness) // Sort by readiness descending
                          .map(account => (
                            <AccountCard key={account.id} account={account} onSchedulePrep={handleSchedulePrep} />
                        ))}
                    </CardContent>
                </Card>
            </div>

            {showScheduleModal && selectedAccount && (
                <SchedulePrepModal account={selectedAccount} onClose={closeScheduleModal} />
            )}
        </TooltipProvider>
    );
}
