
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Eye, Shield, UserCheck, X, Users, Briefcase, AlertTriangle, Layers, BarChart, Unlock, Mail, Phone, User, Send, FileText, Calendar, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    action: 'Enter Deal Room',
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
    action: 'Enter Deal Room',
    actionVariant: 'default'
  },
];

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
                <div className="flex justify-between items-center"><span className="text-slate-400">Next Action</span><span className="font-bold text-orange-400">Schedule IT Review</span></div>
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

const DealRow = ({ deal, onViewProfile, onOpenDealRoom }) => (
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
       {deal.action === 'Enter Deal Room' ? (
          <Button 
              onClick={() => onOpenDealRoom(deal)}
              variant={deal.actionVariant}
              className={'bg-sky-600 hover:bg-sky-700 text-white'}
          >
              {deal.action} <ArrowRight className="w-4 h-4 ml-2" />
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

export default function DealSync() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

  const [dealRoomModalOpen, setDealRoomModalOpen] = useState(false);
  const [selectedDealForDealRoom, setSelectedDealForDealRoom] = useState(null);

  const handleViewProfile = (deal) => {
    setSelectedDeal(deal);
    setShowProfileModal(true);
  };

  const handleOpenDealRoom = (deal) => {
    setSelectedDealForDealRoom(deal);
    setDealRoomModalOpen(true);
  };
  
  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white">DealSync</h1>
          <p className="text-slate-300 mt-2 max-w-3xl">
            This panel shows how you can interact with buyers based on their privacy settings. Engagement is gated by buyer readiness and consent.
          </p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
                <CardTitle className="text-white text-lg">Buyer Privacy & Engagement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
                {deals.map((deal) => (
                    <DealRow key={deal.id} deal={deal} onViewProfile={handleViewProfile} onOpenDealRoom={handleOpenDealRoom} />
                ))}
            </CardContent>
        </Card>
      </div>
      <AnimatePresence>
        <AnonymizedProfileModal 
            deal={selectedDeal} 
            isOpen={showProfileModal} 
            onClose={() => setShowProfileModal(false)} 
        />
        <DealRoomModal 
            deal={selectedDealForDealRoom}
            isOpen={dealRoomModalOpen}
            onClose={() => setDealRoomModalOpen(false)}
        />
      </AnimatePresence>
    </>
  );
}
