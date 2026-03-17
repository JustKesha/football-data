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

  const handleClick = () => {
    if (buttonLink === '') {
      window.location.reload();
    } else {
      navigate(buttonLink as string);
    }
  };

  return (
    <div className={"alert" + (background ? " background" : "")}>
      {icon && <img src={icon} alt="alert icon" />}
      <h2>{title}</h2>
      <p>{message}</p>
      {buttonText && <button onClick={handleClick}>
        {buttonText}
      </button>}
    </div>
  );
}