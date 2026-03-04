# CLAUDE.md — Espresso Ledger

This file provides guidance for AI assistants (Claude Code and similar) working in this repository.

## Project Overview

**Espresso Ledger** is a single-page web application for tracking espresso brewing metadata. Users log each espresso shot with detailed parameters (dose, yield, grind, temperature, extraction time, tasting notes) and manage their equipment profile (WDT tool, RDT, blind shaker, mesh screen, paper filters, etc.).

- **No backend** — all data persisted in `localStorage`
- **Works offline** — no server or database required
- **Runs anywhere** — clone, `npm install`, `npm run dev`

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 7 |
| Routing | React Router v7 |
| State | React Context + localStorage |
| Styling | Pure CSS (coffee-themed, custom properties) |
| IDs | `uuid` v13 |
| Linting | ESLint 9 |

## Directory Structure

```
espresso-ledger/
├── CLAUDE.md               # This file (AI assistant guide)
├── README.md               # Human-facing project description
├── index.html              # Vite entry HTML
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/                 # Static assets
└── src/
    ├── main.jsx            # React root mount
    ├── App.jsx             # Router + context providers
    ├── index.css           # All styles (coffee-themed)
    ├── components/
    │   ├── Layout.jsx      # Header, nav, <Outlet>
    │   ├── ShotCard.jsx    # Shot summary card (used in lists)
    │   ├── RatingStars.jsx # Interactive 1-5 star rating
    │   └── SliderInput.jsx # Range slider for tasting attributes
    ├── context/
    │   ├── ShotContext.jsx  # Shot CRUD + localStorage sync
    │   └── ProfileContext.jsx # Equipment & defaults + localStorage sync
    ├── pages/
    │   ├── Dashboard.jsx   # Overview: stats grid + recent shots
    │   ├── NewShot.jsx     # Log/edit shot form (all brewing params)
    │   ├── ShotHistory.jsx # Filterable, sortable shot list
    │   ├── ShotDetail.jsx  # Full shot view with tasting bars
    │   └── Settings.jsx    # Equipment toggles, machine/grinder, defaults
    └── utils/
        ├── storage.js      # localStorage read/write helpers
        └── defaults.js     # Default profile, empty shot factory, enums
```

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | Dashboard | Stats overview + 5 most recent shots |
| `/new` | NewShot | Form to log a new espresso shot |
| `/edit/:id` | NewShot | Edit an existing shot (same form) |
| `/history` | ShotHistory | All shots with search, sort, filter |
| `/shot/:id` | ShotDetail | Full detail view of a single shot |
| `/settings` | Settings | Equipment, machine, grinder, defaults |

## Data Models

### Shot (stored in `localStorage` key `espresso-ledger-shots`)

Each shot object contains:
- **Bean info**: `beanName`, `roaster`, `origin`, `roastLevel`, `roastDate`, `process`
- **Brewing**: `dose`, `yield`, `brewRatio` (auto-calculated), `grindSetting`, `temperature`, `extractionTime`
- **Pre-infusion**: `preInfusion` (bool), `preInfusionTime`, `preInfusionPressure`
- **Puck prep**: `equipmentUsed` object with toggles for WDT, RDT, blind shaker, mesh screen, paper filters, distributor
- **Tasting**: `acidity`, `sweetness`, `body`, `bitterness` (1-5 scale), `flavorNotes` (free text)
- **Quality**: `channeling` (bool), `cremaQuality`, `rating` (1-5 stars)
- **Meta**: `id` (uuid), `date`, `notes`

### Profile (stored in `localStorage` key `espresso-ledger-profile`)

- `machine`, `grinder` — text fields
- `equipment` — toggles for owned tools (pre-fills new shots)
- `defaults` — default dose, yield, temperature, grind setting

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server (localhost:5173)
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## Key Conventions

### Code Style
- Plain JavaScript (JSX), no TypeScript
- Functional components only, hooks for state
- One component per file, named export for pages, default export for components
- CSS uses custom properties defined in `:root` of `index.css`
- All colors from the coffee palette (`--espresso`, `--dark-roast`, `--crema`, `--accent`, etc.)

### State Management
- `ShotContext` and `ProfileContext` wrap the entire app in `App.jsx`
- Every state mutation immediately syncs to `localStorage` via the context callbacks
- No external state libraries — keep it simple

### Adding New Brewing Parameters
1. Add the field to `createEmptyShot()` in `src/utils/defaults.js`
2. Add the form input in `src/pages/NewShot.jsx`
3. Display it in `src/pages/ShotDetail.jsx`
4. Optionally add it to the compact `ShotCard.jsx`

### Adding New Equipment Toggles
1. Add the key to `defaultProfile.equipment` in `src/utils/defaults.js`
2. Add to the equipment array in `src/pages/Settings.jsx`
3. Add to the puck prep array in `src/pages/NewShot.jsx`
4. Add the display name to `equipmentNames` in `src/pages/ShotDetail.jsx`

### Git
- Commit only relevant files — never use `git add -A` blindly
- Use `git push -u origin <branch-name>` — always specify the branch
- Never skip commit hooks (`--no-verify`)
- Never amend published commits
- Follow [Conventional Commits](https://www.conventionalcommits.org/): `feat(shots): add bloom time parameter`

### General
- Read existing code before modifying it
- Keep changes minimal and focused
- Do not add unnecessary error handling, comments, or abstractions
- All styling goes in `src/index.css` — no CSS modules or inline styles

## Branch Naming

- `main` — stable, production-ready code
- `claude/<session-id>` — AI-generated branches
- `feat/<desc>` / `fix/<desc>` / `chore/<desc>` — human branches

## Deployment

The app builds to `dist/` as static files. Deploy to any static host:
- GitHub Pages
- Netlify
- Vercel
- Any web server serving `index.html` with client-side routing fallback
