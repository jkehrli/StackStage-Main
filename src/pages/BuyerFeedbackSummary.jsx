
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { CheckCircle, XCircle, Clock, Star, TrendingUp, MessageSquare, Download, Share, Target, Users, Calendar, Building, Quote, Lightbulb, BarChart3 } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';

const mockFeedbackData = [
  {
    id: 1,
    dealOutcome: 'Won',
    category: 'Contact Center Automation',
    stackMaturity: 'Optimization',
    timeToDecision: '45 days',
    orgSize: '500–1,000 employees',
    competitorsConsidered: ['Competitor A', 'Competitor B'],
    feedbackScores: {
      productFit: 5,
      responsiveness: 4,
      transparency: 5,
      timelineAlignment: 4,
      implementationConfidence: 5,
      valueClarity: 4
    },
    buyerComments: [
      "We appreciated the clarity during evaluation and the team was very responsive to our technical questions.",
      "The product demonstration was excellent and showed clear ROI potential for our use case.",
      "Timeline expectations were well managed throughout the process."
    ],
    processAlignmentScore: 92,
    suggestedImprovements: [
      "Consider providing pricing framework earlier in discovery phase",
      "You're performing above average in responsiveness - maintain this strength",
      "Implementation timeline communication could be enhanced"
    ],
    tags: ['Strong Technical Fit', 'Good Communication', 'Clear Value Prop']
  },
  {
    id: 2,
    dealOutcome: 'Lost',
    category: 'Analytics Platform',
    stackMaturity: 'Setup',
    timeToDecision: '67 days',
    orgSize: '1,000–5,000 employees',
    competitorsConsidered: ['Competitor X', 'Competitor Y', 'Competitor Z'],
    feedbackScores: {
      productFit: 3,
      responsiveness: 4,
      transparency: 2,
      timelineAlignment: 3,
      implementationConfidence: 2,
      valueClarity: 3
    },
    buyerComments: [
      "The product was strong, but pricing came in too early and caused internal resistance.",
      "We had confusion around legal timelines and implementation complexity.",
      "Team was responsive but we needed more transparency on total cost of ownership."
    ],
    processAlignmentScore: 65,
    suggestedImprovements: [
      "Delay pricing discussions until value is clearly established",
      "Provide clearer legal timeline expectations upfront",
      "Consider offering TCO calculator or breakdown earlier in process"
    ],
    tags: ['Pricing Confusion', 'Legal Delay', 'Implementation Concerns']
  },
  {
    id: 3,
    dealOutcome: 'Deferred',
    category: 'Automation Platform',
    stackMaturity: 'Discovery',
    timeToDecision: '89 days',
    orgSize: '200–500 employees',
    competitorsConsidered: ['Competitor M'],
    feedbackScores: {
      productFit: 4,
      responsiveness: 3,
      transparency: 4,
      timelineAlignment: 2,
      implementationConfidence: 3,
      valueClarity: 4
    },
    buyerComments: [
      "Good product fit but the timeline didn't align with our budget cycle.",
      "Would consider again next quarter when budget planning opens.",
      "Appreciated the thorough technical evaluation process."
    ],
    processAlignmentScore: 74,
    suggestedImprovements: [
      "Inquire about budget cycles earlier in discovery",
      "Consider offering flexible implementation timelines",
      "You're performing well in product demonstrations"
    ],
    tags: ['Budget Timing', 'Good Technical Fit', 'Timeline Misalignment']
  }
];

