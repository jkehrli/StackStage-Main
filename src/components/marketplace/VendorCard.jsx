import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Plus, Send, TrendingUp, Zap } from 'lucide-react';

const VendorCard = ({ vendor, onCompare, onShortlist, onSend, onAddToComparison, isInComparison }) => {
  const getMaturityColor = (level) => {
    const colors = {
      'Emerging': 'bg-blue-500/20 text-blue-300',
      'Scaling': 'bg-purple-500/20 text-purple-300',  
      'Leading': 'bg-emerald-500/20 text-emerald-300'
    };
    return colors[level] || 'bg-slate-500/20 text-slate-300';
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          {/* Vendor Info Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={vendor.logoUrl} 
                alt={`${vendor.name} logo`} 
                className="w-10 h-10 rounded-lg bg-white p-1 flex-shrink-0" 
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-white text-lg">{vendor.name}</p>
                  {isInComparison && (
                    <Badge className="bg-sky-500/20 text-sky-300 text-xs">
                      In Comparison
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-400">{vendor.category}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-sky-400" />
                  <span className="text-slate-400">Fit:</span> 
                  <span className="text-white font-medium">{vendor.stackFit}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-400">Stage:</span> 
                  <Badge className={getMaturityColor(vendor.maturityAlignment)}>
                    {vendor.maturityAlignment}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-1 text-yellow-400 font-bold whitespace-nowrap">
                <Star className="w-4 h-4 fill-current" /> 
                <span>{vendor.peerScore}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons Row */}
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 h-9 text-sm border-slate-600 hover:bg-slate-700 hover:scale-105 transition-all duration-200"
              onClick={() => onCompare(vendor)}
              disabled={isInComparison}
            >
              {isInComparison ? 'In Matrix' : 'Compare'}
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 h-9 text-sm border-slate-600 hover:bg-slate-700 hover:scale-105 transition-all duration-200"
              onClick={() => onShortlist(vendor)}
            >
              <Plus className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">Shortlist</span>
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 h-9 text-sm border-slate-600 hover:bg-slate-700 hover:scale-105 transition-all duration-200"
              onClick={() => onSend(vendor)}
            >
              <Send className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">Send</span>
            </Button>
            {!isInComparison && (
              <Button 
                size="sm" 
                className="h-9 text-sm bg-sky-600 hover:bg-sky-700 text-white"
                onClick={() => onAddToComparison(vendor)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorCard;