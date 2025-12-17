import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, FileText } from 'lucide-react';

const ProcurementToolkitCard = () => (
  <Card className="glass-effect border-slate-700">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl">
        <Settings className="w-6 h-6 text-purple-400" />
        Procurement Prep Toolkit
      </CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-2 gap-4">
      <Button variant="outline" className="h-20 flex-col gap-1 border-slate-600">
        <FileText className="w-6 h-6"/>
        <span className="text-xs">Download Vendor Brief</span>
      </Button>
      <Button variant="outline" className="h-20 flex-col gap-1 border-slate-600">
        <FileText className="w-6 h-6"/>
        <span className="text-xs">Export Renewal Tracker</span>
      </Button>
      <Button variant="outline" className="h-20 flex-col gap-1 border-slate-600">
        <FileText className="w-6 h-6"/>
        <span className="text-xs">Auto-generate RFP Outline</span>
      </Button>
      <Button variant="outline" className="h-20 flex-col gap-1 border-slate-600">
        <FileText className="w-6 h-6"/>
        <span className="text-xs">Get Contract Risk Score</span>
      </Button>
    </CardContent>
  </Card>
);

export default ProcurementToolkitCard;