import { useParams, useSearchParams } from 'react-router-dom';
import { fetchTeamMatches } from '../../api';
import { MatchesTable } from '../../components/MatchesTable';

export function TeamCalendar() {
  const { teamId } = useParams();
  const [searchParams] = useSearchParams();
  
  const dateFrom = searchParams.get('dateFrom') || '';
  const dateTo = searchParams.get('dateTo') || '';

  return (
    <MatchesTable
      queryKey={['teamMatches']}
      queryFn={() => fetchTeamMatches(teamId!, dateFrom, dateTo)}
      entityId={teamId!}
      backLink="/teams"
      backText="К списку команд"
    />
  );
}