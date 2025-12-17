
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  ChevronDown,
  Plus,
  X,
  ShieldCheck,
  Eye,
  HeartHandshake,
  Briefcase,
  Rocket,
  TrendingUp,
  Building,
  HelpCircle,
  Users,
  ClipboardList,
  Megaphone,
  Headset,
  Banknote,
  TerminalSquare,
  BarChart,
  ShoppingCart,
  Sparkles,
  Lock,
  Target,
  FileCog,
  FileText,
  Repeat,
  Mail,
  UserCheck,
  Store
} from 'lucide-react';
import { createPageUrl } from '@/utils';
import { User } from '@/api/entities';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

// --- Reusable Components ---

const ProgressIndicator = ({ currentStep, totalSteps }) => {
    const steps = ["Welcome", "Role", "Context", "Categories", "Tools", "Goals", "Timeline", "Stakeholders", "Privacy", "Finish"];
    return (
        <div className="flex items-center justify-center mb-12 w-full max-w-7xl mx-auto px-4">
            {steps.map((label, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col items-center text-center px-1">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-medium transition-all duration-300 border-2 ${
                                currentStep > index + 1 ? 'bg-sky-500 border-sky-500 text-white' :
                                currentStep === index + 1 ? 'bg-sky-500/20 border-sky-400 text-sky-300 scale-110' :
                                'bg-slate-700 border-slate-600 text-slate-400'
                            }`}
                        >
                            {currentStep > index + 1 ? <CheckCircle className="w-6 h-6" /> : index + 1}
                        </div>
                        <p className={`mt-2 text-xs font-medium transition-colors ${currentStep >= index + 1 ? 'text-slate-200' : 'text-slate-500'}`}>{label}</p>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-1 transition-all duration-300 ${currentStep > index + 1 ? 'bg-sky-500' : 'bg-slate-700'}`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

const OnboardingContainer = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="w-full"
    >
        <Card className="glass-effect border-slate-700 w-full max-w-4xl mx-auto shadow-2xl shadow-slate-900/50">
            <CardContent className="p-8 sm:p-12">
                {children}
            </CardContent>
        </Card>
    </motion.div>
);

const SearchableDropdown = ({ options, selected, onSelect, placeholder }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const filteredOptions = options.filter(option => 
        option.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full justify-between bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50 h-12 text-lg"
            >
                {selected || placeholder}
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-20 overflow-hidden"
                    >
                        <div className="p-2">
                            <Input
                                placeholder="Search..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                className="bg-slate-700 border-slate-600 text-white"
                                autoFocus
                            />
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                            {filteredOptions.map(option => (
                                <div
                                    key={option}
                                    onClick={() => {
                                        onSelect(option);
                                        setIsOpen(false);
                                        setQuery('');
                                    }}
                                    className="p-3 cursor-pointer hover:bg-slate-700 text-slate-200"
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ChipSelect = ({ options, selected, onToggle, multiSelect = true }) => (
    <div className="flex flex-wrap gap-3">
        {options.map(option => {
            const isSelected = multiSelect ? selected.includes(option.name) : selected === option.name;
            return (
                <motion.button
                    key={option.name}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onToggle(option.name)}
                    className={`px-4 py-2 rounded-full border-2 flex items-center gap-2 transition-all duration-200 text-base ${isSelected ? 'border-sky-500 bg-sky-500/10 text-white' : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 text-slate-300'}`}
                >
                    {option.icon}
                    <span className="font-medium">{option.name}</span>
                </motion.button>
            );
        })}
    </div>
);

// --- Step Components ---

const Step1_Welcome = ({ onNext }) => (
    <OnboardingContainer>
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to StackStage 🎉</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
               Let’s get to know your business so we can recommend the best tools and strategies for your tech stack.
            </p>
            <Button onClick={onNext} className="gradient-button text-white px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform">
                Let's Go <ArrowRight className="w-5 h-5 ml-2"/>
            </Button>
        </div>
    </OnboardingContainer>
);

const Step2_RoleSelection = ({ onSelect }) => {
    const roles = [
        { name: "Buyer", icon: <ShoppingCart className="w-8 h-8"/>, description: "I'm here to evaluate and purchase software for my company." },
        { name: "Seller", icon: <Store className="w-8 h-8"/>, description: "I'm a vendor looking to list my product and connect with buyers." },
    ];
    return (
        <OnboardingContainer>
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">👤 Are you a buyer or a seller?</h2>
                <p className="text-slate-400 mb-10">This helps us tailor your experience.</p>
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {roles.map(role => (
                        <motion.div 
                            key={role.name}
                            whileHover={{ y: -5 }}
                            onClick={() => onSelect(role.name)}
                            className="p-8 rounded-2xl border-2 border-slate-700 bg-slate-800/50 hover:border-sky-500/50 hover:bg-sky-900/20 cursor-pointer transition-all duration-200"
                        >
                            <div className="text-sky-400 mb-4">{role.icon}</div>
                            <h3 className="text-2xl font-bold text-white mb-2">{role.name}</h3>
                            <p className="text-slate-300">{role.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </OnboardingContainer>
    );
};

const Step3_CompanyContext = ({ formData, setFormData }) => {
    const roles = ["CIO", "CTO", "IT Manager", "Procurement Lead", "Finance Manager", "Operations Lead", "Marketing Director", "Founder"];
    const departments = ["IT", "Finance", "Ops", "Procurement", "Marketing", "Other"];
    const timeOptions = [{name: "🆕 Just started"}, {name: "⏳ Been here a while"}, {name: "🏢 I’m practically part of the building"}];
    const industries = {
        "Technology": ["SaaS", "FinTech", "Hardware", "AI/ML", "Cybersecurity"],
        "Healthcare": ["Provider", "Payer", "MedTech", "Pharma"],
        "Finance": ["Banking", "Investment", "Insurance"],
        "Retail": ["E-commerce", "Brick & Mortar", "CPG"],
        "Manufacturing": ["Automotive", "Aerospace", "Electronics"]
    };
    const employeeSizes = ["0-50", "51-100", "101-500", "501-1,000", "1,001-5,000", "5,001+"];

    const handleChipToggle = (field, value, isMulti) => {
        setFormData(prev => {
            if (isMulti) {
                const current = prev[field] || [];
                const newSelection = current.includes(value) ? current.filter(item => item !== value) : [...current, value];
                return { ...prev, [field]: newSelection };
            }
            return { ...prev, [field]: value };
        });
    };
    
    const handleIndustrySelect = (value) => {
        setFormData(p => ({ ...p, industry: value, subIndustry: '' }));
    };

    return (
        <OnboardingContainer>
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">🏢 Tell us about your company and role</h2>
                <p className="text-slate-400 mb-10">This context is key for accurate recommendations.</p>
                <div className="max-w-xl mx-auto text-left space-y-8">
                    <div>
                        <Label className="text-white font-semibold text-lg mb-3 block">What is your role?</Label>
                        <SearchableDropdown
                            options={roles}
                            selected={formData.role}
                            onSelect={value => setFormData(p => ({ ...p, role: value }))}
                            placeholder="e.g., IT Manager"
                        />
                    </div>
                    <div>
                        <Label className="text-white font-semibold text-lg mb-3 block">Which department are you in?</Label>
                        <ChipSelect
                            options={departments.map(d => ({ name: d }))}
                            selected={formData.department || []}
                            onToggle={value => handleChipToggle('department', value, true)}
                        />
                    </div>
                    <div>
                        <Label className="text-white font-semibold text-lg mb-3 block">How long have you been at the company?</Label>
                         <ChipSelect
                            options={timeOptions}
                            selected={formData.timeAtCompany || ''}
                            onToggle={value => handleChipToggle('timeAtCompany', value, false)}
                            multiSelect={false}
                        />
                    </div>
                    <div>
                        <Label className="text-white font-semibold text-lg mb-3 block">Industry</Label>
                        <SearchableDropdown
                            options={Object.keys(industries)}
                            selected={formData.industry}
                            onSelect={handleIndustrySelect}
                            placeholder="Select an industry"
                        />
                    </div>
                    {formData.industry && industries[formData.industry] && (
                         <div>
                            <Label className="text-white font-semibold text-lg mb-3 block">Sub-Industry</Label>
                            <SearchableDropdown
                                options={industries[formData.industry]}
                                selected={formData.subIndustry}
                                onSelect={value => setFormData(p => ({ ...p, subIndustry: value }))}
                                placeholder="Select a sub-industry"
                            />
                        </div>
                    )}
                     <div>
                        <Label className="text-white font-semibold text-lg mb-3 block">Number of Employees</Label>
                        <ChipSelect
                            options={employeeSizes.map(s => ({ name: s }))}
                            selected={formData.employeeCount || ''}
                            onToggle={value => setFormData(p => ({...p, employeeCount: value}))}
                            multiSelect={false}
                        />
                    </div>
                </div>
            </div>
        </OnboardingContainer>
    );
};

const Step4_Categories = ({ formData, setFormData }) => {
    const categories = [
        { name: "CRM", icon: <Users /> },
        { name: "Marketing Automation", icon: <Megaphone /> },
        { name: "Customer Support / CX", icon: <Headset /> },
        { name: "Collaboration", icon: <ClipboardList /> },
        { name: "Finance & ERP", icon: <Banknote /> },
        { name: "HRIS", icon: <Briefcase /> },
        { name: "DevOps / Engineering", icon: <TerminalSquare /> },
        { name: "BI / Reporting", icon: <BarChart /> },
        { name: "Procurement / Vendor Management", icon: <ShoppingCart /> },
        { name: "AI & Automation", icon: <Sparkles /> },
        { name: "Security & Compliance", icon: <Lock /> }
    ];

    const handleToggle = (categoryName) => {
        setFormData(prev => {
            const current = prev.categories || [];
            const newSelection = current.includes(categoryName)
                ? current.filter(item => item !== categoryName)
                : [...current, categoryName];
            return { ...prev, categories: newSelection };
        });
    };

    return (
        <OnboardingContainer>
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">📂 What types of tools are you exploring?</h2>
                <p className="text-slate-400 mb-8">Select all that apply. This helps us focus your recommendations.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-4xl mx-auto my-10">
                    {categories.map(cat => {
                        const isSelected = (formData.categories || []).includes(cat.name);
                        return (
                            <motion.div
                                key={cat.name}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleToggle(cat.name)}
                                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 h-28 ${isSelected ? 'border-sky-500 bg-sky-500/10' : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'}`}
                            >
                                <div className={`w-8 h-8 ${isSelected ? 'text-sky-400' : 'text-slate-300'}`}>{cat.icon}</div>
                                <p className={`font-medium text-sm text-center ${isSelected ? 'text-white' : 'text-slate-300'}`}>{cat.name}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </OnboardingContainer>
    );
};

const SmartInput = ({ label, placeholder, categoryKey, field, suggestions, formData, setFormData }) => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    
    const selectedItems = formData.toolsAndGaps?.[categoryKey]?.[field] || [];

    const handleDataChange = (newItems) => {
        setFormData(prev => ({
            ...prev,
            toolsAndGaps: {
                ...(prev.toolsAndGaps || {}),
                [categoryKey]: {
                    ...(prev.toolsAndGaps?.[categoryKey] || {}),
                    [field]: newItems
                }
            }
        }));
    };

    const addItem = (item) => {
        if (item && !selectedItems.includes(item)) {
            handleDataChange([...selectedItems, item]);
        }
        setInputValue('');
    };

    const removeItem = (itemToRemove) => {
        handleDataChange(selectedItems.filter(item => item !== itemToRemove));
    };

    const filteredSuggestions = suggestions.filter(s =>
        s.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedItems.includes(s)
    ).slice(0, 5);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue) {
            e.preventDefault();
            addItem(inputValue);
        }
    };

    return (
        <div className="space-y-2">
            <Label className="text-lg font-semibold text-slate-200">{label}</Label>
            <div className="relative">
                 <div className="w-full flex flex-wrap items-center gap-2 p-2 rounded-xl bg-slate-800/50 border-2 border-slate-600 focus-within:border-sky-500 transition-colors">
                    {selectedItems.map(item => (
                        <Badge key={item} className="bg-slate-700 text-slate-200 py-1 px-3 text-sm">
                            {item}
                            <X onClick={() => removeItem(item)} className="w-3 h-3 ml-2 cursor-pointer hover:text-white" />
                        </Badge>
                    ))}
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        placeholder={selectedItems.length > 0 ? "" : placeholder}
                        className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-white p-0 h-auto placeholder-slate-500"
                    />
                </div>
                <AnimatePresence>
                    {isFocused && inputValue && filteredSuggestions.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10 overflow-hidden"
                        >
                            {filteredSuggestions.map(suggestion => (
                                <div key={suggestion} onMouseDown={() => addItem(suggestion)} className="p-3 cursor-pointer hover:bg-slate-700 text-slate-200">
                                    {suggestion}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
                {suggestions.slice(0, 5).map(s => (
                    !selectedItems.includes(s) && (
                        <Badge key={s} onClick={() => addItem(s)} variant="outline" className="cursor-pointer border-slate-600 text-slate-300 hover:bg-slate-700">
                           <Plus className="w-3 h-3 mr-1" /> {s}
                        </Badge>
                    )
                ))}
            </div>
             <p className="text-xs text-slate-500">Don’t see what you’re looking for? Type your own and press Enter.</p>
        </div>
    );
};

const ToolSelector = ({ categoryKey, categoryData, formData, setFormData }) => {
    const [customTool, setCustomTool] = useState('');
    const selectedTools = formData.toolsAndGaps?.[categoryKey]?.currentTools || [];

    const handleDataChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            toolsAndGaps: {
                ...(prev.toolsAndGaps || {}),
                [categoryKey]: {
                    ...(prev.toolsAndGaps?.[categoryKey] || {}),
                    [field]: value
                }
            }
        }));
    };

    const handleToolClick = (toolName) => {
        const newSelection = selectedTools.includes(toolName)
            ? selectedTools.filter(t => t !== toolName)
            : [...selectedTools, toolName];
        handleDataChange('currentTools', newSelection);
    };

    const handleAddCustom = (e) => {
        e.preventDefault();
        if (customTool && !selectedTools.includes(customTool)) {
            handleDataChange('currentTools', [...selectedTools, customTool]);
            setCustomTool('');
        }
    };

    return (
        <div className="space-y-6">
            <Label className="text-lg font-semibold text-slate-200">Tools Currently Used</Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {categoryData.tools.map(tool => (
                    <motion.button
                        key={tool.name}
                        type="button"
                        onClick={() => handleToolClick(tool.name)}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-200 h-24 ${selectedTools.includes(tool.name) ? 'border-sky-500 bg-sky-500/10' : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'}`}
                    >
                        <img src={tool.logo} alt={tool.name} className="w-8 h-8 rounded-md bg-white p-1" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                        <div className="hidden text-xs font-bold text-center">{tool.name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>
                        <span className="text-xs text-slate-300 font-medium text-center">{tool.name}</span>
                    </motion.button>
                ))}
            </div>
            <div className="space-y-2">
                <p className="text-sm text-slate-400">Don’t see your tool? Type it or paste the website URL</p>
                <form onSubmit={handleAddCustom} className="flex gap-2">
                    <Input value={customTool} onChange={(e) => setCustomTool(e.target.value)} placeholder="e.g., Custom Tool or mytool.com" className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-500" />
                    <Button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white px-4">Add</Button>
                </form>
            </div>
             {selectedTools.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                    {selectedTools.map(t => (
                        <Badge key={t} className="bg-sky-500/20 text-sky-300 border-sky-500/50 py-1 px-3 text-sm">
                            {t}
                            <X onClick={() => handleToolClick(t)} className="w-3 h-3 ml-2 cursor-pointer hover:text-white" />
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
};

const Step5_ToolsAndGaps = ({ formData, setFormData }) => {
    const [expandedSections, setExpandedSections] = useState({});
    
    const toolCategories = {
        'CRM': { tools: [{ name: 'Salesforce', logo: 'https://logo.clearbit.com/salesforce.com' }, { name: 'HubSpot', logo: 'https://logo.clearbit.com/hubspot.com' }, { name: 'Zoho CRM', logo: 'https://logo.clearbit.com/zoho.com' }], gaps: ['No automation', 'Limited integrations', 'Poor forecasting'], problems: ['Reps don’t use it', 'Too expensive', 'Slow load times'] },
        'Marketing Automation': { tools: [{ name: 'Marketo', logo: 'https://logo.clearbit.com/marketo.com' }, { name: 'Pardot', logo: 'https://logo.clearbit.com/pardot.com' }, { name: 'Mailchimp', logo: 'https://logo.clearbit.com/mailchimp.com' }], gaps: ['No lead scoring', 'No A/B testing', 'Missing attribution'], problems: ['Low deliverability', 'UI too complex', 'Can\'t see ROI'] },
        'Customer Support / CX': { tools: [{ name: 'Zendesk', logo: 'https://logo.clearbit.com/zendesk.com' }, { name: 'Intercom', logo: 'https://logo.clearbit.com/intercom.com' }, { name: 'Freshdesk', logo: 'https://logo.clearbit.com/freshworks.com' }], gaps: ['No chatbot', 'No CSAT tracking', 'Missing knowledge base'], problems: ['Agents overwhelmed', 'Long response times', 'High ticket volume'] }
    };
    
    const relevantCategories = (formData.categories || []).filter(cat => toolCategories[cat]);

    useEffect(() => {
        const allExpanded = {};
        relevantCategories.forEach(category => allExpanded[category] = true);
        setExpandedSections(allExpanded);
    }, []);

    const toggleSection = (categoryId) => {
        setExpandedSections(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
    };

    return (
        <div className="w-full">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">🛠️ Add Your Current Tools</h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">Listing your tools helps us identify risks, gaps, and integration opportunities.</p>
            </div>
            <div className="space-y-6">
                {relevantCategories.length > 0 ? relevantCategories.map(categoryName => {
                    const categoryData = toolCategories[categoryName];
                    const isExpanded = expandedSections[categoryName];
                    return (
                        <Card key={categoryName} className="bg-slate-800/50 border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                             <CardHeader onClick={() => toggleSection(categoryName)} className="cursor-pointer flex flex-row items-center justify-between p-6">
                                <CardTitle className="text-white text-2xl flex items-center gap-3">{categoryName}</CardTitle>
                                <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </CardHeader>
                            <AnimatePresence>
                            {isExpanded && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                                    <CardContent className="p-6 pt-0 space-y-8 border-t border-slate-700/50">
                                        <ToolSelector categoryKey={categoryName} categoryData={categoryData} formData={formData} setFormData={setFormData} />
                                        <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-slate-700/50">
                                            <SmartInput label="Known Gaps" placeholder="e.g., No automation..." categoryKey={categoryName} field="knownGaps" suggestions={categoryData.gaps} formData={formData} setFormData={setFormData} />
                                            <SmartInput label="Known Problems" placeholder="e.g., Too expensive..." categoryKey={categoryName} field="knownProblems" suggestions={categoryData.problems} formData={formData} setFormData={setFormData} />
                                        </div>
                                    </CardContent>
                                </motion.div>
                            )}
                            </AnimatePresence>
                        </Card>
                    )
                }) : (
                    <OnboardingContainer><p className="text-center text-slate-400">Please go back and select at least one category to proceed.</p></OnboardingContainer>
                )}
            </div>
        </div>
    );
};

const Step6_Goals = ({ formData, setFormData }) => {
    const goals = [
        { name: "Reduce costs", icon: <FileCog /> },
        { name: "Consolidate tools", icon: <Repeat /> },
        { name: "Improve integrations", icon: <FileText /> },
        { name: "Adopt AI", icon: <Sparkles /> },
        { name: "Replace vendor", icon: <Users /> },
        { name: "Improve security posture", icon: <Lock /> },
        { name: "Better analytics & reporting", icon: <BarChart /> }
    ];

    const handleToggle = (goalName) => {
        setFormData(prev => {
            const current = prev.goals || [];
            const newSelection = current.includes(goalName) ? current.filter(item => item !== goalName) : [...current, goalName];
            return { ...prev, goals: newSelection };
        });
    };

    return (
        <OnboardingContainer>
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">🎯 What’s most important for you right now?</h2>
                <p className="text-slate-400 mb-8">Select your primary goals for this evaluation.</p>
                <div className="max-w-3xl mx-auto">
                    <ChipSelect
                        options={goals}
                        selected={formData.goals || []}
                        onToggle={handleToggle}
                    />
                </div>
                <div className="max-w-xl mx-auto mt-8 text-left">
                     <Label className="text-white font-semibold text-lg">Other goal (optional)</Label>
                     <Input
                        value={formData.otherGoal || ''}
                        onChange={e => setFormData(p => ({ ...p, otherGoal: e.target.value }))}
                        placeholder="e.g., Improve team collaboration"
                        className="bg-slate-800/50 border-slate-600 text-white mt-2 placeholder-slate-500"
                     />
                </div>
            </div>
        </OnboardingContainer>
    );
};

const Step7_Timeline = ({ formData, setFormData }) => {
    const timelines = ["Actively evaluating now", "In the next 3 months", "3-6 months from now", "6-12 months", "Just browsing / No plans"];
    const quickAdds = ["Contract Renewal", "Budget Planning", "Cloud Migration", "New Exec Hired", "M&A Activity"];

    const showDetails = formData.timeline && formData.timeline !== "Just browsing / No plans";

    const handleQuickAdd = (add) => {
        setFormData(p => ({...p, timelineEvents: p.timelineEvents ? `${p.timelineEvents}, ${add}`: add }));
    };

    return (
        <OnboardingContainer>
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">📆 When do you expect to evaluate or switch tools?</h2>
                 <div className="flex flex-wrap justify-center gap-3 my-10 max-w-3xl mx-auto">
                    {timelines.map(time => {
                        const isSelected = formData.timeline === time;
                        return (
                             <motion.button
                                key={time}
                                type="button"
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setFormData(p => ({...p, timeline: time}))}
                                className={`px-4 py-3 rounded-xl border-2 flex-grow transition-all duration-200 text-base ${isSelected ? 'border-sky-500 bg-sky-500/10 text-white' : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 text-slate-300'}`}
                            >
                                {time}
                            </motion.button>
                        );
                    })}
                </div>
                <AnimatePresence>
                {showDetails && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-xl mx-auto text-left">
                        <div>
                            <Label className="text-white font-semibold text-lg">💡 Any key dates or events coming up?</Label>
                            <Textarea
                                value={formData.timelineEvents || ''}
                                onChange={(e) => setFormData(p => ({...p, timelineEvents: e.target.value}))}
                                placeholder="e.g. Our CRM contract ends in September…"
                                className="bg-slate-800/50 border-slate-600 text-white min-h-[100px] mt-2 placeholder-slate-500"
                            />
                            <div className="flex flex-wrap gap-2 mt-3">
                                {quickAdds.map(qa => <Badge key={qa} onClick={() => handleQuickAdd(qa)} variant="outline" className="cursor-pointer border-slate-600 text-slate-300 hover:bg-slate-700"><Plus className="w-3 h-3 mr-1" /> {qa}</Badge>)}
                            </div>
                        </div>
                         <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                             <Label htmlFor="reminder-toggle" className="font-semibold text-white flex-1 cursor-pointer">Want a reminder before your renewal or project date?</Label>
                            <div className="relative">
                                <Switch 
                                    id="reminder-toggle" 
                                    checked={formData.wantsReminder} 
                                    onCheckedChange={(checked) => setFormData(p => ({...p, wantsReminder: checked}))}
                                    className="data-[state=checked]:bg-sky-500 data-[state=unchecked]:bg-slate-600 border-2 border-slate-500 data-[state=checked]:border-sky-400"
                                />
                            </div>
                        </div>
                        {formData.wantsReminder && (
                             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                                <Label className="text-white font-semibold text-lg">Email for reminder</Label>
                                <Input
                                    type="email"
                                    value={formData.reminderEmail || ''}
                                    onChange={(e) => setFormData(p => ({...p, reminderEmail: e.target.value}))}
                                    placeholder="your.email@company.com"
                                    className="bg-slate-800/50 border-slate-600 text-white mt-2 placeholder-slate-500"
                                />
                             </motion.div>
                        )}
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </OnboardingContainer>
    );
};

const Step8_Stakeholders = ({ formData, setFormData }) => {
    const teamSizes = ["Just me", "Small team (2-3 people)", "Multi-department team", "Exec sponsor needed"];
    const roles = ["IT/Admin", "Finance", "Operations", "Procurement", "End users"];

    const handleToggle = (field, value) => {
        setFormData(prev => {
            const current = prev[field] || [];
            const newSelection = current.includes(value) ? current.filter(item => item !== value) : [...current, value];
            return { ...prev, [field]: newSelection };
        });
    };

    return (
        <OnboardingContainer>
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">🧑‍🤝‍🧑 Who else is usually involved in decisions like this?</h2>
                <div className="max-w-2xl mx-auto text-left space-y-8 mt-10">
                    <div>
                        <Label className="text-white font-semibold text-lg mb-3 block">Team Size & Structure</Label>
                        <ChipSelect options={teamSizes.map(s => ({name: s}))} selected={formData.stakeholderTeamSize || []} onToggle={(v) => handleToggle('stakeholderTeamSize', v)} />
                    </div>
                    <div>
                        <Label className="text-white font-semibold text-lg mb-3 block">Typical Roles Involved</Label>
                        <ChipSelect options={roles.map(r => ({name: r}))} selected={formData.stakeholderRoles || []} onToggle={(v) => handleToggle('stakeholderRoles', v)} />
                    </div>
                </div>
            </div>
        </OnboardingContainer>
    );
};

const Step9_Privacy = ({ formData, setFormData }) => {
    const trustCards = [
        { icon: <ShieldCheck className="w-8 h-8 text-emerald-400"/>, title: "Private by Default", description: "Your identity and stack remain 100% anonymous unless you choose to share." },
        { icon: <Eye className="w-8 h-8 text-sky-400"/>, title: "Control Who Contacts You", description: "No vendor spam. You decide if and when to engage with solution providers." },
        { icon: <HeartHandshake className="w-8 h-8 text-purple-400"/>, title: "Built for Buyers", description: "Our model is aligned with your success, not vendor sales quotas." }
    ];
    const preferences = [
        { key: "approveVendorContact", label: "Allow vendor contact only when I approve" },
        { key: "previewRecommendations", label: "Preview recommendations before any vendor contact" },
        { key: "renewalAlerts", label: "Send me renewal alerts" },
        { key: "industryInsights", label: "Notify me about key industry insights" }
    ];
    
    const handleToggle = (key, checked) => {
        setFormData(prev => ({ ...prev, privacy: { ...prev.privacy, [key]: checked } }));
    };

    return (
        <OnboardingContainer>
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">🔒 You’re in control</h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">We’ll never share your info with vendors without your permission. You decide who can contact you and when.</p>
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                    {trustCards.map(card => (
                        <div key={card.title} className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl text-center">
                            <div className="inline-block p-3 bg-slate-700/50 rounded-xl mb-4">{card.icon}</div>
                            <h3 className="font-semibold text-white text-xl mb-2">{card.title}</h3>
                            <p className="text-slate-400 text-sm">{card.description}</p>
                        </div>
                    ))}
                </div>
                <div className="max-w-xl mx-auto space-y-4 text-left">
                    {preferences.map(pref => (
                         <div key={pref.key} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                             <Label htmlFor={pref.key} className="font-semibold text-white flex-1 cursor-pointer">{pref.label}</Label>
                            <div className="relative">
                                <Switch 
                                    id={pref.key} 
                                    checked={formData.privacy?.[pref.key]} 
                                    onCheckedChange={(checked) => handleToggle(pref.key, checked)}
                                    className="data-[state=checked]:bg-sky-500 data-[state=unchecked]:bg-slate-600 border-2 border-slate-500 data-[state=checked]:border-sky-400"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </OnboardingContainer>
    );
};

// --- Main Onboarding Component ---

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        userRole: '',
        role: '',
        department: [],
        timeAtCompany: '',
        industry: '',
        subIndustry: '',
        employeeCount: '',
        categories: [],
        toolsAndGaps: {},
        goals: [],
        otherGoal: "",
        timeline: '',
        timelineEvents: '',
        wantsReminder: false,
        reminderEmail: '',
        stakeholderTeamSize: [],
        stakeholderRoles: [],
        privacy: {
            approveVendorContact: true,
            previewRecommendations: true,
            renewalAlerts: false,
            industryInsights: false
        }
    });

    const totalSteps = 10;

    const handleNext = () => setCurrentStep(prev => prev < totalSteps ? prev + 1 : totalSteps);
    const handleBack = () => setCurrentStep(prev => prev > 1 ? prev - 1 : 1);
    const handleReset = () => {
        setFormData({
            userRole: '', role: '', department: [], timeAtCompany: '', industry: '', subIndustry: '',
            employeeCount: '', categories: [], toolsAndGaps: {}, goals: [], otherGoal: "",
            timeline: '', timelineEvents: '', wantsReminder: false, reminderEmail: '',
            stakeholderTeamSize: [], stakeholderRoles: [],
            privacy: { approveVendorContact: true, previewRecommendations: true, renewalAlerts: false, industryInsights: false }
        });
        setCurrentStep(1);
    };

    const handleFinish = async () => {
        try {
            await User.updateMyUserData({ onboardingData: formData, onboardingComplete: true });
        } catch (error) {
            console.error("Failed to save user data", error);
        } finally {
            window.location.href = createPageUrl('StackAssessment');
        }
    };
    
    const handleRoleSelect = (role) => {
        setFormData(prev => ({...prev, userRole: role}));
        if (role === 'Seller') {
            // Redirect to a placeholder or seller onboarding if it exists
             window.location.href = createPageUrl('VendorLanding');
        } else {
            handleNext();
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return <Step1_Welcome onNext={handleNext} />;
            case 2: return <Step2_RoleSelection onSelect={handleRoleSelect} />;
            case 3: return <Step3_CompanyContext formData={formData} setFormData={setFormData} />;
            case 4: return <Step4_Categories formData={formData} setFormData={setFormData} />;
            case 5: return <Step5_ToolsAndGaps formData={formData} setFormData={setFormData} />;
            case 6: return <Step6_Goals formData={formData} setFormData={setFormData} />;
            case 7: return <Step7_Timeline formData={formData} setFormData={setFormData} />;
            case 8: return <Step8_Stakeholders formData={formData} setFormData={setFormData} />;
            case 9: return <Step9_Privacy formData={formData} setFormData={setFormData} />;
            case 10: return (
                <OnboardingContainer>
                    <div className="text-center">
                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">✅ You're All Set!</h2>
                         <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">We've analyzed your input and generated a personalized set of recommendations for your tech stack.</p>
                         <Button onClick={handleFinish} className="gradient-button text-white px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform">
                            View My StackStage Recommendations <ArrowRight className="w-5 h-5 ml-2"/>
                         </Button>
                    </div>
                </OnboardingContainer>
            );
            default: return <Step1_Welcome onNext={handleNext} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            <header className="w-full max-w-7xl mx-auto flex justify-between items-center mb-6">
                 <Link to={createPageUrl('index')} className="flex items-center space-x-3">
                    <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ab8a95562_ChatGPTImageJul4202506_13_46PM.png" alt="StackStage Logo" className="w-10 h-10" />
                    <span className="text-xl font-bold gradient-text">StackStage</span>
                </Link>
                 <div className="flex items-center gap-4">
                    {currentStep > 1 && <Button onClick={handleReset} variant="ghost" className="text-slate-400 hover:text-white"><RotateCcw className="w-4 h-4 mr-2" /> Start Over</Button>}
                </div>
            </header>

            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-6xl"
                >
                    {renderStepContent()}
                </motion.div>
            </AnimatePresence>

            {currentStep > 1 && currentStep < totalSteps && (
                <footer className="mt-8 flex items-center justify-center gap-4 w-full max-w-4xl">
                    <Button onClick={handleBack} variant="outline" className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700">
                        <ArrowLeft className="w-4 h-4 mr-2"/> Back
                    </Button>
                    <Button onClick={handleNext} className="gradient-button text-white px-8 py-3 text-lg">
                        Continue <ArrowRight className="w-5 h-5 ml-2"/>
                    </Button>
                </footer>
            )}
        </div>
    );
}
