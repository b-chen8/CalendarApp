# Symptom Tracker — HackRare2026

A calendar app to track symptoms, log how they affect you, and visualize severity over time. Built so you can see if a symptom is recurring, whether treatment is helping, and share trends with your healthcare provider.

## Features

- **Symptom notes** — Log the symptom name, severity (1–10), how it affects you, remedies that helped, and optional treatment/medication and side effects.
- **Calendar view** — Monthly calendar with dots for days that have notes (green = mild, yellow = moderate, red = severe). Tap a day to see that day’s notes.
- **Trends** — Pick a symptom and see a line graph of severity over time. Helps spot patterns and whether treatment is working.
- **All notes** — List all notes with filters by symptom and sort by date or severity.
- **Multilingual** — UI and date formatting in **English**, **Spanish (Español)**, and **French (Français)**. Use the language dropdown in the header to switch; preference is saved in your browser.

Data is stored in your browser (localStorage). Nothing is sent to a server.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Tech

- React 18 + TypeScript
- Vite
- React Router
- **i18next** + **react-i18next** (multilingual)
- date-fns (with locale-aware date formatting)
- Recharts (for trend graphs)
