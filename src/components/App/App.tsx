import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import NoteModal from "../NoteModal/NoteModal";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const debounced = useDebouncedCallback((value) => {
    setDebouncedSearchQuery(value);
    setPage(1);
  }, 700);

  const onSearchChanged = (value: string) => {
    setSearchQuery(value);
    debounced(value);
  };

  const { data, isLoading, isError, isPending, isFetching } = useQuery({
    queryKey: ["notes", page, debouncedSearchQuery],
    queryFn: () => fetchNotes(page, debouncedSearchQuery),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes;
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {
          <SearchBox
            inputOnChange={onSearchChanged}
            searchQuery={searchQuery}
          />
        }
        {<Pagination setPage={setPage} totalPages={totalPages} page={page} />}
        {
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        }
      </header>

      {isModalOpen && <NoteModal onClose={closeModal} />}
      {isError && <ErrorMessage />}
      {(isLoading || isPending || isFetching) && <Loader />}
      {notes && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}

export default App;
