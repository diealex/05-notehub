import css from "./App.module.css";
import { fetchNotes, deleteNote, createNote } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import NoteModal from "../NoteModal/NoteModal";
import NoteForm from "../NoteForm/NoteForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "../../types/note";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const queryClient = useQueryClient();

  const deleteTodo = useMutation({
    mutationFn: async (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDeleteTodo = (id: number) => {
    deleteTodo.mutate(id);
  };

  const createTodo = useMutation({
    mutationFn: async (note: Note) =>
      createNote(note.title, note.content, note.tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      closeModal();
    },
  });

  const handleCreateTodo = (note: Note) => {
    createTodo.mutate({
      title: note.title,
      content: note.content,
      tag: note.tag,
    });
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 700);

  const { data, isLoading, isError, isPending } = useQuery({
    queryKey: ["notes", page, debouncedSearchQuery],
    queryFn: () => fetchNotes(page, debouncedSearchQuery),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes;
  const totalPages = data?.totalPages;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox inputOnChange={setSearchQuery} />}
        {<Pagination setPage={setPage} totalPages={totalPages} />}
        {
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        }
      </header>
      {createTodo.isPending && <Loader />}
      {createTodo.isError && <ErrorMessage />}
      {deleteTodo.isPending && <Loader />}
      {deleteTodo.isError && <ErrorMessage />}
      {isModalOpen && (
        <NoteModal onClose={closeModal}>
          <NoteForm onClose={closeModal} onCreate={handleCreateTodo} />
        </NoteModal>
      )}
      {isError && <ErrorMessage />}
      {isLoading && isPending && <Loader />}
      {notes && notes.length > 0 && (
        <NoteList notes={notes} onDelete={handleDeleteTodo} />
      )}
    </div>
  );
}

export default App;
