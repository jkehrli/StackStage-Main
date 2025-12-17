
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, Plus, MoreHorizontal, Globe, Upload, Package, Tag, GitBranch, Bell, Mail, Shield, Calendar, Trash2, Edit, X, CheckCircle, Send, MapPin, Building, DollarSign, Filter, Lock, Link2 } from 'lucide-react';

const teamMembersData = [
  { id: '1', name: 'Sarah Jennings', role: 'AE', email: 'sarah.j@acme.com', status: 'Active' },
  { id: '2', name: 'Mike Johnson', role: 'SE', email: 'mike.j@acme.com', status: 'Active' },
  { id: '3', name: 'Chen Li', role: 'SDR', email: 'chen.l@acme.com', status: 'Pending' },
  { id: '4', name: 'Maria Garcia', role: 'CSM', email: 'maria.g@acme.com', status: 'Active' },
  { id: '5', name: 'David Chen', role: 'Exec Sponsor', email: 'david.c@acme.com', status: 'Active' },
];

const territoriesData = [
  { id: 't1', name: 'North America - Enterprise', type: 'Region', reps: ['Sarah Jennings', 'Mike Johnson'] },
  { id: 't2', name: 'Financial Services', type: 'Industry', reps: ['Sarah Jennings'] },
  { id: 't3', name: 'EMEA - Mid-Market', type: 'Region', reps: ['Chen Li'] },
];

const productLinesData = [
    { id: 'p1', name: 'UCaaS Platform', assigned: ['Sarah Jennings', 'Mike Johnson', 'Maria Garcia'] },
    { id: 'p2', name: 'CCaaS Solution', assigned: ['Sarah Jennings', 'Mike Johnson'] },
    { id: 'p3', name: 'AI Analytics Add-on', assigned: ['Mike Johnson'] },
];

const routingRulesData = [
    { id: 'r1', condition: 'Buyer Readiness > 80%', action: 'Notify Assigned AE + SE' },
    { id: 'r2', condition: 'StackFit Score > 90%', action: 'Add to "High-Priority" Watchlist' },
    { id: 'r3', condition: 'Tool Marked "Replace"', action: 'Notify Assigned AE' },
];

