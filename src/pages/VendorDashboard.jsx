
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bell, TrendingUp, CheckCircle, AlertTriangle, DollarSign } from 'lucide-react';
import MethodologyCard from '../components/vendor_dashboard/MethodologyCard';

const mockDealsData = [
  { 
    id: 3, // Changed ID to match DealSync
    buyerName: 'Innovate Corp', 
    readiness: 92, 
    status: 'Procurement', 
    stackFit: 'High', 
    arr: 150000, 
    engagementStatus: 'Vendor Engaged',
    nextStep: 'Security Review',
    meddpicc: {
        metrics: { value: '$200k Annual Cost Savings', status: 'complete', confidence: 90, tooltip: 'Metrics: What are the quantifiable economic benefits of the solution?', aiNudge: 'Strong quantified value identified. Consider reinforcing ROI in upcoming presentations.' },
        economicBuyer: { value: 'VP of Operations (Sarah Miller)', status: 'complete', confidence: 85, tooltip: 'Economic Buyer: Who holds the ultimate decision-making power and controls the budget?', aiNudge: 'Economic buyer identified. Schedule direct meeting to confirm budget authority.' },
        decisionCriteria: { value: 'Integration capability, Security compliance, Cost per user', status: 'complete', confidence: 95, tooltip: 'Decision Criteria: What are the formal criteria the buyer will use to evaluate solutions?', aiNudge: 'Decision criteria well understood. Ensure your demos highlight these specific areas.' },
        decisionProcess: { value: 'IT Review → Finance Approval → Legal Sign-off', status: 'in_progress', confidence: 70, tooltip: 'Decision Process: What is the defined process for making the purchase decision?', aiNudge: 'Process partially mapped. Ask: "Who else needs to approve this beyond Sarah and the IT team?"' },
        paperProcess: { value: 'Legal review pending with InfoSec team', status: 'in_progress', confidence: 60, tooltip: 'Paper Process: What is the process for legal, security, and procurement reviews?', aiNudge: 'Legal process started. Follow up: "What specific security requirements does InfoSec need to validate?"' },
        identifyPain: { value: 'Fragmented customer experience across 5 systems', status: 'complete', confidence: 90, tooltip: 'Identify Pain: What is the primary business pain driving this evaluation?', aiNudge: 'Pain well articulated. Continue reinforcing how fragmentation costs them customers.' },
        champion: { value: 'Alex Chen (CTO) - actively advocating', status: 'complete', confidence: 85, tooltip: 'Champion: Who is the person inside the buyer\'s organization who is advocating for our solution?', aiNudge: 'Strong champion identified. Provide Alex with internal selling materials and competitive comparisons.' },
        competition: { value: 'Evaluating Salesforce and Microsoft solutions', status: 'in_progress', confidence: 75, tooltip: 'Competition: Who are we competing against and what are their strengths/weaknesses?', aiNudge: 'Competition identified. Prepare differentiation materials focusing on integration advantages over Salesforce.' }
    },
    meddicc: {
        metrics: { value: '$200k Annual Cost Savings', status: 'complete', confidence: 90, tooltip: 'Metrics: What are the quantifiable economic benefits?' },
        economicBuyer: { value: 'VP of Operations (Sarah Miller)', status: 'complete', confidence: 85, tooltip: 'Economic Buyer: Who controls the budget?' },
        decisionCriteria: { value: 'Integration, Security, Cost', status: 'complete', confidence: 95, tooltip: 'Decision Criteria: What criteria will they use?' },
        decisionProcess: { value: 'IT → Finance → Legal', status: 'in_progress', confidence: 70, tooltip: 'Decision Process: What is their buying process?' },
        identifyPain: { value: 'Fragmented customer experience', status: 'complete', confidence: 90, tooltip: 'Identify Pain: What pain are they solving?' },
        champion: { value: 'Alex Chen (CTO)', status: 'complete', confidence: 85, tooltip: 'Champion: Who is advocating for you?' },
        competition: { value: 'Salesforce, Microsoft', status: 'in_progress', confidence: 75, tooltip: 'Competition: Who are you competing against?' }
    },
    bant: {
        budget: { value: '$100k-200k confirmed', status: 'complete', confidence: 85, tooltip: 'Has the buyer confirmed a budget for this solution?' },
        authority: { value: 'VP Operations + CTO aligned', status: 'complete', confidence: 80, tooltip: 'Are we engaged with decision makers?' },
        need: { value: 'Unified customer experience', status: 'complete', confidence: 90, tooltip: 'Is there a clearly defined business need?' },
        timing: { value: 'This Quarter', status: 'in_progress', confidence: 70, tooltip: 'Is there a specific timeline for implementation?' }
    },
    sandler: {
        stage: 'Budget Agreement',
        description: 'Confirming financial commitment.',
        details: 'Move to Decision: Align with all stakeholder roles and timelines.',
        discoveryQuestions: [
            'Who else will be involved in the final decision?',
            'What does your ideal implementation timeline look like?',
            'What would need to happen for you to move forward this quarter?'
        ],
        statusIcon: 'CheckCircle'
    }
  },
  // Add full data for other deals
  { 
    id: 8, 
    buyerName: 'Synergy Solutions', 
    readiness: 88, 
    status: 'Evaluation', 
    stackFit: 'High', 
    arr: 75000, 
    engagementStatus: 'Shared Profile',
    nextStep: 'Feedback Session',
    meddpicc: {
        metrics: { value: 'Est. 15% efficiency gain', status: 'in_progress', confidence: 60, aiNudge: 'Quantify this metric. Ask: "What does a 15% efficiency gain mean in terms of hours saved or revenue generated?"' },
        economicBuyer: { value: 'Unknown', status: 'missing', confidence: 10, aiNudge: 'Find the EB. Ask your champion: "Who holds the budget for this project?"' },
        decisionCriteria: { value: 'Scalability', status: 'complete', confidence: 70, aiNudge: 'Only one criterion identified. Ask: "Besides scalability, what other factors are important for this decision?"' },
        decisionProcess: { value: 'Unknown', status: 'missing', confidence: 10, aiNudge: 'Map the process. Ask: "What are the steps your team typically follows to purchase new software?"' },
        paperProcess: { value: 'Not Started', status: 'missing', confidence: 5, aiNudge: 'Too early to ask about paper process. Focus on finding pain and the EB.' },
        identifyPain: { value: 'Slow reporting, data silos', status: 'complete', confidence: 80, aiNudge: 'Good start on pain. Deepen it: "How does slow reporting impact your team\'s ability to hit its goals?"' },
        champion: { value: 'Maybe Sarah (Analyst)', status: 'in_progress', confidence: 40, aiNudge: 'A champion needs power and influence. Test Sarah: "Is this project a top priority for your department?"' },
        competition: { value: 'In-house solution', status: 'in_progress', confidence: 50, aiNudge: 'Understand the internal competition. Ask: "What are the pros and cons of your current in-house solution?"' }
    },
     meddicc: {
        metrics: { value: 'Est. 15% efficiency gain', status: 'in_progress', confidence: 60 },
        economicBuyer: { value: 'Unknown', status: 'missing', confidence: 10 },
        decisionCriteria: { value: 'Scalability', status: 'complete', confidence: 70 },
        decisionProcess: { value: 'Unknown', status: 'missing', confidence: 10 },
        identifyPain: { value: 'Slow reporting', status: 'complete', confidence: 80 },
        champion: { value: 'Maybe Sarah (Analyst)', status: 'in_progress', confidence: 40 },
        competition: { value: 'In-house solution', status: 'in_progress', confidence: 50 }
    },
    bant: {
        budget: { value: 'Est. $50k-75k', status: 'in_progress', confidence: 50 },
        authority: { value: 'Manager Level', status: 'in_progress', confidence: 40 },
        need: { value: 'Better reporting tools', status: 'complete', confidence: 80 },
        timing: { value: 'Next 6 Months', status: 'in_progress', confidence: 60 }
    },
    sandler: {
        stage: 'Pain Discovery',
        description: 'Identifying and quantifying pain.',
        details: 'Deep dive into pain points - quantify the impact of current challenges.',
        discoveryQuestions: [
            'What is the cost of not solving this problem?',
            'How is this impacting your team\'s productivity?',
            'What have you tried before that didn\'t work?'
        ],
        statusIcon: 'Diamond'
    }
  },
  { 
    id: 12, 
    buyerName: 'Quantum Dynamics', 
    readiness: 65, 
    status: 'Discovery', 
    stackFit: 'Medium', 
    arr: 30000, 
    engagementStatus: 'View Anonymized',
    nextStep: 'Initial Follow-up',
    meddpicc: {
        metrics: { value: 'Unknown', status: 'missing', confidence: 0, aiNudge: 'Begin discovery around metrics. Ask: "How do you currently measure success for this area?"' },
        economicBuyer: { value: 'Unknown', status: 'missing', confidence: 0, aiNudge: 'Identify potential decision-makers from LinkedIn or your CRM.' },
        decisionCriteria: { value: 'Unknown', status: 'missing', confidence: 0, aiNudge: 'Ask: "When you\'ve bought similar software, what were the most important factors?"' },
        decisionProcess: { value: 'Unknown', status: 'missing', confidence: 0, aiNudge: 'Focus on identifying pain first before asking about process.' },
        paperProcess: { value: 'Unknown', status: 'missing', confidence: 0, aiNudge: 'Not relevant at this stage.' },
        identifyPain: { value: 'High-level interest in improving patient data management', status: 'in_progress', confidence: 30, aiNudge: 'This is a topic, not a pain. Ask "what if" questions to uncover the real problem.' },
        champion: { value: 'None', status: 'missing', confidence: 0, aiNudge: 'Your goal for the next call is to identify a potential champion.' },
        competition: { value: 'Unknown', status: 'missing', confidence: 0, aiNudge: 'Ask: "What other options are you considering to solve this?"' }
    },
     meddicc: {
        metrics: { value: 'Unknown', status: 'missing', confidence: 0 },
        economicBuyer: { value: 'Unknown', status: 'missing', confidence: 0 },
        decisionCriteria: { value: 'Unknown', status: 'missing', confidence: 0 },
        decisionProcess: { value: 'Unknown', status: 'missing', confidence: 0 },
        identifyPain: { value: 'High-level interest', status: 'in_progress', confidence: 30 },
        champion: { value: 'None', status: 'missing', confidence: 0 },
        competition: { value: 'Unknown', status: 'missing', confidence: 0 }
    },
    bant: {
        budget: { value: 'Not Discussed', status: 'missing', confidence: 0 },
        authority: { value: 'Unknown', status: 'missing', confidence: 0 },
        need: { value: 'Data Management Improvement', status: 'in_progress', confidence: 30 },
        timing: { value: 'Uncertain', status: 'missing', confidence: 10 }
    },
    sandler: {
        stage: 'Initial Discovery',
        description: 'Establishing initial contact and understanding high-level needs.',
        details: 'Focus on building rapport and identifying a potential pain point to explore further.',
        discoveryQuestions: [
            'What prompted you to look into a solution like this now?',
            'What are your top priorities for this year?',
            'Help me understand your current process.'
        ],
        statusIcon: 'Diamond'
    }
  }
];


