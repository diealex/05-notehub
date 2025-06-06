import axios from "axios";
import type { Note } from "../types/note";
const ACCESS_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  mysearchtext?: string
): Promise<NotesHttpResponse> => {
  const results = await axios.get<NotesHttpResponse>(
    `https://notehub-public.goit.study/api/notes`,
    {
      params: {
        page,
        perPage: 20,
        search: mysearchtext ? mysearchtext : null,
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  return results.data;
};

export const deleteNote = async (id: number): Promise<NotesHttpResponse> => {
  const results = await axios.delete<NotesHttpResponse>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  return results.data;
};

export const createNote = async (
  title: string,
  content: string,
  tag: string
): Promise<NotesHttpResponse> => {
  const results = await axios.post<NotesHttpResponse>(
    `https://notehub-public.goit.study/api/notes`,
    {
      title,
      content,
      tag,
    },
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  return results.data;
};
