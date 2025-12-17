import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Bell, AlertTriangle, TrendingUp, Eye, MessageCircle, CheckCircle, Clock, Users, Target, Zap, Send, Calendar, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const nudgeTypes = {
  HIGH_FIT: {
    icon: <TrendingUp className="w-5 h-5" />,
    color: 'emerald',
    urgency: 'info'
  },
  PROFILE_VIEWS: {
    icon: <Eye className="w-5 h-5" />,
    color: 'blue',
    urgency: 'action'
  },
  FALLING_CONSIDERATION: {
    icon: <AlertTriangle className="w-5 h-5" />,
    color: 'red',
    urgency: 'risk'
  },
  STAGE_PROGRESSION: {
    icon: <Target className="w-5 h-5" />,
    color: 'purple',
    urgency: 'action'
  },
  MEDDPICC_GAP: {
    icon: <Users className="w-5 h-5" />,
    color: 'yellow',
    urgency: 'action'
  },
  ENGAGE_SIGNAL: {
    icon: <Zap className="w-5 h-5" />,
    color: 'emerald',
    urgency: 'critical'
  },
  BUYER_MESSAGE: {
    icon: <MessageCircle className="w-5 h-5" />,
    color: 'red',
    urgency: 'critical'
  }
};

const urgencyStyles = {
  info: 'border-blue-500/30 bg-blue-500/10',
  action: 'border-yellow-500/30 bg-yellow-500/10',
  risk: 'border-red-500/30 bg-red-500/10',
  critical: 'border-emerald-500/30 bg-emerald-500/10 animate-pulse'
};

const urgencyTextStyles = {
  info: 'text-blue-300',
  action: 'text-yellow-300',
  risk: 'text-red-300',
  critical: 'text-emerald-300'
};

// Mock nudge data - in real app this would come from API
const mockNudges = [
  {
    id: 1,
    type: 'ENGAGE_SIGNAL',
    dealId: 1,
    buyerName: 'Innovate Corp',
    title: 'Buyer is ready to talk',
    message: 'Innovate Corp has sent an EngageSignal. Begin engagement protocol.',
    timestamp: new Date(),
    ctaLabel: 'Enter Deal Room',
    ctaLink: 'DealSync',
    canContact: true,
    dismissed: false
  },
  {
    id: 2,
    type: 'BUYER_MESSAGE',
    dealId: 1,
    buyerName: 'Innovate Corp',
    title: '🔥 You\'ve got a message',
    message: 'Respond within 24h to keep momentum with Innovate Corp.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    ctaLabel: 'View Message',
    ctaLink: 'DealSync',
    canContact: true,
    dismissed: false
  },
  {
    id: 3,
    type: 'HIGH_FIT',
    dealId: 8,
    buyerName: 'Buyer-0008',
    title: 'Get Ready: Buyer nearing vendor engagement',
    message: 'Synergy Solutions has 85% stack fit and high readiness. Prepare your materials.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    ctaLabel: 'Review Profile',
    ctaLink: 'VendorDashboard',
    canContact: false,
    dismissed: false
  },
  {
    id: 4,
    type: 'MEDDPICC_GAP',
    dealId: 1,
    buyerName: 'Innovate Corp',
    title: 'Identify your champion and confirm process',
    message: 'Champion and Decision Process fields missing in MEDDPICC analysis.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    ctaLabel: 'Update MEDDPICC',
    ctaLink: 'DealSync',
    canContact: true,
    dismissed: false
  },
  {
    id: 5,
    type: 'PROFILE_VIEWS',
    dealId: 12,
    buyerName: 'Buyer-0012',
    title: 'This buyer is evaluating',
    message: 'Quantum Dynamics viewed your profile 3 times this week. Revisit your match profile.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    ctaLabel: 'Check Profile Views',
    ctaLink: 'VendorDashboard',
    canContact: false,
    dismissed: false
  }
];

// Modal Components for Interactive Examples
const MessageModal = ({ nudge, onClose }) => {
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSendMessage = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-effect border-slate-700 rounded-xl w-full max-w-2xl" onClick={e => e.stopPropagation()}>
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle className="text-white">Message from {nudge.buyerName}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">IC</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Alex Chen</p>
                    <p className="text-slate-300 text-sm">2 hours ago</p>
                    <p className="text-slate-200 mt-2">Hi there! We're moving forward with our analytics platform decision. Can we schedule a call this week to discuss implementation timelines and pricing options?</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-slate-300 mb-2">Your Response</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your response..."
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px]"
                />
              </div>
              
              <Button onClick={handleSendMessage} className="w-full gradient-button text-white">
                <Send className="w-4 h-4 mr-2" />
                Send Response
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Message Sent!</h4>
              <p className="text-slate-300">Your response has been delivered to {nudge.buyerName}.</p>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
};

