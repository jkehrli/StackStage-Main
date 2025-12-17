
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  X,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Target,
  Zap,
  Shield,
  TrendingUp,
  Save,
  Star,
  Users,
  Building,
  DollarSign,
  Clock,
  Award,
  Eye,
  MessageSquare,
  Plus,
  Calendar // Added Calendar import
} from 'lucide-react';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// Mock recommendations data - this would come from an API based on onboarding
const mockRecommendations = [
  {
    id: 1,
    toolName: 'HubSpot Marketing Hub',
    logo: 'https://logo.clearbit.com/hubspot.com',
    tagline: 'All-in-one marketing automation for growing teams',
    matchScore: 96,
    category: 'Marketing Automation',
    primaryFitTags: ['Best for Scale-ups', 'Great for Lead Nurturing'],
    personalizedSummary: 'Perfect match for your scaling SaaS company with 100+ employees looking to consolidate marketing tools and improve lead scoring.',
    whyMatch: [
      'Matches your scaling company stage and 100+ employee size',
      'Directly solves the "no lead scoring" gap you identified in marketing automation',
      'Integrates seamlessly with Salesforce CRM (which you currently use)',
      'Addresses your goal to "consolidate tools" by replacing 3 current solutions'
    ],
    expectedROI: {
      timeframe: '6 months',
      improvement: '35% increase in qualified leads',
      costSavings: '$24,000/year in tool consolidation'
    },
    integrationBenefits: [
      'One-click sync with your existing Salesforce setup',
      'Native integration with Slack for team notifications',
      'Built-in analytics eliminates need for separate reporting tools'
    ],
    detailedMatch: {
      companySizeMatch: 94,
      industryRelevance: 92,
      stackCompatibility: 98,
      gapAlignment: 96,
      goalAlignment: 94
    },
    limitations: [
      'Advanced features require Marketing Hub Professional ($800/month)',
      'Learning curve for complex automation workflows',
      'Some advanced reporting features only in Enterprise tier'
    ],
    relatedTools: ['Marketo', 'Pardot', 'ActiveCampaign']
  },
  {
    id: 2,
    toolName: 'Intercom',
    logo: 'https://logo.clearbit.com/intercom.com',
    tagline: 'Customer messaging platform that grows with you',
    matchScore: 92,
    category: 'Customer Support',
    primaryFitTags: ['Best for SaaS', 'AI-Powered Support'],
    personalizedSummary: 'Ideal for your SaaS company\'s customer support transformation, especially with your goal to "adopt AI" and eliminate response time issues.',
    whyMatch: [
      'Perfect for your SaaS industry and 100+ employee company size',
      'Addresses your "no chatbot" gap with industry-leading AI assistant',
      'Solves your "long response times" problem with automated triage',
      'Aligns with your goal to adopt AI in customer operations'
    ],
    expectedROI: {
      timeframe: '4 months',
      improvement: '60% reduction in first response time',
      costSavings: 'Eliminates need for 2 additional support agents'
    },
    integrationBenefits: [
      'Connects with your existing Slack workspace for internal notifications',
      'Integrates with Salesforce for customer context',
      'Built-in analytics dashboard eliminates need for separate tools'
    ],
    detailedMatch: {
      companySizeMatch: 96,
      industryRelevance: 88,
      stackCompatibility: 90,
      gapAlignment: 94,
      goalAlignment: 92
    },
    limitations: [
      'Can be expensive for high message volumes',
      'Advanced AI features require higher tier plans',
      'Some users find the interface overwhelming initially'
    ],
    relatedTools: ['Zendesk', 'Freshdesk', 'Help Scout']
  },
  {
    id: 3,
    toolName: 'Notion',
    logo: 'https://logo.clearbit.com/notion.so',
    tagline: 'All-in-one workspace for notes, docs, and collaboration',
    matchScore: 89,
    category: 'Collaboration',
    primaryFitTags: ['Best for Growing Teams', 'Great for Documentation'],
    personalizedSummary: 'Excellent fit for consolidating your collaboration stack and solving the "no centralized documentation" gap you mentioned.',
    whyMatch: [
      'Perfect for growing teams like yours (100+ employees)',
      'Directly addresses your "no centralized documentation" collaboration gap',
      'Supports your goal to "consolidate tools" by replacing multiple solutions',
      'Scales well with your company growth trajectory'
    ],
    expectedROI: {
      timeframe: '3 months',
      improvement: '40% reduction in information search time',
      costSavings: '$18,000/year by consolidating 4 separate tools'
    },
    integrationBenefits: [
      'Connects with Slack for seamless workflow integration',
      'Embeds with Google Drive and Figma for design collaboration',
      'API integrations with your development tools'
    ],
    detailedMatch: {
      companySizeMatch: 88,
      industryRelevance: 85,
      stackCompatibility: 91,
      gapAlignment: 92,
      goalAlignment: 90
    },
    limitations: [
      'Can become slow with very large databases',
      'Learning curve for advanced database features',
      'Limited granular permissions for enterprise security'
    ],
    relatedTools: ['Confluence', 'Monday.com', 'Coda']
  },
  {
    id: 4,
    toolName: 'Okta',
    logo: 'https://logo.clearbit.com/okta.com',
    tagline: 'Identity and access management for the enterprise',
    matchScore: 85,
    category: 'Security & Compliance',
    primaryFitTags: ['Enterprise Security', 'Best for SSO'],
    personalizedSummary: 'Critical for your security posture improvement goal and addresses the "no SSO" gap that\'s creating security vulnerabilities.',
    whyMatch: [
      'Directly addresses your "no SSO" security gap you identified',
      'Perfect for your enterprise security posture improvement goal',
      'Scales for your 100+ employee company size',
      'Integrates with all your existing SaaS tools seamlessly'
    ],
    expectedROI: {
      timeframe: '2 months',
      improvement: '75% reduction in password-related security incidents',
      costSavings: 'Prevents potential security breach costs ($500K+ average)'
    },
    integrationBenefits: [
      'One-click SSO for all your existing 20+ SaaS tools',
      'Integrates with Google Workspace and Microsoft 365',
      'API connections with your custom internal applications'
    ],
    detailedMatch: {
      companySizeMatch: 92,
      industryRelevance: 82,
      stackCompatibility: 95,
      gapAlignment: 88,
      goalAlignment: 85
    },
    limitations: [
      'Higher cost per user than some alternatives',
      'Complex initial setup for custom integrations',
      'Some advanced features require Professional tier'
    ],
    relatedTools: ['Auth0', 'Azure AD', 'Ping Identity']
  },
  {
    id: 5,
    toolName: 'Gong.io',
    logo: 'https://logo.clearbit.com/gong.io',
    tagline: 'Revenue intelligence platform that captures and understands every customer interaction',
    matchScore: 82,
    category: 'Sales Intelligence',
    primaryFitTags: ['Best for Revenue Teams', 'AI-Powered Insights'],
    personalizedSummary: 'Strong match for your "adopt AI" goal and addresses the "no sales insights" gap in your current CRM setup.',
    whyMatch: [
      'Aligns perfectly with your goal to "adopt AI" in business operations',
      'Addresses your "lack of sales insights" gap in current Salesforce setup',
      'Ideal for SaaS companies your size (100+ employees)',
      'Integrates seamlessly with your existing Salesforce CRM'
    ],
    expectedROI: {
      timeframe: '5 months',
      improvement: '25% increase in deal close rates',
      costSavings: 'Improved forecast accuracy saves planning costs'
    },
    integrationBenefits: [
      'Deep integration with your Salesforce CRM',
      'Connects with Zoom and Google Meet for call recording',
      'Slack notifications for deal insights and coaching opportunities'
    ],
    detailedMatch: {
      companySizeMatch: 85,
      industryRelevance: 90,
      stackCompatibility: 88,
      gapAlignment: 78,
      goalAlignment: 88
    },
    limitations: [
      'Requires buy-in from sales team for call recording',
      'Higher price point ($1,200+ per user annually)',
      'Privacy concerns may require legal review'
    ],
    relatedTools: ['Chorus', 'Outreach', 'SalesLoft']
  }
];

