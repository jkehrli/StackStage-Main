
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
  Clock,
  ClipboardCopy
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

const DemoRequestModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, company, message });
    alert('Demo Request Submitted!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-effect bg-slate-800/60 backdrop-blur-md bg-clip-padding border border-slate-700 rounded-xl w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row justify-between items-center border-b border-slate-700 py-4 px-6">
          <CardTitle className="text-white flex items-center gap-2 text-xl"><Video className="w-5 h-5 text-sky-400" /> Request a Demo</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-700">
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="demo-name" className="text-slate-300">Your Name</Label>
              <Input id="demo-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="mt-1 bg-slate-700/50 border-slate-600 text-white" required />
            </div>
            <div>
              <Label htmlFor="demo-email" className="text-slate-300">Work Email</Label>
              <Input id="demo-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john.doe@example.com" className="mt-1 bg-slate-700/50 border-slate-600 text-white" required />
            </div>
            <div>
              <Label htmlFor="demo-company" className="text-slate-300">Company</Label>
              <Input id="demo-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Corp" className="mt-1 bg-slate-700/50 border-slate-600 text-white" required />
            </div>
            <div>
              <Label htmlFor="demo-message" className="text-slate-300">Message (Optional)</Label>
              <Textarea id="demo-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your needs..." className="mt-1 bg-slate-700/50 border-slate-600 text-white" rows={3} />
            </div>
            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">Submit Request</Button>
          </form>
        </CardContent>
      </motion.div>
    </div>
  );
};

const AddToEvaluationModal = ({ onClose }) => {
  const [evaluationType, setEvaluationType] = useState('active_evaluation');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ evaluationType, notes });
    alert('Added to Evaluation!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-effect bg-slate-800/60 backdrop-blur-md bg-clip-padding border border-slate-700 rounded-xl w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row justify-between items-center border-b border-slate-700 py-4 px-6">
          <CardTitle className="text-white flex items-center gap-2 text-xl"><PlusCircle className="w-5 h-5 text-sky-400" /> Add to Evaluation</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-700">
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-slate-300">Evaluation Status</Label>
              <RadioGroup value={evaluationType} onValueChange={setEvaluationType} className="flex flex-col space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="shortlist" id="shortlist" />
                  <Label htmlFor="shortlist" className="text-slate-300">Shortlist</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active_evaluation" id="active_evaluation" />
                  <Label htmlFor="active_evaluation" className="text-slate-300">Active Evaluation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monitor" id="monitor" />
                  <Label htmlFor="monitor" className="text-slate-300">Monitor for Future</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="evaluation-notes" className="text-slate-300">Notes (Optional)</Label>
              <Textarea id="evaluation-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add any specific notes for this evaluation..." className="mt-1 bg-slate-700/50 border-slate-600 text-white" rows={3} />
            </div>
            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">Confirm</Button>
          </form>
        </CardContent>
      </motion.div>
    </div>
  );
};

const SharePlanModal = ({ onClose }) => {
  const [shareMethod, setShareMethod] = useState('email');
  const [email, setEmail] = useState('');
  const shareLink = "https://example.com/slack-deep-stack-plan-shared-link-123"; // Dummy link

  const handleShareEmail = (e) => {
    e.preventDefault();
    console.log({ shareMethod, email });
    alert(`Plan shared via email to ${email}!`);
    onClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Share link copied to clipboard!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-effect bg-slate-800/60 backdrop-blur-md bg-clip-padding border border-slate-700 rounded-xl w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row justify-between items-center border-b border-slate-700 py-4 px-6">
          <CardTitle className="text-white flex items-center gap-2 text-xl"><Share2 className="w-5 h-5 text-sky-400" /> Share Deep Stack Plan</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-700">
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <RadioGroup value={shareMethod} onValueChange={setShareMethod} className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="share-email" />
              <Label htmlFor="share-email" className="text-slate-300">Share via Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="link" id="share-link" />
              <Label htmlFor="share-link" className="text-slate-300">Get Shareable Link</Label>
            </div>
          </RadioGroup>

          {shareMethod === 'email' ? (
            <form onSubmit={handleShareEmail} className="space-y-4">
              <div>
                <Label htmlFor="share-email-input" className="text-slate-300">Recipient Email</Label>
                <Input id="share-email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="colleague@example.com" className="mt-1 bg-slate-700/50 border-slate-600 text-white" required />
              </div>
              <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white"><Mail className="w-4 h-4 mr-2" /> Send Email</Button>
            </form>
          ) : (
            <div className="space-y-4">
              <Label htmlFor="share-link-display" className="text-slate-300">Shareable Link</Label>
              <div className="flex space-x-2">
                <Input id="share-link-display" value={shareLink} readOnly className="flex-grow bg-slate-700/50 border-slate-600 text-white" />
                <Button onClick={handleCopyLink} variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"><ClipboardCopy className="w-4 h-4" /></Button>
              </div>
              <p className="text-xs text-slate-400">Anyone with the link can view this plan.</p>
            </div>
          )}
        </CardContent>
      </motion.div>
    </div>
  );
};

