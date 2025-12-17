
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tag, X, Plus, Lightbulb, Check, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialVendors = [
  { id: 1, name: 'Salesforce', category: 'CRM', tags: { fit: ['Enterprise-ready'], risk: [], timing: ['Evaluate in Q4'], stackfit: [] } },
  { id: 2, name: 'HubSpot', category: 'Marketing', tags: { fit: ['SMB-friendly'], risk: ['Complex pricing'], timing: [], stackfit: ['Replaces Mailchimp'] } },
  { id: 3, name: 'Figma', category: 'Design', tags: { fit: ['Best for async teams'], risk: [], timing: ['Urgent Need'], stackfit: [] } },
  { id: 4, name: 'Jira', category: 'DevOps', tags: { fit: [], risk: ['Hard to deploy'], timing: [], stackfit: [] } },
  { id: 5, name: 'Slack', category: 'Comms', tags: { fit: [], risk: [], timing: [], stackfit: ['Replaced by Teams'] } },
  { id: 6, name: 'Gong', category: 'Sales Intelligence', tags: { fit: [], risk: [], timing: [], stackfit: ['Integrates with Salesforce'] } },
  { id: 7, name: 'Notion', category: 'Productivity', tags: { fit: ['Great for knowledge base'], risk: [], timing: ['Hold Until Q1'], stackfit: [] } },
];

const aiSuggestions = [
    { tag: 'High implementation cost', category: 'risk' },
    { tag: 'Strong user community', category: 'fit' },
    { tag: 'Q3 Renewal', category: 'timing' },
    { tag: 'Consolidates 2+ tools', category: 'stackfit' },
];

const tagCategoryStyles = {
    fit: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    risk: 'bg-red-500/20 text-red-300 border-red-500/30',
    timing: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    stackfit: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
};

const TagChip = ({ children, onRemove, category }) => (
    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
        <Badge variant="outline" className={`text-sm py-1 px-3 ${tagCategoryStyles[category]}`}>
            {children}
            <button onClick={onRemove} className="ml-2 rounded-full hover:bg-white/20 p-0.5">
                <X className="w-3 h-3" />
            </button>
        </Badge>
    </motion.div>
);

export default function VendorTagging() {
  const [vendors, setVendors] = useState(initialVendors);
  const [selectedVendorId, setSelectedVendorId] = useState(1);
  const [newTag, setNewTag] = useState('');
  const [newTagCategory, setNewTagCategory] = useState('fit');
  const [isSaving, setIsSaving] = useState(false);

  const selectedVendor = useMemo(() => vendors.find(v => v.id === selectedVendorId), [vendors, selectedVendorId]);

  const handleAddTag = (tag, category) => {
    if (!tag.trim()) return;
    const updatedVendors = vendors.map(vendor => {
        if (vendor.id === selectedVendorId) {
            const newTags = { ...vendor.tags };
            if (!newTags[category].includes(tag)) {
                newTags[category] = [...newTags[category], tag];
            }
            return { ...vendor, tags: newTags };
        }
        return vendor;
    });
    setVendors(updatedVendors);
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove, category) => {
    const updatedVendors = vendors.map(vendor => {
        if (vendor.id === selectedVendorId) {
            const newTags = { ...vendor.tags };
            newTags[category] = newTags[category].filter(t => t !== tagToRemove);
            return { ...vendor, tags: newTags };
        }
        return vendor;
    });
    setVendors(updatedVendors);
  };
  
  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
        setIsSaving(false);
    }, 1500);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-2">Vendor Tagging</h1>
      <p className="text-slate-300 mb-8">Organize vendors with private tags to surface the right solutions at the right time. These tags are not visible to vendors.</p>

      <Card className="glass-effect border-slate-700 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
          {/* Left Column: Vendor List */}
          <div className="md:col-span-1 xl:col-span-1 border-r border-slate-700">
             <CardHeader>
                <CardTitle className="text-white">Your Vendors</CardTitle>
             </CardHeader>
             <CardContent className="p-2">
                <div className="space-y-1">
                    {vendors.map(vendor => (
                        <button 
                            key={vendor.id}
                            onClick={() => setSelectedVendorId(vendor.id)}
                            className={`w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-center gap-3 ${selectedVendorId === vendor.id ? 'bg-sky-500/20' : 'hover:bg-slate-800/50'}`}
                        >
                            <img src={`https://logo.clearbit.com/${vendor.name.toLowerCase().replace(' ', '')}.com`} alt={`${vendor.name} logo`} className="w-8 h-8 rounded-lg bg-white p-1" />
                            <div>
                                <p className={`font-semibold ${selectedVendorId === vendor.id ? 'text-sky-300' : 'text-white'}`}>{vendor.name}</p>
                                <p className="text-sm text-slate-400">{vendor.category}</p>
                            </div>
                        </button>
                    ))}
                </div>
             </CardContent>
          </div>
          
          {/* Right Column: Tagging Panel */}
          <div className="md:col-span-2 xl:col-span-3">
            {selectedVendor ? (
              <>
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-2xl mb-1">{selectedVendor.name}</CardTitle>
                    <p className="text-slate-400">Manage private tags for this vendor.</p>
                  </div>
                  <Button 
                    className="gradient-button text-white"
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Check className="w-4 h-4 mr-2 animate-pulse" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardHeader>

                <CardContent className="space-y-8">
                  {/* Add New Tag Section */}
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <Label className="text-slate-300 font-medium mb-2 block">Add a New Tag</Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        placeholder="e.g., 'Best for async teams'"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                      />
                      <Select value={newTagCategory} onValueChange={setNewTagCategory}>
                        <SelectTrigger className="w-full sm:w-[150px] bg-slate-800 border-slate-600 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                          <SelectItem value="fit">Fit</SelectItem>
                          <SelectItem value="risk">Risk</SelectItem>
                          <SelectItem value="timing">Timing</SelectItem>
                          <SelectItem value="stackfit">StackFit</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="bg-white text-slate-900 hover:bg-slate-200" onClick={() => handleAddTag(newTag, newTagCategory)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Tag Categories */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Fit Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                          {selectedVendor.tags.fit.map(tag => <TagChip key={tag} onRemove={() => handleRemoveTag(tag, 'fit')} category="fit">{tag}</TagChip>)}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">Risk Tags</h4>
                      <div className="flex flex-wrap gap-2">
                         <AnimatePresence>
                          {selectedVendor.tags.risk.map(tag => <TagChip key={tag} onRemove={() => handleRemoveTag(tag, 'risk')} category="risk">{tag}</TagChip>)}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">Timing Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                          {selectedVendor.tags.timing.map(tag => <TagChip key={tag} onRemove={() => handleRemoveTag(tag, 'timing')} category="timing">{tag}</TagChip>)}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">StackFit Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                          {selectedVendor.tags.stackfit.map(tag => <TagChip key={tag} onRemove={() => handleRemoveTag(tag, 'stackfit')} category="stackfit">{tag}</TagChip>)}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* AI Suggestions */}
                  <div>
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-400" /> AI Suggestions</h4>
                    <div className="flex flex-wrap gap-2">
                        {aiSuggestions.map(suggestion => (
                            <Button 
                                key={suggestion.tag} 
                                variant="outline" 
                                size="sm" 
                                className={`text-xs h-auto py-1 ${tagCategoryStyles[suggestion.category]}`} 
                                onClick={() => handleAddTag(suggestion.tag, suggestion.category)}
                            >
                                <Plus className="w-3 h-3 mr-1" />
                                {suggestion.tag}
                            </Button>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <p>Select a vendor from the list to manage their tags.</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
