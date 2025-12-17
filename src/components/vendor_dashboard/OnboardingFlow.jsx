import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Eye, Bell } from 'lucide-react';

const onboardingSteps = [
  {
    title: "Welcome to StackStage",
    message: "StackStage invites vendors only when buyers are truly ready to engage. No more guesswork, just perfect timing.",
    cta: "Start Your Deal Watchlist",
    icon: <span className="text-2xl">👋</span>,
  },
  {
    title: "Track Your Best-Fit Buyers",
    message: "See anonymized buyer profiles, stack plans, and readiness scores to understand the market without pressure.",
    cta: "Browse Deal Room",
    icon: <Eye className="w-6 h-6 text-sky-400" />,
  },
  {
    title: "Get Notified When It’s Time to Sell",
    message: "We’ll alert you the moment a buyer is ready. Until then, explore the landscape quietly and confidently.",
    cta: "Enable Readiness Alerts",
    icon: <Bell className="w-6 h-6 text-emerald-400" />,
  },
];

const OnboardingFlow = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(s => s + 1);
    } else {
      onComplete();
    }
  };

  const currentStepData = onboardingSteps[step];

  return (
    <div className="flex items-center justify-center w-full min-h-[320px] mb-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Card className="glass-effect border-slate-700 w-full text-center max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-600">
                {currentStepData.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{currentStepData.title}</h3>
              <p className="text-slate-300 max-w-2xl mx-auto mb-8">{currentStepData.message}</p>
              <Button onClick={handleNext} className="gradient-button font-semibold px-6 py-3">
                {currentStepData.cta} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingFlow;