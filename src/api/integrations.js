import { base44 } from './base44Client';

// Mock integrations for demo purposes
// These would be replaced with real API calls in production

export const Core = {
  InvokeLLM: async (prompt) => {
    console.log('Mock LLM invocation:', prompt);
    return { response: 'This is a mock LLM response' };
  },

  SendEmail: async (to, subject, body) => {
    console.log('Mock email send:', { to, subject, body });
    return { success: true, messageId: 'mock-' + Date.now() };
  },

  UploadFile: async (file) => {
    console.log('Mock file upload:', file);
    return {
      success: true,
      url: 'https://via.placeholder.com/400',
      fileId: 'mock-file-' + Date.now()
    };
  },

  GenerateImage: async (prompt) => {
    console.log('Mock image generation:', prompt);
    return {
      success: true,
      url: 'https://via.placeholder.com/400'
    };
  },

  ExtractDataFromUploadedFile: async (fileId) => {
    console.log('Mock data extraction:', fileId);
    return {
      success: true,
      data: { extractedText: 'Mock extracted data' }
    };
  },

  CreateFileSignedUrl: async (fileId) => {
    console.log('Mock signed URL creation:', fileId);
    return {
      success: true,
      url: 'https://via.placeholder.com/400'
    };
  },

  UploadPrivateFile: async (file) => {
    console.log('Mock private file upload:', file);
    return {
      success: true,
      fileId: 'mock-private-file-' + Date.now()
    };
  }
};

// Export individual functions
export const InvokeLLM = Core.InvokeLLM;
export const SendEmail = Core.SendEmail;
export const UploadFile = Core.UploadFile;
export const GenerateImage = Core.GenerateImage;
export const ExtractDataFromUploadedFile = Core.ExtractDataFromUploadedFile;
export const CreateFileSignedUrl = Core.CreateFileSignedUrl;
export const UploadPrivateFile = Core.UploadPrivateFile;

// Update base44 client with integrations
base44.integrations.Core = Core;
