import { useNavigate } from 'react-router-dom';
import { Team } from '../../types';
import './Card.css';

interface Props {
  team: Team;
}

export function TeamCard({ team }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="card unselectable"
      onClick={() => navigate(`/team/${team.id}`)}
    >
      <img 
        src={team.crest || process.env.PUBLIC_URL + "/images/placeholders/team-crest.png"} 
        alt={team.name || "-"}
        onError={(e) => {
          e.currentTarget.src = process.env.PUBLIC_URL + "/images/placeholders/team-crest.png";
        }}
      />
      <h3>{team.name}</h3>
    </div>
  );
}