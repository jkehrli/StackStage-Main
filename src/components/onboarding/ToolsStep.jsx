import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  X, 
  Search,
  Sparkles,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const toolCategories = [
  {
    id: 'crm',
    name: 'CRM',
    icon: '👥',
    gaps: [
      'No automation',
      'No attribution',
      'No CPQ',
      'Missing pipeline insights',
      'Limited integrations',
      'No lead scoring',
      'Poor reporting'
    ],
    problems: [
      'Reps avoid using it',
      'Too expensive',
      'Poor mobile UI',
      'Hard to customize',
      'Sync issues',
      'Data quality issues',
      'Slow performance'
    ]
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    icon: '💬',
    gaps: [
      'No async video',
      'No decision tracking',
      'No CRM integration',
      'Missing file versioning',
      'No workflow automation',
      'Poor search functionality'
    ],
    problems: [
      'Too noisy',
      'Hard to search',
      'Slow load time',
      'Too many notifications',
      'Poor mobile experience',
      'Security concerns'
    ]
  },
  {
    id: 'hris',
    name: 'HRIS',
    icon: '👨‍💼',
    gaps: [
      'No performance management',
      'Missing onboarding workflows',
      'No benefits administration',
      'Limited reporting',
      'No employee self-service',
      'Missing compliance tracking'
    ],
    problems: [
      'Manual processes',
      'Poor user experience',
      'Data silos',
      'Compliance issues',
      'High maintenance',
      'Limited scalability'
    ]
  },
  {
    id: 'marketing_automation',
    name: 'Marketing Automation',
    icon: '📧',
    gaps: [
      'No lead scoring',
      'No nurture flows',
      'No A/B testing',
      'Missing attribution',
      'Limited segmentation',
      'No behavioral triggers'
    ],
    problems: [
      'Low email deliverability',
      'UI too complex',
      'Can\'t see ROI',
      'Poor integration',
      'Data quality issues',
      'High bounce rates'
    ]
  },
  {
    id: 'customer_support',
    name: 'Customer Support / CX',
    icon: '🎧',
    gaps: [
      'No chatbot',
      'No CSAT tracking',
      'No deflection strategy',
      'Missing knowledge base',
      'No omnichannel support',
      'Limited automation'
    ],
    problems: [
      'Agents overwhelmed',
      'No SLA alerts',
      'Poor escalation flow',
      'Long response times',
      'Inconsistent experience',
      'High ticket volume'
    ]
  },
  {
    id: 'finance_erp',
    name: 'Finance & ERP',
    icon: '💰',
    gaps: [
      'No automated invoicing',
      'Missing expense management',
      'No budget tracking',
      'Limited forecasting',
      'No approval workflows',
      'Poor reporting'
    ],
    problems: [
      'Manual reconciliation',
      'Slow month-end close',
      'Poor visibility',
      'Compliance risks',
      'Integration issues',
      'High error rates'
    ]
  },
  {
    id: 'devops_engineering',
    name: 'DevOps & Engineering Tools',
    icon: '⚙️',
    gaps: [
      'No observability',
      'Can\'t roll back changes',
      'No deployment history',
      'Missing CI/CD',
      'No monitoring alerts',
      'Limited automation'
    ],
    problems: [
      'Slow incident response',
      'Can\'t share logs',
      'Tool overlap',
      'Complex setup',
      'Poor documentation',
      'High learning curve'
    ]
  },
  {
    id: 'security_compliance',
    name: 'Security & Compliance',
    icon: '🔒',
    gaps: [
      'No threat detection',
      'Missing compliance reporting',
      'No vulnerability scanning',
      'Limited access controls',
      'No incident response',
      'Missing audit trails'
    ],
    problems: [
      'Too many false positives',
      'Complex configuration',
      'Poor visibility',
      'Slow response times',
      'High maintenance',
      'User resistance'
    ]
  },
  {
    id: 'bi_reporting',
    name: 'BI / Reporting',
    icon: '📊',
    gaps: [
      'No real-time data',
      'Limited self-service',
      'No predictive analytics',
      'Missing data governance',
      'No mobile access',
      'Limited visualizations'
    ],
    problems: [
      'Data quality issues',
      'Slow query performance',
      'Complex to use',
      'Inconsistent metrics',
      'Poor data lineage',
      'High maintenance'
    ]
  },
  {
    id: 'procurement',
    name: 'Procurement / Vendor Management',
    icon: '🛒',
    gaps: [
      'No vendor scoring',
      'Missing contract management',
      'No spend analytics',
      'Limited approval workflows',
      'No risk assessment',
      'Poor visibility'
    ],
    problems: [
      'Manual processes',
      'Maverick spending',
      'Contract sprawl',
      'Poor vendor relationships',
      'Compliance risks',
      'High costs'
    ]
  },
  {
    id: 'ai_automation',
    name: 'AI & Automation',
    icon: '🤖',
    gaps: [
      'No ML capabilities',
      'Missing workflow automation',
      'No intelligent routing',
      'Limited personalization',
      'No predictive features',
      'Missing data science tools'
    ],
    problems: [
      'Complex implementation',
      'Poor accuracy',
      'High maintenance',
      'Limited ROI visibility',
      'Integration challenges',
      'Skill gaps'
    ]
  }
];

