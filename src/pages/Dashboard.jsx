
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Lightbulb, 
  Check, 
  Send, 
  Plus, 
  Star, 
  ArrowRight,
  TrendingUp,
  Calendar,
  Layers,
  FileText,
  X,
  Download,
  AlertTriangle,
  FileQuestion,
  Search,
  GitCompare, 
  Heart,      
  Mail        
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for different Deep Stack Plans
const deepStackExamples = [
  {
    id: 'hubspot',
    name: 'HubSpot Marketing Hub',
    logo: 'https://logo.clearbit.com/hubspot.com',
    tagline: 'Marketing Automation Platform',
    matchScore: 96,
    highlights: [
      'Achieve a 30% increase in lead conversion within the first 6 months through advanced segmentation and personalized automated campaigns.',
      'Reduce customer acquisition cost by 15% by optimizing ad spend and improving lead quality via AI-driven scoring.',
      'Streamline marketing and sales operations, saving an estimated 10 hours/week in manual tasks per team member.'
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
    implementationTimeline: '8-12 weeks',
    expectedROI: '150% ROI in 12 months'
  },
  {
    id: 'salesforce',
    name: 'Salesforce Sales Cloud',
    logo: 'https://logo.clearbit.com/salesforce.com',
    tagline: 'Enterprise CRM Platform',
    matchScore: 94,
    highlights: [
      'Increase sales productivity by 35% with automated lead routing and opportunity management workflows.',
      'Improve forecasting accuracy by 40% using AI-powered pipeline analytics and predictive scoring.',
      'Reduce data entry time by 60% through intelligent automation and seamless third-party integrations.'
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
    implementationTimeline: '12-16 weeks',
    expectedROI: '200% ROI in 18 months'
  },
  {
    id: 'slack',
    name: 'Slack Enterprise Grid',
    logo: 'https://logo.clearbit.com/slack.com',
    tagline: 'Enterprise Communication Platform',
    matchScore: 91,
    highlights: [
      'Boost team collaboration efficiency by 45% with organized channels and workflow integrations.',
      'Reduce email volume by 70% while improving response times and decision-making speed.',
      'Enhance remote work productivity with advanced search, file sharing, and app integrations.'
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
    implementationTimeline: '4-8 weeks',
    expectedROI: '120% ROI in 6 months'
  },
  {
    id: 'notion',
    name: 'Notion Enterprise',
    logo: 'https://logo.clearbit.com/notion.so',
    tagline: 'All-in-One Enterprise Workspace',
    matchScore: 89,
    highlights: [
      'Centralize documentation and reduce information silos, saving 2 hours per employee per week.',
      'Replace 4-5 separate tools with one unified workspace, cutting software costs by $15,000/year.',
      'Improve project visibility and accountability with customizable databases and automated workflows.'
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
    implementationTimeline: '6-10 weeks',
    expectedROI: '180% ROI in 9 months'
  }
];

const StaxSuggestionBar = () => (
  <div className="bg-slate-800/50 border border-sky-500/30 text-sky-200 p-4 rounded-lg flex items-start gap-3 mb-8">
    <Lightbulb className="w-5 h-5 mt-0.5 flex-shrink-0 text-sky-400" />
    <div>
        <h4 className="font-bold text-white">Stax Suggests...</h4>
        <p className="text-sm">'Analytics Pro' has low usage and an upcoming renewal. Consider replacing it to optimize costs.</p>
    </div>
  </div>
);

const DeepStackPlan = ({ onViewPlan }) => {
  const plans = [
    { 
      id: 1,
      title: "Quick Wins (0-90 Days)",
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
      tasks: [
        { name: "Consolidate Analytics Tools", reason: "Why: Save $5k/yr", roi: "ROI: Immediate", done: true },
      ]
    },
    { 
      id: 2,
      title: "Mid-Term (3-6 Mos)",
      icon: <Calendar className="w-4 h-4 text-sky-400" />,
      tasks: [
        { name: "Implement HubSpot", reason: "Why: Improve lead nurture", roi: "ROI: 150% in 12 mos", done: true },
        { name: "Upgrade Security Suite", reason: "Why: Mitigate new threats", roi: "ROI: Risk Reduction", done: true },
      ]
    },
    { 
      id: 3,
      title: "Long-Term (6-18 Mos)",
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      tasks: [
        { name: "Build Data Warehouse", reason: "Why: Enable predictive analytics", roi: "ROI: Strategic", done: false },
      ]
    }
  ];

  return (
    <Card className="bg-slate-800 border-slate-700 col-span-2">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl text-white">Deep Stack Plan Visualization</CardTitle>
        <Button 
          onClick={onViewPlan}
          className="bg-sky-600 hover:bg-sky-700 text-white h-8"
        >
          View Deep Stack Plan
        </Button>
      </CardHeader>
      <CardContent className="grid md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.title}>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">{plan.icon} {plan.title}</h3>
            <div className="space-y-4">
              {plan.tasks.map(task => (
                <div key={task.name} className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
                  <p className="font-semibold text-white">{task.name}</p>
                  <p className="text-xs text-slate-400">{task.reason}</p>
                  <p className="text-xs text-slate-400">{task.roi}</p>
                  <div className="flex justify-between items-center mt-3">
                     <Button variant={task.done ? "secondary" : "outline"} size="sm" className={`h-7 text-xs ${task.done ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'}`}>
                      <Check className="w-3 h-3 mr-1.5" /> {task.done ? 'Done' : 'Mark Done'}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-300 hover:bg-slate-700/50">
                      <Send className="w-3 h-3 mr-1.5" /> Send
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const MarketplaceMatchView = ({ onCompare, onShortlist, onSend }) => {
  const matches = [
    { name: "Salesforce", category: "CRM", bestFor: "Enterprise", positioning: "Maturity", rating: 4.8, logo: "https://logo.clearbit.com/salesforce.com" },
    { name: "HubSpot", category: "Marketing", bestFor: "Mid-Market", positioning: "Growth Stage", rating: 4.6, logo: "https://logo.clearbit.com/hubspot.com" },
    { name: "Intercom", category: "Support", bestFor: "SMB", positioning: "Early Stage", rating: 4.7, logo: "https://logo.clearbit.com/intercom.com" },
  ];

  return (
    <Card className="bg-slate-800 border-slate-700 col-span-2">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-sky-400" /> Marketplace Match View (Beta)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {matches.map(match => (
          <div key={match.name} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center gap-4 w-full md:w-1/3">
              <img src={match.logo} alt={match.name} className="w-10 h-10 rounded-md bg-white p-1" />
              <div>
                <p className="font-semibold text-white">{match.name}</p>
                <p className="text-sm text-slate-400">{match.category}</p>
              </div>
            </div>
            <div className="flex-1 w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Button 
                onClick={() => onCompare(match)}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                Compare
              </Button>
              <Button 
                onClick={() => onShortlist(match)}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                <Plus className="w-4 h-4 mr-1"/> Shortlist
              </Button>
              <Button 
                onClick={() => onSend(match)}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                <Send className="w-4 h-4 mr-1"/> Send
              </Button>
            </div>
            <div className="text-right w-full md:w-auto mt-2 md:mt-0">
               <p className="text-xs text-slate-400">Best for: <span className="font-semibold text-white">{match.bestFor}</span></p>
               <p className="text-xs text-slate-400">Positioning: <span className="font-semibold text-white">{match.positioning}</span></p>
            </div>
             <div className="flex items-center gap-1 text-yellow-400 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{match.rating}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const StackMaturity = ({ onViewPlan }) => (
  <Card className="bg-slate-800 border-slate-700">
    <CardHeader>
      <CardTitle className="text-xl text-white">Your Stack Maturity</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
        <span>Ad Hoc</span><span>Aligned</span><span>Optimized</span><span>Scalable</span>
      </div>
      <Progress value={45} className="bg-slate-700 [&>div]:bg-sky-500" />
      <div className="mt-4 text-center">
        <p className="text-slate-300">You're at <span className="font-bold text-white">Stage 2 - Mid-Term Optimization.</span></p>
        <p className="text-sm text-slate-400">Focus: Consolidation & Alignment</p>
      </div>
      <Button 
        onClick={onViewPlan}
        className="w-full mt-4 bg-sky-600 hover:bg-sky-700 text-white"
      >
        View Deep Stack Plan
      </Button>
    </CardContent>
  </Card>
);

// Interactive Modals
const DeepStackPlanModal = ({ onClose, selectedExample, onSelectExample }) => {
  const example = deepStackExamples.find(ex => ex.id === selectedExample) || deepStackExamples[0];

  const getDeepStackPlanUrl = (id) => {
    const urlMap = {
      'hubspot': 'DeepStackPlan',
      'salesforce': 'SalesforceDeepStackPlan',
      'slack': 'SlackDeepStackPlan',
      'notion': 'NotionDeepStackPlan'
    };
    return createPageUrl(urlMap[id] || 'DeepStackPlan');
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-800 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Deep Stack Plans</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-6 h-6 text-slate-400" />
            </Button>
          </div>

          {/* Example Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {deepStackExamples.map(ex => (
              <Button
                key={ex.id}
                onClick={() => onSelectExample(ex.id)}
                variant={selectedExample === ex.id ? "default" : "outline"}
                className={selectedExample === ex.id ? "bg-sky-600 hover:bg-sky-700 text-white" : "bg-slate-700 border-slate-600 text-white hover:bg-slate-600"}
              >
                <img src={ex.logo} alt={ex.name} className="w-4 h-4 mr-2" />
                {ex.name.split(' ')[0]}
              </Button>
            ))}
          </div>

          {/* Selected Example Details */}
          <div className="bg-slate-700/50 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <img src={example.logo} alt={example.name} className="w-16 h-16 rounded-lg bg-white p-3" />
              <div>
                <h3 className="text-2xl font-bold text-white">{example.name}</h3>
                <p className="text-slate-400">{example.tagline}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-3xl font-bold text-emerald-400">{example.matchScore}%</span>
                  <span className="text-slate-400">Match Score</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-white mb-4">Strategic Impact</h4>
                <ul className="space-y-3 mb-6">
                  {example.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-lg font-bold text-white mb-3">Key Features</h4>
                <ul className="space-y-2 mb-6">
                  {example.checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-lg font-bold text-white mb-3">Implementation</h4>
                <div className="bg-slate-600/30 rounded-lg p-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-300">Timeline:</span>
                    <span className="text-white font-semibold">{example.implementationTimeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Expected ROI:</span>
                    <span className="text-emerald-400 font-semibold">{example.expectedROI}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-3">Integration Compatibility</h4>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {example.integrations.map(int => (
                    <div key={int.name} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <img src={int.logo} alt={`${int.name} logo`} className="w-6 h-6 rounded-md bg-white p-0.5" />
                      <span className="font-medium text-white text-sm">{int.name}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-lg font-bold text-white mb-3">Security & Compliance</h4>
                <ul className="space-y-2 mb-6">
                  {example.security.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-lg font-bold text-white mb-3">Customer Support</h4>
                <ul className="space-y-2">
                  {example.support.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4 mt-6 pt-6 border-t border-slate-600">
              <Link to={getDeepStackPlanUrl(selectedExample)}>
                <Button className="bg-sky-600 hover:bg-sky-700 text-white px-6">
                  View Full Deep Stack Plan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CompareModal = ({ tool, onClose }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-slate-800 rounded-xl w-full max-w-2xl"
      onClick={e => e.stopPropagation()}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Compare {tool.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-slate-400" />
          </Button>
        </div>
        
        <div className="flex items-center gap-4 mb-6 p-4 bg-slate-700/50 rounded-lg">
          <img src={tool.logo} alt={tool.name} className="w-12 h-12 rounded-lg bg-white p-2" />
          <div>
            <h3 className="font-semibold text-white">{tool.name}</h3>
            <p className="text-sm text-slate-400">{tool.category} Solution</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-white">Comparison will include:</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-slate-300">
              <GitCompare className="w-4 h-4 text-sky-400" />
              Feature-by-feature analysis
            </li>
            <li className="flex items-center gap-2 text-slate-300">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Pricing comparison matrix
            </li>
            <li className="flex items-center gap-2 text-slate-300">
              <Star className="w-4 h-4 text-yellow-400" />
              User reviews and ratings
            </li>
          </ul>
        </div>

        <Button onClick={onClose} className="w-full mt-6 bg-sky-600 hover:bg-sky-700 text-white">
          Generate Comparison Report
        </Button>
      </div>
    </motion.div>
  </div>
);

const ShortlistModal = ({ tool, onClose }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-slate-800 rounded-xl w-full max-w-md"
      onClick={e => e.stopPropagation()}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Add to Shortlist</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-slate-400" />
          </Button>
        </div>
        
        <div className="text-center mb-6">
          <Heart className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="font-semibold text-white mb-2">Added to Shortlist!</h3>
          <p className="text-slate-300">{tool.name} has been added to your evaluation shortlist.</p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-white mb-2">What's next?</h4>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Request detailed demos</li>
            <li>• Compare with other shortlisted tools</li>
            <li>• Get pricing information</li>
            <li>• Schedule stakeholder reviews</li>
          </ul>
        </div>

        <Button onClick={onClose} className="w-full bg-sky-600 hover:bg-sky-700 text-white">
          View My Shortlist
        </Button>
      </div>
    </motion.div>
  </div>
);

const SendModal = ({ tool, onClose }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-slate-800 rounded-xl w-full max-w-lg"
      onClick={e => e.stopPropagation()}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Send to Team</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-slate-400" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Send to:</label>
            <Input 
              placeholder="colleague@company.com"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">Message:</label>
            <Textarea 
              placeholder={`Hi there, I found ${tool.name} and think it could be a great fit for our ${tool.category.toLowerCase()} needs. What do you think?`}
              className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={onClose} className="flex-1 bg-sky-600 hover:bg-sky-700 text-white">
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
            Cancel
          </Button>
        </div>
      </div>
    </motion.div>
  </div>
);

const RenewalRadar = () => {
  const [modal, setModal] = useState(null);

  const renewals = [
    { tool: "Analytics Pro", days: -25, action: "Replace", color: "red", budget: 15000, signal: "Usage drop-off" },
    { tool: "Sales CRM", days: 45, action: "Negotiate", color: "yellow", budget: 24000, issue: "Low NPS score" },
    { tool: "Dev Toolkit", days: 80, action: "Renew", color: "green", budget: 8000, nextEval: "December 2025" },
  ];

  const getBadgeClass = (color) => {
    if (color === 'red') return 'bg-red-500/20 text-red-300 border-red-500/30';
    if (color === 'yellow') return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
  };
  
  const getDaysLeftClass = (days) => {
    if (days < 0) return 'text-red-400 font-semibold';
    if (days <= 60) return 'text-yellow-400 font-semibold';
    return 'text-emerald-400 font-semibold';
  };

  const formatDaysLeft = (days) => {
    if (days < 0) return 'Overdue';
    return days.toString();
  };
  
  const handleActionClick = (renewal) => {
    setModal(renewal);
  };
  
  const closeModal = () => setModal(null);

  return (
    <>
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Renewal Radar</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="grid grid-cols-3 text-xs font-semibold text-slate-400 mb-2 px-2">
            <span>Tool</span>
            <span className="text-center">Days Left</span>
            <span className="text-right">Action</span>
          </div>
          <div className="space-y-2">
            {renewals.map(r => (
              <div key={r.tool} className="grid grid-cols-3 items-center p-2 rounded-lg bg-slate-900/50 hover:bg-slate-800/80">
                <span className="font-medium text-white">{r.tool}</span>
                <span className={`text-center ${getDaysLeftClass(r.days)}`}>{formatDaysLeft(r.days)}</span>
                <div className="text-right">
                  <Badge variant="outline" className={`h-6 ${getBadgeClass(r.color)} cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-offset-slate-900 hover:ring-current`} onClick={() => handleActionClick(r)}>{r.action}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={closeModal}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-800 rounded-xl w-full max-w-lg"
              onClick={e => e.stopPropagation()}
            >
              {modal.action === 'Replace' && <ReplaceModal tool={modal} onClose={closeModal} />}
              {modal.action === 'Negotiate' && <NegotiateModal tool={modal} onClose={closeModal} />}
              {modal.action === 'Renew' && <RenewModal tool={modal} onClose={closeModal} />}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const ReplaceModal = ({ tool, onClose }) => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold text-white">Replace {tool.tool}</h3>
      <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-white" /></Button>
    </div>
    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-4 text-red-300">
        <div className="font-bold mb-2 flex items-center gap-2"><FileQuestion/> Tool Replacement Recommended</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
            <span>Days Left: {tool.days}</span>
            <span>Category: Analytics</span>
            <span>Current Budget: ${tool.budget.toLocaleString()}</span>
            <span>Signal: <span className="font-semibold text-red-200">{tool.signal}</span></span>
        </div>
    </div>
    <div>
        <Label className="text-white font-semibold block mb-2">Why are you replacing this tool? *</Label>
        <RadioGroup defaultValue="cost" className="space-y-1 text-slate-300">
            <div className="flex items-center space-x-2"><RadioGroupItem value="cost" id="cost" /><Label htmlFor="cost">Cost too high</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="gaps" id="gaps" /><Label htmlFor="gaps">Feature gaps</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="integration" id="integration" /><Label htmlFor="integration">Integration issues</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="feedback" id="feedback" /><Label htmlFor="feedback">Poor internal feedback</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="security" id="security" /><Label htmlFor="security">Security concerns</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="other" id="other" /><Label htmlFor="other">Other</Label></div>
        </RadioGroup>
    </div>
    <div className="bg-slate-700/50 p-4 rounded-lg mt-4">
        <h4 className="font-semibold text-white mb-2">Next Steps</h4>
        <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>Pre-filtered Analytics category in Stack Planner</li>
            <li>Smart shortlist of 2-3 recommended alternatives</li>
            <li>Timeline added to your stack evolution plan</li>
            <li>Stakeholder recommendations for evaluation</li>
        </ul>
    </div>
    <Button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white">
        <Search className="w-4 h-4 mr-2" /> Start Replacement Search
    </Button>
  </div>
);

const NegotiateModal = ({ tool, onClose }) => (
    <div className="p-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Negotiate {tool.tool}</h3>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-white" /></Button>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-4 text-yellow-300">
            <div className="font-bold mb-2 flex items-center gap-2"><AlertTriangle/> Contract Optimization Opportunity</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <span>Contract End: {tool.days} days</span>
                <span>Current Budget: ${tool.budget.toLocaleString()}</span>
                <span className="col-span-2">Issue: <span className="font-semibold text-yellow-200">{tool.issue}</span></span>
            </div>
        </div>
        <div>
            <Label className="text-white font-semibold block mb-2">Negotiation Checklist</Label>
            <div className="space-y-2 text-slate-300">
                <div className="flex items-center space-x-2"><Checkbox id="n1" /><Label htmlFor="n1">Request volume discount for multi-year commitment</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="n2" /><Label htmlFor="n2">Swap commitment terms (annual to monthly or vice versa)</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="n3" /><Label htmlFor="n3">Ask for bundled tools or additional features</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="n4" /><Label htmlFor="n4">Remove unused features/modules to reduce cost</Label></div>
            </div>
        </div>
        <div className="mt-4">
             <Label htmlFor="notes" className="text-white font-semibold block mb-2">Additional Notes</Label>
             <Textarea id="notes" placeholder="Add specific negotiation points or leverage you have..." className="bg-slate-700 border-slate-600 text-white focus-visible:ring-offset-slate-900" />
        </div>
        <div className="flex gap-3 w-full mt-6">
            <Button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
                <Download className="w-4 h-4 mr-2" /> Export Negotiation Brief
            </Button>
             <Button variant="outline" className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                Compare Alternatives
            </Button>
        </div>
    </div>
);

const RenewModal = ({ tool, onClose }) => (
    <div className="p-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Confirm Renewal</h3>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-white" /></Button>
        </div>
        <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4 mb-4 text-emerald-300">
            <div className="font-bold mb-2 flex items-center gap-2"><Check /> Ready for Renewal</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <span>Tool: <span className="font-semibold text-emerald-200">{tool.tool}</span></span>
                <span>Current Budget: ${tool.budget.toLocaleString()}</span>
                <span className="col-span-2">Next Evaluation: <span className="font-semibold text-emerald-200">{tool.nextEval}</span></span>
            </div>
        </div>
        <div>
            <Label htmlFor="working" className="text-white font-semibold block mb-2">What's working well? (Optional)</Label>
            <Textarea id="working" placeholder="Note key benefits, ROI, or team feedback..." className="bg-slate-700 border-slate-600 text-white focus-visible:ring-offset-slate-900" />
        </div>
        <div className="mt-4 flex items-center space-x-2">
            <Checkbox id="upload" />
            <Label htmlFor="upload" className="text-slate-300">Upload renewed contract for documentation</Label>
        </div>
        <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Check className="w-4 h-4 mr-2" /> Confirm Renewal
        </Button>
    </div>
);

export default function Dashboard() {
  const [showDeepStackModal, setShowDeepStackModal] = useState(false);
  const [selectedExample, setSelectedExample] = useState('hubspot');
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showShortlistModal, setShowShortlistModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  const handleCompare = (tool) => {
    setSelectedTool(tool);
    setShowCompareModal(true);
  };

  const handleShortlist = (tool) => {
    setSelectedTool(tool);
    setShowShortlistModal(true);
  };

  const handleSend = (tool) => {
    setSelectedTool(tool);
    setShowSendModal(true);
  };

  const handleViewPlan = () => {
    setShowDeepStackModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <StaxSuggestionBar />
        <h1 className="text-3xl font-bold text-white mb-8">Welcome to your Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <DeepStackPlan onViewPlan={handleViewPlan} />
            <MarketplaceMatchView 
              onCompare={handleCompare}
              onShortlist={handleShortlist}
              onSend={handleSend}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-8">
            <StackMaturity onViewPlan={handleViewPlan} />
            <RenewalRadar />
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showDeepStackModal && (
          <DeepStackPlanModal
            onClose={() => setShowDeepStackModal(false)}
            selectedExample={selectedExample}
            onSelectExample={setSelectedExample}
          />
        )}
        {showCompareModal && selectedTool && (
          <CompareModal
            tool={selectedTool}
            onClose={() => setShowCompareModal(false)}
          />
        )}
        {showShortlistModal && selectedTool && (
          <ShortlistModal
            tool={selectedTool}
            onClose={() => setShowShortlistModal(false)}
          />
        )}
        {showSendModal && selectedTool && (
          <SendModal
            tool={selectedTool}
            onClose={() => setShowSendModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
