import css from "./Searchbox.module.css";
import { useState } from "react";

interface SearchBoxProps {
  inputOnChange: (searchQuery: string) => void;
}

export default function SearchBox({ inputOnChange }: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const updateSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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
