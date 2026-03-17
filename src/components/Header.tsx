import { useNavigate, useLocation } from 'react-router-dom';
import { getPageType, PageType } from '../utils/routes'
import './Header.css';

interface Props {
  breadcrumbs?: string;
}

export function Header({ breadcrumbs }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const pageType = getPageType(location.pathname)

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={() => navigate('/')}>
          <img src="/images/logo.png" alt="logo" />
        </div>
        <nav className="nav">
          <button 
            className={`nav-btn ${pageType === PageType.COMPETITIONS ? 'active' : ''}`}
            onClick={() => navigate('/competitions')}
          >
            Лиги
          </button>
          <button 
            className={`nav-btn ${pageType === PageType.TEAMS ? 'active' : ''}`}
            onClick={() => navigate('/teams')}
          >
            Команды
          </button>
        </nav>
      </div>
      {breadcrumbs && (
        <div className="breadcrumbs">{breadcrumbs}</div>
      )}
    </header>
  );
}