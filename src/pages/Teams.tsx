import { fetchTeams } from '../api';
import { TeamCard, CardGrid } from '../components';

export function Teams() {
  return (
    <CardGrid
      queryKey={['teams']}
      queryFn={fetchTeams}
      renderCard={(team) => <TeamCard key={team.id} team={team} />}
      searchFn={(team, search) => 
        (team.name || '-').toLowerCase().includes(search.toLowerCase())
      }
      emptyMessage="Команды не найдены"
    />
  );
}