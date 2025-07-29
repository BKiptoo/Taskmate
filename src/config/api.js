// API Configuration
const API_CONFIG = {
  // Use local JSON server for development
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://myreactserver1.web.app' 
    : 'http://localhost:3001',
  
  ENDPOINTS: {
    TASKS: '/tasks'
  }
};

export default API_CONFIG;
