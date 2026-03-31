# NNMC HelpDesk Client

## Project Overview
Public helpdesk portal for NNMC (medical institution). Users submit support tickets **without authentication** to IT, medical equipment, and maintenance departments. Tickets are tracked by phone number.

## Tech Stack
- **Framework:** React 18 + Vite 5
- **Styling:** Vanilla CSS with CSS custom properties
- **Fonts:** Inter (Google Fonts)
- **No routing library** — single-page with tab-based navigation
- **No state management library** — local component state + custom hooks

## Architecture

```
src/
├── main.jsx                  # React entry point
├── App.jsx                   # Root orchestrator component
├── styles.css                # Global styles & design tokens
├── config/
│   ├── api.js                # API base URLs, Telegram config
│   └── categories.js         # Category definitions with endpoints & chat IDs
├── hooks/
│   ├── useSearch.js           # Phone-based ticket search with debounce
│   └── useTicketSubmit.js     # Multi-system ticket submission logic
└── components/
    ├── Header.jsx             # Top navigation bar
    ├── HeroSection.jsx        # Landing hero with stats
    ├── SearchPanel.jsx        # Search by phone + results list
    ├── TicketForm.jsx         # Main ticket submission form
    ├── CategoryPicker.jsx     # Category chip selector
    ├── DomainModal.jsx        # Domain account request modal
    ├── TicketCard.jsx         # Individual search result card
    └── SuccessOverlay.jsx     # Submission success feedback
```

## Multi-System Submission
Every ticket is sent to **3 systems simultaneously** via `Promise.all`:
1. **Old Strapi** (`VITE_OLD_API_BASE`) — category-specific legacy endpoints
2. **New Strapi** (`VITE_NEW_API_BASE`) — unified `/api/tickets/public/submit`
3. **Telegram** — department-specific channels via bot API

## Key Endpoints

### Old Strapi (legacy)
| Endpoint | Categories |
|---|---|
| `/api/ernar-and-timurs` | PC, network, printer, cartridge, software |
| `/api/saids` | 1C support |
| `/api/bahadors` | Damumed, MZRK, LIS |
| `/api/skud-zaprosy-help-desks` | Documentolog, SimBase, SKUD |
| `/api/rustams` | Domain account requests |

### New Strapi
- `GET /api/tickets/public/categories` — load service catalog
- `POST /api/tickets/public/submit` — submit ticket

## Environment Variables
```
VITE_OLD_API_BASE=http://192.168.101.25:1337
VITE_NEW_API_BASE=http://192.168.101.50:12005
```

## Commands
```bash
npm run dev       # Dev server on port 5175
npm run build     # Production build
npm run preview   # Preview production build on port 5175
```

## Important Notes
- **Telegram bot token** is in `src/config/api.js` — keep it client-side (intentional, internal network only)
- **Category → endpoint mapping** is in `src/config/categories.js` — each category has `legacyEndpoint`, `chatId`, and optional `isModal` flag
- **Domain account** category opens a special modal form with 10+ fields
- **Search** queries 5 legacy endpoints in parallel, deduplicates, sorts by date
- **Fuzzy matching** maps old category labels to new system service groups via `normalizeKey()`
- App runs on **internal hospital network** (192.168.101.x) — no public internet access needed
