import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CreditCard, Code, Users } from 'lucide-react';

const personas = [
  { icon: <Briefcase className="w-6 h-6" />, name: "IT Directors" },
  { icon: <CreditCard className="w-6 h-6" />, name: "Finance Leaders" },
  { icon: <Code className="w-6 h-6" />, name: "RevOps" },
  { icon: <Users className="w-6 h-6" />, name: "Procurement Teams" },
];

const BuyerPersonas = () => {
  return (
    <section className="py-12 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-x-8 gap-y-4 text-center"
        >
          <h3 className="text-lg font-semibold text-slate-300 flex-shrink-0">
            Built for:
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {personas.map((persona, index) => (
              <div key={index} className="flex items-center gap-2 text-slate-300 font-medium">
                {persona.icon}
                <span>{persona.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BuyerPersonas;