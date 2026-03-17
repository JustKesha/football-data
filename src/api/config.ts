// GENERAL
export const BASE_URL = 'https://api.football-data.org/v4';
export const API_TOKEN = process.env.REACT_APP_API_TOKEN || '';

// MOCK-DATA
export const USE_MOCK_DATA = true;
if (USE_MOCK_DATA) console.warn(`API token for ${BASE_URL} not found, switching to mock data`)