const Modal = ({ children, onClose, maxWidth = 'max-w-2xl' }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className={`glass-effect border-slate-700 rounded-xl w-full ${maxWidth}`} onClick={e => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="absolute top-3 right-3 text-slate-400 hover:text-white" onClick={onClose}>
                <X className="w-5 h-5" />
            </Button>
            {children}
        </div>
    </div>
);

const AddProductModal = ({ onClose }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = () => {
        setIsSubmitted(true);
        setTimeout(() => onClose(), 2000);
    };

    return (
        <Modal onClose={onClose}>
            <CardHeader>
                <CardTitle className="text-white">Add New Product Line</CardTitle>
                <CardDescription className="text-slate-400">Define a new product or capability to map to your team.</CardDescription>
            </CardHeader>
            <CardContent>
                {!isSubmitted ? (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="product-name" className="text-slate-300">Product Name</Label>
                            <Input id="product-name" placeholder="e.g., Enterprise AI Suite" className="bg-slate-800 border-slate-700 text-white" />
                        </div>
                        <div>
                            <Label htmlFor="product-desc" className="text-slate-300">Description</Label>
                            <Textarea id="product-desc" placeholder="Briefly describe the product line." className="bg-slate-800 border-slate-700 text-white" />
                        </div>
                        <Button onClick={handleSubmit} className="w-full gradient-button">Add Product</Button>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-white mb-2">Product Line Added!</h4>
                        <p className="text-slate-300">You can now assign it to team members.</p>
                    </div>
                )}
            </CardContent>
        </Modal>
    );
};

const UploadCsvModal = ({ onClose }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = () => {
        setIsSubmitted(true);
        setTimeout(() => onClose(), 2000);
    };

    return (
        <Modal onClose={onClose}>
            <CardHeader>
                <CardTitle className="text-white">Upload Territory CSV</CardTitle>
                <CardDescription className="text-slate-400">Bulk upload territory assignments.</CardDescription>
            </CardHeader>
            <CardContent>
                {!isSubmitted ? (
                    <div className="space-y-4">
                        <div className="p-6 border-2 border-dashed border-slate-600 rounded-lg text-center">
                            <Upload className="mx-auto h-12 w-12 text-slate-400" />
                            <p className="mt-2 text-sm text-slate-300">Drag & drop your CSV here or click to upload</p>
                            <Input type="file" className="sr-only" />
                        </div>
                        <Button onClick={handleSubmit} className="w-full gradient-button">Upload & Process</Button>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-white mb-2">Upload Successful!</h4>
                        <p className="text-slate-300">Your territory assignments have been updated.</p>
                    </div>
                )}
            </CardContent>
        </Modal>
    );
};

const AddTerritoryModal = ({ onClose }) => {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => onClose(), 2000);
    };

    return (
        <Modal onClose={onClose}>
            <CardHeader>
                <CardTitle className="text-white">Add New Territory</CardTitle>
                <CardDescription className="text-slate-400">Define a new sales territory based on geography or other attributes.</CardDescription>
            </CardHeader>
            <CardContent>
                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="territory-name" className="text-slate-300">Territory Name</Label>
                            <Input id="territory-name" placeholder="e.g., West Coast Enterprise" className="bg-slate-800 border-slate-700 text-white" />
                        </div>
                        <div>
                            <Label htmlFor="team-member" className="text-slate-300">Assign to Team Member</Label>
                            <Select>
                                <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue placeholder="Select a rep" /></SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                    {teamMembersData.map(member => (
                                        <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="text-slate-300">Criteria</Label>
                            <div className="space-y-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                               <p className="text-sm text-slate-400">Example: Geography IS IN (California, Washington, Oregon) AND Company Size IS GREATER THAN (1000 employees)</p>
                            </div>
                        </div>
                        <Button type="submit" className="w-full gradient-button text-white">Add Territory</Button>
                    </form>
                ) : (
                    <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-white mb-2">Territory Added!</h4>
                        <p className="text-slate-300">Your new territory has been created.</p>
                    </div>
                )}
            </CardContent>
        </Modal>
    );
};

const AddRuleModal = ({ onClose }) => {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => onClose(), 2000);
    };

    return (
        <Modal onClose={onClose}>
            <CardHeader>
                <CardTitle className="text-white">Add Routing Rule</CardTitle>
                <CardDescription className="text-slate-400">Create a rule to automatically assign inbound opportunities.</CardDescription>
            </CardHeader>
            <CardContent>
                 {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="rule-name" className="text-slate-300">Rule Name</Label>
                            <Input id="rule-name" placeholder="e.g., High-Value Inbound to Senior AE" className="bg-slate-800 border-slate-700 text-white" />
                        </div>
                         <div>
                            <Label className="text-slate-300">Rule Logic</Label>
                            <div className="space-y-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                               <p className="text-sm text-slate-400">Example: IF (ARR &gt; $50,000) AND (Industry IS "Fintech") THEN ASSIGN TO (Jane Doe)</p>
                            </div>
                        </div>
                        <Button type="submit" className="w-full gradient-button text-white">Add Rule</Button>
                    </form>
                ) : (
                    <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-white mb-2">Rule Added!</h4>
                        <p className="text-slate-300">Your new routing rule is now active.</p>
                    </div>
                )}
            </CardContent>
        </Modal>
    );
};

