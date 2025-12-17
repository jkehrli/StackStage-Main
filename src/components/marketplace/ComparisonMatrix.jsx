
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Star, 
  DollarSign, 
  Calendar, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Crown,
  Trash2,
  Plus,
  ArrowUpDown
} from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const ComparisonMatrix = ({ vendors, onClose, onAddVendor, onRemoveVendor, onReorder }) => {
  const [highlightBestFit, setHighlightBestFit] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  const getMaturityColor = (level) => {
    const colors = {
      'Emerging': 'bg-blue-500/20 text-blue-300',
      'Scaling': 'bg-purple-500/20 text-purple-300',
      'Leading': 'bg-emerald-500/20 text-emerald-300'
    };
    return colors[level] || 'bg-slate-500/20 text-slate-300';
  };

  const getRiskColor = (risk) => {
    const colors = {
      'Low': 'text-emerald-400',
      'Medium': 'text-yellow-400',
      'High': 'text-red-400'
    };
    return colors[risk] || 'text-slate-400';
  };

  const getBestInCategory = (category) => {
    if (!highlightBestFit || vendors.length === 0) return null;
    
    switch (category) {
      case 'stackFit':
        return vendors.reduce((best, vendor) => 
          vendor.stackFit > best.stackFit ? vendor : best
        );
      case 'peerScore':
        return vendors.reduce((best, vendor) => 
          vendor.peerScore > best.peerScore ? vendor : best
        );
      case 'maturity':
        const maturityOrder = { 'Leading': 3, 'Scaling': 2, 'Emerging': 1 };
        return vendors.reduce((best, vendor) => 
          maturityOrder[vendor.maturityAlignment] > maturityOrder[best.maturityAlignment] ? vendor : best
        );
      default:
        return null;
    }
  };

  const isBestInCategory = (vendor, category) => {
    const best = getBestInCategory(category);
    return highlightBestFit && best && best.id === vendor.id;
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-effect border-slate-700 rounded-xl w-full max-w-7xl max-h-[95vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-700">
          <div>
            <CardTitle className="text-white text-2xl">Vendor Comparison Matrix</CardTitle>
            <p className="text-slate-400 mt-1">Compare up to 4 vendors side-by-side</p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-slate-300">
              <input
                type="checkbox"
                checked={highlightBestFit}
                onChange={(e) => setHighlightBestFit(e.target.checked)}
                className="rounded bg-slate-800 border-slate-600"
              />
              Highlight Best Fit
            </label>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5 text-slate-400" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-auto max-h-[calc(95vh-120px)]">
          {vendors.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Vendors Selected</h3>
              <p className="text-slate-400">Add vendors from the marketplace to start comparing</p>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <Droppable droppableId="vendors" direction="horizontal">
                    {(provided) => (
                      <thead ref={provided.innerRef} {...provided.droppableProps}>
                        <tr>
                          <th className="text-left p-4 text-slate-400 font-medium w-48">Criteria</th>
                          {vendors.map((vendor, index) => (
                            <Draggable key={vendor.id} draggableId={vendor.id.toString()} index={index}>
                              {(provided, snapshot) => (
                                <th
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`p-4 text-center relative min-w-[200px] ${
                                    snapshot.isDragging ? 'bg-slate-800/50 rounded-lg' : ''
                                  }`}
                                >
                                  <Card className="glass-effect border-slate-700">
                                    <CardContent className="p-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <img 
                                          src={vendor.logoUrl} 
                                          alt={vendor.name}
                                          className="w-8 h-8 rounded-lg bg-white p-1"
                                        />
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="w-6 h-6 text-slate-400 hover:text-red-400"
                                          onClick={() => onRemoveVendor(vendor.id)}
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                      <h4 className="font-semibold text-white text-sm">{vendor.name}</h4>
                                      <p className="text-xs text-slate-400">{vendor.category}</p>
                                      <div className="flex items-center gap-1 mt-2">
                                        <ArrowUpDown className="w-3 h-3 text-slate-500" />
                                        <span className="text-xs text-slate-500">Drag to reorder</span>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </th>
                              )}
                            </Draggable>
                          ))}
                          {vendors.length < 4 && (
                            <th className="p-4 text-center min-w-[200px]">
                              <Button
                                variant="outline"
                                className="w-full h-24 border-dashed border-slate-600 text-slate-400 hover:text-white hover:border-slate-500"
                                onClick={onAddVendor}
                              >
                                <Plus className="w-6 h-6 mr-2" />
                                Add Vendor
                              </Button>
                            </th>
                          )}
                        </tr>
                        {provided.placeholder}
                      </thead>
                    )}
                  </Droppable>

                  <tbody>
                    {/* StackStage Fit Score */}
                    <tr className="border-t border-slate-700">
                      <td className="p-4 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-sky-400" />
                          StackStage Fit
                        </div>
                      </td>
                      {vendors.map(vendor => (
                        <td key={vendor.id} className={`p-4 text-center ${
                          isBestInCategory(vendor, 'stackFit') ? 'bg-emerald-500/10 border border-emerald-500/30 rounded-lg' : ''
                        }`}>
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-2xl font-bold text-white">{vendor.stackFit}%</span>
                            {isBestInCategory(vendor, 'stackFit') && <Crown className="w-4 h-4 text-yellow-400" />}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Peer Score */}
                    <tr className="border-t border-slate-700">
                      <td className="p-4 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          Peer Score
                        </div>
                      </td>
                      {vendors.map(vendor => (
                        <td key={vendor.id} className={`p-4 text-center ${
                          isBestInCategory(vendor, 'peerScore') ? 'bg-emerald-500/10 border border-emerald-500/30 rounded-lg' : ''
                        }`}>
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-bold text-white">{vendor.peerScore}</span>
                            {isBestInCategory(vendor, 'peerScore') && <Crown className="w-4 h-4 text-yellow-400 ml-1" />}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Categories & Tags */}
                    <tr className="border-t border-slate-700">
                      <td className="p-4 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-purple-400" />
                          Categories
                        </div>
                      </td>
                      {vendors.map(vendor => (
                        <td key={vendor.id} className="p-4">
                          <div className="space-y-1">
                            <Badge className="bg-slate-700 text-slate-300 text-xs">
                              {vendor.category}
                            </Badge>
                            <div className="flex flex-wrap gap-1">
                              {vendor.tags?.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs border-slate-600 text-slate-400">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Stack Maturity Alignment */}
                    <tr className="border-t border-slate-700">
                      <td className="p-4 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-emerald-400" />
                          Maturity Alignment
                        </div>
                      </td>
                      {vendors.map(vendor => (
                        <td key={vendor.id} className={`p-4 text-center ${
                          isBestInCategory(vendor, 'maturity') ? 'bg-emerald-500/10 border border-emerald-500/30 rounded-lg' : ''
                        }`}>
                          <div className="flex items-center justify-center gap-1">
                            <Badge className={getMaturityColor(vendor.maturityAlignment)}>
                              {vendor.maturityAlignment}
                            </Badge>
                            {isBestInCategory(vendor, 'maturity') && <Crown className="w-4 h-4 text-yellow-400 ml-1" />}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Price Range */}
                    <tr className="border-t border-slate-700">
                      <td className="p-4 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-400" />
                          Price Range
                        </div>
                      </td>
                      {vendors.map(vendor => (
                        <td key={vendor.id} className="p-4 text-center">
                          <span className="text-white font-medium">{vendor.priceRange}</span>
                        </td>
                      ))}
                    </tr>

                    {/* Renewal Risk */}
                    <tr className="border-t border-slate-700">
                      <td className="p-4 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-orange-400" />
                          Renewal Risk
                        </div>
                      </td>
                      {vendors.map(vendor => (
                        <td key={vendor.id} className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span className={`font-medium ${getRiskColor(vendor.renewalRisk)}`}>
                              {vendor.renewalRisk}
                            </span>
                            {vendor.renewalRisk === 'High' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                            {vendor.renewalRisk === 'Low' && <CheckCircle className="w-4 h-4 text-green-400" />}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Standout Features */}
                    <tr className="border-t border-slate-700">
                      <td className="p-4 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-purple-400" />
                          Key Features
                        </div>
                      </td>
                      {vendors.map(vendor => (
                        <td key={vendor.id} className="p-4">
                          <div className="space-y-1">
                            {vendor.standoutFeatures?.map(feature => (
                              <Badge key={feature} className="bg-purple-500/20 text-purple-300 text-xs block">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </DragDropContext>
          )}

          {vendors.length > 0 && (
            <div className="mt-8 flex justify-center gap-4">
              <Button 
                className="gradient-button text-white px-6 py-3 font-semibold"
                onClick={() => alert('Export comparison report feature would be implemented here')}
              >
                Export Comparison
              </Button>
              <Button 
                variant="outline"
                className="border-slate-600 bg-slate-800 text-white hover:bg-slate-700 hover:text-white px-6 py-3 font-semibold"
                onClick={() => alert('Share comparison with team feature would be implemented here')}
              >
                Share with Team
              </Button>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default ComparisonMatrix;
