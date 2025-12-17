
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Plus, Mail, User, X, Send } from 'lucide-react';

const mockStakeholders = [
  { name: 'Sarah Johnson', role: 'CTO', influence: 'High', support: 'Supportive', email: 'sarah@company.com', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop' },
  { name: 'Mike Chen', role: 'Finance Director', influence: 'High', support: 'Neutral', email: 'mike@company.com', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=500&auto=format&fit=crop' },
  { name: 'Lisa Rodriguez', role: 'IT Manager', influence: 'Medium', support: 'Supportive', email: 'lisa@company.com', avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=500&auto=format&fit=crop' },
  { name: 'David Kim', role: 'End User', influence: 'Low', support: 'Opposed', email: 'david@company.com', avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=500&auto=format&fit=crop' }
];

export default function StackStageCrew() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const getSupportColor = (support) => {
    switch(support) {
      case 'Supportive': return 'text-emerald-400 bg-emerald-400/10';
      case 'Neutral': return 'text-yellow-400 bg-yellow-400/10';
      case 'Opposed': return 'text-red-400 bg-red-400/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  const getInfluenceColor = (influence) => {
    switch(influence) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-effect border-slate-700 rounded-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">StackStage Crew</h1>
          <p className="text-slate-300">Map stakeholders and their influence in your software decisions</p>
        </div>
        <Button 
          className="gradient-button text-white"
          onClick={() => setShowInviteModal(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Invite Crew
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStakeholders.map((stakeholder, index) => (
          <Card key={index} className="glass-effect border-slate-700 hover:border-slate-600 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img src={stakeholder.avatarUrl} alt={stakeholder.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold text-white">{stakeholder.name}</h3>
                  <p className="text-sm text-slate-400">{stakeholder.role}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Influence:</span>
                  <span className={`text-sm font-medium ${getInfluenceColor(stakeholder.influence)}`}>
                    {stakeholder.influence}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Support Level:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getSupportColor(stakeholder.support)}`}>
                    {stakeholder.support}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <Modal onClose={() => setShowInviteModal(false)}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Invite Crew Member</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowInviteModal(false)}>
              <X className="w-5 h-5 text-slate-400" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-slate-300">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-slate-300">Role</Label>
              <Select>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cto">CTO</SelectItem>
                  <SelectItem value="finance">Finance Director</SelectItem>
                  <SelectItem value="it">IT Manager</SelectItem>
                  <SelectItem value="user">End User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full gradient-button text-white">
              <Send className="w-4 h-4 mr-2" /> Send Invitation
            </Button>
          </CardContent>
        </Modal>
      )}
    </div>
  );
}
