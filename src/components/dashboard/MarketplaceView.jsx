import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Store, Star, Plus, Send, X, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockVendors = [
  { name: 'Salesforce', category: 'CRM', bestFor: 'Enterprise', positioning: 'Maturity', score: 4.8 },
  { name: 'HubSpot', category: 'Marketing', bestFor: 'Mid-Market', positioning: 'Growth Stage', score: 4.6 },
  { name: 'Intercom', category: 'Support', bestFor: 'SMB', positioning: 'Early Stage', score: 4.7 },
];

const MarketplaceView = () => {
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showShortlistModal, setShowShortlistModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [actionCompleted, setActionCompleted] = useState(false);
  const [sendCompleted, setSendCompleted] = useState(false);

  const handleCompareClick = (vendor) => {
    setSelectedVendor(vendor);
    setActionCompleted(false);
    setShowCompareModal(true);
  };

  const handleShortlistClick = (vendor) => {
    setSelectedVendor(vendor);
    setActionCompleted(false);
    setShowShortlistModal(true);
  };
  
  const handleSendClick = (vendor) => {
    setSelectedVendor(vendor);
    setSendCompleted(false);
    setShowSendModal(true);
  };

  const handleActionComplete = (closeModal) => {
    setActionCompleted(true);
    setTimeout(() => {
      closeModal(false);
      setActionCompleted(false);
    }, 1500);
  };
  
  const handleSendComplete = () => {
    setSendCompleted(true);
    setTimeout(() => {
        setShowSendModal(false);
        setSendCompleted(false);
    }, 1500);
  }

  const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-effect border-slate-700 rounded-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

  return (
    <>
      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-white">
            <Store className="w-6 h-6 text-purple-400" />
            Marketplace Match View (Beta)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockVendors.map(vendor => (
            <Card key={vendor.name} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex flex-col space-y-4">
                  {/* Vendor Info Row */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={`https://logo.clearbit.com/${vendor.name.toLowerCase().replace(' ', '')}.com`} 
                        alt={`${vendor.name} logo`} 
                        className="w-10 h-10 rounded-lg bg-white p-1 flex-shrink-0" 
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-white text-lg">{vendor.name}</p>
                        <p className="text-sm text-slate-400">{vendor.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="text-sm space-y-1">
                        <p><span className="text-slate-400">Best for:</span> <span className="text-white font-medium">{vendor.bestFor}</span></p>
                        <p><span className="text-slate-400">Positioning:</span> <span className="text-white font-medium">{vendor.positioning}</span></p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400 font-bold whitespace-nowrap">
                        <Star className="w-4 h-4 fill-current" /> 
                        <span>{vendor.score}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons Row */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 h-9 text-sm border-slate-600 hover:bg-slate-700 hover:scale-105 transition-all duration-200"
                      onClick={() => handleCompareClick(vendor)}
                    >
                      Compare
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 h-9 text-sm border-slate-600 hover:bg-slate-700 hover:scale-105 transition-all duration-200"
                      onClick={() => handleShortlistClick(vendor)}
                    >
                      <Plus className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">Shortlist</span>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 h-9 text-sm border-slate-600 hover:bg-slate-700 hover:scale-105 transition-all duration-200"
                      onClick={() => handleSendClick(vendor)}
                    >
                      <Send className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="truncate">Send</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Compare Modal */}
      {showCompareModal && selectedVendor && (
        <Modal onClose={() => setShowCompareModal(false)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Compare {selectedVendor.name}</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowCompareModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </Button>
            </div>
            
            {!actionCompleted ? (
              <div className="space-y-4">
                <p className="text-slate-300">
                  Add {selectedVendor.name} to your comparison list to evaluate it against other solutions.
                </p>
                <div className="flex items-center gap-3 p-3 border border-slate-700 rounded-lg bg-slate-800">
                  <img 
                    src={`https://logo.clearbit.com/${selectedVendor.name.toLowerCase().replace(' ', '')}.com`} 
                    alt={`${selectedVendor.name} logo`} 
                    className="w-8 h-8 rounded-lg bg-white p-1" 
                  />
                  <div>
                    <p className="font-semibold text-white">{selectedVendor.name}</p>
                    <p className="text-sm text-slate-400">{selectedVendor.category} • {selectedVendor.bestFor}</p>
                  </div>
                </div>
                <Button 
                  className="w-full gradient-button text-white"
                  onClick={() => handleActionComplete(setShowCompareModal)}
                >
                  Add to Comparison
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Added to Comparison!</h4>
                <p className="text-slate-300">You can view your comparisons in the main Marketplace.</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Shortlist Modal */}
      {showShortlistModal && selectedVendor && (
        <Modal onClose={() => setShowShortlistModal(false)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Shortlist {selectedVendor.name}</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowShortlistModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </Button>
            </div>
            
            {!actionCompleted ? (
              <div className="space-y-4">
                <p className="text-slate-300">
                  Add {selectedVendor.name} to your shortlist for further evaluation and team review.
                </p>
                <div className="flex items-center gap-3 p-3 border border-slate-700 rounded-lg bg-slate-800">
                  <img 
                    src={`https://logo.clearbit.com/${selectedVendor.name.toLowerCase().replace(' ', '')}.com`} 
                    alt={`${selectedVendor.name} logo`} 
                    className="w-8 h-8 rounded-lg bg-white p-1" 
                  />
                  <div>
                    <p className="font-semibold text-white">{selectedVendor.name}</p>
                    <p className="text-sm text-slate-400">{selectedVendor.category} • Score: {selectedVendor.score}</p>
                  </div>
                </div>
                <Button 
                  className="w-full gradient-button text-white"
                  onClick={() => handleActionComplete(setShowShortlistModal)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Shortlist
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Added to Shortlist!</h4>
                <p className="text-slate-300">Your team can now review and evaluate this solution.</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Send Modal */}
      {showSendModal && selectedVendor && (
        <Modal onClose={() => setShowSendModal(false)}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Send {selectedVendor.name} to a Colleague</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowSendModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </Button>
            </div>
            
            {!sendCompleted ? (
              <div className="space-y-4">
                <p className="text-slate-300">
                  Share this vendor recommendation with a team member for their review.
                </p>
                <Input 
                    type="email"
                    placeholder="colleague@company.com"
                    className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                />
                <Button 
                  className="w-full gradient-button text-white"
                  onClick={handleSendComplete}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send to Team Member
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Sent Successfully!</h4>
                <p className="text-slate-300">Your colleague has been notified.</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default MarketplaceView;