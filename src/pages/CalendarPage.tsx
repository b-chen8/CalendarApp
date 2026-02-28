import { useState, useMemo } from 'react';
import { addDays, subMonths, addMonths, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay } from 'date-fns';
import type { SymptomNote } from '../types';
import { useTranslation } from 'react-i18next';
import { useNotesContext } from '../hooks/useNotesContext';
import { useDateLocale } from '../hooks/useDateLocale';
import { NoteDetailModal } from '../components/NoteDetailModal';
import './CalendarPage.css';

export function CalendarPage() {
  const { t } = useTranslation();
  const locale = useDateLocale();
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { getNotesForDate } = useNotesContext();

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days: Date[] = [];
  let d = calStart;
  while (d <= calEnd) {
    days.push(d);
    d = addDays(d, 1);
  }

  const weekDays = useMemo(() => {
    const base = new Date(2024, 0, 7); // Sunday
    return [0, 1, 2, 3, 4, 5, 6].map((i) => format(addDays(base, i), 'EEE', { locale }));
  }, [locale]);

  return (
    <div className="calendar-page">
      <div className="calendar-nav">
        <button type="button" onClick={() => setViewDate((d) => subMonths(d, 1))} aria-label={t('calendar.prevMonth')}>
          ←
        </button>
        <h2 className="calendar-month-title">{format(viewDate, 'MMMM yyyy', { locale })}</h2>
        <button type="button" onClick={() => setViewDate((d) => addMonths(d, 1))} aria-label={t('calendar.nextMonth')}>
          →
        </button>
      </div>
      <div className="calendar-grid">
        {weekDays.map((wd) => (
          <div key={wd} className="calendar-weekday">
            {wd}
          </div>
        ))}
        {days.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const dayNotes = getNotesForDate(dateStr);
          const isCurrentMonth = isSameMonth(day, viewDate);
          const isToday = isSameDay(day, new Date());
          return (
            <button
              key={dateStr}
              type="button"
              className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${dayNotes.length ? 'has-notes' : ''}`}
              onClick={() => setSelectedDate(dateStr)}
              aria-label={`${format(day, 'EEEE, MMMM d', { locale })}${dayNotes.length ? `, ${t('calendar.notesCount', { count: dayNotes.length })}` : ''}`}
            >
              <span className="day-num">{format(day, 'd')}</span>
              {dayNotes.length > 0 && (
                <span className="day-dots" title={t('calendar.symptomNotesCount', { count: dayNotes.length })}>
                  {dayNotes.slice(0, 3).map((n: SymptomNote) => (
                    <span
                      key={n.id}
                      className="severity-dot"
                      data-severity={n.severity <= 3 ? 'low' : n.severity <= 6 ? 'mid' : 'high'}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="calendar-legend">
        <span><span className="severity-dot" data-severity="low" /> {t('calendar.mild')}</span>
        <span><span className="severity-dot" data-severity="mid" /> {t('calendar.moderate')}</span>
        <span><span className="severity-dot" data-severity="high" /> {t('calendar.severe')}</span>
      </div>
      {selectedDate && (
        <NoteDetailModal
          date={selectedDate}
          notes={getNotesForDate(selectedDate)}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}
