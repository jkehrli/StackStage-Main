import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  TrendingUp,
  Users,
  Shield,
  Clock,
  Key,
  Crosshair
} from 'lucide-react';

const HeroSection = () => (
  <section className="relative overflow-hidden py-24 sm:py-32">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.1),transparent_50%)]"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
          Where high-intent SaaS buyers align with solutions
          <br />
          <span className="gradient-text">at the exact right moment.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          StackStage solves the timing gap in sales by connecting you with buyers only when they have self-qualified and are ready for procurement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to={createPageUrl("VendorDashboard")}>
            <Button className="gradient-button text-white px-8 py-3 text-lg font-semibold rounded-lg hover:scale-105 transition-transform duration-200">
              <Key className="w-5 h-5 mr-2" />
              Enter Vendor Hub
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button className="bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 px-8 py-3 text-lg font-semibold rounded-lg transition-all">
              Learn More
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: "Buyer Self-Plans",
      description: "Buyers map their stack, identify gaps, and define needs privately within StackStage, building readiness scores without vendor influence."
    },
    {
      icon: <Crosshair className="w-8 h-8 text-sky-400" />,
      title: "Procurement Readiness",
      description: "Once a buyer reaches 99% readiness, has a confirmed timeline, and a defined budget, the engagement window opens for matched vendors."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
      title: "High-Intent Alignment",
      description: "You receive an alert to engage with a fully-qualified buyer who has a clear need for your solution, right now."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            The Buyer-First Journey to <span className="gradient-text">Seller Alignment</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We don't create intent. We capture it at the most critical moment.
          </p>
        </div>
        <div className="relative">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="w-full md:w-1/3 text-center clean-icon-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/50 border border-slate-700 relative clean-icon-container">
                  <span className="clean-icon-wrapper">
                    {step.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-slate-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PermissionsSection = () => {
  const canDo = [
    "Access high-intent, procurement-ready deals",
    "View anonymized buyer stack plans",
    "Get matched based on objective product fit",
    "Receive real-time alerts when a match occurs"
  ];
  const cantDo = [
    "Cold outreach or unsolicited contact",
    "Access buyer data without consent",
    "Influence a buyer's private planning phase",
    "Bypass the buyer's established timeline"
  ];

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">A Permission-Based Marketplace</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our platform operates on buyer trust. Your access is aligned with their readiness.
            </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-effect border-emerald-500/30">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
                <h3 className="text-2xl font-bold text-white">What You Can Do</h3>
              </div>
              <ul className="space-y-3">
                {canDo.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="glass-effect border-red-500/30">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="w-8 h-8 text-red-400" />
                <h3 className="text-2xl font-bold text-white">What You Can't Do</h3>
              </div>
              <ul className="space-y-3">
                {cantDo.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                     <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const ImpactSection = () => {
    const stats = [
        { icon: <TrendingUp className="w-10 h-10 text-emerald-400" />, value: "95%+", label: "Close Rate on Matched Deals" },
        { icon: <Clock className="w-10 h-10 text-sky-400" />, value: "3x Faster", label: "Sales Cycles" },
        { icon: <Shield className="w-10 h-10 text-purple-400" />, value: "100%", label: "Buyer-Qualified Leads" },
    ];
  return (
    <section className="py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why It Works for SaaS Sellers</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Timing isn't just a factor — it's the foundation of every successful deal.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
                 <motion.div
                    key={index}
                    className="glass-effect border-slate-700 p-8 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                >
                    <div className="mb-4 inline-block">{stat.icon}</div>
                    <p className="text-5xl font-bold gradient-text mb-2">{stat.value}</p>
                    <p className="text-slate-300 font-medium">{stat.label}</p>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

const ClosingCTASection = () => (
  <section className="py-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
        Stop Guessing. <span className="gradient-text">Start Aligning.</span>
      </h2>
      <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
        Access a pipeline of high-intent buyers who are ready to talk. Join the new standard in B2B sales.
      </p>
      <Link to={createPageUrl("VendorDashboard")}>
        <Button className="gradient-button text-white px-8 py-3 text-lg font-semibold rounded-lg hover:scale-105 transition-transform duration-200">
          Enter Vendor Hub
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </div>
  </section>
);


export default function VendorLanding() {
  return (
    <div className="bg-slate-900">
      <style>
        {`
          /* Nuclear option - remove all possible decorations */
          .clean-icon-section,
          .clean-icon-section *,
          .clean-icon-container,
          .clean-icon-container *,
          .clean-icon-wrapper,
          .clean-icon-wrapper * {
            text-decoration: none !important;
            text-decoration-line: none !important;
            text-decoration-style: none !important;
            text-decoration-color: transparent !important;
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
            background-image: none !important;
            text-underline-offset: 0 !important;
            text-decoration-thickness: 0 !important;
            -webkit-text-decoration: none !important;
            -moz-text-decoration: none !important;
          }

          .clean-icon-section::before,
          .clean-icon-section::after,
          .clean-icon-container::before,
          .clean-icon-container::after,
          .clean-icon-wrapper::before,
          .clean-icon-wrapper::after {
            display: none !important;
            content: none !important;
          }

          /* Specifically target SVG elements */
          .clean-icon-section svg,
          .clean-icon-container svg,
          .clean-icon-wrapper svg {
            text-decoration: none !important;
            border: none !important;
            outline: none !important;
            background: none !important;
          }

          /* Remove any link styling that might affect icons */
          .clean-icon-section a,
          .clean-icon-container a,
          .clean-icon-wrapper a {
            text-decoration: none !important;
          }
        `}
      </style>
      <HeroSection />
      <HowItWorksSection />
      <PermissionsSection />
      <ImpactSection />
      <ClosingCTASection />
    </div>
  );
}