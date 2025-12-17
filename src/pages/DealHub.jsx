
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Eye, Shield, UserCheck, X, Users, Briefcase, AlertTriangle, Layers, BarChart, Unlock, Mail, Phone, User, Send, FileText, Calendar, TrendingUp, ArrowLeft, Video, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const deals = [
  {
    id: 1,
    initials: 'AB',
    color: 'bg-purple-500',
    company: 'Anonymized Buyer',
    industry: 'Enterprise Fintech',
    status: 'Fully Private',
    statusColor: 'text-sky-400',
    statusIcon: <Shield className="w-3 h-3 mr-1.5" />,
    match: '88%',
    action: 'View Profile',
    actionVariant: 'outline',
    profile: {
        companySize: '1000+ employees',
        stage: 'Enterprise',
        painPoints: ['Complex compliance requirements', 'Legacy system integrations', 'Need for scalable payment processing'],
        stackGaps: ['Contract Lifecycle Management', 'Advanced Fraud Detection']
    }
  },
  {
    id: 2,
    initials: 'AB',
    color: 'bg-indigo-500',
    company: 'Anonymized Buyer',
    industry: 'Mid-Market Healthcare',
    status: 'Shared Profile',
    statusColor: 'text-yellow-400',
    statusIcon: <Eye className="w-3 h-3 mr-1.5" />,
    match: '91%',
    action: 'View Anonymized Profile',
    actionVariant: 'outline',
    profile: {
        companySize: '250-500 employees',
        stage: 'Growth Stage',
        painPoints: ['HIPAA compliance on cloud services', 'Patient data interoperability', 'Telehealth platform scalability'],
        stackGaps: ['Secure Patient Comms Platform', 'EHR Integration Layer']
    }
  },
  {
    id: 3,
    initials: 'AC',
    color: 'bg-rose-500',
    company: 'Alex Chen',
    industry: 'Innovate Corp',
    status: 'Vendor Engaged',
    statusColor: 'text-emerald-400',
    statusIcon: <UserCheck className="w-3 h-3 mr-1.5" />,
    match: '96%',
    action: 'Enter DealHub',
    actionVariant: 'default'
  },
   {
    id: 4,
    initials: 'AB',
    color: 'bg-cyan-500',
    company: 'Anonymized Buyer',
    industry: 'Startup - AI & ML',
    status: 'Shared Profile',
    statusColor: 'text-yellow-400',
    statusIcon: <Eye className="w-3 h-3 mr-1.5" />,
    match: '89%',
    action: 'View Anonymized Profile',
    actionVariant: 'outline',
    profile: {
        companySize: '50-100 employees',
        stage: 'Series A',
        painPoints: ['Long model training times', 'Difficulty deploying models to production', 'Lack of MLOps tooling'],
        stackGaps: ['GPU Cloud Provider', 'Experiment Tracking']
    }
  },
  {
    id: 5,
    initials: 'SR',
    color: 'bg-orange-500',
    company: 'Samantha Ray',
    industry: 'Global Retail Inc.',
    status: 'Vendor Engaged',
    statusColor: 'text-emerald-400',
    statusIcon: <UserCheck className="w-3 h-3 mr-1.5" />,
    match: '98%',
    action: 'Enter DealHub',
    actionVariant: 'default'
  },
];

const DealRoomTab = ({ deal }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alex Chen', text: "Great to hear! I'm excited to move forward. I've prepared a custom proposal based on your requirements.", timestamp: '1 hour ago', isVendor: false },
    { id: 2, sender: 'You', text: "Perfect! We'd like to schedule a technical review with our IT team next week.", timestamp: '30 minutes ago', isVendor: true }
  ]);
  const [documents] = useState([
    { id: 1, name: 'Custom Proposal - Innovate Corp', timestamp: '2 hours ago' },
    { id: 2, name: 'Security Compliance Report', timestamp: 'yesterday' }
  ]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), sender: 'You', text: newMessage, timestamp: 'Just now', isVendor: true }]);
      setNewMessage('');
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900/50 rounded-lg p-4 h-64 overflow-y-auto space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isVendor ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.isVendor ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-200'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="bg-slate-700 border-slate-600 text-white"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage} className="bg-sky-600 hover:bg-sky-700 text-white">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Shared Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="font-medium text-white">{doc.name}</p>
                      <p className="text-sm text-slate-400">Shared {doc.timestamp}</p>
                    </div>
                  </div>
                  <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-slate-900/50 rounded-lg p-4">
          <CardHeader className="p-0 mb-3"><CardTitle className="text-white text-lg">Contact Information</CardTitle></CardHeader>
          <CardContent className="p-0 space-y-3">
            <div className="flex items-center gap-2 text-sky-400"><Mail className="w-4 h-4" /><span>alex.chen@innovatecorp.com</span></div>
            <div className="flex items-center gap-2 text-white"><Phone className="w-4 h-4" /><span>+1 (555) 123-4567</span></div>
            <div className="flex items-center gap-2 text-white"><User className="w-4 h-4" /><span>CTO</span></div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900/50 rounded-lg p-4">
          <CardHeader className="p-0 mb-3"><CardTitle className="text-white text-lg">Deal Progress</CardTitle></CardHeader>
          <CardContent className="p-0 space-y-3 text-sm">
            <div className="flex justify-between items-center"><span className="text-slate-400">Potential Value</span><span className="font-bold text-emerald-400">$150,000 ARR</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Stage</span><Badge className="bg-sky-500/20 text-sky-300">Technical Review</Badge></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Close Probability</span><span className="font-bold text-yellow-400">75%</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">Next Action</span><span className="font-bold text-white">Schedule IT Review</span></div>
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
  );
};