const ScoreRadar = ({ scores }) => {
  const radarData = Object.entries(scores).map(([key, value]) => ({
    metric: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    score: value,
    fullMark: 5
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={radarData}>
        <PolarGrid stroke="#475569" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 5]} 
          tick={{ fill: '#94a3b8', fontSize: 10 }}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#0ea5e9"
          fill="#0ea5e9"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

const FeedbackCard = ({ feedback }) => {
  const getOutcomeIcon = (outcome) => {
    switch (outcome) {
      case 'Won': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'Lost': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'Deferred': return <Clock className="w-5 h-5 text-yellow-400" />;
      default: return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getOutcomeBadge = (outcome) => {
    const styles = {
      Won: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      Lost: 'bg-red-500/20 text-red-300 border-red-500/30',
      Deferred: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    };
    return styles[outcome] || 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  };

  return (
    <Card className="glass-effect border-slate-700 hover:border-slate-600 transition-all duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getOutcomeIcon(feedback.dealOutcome)}
            <div>
              <CardTitle className="text-white">{feedback.category}</CardTitle>
              <p className="text-sm text-slate-400 mt-1">
                {feedback.orgSize} • {feedback.timeToDecision} • {feedback.stackMaturity}
              </p>
            </div>
          </div>
          <Badge className={`border ${getOutcomeBadge(feedback.dealOutcome)}`}>
            {feedback.dealOutcome}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Feedback Scores Radar */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-400" />
            Feedback Signals
          </h4>
          <ScoreRadar scores={feedback.feedbackScores} />
        </div>

        {/* Process Alignment Score */}
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-medium text-white">Sales Process Alignment</h5>
            <span className={`text-2xl font-bold ${
              feedback.processAlignmentScore >= 80 ? 'text-emerald-400' :
              feedback.processAlignmentScore >= 60 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {feedback.processAlignmentScore}%
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                feedback.processAlignmentScore >= 80 ? 'bg-emerald-500' :
                feedback.processAlignmentScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${feedback.processAlignmentScore}%` }}
            />
          </div>
        </div>

        {/* Buyer Comments */}
        <div>
          <h5 className="font-medium text-white mb-3 flex items-center gap-2">
            <Quote className="w-5 h-5 text-purple-400" />
            Buyer Comments
          </h5>
          <div className="space-y-3">
            {feedback.buyerComments.map((comment, index) => (
              <div key={index} className="bg-slate-800/30 border-l-4 border-purple-500/50 p-3 rounded-r-lg">
                <p className="text-slate-200 text-sm italic">"{comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Improvements */}
        <div>
          <h5 className="font-medium text-white mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            Suggested Improvements
          </h5>
          <div className="space-y-2">
            {feedback.suggestedImprovements.map((improvement, index) => (
              <div key={index} className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                <p className="text-slate-300">{improvement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h5 className="font-medium text-white mb-3">Process Tags</h5>
          <div className="flex flex-wrap gap-2">
            {feedback.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Competitors */}
        {feedback.competitorsConsidered.length > 0 && (
          <div>
            <h5 className="font-medium text-white mb-2">Other Vendors Considered</h5>
            <p className="text-sm text-slate-400">
              {feedback.competitorsConsidered.join(', ')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const BenchmarkModal = ({ onClose }) => {
  const benchmarkData = [
    { metric: 'Product Fit', yourScore: 4.2, industryAvg: 3.8, percentile: 75 },
    { metric: 'Responsiveness', yourScore: 4.5, industryAvg: 3.9, percentile: 85 },
    { metric: 'Transparency', yourScore: 3.8, industryAvg: 4.1, percentile: 45 },
    { metric: 'Timeline Alignment', yourScore: 3.7, industryAvg: 3.6, percentile: 60 },
    { metric: 'Implementation Confidence', yourScore: 4.0, industryAvg: 3.7, percentile: 70 },
    { metric: 'Value Clarity', yourScore: 4.3, industryAvg: 3.9, percentile: 78 }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="glass-effect border-slate-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle className="text-white">Performance Benchmarks</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
            <XCircle className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <h4 className="text-lg font-bold text-white mb-2">Q4 2024 Performance Summary</h4>
            <p className="text-slate-400 text-sm">Based on feedback from {mockFeedbackData.length} completed deals</p>
          </div>

          <div className="space-y-4">
            {benchmarkData.map((item, index) => (
              <div key={index} className="bg-slate-800/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">{item.metric}</span>
                  <Badge className={`${
                    item.percentile >= 75 ? 'bg-emerald-500/20 text-emerald-300' :
                    item.percentile >= 50 ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {item.percentile}th percentile
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Your Average</p>
                    <p className="text-xl font-bold text-white">{item.yourScore.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Industry Average</p>
                    <p className="text-xl font-bold text-slate-300">{item.industryAvg.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default function BuyerFeedbackSummary() {
  const [feedbackData] = useState(mockFeedbackData);
  const [outcomeFilter, setOutcomeFilter] = useState('All');
  const [showBenchmarkModal, setShowBenchmarkModal] = useState(false);

  const filteredFeedback = outcomeFilter === 'All' 
    ? feedbackData 
    : feedbackData.filter(f => f.dealOutcome === outcomeFilter);

  const avgScores = feedbackData.reduce((acc, feedback) => {
    Object.entries(feedback.feedbackScores).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value;
    });
    return acc;
  }, {});

  Object.keys(avgScores).forEach(key => {
    avgScores[key] = (avgScores[key] / feedbackData.length).toFixed(1);
  });

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white">Buyer Feedback Summary</h1>
            <p className="text-slate-300 mt-2 max-w-2xl">
              Structured insights from completed buyer journeys to help you refine your sales approach and improve future outcomes.
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              className="gradient-button"
              onClick={() => setShowBenchmarkModal(true)}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              View Benchmarks
            </Button>
            <Button className="bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-effect border-slate-700">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white">{feedbackData.filter(f => f.dealOutcome === 'Won').length}</p>
              <p className="text-sm text-slate-400">Deals Won</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-slate-700">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-8 h-8 text-sky-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white">{avgScores.productFit}</p>
              <p className="text-sm text-slate-400">Avg Product Fit</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-slate-700">
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white">{avgScores.transparency}</p>
              <p className="text-sm text-slate-400">Avg Transparency</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-slate-700">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white">{Math.round(feedbackData.reduce((sum, f) => sum + f.processAlignmentScore, 0) / feedbackData.length)}%</p>
              <p className="text-sm text-slate-400">Avg Process Alignment</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <Card className="glass-effect border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <span className="text-white font-medium">Filter by outcome:</span>
              <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
                <SelectTrigger className="w-48 bg-slate-800 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="All">All Outcomes</SelectItem>
                  <SelectItem value="Won">Won</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
                  <SelectItem value="Deferred">Deferred</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Cards */}
        <div className="grid gap-8">
          {filteredFeedback.map(feedback => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>

        {showBenchmarkModal && (
          <BenchmarkModal onClose={() => setShowBenchmarkModal(false)} />
        )}
      </div>
    </TooltipProvider>
  );
}
