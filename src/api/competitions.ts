import { BASE_URL, API_TOKEN, USE_MOCK_DATA } from './config';
import { Competition } from '../types';
import mockData from './mock/competitions.json';

export async function fetchCompetitions(): Promise<Competition[]> {
  if (USE_MOCK_DATA)
    return mockData.competitions;
  
  const response = await fetch(`${BASE_URL}/competitions`, {
    headers: { 'X-Auth-Token': API_TOKEN }
  });
  
  if (!response.ok)
    throw new Error('Failed to fetch teams');

  const data = await response.json();
  return data.competitions;
}

export async function fetchCompetition(id: string): Promise<Competition> {
  if (USE_MOCK_DATA)
    return mockData.competitions.find(c => c.id === Number(id))!;

  const response = await fetch(`${BASE_URL}/competitions/${id}`, {
    headers: { 'X-Auth-Token': API_TOKEN }
  });
  
  if (!response.ok)
    throw new Error('Failed to fetch competition');

  return response.json();
}