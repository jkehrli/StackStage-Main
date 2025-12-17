
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
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
  Clock
} from 'lucide-react';

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

// Interactive Modal Components
const DemoRequestModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    timeframe: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => onClose(), 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Request a Demo</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-slate-700 border-slate-600 text-white" required />
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-slate-700 border-slate-600 text-white" required />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company" className="text-slate-300">Company</Label>
                  <Input id="company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="bg-slate-700 border-slate-600 text-white" required />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-slate-300">Phone (Optional)</Label>
                  <Input id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-slate-700 border-slate-600 text-white" />
                </div>
              </div>
              <div>
                <Label className="text-slate-300 mb-3 block">Preferred Timeframe</Label>
                <RadioGroup value={formData.timeframe} onValueChange={(value) => setFormData({...formData, timeframe: value})} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="asap" id="asap" /><Label htmlFor="asap" className="text-slate-300">ASAP</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="week" id="week" /><Label htmlFor="week" className="text-slate-300">This week</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="month" id="month" /><Label htmlFor="month" className="text-slate-300">This month</Label></div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="message" className="text-slate-300">Tell us about your needs</Label>
                <Textarea id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="bg-slate-700 border-slate-600 text-white min-h-[100px]" placeholder="What challenges are you looking to solve?" />
              </div>
              <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white"><Video className="w-4 h-4 mr-2" /> Schedule Demo</Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Demo Requested!</h3>
              <p className="text-slate-300">A specialist will contact you within 24 hours.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AddToEvaluationModal = ({ onClose }) => {
  const [isAdded, setIsAdded] = useState(false);
  const handleAdd = () => { setIsAdded(true); setTimeout(() => onClose(), 2000); };
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Add to Evaluation</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></Button>
          </div>
          {!isAdded ? (
            <div className="space-y-4">
              <p className="text-slate-300">Add Salesforce Sales Cloud to your evaluation list?</p>
              <div className="bg-slate-700/50 rounded-lg p-4"><h3 className="font-semibold text-white mb-2">You'll receive:</h3><ul className="space-y-1 text-sm text-slate-300"><li>• Detailed comparison reports</li><li>• Pricing and feature matrices</li><li>• Implementation timeline</li><li>• ROI calculations</li></ul></div>
              <Button onClick={handleAdd} className="w-full bg-sky-600 hover:bg-sky-700 text-white"><PlusCircle className="w-4 h-4 mr-2" /> Add to Evaluation</Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-1">Added to Evaluation!</h3>
              <p className="text-sm text-slate-300">Salesforce is now in your evaluation workspace.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SharePlanModal = ({ onClose }) => {
  const [shareMethod, setShareMethod] = useState('');
  const [isShared, setIsShared] = useState(false);
  const handleShare = () => { setIsShared(true); setTimeout(() => onClose(), 2000); };
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Share Plan</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></Button>
          </div>
          {!isShared ? (
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300 mb-3 block">How would you like to share?</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant={shareMethod === 'email' ? 'default' : 'outline'} onClick={() => setShareMethod('email')} className={`flex flex-col gap-2 h-16 ${shareMethod === 'email' ? 'bg-sky-600 hover:bg-sky-700 text-white' : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'}`}><Mail className="w-4 h-4" /><span className="text-xs">Email</span></Button>
                  <Button variant={shareMethod === 'link' ? 'default' : 'outline'} onClick={() => setShareMethod('link')} className={`flex flex-col gap-2 h-16 ${shareMethod === 'link' ? 'bg-sky-600 hover:bg-sky-700 text-white' : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'}`}><Link2 className="w-4 h-4" /><span className="text-xs">Link</span></Button>
                  <Button variant={shareMethod === 'slack' ? 'default' : 'outline'} onClick={() => setShareMethod('slack')} className={`flex flex-col gap-2 h-16 ${shareMethod === 'slack' ? 'bg-sky-600 hover:bg-sky-700 text-white' : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'}`}><MessageSquare className="w-4 h-4" /><span className="text-xs">Slack</span></Button>
                </div>
              </div>
              {shareMethod === 'email' && (
                <div>
                  <Label htmlFor="email-recipients" className="text-slate-300">Recipients (comma separated)</Label>
                  <Input id="email-recipients" type="email" placeholder="john.doe@example.com" className="bg-slate-700 border-slate-600 text-white" />
                </div>
              )}
              {shareMethod === 'link' && (
                <div>
                  <Label htmlFor="share-link" className="text-slate-300">Shareable Link</Label>
                  <Input id="share-link" readOnly value="https://deepstack.ai/plan/salesforce-sales-cloud-abc123xyz" className="bg-slate-700 border-slate-600 text-white" />
                </div>
              )}
              {shareMethod === 'slack' && (
                <div>
                  <Label htmlFor="slack-channel" className="text-slate-300">Slack Channel or User</Label>
                  <Input id="slack-channel" placeholder="#sales-team or @john.doe" className="bg-slate-700 border-slate-600 text-white" />
                </div>
              )}
              <Button onClick={handleShare} disabled={!shareMethod} className="w-full bg-sky-600 hover:bg-sky-700 text-white"><Share2 className="w-4 h-4 mr-2" /> Share Plan</Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-1">Plan Shared!</h3>
              <p className="text-sm text-slate-300">Your evaluation plan has been shared.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ConnectModal = ({ peer, onClose }) => {
  const [isConnected, setIsConnected] = useState(false);
  const handleConnect = () => { setIsConnected(true); setTimeout(() => onClose(), 2000); };
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Connect with {peer.name.split(' ')[0]}</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></Button>
          </div>
          {!isConnected ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg"><img src={peer.avatar} alt={peer.name} className="w-12 h-12 rounded-full" /><div><p className="font-semibold text-white">{peer.name}</p><p className="text-xs text-slate-400">{peer.title}</p></div></div>
              <div><Label htmlFor="connect-message" className="text-slate-300">Connection Message</Label><Textarea id="connect-message" defaultValue={`Hi ${peer.name.split(' ')[0]}, I saw your experience with Salesforce...`} className="bg-slate-700 border-slate-600 text-white min-h-[100px]" /></div>
              <Button onClick={handleConnect} className="w-full bg-sky-600 hover:bg-sky-700 text-white"><Users className="w-4 h-4 mr-2" /> Send Connection Request</Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-1">Connection Sent!</h3>
              <p className="text-sm text-slate-300">Your message has been sent.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ROICalculatorModal = ({ onClose }) => {
  const [inputs, setInputs] = useState({ currentSpend: '', teamSize: '', priority: 'efficiency' });
  const [results, setResults] = useState(null);

  const calculateROI = () => { 
    // Placeholder calculation logic based on typical ROI outcomes for software
    const spend = parseFloat(inputs.currentSpend) || 0;
    const size = parseInt(inputs.teamSize) || 0;
    
    let costSavings = spend * 0.15; // 15% savings on current tools
    let productivityGain = size * 8000; // $8k per rep productivity gain
    if (inputs.priority === 'growth') {
        productivityGain = size * 12000; // Higher gain for growth focus
    }

    const totalBenefit = costSavings + productivityGain;
    const investment = size * 1500; // Approx $1500 per rep for a year of new tool cost
    
    const calculatedRoi = investment > 0 ? ((totalBenefit - investment) / investment) * 100 : 0;
    const paybackPeriod = investment > 0 ? Math.ceil(investment / (totalBenefit / 12)) : 0;

    setResults({ 
      costSavings: costSavings, 
      productivityGain: productivityGain, 
      totalBenefit: totalBenefit, 
      roi: calculatedRoi, 
      paybackPeriod: paybackPeriod 
    }); 
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">ROI Calculator</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></Button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Your Current Situation</h3>
              <div><Label htmlFor="current-spend" className="text-slate-300">Current Sales Tools Spend (Annual)</Label><Input id="current-spend" type="number" value={inputs.currentSpend} onChange={(e) => setInputs({...inputs, currentSpend: e.target.value})} className="bg-slate-700 border-slate-600 text-white" placeholder="75000"/></div>
              <div><Label htmlFor="team-size" className="text-slate-300">Sales Team Size</Label><Input id="team-size" type="number" value={inputs.teamSize} onChange={(e) => setInputs({...inputs, teamSize: e.target.value})} className="bg-slate-700 border-slate-600 text-white" placeholder="50"/></div>
              <div><Label className="text-slate-300 mb-3 block">Primary Goal</Label><RadioGroup value={inputs.priority} onValueChange={(value) => setInputs({...inputs, priority: value})} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="efficiency" id="efficiency" /><Label htmlFor="efficiency" className="text-slate-300">Improve Efficiency</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="growth" id="growth" /><Label htmlFor="growth" className="text-slate-300">Drive Growth</Label></div>
                </RadioGroup>
              </div>
              <Button onClick={calculateROI} className="w-full bg-sky-600 hover:bg-sky-700 text-white"><Calculator className="w-4 h-4 mr-2" /> Calculate ROI</Button>
            </div>
            {results && (
              <div className="bg-slate-800/50 rounded-lg p-6 text-center flex flex-col justify-center">
                <p className="text-slate-400 text-sm">Estimated Annual Benefit</p>
                <p className="text-4xl font-bold text-emerald-400 my-2">${Math.round(results.totalBenefit).toLocaleString()}</p>
                <p className="text-slate-400 text-sm">Estimated ROI (1-Year)</p>
                <p className="text-3xl font-bold text-white mt-1">{Math.round(results.roi)}%</p>
                <p className="text-slate-400 text-sm mt-2">Estimated Payback Period</p>
                <p className="text-2xl font-bold text-white mt-1">{results.paybackPeriod} Months</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default function SalesforceDeepStackPlan() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [showROIModal, setShowROIModal] = useState(false);

  const salesforceData = {
    name: 'Salesforce Sales Cloud',
    tagline: 'Enterprise CRM Platform',
    logo: 'https://logo.clearbit.com/salesforce.com',
    matchScore: 94,
    highlights: [
      'Increase sales productivity by 35% with automated lead routing and opportunity management workflows.',
      'Improve forecasting accuracy by 40% using AI-powered pipeline analytics and predictive scoring.',
      'Reduce data entry time by 60% through intelligent automation and seamless third-party integrations.',
    ],
    checklist: [
      'Einstein AI for predictive lead scoring and opportunity insights.',
      'Comprehensive pipeline management with automated workflows.',
      'Advanced reporting and forecasting capabilities.',
      'Mobile-first design for sales team productivity on-the-go.',
    ],
    integrations: [
      { name: 'Pardot', logo: 'https://logo.clearbit.com/pardot.com' },
      { name: 'Slack', logo: 'https://logo.clearbit.com/slack.com' },
      { name: 'DocuSign', logo: 'https://logo.clearbit.com/docusign.com' },
      { name: 'Mailchimp', logo: 'https://logo.clearbit.com/mailchimp.com' },
      { name: 'Zoom', logo: 'https://logo.clearbit.com/zoom.us' },
      { name: 'LinkedIn Sales Navigator', logo: 'https://logo.clearbit.com/linkedin.com' },
    ],
    security: [
      'Enterprise-grade security with Shield Platform Encryption',
      'Multi-factor authentication and single sign-on',
      'Compliance with GDPR, HIPAA, and SOX requirements',
      'Real-time monitoring and threat detection',
    ],
    support: [
      'Premier Success Plans with dedicated success managers',
      'Trailhead learning platform with 1000+ modules',
      '24/7 technical support and emergency response',
      'Extensive partner ecosystem and consulting services',
    ],
    peers: [
      { name: 'Michael Chen', title: 'VP of Sales at TechCorp Inc.', avatar: 'https://i.pravatar.cc/150?u=michael' },
      { name: 'Sarah Johnson', title: 'Sales Operations Manager at Growth Co.', avatar: 'https://i.pravatar.cc/150?u=sarah' },
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
            <img src={salesforceData.logo} alt={`${salesforceData.name} logo`} className="w-16 h-16 bg-white p-2 rounded-xl" />
            <div>
              <h1 className="text-4xl font-bold text-white">{salesforceData.name}</h1>
              <p className="text-lg text-slate-400">{salesforceData.tagline}</p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Content */}
            <main className="lg:col-span-2 space-y-10">
              <SectionCard icon={<Target className="w-6 h-6 text-sky-400" />} title="Deep Stack Plan Highlights">
                <div className="space-y-4">
                  {salesforceData.highlights.map((text, i) => <p key={i}>{text}</p>)}
                  <ul className="space-y-3 pt-2">
                    {salesforceData.checklist.map((item, i) => <HighlightItem key={i}>{item}</HighlightItem>)}
                  </ul>
                </div>
              </SectionCard>

              <SectionCard icon={<Link2 className="w-6 h-6 text-sky-400" />} title="Integration Compatibility">
                <p className="mb-4">Salesforce's robust API ecosystem and AppExchange marketplace provide seamless integration with:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {salesforceData.integrations.map(int => <IntegrationItem key={int.name} {...int} />)}
                </div>
              </SectionCard>

              <SectionCard icon={<Shield className="w-6 h-6 text-sky-400" />} title="Security & Compliance">
                <p className="mb-4">Salesforce maintains enterprise-grade security with comprehensive compliance:</p>
                <ul className="space-y-3">
                  {salesforceData.security.map((item, i) => <HighlightItem key={i}>{item}</HighlightItem>)}
                </ul>
              </SectionCard>
              
              <SectionCard icon={<LifeBuoy className="w-6 h-6 text-sky-400" />} title="Customer Support & Training">
                <p className="mb-4">Access Salesforce's world-class support infrastructure and training resources:</p>
                <ul className="space-y-3">
                  {salesforceData.support.map((item, i) => <HighlightItem key={i}>{item}</HighlightItem>)}
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
                              {salesforceData.matchScore}%
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
                  {salesforceData.peers.map(peer => (
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
                  <p className="text-sm text-slate-300">A typical Salesforce Sales Cloud implementation takes 12-16 weeks.</p>
                  <p className="text-xs text-slate-400 mt-2">Includes discovery, setup, data migration, team training, and launch.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                 <CardHeader>
                   <CardTitle className="text-white text-lg flex items-center gap-2"><TrendingUp className="w-5 h-5 text-sky-400" /> Market Trends</CardTitle>
                 </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-300">
                  <p>Forrester reports a 45% increase in CRM spend for enterprises in 2024.</p>
                  <p>AI in CRM market is expected to reach $73 billion by 2028.</p>
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
