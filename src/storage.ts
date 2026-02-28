import type { SymptomNote } from './types';

const STORAGE_KEY = 'symptom-tracker-notes';

export function loadNotes(): SymptomNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (n): n is SymptomNote =>
        typeof n === 'object' &&
        n !== null &&
        typeof (n as SymptomNote).id === 'string' &&
        typeof (n as SymptomNote).date === 'string' &&
        typeof (n as SymptomNote).symptomName === 'string' &&
        typeof (n as SymptomNote).severity === 'number' &&
        typeof (n as SymptomNote).notes === 'string' &&
        typeof (n as SymptomNote).remedies === 'string'
    );
  } catch {
    return [];
  }
}

export function saveNotes(notes: SymptomNote[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
