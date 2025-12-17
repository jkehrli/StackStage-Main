import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Lightbulb, Users, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <ClipboardList className="w-10 h-10 text-sky-400" />,
    title: "Assess Your Tech Stack",
    description: "Connect your environment or upload files to analyze your current tools and business maturity.",
  },
  {
    icon: <Lightbulb className="w-10 h-10 text-emerald-400" />,
    title: "Get Solution Recommendations",
    description: "Receive personalized product suggestions aligned with your company's needs and growth stage.",
  },
  {
    icon: <Users className="w-10 h-10 text-purple-400" />,
    title: "Collaborate and Implement",
    description: "Connect with peers to validate choices and use expert guidance for confident implementation.",
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">StackStage</span> Works
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium">
            A clear path from assessment to implementation, all in one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="glass-effect border-slate-700 p-8 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">
                {step.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;