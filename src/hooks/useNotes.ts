import { useState, useEffect, useCallback } from 'react';
import type { SymptomNote } from '../types';
import { loadNotes, saveNotes, generateId } from '../storage';

export function useNotes() {
  const [notes, setNotes] = useState<SymptomNote[]>(() => loadNotes());

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = useCallback((note: Omit<SymptomNote, 'id' | 'createdAt'>) => {
    const full: SymptomNote = {
      ...note,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [...prev, full]);
    return full.id;
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<SymptomNote>) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates } : n))
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const getNotesForDate = useCallback(
    (dateStr: string) => notes.filter((n) => n.date === dateStr),
    [notes]
  );

  const getUniqueSymptomNames = useCallback(() => {
    const set = new Set(notes.map((n) => n.symptomName.trim()).filter(Boolean));
    return Array.from(set).sort();
  }, [notes]);

  const getNotesForSymptom = useCallback(
    (symptomName: string) =>
      notes
        .filter((n) => n.symptomName.trim() === symptomName)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [notes]
  );

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNotesForDate,
    getUniqueSymptomNames,
    getNotesForSymptom,
  };
}
