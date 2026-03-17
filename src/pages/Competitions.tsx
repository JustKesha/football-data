import { fetchCompetitions } from '../api';
import { CompetitionCard, CardGrid } from '../components';

export function Competitions() {
  return (
    <CardGrid
      queryKey={['competitions']}
      queryFn={fetchCompetitions}
      renderCard={(comp) => <CompetitionCard key={comp.id} competition={comp} />}
      searchFn={(comp, search) => 
        comp.name.toLowerCase().includes(search.toLowerCase()) ||
        comp.area.name.toLowerCase().includes(search.toLowerCase())
      }
      emptyMessage="Лиги не найдены"
    />
  );
}