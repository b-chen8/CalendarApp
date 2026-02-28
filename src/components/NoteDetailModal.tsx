import { format, parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import type { SymptomNote } from '../types';
import { useNotesContext } from '../hooks/useNotesContext';
import { useDateLocale } from '../hooks/useDateLocale';
import './NoteDetailModal.css';

interface NoteDetailModalProps {
  date: string;
  notes: SymptomNote[];
  onClose: () => void;
}

export function NoteDetailModal({ date, notes, onClose }: NoteDetailModalProps) {
  const { t } = useTranslation();
  const locale = useDateLocale();
  const { deleteNote } = useNotesContext();
  const parsed = parseISO(date);

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{format(parsed, 'EEEE, MMMM d, yyyy', { locale })}</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label={t('modal.close')}>
            ×
          </button>
        </div>
        <div className="modal-body">
          {notes.length === 0 ? (
            <p className="no-notes">{t('modal.noNotes')}</p>
          ) : (
            <ul className="note-cards">
              {notes.map((n) => (
                <li key={n.id} className="note-card">
                  <div className="note-card-header">
                    <span className="note-symptom">{n.symptomName}</span>
                    <span className={`note-severity severity-${n.severity <= 3 ? 'low' : n.severity <= 6 ? 'mid' : 'high'}`}>
                      {t('modal.severity')}: {n.severity}/10
                    </span>
                  </div>
                  {n.notes && <p className="note-notes">{n.notes}</p>}
                  {n.remedies && (
                    <p className="note-remedies"><strong>{t('modal.remedies')}:</strong> {n.remedies}</p>
                  )}
                  {n.treatmentOrMedication && (
                    <p className="note-treatment"><strong>{t('modal.treatmentMedication')}:</strong> {n.treatmentOrMedication}</p>
                  )}
                  {n.sideEffects && (
                    <p className="note-side-effects"><strong>{t('modal.sideEffects')}:</strong> {n.sideEffects}</p>
                  )}
                  <button
                    type="button"
                    className="note-delete"
                    onClick={() => { deleteNote(n.id); if (notes.length <= 1) onClose(); }}
                  >
                    {t('modal.deleteNote')}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