const ConnectModal = ({ peer, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(`Connecting with ${peer.name}: ${message}`);
    alert(`Message sent to ${peer.name}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-effect bg-slate-800/60 backdrop-blur-md bg-clip-padding border border-slate-700 rounded-xl w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row justify-between items-center border-b border-slate-700 py-4 px-6">
          <CardTitle className="text-white flex items-center gap-2 text-xl"><MessageSquare className="w-5 h-5 text-sky-400" /> Connect with {peer.name}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-700">
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <img src={peer.avatar} alt={peer.name} className="w-16 h-16 rounded-full" />
            <div>
              <p className="font-semibold text-white text-lg">{peer.name}</p>
              <p className="text-sm text-slate-400">{peer.title}</p>
            </div>
          </div>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <Label htmlFor="connect-message" className="text-slate-300">Your Message</Label>
              <Textarea id="connect-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`Hi ${peer.name}, I'm interested in learning about your experience with Slack Enterprise Grid...`} className="mt-1 bg-slate-700/50 border-slate-600 text-white" rows={4} required />
            </div>
            <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">Send Message</Button>
          </form>
        </CardContent>
      </motion.div>
    </div>
  );
};

const ROICalculatorModal = ({ onClose }) => {
  const [employees, setEmployees] = useState(250);
  const [salary, setSalary] = useState(75000);
  const [timeSaved, setTimeSaved] = useState(30);
  const [roi, setRoi] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const numEmployees = Number(employees);
    const numSalary = Number(salary);
    const numTimeSaved = Number(timeSaved);

    const hourlyRate = numSalary / 2080; // 2080 working hours in a year (40 hours/week * 52 weeks)
    const dailyTimeSavingsValue = (numTimeSaved / 60) * hourlyRate * numEmployees;
    const annualSavings = dailyTimeSavingsValue * 260; // 260 working days in a year (5 days/week * 52 weeks)
    const investment = 12.50 * 12 * numEmployees; // Assuming Slack Pro cost per user per month for investment calculation

    let calculatedRoi = 0;
    if (investment > 0) { // Prevent division by zero
      calculatedRoi = ((annualSavings - investment) / investment) * 100;
    }

    setSavings(annualSavings);
    setRoi(calculatedRoi);
  }, [employees, salary, timeSaved]);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-effect bg-slate-800/60 backdrop-blur-md bg-clip-padding border border-slate-700 rounded-xl w-full max-w-3xl"
        onClick={e => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row justify-between items-center border-b border-slate-700 py-4 px-6">
          <CardTitle className="text-white flex items-center gap-2 text-xl"><Calculator className="w-5 h-5 text-sky-400" /> ROI Calculator</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-slate-700">
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent className="p-6 grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label className="flex justify-between text-slate-300">Number of Employees <span className="text-white font-bold">{employees}</span></Label>
              <Slider value={[employees]} onValueChange={(val) => setEmployees(val[0])} min={50} max={1000} step={10} className="mt-2" />
            </div>
            <div>
              <Label className="flex justify-between text-slate-300">Avg. Employee Salary <span className="text-white font-bold">${salary.toLocaleString()}</span></Label>
              <Slider value={[salary]} onValueChange={(val) => setSalary(val[0])} min={50000} max={150000} step={5000} className="mt-2" />
            </div>
            <div>
              <Label className="flex justify-between text-slate-300">Time Saved per Day (mins) <span className="text-white font-bold">{timeSaved}</span></Label>
              <Slider value={[timeSaved]} onValueChange={(val) => setTimeSaved(val[0])} min={10} max={90} step={5} className="mt-2" />
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6 text-center flex flex-col justify-center border border-slate-700">
            <p className="text-slate-400">Estimated Annual Time Savings</p>
            <p className="text-4xl font-bold text-emerald-400 my-2">${Math.round(savings).toLocaleString()}</p>
            <p className="text-slate-400 mt-4">Estimated ROI (1-Year)</p>
            <p className="text-2xl font-bold text-white">{Math.round(roi)}%</p>
          </div>
        </CardContent>
      </motion.div>
    </div>
  )
};

