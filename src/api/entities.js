import { base44 } from './base44Client';

// Mock user data for demo
const MOCK_USER = {
  id: 'demo-user-123',
  email: 'demo@stackstage.com',
  name: 'Demo User',
  company: 'StackStage Demo Co.',
  role: 'IT Director',
  createdAt: new Date().toISOString(),
};

// Mock authentication implementation
export const User = {
  // Check if user is logged in
  me: async () => {
    const isLoggedIn = localStorage.getItem('stackstage_demo_user');
    if (isLoggedIn) {
      return MOCK_USER;
    }
    throw new Error('Not authenticated');
  },

  // Mock login - just sets a flag in localStorage
  loginWithRedirect: async (redirectUrl) => {
    localStorage.setItem('stackstage_demo_user', 'true');
    window.location.href = redirectUrl;
  },

  // Mock logout
  logout: async () => {
    localStorage.removeItem('stackstage_demo_user');
    window.location.href = '/';
  },

  // Get current user
  current: () => {
    const isLoggedIn = localStorage.getItem('stackstage_demo_user');
    return isLoggedIn ? MOCK_USER : null;
  }
};

// Mock entity implementations (can be expanded later with real backend)
export const Vendor = {
  find: async (id) => ({ id, name: 'Mock Vendor' }),
  list: async () => [],
  create: async (data) => ({ id: 'new-id', ...data }),
  update: async (id, data) => ({ id, ...data }),
  delete: async (id) => ({ success: true }),
};

export const Recommendation = {
  find: async (id) => ({ id, title: 'Mock Recommendation' }),
  list: async () => [],
  create: async (data) => ({ id: 'new-id', ...data }),
  update: async (id, data) => ({ id, ...data }),
  delete: async (id) => ({ success: true }),
};

export const MaturityProfile = {
  find: async (id) => ({ id, score: 75 }),
  list: async () => [],
  create: async (data) => ({ id: 'new-id', ...data }),
  update: async (id, data) => ({ id, ...data }),
  delete: async (id) => ({ success: true }),
};

export const Peer = {
  find: async (id) => ({ id, name: 'Mock Peer' }),
  list: async () => [],
  create: async (data) => ({ id: 'new-id', ...data }),
  update: async (id, data) => ({ id, ...data }),
  delete: async (id) => ({ success: true }),
};

export const StakeholderPersona = {
  find: async (id) => ({ id, name: 'Mock Stakeholder' }),
  list: async () => [],
  create: async (data) => ({ id: 'new-id', ...data }),
  update: async (id, data) => ({ id, ...data }),
  delete: async (id) => ({ success: true }),
};

// Update base44 client with auth
base44.auth = User;
base44.entities = { Vendor, Recommendation, MaturityProfile, Peer, StakeholderPersona };
