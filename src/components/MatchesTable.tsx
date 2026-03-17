import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import { Pagination, Alert } from './';
import './MatchesTable.css';

interface Props {
  queryKey: string[];
  queryFn: () => Promise<any[]>;
  entityId: string;
  backLink: string;
  backText: string;
}

export function MatchesTable({ 
  queryKey, 
  queryFn, 
  entityId,
  backLink,
  backText 
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  
  const dateFrom = searchParams.get('dateFrom') || '';
  const dateTo = searchParams.get('dateTo') || '';

  const handleDateChange = (from: string, to: string) => {
    if (!from && !to) {
      setSearchParams({});
    } else {
      const params: Record<string, string> = {};
      if (from) params.dateFrom = from;
      if (to) params.dateTo = to;
      setSearchParams(params);
    }
    setCurrentPage(1);
  };

  const { data: matches, isLoading, error } = useQuery({
    queryKey: [...queryKey, entityId, dateFrom, dateTo],
    queryFn,
    enabled: !!entityId,
    select: (data) => {
      const sorted = [...data].sort((a, b) => 
        new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime()
      );
      return sorted;
    }
  });

  if (isLoading)
    return <Alert
      title="Загрузка..."
      message="Это займет всего пару секунд"
      icon="/images/spinner.gif"
      background={true}
    />;
  if (error)
    return <Alert
      title="Неудалось загрузить команды"
      message={`"${error.message}"`}
      icon="/images/icons/sad-request.png"
      background={true}
    />;

  return (
    <div className="competition-calendar">
      <div className="match-filters">
        <span>Матчи с</span>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => handleDateChange(e.target.value, dateTo)}
        />
        <span>по</span>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => handleDateChange(dateFrom, e.target.value)}
        />
      </div>

      {!matches?.length ? (
        <Alert 
          message="Матчей не найдено"
          buttonText={backText}
          buttonLink={backLink}
          background={true}
          icon="/images/icons/bad-request.png"
        />
      ) : (
        <>
          <div className="matches-table-wrapper">
            <table className="matches-table">
              <tbody>
                {matches.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                  .map(match => (
                    <tr key={match.id}>
                      <td>{format(new Date(match.utcDate), 'dd.MM.yyyy')}</td>
                      <td>{format(new Date(match.utcDate), 'HH:mm')}</td>
                      <td>{match.status}</td>
                      <td>{match.homeTeam.name} - {match.awayTeam.name}</td>
                      <td className="match-score">{formatScore(match.score)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(matches.length / ITEMS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

function formatScore(score: any): string {
  const full = `${score.fullTime.home ?? '-'}:${score.fullTime.away ?? '-'}`;
  const extra = score.extraTime?.home != null ? ` (${score.extraTime.home}:${score.extraTime.away})` : '';
  const pens = score.penalties?.home != null ? ` (${score.penalties.home}:${score.penalties.away})` : '';
  return full + extra + pens;
}