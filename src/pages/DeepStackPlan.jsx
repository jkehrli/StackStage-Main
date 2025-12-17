
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
                  <Input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company" className="text-slate-300">Company</Label>
                  <Input 
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-slate-300">Phone (Optional)</Label>
                  <Input 
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              <div>
                <Label className="text-slate-300 mb-3 block">Preferred Timeframe</Label>
                <RadioGroup value={formData.timeframe} onValueChange={(value) => setFormData({...formData, timeframe: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="asap" id="asap" />
                    <Label htmlFor="asap" className="text-slate-300">ASAP</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="week" id="week" />
                    <Label htmlFor="week" className="text-slate-300">This week</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="month" id="month" />
                    <Label htmlFor="month" className="text-slate-300">This month</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="message" className="text-slate-300">Tell us about your needs</Label>
                <Textarea 
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                  placeholder="What challenges are you looking to solve?"
                />
              </div>
              <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                <Video className="w-4 h-4 mr-2" /> Schedule Demo
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Demo Requested!</h3>
              <p className="text-slate-300">A HubSpot specialist will contact you within 24 hours to schedule your personalized demo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AddToEvaluationModal = ({ onClose }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    setIsAdded(true);
    setTimeout(() => onClose(), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Add to Evaluation</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {!isAdded ? (
            <div className="space-y-4">
              <p className="text-slate-300">Add HubSpot Marketing Hub to your active evaluation list?</p>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">You'll receive:</h3>
                <ul className="space-y-1 text-sm text-slate-300">
                  <li>• Detailed comparison reports</li>
                  <li>• Pricing and feature matrices</li>
                  <li>• Implementation timeline</li>
                  <li>• ROI calculations</li>
                </ul>
              </div>
              <Button onClick={handleAdd} className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                <PlusCircle className="w-4 h-4 mr-2" /> Add to Evaluation
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-1">Added to Evaluation!</h3>
              <p className="text-sm text-slate-300">HubSpot is now in your evaluation workspace.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SharePlanModal = ({ onClose }) => {
  const [shareMethod, setShareMethod] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isShared, setIsShared] = useState(false);

  const handleShare = () => {
    setIsShared(true);
    setTimeout(() => onClose(), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Share Plan</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {!isShared ? (
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300 mb-3 block">How would you like to share?</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={shareMethod === 'email' ? 'default' : 'outline'}
                    onClick={() => setShareMethod('email')}
                    className="flex flex-col gap-2 h-16 bg-slate-700 border-slate-600"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-xs">Email</span>
                  </Button>
                  <Button
                    variant={shareMethod === 'link' ? 'default' : 'outline'}
                    onClick={() => setShareMethod('link')}
                    className="flex flex-col gap-2 h-16 bg-slate-700 border-slate-600"
                  >
                    <Link2 className="w-4 h-4" />
                    <span className="text-xs">Link</span>
                  </Button>
                  <Button
                    variant={shareMethod === 'slack' ? 'default' : 'outline'}
                    onClick={() => setShareMethod('slack')}
                    className="flex flex-col gap-2 h-16 bg-slate-700 border-slate-600"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs">Slack</span>
                  </Button>
                </div>
              </div>

              {shareMethod === 'email' && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="colleague@company.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-slate-300">Message (Optional)</Label>
                    <Textarea 
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Here's the HubSpot evaluation we discussed..."
                    />
                  </div>
                </div>
              )}

              {shareMethod === 'link' && (
                <div className="space-y-3">
                  <p className="text-slate-300 text-sm">Generate a secure link to share this plan:</p>
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <code className="text-green-400 text-sm">https://stackstage.com/plans/hubspot-marketing-hub-abc123</code>
                  </div>
                </div>
              )}

              {shareMethod === 'slack' && (
                <div className="space-y-3">
                  <p className="text-slate-300 text-sm">Share directly to your Slack workspace:</p>
                  <Input 
                    placeholder="#marketing-team"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              )}

              <Button onClick={handleShare} disabled={!shareMethod} className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                <Share2 className="w-4 h-4 mr-2" /> Share Plan
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-1">Plan Shared!</h3>
              <p className="text-sm text-slate-300">Your HubSpot evaluation plan has been shared successfully.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ConnectModal = ({ peer, onClose }) => {
  const [message, setMessage] = useState(`Hi ${peer.name.split(' ')[0]}, I saw your experience with HubSpot on StackStage. Would love to connect and learn about your implementation!`);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
    setTimeout(() => onClose(), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Connect with {peer.name.split(' ')[0]}</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {!isConnected ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                <img src={peer.avatar} alt={peer.name} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-semibold text-white">{peer.name}</p>
                  <p className="text-xs text-slate-400">{peer.title}</p>
                </div>
              </div>
              <div>
                <Label htmlFor="connect-message" className="text-slate-300">Connection Message</Label>
                <Textarea 
                  id="connect-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                />
              </div>
              <Button onClick={handleConnect} className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                <Users className="w-4 h-4 mr-2" /> Send Connection Request
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-1">Connection Sent!</h3>
              <p className="text-sm text-slate-300">Your message has been sent to {peer.name.split(' ')[0]}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ROICalculatorModal = ({ onClose }) => {
  const [inputs, setInputs] = useState({
    currentSpend: '',
    teamSize: '',
    timeToValue: '3',
    priority: 'efficiency'
  });
  const [results, setResults] = useState(null);

  const calculateROI = () => {
    const spend = parseFloat(inputs.currentSpend) || 0;
    const team = parseFloat(inputs.teamSize) || 0;
    const efficiency = inputs.priority === 'efficiency' ? 0.25 : 0.15;
    const costSavings = spend * 0.3; // 30% cost reduction
    const productivityGain = team * 2000 * efficiency; // hours saved * hourly value
    const totalBenefit = costSavings + productivityGain;
    const roi = ((totalBenefit - 50000) / 50000) * 100; // Assuming $50k investment

    setResults({
      costSavings: Math.round(costSavings),
      productivityGain: Math.round(productivityGain),
      totalBenefit: Math.round(totalBenefit),
      roi: Math.round(roi),
      paybackPeriod: Math.round((50000 / totalBenefit) * 12) // months
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">ROI Calculator</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Your Current Situation</h3>
              <div>
                <Label htmlFor="current-spend" className="text-slate-300">Current Marketing Tools Spend (Annual)</Label>
                <Input 
                  id="current-spend"
                  type="number"
                  value={inputs.currentSpend}
                  onChange={(e) => setInputs({...inputs, currentSpend: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="50000"
                />
              </div>
              <div>
                <Label htmlFor="team-size" className="text-slate-300">Marketing Team Size</Label>
                <Input 
                  id="team-size"
                  type="number"
                  value={inputs.teamSize}
                  onChange={(e) => setInputs({...inputs, teamSize: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="5"
                />
              </div>
              <div>
                <Label className="text-slate-300 mb-3 block">Primary Goal</Label>
                <RadioGroup value={inputs.priority} onValueChange={(value) => setInputs({...inputs, priority: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="efficiency" id="efficiency" />
                    <Label htmlFor="efficiency" className="text-slate-300">Improve Efficiency</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="growth" id="growth" />
                    <Label htmlFor="growth" className="text-slate-300">Drive Growth</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={calculateROI} className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                <Calculator className="w-4 h-4 mr-2" /> Calculate ROI
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-white">Projected Results</h3>
              {results ? (
                <div className="space-y-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Cost Savings</span>
                      <span className="text-emerald-400 font-bold">${results.costSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Productivity Gains</span>
                      <span className="text-emerald-400 font-bold">${results.productivityGain.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Total Annual Benefit</span>
                      <span className="text-emerald-400 font-bold">${results.totalBenefit.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-slate-600 pt-2 mt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">ROI</span>
                        <span className="text-emerald-400 font-bold text-xl">{results.roi}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Payback Period</span>
                        <span className="text-sky-400 font-bold">{results.paybackPeriod} months</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">*Estimates based on industry benchmarks and your inputs</p>
                </div>
              ) : (
                <div className="bg-slate-700/30 rounded-lg p-8 text-center">
                  <DollarSign className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400">Fill in your details to see projected ROI</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DeepStackPlan() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [showROIModal, setShowROIModal] = useState(false);

  const hubspotData = {
    name: 'HubSpot',
    tagline: 'Marketing Automation Platform',
    logo: 'https://logo.clearbit.com/hubspot.com',
    matchScore: 85,
    highlights: [
      'Achieve a 30% increase in lead conversion within the first 6 months through advanced segmentation and personalized automated campaigns.',
      'Reduce customer acquisition cost by 15% by optimizing ad spend and improving lead quality via AI-driven scoring.',
      'Streamline marketing and sales operations, saving an estimated 10 hours/week in manual tasks per team member.',
    ],
    checklist: [
      'Seamless CRM integration for unified customer view.',
      'AI-powered content recommendations and optimization.',
      'Advanced analytics dashboards for real-time performance tracking.',
      'Multi-channel campaign management (email, social, ads).',
    ],
    integrations: [
      { name: 'Salesforce CRM', logo: 'https://logo.clearbit.com/salesforce.com' },
      { name: 'Shopify', logo: 'https://logo.clearbit.com/shopify.com' },
      { name: 'Zendesk', logo: 'https://logo.clearbit.com/zendesk.com' },
      { name: 'Slack', logo: 'https://logo.clearbit.com/slack.com' },
      { name: 'Stripe', logo: 'https://logo.clearbit.com/stripe.com' },
      { name: 'Zoom', logo: 'https://logo.clearbit.com/zoom.us' },
    ],
    security: [
      'SOC 2 Type II Compliance',
      'GDPR & CCPA Ready Tools',
      'ISO 27001 Certification',
      'Regular Security Audits & Penetration Testing',
    ],
    support: [
      '24/7 Phone, Email, & Chat Support',
      'Dedicated Account Manager (Enterprise Plans)',
      'HubSpot Academy Certifications & Courses',
      'Thriving Community Forum & Knowledge Base',
    ],
    peers: [
      { name: 'Jenna Smith', title: 'VP of Marketing at Innovate Inc.', avatar: 'https://i.pravatar.cc/150?u=jenna' },
      { name: 'Carlos Gomez', title: 'Marketing Operations Lead at Solutions Co.', avatar: 'https://i.pravatar.cc/150?u=carlos' },
    ],
  };

  const handleConnectClick = (peer) => {
    setSelectedPeer(peer);
    setShowConnectModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <header className="flex items-center gap-4 mb-8">
          <img src={hubspotData.logo} alt={`${hubspotData.name} logo`} className="w-16 h-16 bg-white p-2 rounded-xl" />
          <div>
            <h1 className="text-4xl font-bold text-white">{hubspotData.name}</h1>
            <p className="text-lg text-slate-400">{hubspotData.tagline}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <main className="lg:col-span-2 space-y-10">
            <SectionCard icon={<Target className="w-6 h-6 text-sky-400" />} title="Deep Stack Plan Highlights">
              <div className="space-y-4">
                {hubspotData.highlights.map((text, i) => <p key={i}>{text}</p>)}
                <ul className="space-y-3 pt-2">
                  {hubspotData.checklist.map((item, i) => <HighlightItem key={i}>{item}</HighlightItem>)}
                </ul>
              </div>
            </SectionCard>

            <SectionCard icon={<Link2 className="w-6 h-6 text-sky-400" />} title="Integration Compatibility">
               <p className="mb-4">HubSpot's open API and extensive app marketplace ensure compatibility with your existing tech stack, including:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hubspotData.integrations.map(int => <IntegrationItem key={int.name} {...int} />)}
              </div>
            </SectionCard>

            <SectionCard icon={<Shield className="w-6 h-6 text-sky-400" />} title="Security & Compliance">
               <p className="mb-4">HubSpot adheres to the highest security standards, including:</p>
              <ul className="space-y-3">
                {hubspotData.security.map((item, i) => <HighlightItem key={i}>{item}</HighlightItem>)}
              </ul>
            </SectionCard>
            
            <SectionCard icon={<LifeBuoy className="w-6 h-6 text-sky-400" />} title="Customer Support & Training">
              <p className="mb-4">Benefit from HubSpot's acclaimed support and vast resources:</p>
              <ul className="space-y-3">
                {hubspotData.support.map((item, i) => <HighlightItem key={i}>{item}</HighlightItem>)}
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
                            {hubspotData.matchScore}%
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
                {hubspotData.peers.map(peer => (
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
                <p className="text-sm text-slate-300">A typical HubSpot Marketing Hub Enterprise implementation takes 8-12 weeks.</p>
                <p className="text-xs text-slate-400 mt-2">Includes discovery, setup, data migration, team training, and launch.</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
               <CardHeader>
                 <CardTitle className="text-white text-lg flex items-center gap-2"><TrendingUp className="w-5 h-5 text-sky-400" /> Market Trends</CardTitle>
               </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                <p>Gartner reports that 70% of B2B companies are increasing their investment in marketing automation platforms in 2024.</p>
                <p>The global marketing automation market is projected to reach $12 billion by 2027.</p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* Interactive Modals */}
      {showDemoModal && <DemoRequestModal onClose={() => setShowDemoModal(false)} />}
      {showEvaluationModal && <AddToEvaluationModal onClose={() => setShowEvaluationModal(false)} />}
      {showShareModal && <SharePlanModal onClose={() => setShowShareModal(false)} />}
      {showConnectModal && selectedPeer && <ConnectModal peer={selectedPeer} onClose={() => setShowConnectModal(false)} />}
      {showROIModal && <ROICalculatorModal onClose={() => setShowROIModal(false)} />}
    </div>
  );
}
