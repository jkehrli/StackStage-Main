
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input'; // Added for modals
import { Textarea } from '@/components/ui/textarea'; // Added for modals
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // Added for modals
import {
  CheckCircle,
  Target,
  Link2,
  Shield,
  LifeBuoy,
  Users,
  Calculator,
  Calendar,
  TrendingUp,
  Share2,
  PlusCircle,
  Video,
  ArrowRight,
  X,
  Mail,
  Phone,
  MessageSquare,
  DollarSign,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const HighlightItem = ({ children }) => (
  <li className="flex items-start gap-3">
    <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
    <span className="text-slate-300">{children}</span>
  </li>
);

const IntegrationItem = ({ logo, name }) => (
  <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
    <img src={logo} alt={`${name} logo`} className="w-6 h-6 rounded-md bg-white p-0.5" />
    <span className="font-medium text-white">{name}</span>
  </div>
);

const SectionCard = ({ icon, title, children }) => (
  <Card className="bg-transparent border-none shadow-none">
    <CardHeader className="p-0 pb-4">
      <CardTitle className="text-xl text-white flex items-center gap-3">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0 text-slate-300">
      {children}
    </CardContent>
  </Card>
);

const ROICalculatorModal = ({ onClose }) => {
  const [employees, setEmployees] = useState(150);
  const [toolCost, setToolCost] = useState(500);
  const [timeSaved, setTimeSaved] = useState(2);
  const [salary, setSalary] = useState(80000);
  const [roi, setRoi] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const hourlyRate = salary / 2080;
    const toolSavings = toolCost * 12; // Annual tool cost
    const productivityValue = timeSaved * 52 * hourlyRate * employees; // Annual productivity value
    const totalSavings = toolSavings + productivityValue;
    const investment = 8 * 12 * employees; // Notion Business plan cost (example: $8/user/month)
    const calculatedRoi = investment === 0 ? 0 : ((totalSavings - investment) / investment) * 100; // Prevent division by zero

    setSavings(totalSavings);
    setRoi(calculatedRoi);
  }, [employees, toolCost, timeSaved, salary]);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-effect border border-slate-700 rounded-xl w-full max-w-3xl"
        onClick={e => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row justify-between items-center border-b border-slate-700 p-6">
          <CardTitle className="text-white flex items-center gap-2"><Calculator className="w-5 h-5 text-sky-400" /> ROI Calculator</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-700">
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent className="p-6 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label className="flex justify-between text-slate-300">Number of Employees <span className="text-white font-bold">{employees}</span></Label>
              <Slider value={[employees]} onValueChange={(val) => setEmployees(val[0])} min={25} max={500} step={5} className="mt-2" />
            </div>
            <div>
              <Label className="flex justify-between text-slate-300">Consolidated Tool Cost ($/mo) <span className="text-white font-bold">${toolCost.toLocaleString()}</span></Label>
              <Slider value={[toolCost]} onValueChange={(val) => setToolCost(val[0])} min={100} max={2000} step={50} className="mt-2" />
            </div>
            <div>
              <Label className="flex justify-between text-slate-300">Time Saved per Employee (hrs/wk) <span className="text-white font-bold">{timeSaved}</span></Label>
              <Slider value={[timeSaved]} onValueChange={(val) => setTimeSaved(val[0])} min={0.5} max={5} step={0.5} className="mt-2" />
            </div>
             <div>
              <Label className="flex justify-between text-slate-300">Avg. Employee Salary <span className="text-white font-bold">${salary.toLocaleString()}</span></Label>
              <Slider value={[salary]} onValueChange={(val) => setSalary(val[0])} min={50000} max={150000} step={5000} className="mt-2" />
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6 text-center flex flex-col justify-center">
            <p className="text-slate-400">Estimated Annual Savings</p>
            <p className="text-4xl font-bold text-emerald-400 my-2">${Math.round(savings).toLocaleString()}</p>
            <p className="text-slate-400">Estimated ROI (1-Year)</p>
            <p className="text-2xl font-bold text-white">{Math.round(roi)}%</p>
          </div>
        </CardContent>
      </motion.div>
    </div>
  )
};

