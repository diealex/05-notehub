import axios from "axios";
import type { Note } from "../types/note";
const ACCESS_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

// createNote()
// deleteNote()

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (page: number): Promise<NotesHttpResponse> => {
  const results = await axios.get<NotesHttpResponse>(
    `https://notehub-public.goit.study/api/notes`,
    {
      params: {
        page,
        perPage: 20,
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  return results.data;
};
