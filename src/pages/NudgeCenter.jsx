
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Bell,
  TrendingUp,
  AlertTriangle,
  Clock,
  Users,
  DollarSign,
  ArrowRight,
  Filter,
  CheckCircle,
  X,
  Send,
  Calendar,
  FileText,
  BarChart3,
  RefreshCw,
  Mail, // New import for DealRoomModal
  Phone, // New import for DealRoomModal
  User // New import for DealRoomModal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // New imports for DealRoomModal animation

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="glass-effect border-slate-700 rounded-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

const ActionModal = ({ action, nudge, onClose, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      onComplete();
      onClose();
    }, 1500);
  };

  const getModalContent = () => {
    switch (action) {
      case 'Schedule Call':
        return {
          title: 'Schedule Call',
          content: (
            <div className="space-y-4">
              <p className="text-slate-300">Schedule a call with {nudge.company} to discuss their requirements.</p>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-300">Preferred Date & Time</label>
                  <Input type="datetime-local" className="bg-slate-800 border-slate-600 text-white mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300">Meeting Topic</label>
                  <Select>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600 text-white">
                      <SelectItem value="discovery">Discovery Call</SelectItem>
                      <SelectItem value="demo">Product Demo</SelectItem>
                      <SelectItem value="proposal">Proposal Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )
        };
      case 'View Analysis':
        return {
          title: 'View Buyer Analysis',
          content: (
            <div className="space-y-4">
              <p className="text-slate-300">Access detailed analysis for {nudge.company} including budget, timeline, and decision criteria.</p>
              <div className="bg-slate-800/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between"><span className="text-slate-400">Budget Authority:</span><span className="text-white">VP of Operations</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Decision Timeline:</span><span className="text-white">Q1 2024</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Stack Fit:</span><span className="text-emerald-400">88%</span></div>
              </div>
            </div>
          )
        };
      case 'Send Proposal':
        return {
          title: 'Send Proposal',
          content: (
            <div className="space-y-4">
              <p className="text-slate-300">Send a customized proposal to {nudge.company}.</p>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-300">Proposal Template</label>
                  <Select>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600 text-white">
                      <SelectItem value="enterprise">Enterprise Package</SelectItem>
                      <SelectItem value="mid-market">Mid-Market Solution</SelectItem>
                      <SelectItem value="custom">Custom Proposal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300">Additional Notes</label>
                  <Textarea placeholder="Add personalized notes..." className="bg-slate-800 border-slate-600 text-white" />
                </div>
              </div>
            </div>
          )
        };
      case 'View Intel':
        return {
          title: 'Competitive Intelligence',
          content: (
            <div className="space-y-4">
              <p className="text-slate-300">Review competitive analysis for {nudge.company}.</p>
              <div className="bg-slate-800/50 p-4 rounded-lg space-y-3">
                <div><span className="text-slate-400">Primary Competitor:</span><span className="text-white ml-2">Salesforce</span></div>
                <div><span className="text-slate-400">Our Advantage:</span><span className="text-emerald-400 ml-2">Better integration capabilities</span></div>
                <div><span className="text-slate-400">Risk Level:</span><span className="text-yellow-400 ml-2">Medium</span></div>
              </div>
            </div>
          )
        };
      case 'Prepare Response':
        return {
          title: 'Prepare Competitive Response',
          content: (
            <div className="space-y-4">
              <p className="text-slate-300">Prepare materials to address competitive threats for {nudge.company}.</p>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-300">Response Type</label>
                  <Select>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue placeholder="Select response type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600 text-white">
                      <SelectItem value="battlecard">Competitive Battlecard</SelectItem>
                      <SelectItem value="comparison">Feature Comparison</SelectItem>
                      <SelectItem value="roi">ROI Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )
        };
      case 'Schedule Check-in':
        return {
          title: 'Schedule Customer Check-in',
          content: (
            <div className="space-y-4">
              <p className="text-slate-300">Schedule a proactive check-in with {nudge.company} regarding their renewal.</p>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-300">Check-in Type</label>
                  <Select>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600 text-white">
                      <SelectItem value="usage">Usage Review</SelectItem>
                      <SelectItem value="success">Success Check-in</SelectItem>
                      <SelectItem value="renewal">Renewal Discussion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )
        };
      case 'Usage Report':
        return {
          title: 'Generate Usage Report',
          content: (
            <div className="space-y-4">
              <p className="text-slate-300">Generate a usage report for {nudge.company} to identify optimization opportunities.</p>
              <div className="bg-slate-800/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between"><span className="text-slate-400">Current Usage:</span><span className="text-red-400">75% (↓25%)</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Active Users:</span><span className="text-white">45/60 licenses</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Renewal Date:</span><span className="text-yellow-400">60 days</span></div>
              </div>
            </div>
          )
        };
      default:
        return {
          title: action,
          content: <p className="text-slate-300">Complete this action for {nudge.company}.</p>
        };
    }
  };

  const { title, content } = getModalContent();

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </div>

        {!isCompleted ? (
          <div className="space-y-4">
            {content}
            <Button
              className="w-full gradient-button text-white font-semibold"
              onClick={handleComplete}
            >
              <Send className="w-4 h-4 mr-2" />
              Complete Action
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Action Completed!</h4>
            <p className="text-slate-300">Your {action.toLowerCase()} has been processed.</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

const DealRoomModal = ({ deal, isOpen, onClose }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alex Chen', text: "Great to hear! I'm excited to move forward. I've prepared a custom proposal based on your requirements.", timestamp: '1 hour ago', isVendor: false },
    { id: 2, sender: 'You', text: "Perfect! We'd like to schedule a technical review with our IT team next week.", timestamp: '30 minutes ago', isVendor: true }
  ]);
  const [documents] = useState([
    { id: 1, name: 'Custom Proposal - Innovate Corp', timestamp: '2 hours ago' },
    { id: 2, name: 'Security Compliance Report', timestamp: 'yesterday' }
  ]);

  if (!isOpen) return null;

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), sender: 'You', text: newMessage, timestamp: 'Just now', isVendor: true }]);
      setNewMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-slate-800 rounded-2xl w-full max-w-5xl border border-slate-700 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 flex justify-between items-center border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Deal Room: {deal.company} ({deal.industry})</h2>
          <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5 text-slate-400" /></Button>
        </div>
        <div className="p-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="bg-transparent border-0 shadow-none">
              <CardHeader className="p-0 mb-4"><CardTitle className="text-white">Messages</CardTitle></CardHeader>
              <CardContent className="p-0">
                <div className="bg-slate-900/50 rounded-lg p-4 h-64 overflow-y-auto space-y-4 mb-4">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.isVendor ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.isVendor ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type your message..." className="bg-slate-700 border-slate-600 text-white" />
                  <Button onClick={sendMessage} className="bg-sky-600 hover:bg-sky-700 text-white flex-shrink-0"><Send className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-transparent border-0 shadow-none">
              <CardHeader className="p-0 mb-4"><CardTitle className="text-white">Shared Documents</CardTitle></CardHeader>
              <CardContent className="p-0 space-y-2">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="font-medium text-white">{doc.name}</p>
                        <p className="text-sm text-slate-400">Shared {doc.timestamp}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="text-white bg-sky-600 border-sky-600 hover:bg-sky-700">View</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="bg-slate-900/50 rounded-lg p-4">
              <CardHeader className="p-0 mb-3"><CardTitle className="text-white text-lg">Contact Information</CardTitle></CardHeader>
              <CardContent className="p-0 space-y-3">
                <div className="flex items-center gap-2 text-sky-400"><Mail className="w-4 h-4" /><span>{deal.contactEmail || 'N/A'}</span></div>
                <div className="flex items-center gap-2 text-white"><Phone className="w-4 h-4" /><span>{deal.contactPhone || 'N/A'}</span></div>
                <div className="flex items-center gap-2 text-white"><User className="w-4 h-4" /><span>{deal.contactTitle || 'N/A'}</span></div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 rounded-lg p-4">
              <CardHeader className="p-0 mb-3"><CardTitle className="text-white text-lg">Deal Progress</CardTitle></CardHeader>
              <CardContent className="p-0 space-y-3 text-sm">
                <div className="flex justify-between items-center"><span className="text-slate-400">Potential Value</span><span className="font-bold text-emerald-400">{deal.value}</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-400">Stage</span><Badge className="bg-sky-500/20 text-sky-300">{deal.stage}</Badge></div>
                <div className="flex justify-between items-center"><span className="text-slate-400">Close Probability</span><span className="font-bold text-yellow-400">{deal.probability || 'N/A'}</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-400">Next Action</span><span className="font-bold text-white">{deal.nextAction || 'N/A'}</span></div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 rounded-lg p-4">
              <CardHeader className="p-0 mb-3"><CardTitle className="text-white text-lg">Upcoming Events</CardTitle></CardHeader>
              <CardContent className="p-0">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-sky-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">Technical Deep Dive</p>
                    <p className="text-sm text-slate-400">Tomorrow, 2:00 PM EST</p>
                    <p className="text-sm text-slate-400">with IT Team (4 attendees)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const NudgeCard = ({ nudge, onAction }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20';
      case 'medium': return 'bg-yellow-500/20';
      case 'low': return 'bg-green-500/20';
      default: return 'bg-slate-500/20';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-400 text-red-400';
      case 'medium': return 'border-yellow-400 text-yellow-400';
      case 'low': return 'border-green-400 text-green-400';
      default: return 'border-slate-400 text-slate-400';
    }
  };

  const getNudgeIcon = (type) => {
    switch (type) {
      case 'deal_momentum': return <TrendingUp className="w-5 h-5" />;
      case 'budget_confirmed': return <DollarSign className="w-5 h-5" />;
      case 'competitor_alert': return <AlertTriangle className="w-5 h-5" />;
      case 'renewal_risk': return <RefreshCw className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <Card className={`bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-200 ${
      nudge.priority === 'high' ? 'border-l-4 border-l-red-400' :
      nudge.priority === 'medium' ? 'border-l-4 border-l-yellow-400' :
      'border-l-4 border-l-green-400'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getPriorityColor(nudge.priority)}`}>
              {getNudgeIcon(nudge.type)}
            </div>
            <div>
              <h3 className="font-semibold text-white">{nudge.title}</h3>
              <p className="text-sm text-slate-400">{nudge.timestamp}</p>
            </div>
          </div>
          <Badge variant="outline" className={`${getPriorityBadgeColor(nudge.priority)} text-xs`}>
            {nudge.priority.toUpperCase()}
          </Badge>
        </div>

        <p className="text-slate-300 mb-4">{nudge.message}</p>

        {nudge.deal && (
          <div className="bg-slate-900/50 rounded-lg p-3 mb-4">
            <h4 className="font-semibold text-white mb-2">Deal Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-slate-400">Company: <span className="text-white">{nudge.deal.company}</span></span>
              <span className="text-slate-400">Value: <span className="text-emerald-400 font-semibold">{nudge.deal.value}</span></span>
              <span className="text-slate-400">Industry: <span className="text-white">{nudge.deal.industry}</span></span>
              <span className="text-slate-400">Stage: <span className="text-sky-400">{nudge.deal.stage}</span></span>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {nudge.actions?.map((action, index) => (
            <Button
              key={index}
              onClick={() => action.action ? action.action(nudge) : null} // Pass the full nudge object
              variant={action.variant === 'primary' ? 'default' : 'outline'}
              className={action.variant === 'primary' ? 'bg-sky-600 hover:bg-sky-700 text-white' : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const NudgeStats = ({ totalNudges }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <Card className="glass-effect border-slate-700">
      <CardContent className="p-4 text-center">
        <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
        <p className="text-2xl font-bold text-white">12</p>
        <p className="text-sm text-slate-400">Active Opportunities</p>
      </CardContent>
    </Card>
    <Card className="glass-effect border-slate-700">
      <CardContent className="p-4 text-center">
        <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
        <p className="text-2xl font-bold text-white">3</p>
        <p className="text-sm text-slate-400">High Priority</p>
      </CardContent>
    </Card>
    <Card className="glass-effect border-slate-700">
      <CardContent className="p-4 text-center">
        <Clock className="w-8 h-8 text-sky-400 mx-auto mb-2" />
        <p className="text-2xl font-bold text-white">5</p>
        <p className="text-sm text-slate-400">This Week</p>
      </CardContent>
    </Card>
    <Card className="glass-effect border-slate-700">
      <CardContent className="p-4 text-center">
        <Bell className="w-8 h-8 text-purple-400 mx-auto mb-2" />
        <p className="text-2xl font-bold text-white">{totalNudges}</p>
        <p className="text-sm text-slate-400">Total Nudges</p>
      </CardContent>
    </Card>
  </div>
);

const AllCaughtUpMessage = () => (
  <div className="text-center py-16">
    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
      <CheckCircle className="w-12 h-12 text-emerald-400" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">You're All Caught Up!</h3>
    <p className="text-slate-400 mb-6 max-w-md mx-auto">
      Great work! You've addressed all your nudges. New opportunities and alerts will appear here as they come in.
    </p>
    <Button
      variant="outline"
      className="border-slate-600 bg-slate-800 text-white hover:bg-slate-700 font-medium"
      onClick={() => window.location.reload()}
    >
      <RefreshCw className="w-4 h-4 mr-2" />
      Refresh for New Nudges
    </Button>
  </div>
);

export default function NudgeCenter() {
  const [nudges, setNudges] = useState([
    {
      id: 1,
      type: 'deal_momentum',
      priority: 'high',
      title: 'Innovate Corp is ready for engagement',
      message: 'Alex Chen has indicated they\'re ready to speak with vendors. High budget authority confirmed.',
      timestamp: '2 hours ago',
      deal: {
        id: 3, // Corresponds to dealId from original mock
        company: 'Innovate Corp',
        contact: 'Alex Chen',
        industry: 'Technology',
        value: '$150K ARR',
        stage: 'Engagement Ready',
        contactEmail: 'alex.chen@innovatecorp.com',
        contactPhone: '+1 (555) 123-4567',
        contactTitle: 'CTO',
        probability: '75%',
        nextAction: 'Schedule IT Review'
      },
      actions: [
        { label: 'Enter Deal Room', variant: 'primary', action: (nudgeObj) => handleEnterDealRoom(nudgeObj) },
        { label: 'Schedule Call', variant: 'secondary', action: (nudgeObj) => handleAction('Schedule Call', nudgeObj) }
      ]
    },
    {
      id: 2,
      type: 'budget_confirmed',
      priority: 'medium',
      title: 'Budget authority identified at Global Retail Inc',
      message: 'VP of Operations has been confirmed as the economic buyer. Timeline: Q1 decision.',
      timestamp: '1 day ago',
      deal: {
        company: 'Global Retail Inc',
        industry: 'Retail',
        value: '$80K ARR',
        stage: 'Budget Confirmed'
      },
      actions: [
        { label: 'View Analysis', variant: 'secondary', action: (nudgeObj) => handleAction('View Analysis', nudgeObj) },
        { label: 'Send Proposal', variant: 'primary', action: (nudgeObj) => handleAction('Send Proposal', nudgeObj) }
      ]
    },
    {
      id: 3,
      type: 'competitor_alert',
      priority: 'high',
      title: 'Competitive threat detected',
      message: 'TechFlow Inc is also evaluating Salesforce. Your differentiation materials should emphasize integration advantages.',
      timestamp: '3 hours ago',
      deal: {
        company: 'TechFlow Inc',
        industry: 'Software',
        value: '$120K ARR',
        stage: 'Competitive Evaluation'
      },
      actions: [
        { label: 'View Intel', variant: 'secondary', action: (nudgeObj) => handleAction('View Intel', nudgeObj) },
        { label: 'Prepare Response', variant: 'secondary', action: (nudgeObj) => handleAction('Prepare Response', nudgeObj) }
      ]
    },
    {
      id: 4,
      type: 'renewal_risk',
      priority: 'medium',
      title: 'Renewal approaching with usage concerns',
      message: 'HealthData.io renewal in 60 days. Usage down 25% - proactive outreach recommended.',
      timestamp: '5 hours ago',
      deal: {
        company: 'HealthData.io',
        industry: 'Healthcare',
        value: '$70K ARR',
        stage: 'Renewal'
      },
      actions: [
        { label: 'Schedule Check-in', variant: 'secondary', action: (nudgeObj) => handleAction('Schedule Check-in', nudgeObj) },
        { label: 'Usage Report', variant: 'secondary', action: (nudgeObj) => handleAction('Usage Report', nudgeObj) }
      ]
    }
  ]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedNudge, setSelectedNudge] = useState(null);
  const [filterPriority, setFilterPriority] = useState('all');

  const [dealRoomModalOpen, setDealRoomModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null); // This holds the deal object to pass to DealRoomModal

  const handleAction = (actionLabel, nudgeObject) => {
    setSelectedAction(actionLabel);
    setSelectedNudge(nudgeObject); // Pass the full nudge object for ActionModal
  };

  const handleEnterDealRoom = (nudgeObject) => {
    setSelectedDeal(nudgeObject.deal); // Pass the 'deal' sub-object to DealRoomModal
    setDealRoomModalOpen(true);
  };

  const handleDismissNudge = (nudgeId) => {
    // The new NudgeCard does not have a dismiss button, but keeping this logic if it were to be re-added.
    setNudges(prev => prev.filter(nudge => nudge.id !== nudgeId));
  };

  const handleCompleteAction = () => {
    // Remove the nudge after completing the action
    if (selectedNudge) {
      setNudges(prev => prev.filter(nudge => nudge.id !== selectedNudge.id));
    }
  };

  const closeModal = () => {
    setSelectedAction(null);
    setSelectedNudge(null);
  };

  const filteredNudges = nudges.filter(nudge =>
    filterPriority === 'all' || nudge.priority === filterPriority
  );

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <Bell className="w-10 h-10 text-purple-400" />
              Nudge Center
            </h1>
            <p className="text-slate-300 mt-2 max-w-2xl">
              Stay on top of your deals with intelligent nudges and actionable insights.
            </p>
          </div>

          {nudges.length > 0 && (
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-40 bg-slate-800 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 text-white">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Stats */}
        <NudgeStats totalNudges={nudges.length} />

        {/* Nudges */}
        {filteredNudges.length === 0 ? (
          <AllCaughtUpMessage />
        ) : (
          <div className="space-y-4">
            {filteredNudges.map((nudge) => (
              <NudgeCard
                key={nudge.id}
                nudge={nudge}
                onAction={handleAction} // NudgeCard now uses onAction directly
              />
            ))}
          </div>
        )}

        {/* Action Modal */}
        {selectedAction && selectedNudge && (
          <ActionModal
            action={selectedAction}
            nudge={selectedNudge}
            onClose={closeModal}
            onComplete={handleCompleteAction}
          />
        )}
      </div>

      <AnimatePresence>
        {dealRoomModalOpen && selectedDeal && (
          <DealRoomModal
            deal={selectedDeal}
            isOpen={dealRoomModalOpen}
            onClose={() => {
              setDealRoomModalOpen(false);
              setSelectedDeal(null);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
