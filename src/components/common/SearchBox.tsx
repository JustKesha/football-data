import './SearchBox.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBox({ value, onChange, placeholder }: Props) {
  return (
    <div className="search-box">
      <img src={process.env.PUBLIC_URL + "/images/icons/search.svg"} alt="search" className="search-icon unselectable" />
      <input
        type="text"
        placeholder={placeholder || "Search"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}