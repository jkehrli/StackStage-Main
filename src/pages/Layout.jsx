

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, LayoutDashboard, Building2, LogOut, Settings, ShieldCheck, Users, Store, Tag, ClipboardList, Signal, Layers, Clock, Bell, Star, MessageSquare, UserCheck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/api/entities";
import StackGuide from "@/components/ai/StackGuide";

const AppLayout = ({ children, currentPageName }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === createPageUrl(path);

  const appNavItems = [
  { type: "item", name: "Dashboard", path: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { type: "item", name: "StackAssessment", path: "StackAssessment", icon: <CheckCircle className="w-5 h-5" /> },

  { type: "section", title: "Planning & Analysis" },
  { type: "item", name: "Stack Planner", path: "StackPlanner", icon: <ClipboardList className="w-5 h-5" /> },
  { type: "item", name: "Marketplace", path: "Marketplace", icon: <Store className="w-5 h-5" /> },

  { type: "section", title: "Community & Collaboration" },
  { type: "item", name: "StackExchange", path: "StackExchange", icon: <MessageSquare className="w-5 h-5" /> },
  { type: "item", name: "StackChannels", path: "StackChannels", icon: <MessageSquare className="w-5 h-5" /> },
  { type: "item", name: "Community", path: "Community", icon: <Users className="w-5 h-5" /> },
  { type: "item", name: "StackStage Crew", path: "StackStageCrew", icon: <UserCheck className="w-5 h-5" /> },

  { type: "section", title: "Privacy & Buyer Tools" },
  { type: "item", name: "Buyer Privacy", path: "BuyerPrivacyPolicy", icon: <ShieldCheck className="w-5 h-5" /> },

  { type: "section", title: "Seller Toolkit" },
  { type: "item", name: "Vendor Hub", path: "VendorDashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { type: "item", name: "Your Lineup", path: "YourLineup", icon: <ClipboardList className="w-5 h-5" /> },
  { type: "item", name: "Fit Signal", path: "FitSignal", icon: <Signal className="w-5 h-5" /> },
  { type: "item", name: "Deal Hub", path: "DealHub", icon: <Building2 className="w-5 h-5" /> },
  { type: "item", name: "StackIntel", path: "StackIntel", icon: <Layers className="w-5 h-5" /> },
  { type: "item", name: "Timing Lens", path: "TimingLens", icon: <Clock className="w-5 h-5" /> },
  { type: "item", name: "Nudge Center", path: "NudgeCenter", icon: <Bell className="w-5 h-5" /> },
  { type: "item", name: "Feedback Summary", path: "BuyerFeedbackSummary", icon: <Star className="w-5 h-5" /> },

  { type: "section", title: "Configuration" },
  { type: "item", name: "Settings", path: "Settings", icon: <Settings className="w-5 h-5" /> }];


  const handleLogout = async () => {
    await User.logout();
    window.location.href = createPageUrl("index");
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <aside className="w-64 bg-slate-800/50 border-r border-slate-700 p-4 flex flex-col">
        <Link to={createPageUrl("index")} className="flex items-center space-x-3 mb-8">
          <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ab8a95562_ChatGPTImageJul4202506_13_46PM.png" alt="StackStage Logo" className="w-8 h-8" />
          <span className="text-xl font-bold gradient-text">StackStage</span>
        </Link>
        <nav className="flex-1">
          <ul>
            {appNavItems.map((item, index) => {
              if (item.type === "section") {
                return (
                  <li key={`section-${item.title || index}`} className="px-4 pt-6 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {item.title}
                  </li>);

              } else {// type === "item"
                return (
                  <li key={`item-${item.name}`}>
                    <Link
                      to={createPageUrl(item.path)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-200 mb-2 ${
                      isActive(item.path) ?
                      "bg-sky-500/20 text-sky-400 font-medium" :
                      "text-slate-300 hover:bg-slate-700/50 hover:text-white"}`
                      }>

                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>);

              }
            })}
          </ul>
        </nav>
        <div className="border-t border-slate-700 pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:bg-slate-700/50 hover:text-white"
            onClick={handleLogout}>

            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
          <div className="mt-4 text-xs text-slate-500">
            <Link to={createPageUrl("index")} className="hover:text-slate-400">
              ← Back to Marketing Site
            </Link>
          </div>
        </div>
      </aside>
      <main className="px-8 py-8 flex-1 overflow-y-auto">
        {children}
      </main>
      <StackGuide />
    </div>);

};

const PublicLayout = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isActive = (path) => location.pathname === createPageUrl(path);

  const navItems = [
  { name: "Product", path: "Product" },
  { name: "How it Works", path: "HowItWorks" },
  { name: "Pricing", path: "Pricing" },
  { name: "Blog", path: "Blog" },
  { name: "Company", path: "Company" }];


  const handleGetStarted = async () => {
    try {
      // Check if user is already logged in
      const user = await User.me();
      if (user) {
        // User is logged in, redirect to Onboarding or Dashboard
        window.location.href = createPageUrl("Onboarding");
      }
    } catch (error) {
      // User is not logged in, redirect to login which will then redirect
      await User.loginWithRedirect(window.location.origin + createPageUrl("Onboarding"));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <nav className="fixed w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to={createPageUrl("index")} className="flex items-center space-x-3">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ab8a95562_ChatGPTImageJul4202506_13_46PM.png" alt="StackStage Logo" className="w-8 h-8" />
              <span className="text-xl font-bold gradient-text">StackStage</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) =>
              <Link
                key={item.name}
                to={createPageUrl(item.path)}
                className={`text-sm font-medium transition-colors duration-200 ${
                isActive(item.path) ?
                "text-sky-400" :
                "text-slate-300 hover:text-white"}`
                }>

                  {item.name}
                </Link>
              )}
               <Link to={createPageUrl("VendorLanding")} className="text-sm font-medium text-slate-300 hover:text-white">
                  For Vendors
               </Link>
              <Link to={createPageUrl("Onboarding")}>
                <Button
                  className="gradient-button text-white px-6 py-2 rounded-lg font-medium">

                  Get Started
                </Button>
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2">

                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen &&
        <div className="md:hidden glass-effect border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) =>
            <Link
              key={item.name}
              to={createPageUrl(item.path)}
              className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
              isActive(item.path) ?
              "text-sky-400" :
              "text-slate-300 hover:text-white"}`
              }
              onClick={() => setMobileMenuOpen(false)}>

                  {item.name}
                </Link>
            )}
               <Link to={createPageUrl("VendorLanding")} className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                  For Vendors
               </Link>
              <div className="px-3 py-2">
                <Link to={createPageUrl("Onboarding")}>
                  <Button
                  className="gradient-button text-white px-6 py-2 rounded-lg font-medium w-full">

                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        }
      </nav>
      <main className="pt-16">{children}</main>
    </div>
  );
};

export default function Layout({ children, currentPageName }) {
  const appPages = ["Dashboard", "StackPlanner", "DealHub", "Settings", "StackExchange", "StackStageCrew", "Marketplace", "DeepStackPlan", "SalesforceDeepStackPlan", "SlackDeepStackPlan", "NotionDeepStackPlan", "Community", "CommunityPost", "VendorTagging", "FitSignal", "StackIntel", "TimingLens", "NudgeCenter", "YourLineup", "VendorDashboard", "BuyerFeedbackSummary", "BuyerPrivacyPolicy", "Recommendations", "StackAssessment", "StackChannels"]; // Changed "DealSync" to "DealHub"
  const publicPages = ["index", "Product", "HowItWorks", "Pricing", "Blog", "Company", "VendorLanding"];
  const onboardingPages = ["Onboarding"];

  // Force redirect to index page on refresh for demo purposes
  React.useEffect(() => {
    if (window.performance.getEntriesByType("navigation")[0].type === "reload") {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
  }, []);

  const renderLayout = () => {
    if (appPages.includes(currentPageName)) {
      return <AppLayout currentPageName={currentPageName}>{children}</AppLayout>;
    }
    if (onboardingPages.includes(currentPageName)) {
      return <div className="bg-gray-50">{children}</div>;
    }
    return <PublicLayout>{children}</PublicLayout>;
  };

  return (
    <>
      <style>
        {`
          html { scroll-behavior: smooth; }
          @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100;200;300;400;500;600;700;800;900&display=swap');
          :root {
            --bg-primary: #0F172A;
            --bg-secondary: #1E293B;
            --bg-accent: #334155;
            --text-primary: #F8FAFC;
            --text-secondary: #CBD5E1;
            --accent-blue: #0EA5E9;
            --accent-cyan: #06B6D4;
          }
          body {
            color: var(--text-primary);
          }
          * { 
            font-family: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif; 
            color: inherit;
          }
          .glass-effect { backdrop-filter: blur(12px); background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(148, 163, 184, 0.1); }
          .gradient-text { background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .gradient-button { background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%); transition: all 0.3s ease; }
          .gradient-button:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(14, 165, 233, 0.3); }
          .animate-float { animation: float 3s ease-in-out infinite; }
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
          .animate-glow { animation: glow 2s ease-in-out infinite alternate; }
          @keyframes glow { from { box-shadow: 0 0 20px rgba(14, 165, 233, 0.2); } to { box-shadow: 0 0 30px rgba(14, 165, 233, 0.4); } }
          
          /* Force all text to be white by default on dark backgrounds */
          .bg-slate-900, .bg-slate-800, .bg-slate-700, .glass-effect {
            color: #f8fafc;
          }
          .bg-slate-900 *, .bg-slate-800 *, .bg-slate-700 *, .glass-effect * {
            color: inherit;
          }
          /* Specific color overrides to ensure they apply correctly */
          .text-slate-500 { color: #64748b !important; }
          .text-slate-400 { color: #94a3b8 !important; }
          .text-slate-300 { color: #cbd5e1 !important; }
          .text-white { color: #ffffff !important; }
          .gradient-text { background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent !important; }
          
          .text-sky-300 { color: #7dd3fc !important; }
          .text-sky-400 { color: #38bdf8 !important; }
          
          .text-emerald-300 { color: #6ee7b7 !important; }
          .text-emerald-400 { color: #34d399 !important; }

          .text-yellow-300 { color: #fde047 !important; }
          .text-yellow-400 { color: #facc15 !important; }
          
          .text-orange-400 { color: #fb923c !important; }
          
          .text-purple-300 { color: #d8b4fe !important; }
          .text-purple-400 { color: #c084fc !important; }

          .text-red-300 { color: #fca5a5 !important; }
          .text-red-400 { color: #f87171 !important; }

          /* Custom Switch Styling for Better Visibility */
          [data-radix-switch-root] {
            background-color: rgb(71, 85, 105) !important;
            border: 2px solid rgb(148, 163, 184) !important;
          }
          [data-radix-switch-root][data-state="checked"] {
            background-color: rgb(14, 165, 233) !important;
            border-color: rgb(56, 189, 248) !important;
          }
          [data-radix-switch-thumb] {
            background-color: white !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
          }
          [data-radix-switch-root][data-state="checked"] [data-radix-switch-thumb] {
            background-color: white !important;
            transform: translateX(18px) !important;
          }

          /* Alternative Switch selector */
          button[role="switch"] {
            background-color: rgb(71, 85, 105) !important;
            border: 2px solid rgb(148, 163, 184) !important;
          }
          button[role="switch"][data-state="checked"] {
            background-color: rgb(14, 165, 233) !important;
            border-color: rgb(56, 189, 248) !important;
          }
          button[role="switch"] span {
            background-color: white !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
          }

          /* Custom Radio Button Styling for Better Visibility */
          button[role="radio"] {
            border: 1.5px solid #94a3b8 !important; /* slate-400 */
            background-color: transparent !important;
          }

          button[role="radio"]:hover {
            border-color: #e2e8f0 !important; /* slate-200 */
          }

          button[role="radio"][data-state="checked"] {
            border-color: #0ea5e9 !important; /* sky-500 */
          }

          /* Style the inner dot */
          button[role="radio"][data-state="checked"] > span > svg {
            color: #0ea5e9 !important;
            fill: #0ea5e9 !important;
          }

          /* Fix date and time input color schemes for dark mode */
          input[type="date"], input[type="time"], input[type="datetime-local"] {
            color-scheme: dark;
            color: #f8fafc !important;
          }

          /* Global button readability fixes */
          .btn-readable {
            background-color: rgb(14, 165, 233) !important;
            color: white !important;
            border-color: rgb(14, 165, 233) !important;
          }
          
          .btn-readable:hover {
            background-color: rgb(2, 132, 199) !important;
            color: white !important;
          }

          /* Icon readability fixes */
          .icon-readable {
            color: white !important;
          }

          /* Force readable text for all dark themed elements */
          [data-theme="dark"], [data-theme="dark"] * {
            color: #f8fafc !important;
          }

          /* Ensure calendar and date picker icons are visible */
          .lucide, .lucide-calendar, .lucide-clock, svg {
            color: currentColor !important;
          }

          /* Tab triggers should be readable */
          [data-radix-tabs-trigger] {
            color: #cbd5e1 !important;
          }
          [data-radix-tabs-trigger][data-state="active"] {
            color: #f8fafc !important;
          }
        `}
      </style>
      {renderLayout()}
    </>
  );
}

