import css from "./NoteList.module.css";
import type { Note } from "../../types/note.ts";

interface NoteListProps {
  onDelete: (id: number) => void;
  notes: Note[];
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  function onclickHandle(id: number) {
    onDelete(id);
  }

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }: Note) => (
        <li className={css.listItem} key={id}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button className={css.button} onClick={() => onclickHandle(id!)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