const FullyPrivateBuyerModal = ({ deal, isOpen, onClose }) => {
    if (!isOpen || !deal) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <CardHeader className="flex flex-row items-start justify-between sticky top-0 bg-slate-800/80 backdrop-blur-sm z-10 p-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Fully Private Buyer</h2>
                        <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-full ${deal.color} flex items-center justify-center font-bold text-white text-lg`}>
                                {deal.initials}
                            </div>
                            <div>
                                <span className="font-semibold text-white">{deal.industry}</span>
                                <p className="text-sm text-slate-400">Match Score: <span className="font-bold text-emerald-400">{deal.match}</span></p>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5 text-slate-400" /></Button>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <Shield className="w-6 h-6 text-sky-400" />
                            <h3 className="text-lg font-semibold text-white">Privacy Protected</h3>
                        </div>
                        <p className="text-slate-300 text-sm">
                            This buyer is in research mode and has chosen to keep their identity fully private. 
                            Only high-level industry and company information is available.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-slate-900/50 border-slate-700">
                             <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                                <Briefcase className="w-5 h-5 text-sky-400" />
                                <CardTitle className="text-lg text-white">Available Information</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                                <p><strong className="text-slate-400">Industry:</strong> <span className="text-white">{deal.industry}</span></p>
                                <p><strong className="text-slate-400">Status:</strong> <span className="text-sky-400">Researching Solutions</span></p>
                                <p><strong className="text-slate-400">Match Score:</strong> <span className="text-emerald-400 font-bold">{deal.match}</span></p>
                            </CardContent>
                        </Card>
                         <Card className="bg-slate-900/50 border-slate-700">
                             <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                <CardTitle className="text-lg text-white">Next Steps</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2 text-slate-300">
                                <p>• Wait for buyer to share more details</p>
                                <p>• Monitor for status changes</p>
                                <p>• Prepare relevant case studies</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-white mb-3">Why This Match Score?</h4>
                        <div className="space-y-2 text-sm text-slate-300">
                            <p>• Industry alignment with your target market</p>
                            <p>• Company profile matches your ideal customer</p>
                            <p>• Technology stack indicators suggest strong fit</p>
                        </div>
                    </div>

                    <div className="text-center pt-4">
                        <p className="text-sm text-slate-400 mb-4">
                            You'll be notified when this buyer is ready to engage or share more details.
                        </p>
                        <Button onClick={onClose} className="gradient-button text-white px-8 py-3">
                            Got It
                        </Button>
                    </div>
                </CardContent>
            </motion.div>
        </div>
    );
};

const AnonymizedProfileModal = ({ deal, isOpen, onClose }) => {
    if (!isOpen || !deal) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                <CardHeader className="flex flex-row items-start justify-between sticky top-0 bg-slate-800/80 backdrop-blur-sm z-10 p-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Anonymized Buyer Profile</h2>
                        <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded-full ${deal.color} flex items-center justify-center font-bold text-white text-lg`}>
                                {deal.initials}
                            </div>
                            <div>
                                <span className="font-semibold text-white">{deal.industry}</span>
                                <p className="text-sm text-slate-400">Match Score: <span className="font-bold text-emerald-400">{deal.match}</span></p>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5 text-slate-400" /></Button>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-slate-900/50 border-slate-700">
                             <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                                <Briefcase className="w-5 h-5 text-sky-400" />
                                <CardTitle className="text-lg text-white">Company Profile</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                                <p><strong className="text-slate-400">Size:</strong> {deal.profile.companySize}</p>
                                <p><strong className="text-slate-400">Stage:</strong> {deal.profile.stage}</p>
                            </CardContent>
                        </Card>
                         <Card className="bg-slate-900/50 border-slate-700">
                             <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                <CardTitle className="text-lg text-white">Key Pain Points</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    {deal.profile.painPoints.map(point => <li key={point}>{point}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                     <Card className="bg-slate-900/50 border-slate-700">
                         <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                            <Layers className="w-5 h-5 text-purple-400" />
                            <CardTitle className="text-lg text-white">Tech Stack Gaps</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="flex flex-wrap gap-2">
                                {deal.profile.stackGaps.map(gap => <Badge key={gap} variant="outline" className="text-purple-300 border-purple-500/50 bg-purple-500/10">{gap}</Badge>)}
                            </div>
                        </CardContent>
                    </Card>
                    <div className="text-center pt-4">
                        <Button className="gradient-button text-white px-8 py-3 text-lg">
                            <Unlock className="w-5 h-5 mr-2" />
                            Request Full Profile
                        </Button>
                        <p className="text-xs text-slate-500 mt-2">Requires buyer consent. The buyer will be notified of your interest.</p>
                    </div>
                </CardContent>
            </motion.div>
        </div>
    );
};