const ProfileViewModal = ({ nudge, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-effect border-slate-700 rounded-xl w-full max-w-2xl" onClick={e => e.stopPropagation()}>
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle className="text-white">Profile View Analytics</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">Recent Activity</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Profile Views This Week</span>
                  <span className="text-sky-400 font-bold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Time Spent on Profile</span>
                  <span className="text-sky-400 font-bold">4m 32s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Sections Viewed</span>
                  <span className="text-sky-400 font-bold">Product Features, Pricing</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">Engagement Timeline</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-slate-300 text-sm">Today: Viewed product comparison page</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                  <span className="text-slate-300 text-sm">2 days ago: Downloaded case study</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-slate-300 text-sm">3 days ago: First profile visit</span>
                </div>
              </div>
            </div>
            
            <Button onClick={onClose} className="w-full gradient-button text-white">
              Update Profile Content
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

const PreparationModal = ({ nudge, onClose }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  
  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-effect border-slate-700 rounded-xl w-full max-w-2xl" onClick={e => e.stopPropagation()}>
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle className="text-white">Preparation Checklist</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent>
          {!isCompleted ? (
            <div className="space-y-6">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <span className="font-semibold text-emerald-400">High-Fit Buyer Alert</span>
                </div>
                <p className="text-sm text-emerald-300">Synergy Solutions shows 85% stack alignment and is approaching readiness threshold.</p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Recommended Preparation Steps</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Review buyer's stack plan</p>
                      <p className="text-slate-400 text-sm">Understand their current tools and integration needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Prepare custom demo</p>
                      <p className="text-slate-400 text-sm">Tailor presentation to their specific use case</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Gather relevant case studies</p>
                      <p className="text-slate-400 text-sm">Find similar company success stories</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleComplete} className="w-full gradient-button text-white">
                Mark Preparation Complete
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Preparation Complete!</h4>
              <p className="text-slate-300">You're ready for when this buyer reaches out.</p>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
};

const SnoozeModal = ({ nudge, onClose, onSnooze }) => {
  const [selectedDuration, setSelectedDuration] = useState('1h');
  
  const handleSnooze = () => {
    onSnooze(nudge.id, selectedDuration);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-effect border-slate-700 rounded-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle className="text-white">Snooze Nudge</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-slate-300">How long would you like to snooze this nudge?</p>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '1h', label: '1 Hour' },
                { value: '4h', label: '4 Hours' },
                { value: '1d', label: '1 Day' },
                { value: '1w', label: '1 Week' }
              ].map(option => (
                <Button
                  key={option.value}
                  variant={selectedDuration === option.value ? "default" : "outline"}
                  onClick={() => setSelectedDuration(option.value)}
                  className={selectedDuration === option.value ? "gradient-button" : ""}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSnooze} className="flex-1 gradient-button">
                Snooze
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

const NudgeCard = ({ nudge, onDismiss, onSnooze, compact = false }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSnoozeModal, setShowSnoozeModal] = useState(false);
  const nudgeConfig = nudgeTypes[nudge.type];
  const urgencyStyle = urgencyStyles[nudgeConfig.urgency];
  const textStyle = urgencyTextStyles[nudgeConfig.urgency];

  const timeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  const handleCtaClick = () => {
    // Show modal for specific nudge types, otherwise navigate
    if (nudge.type === 'BUYER_MESSAGE') {
      setShowModal(true);
    } else if (nudge.type === 'PROFILE_VIEWS') {
      setShowModal(true);
    } else if (nudge.type === 'HIGH_FIT') {
      setShowModal(true);
    } else {
      // Navigate to the specified page
      window.location.href = createPageUrl(nudge.ctaLink);
    }
  };

  const renderModal = () => {
    if (!showModal) return null;
    
    switch (nudge.type) {
      case 'BUYER_MESSAGE':
        return <MessageModal nudge={nudge} onClose={() => setShowModal(false)} />;
      case 'PROFILE_VIEWS':
        return <ProfileViewModal nudge={nudge} onClose={() => setShowModal(false)} />;
      case 'HIGH_FIT':
        return <PreparationModal nudge={nudge} onClose={() => setShowModal(false)} />;
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <Card className={`glass-effect border ${urgencyStyle} ${compact ? 'mb-3' : 'mb-4'}`}>
          <CardContent className={compact ? 'p-4' : 'p-6'}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className={`${textStyle} mt-1`}>
                  {nudgeConfig.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold ${textStyle} ${compact ? 'text-sm' : 'text-base'}`}>
                      {nudge.title}
                    </h4>
                    <Badge variant="outline" className="text-xs text-slate-400 border-slate-600">
                      {nudge.buyerName}
                    </Badge>
                  </div>
                  <p className={`text-slate-300 ${compact ? 'text-sm' : 'text-base'} mb-3`}>
                    {nudge.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {timeAgo(nudge.timestamp)}
                    </span>
                    <div className="flex gap-2">
                      {!nudge.canContact && (
                        <Badge variant="outline" className="text-xs text-slate-400 border-slate-600">
                          Readiness-Gated
                        </Badge>
                      )}
                      <Button 
                        size="sm" 
                        className={`${nudge.canContact ? 'gradient-button' : 'bg-slate-700 hover:bg-slate-600'} text-white`}
                        onClick={handleCtaClick}
                      >
                        {nudge.ctaLabel}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-slate-400 hover:text-slate-200"
                  onClick={() => setShowSnoozeModal(true)}
                >
                  <Clock className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 text-slate-400 hover:text-slate-200"
                  onClick={() => onDismiss(nudge.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {renderModal()}
      
      {showSnoozeModal && (
        <SnoozeModal 
          nudge={nudge} 
          onClose={() => setShowSnoozeModal(false)} 
          onSnooze={onSnooze}
        />
      )}
    </>
  );
};

const FloatingNudgeAlert = ({ nudge, onDismiss }) => {
  const nudgeConfig = nudgeTypes[nudge.type];
  const isCritical = nudgeConfig.urgency === 'critical';

  if (!isCritical) return null;

  const handleCtaClick = () => {
    if (nudge.type === 'BUYER_MESSAGE') {
      // In a real app, this would open the message modal
      window.location.href = createPageUrl(nudge.ctaLink);
    } else {
      window.location.href = createPageUrl(nudge.ctaLink);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed top-20 right-6 z-50 w-96"
    >
      <Card className="glass-effect border-emerald-500/50 bg-emerald-500/10 shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="text-emerald-400 mt-1">
              {nudgeConfig.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-emerald-300 mb-1">
                {nudge.title}
              </h4>
              <p className="text-slate-300 text-sm mb-3">
                {nudge.message}
              </p>
              <Button size="sm" className="gradient-button text-white" onClick={handleCtaClick}>
                {nudge.ctaLabel}
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-slate-400 hover:text-slate-200"
              onClick={() => onDismiss(nudge.id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const NudgeSystem = ({ compact = false, showFloating = true }) => {
  const [nudges, setNudges] = useState(mockNudges.filter(n => !n.dismissed));
  const [criticalNudge, setCriticalNudge] = useState(null);

  useEffect(() => {
    // Show critical nudges as floating alerts
    const critical = nudges.find(n => 
      nudgeTypes[n.type].urgency === 'critical' && !n.dismissed
    );
    setCriticalNudge(critical);
  }, [nudges]);

  const handleDismiss = (nudgeId) => {
    setNudges(prev => prev.filter(n => n.id !== nudgeId));
  };

  const handleSnooze = (nudgeId, duration) => {
    // In real app, this would snooze for the specified duration
    setNudges(prev => prev.filter(n => n.id !== nudgeId));
    console.log(`Snoozed nudge ${nudgeId} for ${duration}`);
  };

  const activeNudges = nudges.filter(n => !n.dismissed);
  const criticalCount = activeNudges.filter(n => nudgeTypes[n.type].urgency === 'critical').length;
  const actionCount = activeNudges.filter(n => nudgeTypes[n.type].urgency === 'action').length;

  return (
    <>
      {/* Main Nudge Display */}
      <div className="space-y-4">
        {!compact && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-sky-400" />
              <h2 className="text-xl font-bold text-white">Smart Nudges</h2>
              {criticalCount > 0 && (
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                  {criticalCount} urgent
                </Badge>
              )}
              {actionCount > 0 && (
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  {actionCount} action needed
                </Badge>
              )}
            </div>
          </div>
        )}

        <AnimatePresence>
          {activeNudges.length === 0 ? (
            <Card className="glass-effect border-slate-700">
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">All caught up!</h3>
                <p className="text-slate-400">No active nudges. We'll alert you when buyers need attention.</p>
              </CardContent>
            </Card>
          ) : (
            activeNudges
              .sort((a, b) => {
                // Sort by urgency first, then by timestamp
                const urgencyOrder = { critical: 0, risk: 1, action: 2, info: 3 };
                const aUrgency = urgencyOrder[nudgeTypes[a.type].urgency];
                const bUrgency = urgencyOrder[nudgeTypes[b.type].urgency];
                if (aUrgency !== bUrgency) return aUrgency - bUrgency;
                return b.timestamp - a.timestamp;
              })
              .map(nudge => (
                <NudgeCard
                  key={nudge.id}
                  nudge={nudge}
                  onDismiss={handleDismiss}
                  onSnooze={handleSnooze}
                  compact={compact}
                />
              ))
          )}
        </AnimatePresence>
      </div>

      {/* Floating Critical Alert */}
      {showFloating && criticalNudge && (
        <FloatingNudgeAlert
          nudge={criticalNudge}
          onDismiss={handleDismiss}
        />
      )}
    </>
  );
};

export default NudgeSystem;