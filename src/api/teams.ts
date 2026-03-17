import { BASE_URL, API_TOKEN, USE_MOCK_DATA } from './config';
import { Team } from '../types';
import mockData from './mock/teams.json';

export async function fetchTeams(): Promise<Team[]> {
  if (USE_MOCK_DATA)
    return mockData.teams;

  const response = await fetch(`${BASE_URL}/teams`, {
    headers: { 'X-Auth-Token': API_TOKEN }
  });
  
  if (!response.ok)
    throw new Error('Failed to fetch teams');

  const data = await response.json();
  return data.teams;
}

export async function fetchTeam(id: string): Promise<Team> {
  if (USE_MOCK_DATA)
    return mockData.teams.find(t => t.id === Number(id))!;
  
  const response = await fetch(`${BASE_URL}/teams/${id}`, {
    headers: { 'X-Auth-Token': API_TOKEN }
  });
  
  if (!response.ok)
    throw new Error('Failed to fetch team');
  
  return response.json();
}