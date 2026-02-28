import { useContext } from 'react';
import { NotesContext } from '../App';

export function useNotesContext() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotesContext must be used within NotesContext.Provider');
  return ctx;
}
