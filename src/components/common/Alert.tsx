import { useNavigate } from 'react-router-dom';
import './Alert.css';

interface Props {
  title?: string;
  message?: string;
  icon?: string;
  buttonText?: string;
  buttonLink?: string;
  background?: boolean;
}

export function Alert({ 
  title = 'Ой-ой...', 
  message = 'Что-то пошло не так.', 
  icon = '',
  buttonText = '',
  buttonLink = '/',
  background = false
}: Props) {
  const navigate = useNavigate();

  return (
    <div className={"alert" + (background ? " background" : "")}>
      {icon && <img src={icon} alt="alert icon" />}
      <h2>{title}</h2>
      <p>{message}</p>
      {buttonText && <button onClick={() => navigate(buttonLink)}>
        {buttonText}
      </button>}
    </div>
  );
}