const DemoRequestModal = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Demo Request Submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-effect border border-slate-700 rounded-xl w-full max-w-xl"
        onClick={e => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row justify-between items-center border-b border-slate-700 p-6">
          <CardTitle className="text-white flex items-center gap-2"><Video className="w-5 h-5 text-sky-400" /> Request a Demo</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-700">
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-slate-300">Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
            </div>
            <div>
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
            </div>
            <div>
              <Label htmlFor="company" className="text-slate-300">Company</Label>
              <Input id="company" value={formData.company} onChange={handleChange} className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
            </div>
            <div>
              <Label htmlFor="message" className="text-slate-300">Message (Optional)</Label>
              <Textarea id="message" value={formData.message} onChange={handleChange} rows="4" className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
            </div>
            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">Submit Request</Button>
          </form>
        </CardContent>
      </motion.div>
    </div>
  );
};

const AddToEvaluationModal = ({ onClose }) => {
  const [note, setNote] = useState('');

  const handleAdd = () => {
    console.log('Added to evaluation with note:', note);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-effect border border-slate-700 rounded-xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row justify-between items-center border-b border-slate-700 p-6">
          <CardTitle className="text-white flex items-center gap-2"><PlusCircle className="w-5 h-5 text-sky-400" /> Add to Evaluation</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-700">
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-slate-300">This plan will be added to your active evaluation. You can review and compare it later.</p>
          <div>
            <Label htmlFor="evaluation-note" className="text-slate-300">Add a private note (Optional)</Label>
            <Textarea id="evaluation-note" value={note} onChange={(e) => setNote(e.target.value)} rows="3" className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
          </div>
          <Button onClick={handleAdd} className="w-full bg-sky-600 hover:bg-sky-700 text-white">Confirm Add</Button>
        </CardContent>
      </motion.div>
    </div>
  );
};

const SharePlanModal = ({ onClose }) => {
  const [shareOption, setShareOption] = useState('link');
  const shareLink = "https://your-deep-stack-platform.com/share/notion-enterprise-plan-123"; // Example link

  const handleShare = () => {
    if (shareOption === 'link') {
      navigator.clipboard.writeText(shareLink).then(() => {
        alert('Share link copied to clipboard!');
        onClose();
      });
    } else {
      console.log('Sharing via email...');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-effect border border-slate-700 rounded-xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row justify-between items-center border-b border-slate-700 p-6">
          <CardTitle className="text-white flex items-center gap-2"><Share2 className="w-5 h-5 text-sky-400" /> Share Plan</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-700">
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <RadioGroup value={shareOption} onValueChange={setShareOption} className="space-y-4">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="link" id="share-link" />
              <Label htmlFor="share-link" className="flex items-center gap-2 text-slate-300">
                <Link2 className="w-4 h-4" /> Copy Shareable Link
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="email" id="share-email" />
              <Label htmlFor="share-email" className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4" /> Send via Email
              </Label>
            </div>
          </RadioGroup>
          {shareOption === 'link' && (
            <div className="flex items-center space-x-2">
              <Input readOnly value={shareLink} className="flex-grow bg-slate-800/50 border-slate-700 text-white" />
              <Button onClick={handleShare} className="bg-sky-600 hover:bg-sky-700 text-white">Copy</Button>
            </div>
          )}
          {shareOption === 'email' && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="email-recipients" className="text-slate-300">Recipient Email(s)</Label>
                <Input id="email-recipients" placeholder="e.g., jane@example.com, john@example.com" className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
              </div>
              <div>
                <Label htmlFor="email-message" className="text-slate-300">Message (Optional)</Label>
                <Textarea id="email-message" rows="3" className="mt-1 bg-slate-800/50 border-slate-700 text-white" />
              </div>
              <Button onClick={handleShare} className="w-full bg-sky-600 hover:bg-sky-700 text-white">Send Email</Button>
            </div>
          )}
        </CardContent>
      </motion.div>
    </div>
  );
};

