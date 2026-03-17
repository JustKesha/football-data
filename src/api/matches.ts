import { USE_MOCK_DATA, BASE_URL, API_TOKEN } from './config';
import { Match } from '../types';
import mockCompetitionData from './mock/competition-matches.json';
import mockTeamData from './mock/team-matches.json';

function getMatchParams(dateFrom: string, dateTo: string): URLSearchParams {
  const params = new URLSearchParams();

  if (!dateFrom && !dateTo) return params;

  // NOTE: API requires both dateFrom and dateTo parameters.
  // The period between them should be reasonable (~1 year).
  if (dateFrom && !dateTo) {
    const date = new Date(dateFrom);

    date.setFullYear(date.getFullYear() + 1);

    params.append('dateFrom', dateFrom);
    params.append('dateTo', date.toISOString().split('T')[0]);
  } else if (!dateFrom && dateTo) {
    const date = new Date(dateTo);

    date.setFullYear(date.getFullYear() - 1);

    params.append('dateFrom', date.toISOString().split('T')[0]);
    params.append('dateTo', dateTo);
  } else {
    params.append('dateFrom', dateFrom);
    params.append('dateTo', dateTo);
  }

  return params;
}

export async function fetchCompetitionMatches(
  competitionId: string,
  dateFrom: string,
  dateTo: string
): Promise<Match[]> {
  if (USE_MOCK_DATA) {
    let filtered = mockCompetitionData.matches;
    
    if (dateFrom) {
      const from = new Date(dateFrom);
      filtered = filtered.filter(match => new Date(match.utcDate) >= from);
    }
    
    if (dateTo) {
      const to = new Date(dateTo);
      filtered = filtered.filter(match => new Date(match.utcDate) <= to);
    }
    
    return filtered;
  }

  const params = getMatchParams(dateFrom, dateTo);
  const response = await fetch(
    `${BASE_URL}/competitions/${competitionId}/matches?${params}`,
    { headers: { 'X-Auth-Token': API_TOKEN }, }
  );
  
  if (!response.ok)
    throw new Error('Failed to fetch matches');

  const data = await response.json();
  return data.matches;
}

export async function fetchTeamMatches(
  teamId: string,
  dateFrom: string,
  dateTo: string
): Promise<Match[]> {
  if (USE_MOCK_DATA) {
    let filtered = mockTeamData.matches;

    if (dateFrom) {
      const from = new Date(dateFrom);
      filtered = filtered.filter(match => new Date(match.utcDate) >= from);
    }

    if (dateTo) {
      const to = new Date(dateTo);
      filtered = filtered.filter(match => new Date(match.utcDate) <= to);
    }
    
    return filtered.filter(m => 
      m.homeTeam.id === parseInt(teamId) || m.awayTeam.id === parseInt(teamId)
    );
  }

  const params = getMatchParams(dateFrom, dateTo);
  const response = await fetch(
    `${BASE_URL}/teams/${teamId}/matches?${params}`,
    { headers: { 'X-Auth-Token': API_TOKEN } }
  );
  
  if (!response.ok) throw new Error('Failed to fetch team matches');

  const data = await response.json();
  return data.matches;
}
