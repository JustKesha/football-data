import { Link, useLocation, matchPath } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCompetition, fetchTeam } from '../../api';
import './Breadcrumbs.css';

interface Props {
  items?: { label: string; path?: string }[];
  separator?: string;
}

export function Breadcrumbs({ items: propItems, separator = ' > ' }: Props) {
  const location = useLocation();
  const competitionMatch = matchPath({ path: '/competition/:id' }, location.pathname);
  const teamMatch = matchPath({ path: '/team/:id' }, location.pathname);

  const { data: competition } = useQuery({
    queryKey: ['competition', competitionMatch?.params?.id],
    queryFn: () => fetchCompetition(competitionMatch!.params.id!),
    enabled: !!competitionMatch,
  });

  const { data: team } = useQuery({
    queryKey: ['team', teamMatch?.params?.id],
    queryFn: () => fetchTeam(teamMatch!.params.id!),
    enabled: !!teamMatch,
  });

  const getBreadcrumbItems = (): { label: string; path?: string }[] => {
    if (competitionMatch) {
      return [
        { label: 'Лиги', path: '/competitions' },
        { label: competition?.name || 'Загрузка...' }
      ];
    }
    
    if (teamMatch) {
      return [
        { label: 'Команды', path: '/teams' },
        { label: team?.name || 'Загрузка...' }
      ];
    }

    return [];
  };

  const items = propItems || getBreadcrumbItems();

  if (!items.length) return null;

  return (
    <nav className="breadcrumbs">
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && <span className="separator">{separator}</span>}
          {item.path ? (
            <Link to={item.path}>{item.label}</Link>
          ) : (
            <span className="current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}