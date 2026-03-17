import { useParams, useSearchParams } from 'react-router-dom';
import { fetchCompetitionMatches } from '../../api';
import { MatchesTable } from '../../components/MatchesTable';

export function CompetitionCalendar() {
  const { competitionId } = useParams();
  const [searchParams] = useSearchParams();
  
  const dateFrom = searchParams.get('dateFrom') || '';
  const dateTo = searchParams.get('dateTo') || '';

  return (
    <MatchesTable
      queryKey={['competitionMatches']}
      queryFn={() => fetchCompetitionMatches(competitionId!, dateFrom, dateTo)}
      entityId={competitionId!}
      backLink="/"
      backText="К списку лиг"
    />
  );
}