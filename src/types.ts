export interface SymptomNote {
  id: string;
  date: string; // ISO date YYYY-MM-DD
  symptomName: string;
  severity: number; // 1-10
  notes: string;
  remedies: string;
  treatmentOrMedication?: string;
  sideEffects?: string;
  createdAt: string; // ISO datetime
}

export type SeverityLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
