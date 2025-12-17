# StackStage App

A comprehensive SaaS platform for software procurement and tech stack management. This app helps IT leaders make confident software decisions with AI-powered insights and peer validation.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at **http://localhost:5173**

## 📱 Demo Mode

The app is currently running in **demo mode** with mock authentication and data:

### Mock Authentication
- Click any "Get Started" or "Sign In" button
- You'll be automatically logged in as a demo user
- No credentials required - authentication is stored in localStorage
- Click "Logout" to clear the session

### Demo User Info
- **Email**: demo@stackstage.com
- **Name**: Demo User
- **Company**: StackStage Demo Co.
- **Role**: IT Director

## 🏗️ Architecture

- **Frontend**: React 18 + Vite
- **Routing**: React Router v7 (34 pages)
- **UI Components**: Radix UI + Tailwind CSS + shadcn/ui
- **Authentication**: Mock localStorage-based (ready for backend integration)
- **Data**: Mock data and hardcoded examples

## 📦 Key Features

### Buyer Features
- **Stack Assessment**: Analyze tech stack maturity
- **Marketplace**: Browse and compare vendors
- **Dashboard**: Project overview and recommendations
- **Community**: Peer validation and insights
- **Privacy Controls**: Tiered privacy system for buyer protection

### Vendor Features
- **Vendor Dashboard**: Manage deals and prospects
- **Deal Hub**: Deal room collaboration
- **Fit Signal**: AI-powered buyer matching
- **Nudge Center**: Automated engagement system
- **Buyer Feedback**: Collect and analyze feedback

## 🛠️ Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🔌 Backend Integration (Coming Soon)

The app is ready for backend integration. All API calls are abstracted in:
- `src/api/entities.js` - Entity CRUD operations
- `src/api/integrations.js` - Third-party integrations
- `src/api/base44Client.js` - API client configuration

To add a real backend:
1. Choose your backend (Supabase, Firebase, custom API, etc.)
2. Update the mock implementations in `src/api/entities.js`
3. Implement real authentication in `src/api/entities.js` (User object)
4. Update integrations in `src/api/integrations.js`

## 📄 Available Pages

- **Landing**: Marketing homepage
- **Onboarding**: User onboarding flow
- **Dashboard**: Main buyer dashboard
- **Marketplace**: Vendor marketplace
- **Stack Assessment**: Tech stack evaluation
- **Community**: Peer validation network
- **Vendor Dashboard**: Vendor deal management
- And 27+ more pages...

## 🎨 Tech Stack

- React 18.2
- Vite 6.1
- React Router 7.2
- Tailwind CSS 3.4
- Radix UI
- Framer Motion
- Recharts
- Zod
- React Hook Form

## 📝 License

Private - All rights reserved
