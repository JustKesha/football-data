import { useNavigate } from 'react-router-dom';
import { Competition } from '../../types';
import './Card.css';

interface Props {
  competition: Competition;
}

export function CompetitionCard({ competition }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="card unselectable"
      onClick={() => navigate(`/competition/${competition.id}`)}
    >
      <img 
        src={competition.emblem || "/images/placeholders/competition-emblem.png"} 
        alt={competition.name}
        onError={(e) => {
          e.currentTarget.src = "/images/placeholders/competition-emblem.png";
        }}
      />
      <h2>{competition.name}</h2>
      <p>{competition.area.name}</p>
    </div>
  );
}