const SmartDropdown = ({ suggestions, value, onChange, placeholder, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const filtered = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  }, [inputValue, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    onChange(suggestion);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 pr-10"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      </div>
      
      <AnimatePresence>
        {isOpen && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-40 overflow-y-auto"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
                whileHover={{ backgroundColor: 'rgba(51, 65, 85, 0.8)' }}
              >
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <p className="text-xs text-slate-500 mt-1">
        Don't see what you're looking for? Type your own.
      </p>
    </div>
  );
};

const CategorySection = ({ category, data, onDataChange, isExpanded, onToggle, isMobile }) => {
  const sectionRef = useRef(null);

  const handleFieldChange = (field, value) => {
    onDataChange(category.id, field, value);
  };

  const content = (
    <motion.div
      initial={false}
      animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      <CardContent className="pt-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Tools Currently Used
          </label>
          <Input
            value={data.used || ''}
            onChange={(e) => handleFieldChange('used', e.target.value)}
            placeholder="e.g., Salesforce, HubSpot"
            className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Known Gaps
          </label>
          <SmartDropdown
            suggestions={category.gaps}
            value={data.gaps || ''}
            onChange={(value) => handleFieldChange('gaps', value)}
            placeholder="e.g., No automation"
            type="gaps"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Known Problems
          </label>
          <SmartDropdown
            suggestions={category.problems}
            value={data.problems || ''}
            onChange={(value) => handleFieldChange('problems', value)}
            placeholder="e.g., Too expensive"
            type="problems"
          />
        </div>
      </CardContent>
    </motion.div>
  );

  return (
    <Card className="glass-effect border-slate-700 overflow-hidden">
      <CardHeader 
        className={`cursor-pointer transition-colors hover:bg-slate-800/30 ${isMobile ? 'pb-4' : ''}`}
        onClick={isMobile ? onToggle : undefined}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label={category.name}>
              {category.icon}
            </span>
            <CardTitle className="text-white text-lg">{category.name}</CardTitle>
          </div>
          {isMobile && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </motion.div>
          )}
        </div>
      </CardHeader>
      {(!isMobile || isExpanded) && content}
    </Card>
  );
};

export default function ToolsStep({ onNext, formData, setFormData }) {
  const [expandedSections, setExpandedSections] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDataChange = (categoryId, field, value) => {
    setFormData(prev => ({
      ...prev,
      tools: {
        ...prev.tools,
        [categoryId]: {
          ...(prev.tools?.[categoryId] || {}),
          [field]: value
        }
      }
    }));
  };

  const toggleSection = (categoryId) => {
    setExpandedSections(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const hasAnyData = () => {
    const tools = formData.tools || {};
    return Object.keys(tools).some(categoryId => {
      const categoryData = tools[categoryId];
      return categoryData?.used || categoryData?.gaps || categoryData?.problems;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500/20 to-purple-500/20 px-4 py-2 rounded-full mb-6"
        >
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-medium text-sky-300">Step 4 of 6: Tools</span>
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Add Your Current Tools
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Listing your tools helps us identify risks, gaps, and integration opportunities.
        </p>
      </div>

      <div className="space-y-6">
        {toolCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <CategorySection
              category={category}
              data={formData.tools?.[category.id] || {}}
              onDataChange={handleDataChange}
              isExpanded={!isMobile || expandedSections[category.id]}
              onToggle={() => toggleSection(category.id)}
              isMobile={isMobile}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex justify-center gap-4 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button 
          onClick={onNext} 
          variant="outline" 
          className="text-slate-300 border-slate-600 hover:bg-slate-700 px-8 py-3"
        >
          Skip for now
        </Button>
        <Button 
          onClick={onNext} 
          className="gradient-button text-white px-8 py-3 font-semibold"
          disabled={!hasAnyData()}
        >
          Continue
          <Zap className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}