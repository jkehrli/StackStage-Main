import { createBrowserRouter } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// Import all pages
import Landing from '@/pages/index';
import Dashboard from '@/pages/Dashboard';
import Marketplace from '@/pages/Marketplace';
import Onboarding from '@/pages/Onboarding';
import StackAssessment from '@/pages/StackAssessment';
import StackPlanner from '@/pages/StackPlanner';
import StackExchange from '@/pages/StackExchange';
import StackChannels from '@/pages/StackChannels';
import Community from '@/pages/Community';
import CommunityPost from '@/pages/CommunityPost';
import StackStageCrew from '@/pages/StackStageCrew';
import BuyerPrivacyPolicy from '@/pages/BuyerPrivacyPolicy';
import VendorDashboard from '@/pages/VendorDashboard';
import VendorLanding from '@/pages/VendorLanding';
import YourLineup from '@/pages/YourLineup';
import FitSignal from '@/pages/FitSignal';
import DealHub from '@/pages/DealHub';
import StackIntel from '@/pages/StackIntel';
import TimingLens from '@/pages/TimingLens';
import NudgeCenter from '@/pages/NudgeCenter';
import BuyerFeedbackSummary from '@/pages/BuyerFeedbackSummary';
import Settings from '@/pages/Settings';
import Pricing from '@/pages/Pricing';
import Product from '@/pages/Product';
import Company from '@/pages/Company';
import Blog from '@/pages/Blog';
import HowItWorks from '@/pages/HowItWorks';
import DeepStackPlan from '@/pages/DeepStackPlan';
import NotionDeepStackPlan from '@/pages/NotionDeepStackPlan';
import SlackDeepStackPlan from '@/pages/SlackDeepStackPlan';
import SalesforceDeepStackPlan from '@/pages/SalesforceDeepStackPlan';
import DealSync from '@/pages/DealSync';
import VendorTagging from '@/pages/VendorTagging';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: createPageUrl('Dashboard'),
    element: <Dashboard />,
  },
  {
    path: createPageUrl('Marketplace'),
    element: <Marketplace />,
  },
  {
    path: createPageUrl('Onboarding'),
    element: <Onboarding />,
  },
  {
    path: createPageUrl('StackAssessment'),
    element: <StackAssessment />,
  },
  {
    path: createPageUrl('StackPlanner'),
    element: <StackPlanner />,
  },
  {
    path: createPageUrl('StackExchange'),
    element: <StackExchange />,
  },
  {
    path: createPageUrl('StackChannels'),
    element: <StackChannels />,
  },
  {
    path: createPageUrl('Community'),
    element: <Community />,
  },
  {
    path: createPageUrl('CommunityPost'),
    element: <CommunityPost />,
  },
  {
    path: createPageUrl('StackStageCrew'),
    element: <StackStageCrew />,
  },
  {
    path: createPageUrl('BuyerPrivacyPolicy'),
    element: <BuyerPrivacyPolicy />,
  },
  {
    path: createPageUrl('VendorDashboard'),
    element: <VendorDashboard />,
  },
  {
    path: createPageUrl('VendorLanding'),
    element: <VendorLanding />,
  },
  {
    path: createPageUrl('YourLineup'),
    element: <YourLineup />,
  },
  {
    path: createPageUrl('FitSignal'),
    element: <FitSignal />,
  },
  {
    path: createPageUrl('DealHub'),
    element: <DealHub />,
  },
  {
    path: createPageUrl('StackIntel'),
    element: <StackIntel />,
  },
  {
    path: createPageUrl('TimingLens'),
    element: <TimingLens />,
  },
  {
    path: createPageUrl('NudgeCenter'),
    element: <NudgeCenter />,
  },
  {
    path: createPageUrl('BuyerFeedbackSummary'),
    element: <BuyerFeedbackSummary />,
  },
  {
    path: createPageUrl('Settings'),
    element: <Settings />,
  },
  {
    path: createPageUrl('Pricing'),
    element: <Pricing />,
  },
  {
    path: createPageUrl('Product'),
    element: <Product />,
  },
  {
    path: createPageUrl('Company'),
    element: <Company />,
  },
  {
    path: createPageUrl('Blog'),
    element: <Blog />,
  },
  {
    path: createPageUrl('HowItWorks'),
    element: <HowItWorks />,
  },
  {
    path: createPageUrl('DeepStackPlan'),
    element: <DeepStackPlan />,
  },
  {
    path: createPageUrl('NotionDeepStackPlan'),
    element: <NotionDeepStackPlan />,
  },
  {
    path: createPageUrl('SlackDeepStackPlan'),
    element: <SlackDeepStackPlan />,
  },
  {
    path: createPageUrl('SalesforceDeepStackPlan'),
    element: <SalesforceDeepStackPlan />,
  },
  {
    path: createPageUrl('DealSync'),
    element: <DealSync />,
  },
  {
    path: createPageUrl('VendorTagging'),
    element: <VendorTagging />,
  },
]);
