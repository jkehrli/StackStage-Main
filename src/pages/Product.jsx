import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Map,
  GitCompare,
  Users,
  MessageSquare,
  Brain,
  Target,
  Shield,
  TrendingUp } from
"lucide-react";

export default function Product() {
  const features = [
  {
    icon: <Map className="w-8 h-8 text-sky-400" />,
    title: "Stack Map",
    description: "Visualize your entire technology ecosystem with interactive mapping that reveals dependencies, redundancies, and optimization opportunities.",
    benefits: [
    "Real-time dependency tracking",
    "Cost optimization insights",
    "Security vulnerability mapping",
    "Integration complexity analysis"]

  },
  {
    icon: <GitCompare className="w-8 h-8 text-emerald-400" />,
    title: "Product vs Platform Comparison",
    description: "Make informed decisions with side-by-side analysis of solutions, featuring real user data and performance metrics.",
    benefits: [
    "TCO calculations",
    "Feature comparison matrix",
    "Performance benchmarking",
    "User satisfaction scores"]

  },
  {
    icon: <Users className="w-8 h-8 text-purple-400" />,
    title: "Stakeholder Mapping (StackStage Crew)",
    description: "Build consensus across teams with collaborative decision-making tools that align IT, finance, and operations.",
    benefits: [
    "Role-based access controls",
    "Approval workflow automation",
    "Impact assessment tools",
    "Change management support"]

  },
  {
    icon: <MessageSquare className="w-8 h-8 text-orange-400" />,
    title: "StackExchange (Peer Validation)",
    description: "Connect with peers facing similar challenges. Get real-world insights from verified industry professionals.",
    benefits: [
    "Verified peer network",
    "Anonymous feedback options",
    "Industry-specific groups",
    "Expert consultation access"]

  },
  {
    icon: <Brain className="w-8 h-8 text-cyan-400" />,
    title: "AI Maturity Signals",
    description: "Leverage machine learning to identify patterns in your stack maturity and receive predictive recommendations.",
    benefits: [
    "Maturity scoring algorithms",
    "Predictive analytics",
    "Automated recommendations",
    "Trend analysis reporting"]

  },
  {
    icon: <Target className="w-8 h-8 text-pink-400" />,
    title: "Strategic Planning",
    description: "Align your technology roadmap with business objectives using data-driven planning tools.",
    benefits: [
    "ROI forecasting",
    "Risk assessment modeling",
    "Timeline optimization",
    "Budget allocation guidance"]

  }];


  const stats = [
  { number: "85%", label: "Reduction in evaluation time" },
  { number: "$2.3M", label: "Average cost savings identified" },
  { number: "40%", label: "Faster decision-making" },
  { number: "92%", label: "User satisfaction rate" }];


  return (
    <div className="bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(14,165,233,0.1),transparent_70%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The Complete Platform for
              <br />
              <span className="gradient-text">Software Decision-Making</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Everything you need to evaluate, purchase, and manage your technology stack with confidence
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {stats.map((stat, index) =>
              <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-300 text-sm">
                    {stat.label}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for <span className="gradient-text">Modern IT Teams</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive tools designed to streamline your software evaluation and procurement process
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) =>
            <Card key={index} className="glass-effect border-slate-700 hover:border-slate-600 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="p-3 bg-slate-800/50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-slate-300 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, i) =>
                      <li key={i} className="flex items-center text-slate-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-sky-400 rounded-full mr-3"></div>
                            {benefit}
                          </li>
                      )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Seamless <span className="gradient-text">Integration</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Connect with your existing tools and workflows
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-effect border-slate-700 text-center">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Enterprise Security</h3>
                <p className="text-slate-300">
                  SOC 2 Type II compliant with enterprise-grade security controls
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-slate-700 text-center">
              <CardContent className="p-8">
                <TrendingUp className="w-12 h-12 text-sky-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">API-First Architecture</h3>
                <p className="text-slate-300">
                  Robust APIs for seamless integration with your existing systems
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-slate-700 text-center">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Single Sign-On</h3>
                <p className="text-slate-300">
                  SSO integration with major identity providers for easy access
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="gradient-text">Explore the Platform?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            See how StackStage can transform your software decision-making process
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Onboarding")}>
              <Button className="gradient-button text-white px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform duration-200">
                Explore the Platform
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Link to={createPageUrl("HowItWorks")}>
              <Button className="bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>);

}