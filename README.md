# GPT Онлайн на русском без регистрации

## Overview
A minimal skeleton for a web‑app that mimics the ChatGPT UI, offers a free quota of requests to a 15B LLM via OpenRouter, then falls back to a smaller model. Ads are displayed as placeholders, and subscription tiers are stubbed out.

## Tech Stack
- **Backend** – Python 3.11, FastAPI, SQLAlchemy (MySQL dialect), Docker.
- **Frontend** – React 18, Vite, Tailwind CSS, Docker.
- **Database** – MySQL (docker image).
- **LLM** – OpenRouter remote API (stubbed in code).

## Quick Start (local development)
```bash
# Clone the repo (already in workspace)
cd C:\Users\sem\Desktop\GPT-Website

# Build and start containers
docker compose up --build -d
```
The backend will be reachable at `http://localhost:8000`, the frontend at `http://localhost:5173`.

## Backend
- Entry point: `backend/app/main.py`
- Environment variables (create a `.env` file or set in Docker):
  - `MYSQL_URL` – MySQL DSN, e.g. `mysql+pymysql://user:password@db:3306/gptdb`
  - `SESSION_SECRET` – secret for signed session cookie.
  - `OPENROUTER_API_KEY` – **optional**; replace the placeholder generator with a real call.

## Frontend
- Development server: `npm run dev` (run inside `frontend` folder).
- Build for production: `npm run build`.
- Tailwind CSS is pre‑configured; edit `src/index.css` for custom styles.

## Project Structure
```
.
├─ backend
│  ├─ app
│  │  ├─ main.py       # FastAPI application
│  │  ├─ database.py   # SQLAlchemy engine & Base
│  │  ├─ models.py      # Session model
│  │  ├─ schemas.py     # Pydantic request/response schemas
│  │  └─ routers.py     # /api/chat endpoint
│  └─ requirements.txt
├─ frontend
│  ├─ src
│  │  ├─ main.jsx
│  │  ├─ App.jsx
│  │  └─ components
│  │     ├─ ChatWindow.jsx
│  │     ├─ AdBanner.jsx
│  │     ├─ AdPopup.jsx
│  │     └─ SubscriptionModal.jsx
│  ├─ index.html
│  ├─ package.json
│  └─ tailwind.config.js
├─ docker-compose.yml
└─ README.md
```

## Next Steps
- Replace placeholder `generate_answer` in `backend/app/routers.py` with a real OpenRouter HTTP call using `httpx` and the `OPENROUTER_API_KEY`.
- Implement real subscription handling (Stripe or other) and persist subscription data.
- Flesh out ad content (HTML/JS) and integrate UI toggles based on subscription status.
- Add unit and integration tests (pytest, httpx AsyncClient).
