import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import { useNotesContext } from '../hooks/useNotesContext';
import { useDateLocale } from '../hooks/useDateLocale';
import type { SymptomNote } from '../types';
import './NotesListPage.css';

export function NotesListPage() {
  const { t } = useTranslation();
  const locale = useDateLocale();
  const { notes, deleteNote } = useNotesContext();
  const [filterSymptom, setFilterSymptom] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'severity-desc'>('date-desc');

  const symptomNames = useMemo((): string[] => {
    const set = new Set(notes.map((n: SymptomNote) => n.symptomName.trim()).filter(Boolean));
    return Array.from(set).sort();
  }, [notes]);

  const filteredAndSorted = useMemo(() => {
    let list: SymptomNote[] = filterSymptom
      ? notes.filter((n: SymptomNote) => n.symptomName.trim() === filterSymptom)
      : [...notes];
    if (sortBy === 'date-desc') list = list.sort((a, b) => b.date.localeCompare(a.date));
    else if (sortBy === 'date-asc') list = list.sort((a, b) => a.date.localeCompare(b.date));
    else list = list.sort((a, b) => b.severity - a.severity);
    return list;
  }, [notes, filterSymptom, sortBy]);

  return (
    <div className="notes-list-page">
      <h2 className="page-title">{t('notes.title')}</h2>
      <p className="page-desc">{t('notes.description')}</p>
      <div className="list-controls">
        <label>
          <span>{t('notes.filterBy')}</span>
          <select
            value={filterSymptom}
            onChange={(e) => setFilterSymptom(e.target.value)}
          >
            <option value="">{t('notes.allSymptoms')}</option>
            {symptomNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{t('notes.sortBy')}</span>
          <select value={sortBy} onChange={(e) => setSortBy((e.target.value || 'date-desc') as 'date-desc' | 'date-asc' | 'severity-desc')}>
            <option value="date-desc">{t('notes.newestFirst')}</option>
            <option value="date-asc">{t('notes.oldestFirst')}</option>
            <option value="severity-desc">{t('notes.severityHighFirst')}</option>
          </select>
        </label>
      </div>
      {filteredAndSorted.length === 0 ? (
        <p className="empty-state">{t('notes.empty')}</p>
      ) : (
        <ul className="notes-list">
          {filteredAndSorted.map((n) => (
            <li key={n.id} className="notes-list-item">
              <div className="list-item-header">
                <span className="list-item-symptom">{n.symptomName}</span>
                <span className={`list-item-severity s-${n.severity <= 3 ? 'low' : n.severity <= 6 ? 'mid' : 'high'}`}>
                  {n.severity}/10
                </span>
              </div>
              <div className="list-item-meta">{format(parseISO(n.date), 'MMM d, yyyy', { locale })}</div>
              {n.notes && <p className="list-item-notes">{n.notes}</p>}
              {n.remedies && <p className="list-item-remedies"><strong>{t('notes.remedies')}:</strong> {n.remedies}</p>}
              {(n.treatmentOrMedication || n.sideEffects) && (
                <p className="list-item-extra">
                  {n.treatmentOrMedication && <>{t('notes.treatment')}: {n.treatmentOrMedication}</>}
                  {n.treatmentOrMedication && n.sideEffects && ' · '}
                  {n.sideEffects && <>{t('notes.sideEffects')}: {n.sideEffects}</>}
                </p>
              )}
              <button type="button" className="list-item-delete" onClick={() => deleteNote(n.id)}>
                {t('notes.delete')}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
