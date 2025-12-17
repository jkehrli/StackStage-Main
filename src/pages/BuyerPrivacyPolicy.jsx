
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, EyeOff, UserCheck, BarChart3, Database, MailX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const PrivacyPrincipleCard = ({ icon, title, description }) => (
  <Card className="glass-effect border-slate-700 h-full">
    <CardHeader className="flex flex-row items-center gap-4">
      <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center text-sky-400">
        {icon}
      </div>
      <CardTitle className="text-white">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-slate-300">{description}</p>
    </CardContent>
  </Card>
);

export default function BuyerPrivacyPolicy() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Your Privacy on StackStage</h1>
        <p className="text-slate-300 mt-2 max-w-3xl">
          We built StackStage with a privacy-first ethos. You are in complete control of your data, your anonymity, and when—or if—you ever engage with a vendor.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PrivacyPrincipleCard
          icon={<EyeOff className="w-6 h-6" />}
          title="Anonymity by Default"
          description="Your identity, company name, and contact information are never visible to vendors unless you explicitly grant access. Plan your stack in a secure, private workspace without unsolicited contact."
        />
        <PrivacyPrincipleCard
          icon={<UserCheck className="w-6 h-6" />}
          title="You Control Engagement"
          description="Vendors cannot see or contact you until you send an 'EngageSignal'. You decide which vendors to engage with and when you're ready to start a conversation, eliminating sales pressure."
        />
        <PrivacyPrincipleCard
          icon={<MailX className="w-6 h-6" />}
          title="No Unsolicited Contact"
          description="Because vendors can't see your identity, they can't send you unsolicited emails, calls, or meeting requests. All communication happens within the StackStage platform, on your terms."
        />
        <PrivacyPrincipleCard
          icon={<BarChart3 className="w-6 h-6" />}
          title="Aggregated, Anonymized Insights"
          description="We provide vendors with anonymized market intelligence (e.g., '15% of companies this size are evaluating CRMs'). Your specific data is never shared, only aggregated into broad, anonymous trends."
        />
        <PrivacyPrincipleCard
          icon={<Database className="w-6 h-6" />}
          title="Transparent Data Usage"
          description="The data you provide about your stack is used for one purpose: to calculate your StackFit score and match you with relevant solutions. It is never sold or shared with third parties."
        />
        <PrivacyPrincipleCard
          icon={<ShieldCheck className="w-6 h-6" />}
          title="Your Trust Center"
          description="Manage consent logs, block specific vendors permanently, and control all data-sharing preferences from your personal Trust Center. You have granular control over your privacy settings at all times."
        />
      </div>

      <Card className="glass-effect border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Ready to Plan Your Stack?</CardTitle>
          <CardDescription className="text-slate-400">
            Start building your technology roadmap in a private, secure environment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to={createPageUrl('StackPlanner')}>
            <Button className="gradient-button">Go to Stack Planner</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
