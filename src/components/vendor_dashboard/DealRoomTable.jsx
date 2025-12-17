
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TrendingUp, GitCompare, RotateCw, Check, AlertTriangle, X } from 'lucide-react';

const statusConfig = {
  "Pre-Engagement": { color: "bg-slate-500/20 text-slate-300", icon: <TrendingUp className="w-3 h-3" /> },
  "Procurement": { color: "bg-sky-500/20 text-sky-300", icon: <GitCompare className="w-3 h-3" /> },
  "Post-Sale": { color: "bg-emerald-500/20 text-emerald-300", icon: <RotateCw className="w-3 h-3" /> },
};

const stackFitConfig = {
  High: "text-emerald-400",
  Medium: "text-yellow-400",
  Low: "text-red-400",
};

const MethodologyIndicator = ({ deal, methodology }) => {
  let fields, completedCount, totalFields, methodologyName;

  const getCompletedCount = (dataObject) => {
    return Object.values(dataObject).filter(field => field?.status === 'complete').length;
  };

  switch (methodology) {
    case 'BANT':
      fields = deal.bant ? Object.keys(deal.bant) : [];
      completedCount = deal.bant ? getCompletedCount(deal.bant) : 0;
      totalFields = fields.length;
      methodologyName = 'BANT';
      break;
    case 'Sandler':
      fields = deal.sandler ? Object.keys(deal.sandler) : [];
      completedCount = deal.sandler ? getCompletedCount(deal.sandler) : 0;
      totalFields = fields.length;
      methodologyName = 'Sandler';
      break;
    default: // MEDDPICC
      fields = deal.meddpicc ? Object.keys(deal.meddpicc) : [];
      completedCount = deal.meddpicc ? getCompletedCount(deal.meddpicc) : 0;
      totalFields = fields.length;
      methodologyName = 'MEDDPICC';
  }

  const confidence = totalFields > 0 ? (completedCount / totalFields) * 100 : 0;
  
  let icon = <AlertTriangle className="w-4 h-4 text-yellow-400" />;
  if (confidence > 75) icon = <Check className="w-4 h-4 text-emerald-400" />;
  if (confidence < 25 && totalFields > 0) icon = <X className="w-4 h-4 text-red-400" />;
  if (totalFields === 0) icon = <X className="w-4 h-4 text-slate-500" />; // Indicate no data

  const methodologyData = deal[methodology.toLowerCase()];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5 cursor-pointer">
            {icon}
            <span className="text-xs text-slate-300">{Math.round(confidence)}%</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="glass-effect border-slate-700 text-white">
          <p>{methodologyName} Confidence: {Math.round(confidence)}%</p>
           {fields.length > 0 && methodologyData ? (
            <ul className="text-xs list-disc list-inside mt-1">
                {fields.map(f => <li key={f}>{f.charAt(0).toUpperCase() + f.slice(1)}: {methodologyData[f]?.status || 'N/A'}</li>)}
            </ul>
           ) : (
            <p className="text-xs mt-1">No data available for {methodologyName}.</p>
           )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};


const DealRoomTable = ({ deals, onSelectDeal, selectedDealId, methodology }) => {
  const navigate = useNavigate();

  const handleRowClick = (deal) => {
    onSelectDeal(deal);
    if (deal.readiness >= 70 && deal.accessLevel === 'Vendor Engaged') {
        navigate(createPageUrl('DealSync'));
    }
  };
  
  return (
    <Card className="glass-effect border-slate-700 h-full">
      <CardHeader>
        <CardTitle className="text-white">Deal Room</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-transparent">
              <TableHead className="text-slate-400">Buyer</TableHead>
              <TableHead className="text-slate-400 text-center">Readiness</TableHead>
              <TableHead className="text-slate-400">Status</TableHead>
              <TableHead className="text-slate-400">Stack Fit</TableHead>
              <TableHead className="text-slate-400">{methodology}</TableHead>
              <TableHead className="text-slate-400 text-right">Potential ARR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.map((deal) => (
              <TableRow
                key={deal.id}
                className={`border-slate-700 cursor-pointer transition-colors ${selectedDealId === deal.id ? 'bg-sky-500/10' : 'hover:bg-slate-800/50'}`}
                onClick={() => handleRowClick(deal)}
              >
                <TableCell className="font-medium text-white">{deal.readiness < 70 ? `Buyer-${deal.id.toString().padStart(4, '0')}` : deal.buyerName}</TableCell>
                <TableCell className="text-center">
                  <span className={`font-semibold ${deal.readiness >= 70 ? 'text-emerald-400' : 'text-slate-300'}`}>{deal.readiness}%</span>
                </TableCell>
                <TableCell>
                  <Badge className={`border-none ${statusConfig[deal.status]?.color} flex items-center gap-1.5`}>
                    {statusConfig[deal.status]?.icon} {deal.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`font-medium ${stackFitConfig[deal.stackFit]}`}>{deal.stackFit}</span>
                </TableCell>
                <TableCell>
                  <MethodologyIndicator deal={deal} methodology={methodology} />
                </TableCell>
                <TableCell className="text-right font-semibold text-slate-200">${deal.arr.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DealRoomTable;
