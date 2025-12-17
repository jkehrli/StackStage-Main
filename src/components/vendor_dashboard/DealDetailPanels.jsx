
import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, AlertTriangle, TrendingDown, RotateCw, GitCompare, Lock, Eye, ArrowRight } from 'lucide-react';

const readinessConfig = {
  low: { color: "text-red-400", bgColor: "bg-red-500/10" },
  medium: { color: "text-yellow-400", bgColor: "bg-yellow-500/10" },
  high: { color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
};

const getReadinessLevel = (percentage) => {
  if (percentage >= 70) return 'high';
  if (percentage >= 40) return 'medium';
  return 'low';
};

const getStatusIcon = (status) => {
    switch(status) {
      case 'complete': return <Check className="w-5 h-5 text-emerald-400" />;
      case 'in_progress': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default: return <X className="w-5 h-5 text-red-400" />;
    }
};

const MethodologyPanel = ({ title, data }) => {
    const fields = data ? Object.entries(data) : [];
    if (fields.length === 0) return null;

    return (
        <Card className="glass-effect border-slate-700">
            <CardHeader>
                <CardTitle className="text-white text-base">{title} Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {fields.map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center text-sm">
                        <span className="text-slate-300 capitalize">{key}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400 capitalize">{(value.status || 'missing').replace('_', ' ')}</span>
                            {getStatusIcon(value.status)}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const ReadinessPanel = ({ deal, onRequestConnection }) => {
  const readiness = getReadinessLevel(deal.readiness);
  const statusMap = {
    'Private Evaluation': 'Buyer is evaluating solutions privately. Your profile is anonymized.',
    'Shared Profile': 'Buyer has shown interest and can see your basic profile.',
    'Vendor Engaged': 'Buyer has initiated contact. The deal room is active.',
  };

  const getAccessButton = () => {
    if (deal.readiness < 70) {
      return <Button variant="outline" className="w-full border-slate-600 text-slate-300" disabled><Lock className="w-4 h-4 mr-2" /> Engagement Locked</Button>;
    }
    if (deal.accessLevel === 'View Anonymized' || deal.accessLevel === 'Shared Profile') {
      return <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700" onClick={onRequestConnection}><Eye className="w-4 h-4 mr-2" /> Request Connection</Button>;
    }
    return (
        <Link to={createPageUrl('DealSync')} className="w-full">
            <Button className="w-full gradient-button"><ArrowRight className="w-4 h-4 mr-2" /> Enter Deal Room</Button>
        </Link>
    );
  };

  return (
    <Card className={`glass-effect border-slate-700 ${readinessConfig[readiness].bgColor}`}>
      <CardHeader>
        <CardTitle className="text-white text-base">Buyer Readiness & Engagement</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className={`text-5xl font-bold ${readinessConfig[readiness].color}`}>{deal.readiness}%</p>
          <p className="text-sm text-slate-300 font-medium">{deal.status}</p>
        </div>
        <div className="text-sm text-center text-slate-400 p-3 bg-slate-800/40 rounded-md">
          {statusMap[deal.accessLevel]}
        </div>
        {getAccessButton()}
      </CardContent>
    </Card>
  );
};

const RenewalRadarPanel = ({ deal }) => (
  <Card className="glass-effect border-slate-700">
    <CardHeader>
      <CardTitle className="text-white text-base">Renewal Radar</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {deal.renewalRadar.map(item => (
        <div key={item.name} className="flex justify-between items-center text-sm p-2 rounded-md bg-slate-800/40">
          <div>
            <p className="font-semibold text-white">{item.name}</p>
            <p className="text-slate-400">{item.days} days remaining</p>
          </div>
          <Button size="sm" variant={item.action === 'Replace' ? 'destructive' : 'secondary'} className="h-7 text-xs">
            {item.action === 'Replace' && <TrendingDown className="w-3 h-3 mr-1" />}
            {item.action === 'Negotiate' && <GitCompare className="w-3 h-3 mr-1" />}
            {item.action === 'Renew' && <RotateCw className="w-3 h-3 mr-1" />}
            {item.action}
          </Button>
        </div>
      ))}
    </CardContent>
  </Card>
);

const DealDetailPanels = ({ deal, methodology, onRequestConnection }) => {
  if (!deal) {
    return (
      <div className="h-full flex items-center justify-center text-center text-slate-500 p-8 glass-effect border-slate-700 rounded-lg">
        <div>
          <Eye className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-300">Select a Deal</h3>
          <p>Choose a deal from the Deal Room to see detailed analysis and engagement options.</p>
        </div>
      </div>
    );
  }

  const renderMethodologyPanel = () => {
      const methodologyData = deal[methodology.toLowerCase()];
      return <MethodologyPanel title={methodology} data={methodologyData} />;
  };

  return (
    <div className="space-y-6">
      <ReadinessPanel deal={deal} onRequestConnection={onRequestConnection} />
      {renderMethodologyPanel()}
      <RenewalRadarPanel deal={deal} />
    </div>
  );
};

export default DealDetailPanels;