const WinRateByAlignment = () => (
    <Card className="glass-effect border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Win Rate by Alignment</CardTitle>
            <TrendingUp className="w-4 h-4 text-slate-400" />
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 pt-2">
             <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background circle */}
                    <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="#334155"
                        strokeWidth="3"
                    />
                    {/* Progress circle (92%) - circumference is ~100, so 92 units for 92% */}
                    <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="3"
                        strokeDasharray="92 100"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">92%</span>
                </div>
            </div>
            <p className="text-xs text-slate-400 text-center mt-2">6 of 8 deals from stack-aligned accounts.<br />14 days average time to close.</p>
        </CardContent>
    </Card>
);

const RecentAlerts = () => (
    <Card className="glass-effect border-slate-700">
        <CardHeader>
            <CardTitle className="text-sm font-medium text-white">Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
                <Bell className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-300">A buyer shortlisted you due to <span className="font-bold text-white">94% stack alignment.</span></p>
            </div>
            <div className="flex items-start gap-3">
                <Bell className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-300"><span className="font-bold text-white">Global Retail Inc.</span> reached 88% readiness — your fit score is HIGH.</p>
            </div>
             <div className="flex items-start gap-3">
                <Bell className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-300">A buyer matched your ideal customer profile.</p>
            </div>
        </CardContent>
    </Card>
);


