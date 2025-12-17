import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Star,
  X,
  UserCheck,
  Eye
} from "lucide-react";
import HowItWorksSection from "../components/homepage/HowItWorksSection";
import BuyerPersonas from "../components/homepage/BuyerPersonas";
import { User } from "@/api/entities";

const BuyerPrivacyModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-slate-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Buyer Privacy Policy</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-6 text-slate-300">
          <p className="text-lg leading-relaxed">
            StackStage is committed to protecting buyer privacy while facilitating meaningful connections with vendors. Our tiered privacy system gives buyers full control over their identity and engagement level.
          </p>

          {/* Fully Private Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-400">Fully Private</h3>
            </div>
            <p className="text-slate-300 ml-9">
              Buyers in this stage are conducting initial, confidential research. Their identity, company name, and specific requirements are completely anonymous. Vendors can see high-level, anonymized data like industry and company size, but cannot initiate contact.
            </p>
            <ul className="space-y-2 ml-9 text-slate-300">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Identity is 100% protected.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Vendors cannot contact you.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>You control when to reveal your identity.</span>
              </li>
            </ul>
          </div>

          {/* Shared Profile Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Eye className="w-4 h-4 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-400">Shared Profile</h3>
            </div>
            <p className="text-slate-300 ml-9">
              When a buyer is ready for deeper evaluation, they can share an anonymized profile. This profile includes more detailed information about their tech stack, project goals, and budget range, but still protects their identity. Vendors can view this profile and request a connection.
            </p>
            <ul className="space-y-2 ml-9 text-slate-300">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Share detailed project needs without revealing identity.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Vendors can request to connect based on fit.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>You review and approve all connection requests.</span>
              </li>
            </ul>
          </div>

          {/* Vendor Engaged Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-red-400">Vendor Engaged</h3>
            </div>
            <p className="text-slate-300 ml-9">
              Once a buyer accepts a connection request, their profile becomes fully visible to that specific vendor. This opens a secure, private Deal Room where both parties can communicate, share documents, and collaborate. Your profile remains private to all other vendors.
            </p>
            <ul className="space-y-2 ml-9 text-slate-300">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Full profile visibility to selected vendors only.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Access to a private Deal Room for direct communication.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Share documents securely.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 text-center">
            <Button onClick={onClose} className="gradient-button text-white px-8 py-3">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Landing() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleGetStarted = async () => {
    try {
      // This function can still be used for login flows if needed elsewhere,
      // but the main CTA buttons will now link directly to Onboarding.
      // Check if user is already logged in
      const user = await User.me();
      if (user) {
        // User is logged in, redirect to dashboard
        window.location.href = createPageUrl("Dashboard");
      }
    } catch (error) {
      // User is not logged in, redirect to login which will then redirect to dashboard
      await User.loginWithRedirect(window.location.origin + createPageUrl("Onboarding"));
    }
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-sky-400" />,
      title: "Smart Stack Analysis",
      description: "AI-powered insights into your tech stack maturity and optimization opportunities"
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      title: "Risk Assessment",
      description: "Identify security gaps, compliance issues, and technical debt before they become problems"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Stakeholder Alignment",
      description: "Build consensus across IT, finance, and ops with transparent decision-making tools"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-orange-400" />,
      title: "ROI Optimization",
      description: "Maximize your software investments with data-driven recommendations and benchmarking"
    }
  ];

  const testimonials = [
    {
      quote: "StackStage helped us identify $2M in redundant software spend and streamline our procurement process.",
      author: "Sarah Chen",
      role: "CTO",
      company: "Fortune 500"
    },
    {
      quote: "The stakeholder mapping feature was game-changing for our digital transformation project.",
      author: "Michael Rodriguez",
      role: "IT Director",
      company: "Mid-Market SaaS"
    },
    {
      quote: "We cut our software evaluation time by 60% using StackStage's peer validation network.",
      author: "Emily Watson",
      role: "Procurement Manager",
      company: "Enterprise Retail"
    }
  ];

  return (
    <div className="bg-slate-900 text-white">
      {/* Floating Privacy Policy Button */}
      <Button
        onClick={() => setShowPrivacyModal(true)}
        className="fixed bottom-6 right-6 z-40 bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-600 backdrop-blur-sm"
        size="sm"
      >
        <Shield className="w-4 h-4 mr-2" />
        Buyer Privacy Policy
      </Button>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.1),transparent_70%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Logo integration in hero */}
            <div className="flex justify-center mb-8">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ab8a95562_ChatGPTImageJul4202506_13_46PM.png" alt="StackStage Logo" className="w-60 h-60 animate-float" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              The Right Stage,
              <br />
              <span className="gradient-text">At the Right Time</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              StackStage gives you clarity and control in software buying.
              Make confident decisions with AI-powered insights and peer validation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={createPageUrl("Onboarding")}>
                <Button
                  className="gradient-button text-white px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform duration-200 animate-glow"
                >
                  Start Your Stack Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <a href="#how-it-works-section">
                <Button className="bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all">
                  See How It Works
                </Button>
              </a>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-sky-500/20 rounded-full animate-float"></div>
          <div className="absolute bottom-40 right-10 w-16 h-16 bg-cyan-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      <BuyerPersonas />

      {/* Features Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Leading Companies Choose <span className="gradient-text">StackStage</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium">
              Transform how your organization evaluates, purchases, and manages software
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-effect border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p> {/* Fixed: Added closing p tag and moved CardContent closing tag */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div id="how-it-works-section">
        <HowItWorksSection />
      </div>

      {/* Social Proof */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by <span className="gradient-text">Industry Leaders</span>
            </h2>
            <div className="flex justify-center items-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-slate-300 ml-2 font-medium">4.8/5 from 200+ reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-effect border-slate-700 rounded-xl">
                <CardContent className="p-6">
                  <blockquote className="text-slate-300 mb-4 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-sm text-slate-400 font-medium">{testimonial.role}</div>
                      <div className="text-sm text-slate-500">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your <span className="gradient-text">Software Strategy?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-medium">
            Join thousands of IT leaders who trust StackStage to make better software decisions
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to={createPageUrl("Onboarding")}>
                <Button
                  className="gradient-button text-white px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform duration-200"
                >
                  Start Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

            <Link to={createPageUrl("Pricing")}>
              <Button className="bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <BuyerPrivacyModal onClose={() => setShowPrivacyModal(false)} />
      )}
    </div>
  );
}