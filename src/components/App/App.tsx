import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";

function App() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isPending, isSuccess } = useQuery({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes(page),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes;
  const totalPages = data?.totalPages;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox />}
        {<Pagination page={page} setPage={setPage} totalPages={totalPages} />}
        {<button className={css.button}>Create note +</button>}
      </header>
      {notes && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}

export default App;