const PipelineSummary = ({deals}) => {
    const totalArr = deals.reduce((sum, deal) => sum + deal.arr, 0);
    return (
        <Card className="glass-effect border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Forecasted Pipeline ARR</CardTitle>
                <DollarSign className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-white">${totalArr.toLocaleString()}</div>
                <p className="text-xs text-slate-400">{deals.length} deals in pipeline</p>
            </CardContent>
        </Card>
    );
}

const VendorDashboard = () => {
  const [deals, setDeals] = useState(mockDealsData);
  const [selectedMethodology, setSelectedMethodology] = useState('MEDDPICC');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-4xl font-bold text-white">Vendor Hub</h1>
                  <p className="text-slate-300 mt-2 max-w-2xl">Track deal health and buyer readiness using structured sales frameworks.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-slate-300 font-medium">Methodology View:</span>
                    <Select value={selectedMethodology} onValueChange={setSelectedMethodology}>
                        <SelectTrigger className="w-40 bg-slate-800 border-slate-600 text-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600 text-white">
                            <SelectItem value="MEDDPICC" className="text-white hover:bg-slate-700">MEDDPICC</SelectItem>
                            <SelectItem value="MEDDICC" className="text-white hover:bg-slate-700">MEDDICC</SelectItem>
                            <SelectItem value="BANT" className="text-white hover:bg-slate-700">BANT</SelectItem>
                            <SelectItem value="Sandler" className="text-white hover:bg-slate-700">Sandler</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-6">
                {deals.map(deal => (
                    <MethodologyCard key={deal.id} deal={deal} methodology={selectedMethodology} />
                ))}
            </div>
        </div>
        <div className="space-y-6 lg:mt-24">
            <PipelineSummary deals={deals} />
            <WinRateByAlignment />
            <RecentAlerts />
        </div>
    </div>
  );
};

export default VendorDashboard;
