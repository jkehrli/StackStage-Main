import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertTriangle, CheckCircle, TrendingDown, Calendar, X, Search, FileText, Download, Upload, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockRenewals = [
  { name: 'Analytics Pro', days: 25, signal: 'Usage drop-off', risk: 'Red', recommendation: 'Replace', tooltip: 'Usage dropped from 85 to 47 users.', category: 'Analytics', budget: '$15,000' },
  { name: 'Sales CRM', days: 45, signal: 'Low NPS score', risk: 'Yellow', recommendation: 'Negotiate', tooltip: 'Internal NPS score is 6.2, below threshold.', category: 'CRM', budget: '$24,000' },
  { name: 'Dev Toolkit', days: 80, signal: 'Healthy usage', risk: 'Green', recommendation: 'Renew', tooltip: 'Usage is stable and consistent.', category: 'Development', budget: '$8,000' },
];

const riskStyles = {
  Red: { icon: <TrendingDown className="w-4 h-4 text-red-400" />, text: 'text-red-400', bg: 'bg-red-400/10', buttonClass: 'bg-red-600 hover:bg-red-700 text-white' },
  Yellow: { icon: <AlertTriangle className="w-4 h-4 text-yellow-400" />, text: 'text-yellow-400', bg: 'bg-yellow-400/10', buttonClass: 'bg-yellow-600 hover:bg-yellow-700 text-white' },
  Green: { icon: <CheckCircle className="w-4 h-4 text-emerald-400" />, text: 'text-emerald-400', bg: 'bg-emerald-400/10', buttonClass: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
};

const Modal = ({ children, onClose, maxWidth = 'max-w-2xl' }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className={`glass-effect border-slate-700 rounded-xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

const ReplaceModal = ({ tool, onClose }) => {
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [isStartingSearch, setIsStartingSearch] = useState(false);

  const reasons = [
    'Cost too high',
    'Feature gaps',
    'Integration issues',
    'Poor internal feedback',
    'Security concerns',
    'Other'
  ];

  const handleStartSearch = () => {
    setIsStartingSearch(true);
    setTimeout(() => {
      onClose();
      // In real implementation, this would navigate to Stack Planner
      alert(`Starting replacement search for ${tool.name} in ${tool.category} category`);
    }, 1500);
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Replace {tool.name}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </div>

        {!isStartingSearch ? (
          <div className="space-y-6">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <TrendingDown className="w-5 h-5 text-red-400" />
                <span className="font-semibold text-red-400">Tool Replacement Recommended</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Days Left:</span>
                  <span className="text-white ml-2 font-medium">{tool.days}</span>
                </div>
                <div>
                  <span className="text-slate-400">Category:</span>
                  <span className="text-white ml-2 font-medium">{tool.category}</span>
                </div>
                <div>
                  <span className="text-slate-400">Current Budget:</span>
                  <span className="text-white ml-2 font-medium">{tool.budget}</span>
                </div>
                <div>
                  <span className="text-slate-400">Signal:</span>
                  <span className="text-red-400 ml-2 font-medium">{tool.signal}</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-slate-300 text-sm font-medium mb-3 block">
                Why are you replacing this tool? *
              </Label>
              <div className="space-y-2">
                {reasons.map((reasonOption) => (
                  <div key={reasonOption} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={reasonOption}
                      name="reason"
                      value={reasonOption}
                      checked={reason === reasonOption}
                      onChange={(e) => setReason(e.target.value)}
                      className="text-sky-500"
                    />
                    <Label htmlFor={reasonOption} className="text-slate-300 cursor-pointer">
                      {reasonOption}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {reason === 'Other' && (
              <div>
                <Label className="text-slate-300 text-sm font-medium">
                  Please specify:
                </Label>
                <Textarea
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Describe your specific reason..."
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
            )}

            <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
              <h4 className="font-semibold text-sky-300 mb-2">Next Steps</h4>
              <ul className="text-sm text-sky-200 space-y-1">
                <li>• Pre-filtered {tool.category} category in Stack Planner</li>
                <li>• Smart shortlist of 2-3 recommended alternatives</li>
                <li>• Timeline added to your stack evolution plan</li>
                <li>• Stakeholder recommendations for evaluation</li>
              </ul>
            </div>

            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={handleStartSearch}
              disabled={!reason}
            >
              <Search className="w-4 h-4 mr-2" />
              Start Replacement Search
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-red-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Launching Stack Planner...</h4>
            <p className="text-slate-300">
              Preparing your personalized replacement search for {tool.name}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

const NegotiateModal = ({ tool, onClose }) => {
  const [checklist, setChecklist] = useState({
    volumeDiscount: false,
    commitmentSwap: false,
    bundledTools: false,
    removeFeatures: false
  });
  const [notes, setNotes] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const handleChecklistChange = (item) => {
    setChecklist(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleExportBrief = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Negotiation brief exported successfully!');
    }, 2000);
  };

  const handleCompareAlternatives = () => {
    onClose();
    alert(`Opening side-by-side comparison for ${tool.name} alternatives`);
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Negotiate {tool.name}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-yellow-400">Contract Optimization Opportunity</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Contract End:</span>
                <span className="text-white ml-2 font-medium">{tool.days} days</span>
              </div>
              <div>
                <span className="text-slate-400">Current Budget:</span>
                <span className="text-white ml-2 font-medium">{tool.budget}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400">Issue:</span>
                <span className="text-yellow-400 ml-2 font-medium">{tool.signal}</span>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-slate-300 text-sm font-medium mb-3 block">
              Negotiation Checklist
            </Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="volumeDiscount"
                  checked={checklist.volumeDiscount}
                  onCheckedChange={() => handleChecklistChange('volumeDiscount')}
                />
                <Label htmlFor="volumeDiscount" className="text-slate-300 cursor-pointer">
                  Request volume discount for multi-year commitment
                </Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="commitmentSwap"
                  checked={checklist.commitmentSwap}
                  onCheckedChange={() => handleChecklistChange('commitmentSwap')}
                />
                <Label htmlFor="commitmentSwap" className="text-slate-300 cursor-pointer">
                  Swap commitment terms (annual to monthly or vice versa)
                </Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="bundledTools"
                  checked={checklist.bundledTools}
                  onCheckedChange={() => handleChecklistChange('bundledTools')}
                />
                <Label htmlFor="bundledTools" className="text-slate-300 cursor-pointer">
                  Ask for bundled tools or additional features
                </Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="removeFeatures"
                  checked={checklist.removeFeatures}
                  onCheckedChange={() => handleChecklistChange('removeFeatures')}
                />
                <Label htmlFor="removeFeatures" className="text-slate-300 cursor-pointer">
                  Remove unused features/modules to reduce cost
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-slate-300 text-sm font-medium">
              Additional Notes
            </Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add specific negotiation points or leverage you have..."
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
              onClick={handleExportBrief}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export Negotiation Brief
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
              onClick={handleCompareAlternatives}
            >
              Compare Alternatives
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const RenewModal = ({ tool, onClose }) => {
  const [notes, setNotes] = useState('');
  const [uploadContract, setUploadContract] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmRenewal = () => {
    setIsConfirming(true);
    setTimeout(() => {
      onClose();
      alert(`${tool.name} renewal confirmed and added to stack history!`);
    }, 2000);
  };

  return (
    <Modal onClose={onClose} maxWidth="max-w-lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Confirm Renewal</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </div>

        {!isConfirming ? (
          <div className="space-y-6">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold text-emerald-400">Ready for Renewal</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tool:</span>
                  <span className="text-white font-medium">{tool.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Budget:</span>
                  <span className="text-white font-medium">{tool.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Next Evaluation:</span>
                  <span className="text-white font-medium">December 2025</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-slate-300 text-sm font-medium">
                What's working well? (Optional)
              </Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Note key benefits, ROI, or team feedback..."
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox 
                id="uploadContract"
                checked={uploadContract}
                onCheckedChange={setUploadContract}
              />
              <Label htmlFor="uploadContract" className="text-slate-300 cursor-pointer">
                Upload renewed contract for documentation
              </Label>
            </div>

            {uploadContract && (
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">
                  Click to upload or drag and drop your contract
                </p>
              </div>
            )}

            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleConfirmRenewal}
            >
              <Check className="w-4 h-4 mr-2" />
              Confirm Renewal
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Renewal Confirmed!</h4>
            <p className="text-slate-300">
              {tool.name} has been renewed and added to your stack history
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default function RenewalRadar() {
    const [actionsTaken, setActionsTaken] = useState({});
    const [showReplaceModal, setShowReplaceModal] = useState(false);
    const [showNegotiateModal, setShowNegotiateModal] = useState(false);
    const [showRenewModal, setShowRenewModal] = useState(false);
    const [selectedTool, setSelectedTool] = useState(null);

    const handleActionClick = (tool, action) => {
        setSelectedTool(tool);
        
        if (action === 'Replace') {
            setShowReplaceModal(true);
        } else if (action === 'Negotiate') {
            setShowNegotiateModal(true);
        } else if (action === 'Renew') {
            setShowRenewModal(true);
        }
    };

    return (
        <>
            <Card className="glass-effect border-slate-700 h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-white">
                        <Calendar className="w-6 h-6 text-sky-400" />
                        Renewal Radar
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <TooltipProvider>
                        <div className="space-y-3">
                            {/* Table Header */}
                            <div className="grid grid-cols-3 gap-4 text-sm text-slate-400 px-3 py-2 border-b border-slate-700">
                                <span>Tool</span>
                                <span className="text-center">Days Left</span>
                                <span className="text-right">Action</span>
                            </div>

                            {mockRenewals.map((item) => (
                                <Tooltip key={item.name} delayDuration={100}>
                                    <TooltipTrigger asChild>
                                        <div className={`p-3 rounded-lg transition-colors hover:bg-slate-800/50 cursor-pointer ${riskStyles[item.risk].bg}`}>
                                            <div className="grid grid-cols-3 gap-4 items-center">
                                                <div className="min-w-0">
                                                    <p className="font-bold text-white text-sm truncate">{item.name}</p>
                                                </div>
                                                <div className={`flex items-center justify-center gap-2 font-semibold ${riskStyles[item.risk].text}`}>
                                                    {riskStyles[item.risk].icon}
                                                    <span className="text-sm">{item.days}</span>
                                                </div>
                                                <div className="flex justify-end">
                                                    {actionsTaken[item.name] ? (
                                                        <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                                                            {`Action: ${actionsTaken[item.name]}`}
                                                        </Badge>
                                                    ) : (
                                                        <Button 
                                                            size="sm" 
                                                            className={`h-7 px-3 text-xs hover:scale-105 transition-all duration-200 ${riskStyles[item.risk].buttonClass}`}
                                                            onClick={() => handleActionClick(item, item.recommendation)}
                                                        >
                                                            {item.recommendation}
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="glass-effect text-white border-slate-700">
                                        <p className="text-sm">{item.tooltip}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    </TooltipProvider>
                </CardContent>
            </Card>

            {/* Modals */}
            {showReplaceModal && selectedTool && (
                <ReplaceModal 
                    tool={selectedTool} 
                    onClose={() => {
                        setShowReplaceModal(false);
                        setActionsTaken(prev => ({ ...prev, [selectedTool.name]: 'Replace' }));
                    }} 
                />
            )}

            {showNegotiateModal && selectedTool && (
                <NegotiateModal 
                    tool={selectedTool} 
                    onClose={() => {
                        setShowNegotiateModal(false);
                        setActionsTaken(prev => ({ ...prev, [selectedTool.name]: 'Negotiate' }));
                    }} 
                />
            )}

            {showRenewModal && selectedTool && (
                <RenewModal 
                    tool={selectedTool} 
                    onClose={() => {
                        setShowRenewModal(false);
                        setActionsTaken(prev => ({ ...prev, [selectedTool.name]: 'Renew' }));
                    }} 
                />
            )}
        </>
    );
}