export default function SlackDeepStackPlan() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [showROIModal, setShowROIModal] = useState(false);

  const slackData = {
    name: 'Slack Enterprise Grid',
    tagline: 'Enterprise Communication Platform',
    logo: 'https://logo.clearbit.com/slack.com',
    matchScore: 91,
    highlights: [
      'Boost team collaboration efficiency by 45% with organized channels and workflow integrations.',
      'Reduce email volume by 70% while improving response times and decision-making speed.',
      'Enhance remote work productivity with advanced search, file sharing, and app integrations.',
    ],
    checklist: [
      'Enterprise Key Management for enhanced security control.',
      'Advanced compliance and data governance tools.',
      'Unlimited workspace creation and cross-org collaboration.',
      'Custom retention policies and legal hold capabilities.',
    ],
    integrations: [
      { name: 'Google Workspace', logo: 'https://logo.clearbit.com/google.com' },
      { name: 'Microsoft Teams', logo: 'https://logo.clearbit.com/microsoft.com' },
      { name: 'Zoom', logo: 'https://logo.clearbit.com/zoom.us' },
      { name: 'Jira', logo: 'https://logo.clearbit.com/atlassian.com' },
      { name: 'Asana', logo: 'https://logo.clearbit.com/asana.com' },
      { name: 'Salesforce', logo: 'https://logo.clearbit.com/salesforce.com' },
    ],
    security: [
      'Enterprise Key Management (EKM) for data sovereignty',
      'SOC 2, SOC 3, ISO 27001, and ISO 27018 certifications',
      'FINRA, HIPAA, and FedRAMP compliance options',
      'Advanced threat protection and DLP capabilities',
    ],
    support: [
      '24/7 support with 4-hour response SLA for critical issues',
      'Dedicated customer success managers',
      'Slack Certified Administrator training programs',
      'White-glove migration and onboarding services',
    ],
    peers: [
      { name: 'David Kim', title: 'Head of IT at Remote First Co.', avatar: 'https://i.pravatar.cc/150?u=david' },
      { name: 'Lisa Rodriguez', title: 'Operations Director at Distributed Inc.', avatar: 'https://i.pravatar.cc/150?u=lisa' },
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
            <img src={slackData.logo} alt={`${slackData.name} logo`} className="w-16 h-16 bg-white p-2 rounded-xl" />
            <div>
              <h1 className="text-4xl font-bold text-white">{slackData.name}</h1>
              <p className="text-lg text-slate-400">{slackData.tagline}</p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Content */}
            <main className="lg:col-span-2 space-y-10">
              <SectionCard icon={<Target className="w-6 h-6 text-sky-400" />} title="Deep Stack Plan Highlights">
                <div className="space-y-4">
                  {slackData.highlights.map((text, i) => <p key={i}>{text}</p>)}
                  <ul className="space-y-3 pt-2">
                    {slackData.checklist.map((item, i) => <HighlightItem key={i}>{item}</HighlightItem>)}
                  </ul>
                </div>
              </SectionCard>

              <SectionCard icon={<Link2 className="w-6 h-6 text-sky-400" />} title="Integration Compatibility">
                <p className="mb-4">Slack Enterprise Grid connects seamlessly with your existing enterprise tools:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {slackData.integrations.map(int => <IntegrationItem key={int.name} {...int} />)}
                </div>
              </SectionCard>

              <SectionCard icon={<Shield className="w-6 h-6 text-sky-400" />} title="Security & Compliance">
                <p className="mb-4">Enterprise-grade security designed for highly regulated industries:</p>
                <ul className="space-y-3">
                  {slackData.security.map((item, i) => <HighlightItem key={i}>{item}</HighlightItem>)}
                </ul>
              </SectionCard>

              <SectionCard icon={<LifeBuoy className="w-6 h-6 text-sky-400" />} title="Customer Support & Training">
                <p className="mb-4">Premium support and resources for enterprise deployment:</p>
                <ul className="space-y-3">
                  {slackData.support.map((item, i) => <HighlightItem key={i}>{item}</HighlightItem>)}
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
                      {slackData.matchScore}%
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
                  {slackData.peers.map(peer => (
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
                  <p className="text-sm text-slate-300">A typical Slack Enterprise Grid implementation takes 4-8 weeks.</p>
                  <p className="text-xs text-slate-400 mt-2">Includes discovery, setup, security review, and team onboarding.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2"><TrendingUp className="w-5 h-5 text-sky-400" /> Market Trends</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-300">
                  <p>75% of Fortune 100 companies use Slack.</p>
                  <p>The collaboration software market is projected to reach $85 billion by 2026.</p>
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