const AccessControls = () => {
  const [selectedRole, setSelectedRole] = useState('');
  
  const rolePermissions = {
    'AE': [
      { id: 'perm1', label: 'View Anonymized Buyer Stack Plans', defaultChecked: true },
      { id: 'perm2', label: 'View Deal Timeline', defaultChecked: true },
      { id: 'perm3', label: 'Access MethodOverlay Reports', defaultChecked: true },
      { id: 'perm4', label: 'Export Buyer Data', defaultChecked: false },
      { id: 'perm5', label: 'Modify Deal Status', defaultChecked: true }
    ],
    'SE': [
      { id: 'perm1', label: 'View Anonymized Buyer Stack Plans', defaultChecked: true },
      { id: 'perm2', label: 'View Deal Timeline', defaultChecked: true },
      { id: 'perm3', label: 'Access MethodOverlay Reports', defaultChecked: false },
      { id: 'perm4', label: 'Technical Documentation Access', defaultChecked: true },
      { id: 'perm5', label: 'Solution Architecture Tools', defaultChecked: true }
    ],
    'SDR': [
      { id: 'perm1', label: 'View Anonymized Buyer Stack Plans', defaultChecked: false },
      { id: 'perm2', label: 'View Deal Timeline', defaultChecked: false },
      { id: 'perm3', label: 'Access MethodOverlay Reports', defaultChecked: false },
      { id: 'perm4', label: 'Lead Qualification Tools', defaultChecked: true },
      { id: 'perm5', label: 'Prospect Research Access', defaultChecked: true }
    ],
    'CSM': [
      { id: 'perm1', label: 'View Customer Stack Plans', defaultChecked: true },
      { id: 'perm2', label: 'View Deal Timeline', defaultChecked: true },
      { id: 'perm3', label: 'Access MethodOverlay Reports', defaultChecked: true },
      { id: 'perm4', label: 'Customer Health Metrics', defaultChecked: true },
      { id: 'perm5', label: 'Renewal Management Tools', defaultChecked: true }
    ]
  };

  return (
    <Card className="glass-effect border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2"><Lock className="w-5 h-5 text-sky-400" /> Access Controls</CardTitle>
        <CardDescription className="text-slate-400">Define permissions for different roles within your team.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-slate-300 mb-2 block">Select Role to Configure</Label>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="Select a role to see example permissions..." />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="AE">Account Executive (AE)</SelectItem>
              <SelectItem value="SE">Solutions Engineer (SE)</SelectItem>
              <SelectItem value="SDR">Sales Development Rep (SDR)</SelectItem>
              <SelectItem value="CSM">Customer Success Manager (CSM)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {selectedRole && (
          <div className="space-y-3 pt-4 border-t border-slate-700">
            <h4 className="text-slate-300 font-medium">Permissions for {selectedRole}</h4>
            {rolePermissions[selectedRole].map((permission) => (
              <div key={permission.id} className="flex items-center justify-between">
                <Label htmlFor={permission.id} className="text-slate-300 cursor-pointer">{permission.label}</Label>
                <Switch 
                  id={permission.id} 
                  defaultChecked={permission.defaultChecked}
                  className="data-[state=checked]:bg-sky-500 data-[state=unchecked]:bg-slate-600 border-2 border-slate-500 data-[state=checked]:border-sky-400" 
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const NotificationsSLA = () => (
    <Card className="glass-effect border-slate-700">
        <CardHeader>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-sky-400">
                    <Bell className="w-5 h-5" />
                </div>
                <div>
                    <CardTitle className="text-white text-xl">Notifications & SLA</CardTitle>
                    <CardDescription className="text-slate-400 mt-1">Configure alerts and response time goals.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="response-sla" className="block text-sm font-medium text-slate-300 mb-2">Response Time SLA</Label>
                    <Select defaultValue="12h">
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue placeholder="Select SLA"/></SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                            <SelectItem value="4h">4 Hours</SelectItem>
                            <SelectItem value="12h">12 Hours</SelectItem>
                            <SelectItem value="24h">24 Hours</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-2">Alert Channels</h4>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-400" /><Switch defaultChecked={true}/> <span className="text-white">Email</span></div>
                        <div className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" /><Switch defaultChecked={true}/> <span className="text-white">In-App</span></div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

const CalendarSync = () => (
    <Card className="glass-effect border-slate-700">
        <CardHeader>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-sky-400">
                    <Calendar className="w-5 h-5" />
                </div>
                <div>
                    <CardTitle className="text-white text-xl">Calendar Sync</CardTitle>
                    <CardDescription className="text-slate-400 mt-1">Connect calendars for availability.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
             <div className="text-center">
                <p className="text-slate-400 mb-4">Connect your calendar to show meeting availability once a buyer engages.</p>
                <Button className="w-full gradient-button text-white">
                    <Link2 className="w-4 h-4 mr-2" />
                    Connect Google Calendar
                </Button>
            </div>
        </CardContent>
    </Card>
);

export default function YourLineup() {
    const [teamMembers, setTeamMembers] = useState(teamMembersData);
    const [territories, setTerritories] = useState(territoriesData);
    const [productLines, setProductLines] = useState(productLinesData);
    const [routingRules, setRoutingRules] = useState(routingRulesData);
    
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showUploadCsvModal, setShowUploadCsvModal] = useState(false);
    const [showAddTerritory, setShowAddTerritory] = useState(false);
    const [showAddRule, setShowAddRule] = useState(false);

    const removeMember = (id) => {
        setTeamMembers(teamMembers.filter(member => member.id !== id));
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-white">Your Lineup</h1>
                <p className="text-slate-300 mt-2 max-w-3xl">
                    Manage team roles, territory routing, and engagement settings to prepare for buyer-led engagement.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Column 1 */}
                <div className="space-y-8">
                    {/* Team Members */}
                    <Card className="glass-effect border-slate-700">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-sky-400">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-white text-xl">Team Members</CardTitle>
                                    <CardDescription className="text-slate-400 mt-1">Manage your sales team members and their roles within StackStage.</CardDescription>
                                </div>
                            </div>
                            <Button className="gradient-button"><Plus className="w-4 h-4 mr-2" />Add Team Member</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-slate-700">
                                        <TableHead className="text-slate-300">Name</TableHead>
                                        <TableHead className="text-slate-300">Role</TableHead>
                                        <TableHead className="text-slate-300">Status</TableHead>
                                        <TableHead className="text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teamMembers.map((member) => (
                                        <TableRow key={member.id} className="border-slate-700">
                                            <TableCell>
                                                <p className="font-medium text-white">{member.name}</p>
                                                <p className="text-sm text-slate-400">{member.email}</p>
                                            </TableCell>
                                            <TableCell><Badge variant="outline" className="border-slate-600 text-slate-300">{member.role}</Badge></TableCell>
                                            <TableCell>
                                                <Badge className={member.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}>
                                                    {member.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="w-8 h-8"><MoreHorizontal className="w-4 h-4" /></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="bg-slate-800 border-slate-700 text-white">
                                                        <DropdownMenuItem>Edit Role</DropdownMenuItem>
                                                        <DropdownMenuItem>{member.status === 'Pending' ? 'Re-send Invite' : 'Deactivate'}</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-400" onClick={() => removeMember(member.id)}>Remove</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Product Line Mapping */}
                     <Card className="glass-effect border-slate-700">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-sky-400">
                                    <Package className="w-5 h-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-white text-xl">Product Line Mapping</CardTitle>
                                    <CardDescription className="text-slate-400 mt-1">Assign product expertise to align the right specialists with buyer needs.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-end mb-4">
                                <Button className="gradient-button" onClick={() => setShowAddProductModal(true)}>
                                    <Tag className="w-4 h-4 mr-2" />
                                    Add Product
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {productLines.map(product => (
                                    <div key={product.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-semibold text-white">{product.name}</h4>
                                            <Button variant="ghost" size="icon" className="w-8 h-8"><Edit className="w-4 h-4 text-slate-400" /></Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {product.assigned.map(name => <Badge key={name} variant="secondary" className="bg-slate-700 text-slate-300">{name}</Badge>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Engagement Routing */}
                    <Card className="glass-effect border-slate-700">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-sky-400">
                                    <GitBranch className="w-5 h-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-white text-xl">Engagement Routing</CardTitle>
                                    <CardDescription className="text-slate-400 mt-1">Define rules to automatically route and notify teams based on buyer signals.</CardDescription>
                                </div>
                            </div>
                            <Button className="gradient-button" onClick={() => setShowAddRule(true)}><Plus className="w-4 h-4 mr-2" />Add New Rule</Button>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-3">
                                {routingRules.map((rule) => (
                                    <div key={rule.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <p className="text-xs text-slate-400">IF</p>
                                                <p className="font-medium text-white">{rule.condition}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400">THEN</p>
                                                <p className="font-medium text-white">{rule.action}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="w-8 h-8"><Trash2 className="w-4 h-4 text-slate-400 hover:text-red-400" /></Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Column 2 */}
                <div className="space-y-8">
                    {/* Territory Coverage */}
                    <Card className="glass-effect border-slate-700">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-sky-400">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-white text-xl">Territory Coverage</CardTitle>
                                    <CardDescription className="text-slate-400 mt-1">Assign territories to your team to ensure the right rep is notified.</CardDescription>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button className="bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white" onClick={() => setShowUploadCsvModal(true)}>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload CSV
                                </Button>
                                <Button className="gradient-button" onClick={() => setShowAddTerritory(true)}><Plus className="w-4 h-4 mr-2" /> Add Territory</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {territories.map(t => (
                                <div key={t.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 space-y-2">
                                    <div className="flex items-center gap-2 text-sky-400">
                                        <MapPin className="w-5 h-5" />
                                        <h4 className="font-semibold text-white text-lg">{t.name}</h4>
                                    </div>
                                    <p className="text-sm text-slate-400">{t.type}</p>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {t.reps.map(r => <Badge key={r} variant="secondary" className="bg-slate-700 text-slate-300">{r}</Badge>)}
                                    </div>
                                    <div className="flex justify-end mt-3">
                                        <Button variant="ghost" size="icon" className="w-8 h-8"><Edit className="w-4 h-4 text-slate-400" /></Button>
                                        <Button variant="ghost" size="icon" className="w-8 h-8"><Trash2 className="w-4 h-4 text-red-400" /></Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                     {/* Access Controls */}
                     <AccessControls />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Notification Settings */}
                        <NotificationsSLA />

                        {/* Calendar Sync */}
                        <CalendarSync />
                    </div>
                    {/* Section 8: Preferred Outreach Cadence */}
                    <Card className="glass-effect border-slate-700">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-sky-400">
                                    <Send className="w-5 h-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-white text-xl">Preferred Outreach Cadence</CardTitle>
                                    <CardDescription className="text-slate-400 mt-1">Set the preferred frequency and method for buyer outreach.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="outreach-frequency" className="text-slate-300 mb-2">Outreach Frequency</Label>
                                    <Select defaultValue="daily">
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue placeholder="Select frequency"/></SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="outreach-method" className="block text-sm font-medium text-slate-300 mb-2">Primary Method</Label>
                                    <Select defaultValue="email">
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue placeholder="Select method"/></SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                            <SelectItem value="email">Email</SelectItem>
                                            <SelectItem value="phone">Phone Call</SelectItem>
                                            <SelectItem value="linkedin">LinkedIn Message</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button className="w-full gradient-button">Save Cadence Settings</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {showAddProductModal && <AddProductModal onClose={() => setShowAddProductModal(false)} />}
            {showUploadCsvModal && <UploadCsvModal onClose={() => setShowUploadCsvModal(false)} />}
            {showAddTerritory && <AddTerritoryModal onClose={() => setShowAddTerritory(false)} />}
            {showAddRule && <AddRuleModal onClose={() => setShowAddRule(false)} />}
        </div>
    );
}
