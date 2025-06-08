import css from "./Searchbox.module.css";

interface SearchBoxProps {
  inputOnChange: (searchQuery: string) => void;
  searchQuery: string;
}

export default function SearchBox({
  inputOnChange,
  searchQuery,
}: SearchBoxProps) {
  const updateSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputOnChange(event.target.value);
  };

  return (
    <input
      value={searchQuery}
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={updateSearchQuery}
    />
  );
}
