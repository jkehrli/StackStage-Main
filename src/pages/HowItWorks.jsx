import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Upload,
  Brain,
  Users,
  CheckCircle,
  FileSpreadsheet,
  Lightbulb,
  Target } from
"lucide-react";

export default function HowItWorks() {
  const steps = [
  {
    number: "01",
    icon: <Upload className="w-8 h-8 text-sky-400" />,
    title: "Connect Your Stack",
    description: "Upload your existing software inventory or connect directly to your systems. Our intelligent scanner identifies all your tools, licenses, and dependencies.",
    features: [
    "Automated discovery tools",
    "Spreadsheet import support",
    "API integrations",
    "Manual entry options"],

    visual: <FileSpreadsheet className="w-32 h-32 text-sky-400/30" />
  },
  {
    number: "02",
    icon: <Brain className="w-8 h-8 text-emerald-400" />,
    title: "Get AI-Powered Insights",
    description: "Our advanced algorithms analyze your stack maturity, identify optimization opportunities, and provide personalized recommendations based on industry best practices.",
    features: [
    "Maturity scoring",
    "Cost optimization analysis",
    "Security gap identification",
    "Performance benchmarking"],

    visual: <Lightbulb className="w-32 h-32 text-emerald-400/30" />
  },
  {
    number: "03",
    icon: <Users className="w-8 h-8 text-purple-400" />,
    title: "Build Your Crew & Take Action",
    description: "Invite stakeholders to collaborate on decisions, validate recommendations with peers, and implement changes with confidence using our guided workflows.",
    features: [
    "Stakeholder collaboration",
    "Peer validation network",
    "Implementation roadmaps",
    "Progress tracking"],

    visual: <Target className="w-32 h-32 text-purple-400/30" />
  }];


  const benefits = [
  {
    icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
    title: "Reduce Evaluation Time",
    description: "Cut software evaluation cycles from months to weeks with automated analysis"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
    title: "Minimize Risk",
    description: "Make confident decisions backed by data, peer validation, and expert insights"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
    title: "Optimize Costs",
    description: "Identify redundancies, negotiate better deals, and maximize ROI on software investments"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
    title: "Align Teams",
    description: "Build consensus across IT, finance, and operations with transparent processes"
  }];


  return (
    <div className="bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(14,165,233,0.1),transparent_70%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              How <span className="gradient-text">StackStage</span> Works
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your software decision-making process in three simple steps
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {steps.map((step, index) =>
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                    <div className="p-3 bg-slate-800/50 rounded-xl">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                    {step.title}
                  </h2>
                  
                  <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {step.features.map((feature, i) =>
                  <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                        <span className="text-slate-300">{feature}</span>
                      </div>
                  )}
                  </div>
                </div>
                
                <div className="flex-1 flex justify-center">
                  <Card className="glass-effect border-slate-700 p-12 hover:border-slate-600 transition-all duration-300">
                    <CardContent className="flex justify-center items-center">
                      {step.visual}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Companies Choose <span className="gradient-text">StackStage</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Deliver measurable results for your organization
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) =>
            <Card key={index} className="glass-effect border-slate-700 hover:border-slate-600 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-slate-800/50 rounded-lg">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Begin your journey to smarter software decisions with a free stack audit
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Onboarding")}>
              <Button className="gradient-button text-white px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform duration-200">
                Start Free Stack Audit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Link to={createPageUrl("Product")}>
              <Button className="bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>);

}