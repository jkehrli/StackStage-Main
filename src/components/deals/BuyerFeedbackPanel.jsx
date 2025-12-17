
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Download, HelpCircle } from 'lucide-react';

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
    ))}
  </div>
);

const FeedbackItem = ({ label, children }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-slate-700 last:border-b-0 gap-2">
    <span className="text-slate-400 text-sm flex-shrink-0">{label}</span>
    <div className="text-right text-sm text-white font-medium w-full sm:w-auto">{children}</div>
  </div>
);

const BuyerFeedbackPanel = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <Card className="glass-effect border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Buyer Feedback Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <h4 className="text-lg font-bold text-white mb-2">Thank You for Your Partnership</h4>
            <p className="text-slate-400 text-sm">This feedback helps improve the StackStage ecosystem for everyone.</p>
        </div>

        <div className="space-y-1">
            <FeedbackItem label="Outcome">
                <Badge className={feedback.outcome === 'Yes' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}>
                    {feedback.outcome === 'Yes' ? 'Solution Adopted' : 'Not Selected'}
                </Badge>
            </FeedbackItem>
            {feedback.reason && (
                <FeedbackItem label="Reason">{feedback.reason}</FeedbackItem>
            )}
            <FeedbackItem label="Champion Identified?">{feedback.championIdentified}</FeedbackItem>
            <FeedbackItem label="Procurement Timing Alignment">{feedback.procurementTiming}</FeedbackItem>
            <FeedbackItem label="Stack Alignment Fit">
                <StarRating rating={feedback.stackAlignment} />
            </FeedbackItem>
            <FeedbackItem label="Sales Experience Rating">
                 <div className="flex flex-col items-end">
                    <StarRating rating={feedback.salesExperience} />
                    {feedback.salesExperienceComment && (
                        <p className="text-xs text-slate-400 italic mt-2 text-right max-w-md">"{feedback.salesExperienceComment}"</p>
                    )}
                </div>
            </FeedbackItem>
            <FeedbackItem label="Would Recommend Vendor Again?">
                <span className={feedback.wouldRecommend === 'Yes' ? 'text-emerald-300' : feedback.wouldRecommend === 'Maybe' ? 'text-yellow-300' : 'text-red-300'}>
                    {feedback.wouldRecommend}
                </span>
            </FeedbackItem>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-700">
            <Button variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                <Download className="w-4 h-4 mr-2" />
                Download Feedback PDF
            </Button>
            <Button variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                <HelpCircle className="w-4 h-4 mr-2" />
                Request Clarification
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerFeedbackPanel;
