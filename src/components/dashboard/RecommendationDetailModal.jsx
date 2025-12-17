import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Target, Zap, Shield, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RecommendationDetailModal = ({ recommendation, onClose }) => {
  if (!recommendation) return null;

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-emerald-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-effect border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={recommendation.logo} alt={recommendation.toolName} className="w-12 h-12 rounded-lg bg-white p-2" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{recommendation.toolName}</h2>
                  <p className="text-slate-400">Detailed Evaluation</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-6 h-6 text-slate-400" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-4 bg-slate-800/50 rounded-2xl p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-1">{recommendation.matchScore}%</div>
                  <p className="text-slate-400">Overall Match</p>
                </div>
                <div className="w-px h-16 bg-slate-700"></div>
                <div className="text-left">
                  <h3 className="text-white font-semibold mb-2">Match Breakdown:</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Company Size:</span>
                      <span className={getScoreColor(recommendation.detailedMatch.companySizeMatch)}>{recommendation.detailedMatch.companySizeMatch}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Industry Fit:</span>
                      <span className={getScoreColor(recommendation.detailedMatch.industryRelevance)}>{recommendation.detailedMatch.industryRelevance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Stack Compatibility:</span>
                      <span className={getScoreColor(recommendation.detailedMatch.stackCompatibility)}>{recommendation.detailedMatch.stackCompatibility}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Gap Alignment:</span>
                      <span className={getScoreColor(recommendation.detailedMatch.gapAlignment)}>{recommendation.detailedMatch.gapAlignment}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-400" /> Why It's A Fit</CardTitle>
              </CardHeader>
              <CardContent>
                 <ul className="space-y-2 text-slate-300">
                    {recommendation.whyMatch.map((reason, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-sky-400 mt-1">✓</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
              </CardContent>
            </Card>

             <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2"><TrendingUp className="w-5 h-5 text-purple-400" /> Alternative Options</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                  {recommendation.alternatives.map(alt => (
                    <div key={alt.name} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg">
                      <img src={alt.logo} alt={alt.name} className="w-10 h-10 rounded-lg bg-white p-2" />
                      <div className="flex-1">
                        <p className="text-white font-semibold">{alt.name}</p>
                        <p className="text-sm text-slate-400">{alt.score}% match</p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RecommendationDetailModal;