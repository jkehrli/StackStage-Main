
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Plus, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Upload, 
  Send, 
  Rocket,
  Eye,
  Calendar,
  DollarSign,
  Archive,
  Edit2,
  X,
  ArrowLeft,
  ArrowRight,
  TrendingUp, // Added import
  Shield, // Added import
  GitCompare, // Added import
  Link as LinkIcon, // Added import
  Bell // Added import
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';


const StackChannelsList = ({ onCreateNew, onOpenChannel }) => {
  const mockChannels = [
    {
      id: 1,
      name: "HubSpot Marketing Hub StackChannel",
      tool: "HubSpot Marketing Hub",
      status: "Gathering Info",
      lastActivity: "2 hours ago",
      members: 4,
      matchScore: 96,
      logo: "https://logo.clearbit.com/hubspot.com"
    },
    {
      id: 2,
      name: "Intercom StackChannel",
      tool: "Intercom",
      status: "Ready for Vendor",
      lastActivity: "1 day ago",
      members: 3,
      matchScore: 92,
      logo: "https://logo.clearbit.com/intercom.com"
    },
    {
      id: 3,
      name: "Notion StackChannel",
      tool: "Notion",
      status: "Archived",
      lastActivity: "1 week ago",
      members: 5,
      matchScore: 89,
      logo: "https://logo.clearbit.com/notion.so"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Gathering Info': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Ready for Vendor': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Archived': return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
      default: return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">StackChannels</h1>
            <p className="text-slate-300">Private collaboration spaces for your team</p>
          </div>
          <Button onClick={onCreateNew} className="gradient-button text-white px-6 py-3">
            <Plus className="w-5 h-5 mr-2" />
            New StackChannel
          </Button>
        </div>

        <div className="grid gap-4">
          {mockChannels.map(channel => (
            <Card key={channel.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-200 cursor-pointer" onClick={() => onOpenChannel(channel)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={channel.logo} alt={channel.tool} className="w-12 h-12 rounded-lg bg-white p-2" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">{channel.name}</h3>
                      <p className="text-slate-400">{channel.tool} • Match Score: {channel.matchScore}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(channel.status)}>
                      {channel.status}
                    </Badge>
                    <div className="text-right text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {channel.members} members
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-4 h-4" />
                        {channel.lastActivity}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const CreateChannelModal = ({ onClose, onCreateChannel, tool = null }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: tool ? `${tool.name} StackChannel` : '',
    collaborators: [],
    emailInput: '',
    note: tool ? `We're reviewing ${tool.name} and need your input before vendor engagement.` : '',
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
    if (formData.emailInput.trim()) {
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
    onCreateChannel(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
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

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label className="text-white font-semibold text-lg mb-3 block">Name Your StackChannel</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white text-lg h-12"
                  placeholder="Tool Name StackChannel"
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
                    <Badge key={role.id} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 cursor-pointer">
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
                      <Badge key={email} className="bg-sky-500/20 text-sky-300 border-sky-500/30">
                        {email}
                        <X onClick={() => removeCollaborator(email)} className="w-3 h-3 ml-2 cursor-pointer" />
                      </Badge>
                    ))}
                  </div>
                )}
                <div>
                  <Label className="text-white font-semibold mb-2 block">Optional note to collaborators</Label>
                  <Textarea
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
                      <Label className="text-white cursor-pointer">{item.label}</Label>
                      <Switch
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
                    <Label className="text-white mb-2 block">Other (optional)</Label>
                    <Input
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

const ReadyForVendorModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onCancel}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-slate-800 rounded-2xl w-full max-w-lg"
      onClick={e => e.stopPropagation()}
    >
      <div className="p-8 text-center">
        <Rocket className="w-16 h-16 text-sky-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-3">Engage the Vendor?</h2>
        <p className="text-slate-300 mb-8">
          This will open a shared Deal Room and notify the vendor that you are ready to collaborate. Are you sure you want to proceed?
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={onCancel} variant="outline" className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="flex-1 gradient-button text-white">
            <LinkIcon className="w-4 h-4 mr-2" />
            Yes, Open Deal Room
          </Button>
        </div>
      </div>
    </motion.div>
  </div>
);

const StackChannelWorkspace = ({ channel, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Sarah Chen',
      role: 'IT Director',
      message: 'The security compliance looks good. SOC 2 Type II certification checks out.',
      timestamp: '2 hours ago',
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    {
      id: 2,
      author: 'Mike Johnson',
      role: 'Procurement',
      message: 'Pricing is within budget. Can we negotiate the implementation timeline?',
      timestamp: '4 hours ago',
      avatar: 'https://i.pravatar.cc/150?u=mike'
    }
  ]);
  const [showReadyModal, setShowReadyModal] = useState(false);
  const [approvals, setApprovals] = useState([
    { role: 'IT / Security', status: 'approved', approver: 'Sarah Chen' },
    { role: 'Procurement', status: 'pending', approver: 'Mike Johnson' },
    { role: 'Finance', status: 'approved', approver: 'Lisa Wang' },
    { role: 'Legal', status: 'pending', approver: 'David Kim' }
  ]);

  useEffect(() => {
    const requiredApprovals = ['IT / Security', 'Procurement', 'Finance'];
    const allApproved = requiredApprovals.every(role => {
      const approval = approvals.find(a => a.role === role);
      return approval && approval.status === 'approved';
    });

    if (allApproved) {
        // This check prevents an infinite loop of modals
        const alreadyShown = sessionStorage.getItem(`prompt_${channel.id}`);
        if (!alreadyShown) {
            setShowReadyModal(true);
            sessionStorage.setItem(`prompt_${channel.id}`, 'true');
        }
    }
  }, [approvals, channel.id]);


  const addComment = () => {
    if (newComment.trim()) {
      setComments(prev => [{
        id: Date.now(),
        author: 'You',
        role: 'IT Manager',
        message: newComment,
        timestamp: 'Just now',
        avatar: 'https://i.pravatar.cc/150?u=current'
      }, ...prev]);
      setNewComment('');
    }
  };

  const handleEngageVendor = () => {
    // This function is now just for the confirmation, which then redirects
    setShowReadyModal(false);
    // In a real app, this would trigger backend logic. Here, we redirect.
    window.location.href = createPageUrl('DealHub');
  };

  return (
    <>
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to StackChannels
            </Button>
            <img src={channel.logo} alt={channel.tool} className="w-10 h-10 rounded-lg bg-white p-2" />
            <div>
              <h1 className="text-xl font-bold text-white">{channel.name}</h1>
              <p className="text-slate-400">Match Score: {channel.matchScore}% • {channel.status}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              <Users className="w-4 h-4 mr-1" />
              {channel.members} members
            </Badge>
            <Button onClick={() => setShowReadyModal(true)} className="gradient-button text-white px-6">
              <Rocket className="w-4 h-4 mr-2" />
              Ready to Engage Vendor
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-sky-600">Overview</TabsTrigger>
            <TabsTrigger value="docs" className="data-[state=active]:bg-sky-600">Docs</TabsTrigger>
            <TabsTrigger value="discussions" className="data-[state=active]:bg-sky-600">Discussions</TabsTrigger>
            <TabsTrigger value="approvals" className="data-[state=active]:bg-sky-600">Approvals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-sky-400" /> Tool Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Match Score</span>
                    <span className="text-emerald-400 font-bold">{channel.matchScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Expected ROI</span>
                    <span className="text-emerald-400 font-bold">150% in 12 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Implementation Time</span>
                    <span className="text-sky-400 font-bold">8-12 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Annual Savings</span>
                    <span className="text-emerald-400 font-bold">$24,000</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-400" /> Team Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {approvals.map(approval => (
                      <div key={approval.role} className="flex justify-between items-center">
                        <span className="text-slate-300">{approval.role}</span>
                        {approval.status === 'approved' && <Badge className="bg-emerald-500/20 text-emerald-300">Complete</Badge>}
                        {approval.status === 'pending' && <Badge className="bg-yellow-500/20 text-yellow-300">In Progress</Badge>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="docs" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Document Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-300 mb-4">Drop files here or click to upload</p>
                  <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Team Discussion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <img src="https://i.pravatar.cc/150?u=current" alt="You" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts with the team..."
                      className="bg-slate-700 border-slate-600 text-white min-h-[80px]"
                    />
                    <Button onClick={addComment} className="mt-2 bg-sky-600 hover:bg-sky-700 text-white">
                      <Send className="w-4 h-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex gap-3 p-4 bg-slate-700/50 rounded-lg">
                      <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white">{comment.author}</span>
                          <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                            {comment.role}
                          </Badge>
                          <span className="text-xs text-slate-400">{comment.timestamp}</span>
                        </div>
                        <p className="text-slate-300">{comment.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Approval Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvals.map((approval, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">{approval.role}</h3>
                        <p className="text-sm text-slate-400">Approver: {approval.approver}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {approval.status === 'approved' ? (
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approved
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                            <Clock className="w-4 h-4 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    <AnimatePresence>
        {showReadyModal && (
          <ReadyForVendorModal
            onConfirm={handleEngageVendor}
            onCancel={() => setShowReadyModal(false)}
          />
        )}
    </AnimatePresence>
    </>
  );
};

export default function StackChannels() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateChannel = (formData) => {
    console.log('Creating channel:', formData);
    setCurrentView('list');
  };

  const handleOpenChannel = (channel) => {
    setSelectedChannel(channel);
    setCurrentView('workspace');
  };

  if (currentView === 'workspace' && selectedChannel) {
    return (
      <StackChannelWorkspace
        channel={selectedChannel}
        onClose={() => {
          setCurrentView('list');
          setSelectedChannel(null);
        }}
      />
    );
  }

  return (
    <>
      <StackChannelsList
        onCreateNew={() => setShowCreateModal(true)}
        onOpenChannel={handleOpenChannel}
      />
      
      <AnimatePresence>
        {showCreateModal && (
          <CreateChannelModal
            onClose={() => setShowCreateModal(false)}
            onCreateChannel={handleCreateChannel}
          />
        )}
      </AnimatePresence>
    </>
  );
}
