import css from "./Searchbox.module.css";
export default function SearchBox() {
  return <input className={css.input} type="text" placeholder="Search notes" />;
}
