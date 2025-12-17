
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // New import for Tabs
import {
  User,
  Shield,
  Bell,
  Plug,
  HelpCircle,
  CreditCard,
  Users,
  Download,
  Upload,
  Eye,
  EyeOff,
  Check,
  X,
  Mail,
  Smartphone,
  Globe,
  Key,
  AlertTriangle,
  Lock,
  PlusCircle,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  Briefcase, // New Icon from outline
  CalendarDays, // New Icon from outline
  Link2, // New Icon from outline
  CheckCircle, // New Icon from outline
  RefreshCw // New Icon from outline
} from 'lucide-react';

// New component for Calendar Sync Card, defined outside the main Settings component
const CalendarSyncCard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 1500); // Simulate connection delay
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <Card className="glass-effect border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <CalendarDays className="w-6 h-6 text-sky-400" />
          Calendar Sync
        </CardTitle>
        <CardDescription className="text-slate-400">Connect calendars for availability.</CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="text-center p-4 bg-slate-900/50 rounded-lg">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white">Calendar Connected!</h3>
            <p className="text-slate-400 mb-4">Connected as vendor@stackstage.com</p>
            <Button variant="outline" onClick={handleDisconnect} className="text-slate-300 border-slate-600 hover:bg-slate-700">
              <X className="w-4 h-4 mr-2" /> Disconnect
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-slate-300 mb-4">Connect your calendar to show meeting availability once a buyer engages.</p>
            <Button onClick={handleConnect} className="w-full gradient-button text-white" disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Connecting...
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4 mr-2" /> Connect Calendar
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    security: true
  });
  const [integrations, setIntegrations] = useState({
    salesforce: { connected: true, lastSync: '2 hours ago' },
    hubspot: { connected: false, lastSync: null },
    slack: { connected: true, lastSync: '5 minutes ago' },
    teams: { connected: false, lastSync: null }
  });
  // New state for privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    privateMode: false,
    selectiveReveal: true
  });
  // New state for blocked vendors (static for now, can be made dynamic)
  const [blockedVendors, setBlockedVendors] = useState(['Analytics Corp', 'DataSell Inc.']);
  const [newBlockedVendor, setNewBlockedVendor] = useState(''); // State for input field

  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [disconnectingIntegration, setDisconnectingIntegration] = useState(null);

  const handleDisconnect = (integrationKey) => {
    setDisconnectingIntegration(integrationKey);
    setShowDisconnectModal(true);
  };

  const confirmDisconnect = () => {
    if (disconnectingIntegration) {
      setIntegrations((prev) => ({
        ...prev,
        [disconnectingIntegration]: { ...prev[disconnectingIntegration], connected: false }
      }));
    }
    setShowDisconnectModal(false);
    setDisconnectingIntegration(null);
  };

  // New constant data for consent logs
  const consentLogs = [
    { date: '2023-10-26', vendor: 'HubSpot', action: 'Invited to Deal Room' },
    { date: '2023-10-22', vendor: 'Salesforce', action: 'Shared Profile' },
    { date: '2023-10-15', vendor: 'Figma', action: 'Shortlist Added' },
    { date: '2023-10-11', vendor: 'Jira', action: 'Viewed Profile' },
    { date: '2023-09-28', vendor: 'Gong', action: 'Shared Profile' }
  ];


  const mockInvoices = [
    { id: 'inv_1', date: 'Oct 1, 2023', amount: '$99.00', status: 'Paid' },
    { id: 'inv_2', date: 'Sep 1, 2023', amount: '$99.00', status: 'Paid' },
    { id: 'inv_3', date: 'Aug 1, 2023', amount: '$99.00', status: 'Paid' }
  ];


  const mockTeamMembers = [
    { name: 'John Doe', email: 'john.doe@company.com', role: 'Owner', avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=500&auto=format&fit=crop' },
    { name: 'Jane Smith', email: 'jane.smith@company.com', role: 'Admin', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop' }
  ];


  // New constant data for privacy status
  const privacyStatus = privacySettings.privateMode ?
    { level: 'Fully Private', color: 'bg-emerald-500/20 text-emerald-300', icon: <ShieldCheck className="w-4 h-4" />, desc: 'Your identity is hidden and vendors cannot see your activity.' } :
    privacySettings.selectiveReveal ?
      { level: 'Shared Profile', color: 'bg-yellow-500/20 text-yellow-300', icon: <ShieldAlert className="w-4 h-4" />, desc: 'Anonymized stack & use case data are visible to matched vendors.' } :
      { level: 'Vendor Engaged', color: 'bg-red-500/20 text-red-300', icon: <UserCheck className="w-4 h-4" />, desc: 'You are actively sharing your profile with specific vendors.' };


  const sections = [
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'security', label: 'Security & Login', icon: <Shield className="w-5 h-5" /> },
    { id: 'privacy', label: 'Trust & Privacy', icon: <Lock className="w-5 h-5" /> }, // New section
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'integrations', label: 'Integrations', icon: <Plug className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'team', label: 'Team Management', icon: <Users className="w-5 h-5" /> },
    { id: 'support', label: 'Support', icon: <HelpCircle className="w-5 h-5" /> }
  ];


  const renderProfileSection = () =>
    <div className="space-y-6">
      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              JD
            </div>
            <div>
              <Button variant="outline" className="bg-sky-400 text-slate-50 mr-3 px-4 py-2 text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:text-accent-foreground h-10 hover:bg-slate-200">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              <Button variant="ghost" className="text-slate-400 hover:text-white">
                Remove
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
              <Input id="firstName" defaultValue="John" className="bg-slate-800/50 border-slate-600 text-white" />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" className="bg-slate-800/50 border-slate-600 text-white" />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-slate-300">Email Address</Label>
            <Input id="email" type="email" defaultValue="john.doe@company.com" className="bg-slate-800/50 border-slate-600 text-white" />
          </div>

          <div>
            <Label htmlFor="title" className="text-slate-300">Job Title</Label>
            <Input id="title" defaultValue="VP of Technology" className="bg-slate-800/50 border-slate-600 text-white" />
          </div>

          <div>
            <Label htmlFor="company" className="text-slate-300">Company</Label>
            <Input id="company" defaultValue="TechCorp Inc." className="bg-slate-800/50 border-slate-600 text-white" />
          </div>

          <Button className="gradient-button text-white">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>;


  const renderSecuritySection = () =>
    <div className="space-y-6">
      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Password & Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword" className="text-slate-300">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                className="bg-slate-800/50 border-slate-600 text-white pr-10" />

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}>

                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="newPassword" className="text-slate-300">New Password</Label>
            <Input id="newPassword" type="password" className="bg-slate-800/50 border-slate-600 text-white" />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-slate-300">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" className="bg-slate-800/50 border-slate-600 text-white" />
          </div>

          <Button variant="outline" className="bg-sky-400 text-slate-50 px-4 py-2 text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:bg-accent h-10 border-slate-600 hover:text-white">
            Update Password
          </Button>
        </CardContent>
      </Card>

      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">SMS Authentication</p>
              <p className="text-slate-400 text-sm">Receive codes via text message</p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-400">Enabled</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Authenticator App</p>
              <p className="text-slate-400 text-sm">Use Google Authenticator or similar</p>
            </div>
            <Button variant="outline" className="bg-sky-400 text-slate-50 px-4 py-2 text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:bg-accent h-10 border-slate-600 hover:text-white">
              Setup
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Single Sign-On (SSO)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Google SSO</p>
              <p className="text-slate-400 text-sm">Sign in with your Google account</p>
            </div>
            <Badge className="bg-sky-500/20 text-sky-400">Connected</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Microsoft SSO</p>
              <p className="text-slate-400 text-sm">Sign in with your Microsoft account</p>
            </div>
            <Button variant="outline" className="bg-sky-400 text-slate-50 px-4 py-2 text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:bg-accent h-10 border-slate-600 hover:text-white">
              Connect
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">SAML SSO</p>
              <p className="text-slate-400 text-sm">Enterprise single sign-on</p>
            </div>
            <Badge className="bg-slate-600 text-slate-400">Enterprise Only</Badge>
          </div>
        </CardContent>
      </Card>
    </div>;


  // New render function for Privacy section
  const renderPrivacySection = () =>
    <div className="space-y-8">
      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Current Privacy Status</CardTitle>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className={`px-4 py-2 text-base ${privacyStatus.color} cursor-pointer`}>
                  <div className="flex items-center gap-2">
                    {privacyStatus.icon}
                    <span>{privacyStatus.level}</span>
                  </div>
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="glass-effect border-slate-700 text-white">
                <p>{privacyStatus.desc}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>

      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Privacy Choices</CardTitle>
          <p className="text-slate-400 text-sm">Control how your information is shared across StackStage.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <Label htmlFor="private-mode" className="font-semibold text-white">Private Mode</Label>
              <p className="text-sm text-slate-400">Hides your identity and disables all vendor alerts and notifications.</p>
            </div>
            <Switch
              id="private-mode"
              checked={privacySettings.privateMode}
              onCheckedChange={(c) => setPrivacySettings({ ...privacySettings, privateMode: c, selectiveReveal: c ? false : privacySettings.selectiveReveal })} />

          </div>
          <div className={`flex items-center justify-between p-4 bg-slate-800/50 rounded-lg transition-opacity ${privacySettings.privateMode ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <div>
              <Label htmlFor="selective-reveal" className="font-semibold text-white">Selective Reveal</Label>
              <p className="text-sm text-slate-400">Allows matched vendors to see your anonymized stack and use cases.</p>
            </div>
            <Switch
              id="selective-reveal"
              checked={privacySettings.selectiveReveal}
              disabled={privacySettings.privateMode}
              onCheckedChange={(c) => setPrivacySettings({ ...privacySettings, selectiveReveal: c })} />

          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Vendor Block List</CardTitle>
          <p className="text-slate-400 text-sm">Blocked vendors will not appear in your recommendations or be able to contact you.</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4">
            {blockedVendors.length === 0 ?
              <p className="text-slate-500 text-center py-4">No vendors are currently blocked.</p> :

              blockedVendors.map((vendor) =>
                <div key={vendor} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <span className="text-slate-300">{vendor}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-slate-400 hover:text-red-400"
                    onClick={() => setBlockedVendors(blockedVendors.filter((v) => v !== vendor))}>

                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )
            }
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter vendor name to block..."
              className="bg-slate-800/50 border-slate-600 text-white"
              value={newBlockedVendor}
              onChange={(e) => setNewBlockedVendor(e.target.value)} />

            <Button className="bg-sky-400 text-slate-50 px-4 py-2 text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 hover:bg-slate-200"

              onClick={() => {
                if (newBlockedVendor.trim() !== '' && !blockedVendors.includes(newBlockedVendor.trim())) {
                  setBlockedVendors([...blockedVendors, newBlockedVendor.trim()]);
                  setNewBlockedVendor('');
                }
              }}>

              <PlusCircle className="w-4 h-4 mr-2" />
              Block Vendor
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Consent Logs</CardTitle>
          <p className="text-slate-400 text-sm">A record of all interactions and data sharing events with vendors.</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-3 text-sm font-medium text-slate-400 px-4 py-2 border-b border-slate-700">
              <span>Date</span>
              <span>Vendor</span>
              <span>Action</span>
            </div>
            {consentLogs.map((log, index) =>
              <div key={index} className="grid grid-cols-3 text-sm text-slate-300 px-4 py-3 rounded-lg hover:bg-slate-800/50">
                <span>{log.date}</span>
                <span>{log.vendor}</span>
                <span>{log.action}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>;


  const renderNotificationsSection = () =>
    <div className="space-y-6">
      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Email Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Stack Analysis Updates</p>
              <p className="text-slate-400 text-sm">Get notified when your stack analysis is complete</p>
            </div>
            <Switch checked={notifications.email} onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Weekly Summary</p>
              <p className="text-slate-400 text-sm">Weekly digest of your activity and recommendations</p>
            </div>
            <Switch checked={notifications.weekly} onCheckedChange={(checked) => setNotifications({ ...notifications, weekly: checked })} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Security Alerts</p>
              <p className="text-slate-400 text-sm">Important security and account notifications</p>
            </div>
            <Switch checked={notifications.security} onCheckedChange={(checked) => setNotifications({ ...notifications, security: checked })} />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Push Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Browser Notifications</p>
              <p className="text-slate-400 text-sm">Receive notifications in your browser</p>
            </div>
            <Switch checked={notifications.push} onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })} />
          </div>
        </CardContent>
      </Card>
    </div>;


  const renderIntegrationsSection = () =>
    <div className="space-y-6">
      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">CRM Integrations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(integrations).map(([key, integration]) =>
            <div key={key} className="flex items-center justify-between p-4 border border-slate-700 rounded-lg">
              <div className="flex items-center gap-3">
                <img
                  src={`https://logo.clearbit.com/${key === 'teams' ? 'microsoft' : key}.com`}
                  alt={`${key} logo`}
                  className="w-8 h-8 rounded-lg bg-white p-1" />

                <div>
                  <p className="text-white font-medium capitalize">{key}</p>
                  <p className="text-slate-400 text-sm">
                    {integration.connected ?
                      `Last synced: ${integration.lastSync}` :
                      'Not connected'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {integration.connected ?
                  <>
                    <Badge className="bg-emerald-500/20 text-emerald-400">
                      <Check className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                      onClick={() => handleDisconnect(key)}>

                      Disconnect
                    </Button>
                  </> :

                  <Button className="gradient-button text-white">
                    Connect
                  </Button>
                }
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {/* New Calendar Sync Card added to Integrations section */}
      <CalendarSyncCard />
    </div>;


  const renderBillingSection = () =>
    <div className="space-y-6">
      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Free Plan</h3>
              <p className="text-slate-400">3 evaluations per month</p>
            </div>
            <Button className="gradient-button text-white">
              Upgrade Plan
            </Button>
          </div>

          <div className="border-t border-slate-700 pt-4">
            <p className="text-slate-300 font-medium mb-2">Usage This Month</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Stack Evaluations</span>
                <span className="text-white">2 / 3</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-sky-400 to-cyan-400 h-2 rounded-full" style={{ width: '66%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-4 text-sm text-slate-400 font-medium px-4 py-2 border-b border-slate-700">
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Invoice</span>
            </div>
            {mockInvoices.map((invoice) =>
              <div key={invoice.id} className="grid grid-cols-4 items-center text-sm text-slate-300 px-4 py-3 rounded-lg hover:bg-slate-800/50">
                <span>{invoice.date}</span>
                <span>{invoice.amount}</span>
                <div>
                  <Badge className="bg-emerald-500/20 text-emerald-400">{invoice.status}</Badge>
                </div>
                <div>
                  <Button variant="link" className="text-sky-400 p-0 h-auto">Download</Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>;


  const renderTeamSection = () =>
    <div className="space-y-6">
      <Card className="glass-effect border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-white">Team Members</CardTitle>
          <Button className="gradient-button text-white">
            <Mail className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {mockTeamMembers.map((member) =>
            <div key={member.email} className="flex items-center justify-between p-4 border border-slate-700 rounded-lg">
              <div className="flex items-center gap-4">
                <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-white font-medium">{member.name}</p>
                  <p className="text-slate-400 text-sm">{member.email}</p>
                </div>
              </div>
              <Badge className={`${member.role === 'Owner' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-600 text-slate-300'}`}>
                {member.role}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>;


  const renderSupportSection = () =>
    <div className="space-y-6">
      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Get Help</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="bg-sky-400 text-slate-50 px-4 py-2 text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:bg-accent h-10 w-full justify-start border-slate-600 hover:text-white">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help Center
          </Button>

          <Button variant="outline" className="bg-sky-400 text-slate-50 px-4 py-2 text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:bg-accent h-10 w-full justify-start border-slate-600 hover:text-white">
            <Mail className="w-4 h-4 mr-2" />
            Contact Support
          </Button>

          <Button variant="outline" className="bg-sky-400 text-slate-50 px-4 py-2 text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:bg-accent h-10 w-full justify-start border-slate-600 hover:text-white">
            <Download className="w-4 h-4 mr-2" />
            Download Data
          </Button>
        </CardContent>
      </Card>

      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-red-500/30 bg-red-500/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="font-bold text-red-400">Danger Zone</h3>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              These actions cannot be undone. Please proceed with caution.
            </p>
            <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/20">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;


  // Renamed from renderContent to renderSection as per outline and updated cases
  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection();
      case 'security': return renderSecuritySection();
      case 'privacy': return renderPrivacySection(); // New case
      case 'notifications': return renderNotificationsSection();
      case 'integrations': return renderIntegrationsSection();
      case 'billing': return renderBillingSection();
      case 'team': return renderTeamSection();
      case 'support': return renderSupportSection();
      default: return renderProfileSection();
    }
  };

  const Modal = ({ children, onClose }) =>
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-effect border-slate-700 rounded-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>;


  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8"> {/* Changed lg to md for responsiveness */}
        {/* Sidebar Navigation */}
        <div className="md:col-span-1"> {/* Changed lg to md */}
          <Card className="glass-effect border-slate-700 p-2">
            <nav className="space-y-1">
              {sections.map((section) =>
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors duration-200 ${
                    activeSection === section.id ?
                      'bg-sky-500/20 text-sky-300' :
                      'text-slate-300 hover:bg-slate-700/50'}`
                  }>

                  {section.icon}
                  <span>{section.label}</span>
                </button>
              )}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3"> {/* Changed lg to md */}
          {renderSection()}
        </div>
      </div>

      {showDisconnectModal &&
        <Modal onClose={() => setShowDisconnectModal(false)}>
          <CardHeader>
            <CardTitle className="text-white">Disconnect {disconnectingIntegration && disconnectingIntegration.charAt(0).toUpperCase() + disconnectingIntegration.slice(1)}?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300">
              Are you sure you want to disconnect this integration? Your data will no longer sync.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white" onClick={() => setShowDisconnectModal(false)}>
                Cancel
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={confirmDisconnect}>
                Confirm Disconnect
              </Button>
            </div>
          </CardContent>
        </Modal>
      }
    </div>);

}
