import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building, Target, Zap, ArrowRight } from 'lucide-react';

const Node = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`bg-slate-800/70 border border-slate-700 rounded-lg p-4 text-center ${className}`}
  >
    {children}
  </motion.div>
);

const Line = ({ delay = 0 }) => (
  <motion.div
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 0.5, delay }}
    className="h-px bg-slate-600 w-16 origin-left"
  />
);

export default function StackMapPreview() {
  const currentStack = ["CRM", "E-Commerce", "Analytics"];
  const strategicGoals = ["Sales Growth", "Customer Retention"];
  const nextTools = ["Marketing Automation", "Subscription Billing"];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white">
      {/* Column 1: Current & Goals */}
      <div className="space-y-8 flex flex-col items-center">
        <Node delay={0.1} className="w-48">
          <Briefcase className="w-6 h-6 mx-auto mb-2 text-sky-400" />
          <h3 className="font-bold">Current Stack</h3>
          {currentStack.map(item => <p key={item} className="text-sm text-slate-300">{item}</p>)}
        </Node>
        <Node delay={0.2} className="w-48">
          <Target className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
          <h3 className="font-bold">Strategic Goals</h3>
          {strategicGoals.map(item => <p key={item} className="text-sm text-slate-300">{item}</p>)}
        </Node>
      </div>
      
      <Line delay={0.3} />

      {/* Column 2: Central Node */}
      <Node delay={0.4} className="w-56 p-6">
        <Building className="w-8 h-8 mx-auto mb-2 text-purple-400" />
        <h2 className="text-xl font-bold">Maturity Stage</h2>
        <p className="text-lg gradient-text font-medium">Scaling</p>
        <p className="text-xs text-slate-400 mt-2">Expansion Phase</p>
      </Node>

      <Line delay={0.5} />

      {/* Column 3: Next Tools */}
      <div className="flex flex-col items-center">
        <Node delay={0.6} className="w-48">
          <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
          <h3 className="font-bold">Next-Step Tools</h3>
          {nextTools.map(item => <p key={item} className="text-sm text-slate-300">{item}</p>)}
        </Node>
      </div>
    </div>
  );
}