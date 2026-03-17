import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchBox, Pagination, Alert } from './';
import './CardGrid.css';

interface Props<T> {
  queryKey: string[];
  queryFn: () => Promise<T[]>;
  renderCard: (item: T) => React.ReactNode;
  searchFn: (item: T, search: string) => boolean;
  emptyMessage?: string;
  itemsPerPage?: number;
}

export function CardGrid<T>({ 
  queryKey, 
  queryFn, 
  renderCard,
  searchFn,
  emptyMessage = 'Ничего не найдено',
  itemsPerPage = 16
}: Props<T>) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn,
  });

  const filteredData = data?.filter(item => searchFn(item, search)) || [];

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  if (isLoading)
    return <Alert
      title="Загрузка..."
      message="Это займет всего пару секунд"
      icon="/images/spinner.gif"
    />;
  if (error)
    return <Alert
      title="Не удалось загрузить команды"
      message={`"${error.message}"`}
      buttonText="Попробовать еще раз"
      buttonLink=""
      icon="/images/icons/sad-request.png"
    />;

  return (
    <div className="entity-list">
      <SearchBox value={search} onChange={handleSearch} />

      {paginatedData.length === 0 ? (
        <Alert message={emptyMessage} icon="/images/icons/bad-request.png" />
      ) : (
        <>
          <div className="card-grid">
            {paginatedData.map((item, index) => renderCard(item))}
          </div>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}