const DealRow = ({ deal, onViewProfile, onOpenDealHub }) => (
  <div className="grid grid-cols-12 items-center p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors duration-200">
    <div className="col-span-1 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full ${deal.color} flex items-center justify-center font-bold text-white`}>
        {deal.initials}
      </div>
    </div>
    <div className="col-span-4">
      <p className="font-semibold text-white">{deal.company}</p>
      <p className="text-sm text-slate-400">{deal.industry}</p>
    </div>
    <div className="col-span-3">
      <Badge variant="outline" className={`border-0 ${deal.statusColor}`}>
        {deal.statusIcon}
        {deal.status}
      </Badge>
    </div>
    <div className="col-span-2 text-center">
      <p className="font-bold text-lg text-emerald-400">{deal.match}</p>
      <p className="text-xs text-slate-400">Match Score</p>
    </div>
    <div className="col-span-2 text-right">
       {deal.action === 'Enter DealHub' ? (
          <Button 
              onClick={() => onOpenDealHub(deal)}
              variant={deal.actionVariant}
              className={'bg-sky-600 hover:bg-sky-700 text-white'}
          >
              Enter Deal Sync <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
      ) : (
        <Button 
            onClick={() => onViewProfile(deal)}
            variant={deal.actionVariant}
            className={'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'}
        >
            {deal.action} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  </div>
);

const DealHubDetail = ({ deal, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock timeline data
  const timelineData = [
    { phase: 'Discovery', status: 'complete', date: '2024-01-15', description: 'Initial needs assessment completed' },
    { phase: 'Proposal', status: 'complete', date: '2024-01-22', description: 'Custom proposal delivered' },
    { phase: 'Technical Review', status: 'current', date: '2024-01-29', description: 'Security and integration review' },
    { phase: 'Legal Review', status: 'upcoming', date: '2024-02-05', description: 'Contract and compliance review' },
    { phase: 'Final Approval', status: 'upcoming', date: '2024-02-12', description: 'Stakeholder sign-off' },
    { phase: 'Contract Signed', status: 'upcoming', date: '2024-02-19', description: 'Agreement execution' }
  ];

  const planSteps = [
    { phase: '1. Discovery', description: 'Align on business objectives and success criteria.', buyerTask: 'Define key business outcomes for Q3.', sellerTask: 'Share relevant case studies and ROI data.', dueDate: 'Jan 15, 2024', status: 'Complete' },
    { phase: '2. Solution Review', description: 'Deep dive into the solution and technical requirements.', buyerTask: 'Schedule and attend technical demo with IT team.', sellerTask: 'Provide custom demo environment.', dueDate: 'Jan 29, 2024', status: 'In Progress' },
    { phase: '3. Validation', description: 'Confirm security, legal, and compliance requirements.', buyerTask: 'Complete security questionnaire.', sellerTask: 'Provide SOC 2 report and security docs.', dueDate: 'Feb 5, 2024', status: 'Upcoming' },
    { phase: '4. Procurement', description: 'Finalize commercial and legal terms.', buyerTask: 'Internal review and submit PO to finance.', sellerTask: 'Deliver final contract for signature.', dueDate: 'Feb 19, 2024', status: 'Upcoming' },
  ];

  const documents = [
    { category: 'Proposals & SOWs', name: 'Innovate Corp - Custom Proposal.pdf', size: '2.3 MB', shared: 'Jan 22, 2024' },
    { category: 'Security & Compliance', name: 'SOC 2 Type II Report.pdf', size: '5.1 MB', shared: 'Jan 29, 2024' },
    { category: 'Security & Compliance', name: 'Security Compliance Overview.pdf', size: '1.2 MB', shared: 'Jan 29, 2024' },
    { category: 'Legal & Contracts', name: 'Master Subscription Agreement (MSA).docx', size: '850 KB', shared: 'Feb 5, 2024' },
  ];

  const groupedDocuments = documents.reduce((acc, doc) => {
    (acc[doc.category] = acc[doc.category] || []).push(doc);
    return acc;
  }, {});

  const TimelineStep = ({ step, isLast }) => {
    const getStatusColor = () => {
      switch (step.status) {
        case 'complete': return 'bg-emerald-500';
        case 'current': return 'bg-sky-500';
        default: return 'bg-slate-600';
      }
    };

    return (
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full ${getStatusColor()}`}></div>
          {!isLast && <div className="w-0.5 h-8 bg-slate-700 mt-2"></div>}
        </div>
        <div className="flex-1 pb-6">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-white">{step.phase}</h4>
            <span className="text-sm text-slate-400">{step.date}</span>
          </div>
          <p className="text-sm text-slate-400">{step.description}</p>
        </div>
      </div>
    );
  };
  
  const PlanStatusBadge = ({ status }) => {
    const styles = {
      'Complete': 'bg-emerald-500/20 text-emerald-300',
      'In Progress': 'bg-sky-500/20 text-sky-300',
      'Upcoming': 'bg-slate-600/50 text-slate-300',
    };
    return <Badge className={styles[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="ghost" className="text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Deal Hub
        </Button>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-white">{deal.company}</h2>
          <p className="text-slate-400">{deal.industry}</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="overview" className="text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="action_plan" className="text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-white">Mutual Action Plan</TabsTrigger>
          <TabsTrigger value="docs" className="text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-white">Docs & Contracts</TabsTrigger>
          <TabsTrigger value="deal_room" className="text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-white">Deal Room</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Deal Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {timelineData.map((step, index) => (
                    <TimelineStep 
                      key={step.phase} 
                      step={step} 
                      isLast={index === timelineData.length - 1} 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Deal Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Match Score</span>
                  <span className="text-emerald-400 font-bold">{deal.match}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Potential Value</span>
                  <span className="text-emerald-400 font-bold">$150,000 ARR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Close Probability</span>
                  <span className="text-yellow-400 font-bold">75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expected Close</span>
                  <span className="text-white font-bold">Feb 19, 2024</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="action_plan">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Mutual Action Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {planSteps.map((step) => (
                <div key={step.phase} className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{step.phase}</h3>
                      <p className="text-sm text-slate-400">{step.description}</p>
                    </div>
                    <PlanStatusBadge status={step.status} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-slate-800/50 p-3 rounded">
                      <p className="font-semibold text-slate-300 mb-1">Buyer Task</p>
                      <p className="text-slate-400">{step.buyerTask}</p>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded">
                      <p className="font-semibold text-slate-300 mb-1">Seller Task</p>
                      <p className="text-slate-400">{step.sellerTask}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs">
           <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Documents & Contracts</CardTitle>
              <Button className="gradient-button text-white">Upload Document</Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(groupedDocuments).map(([category, docs]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-slate-300 mb-3 border-b border-slate-700 pb-2">{category}</h3>
                  <div className="space-y-2">
                    {docs.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-sky-400" />
                          <div>
                            <p className="font-medium text-white">{doc.name}</p>
                            <p className="text-sm text-slate-400">
                              {doc.size} - Shared on {doc.shared}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" className="bg-slate-600 border-slate-500 text-white hover:bg-slate-500">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deal_room">
          <DealRoomTab deal={deal} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default function DealHub() {
  const [showFullyPrivateModal, setShowFullyPrivateModal] = useState(false);
  const [showAnonymizedModal, setShowAnonymizedModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'detail'
  const [selectedDealForDetail, setSelectedDealForDetail] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const dealIdToOpen = urlParams.get('openDeal');
    if (dealIdToOpen) {
      const dealToOpen = deals.find(d => d.id === parseInt(dealIdToOpen, 10));
      if (dealToOpen) {
        handleOpenDealHub(dealToOpen);
        // Clean up the URL to prevent re-triggering on refresh
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []); // Run only on initial component mount

  const handleViewProfile = (deal) => {
    setSelectedDeal(deal);
    if (deal.status === 'Fully Private') {
      setShowFullyPrivateModal(true);
    } else {
      setShowAnonymizedModal(true);
    }
  };

  const handleOpenDealHub = (deal) => {
    setSelectedDealForDetail(deal);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedDealForDetail(null);
  };

  if (currentView === 'detail' && selectedDealForDetail) {
    return (
      <DealHubDetail 
        deal={selectedDealForDetail} 
        onBack={handleBackToList}
      />
    );
  }

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Deal Hub</h1>
          <p className="text-slate-300 mt-2 max-w-3xl">
            Manage your active deals and engage with buyers based on their readiness and privacy settings.
          </p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
                <CardTitle className="text-white text-lg">Buyer Privacy & Engagement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
                {deals.map((deal) => (
                    <DealRow key={deal.id} deal={deal} onViewProfile={handleViewProfile} onOpenDealHub={handleOpenDealHub} />
                ))}
            </CardContent>
        </Card>
      </div>
      <AnimatePresence>
        <FullyPrivateBuyerModal 
            deal={selectedDeal} 
            isOpen={showFullyPrivateModal} 
            onClose={() => setShowFullyPrivateModal(false)} 
        />
        <AnonymizedProfileModal 
            deal={selectedDeal} 
            isOpen={showAnonymizedModal} 
            onClose={() => setShowAnonymizedModal(false)} 
        />
      </AnimatePresence>
    </>
  );
}
