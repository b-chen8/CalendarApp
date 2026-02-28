import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { useNotesContext } from '../hooks/useNotesContext';
import './NewNotePage.css';

export function NewNotePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addNote } = useNotesContext();
  const [symptomName, setSymptomName] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState('');
  const [remedies, setRemedies] = useState('');
  const [treatmentOrMedication, setTreatmentOrMedication] = useState('');
  const [sideEffects, setSideEffects] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomName.trim()) return;
    addNote({
      date,
      symptomName: symptomName.trim(),
      severity,
      notes: notes.trim(),
      remedies: remedies.trim(),
      treatmentOrMedication: treatmentOrMedication.trim() || undefined,
      sideEffects: sideEffects.trim() || undefined,
    });
    setSaved(true);
    setSymptomName('');
    setNotes('');
    setRemedies('');
    setTreatmentOrMedication('');
    setSideEffects('');
    setSeverity(5);
    setDate(format(new Date(), 'yyyy-MM-dd'));
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="new-note-page">
      <h2 className="page-title">{t('newNote.title')}</h2>
      <p className="page-desc">{t('newNote.description')}</p>
      <form onSubmit={handleSubmit} className="note-form">
        <label>
          <span>{t('newNote.symptom')}</span>
          <input
            type="text"
            value={symptomName}
            onChange={(e) => setSymptomName(e.target.value)}
            placeholder={t('newNote.placeholders.symptom')}
            required
          />
        </label>
        <label>
          <span>{t('newNote.date')}</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          <span>{t('newNote.severity')}: {severity} — {t(`newNote.severityLabels.${severity}`)}</span>
          <input
            type="range"
            min={1}
            max={10}
            value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))}
            className="severity-slider"
          />
        </label>
        <label>
          <span>{t('newNote.affecting')}</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t('newNote.placeholders.affecting')}
            rows={3}
          />
        </label>
        <label>
          <span>{t('newNote.remedies')}</span>
          <textarea
            value={remedies}
            onChange={(e) => setRemedies(e.target.value)}
            placeholder={t('newNote.placeholders.remedies')}
            rows={2}
          />
        </label>
        <label>
          <span>{t('newNote.treatment')}</span>
          <input
            type="text"
            value={treatmentOrMedication}
            onChange={(e) => setTreatmentOrMedication(e.target.value)}
            placeholder={t('newNote.placeholders.treatment')}
          />
        </label>
        <label>
          <span>{t('newNote.sideEffects')}</span>
          <input
            type="text"
            value={sideEffects}
            onChange={(e) => setSideEffects(e.target.value)}
            placeholder={t('newNote.placeholders.sideEffects')}
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={!symptomName.trim()}>
            {t('newNote.save')}
          </button>
          {saved && <span className="saved-msg">{t('newNote.saved')}</span>}
        </div>
      </form>
      <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
        {t('newNote.viewCalendar')}
      </button>
    </div>
  );
}
