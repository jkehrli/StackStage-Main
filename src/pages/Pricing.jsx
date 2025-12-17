import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle, // Changed from Check to CheckCircle
  Star,
  Users,
  Zap,
  Shield,
  Crown,
  Building
} from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Free to Start",
      subtitle: "Buyer Access",
      price: "$0",
      period: "forever",
      description: "Perfect for individual buyers and small teams getting started",
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      features: [
        "Basic stack analysis",
        "Up to 3 evaluations per month",
        "Community peer validation",
        "Standard templates",
        "Email support",
        "Basic reporting"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline",
      popular: false
    },
    {
      name: "Pro Tools",
      subtitle: "Power Users",
      price: "Coming Soon",
      period: "early pricing TBD",
      description: "Advanced features for teams that need deeper insights and collaboration",
      icon: <Zap className="w-8 h-8 text-sky-400" />,
      features: [
        "Advanced AI insights",
        "Unlimited evaluations",
        "Priority peer network access",
        "Custom workflows",
        "Advanced analytics",
        "API access",
        "Priority support",
        "Custom integrations"
      ],
      buttonText: "Join Waitlist",
      buttonVariant: "default",
      popular: true
    },
    {
      name: "Vendors & Partners",
      subtitle: "Supplier Visibility",
      price: "Starting at $499",
      period: "per month",
      description: "Comprehensive platform access for vendors and solution providers",
      icon: <Building className="w-8 h-8 text-purple-400" />,
      features: [
        "Vendor profile management",
        "Lead generation tools",
        "Buyer intent signals",
        "Competitive intelligence",
        "ROI tracking",
        "White-label options",
        "Dedicated account manager",
        "Custom onboarding"
      ],
      buttonText: "Talk to Sales",
      buttonVariant: "outline",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How does the free plan work?",
      answer: "The free plan gives you full access to basic stack analysis and evaluation tools. You can perform up to 3 evaluations per month and access our community peer network."
    },
    {
      question: "What's included in the Pro Tools plan?",
      answer: "Pro Tools includes advanced AI insights, unlimited evaluations, priority peer network access, custom workflows, and comprehensive analytics. Pricing will be announced soon."
    },
    {
      question: "How does vendor pricing work?",
      answer: "Vendor pricing starts at $499/month and includes lead generation tools, buyer intent signals, and competitive intelligence. Contact our sales team for custom enterprise pricing."
    },
    {
      question: "Can I upgrade or downgrade anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
    }
  ];

  return (
    <div className="bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(14,165,233,0.1),transparent_70%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Choose the plan that fits your needs. Start free and upgrade as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              let buttonLink;
              switch (plan.name) {
                case "Free to Start":
                  buttonLink = createPageUrl("Onboarding");
                  break;
                case "Pro Tools":
                  // Assuming 'Waitlist' is a valid page name for createPageUrl
                  buttonLink = createPageUrl("Waitlist"); 
                  break;
                case "Vendors & Partners":
                  // Assuming 'VendorHub' is a valid page name for createPageUrl
                  buttonLink = createPageUrl("VendorHub"); 
                  break;
                default:
                  buttonLink = "#"; // Fallback for unexpected plan names
              }

              return (
                <Card key={index} className={`glass-effect border-slate-700 hover:border-slate-600 transition-all duration-300 relative ${
                  plan.popular ? 'scale-105 ring-2 ring-sky-400/50' : ''
                }`}>
                  {plan.popular &&
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-sky-400 to-cyan-400 text-white px-4 py-2 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  }

                  <CardHeader className="text-center p-8">
                    <div className="flex justify-center mb-4">
                      {plan.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2 text-white">{plan.name}</CardTitle>
                    <p className="text-slate-400 mb-4">{plan.subtitle}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                      <span className="text-slate-400 ml-2">/{plan.period}</span>
                    </div>
                    <p className="text-slate-300 text-sm">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="p-8 pt-0">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          <span className="text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Link component wraps the Button for navigation */}
                    <Link to={buttonLink} className="block">
                      <Button
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 w-full py-4 text-lg font-semibold rounded-xl transition-all duration-200 ${
                          plan.buttonVariant === 'default'
                            ? 'gradient-button text-white hover:scale-105'
                            : 'bg-white/10 border-2 border-white/30 text-white hover:bg-white/20'
                        }`}
                      >
                        {plan.buttonText}
                        {plan.buttonVariant !== 'default' && <ArrowRight className="ml-2 w-5 h-5" />}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">StackStage?</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Built for modern software buyers and decision-makers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-effect border-slate-700 text-center">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-sky-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Collaborative</h3>
                <p className="text-slate-300">
                  Bring your entire team together for better decision-making
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-slate-700 text-center">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Secure</h3>
                <p className="text-slate-300">
                  Enterprise-grade security with SOC 2 Type II compliance
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-slate-700 text-center">
              <CardContent className="p-8">
                <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Proven</h3>
                <p className="text-slate-300">
                  Trusted by 500+ companies for their software decisions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) =>
              <Card key={index} className="glass-effect border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {faq.question}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
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
            Ready to Transform Your Software Decisions?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of IT professionals who trust StackStage for their software evaluation needs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Onboarding")}>
              <Button className="gradient-button text-white px-8 py-4 text-lg font-semibold rounded-xl hover:scale-105 transition-transform duration-200">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>

            <Button className="bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all">
              Talk to Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}