
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Info,
  ArrowRight,
  TrendingUp,
  AlertTriangle as Warning,
  X,
  Send,
  Search,
  HelpCircle,
  Calendar,
  MessageSquare,
  Users,
  Gem
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const statusIcons = {
  complete: <CheckCircle className="w-4 h-4 text-emerald-400" />,
  in_progress: <AlertCircle className="w-4 h-4 text-yellow-400" />,
  missing: <XCircle className="w-4 h-4 text-red-400" />,
  unknown: <XCircle className="w-4 h-4 text-red-400" />,
};

const statusColors = {
  complete: "text-emerald-300",
  in_progress: "text-yellow-300",
  missing: "text-red-300",
  unknown: "text-red-300",
}

const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="glass-effect border-slate-700 rounded-xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
      {children}
    </div>
  </div>
);

const AITooltip = ({ content, type = 'info' }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="ml-2">
          {type === 'warning' ? (
            <Warning className="w-4 h-4 text-yellow-400 hover:text-yellow-300" />
          ) : (
            <Info className="w-4 h-4 text-sky-400 hover:text-sky-300" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent className="glass-effect border-slate-700 text-white max-w-xs">
        <p className="text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const MethodologyRow = ({ label, value, status, confidence, aiNudge, showConfidence = true }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-700/30 last:border-b-0">
    <div className="flex items-center gap-3 flex-1">
      <span className="text-slate-400 font-medium min-w-[120px]">{label}</span>
      <div className="flex items-center gap-2 flex-1">
        <span className={`font-medium ${statusColors[status]} text-sm`}>{value}</span>
        {statusIcons[status]}
        {showConfidence && confidence && (
          <span className="text-xs text-slate-500">({confidence}%)</span>
        )}
      </div>
    </div>
    {aiNudge && <AITooltip content={aiNudge} type={confidence < 50 ? 'warning' : 'info'} />}
  </div>
);

const MEDDPICCAnalysis = ({ data, showConfidence = true }) => {
  const totalFields = Object.keys(data).length;
  const completedFields = Object.values(data).filter(field => field.status === 'complete').length;
  const avgConfidence = Math.round(
    Object.values(data).reduce((sum, field) => sum + (field.confidence || 0), 0) / totalFields
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-white">MEDDPICC Analysis</h4>
        <div className="flex items-center gap-3">
          <Badge className="bg-slate-800 text-sky-400 border-sky-400/30">
            {completedFields}/{totalFields} Complete
          </Badge>
          <Badge className={`${avgConfidence >= 70 ? 'bg-emerald-500/20 text-emerald-400' : 
                              avgConfidence >= 50 ? 'bg-yellow-500/20 text-yellow-400' : 
                              'bg-red-500/20 text-red-400'}`}>
            {avgConfidence}% Confidence
          </Badge>
        </div>
      </div>
      <div className="space-y-0">
        <MethodologyRow 
          label="Metrics" 
          value={data.metrics.value} 
          status={data.metrics.status}
          confidence={data.metrics.confidence}
          aiNudge={data.metrics.aiNudge}
          showConfidence={showConfidence}
        />
        <MethodologyRow 
          label="Economic Buyer" 
          value={data.economicBuyer.value} 
          status={data.economicBuyer.status}
          confidence={data.economicBuyer.confidence}
          aiNudge={data.economicBuyer.aiNudge}
          showConfidence={showConfidence}
        />
        <MethodologyRow 
          label="Decision Criteria" 
          value={data.decisionCriteria.value} 
          status={data.decisionCriteria.status}
          confidence={data.decisionCriteria.confidence}
          aiNudge={data.decisionCriteria.aiNudge}
          showConfidence={showConfidence}
        />
        <MethodologyRow 
          label="Decision Process" 
          value={data.decisionProcess.value} 
          status={data.decisionProcess.status}
          confidence={data.decisionProcess.confidence}
          aiNudge={data.decisionProcess.aiNudge}
          showConfidence={showConfidence}
        />
        {data.paperProcess && <MethodologyRow 
          label="Paper Process" 
          value={data.paperProcess.value} 
          status={data.paperProcess.status}
          confidence={data.paperProcess.confidence}
          aiNudge={data.paperProcess.aiNudge}
          showConfidence={showConfidence}
        />}
        <MethodologyRow 
          label="Identify Pain" 
          value={data.identifyPain.value} 
          status={data.identifyPain.status}
          confidence={data.identifyPain.confidence}
          aiNudge={data.identifyPain.aiNudge}
          showConfidence={showConfidence}
        />
        <MethodologyRow 
          label="Champion" 
          value={data.champion.value} 
          status={data.champion.status}
          confidence={data.champion.confidence}
          aiNudge={data.champion.aiNudge}
          showConfidence={showConfidence}
        />
        <MethodologyRow 
          label="Competition" 
          value={data.competition.value} 
          status={data.competition.status}
          confidence={data.competition.confidence}
          aiNudge={data.competition.aiNudge}
          showConfidence={showConfidence}
        />
      </div>
    </div>
  );
};

const BANTQualification = ({ data }) => (
  <div>
    <h4 className="text-lg font-semibold text-white mb-2">BANT Qualification</h4>
    <div className="space-y-4 text-sm p-4 bg-slate-900/30 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr,2fr] gap-4 items-center">
        <span className="text-slate-400 font-medium">Budget</span>
        <div className={`flex items-center gap-2 ${statusColors[data.budget.status]}`}>
          <span className="font-semibold text-white">{data.budget.value}</span>
          {statusIcons[data.budget.status]}
        </div>
        <div className={`flex items-center gap-2 justify-start md:justify-end ${statusColors[data.need.status]}`}>
          <span className="font-semibold text-white">{data.need.value}</span>
          {statusIcons[data.need.status]}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr,2fr] gap-4 items-center">
        <span className="text-slate-400 font-medium">Authority</span>
        <div className={`flex items-center gap-2 ${statusColors[data.authority.status]}`}>
          <span className="font-semibold text-white">{data.authority.value}</span>
          {statusIcons[data.authority.status]}
        </div>
        <div className={`flex items-center gap-2 justify-start md:justify-end ${statusColors[data.timing.status]}`}>
          <span className="font-semibold text-white">{data.timing.value}</span>
          {statusIcons[data.timing.status]}
        </div>
      </div>
    </div>
  </div>
);

const SandlerStage = ({ data }) => {
    const [showSendModal, setShowSendModal] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSendQuestions = () => {
        setIsSent(true);
        setTimeout(() => {
            setShowSendModal(false);
            setIsSent(false);
        }, 2000);
    };

    const StatusIcon = () => {
        if (data.statusIcon === 'CheckCircle') {
            return <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center"><CheckCircle className="w-2.5 h-2.5 text-purple-100"/></div>;
        }
        if (data.statusIcon === 'Diamond') {
            return <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center"><Gem className="w-2.5 h-2.5 text-yellow-100"/></div>;
        }
        return <div className="w-3 h-3 rounded-full bg-slate-500"></div>;
    };

    return (
        <>
            <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                    <StatusIcon />
                    <div>
                        <h4 className="text-lg font-semibold text-white">Sandler Stage</h4>
                        <p className="text-white font-medium">{data.stage}</p>
                        <p className="text-sm text-slate-400">{data.description}</p>
                    </div>
                </div>

                <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/50 my-2 ml-7">
                    <p className="text-sm text-indigo-200">{data.details}</p>
                </div>

                <div className="ml-7">
                    <h5 className="font-semibold text-slate-300 mb-2">Recommended Discovery Questions:</h5>
                    <ul className="space-y-1 list-disc list-inside text-slate-400 text-sm">
                        {data.discoveryQuestions.map((q, i) => (
                            <li key={i}>{q}</li>
                        ))}
                    </ul>
                    <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowSendModal(true)}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Discovery Questions
                    </Button>
                </div>
            </div>

            {showSendModal && (
                <Modal onClose={() => setShowSendModal(false)}>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-white">Send Discovery Questions</h3>
                            <Button variant="ghost" size="icon" onClick={() => setShowSendModal(false)}>
                                <X className="w-5 h-5 text-slate-400" />
                            </Button>
                        </div>
                        {!isSent ? (
                            <div className="space-y-4">
                                <p className="text-slate-300">This will send the recommended discovery questions to your primary contact for this deal.</p>
                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-2">
                                    {data.discoveryQuestions.map((q, i) => (
                                        <p key={i} className="text-sm text-slate-300"> • {q}</p>
                                    ))}
                                </div>
                                <Button className="w-full gradient-button text-white" onClick={handleSendQuestions}>
                                    <Send className="w-4 h-4 mr-2" />
                                    Confirm and Send
                                </Button>
                            </div>
                        ) : (
                             <div className="text-center py-8">
                                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                                <h4 className="text-lg font-semibold text-white mb-2">Questions Sent!</h4>
                                <p className="text-slate-300">The discovery questions have been emailed to your contact.</p>
                            </div>
                        )}
                    </div>
                </Modal>
            )}
        </>
    );
};

