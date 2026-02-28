import { createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useNotes } from './hooks/useNotes';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { CalendarPage } from './pages/CalendarPage';
import { NewNotePage } from './pages/NewNotePage';
import { TrendsPage } from './pages/TrendsPage';
import { NotesListPage } from './pages/NotesListPage';
import './App.css';

export const NotesContext = createContext<ReturnType<typeof useNotes> | null>(null);

function App() {
  const notesContext = useNotes();
  const { t } = useTranslation();

  return (
    <NotesContext.Provider value={notesContext}>
      <BrowserRouter>
        <div className="app">
          <header className="app-header">
            <div className="app-header-top">
              <h1 className="app-title">{t('app.title')}</h1>
              <LanguageSwitcher />
            </div>
            <p className="app-tagline">{t('app.tagline')}</p>
          </header>
          <nav className="app-nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('nav.calendar')}
            </NavLink>
            <NavLink to="/new" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('nav.newNote')}
            </NavLink>
            <NavLink to="/trends" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('nav.trends')}
            </NavLink>
            <NavLink to="/notes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('nav.allNotes')}
            </NavLink>
          </nav>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<CalendarPage />} />
              <Route path="/new" element={<NewNotePage />} />
              <Route path="/trends" element={<TrendsPage />} />
              <Route path="/notes" element={<NotesListPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </NotesContext.Provider>
  );
}

export default App;
