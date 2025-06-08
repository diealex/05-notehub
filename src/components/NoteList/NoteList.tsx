import css from "./NoteList.module.css";
import type { Note } from "../../types/note.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService.ts";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import Loader from "../Loader/Loader.tsx";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteTodo = useMutation({
    mutationFn: async (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  function onclickHandle(id: number) {
    deleteTodo.mutate(id);
  }

  return (
    <>
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
      {deleteTodo.isError && <ErrorMessage />}
      {deleteTodo.isPending && <Loader />}
    </>
  );
}
