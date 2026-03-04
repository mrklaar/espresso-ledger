# Espresso Ledger

A personal espresso shot tracking app. Log your brewing parameters, tasting notes, and equipment setup to dial in the perfect shot.

## Features

- **Dashboard** — overview of recent shots with key stats (avg dose, yield, time, rating)
- **Shot Logging** — comprehensive form covering dose, yield, grind, temperature, extraction time, pre-infusion, puck prep tools, tasting profile, and quality observations
- **Shot History** — searchable, sortable, filterable list of all logged shots
- **Shot Detail** — full view with tasting profile bars and equipment tags
- **Settings** — configure your machine, grinder, puck prep tools (WDT, RDT, blind shaker, mesh screen, paper filters), and set default values for new shots

## Tech Stack

- **React 19** + **Vite 7** (single-page app)
- **React Router** for navigation
- **localStorage** for persistence (no backend needed, works offline)
- **Pure CSS** with a coffee-themed design

## Getting Started

```bash
git clone https://github.com/mrklaar/espresso-ledger.git
cd espresso-ledger
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
```

Static files are output to `dist/`. Deploy to GitHub Pages, Netlify, Vercel, or any static host.

## Brewing Parameters Tracked

| Category | Fields |
|---|---|
| Bean Info | Name, roaster, origin, roast level, roast date, process |
| Brewing | Dose (g), yield (g), brew ratio (auto), grind setting, temperature, extraction time |
| Pre-infusion | Enabled toggle, time, pressure |
| Puck Prep | WDT, RDT, blind shaker, mesh screen, paper filter (top/bottom), distributor |
| Tasting | Acidity, sweetness, body, bitterness (1-5), flavor notes |
| Quality | Channeling observed, crema quality, overall rating (1-5 stars) |
| Notes | Free-form text field |

## License

MIT