const ConnectModal = ({ peer, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Connecting with ${peer.name}. Message:`, message);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-effect border border-slate-700 rounded-xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row justify-between items-center border-b border-slate-700 p-6">
          <CardTitle className="text-white flex items-center gap-2"><Users className="w-5 h-5 text-sky-400" /> Connect with {peer.name}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-700">
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <img src={peer.avatar} alt={peer.name} className="w-16 h-16 rounded-full" />
            <div>
              <p className="font-semibold text-white text-lg">{peer.name}</p>
              <p className="text-sm text-slate-400">{peer.title}</p>
            </div>
          </div>
          <p className="text-slate-300">Send a connection request to {peer.name}.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="connect-message" className="text-slate-300">Message (Optional)</Label>
              <Textarea
                id="connect-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                placeholder={`Hi ${peer.name}, I'm interested in learning about your experience with Notion Enterprise.`}
                className="mt-1 bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">Send Connection Request</Button>
          </form>
        </CardContent>
      </motion.div>
    </div>
  );
};


export default function NotionDeepStackPlan() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [showROIModal, setShowROIModal] = useState(false);

  const notionData = {
    name: 'Notion Enterprise',
    tagline: 'All-in-One Enterprise Workspace',
    logo: 'https://logo.clearbit.com/notion.so',
    matchScore: 89,
    highlights: [
      'Centralize documentation and reduce information silos, saving 2 hours per employee per week.',
      'Replace 4-5 separate tools with one unified workspace, cutting software costs by $15,000/year.',
      'Improve project visibility and accountability with customizable databases and automated workflows.',
    ],
    checklist: [
      'Advanced permission controls and workspace analytics.',
      'SAML SSO integration with your identity provider.',
      'Unlimited file uploads and version history.',
      'Custom templates and branded workspace experiences.',
    ],
    integrations: [
      { name: 'Slack', logo: 'https://logo.clearbit.com/slack.com' },
      { name: 'Google Calendar', logo: 'https://logo.clearbit.com/google.com' },
      { name: 'Figma', logo: 'https://logo.clearbit.com/figma.com' },
      { name: 'GitHub', logo: 'https://logo.clearbit.com/github.com' },
      { name: 'Zapier', logo: 'https://logo.clearbit.com/zapier.com' },
      { name: 'Trello', logo: 'https://logo.clearbit.com/trello.com' },
    ],
    security: [
      'SOC 2 Type 2 compliance with regular audits',
      'SAML SSO and SCIM provisioning',
      'Advanced audit logs and workspace analytics',
      'Data residency options and encryption at rest',
    ],
    support: [
      'Priority email support with dedicated success manager',
      'Custom onboarding and training sessions',
      'Notion Academy with certification programs',
      'Community forums and template gallery',
    ],
    peers: [
      { name: 'Alex Thompson', title: 'COO at Innovation Labs', avatar: 'https://i.pravatar.cc/150?u=alex' },
      { name: 'Maria Santos', title: 'Knowledge Manager at Scale Up Inc.', avatar: 'https://i.pravatar.cc/150?u=maria' },
    ],
  };
  
  const handleConnectClick = (peer) => {
    setSelectedPeer(peer);
    setShowConnectModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-8">
        <div className="max-w-screen-2xl mx-auto">
          <header className="flex items-center gap-4 mb-8">
            <img src={notionData.logo} alt={`${notionData.name} logo`} className="w-16 h-16 bg-white p-2 rounded-xl" />
            <div>
              <h1 className="text-4xl font-bold text-white">{notionData.name}</h1>
              <p className="text-lg text-slate-400">{notionData.tagline}</p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Content */}
            <main className="lg:col-span-2 space-y-10">
              <SectionCard icon={<Target className="w-6 h-6 text-sky-400" />} title="Deep Stack Plan Highlights">
                <div className="space-y-4">
                  {notionData.highlights.map((text, i) => <p key={i}>{text}</p>)}
                  <ul className="space-y-3 pt-2">
                    {notionData.checklist.map((item, i) => <HighlightItem key={i}>{item}</HighlightItem>)}
                  </ul>
                </div>
              </SectionCard>

              <SectionCard icon={<Link2 className="w-6 h-6 text-sky-400" />} title="Integration Compatibility">
                <p className="mb-4">Notion's flexible API and automation capabilities integrate with your favorite tools:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {notionData.integrations.map(int => <IntegrationItem key={int.name} {...int} />)}
                </div>
              </SectionCard>

              <SectionCard icon={<Shield className="w-6 h-6 text-sky-400" />} title="Security & Compliance">
                <p className="mb-4">Enterprise-grade security and compliance for growing organizations:</p>
                <ul className="space-y-3">
                  {notionData.security.map((item, i) => <HighlightItem key={i}>{item}</HighlightItem>)}
                </ul>
              </SectionCard>

              <SectionCard icon={<LifeBuoy className="w-6 h-6 text-sky-400" />} title="Customer Support & Training">
                <p className="mb-4">Comprehensive support and learning resources for enterprise teams:</p>
                <ul className="space-y-3">
                  {notionData.support.map((item, i) => <HighlightItem key={i}>{item}</HighlightItem>)}
                </ul>
              </SectionCard>
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6 sticky top-8">
               <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                      <div className="flex justify-between items-start">
                          <CardTitle className="text-white text-lg">Match Score</CardTitle>
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-lg py-1 px-3">
                              {notionData.matchScore}%
                          </Badge>
                      </div>
                  </CardHeader>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={() => setShowDemoModal(true)} className="w-full bg-sky-600 hover:bg-sky-700 text-white"><Video className="w-4 h-4 mr-2" /> Request a Demo</Button>
                  <Button onClick={() => setShowEvaluationModal(true)} variant="outline" className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"><PlusCircle className="w-4 h-4 mr-2" /> Add to Evaluation</Button>
                  <Button onClick={() => setShowShareModal(true)} variant="outline" className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"><Share2 className="w-4 h-4 mr-2" /> Share Plan</Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                   <CardTitle className="text-white text-lg flex items-center gap-2"><Users className="w-5 h-5 text-sky-400" /> Peer Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {notionData.peers.map(peer => (
                     <div key={peer.name} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <img src={peer.avatar} alt={peer.name} className="w-10 h-10 rounded-full" />
                         <div>
                           <p className="font-semibold text-white">{peer.name}</p>
                           <p className="text-xs text-slate-400">{peer.title}</p>
                         </div>
                       </div>
                       <Button onClick={() => handleConnectClick(peer)} variant="outline" className="h-8 bg-sky-600 hover:bg-sky-700 text-white border-sky-600">Connect</Button>
                     </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                 <CardHeader>
                    <CardTitle className="text-white text-lg flex items-center gap-2"><Calculator className="w-5 h-5 text-sky-400" /> ROI Calculator</CardTitle>
                 </CardHeader>
                <CardContent>
                   <p className="text-sm text-slate-300 mb-4">Estimate your potential return on investment.</p>
                  <Button onClick={() => setShowROIModal(true)} className="w-full bg-sky-600 hover:bg-sky-700 text-white">Launch Calculator <ArrowRight className="w-4 h-4 ml-2" /></Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                   <CardTitle className="text-white text-lg flex items-center gap-2"><Calendar className="w-5 h-5 text-sky-400" /> Implementation Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-300">A typical Notion Enterprise implementation takes 6-10 weeks.</p>
                  <p className="text-xs text-slate-400 mt-2">Includes discovery, workspace setup, data migration, and team training.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                 <CardHeader>
                   <CardTitle className="text-white text-lg flex items-center gap-2"><TrendingUp className="w-5 h-5 text-sky-400" /> Market Trends</CardTitle>
                 </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-300">
                  <p>The market for collaboration tools is growing at 14% annually.</p>
                  <p>Knowledge management systems are a top priority for 60% of CIOs in 2024.</p>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>
      
      {showDemoModal && <DemoRequestModal onClose={() => setShowDemoModal(false)} />}
      {showEvaluationModal && <AddToEvaluationModal onClose={() => setShowEvaluationModal(false)} />}
      {showShareModal && <SharePlanModal onClose={() => setShowShareModal(false)} />}
      {showConnectModal && selectedPeer && <ConnectModal peer={selectedPeer} onClose={() => setShowConnectModal(false)} />}
      {showROIModal && <ROICalculatorModal onClose={() => setShowROIModal(false)} />}
    </>
  );
}
