
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Layers,
  GitCompare,
  Star,
  ClipboardList,
  Search,
  Plus,
  Send,
  Building2,
  Briefcase,
  Headset,
  X,
  TrendingUp,
  Heart,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// --- Reusable Modal Components ---

const CompareModal = ({ vendor, onClose }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-slate-800 rounded-xl w-full max-w-2xl"
      onClick={e => e.stopPropagation()}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Compare {vendor.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-slate-400" />
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6 p-4 bg-slate-700/50 rounded-lg">
          <img src={vendor.logo} alt={vendor.name} className="w-12 h-12 rounded-lg bg-white p-2" />
          <div>
            <h3 className="font-semibold text-white">{vendor.name}</h3>
            <p className="text-sm text-slate-400">{vendor.category} Solution</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-white">Comparison will include:</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-slate-300">
              <GitCompare className="w-4 h-4 text-sky-400" />
              Feature-by-feature analysis
            </li>
            <li className="flex items-center gap-2 text-slate-300">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Pricing comparison matrix
            </li>
            <li className="flex items-center gap-2 text-slate-300">
              <Star className="w-4 h-4 text-yellow-400" />
              User reviews and ratings
            </li>
          </ul>
        </div>

        <Button onClick={onClose} className="w-full mt-6 bg-sky-600 hover:bg-sky-700 text-white">
          Generate Comparison Report
        </Button>
      </div>
    </motion.div>
  </div>
);

const ShortlistModal = ({ vendor, onClose }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-slate-800 rounded-xl w-full max-w-md"
      onClick={e => e.stopPropagation()}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Add to Shortlist</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-slate-400" />
          </Button>
        </div>

        <div className="text-center mb-6">
          <Heart className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="font-semibold text-white mb-2">Added to Shortlist!</h3>
          <p className="text-slate-300">{vendor.name} has been added to your evaluation shortlist.</p>
        </div>

        <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-white mb-2">What's next?</h4>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Request detailed demos</li>
            <li>• Compare with other shortlisted tools</li>
            <li>• Get pricing information</li>
            <li>• Schedule stakeholder reviews</li>
          </ul>
        </div>

        <Button onClick={onClose} className="w-full bg-sky-600 hover:bg-sky-700 text-white">
          View My Shortlist
        </Button>
      </div>
    </motion.div>
  </div>
);

const SendModal = ({ vendor, onClose }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-slate-800 rounded-xl w-full max-w-lg"
      onClick={e => e.stopPropagation()}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Send to Team</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-slate-400" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Send to:</label>
            <Input
              placeholder="colleague@company.com"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Message:</label>
            <Textarea
              placeholder={`Hi there, I found ${vendor.name} and think it could be a great fit for our ${vendor.category.toLowerCase()} needs. What do you think?`}
              className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button onClick={onClose} className="flex-1 bg-sky-600 hover:bg-sky-700 text-white">
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1 bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
            Cancel
          </Button>
        </div>
      </div>
    </motion.div>
  </div>
);


// --- Page Components ---

const StatCard = ({ icon, value, label }) => (
  <Card className="bg-slate-800/50 border-slate-700 p-4">
    <div className="flex items-center gap-4">
      <div className="text-sky-400">{icon}</div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-slate-400">{label}</p>
      </div>
    </div>
  </Card>
);

const VendorCard = ({ vendor, onCompare, onShortlist, onSend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-slate-800/50 border-slate-700 rounded-lg overflow-hidden"
  >
    <div className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <img
            src={vendor.logo}
            alt={`${vendor.name} logo`}
            className="w-12 h-12 bg-white p-1 rounded-md"
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/48/FFFFFF/0F172A?text=${vendor.name.charAt(0)}`;
              e.currentTarget.onerror = null;
            }}
          />
          <div>
            <h3 className="text-xl font-bold text-white">{vendor.name}</h3>
            <p className="text-slate-400">{vendor.category}</p>
          </div>
        </div>
        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 flex items-center gap-1">
          <Star className="w-4 h-4 fill-current" /> {vendor.rating}
        </Badge>
      </div>
      <p className="text-slate-300 my-4 text-sm">{vendor.description}</p>
      <div className="flex items-center gap-2">
        {vendor.tags.map(tag => (
          <Badge key={tag} variant="outline" className="text-slate-300 border-slate-600">{tag}</Badge>
        ))}
      </div>
    </div>
    <div className="bg-slate-800 px-6 py-4 flex items-center justify-end gap-2">
      <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600" onClick={() => onCompare(vendor)}>
        <GitCompare className="w-4 h-4 mr-2" /> Compare
      </Button>
      <Button className="bg-sky-600 hover:bg-sky-700 text-white" onClick={() => onShortlist(vendor)}>
        <Plus className="w-4 h-4 mr-2" /> Shortlist
      </Button>
      <Button className="bg-sky-600 hover:bg-sky-700 text-white" onClick={() => onSend(vendor)}>
        <Send className="w-4 h-4 mr-2" /> Send
      </Button>
    </div>
  </motion.div>
);

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalState, setModalState] = useState({ type: null, vendor: null });

  const handleOpenModal = (type, vendor) => setModalState({ type, vendor });
  const handleCloseModal = () => setModalState({ type: null, vendor: null });

  const stats = [
    { icon: <Layers className="w-8 h-8" />, value: '6', label: 'Total Vendors' },
    { icon: <GitCompare className="w-8 h-8" />, value: '87%', label: 'Avg. Stack Fit' },
    { icon: <Star className="w-8 h-8" />, value: '4.6', label: 'Avg. Peer Score' },
    { icon: <ClipboardList className="w-8 h-8" />, value: '0', label: 'In Comparison' }
  ];

  const vendors = [
    { name: 'Salesforce', logo: 'https://logo.clearbit.com/salesforce.com', category: 'CRM', rating: 4.8, description: 'The global leader in CRM, empowering companies to connect with their customers in a whole new way.', tags: ['Enterprise', 'High-Maturity'] },
    { name: 'HubSpot', logo: 'https://logo.clearbit.com/hubspot.com', category: 'Marketing', rating: 4.6, description: 'Marketing, sales, and service software that helps your business grow without compromise.', tags: ['Mid-Market', 'Growth Stage'] },
    { name: 'Intercom', logo: 'https://logo.clearbit.com/intercom.com', category: 'Support', rating: 4.7, description: 'The only complete Customer Service solution that provides a seamless, personalized experience.', tags: ['SMB', 'Early Stage'] },
    { name: 'Slack', logo: 'https://logo.clearbit.com/slack.com', category: 'Collaboration', rating: 4.9, description: 'The collaboration hub that brings the right people, information, and tools together to get work done.', tags: ['All Stages', 'High-Adoption'] },
    { name: 'Notion', logo: 'https://logo.clearbit.com/notion.so', category: 'Productivity', rating: 4.5, description: 'The all-in-one workspace for your notes, tasks, wikis, and databases.', tags: ['SMB', 'Productivity'] },
    { name: 'Jira', logo: 'https://logo.clearbit.com/atlassian.com', category: 'DevOps', rating: 4.4, description: 'The #1 software development tool used by agile teams to plan, track, and release great software.', tags: ['Enterprise', 'Engineering'] }
  ];

  const filteredVendors = vendors.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Vendor Marketplace</h1>
          <p className="text-slate-300 mt-2">Discover and compare software solutions tailored to your stack maturity and requirements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => <StatCard key={index} {...stat} />)}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search vendors or categories..."
              className="bg-slate-800/50 border-slate-700 pl-12 h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select>
            <SelectTrigger className="md:w-48 bg-slate-800/50 border-slate-700 h-12">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600 text-white">
              <SelectItem value="crm">CRM</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="support">Support</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="md:w-48 bg-slate-800/50 border-slate-700 h-12">
              <SelectValue placeholder="All Stages" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600 text-white">
              <SelectItem value="early">Early Stage</SelectItem>
              <SelectItem value="growth">Growth Stage</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map(vendor => (
            <VendorCard
              key={vendor.name}
              vendor={vendor}
              onCompare={() => handleOpenModal('compare', vendor)}
              onShortlist={() => handleOpenModal('shortlist', vendor)}
              onSend={() => handleOpenModal('send', vendor)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalState.type === 'compare' && <CompareModal vendor={modalState.vendor} onClose={handleCloseModal} />}
        {modalState.type === 'shortlist' && <ShortlistModal vendor={modalState.vendor} onClose={handleCloseModal} />}
        {modalState.type === 'send' && <SendModal vendor={modalState.vendor} onClose={handleCloseModal} />}
      </AnimatePresence>
    </>
  );
}
