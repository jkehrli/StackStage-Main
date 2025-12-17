// Mock Base44 client for demo purposes
// This replaces the Base44 SDK with a simple mock implementation

export const base44 = {
  auth: null, // Will be set by entities.js
  entities: {},
  integrations: {
    Core: {
      InvokeLLM: null,
      SendEmail: null,
      UploadFile: null,
      GenerateImage: null,
      ExtractDataFromUploadedFile: null,
      CreateFileSignedUrl: null,
      UploadPrivateFile: null,
    }
  }
};
