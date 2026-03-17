import './Pagination.css';

/* NOTE Using custom logic to avoid extra deps like jQuery for a single task -Ilya */

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const VISIBLE_PAGES = 6;
const PAGES_BEFORE_ELLIPSIS = 4;
const PAGES_AFTER_ELLIPSIS = 3;

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= VISIBLE_PAGES)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (currentPage <= PAGES_BEFORE_ELLIPSIS)
      return [1, 2, 3, 4, 5, 6, '...'];
    
    if (currentPage >= totalPages - PAGES_AFTER_ELLIPSIS)
      return [
        '...', 
        totalPages - 5, 
        totalPages - 4, 
        totalPages - 3, 
        totalPages - 2, 
        totalPages - 1, 
        totalPages
      ];
    
    return [
      '...',
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      '...'
    ];
  };

  return (
    <div className="pagination unselectable">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={process.env.PUBLIC_URL + "/images/icons/arrow-left.svg"} alt="Previous" />
      </button>
      
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <button
            key={`dots-${index}`}
            className="dots"
            onClick={() => {
              if (index === 0) {
                onPageChange(1);
              } else {
                onPageChange(totalPages);
              }
            }}
          >
            ...
          </button>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        )
      ))}
      
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={process.env.PUBLIC_URL + "/images/icons/arrow-right.svg"} alt="Next" />
      </button>
    </div>
  );
}