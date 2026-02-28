import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { SymptomNote } from '../types';
import { useNotesContext } from '../hooks/useNotesContext';
import { useDateLocale } from '../hooks/useDateLocale';
import './TrendsPage.css';

export function TrendsPage() {
  const { t } = useTranslation();
  const locale = useDateLocale();
  const { getUniqueSymptomNames, getNotesForSymptom } = useNotesContext();
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const symptomNames = getUniqueSymptomNames();

  const chartData = useMemo(() => {
    if (!selectedSymptom) return [];
    const notes = getNotesForSymptom(selectedSymptom);
    return notes.map((n: SymptomNote) => ({
      date: n.date,
      dateLabel: format(parseISO(n.date), 'MMM d', { locale }),
      severity: n.severity,
      notes: n.notes.slice(0, 40) + (n.notes.length > 40 ? '…' : ''),
    }));
  }, [selectedSymptom, getNotesForSymptom, locale]);

  const hasEnoughData = chartData.length >= 2;

  return (
    <div className="trends-page">
      <h2 className="page-title">{t('trends.title')}</h2>
      <p className="page-desc">{t('trends.description')}</p>
      {symptomNames.length === 0 ? (
        <p className="empty-state">{t('trends.emptyNoNotes')}</p>
      ) : (
        <>
          <label className="trends-picker">
            <span>{t('trends.chooseSymptom')}</span>
            <select
              value={selectedSymptom ?? ''}
              onChange={(e) => setSelectedSymptom(e.target.value || null)}
            >
              <option value="">{t('trends.selectSymptom')}</option>
              {symptomNames.map((name: string) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          {selectedSymptom && (
            <>
              {chartData.length === 0 ? (
                <p className="empty-state">{t('trends.emptyNoData', { symptom: selectedSymptom })}</p>
              ) : !hasEnoughData ? (
                <p className="empty-state">{t('trends.emptyNeedMore', { symptom: selectedSymptom })}</p>
              ) : (
                <div className="chart-wrap">
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis
                        dataKey="dateLabel"
                        stroke="var(--text-muted)"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[1, 10]}
                        stroke="var(--text-muted)"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-sm)',
                          color: 'var(--text)',
                        }}
                        labelStyle={{ color: 'var(--text-muted)' }}
                        formatter={(value: number) => [`${t('trends.severity')}: ${value}/10`, t('trends.severity')]}
                        labelFormatter={(_, payload) => payload?.[0]?.payload?.dateLabel ?? ''}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="severity"
                        name={t('trends.severity')}
                        stroke="var(--accent)"
                        strokeWidth={2}
                        dot={{ fill: 'var(--accent)', r: 4 }}
                        connectNulls
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
              {chartData.length > 0 && (
                <div className="trends-notes-list">
                  <h3>{t('trends.recentEntries', { symptom: selectedSymptom })}</h3>
                  <ul>
                    {chartData.slice(-5).reverse().map((d: { date: string; dateLabel: string; severity: number }) => {
                      const full = getNotesForSymptom(selectedSymptom).find((n: SymptomNote) => n.date === d.date);
                      return (
                        <li key={d.date}>
                          <strong>{d.dateLabel}</strong> — {t('trends.severity')} {d.severity}/10
                          {full?.remedies && (
                            <span className="remedy"> · {t('trends.remedies')}: {full.remedies}</span>
                          )}
                          {full?.treatmentOrMedication && (
                            <span className="treatment"> · {t('trends.treatment')}: {full.treatmentOrMedication}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
