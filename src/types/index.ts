export interface Competition {
  id: number;
  name: string;
  area: {
    name: string;
  };
  emblem?: string | null;
}

export interface Team {
  id: number | null;
  name: string | null;
  crest?: string | null;
}

export interface Match {
  id: number;
  utcDate: string;
  status: string;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    fullTime: { home: number | null; away: number | null };
    extraTime?: { home: number | null; away: number | null };
    penalties?: { home: number | null; away: number | null };
  };
}