const AssessmentCard = ({ recommendation, onLearnWhy, onViewEvaluation, isViewed, onMarkViewed, onOpenStackChannel }) => {
  const categoryColors = {
    'Marketing Automation': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Customer Support': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    'Collaboration': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'Security & Compliance': 'bg-red-500/20 text-red-300 border-red-500/30',
    'Sales Intelligence': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  };

  const handleCardView = () => {
    if (!isViewed) {
      onMarkViewed(recommendation.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onViewportEnter={handleCardView}
      className="mb-8"
    >
      <Card className={`glass-effect border-slate-700 hover:border-slate-600 transition-all duration-300 ${isViewed ? 'ring-2 ring-sky-500/20' : ''}`}>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-6">
            {/* Logo and basic info */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-20 h-20 rounded-2xl bg-white p-3 flex items-center justify-center shadow-lg mb-4">
                <img src={recommendation.logo} alt={recommendation.toolName} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{recommendation.toolName}</h3>
              <Badge className={`${categoryColors[recommendation.category] || 'bg-slate-600 text-slate-300'} mb-3`}>
                {recommendation.category}
              </Badge>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {recommendation.primaryFitTags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs border-slate-600 text-slate-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Match score and summary */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-emerald-400">{recommendation.matchScore}%</div>
                  <p className="text-sm text-slate-400">Match Score</p>
                </div>
                <div className="flex-1">
                  <p className="text-lg text-slate-300 leading-relaxed">
                    {recommendation.personalizedSummary}
                  </p>
                </div>
              </div>

              {/* Quick preview stats */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                  <Clock className="w-5 h-5 text-sky-400" />
                  <div>
                    <p className="text-sm text-slate-400">Expected Value</p>
                    <p className="font-semibold text-white">{recommendation.expectedROI.timeframe}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-sm text-slate-400">Key Benefit</p>
                    <p className="font-semibold text-white text-sm">{recommendation.expectedROI.improvement}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <Button
                onClick={() => onLearnWhy(recommendation)}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium"
              >
                <Target className="w-4 h-4 flex-shrink-0" /> Here's Why
              </Button>
              <Button
                onClick={() => onViewEvaluation(recommendation)}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium"
              >
                <Eye className="w-4 h-4 flex-shrink-0" />
                Personalized Evaluation
              </Button>
              <Button
                onClick={() => onOpenStackChannel(recommendation)}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium"
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" /> Open StackChannel
              </Button>
              <p className="text-xs text-slate-500 text-center">Collaborate privately with your team before engaging vendors</p>
              {isViewed && (
                <div className="flex items-center justify-center gap-2 text-sky-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Viewed</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const WhyMatchModal = ({ recommendation, onClose }) => {
  if (!recommendation) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-effect border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Why {recommendation.toolName}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-slate-400" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <img src={recommendation.logo} alt={recommendation.toolName} className="w-12 h-12 rounded-lg bg-white p-2" />
            <div>
              <h3 className="text-xl font-bold text-white">{recommendation.toolName}</h3>
              <p className="text-slate-400">{recommendation.tagline}</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" /> Key Match Factors
            </h4>
            <div className="space-y-2">
              {recommendation.whyMatch.map((reason, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" /> Expected Impact
            </h4>
            <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Timeline:</span>
                <span className="text-white font-medium">{recommendation.expectedROI.timeframe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Key Improvement:</span>
                <span className="text-emerald-400 font-medium">{recommendation.expectedROI.improvement}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cost Impact:</span>
                <span className="text-green-400 font-medium">{recommendation.expectedROI.costSavings}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" /> Integration Benefits
            </h4>
            <ul className="space-y-2">
              {recommendation.integrationBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-sky-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const DetailedEvaluationModal = ({ recommendation, onClose }) => {
  if (!recommendation) return null;

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreWidth = (score) => `${score}%`;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-effect border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Detailed Evaluation: {recommendation.toolName}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-slate-400" />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <img src={recommendation.logo} alt={recommendation.toolName} className="w-16 h-16 rounded-xl bg-white p-3" />
            <div>
              <h3 className="text-2xl font-bold text-white">{recommendation.toolName}</h3>
              <p className="text-slate-400 text-lg">{recommendation.tagline}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-3xl font-bold text-emerald-400">{recommendation.matchScore}%</span>
                <span className="text-slate-400">Overall Match</span>
              </div>
            </div>
          </div>

          {/* Match breakdown */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Match Score Breakdown</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(recommendation.detailedMatch).map(([category, score]) => (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${score >= 90 ? 'bg-emerald-400' : score >= 75 ? 'bg-yellow-400' : 'bg-red-400'}`}
                      style={{ width: getScoreWidth(score) }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why it's a strong fit */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Why It's a Strong Fit</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {recommendation.whyMatch.slice(0, Math.ceil(recommendation.whyMatch.length / 2)).map((reason, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{reason}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {recommendation.whyMatch.slice(Math.ceil(recommendation.whyMatch.length / 2)).map((reason, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Limitations & Watchouts */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Known Limitations & Watchouts</h4>
            <div className="space-y-2">
              {recommendation.limitations.map((limitation, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-amber-900/20 border border-amber-700/30 rounded-lg">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-amber-200">{limitation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">You Might Also Consider</h4>
            <div className="flex flex-wrap gap-2">
              {recommendation.relatedTools.map(tool => (
                <Badge key={tool} variant="outline" className="border-slate-600 text-slate-300 py-1 px-3">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CreateChannelModal = ({ recommendation, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: `${recommendation.toolName} StackChannel`,
    collaborators: [],
    emailInput: '',
    note: `We're reviewing ${recommendation.toolName} and need your input before vendor engagement.`,
    shareData: {
      pricing: false,
      renewals: false,
      usage: false,
      other: ''
    }
  });

  const roles = [
    { id: 'it', name: 'IT / Security', icon: '🔧' },
    { id: 'procurement', name: 'Procurement', icon: '💼' },
    { id: 'finance', name: 'Finance', icon: '💰' },
    { id: 'legal', name: 'Legal', icon: '⚖️' },
    { id: 'other', name: 'Other', icon: '👥' }
  ];

  const addCollaborator = () => {
    if (formData.emailInput.trim() && !formData.collaborators.includes(formData.emailInput.trim())) {
      setFormData(prev => ({
        ...prev,
        collaborators: [...prev.collaborators, formData.emailInput.trim()],
        emailInput: ''
      }));
    }
  };

  const removeCollaborator = (email) => {
    setFormData(prev => ({
      ...prev,
      collaborators: prev.collaborators.filter(c => c !== email)
    }));
  };

  const handleCreateChannel = () => {
    console.log('Creating StackChannel for', recommendation.toolName, formData);
    onClose();
    // In a real app, this would create the channel and redirect
    window.location.href = createPageUrl('StackChannels');
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Create StackChannel</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-6 h-6 text-slate-400" />
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-6 p-3 bg-slate-700/50 rounded-lg">
            <img src={recommendation.logo} alt={recommendation.toolName} className="w-10 h-10 rounded-lg bg-white p-2" />
            <div>
              <h3 className="font-semibold text-white">{recommendation.toolName}</h3>
              <p className="text-sm text-slate-400">Match Score: {recommendation.matchScore}%</p>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="channelName" className="text-white font-semibold text-lg mb-3 block">Name Your StackChannel</Label>
                <Input
                  id="channelName"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white text-lg h-12"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} className="bg-sky-600 hover:bg-sky-700 text-white px-6">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label className="text-white font-semibold text-lg mb-3 block">Invite Collaborators</Label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {roles.map(role => (
                    <Badge key={role.id} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 cursor-pointer py-1 px-3">
                      {role.icon} {role.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 mb-4">
                  <Input
                    type="email"
                    value={formData.emailInput}
                    onChange={(e) => setFormData(prev => ({ ...prev, emailInput: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && addCollaborator()}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="colleague@company.com"
                  />
                  <Button onClick={addCollaborator} className="bg-sky-600 hover:bg-sky-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.collaborators.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.collaborators.map(email => (
                      <Badge key={email} className="bg-sky-500/20 text-sky-300 border-sky-500/30 py-1 px-3">
                        {email}
                        <X onClick={() => removeCollaborator(email)} className="w-3 h-3 ml-2 cursor-pointer" />
                      </Badge>
                    ))}
                  </div>
                )}
                <div>
                  <Label htmlFor="collaboratorNote" className="text-white font-semibold mb-2 block">Optional note to collaborators</Label>
                  <Textarea
                    id="collaboratorNote"
                    value={formData.note}
                    onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button onClick={() => setStep(1)} variant="outline" className="bg-slate-700 border-slate-600 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={() => setStep(3)} className="bg-sky-600 hover:bg-sky-700 text-white px-6">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label className="text-white font-semibold text-lg mb-3 block">Choose What to Share</Label>
                <div className="space-y-4">
                  {[
                    { key: 'pricing', label: 'Current pricing/contracts' },
                    { key: 'renewals', label: 'Renewal dates' },
                    { key: 'usage', label: 'Usage data' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 border border-slate-700">
                      <Label htmlFor={`share-${item.key}`} className="text-white cursor-pointer">{item.label}</Label>
                      <Switch
                        id={`share-${item.key}`}
                        checked={formData.shareData[item.key]}
                        onCheckedChange={(checked) => setFormData(prev => ({
                          ...prev,
                          shareData: { ...prev.shareData, [item.key]: checked }
                        }))}
                        className="data-[state=checked]:bg-sky-500 data-[state=unchecked]:bg-slate-600"
                      />
                    </div>
                  ))}
                  <div>
                    <Label htmlFor="otherShare" className="text-white mb-2 block">Other (optional)</Label>
                    <Input
                      id="otherShare"
                      value={formData.shareData.other}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        shareData: { ...prev.shareData, other: e.target.value }
                      }))}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Additional context or data to share..."
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button onClick={() => setStep(2)} variant="outline" className="bg-slate-700 border-slate-600 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={handleCreateChannel} className="gradient-button text-white px-8">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Create StackChannel
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const StackExplorerBadgeModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-effect border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Stack Explorer Badge Earned!</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-slate-400" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-12 h-12 text-white" />
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 py-2 px-6 text-lg mb-4">
              <Star className="w-5 h-5 mr-2" />
              Stack Explorer
            </Badge>
            <p className="text-slate-300 text-lg">Congratulations on completing your StackStage assessment!</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">What This Badge Represents</h3>
            
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Strategic Thinking
              </h4>
              <p className="text-slate-300">You've demonstrated commitment to thoughtful software evaluation by reviewing all personalized recommendations instead of rushing into vendor conversations.</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-sky-400 mb-2 flex items-center gap-2">
                <Users className="w-5 h-5" /> Collaborative Leadership
              </h4>
              <p className="text-slate-300">You understand that great software decisions require team input. The Stack Explorer badge shows you value stakeholder alignment over individual preferences.</p>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Buyer-First Mindset
              </h4>
              <p className="text-slate-300">You've embraced StackStage's core ethos: buyers should control their evaluation process, engage vendors when ready, and make decisions based on data, not sales pressure.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-900/30 to-sky-900/30 rounded-lg p-6 border border-emerald-500/30">
            <h4 className="font-semibold text-white mb-3">Your Next Level Benefits</h4>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Priority access to new StackStage features and beta programs</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Enhanced peer validation network with other Stack Explorers</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Advanced analytics and benchmarking against similar companies</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Exclusive invites to StackStage buyer community events</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-slate-400 mb-4">Share your achievement with your team:</p>
            <div className="flex gap-3 justify-center">
              <Button className="bg-sky-600 hover:bg-sky-700 text-white px-6">
                <MessageSquare className="w-4 h-4 mr-2" />
                Share in Slack
              </Button>
              <Button className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700 px-6 border">
                <Calendar className="w-4 h-4 mr-2" />
                Add to LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CompletionCard = ({ onGoToDashboard, viewedCount, totalCount, onShowBadgeModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Card className="glass-effect border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-sky-900/20">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Award className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {viewedCount === totalCount ? "🎉 Assessment Complete!" : "Ready to start building your Stack Plan?"}
            </h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              {viewedCount === totalCount
                ? "You've reviewed all your personalized recommendations! You've earned the Stack Explorer badge."
                : `You've reviewed ${viewedCount} of ${totalCount} recommendations. Ready to move to your dashboard?`}
            </p>
          </div>

          {viewedCount === totalCount && (
            <div className="mb-6">
              <button 
                onClick={onShowBadgeModal}
                className="bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500/30 py-3 px-6 text-lg rounded-full hover:bg-emerald-500/30 transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <Star className="w-5 h-5" />
                Stack Explorer Badge Earned!
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGoToDashboard}
              className="gradient-button text-white px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform"
            >
              Go to My Dashboard <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Link to={createPageUrl('Onboarding')}>
              <Button variant="outline" className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700 px-8 py-4 text-lg">
                Refine My Results
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function StackAssessment() {
  const [selectedWhyMatch, setSelectedWhyMatch] = useState(null);
  const [selectedDetailedEval, setSelectedDetailedEval] = useState(null);
  const [selectedChannelTool, setSelectedChannelTool] = useState(null);
  const [viewedRecommendations, setViewedRecommendations] = useState(new Set());
  const [showCompletion, setShowCompletion] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false); // New state for badge modal

  const handleMarkViewed = (recommendationId) => {
    setViewedRecommendations(prev => {
      const newViewed = new Set(prev);
      newViewed.add(recommendationId);

      // Show completion card when all viewed
      if (newViewed.size === mockRecommendations.length) {
        setShowCompletion(true);
        // Trigger confetti celebration
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      return newViewed;
    });
  };

  const handleGoToDashboard = () => {
    // Save badge progress and redirect
    window.location.href = createPageUrl('Dashboard');
  };

  const progressPercentage = (viewedRecommendations.size / mockRecommendations.length) * 100;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to={createPageUrl('index')} className="flex items-center space-x-3">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ab8a95562_ChatGPTImageJul4202506_13_46PM.png" alt="StackStage Logo" className="w-10 h-10" />
              <span className="text-xl font-bold gradient-text">StackStage</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="font-semibold text-white">StackAssessment – Your Recommendations</p>
                <p className="text-sm text-slate-400">{viewedRecommendations.size} of {mockRecommendations.length} viewed</p>
              </div>
              <div className="w-32">
                <Progress value={progressPercentage} className="bg-slate-700 [&>div]:bg-sky-500" />
              </div>
            </div>

            <Link to={createPageUrl('Onboarding')}>
              <Button variant="ghost" className="text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Onboarding
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Your Personalized Stack Recommendations</h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Based on your company profile, goals, and current tools, here are the solutions that are the perfect fit for you.
          </p>
        </div>

        <div className="space-y-0">
          {mockRecommendations.map(rec => (
            <AssessmentCard
              key={rec.id}
              recommendation={rec}
              onLearnWhy={setSelectedWhyMatch}
              onViewEvaluation={setSelectedDetailedEval}
              onOpenStackChannel={setSelectedChannelTool}
              isViewed={viewedRecommendations.has(rec.id)}
              onMarkViewed={handleMarkViewed}
            />
          ))}

          {showCompletion && (
            <CompletionCard
              onGoToDashboard={handleGoToDashboard}
              viewedCount={viewedRecommendations.size}
              totalCount={mockRecommendations.length}
              onShowBadgeModal={() => setShowBadgeModal(true)} // Pass new handler
            />
          )}
        </div>
      </main>

      <AnimatePresence>
        {selectedWhyMatch && (
          <WhyMatchModal
            recommendation={selectedWhyMatch}
            onClose={() => setSelectedWhyMatch(null)}
          />
        )}
        {selectedDetailedEval && (
          <DetailedEvaluationModal
            recommendation={selectedDetailedEval}
            onClose={() => setSelectedDetailedEval(null)}
          />
        )}
        {selectedChannelTool && (
          <CreateChannelModal
            recommendation={selectedChannelTool}
            onClose={() => setSelectedChannelTool(null)}
          />
        )}
        {showBadgeModal && ( // Render new badge modal
          <StackExplorerBadgeModal
            onClose={() => setShowBadgeModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