const UpdateStatusModal = ({ deal, onClose, onSave }) => {
  return (
    <Modal onClose={onClose}>
      <CardHeader>
        <CardTitle className="text-white">Update Status for {deal.buyerName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-300 mb-2 block">Next Step</label>
          <Input defaultValue={deal.nextStep} className="bg-slate-800 border-slate-600 text-white" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-300 mb-2 block">Notes</label>
          <Textarea placeholder="Add a quick update..." className="bg-slate-800 border-slate-600 text-white min-h-[100px]" />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" className="text-white border-slate-600 bg-slate-700 hover:bg-slate-600" onClick={onClose}>Cancel</Button>
          <Button className="gradient-button" onClick={onSave}>Save Update</Button>
        </div>
      </CardContent>
    </Modal>
  )
};

const RequestHelpModal = ({ deal, onClose, onSend }) => (
    <Modal onClose={onClose}>
        <CardHeader><CardTitle className="text-white">Request Help for {deal.buyerName}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            <p className="text-slate-300">Get help from your manager or a solutions expert.</p>
            <Select>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white"><SelectValue placeholder="Select team..." /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 text-white">
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="solutions">Solutions Engineering</SelectItem>
                    <SelectItem value="product">Product Team</SelectItem>
                </SelectContent>
            </Select>
            <Textarea placeholder="What do you need help with? e.g., 'Stuck on identifying the Economic Buyer. Their org chart is confusing.'" className="bg-slate-800 border-slate-600 text-white min-h-[120px]" />
            <div className="flex justify-end gap-3">
                <Button variant="outline" className="text-white border-slate-600 bg-slate-700 hover:bg-slate-600" onClick={onClose}>Cancel</Button>
                <Button className="gradient-button" onClick={onSend}><Send className="w-4 h-4 mr-2" /> Send Request</Button>
            </div>
        </CardContent>
    </Modal>
);

const AdvanceDealModal = ({ deal, onClose, onConfirm }) => (
    <Modal onClose={onClose}>
        <CardHeader>
            <CardTitle className="text-white">Advance Deal: {deal.buyerName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-slate-300">You're about to advance this deal to the next stage. This may trigger notifications to stakeholders.</p>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-400">Current Stage: <span className="font-medium text-white">{deal.status}</span></p>
                <p className="text-sm text-slate-400">Next Step: <span className="font-medium text-white">{deal.nextStep}</span></p>
            </div>
            <div className="flex justify-end gap-3">
                <Button variant="outline" className="text-white border-slate-600 bg-slate-700 hover:bg-slate-600" onClick={onClose}>Cancel</Button>
                <Button className="gradient-button" onClick={onConfirm}><TrendingUp className="w-4 h-4 mr-2" /> Confirm & Advance</Button>
            </div>
        </CardContent>
    </Modal>
);

export default function MethodologyCard({ deal, methodology }) {
    const [modal, setModal] = useState(null);
    const [showDealRoomMessage, setShowDealRoomMessage] = useState(false);
    const navigate = useNavigate();

    const handleUpdateStatus = () => setModal('update');
    const handleRequestHelp = () => setModal('help');
    const handleAdvanceDeal = () => setModal('advance');
    const handleResearchBuyer = () => navigate(createPageUrl('StackIntel'));
    
    const closeModal = () => setModal(null);
    const saveAndClose = () => {
        alert("Status Updated!");
        closeModal();
    }
    const sendAndClose = () => {
        alert("Request Sent!");
        closeModal();
    }
    const confirmAndClose = () => {
        alert("Deal Advanced!");
        closeModal();
    }
    
    const meddpiccConfidence = deal.meddpicc ? Math.round(Object.values(deal.meddpicc).reduce((sum, field) => sum + field.confidence, 0) / Object.keys(deal.meddpicc).length) : 0;

    const getActionButton = () => {
        if (meddpiccConfidence >= 70) {
            return <Button className="gradient-button" onClick={handleAdvanceDeal}><TrendingUp className="w-4 h-4 mr-2" /> Advance Deal</Button>
        }
        if (meddpiccConfidence < 50) {
            return <Button className="gradient-button" onClick={handleResearchBuyer}><Search className="w-4 h-4 mr-2" /> Research Buyer</Button>
        }
        return <Button className="gradient-button" onClick={handleRequestHelp}><HelpCircle className="w-4 h-4 mr-2" /> Request Help</Button>
    }

    const renderMethodology = () => {
        switch (methodology) {
            case 'Sandler':
                return <SandlerStage data={deal.sandler} />;
            case 'BANT':
                return <BANTQualification data={deal.bant} />;
            case 'MEDDICC':
                return <MEDDPICCAnalysis data={deal.meddicc} showConfidence={false} />;
            case 'MEDDPICC':
                return <MEDDPICCAnalysis data={deal.meddpicc} />;
            default:
                return <MEDDPICCAnalysis data={deal.meddpicc} />;
        }
    };

    const statusBadge = {
        'Procurement': 'bg-sky-500/20 text-sky-300',
        'Evaluation': 'bg-purple-500/20 text-purple-300',
        'Discovery': 'bg-yellow-500/20 text-yellow-300',
    };
    
    const fitBadge = {
        'High': 'bg-emerald-500/20 text-emerald-300',
        'Medium': 'bg-yellow-500/20 text-yellow-300',
        'Low': 'bg-red-500/20 text-red-300'
    }

    const engagementBadge = {
        'Vendor Engaged': 'bg-red-500/20 text-red-300',
        'Shared Profile': 'bg-yellow-500/20 text-yellow-300',
        'View Anonymized': 'bg-emerald-500/20 text-emerald-300'
    }
    
    const bantScore = deal.bant ? Object.values(deal.bant).filter(c => c.status === 'complete').length : 0;

    const DealRoomMessageModal = ({ onClose }) => (
        <Modal onClose={onClose}>
            <CardHeader>
                <CardTitle className="text-white">DealHub Not Available</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                    <p className="text-slate-300 mb-4">
                        DealHub details will appear once <strong>{deal.buyerName}</strong> indicates they're ready to engage with sales.
                    </p>
                    <p className="text-sm text-slate-400">
                        Current status: <span className="font-medium text-white">{deal.engagementStatus}</span>
                    </p>
                </div>
                <Button onClick={onClose} className="gradient-button">
                    Understood
                </Button>
            </CardContent>
        </Modal>
    );

    return (
        <>
            <Card className="glass-effect border-slate-700 overflow-hidden">
                <CardHeader className="flex flex-row justify-between items-start pb-4">
                    <div>
                        <CardTitle className="text-xl text-white">{deal.buyerName}</CardTitle>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <Badge className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge[deal.status]}`}>{deal.status}</Badge>
                            <Badge className={`px-2 py-1 text-xs font-medium rounded-full ${fitBadge[deal.stackFit]}`}>Fit: {deal.stackFit}</Badge>
                            <Badge className={`px-2 py-1 text-xs font-medium rounded-full ${engagementBadge[deal.engagementStatus]}`}>{deal.engagementStatus}</Badge>
                             {methodology === 'BANT' && (
                                <Badge variant="outline" className="px-2 py-1 text-xs font-medium rounded-full border-slate-600 text-slate-300">
                                    BANT: {bantScore}/4
                                </Badge>
                            )}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-white">${deal.arr.toLocaleString()}</p>
                        <p className="text-sm text-slate-400">ARR</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="border-t border-slate-700/50 pt-4">
                        {renderMethodology()}
                    </div>
                    <div className="flex justify-end gap-2 mt-4 border-t border-slate-700/50 pt-4">
                        <Button className="bg-slate-800 text-slate-200 border border-slate-600 hover:bg-slate-700 hover:text-white" onClick={handleUpdateStatus}>
                            Update Status
                        </Button>
                        
                        {deal.engagementStatus === 'Vendor Engaged' ? (
                            <Link to={createPageUrl(`DealHub?openDeal=${deal.id}`)}>
                                <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                                    Enter Deal Sync
                                </Button>
                            </Link>
                        ) : (
                            <Button 
                                className="bg-slate-600 text-slate-400 cursor-not-allowed" 
                                disabled
                                onClick={() => setShowDealRoomMessage(true)}
                            >
                                Enter Deal Sync
                            </Button>
                        )}
                        
                        {getActionButton()}
                    </div>
                </CardContent>
            </Card>

            {modal === 'update' && <UpdateStatusModal deal={deal} onClose={closeModal} onSave={saveAndClose} />}
            {modal === 'help' && <RequestHelpModal deal={deal} onClose={closeModal} onSend={sendAndClose} />}
            {modal === 'advance' && <AdvanceDealModal deal={deal} onClose={closeModal} onConfirm={confirmAndClose} />}
            {showDealRoomMessage && <DealRoomMessageModal onClose={() => setShowDealRoomMessage(false)} />}
        </>
    );
}
