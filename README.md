# Alchemist's Grimoire (Insight-X)

## 🧙‍♂️ Introduction

**Alchemist's Grimoire** is a modern solution to a timeless problem: medication adherence. A staggering 50% of medications for chronic diseases are not taken as prescribed, leading to severe health consequences. Our application tackles this by providing an intelligent, user-friendly platform for managing medications, tracking adherence, and gaining valuable health insights through AI-powered assistants.

This repository is a monorepo containing both the client-side (frontend) and server-side (backend) of the application.

---

## 🚀 Overall Project Flow

The application follows a classic client-server architecture. The user interacts with the React-based frontend, which makes API calls to the Express.js backend. The backend handles business logic, interacts with the MongoDB database, and communicates with external AI services.

Here's a simplified flow:

1.  **Authentication:** The user signs up or logs in. The backend verifies the credentials and returns a JWT token.
2.  **Dashboard:** The frontend uses the JWT token to fetch the user's medication schedule and adherence statistics from the backend.
3.  **Medication Management:** The user can add new medications. The frontend sends the medication details to the backend, which stores them in the database.
4.  **Notifications:** The backend includes a scheduler that creates and sends notifications to the user about upcoming or missed doses.
5.  **AI Agents:** The user can chat with various AI health assistants. The frontend sends the user's query to a specific backend endpoint, which then uses LangChain and a designated AI model (like Google's Generative AI or Groq) to generate a response.

---

## Client-Side

The client-side is a modern, responsive React application built with Vite. It provides a beautiful and intuitive interface for users to manage their health.

### ✨ Features

* **Secure Authentication:** JWT-based login and signup.
* **Intuitive Dashboard:** At-a-glance view of today's medication schedule, adherence rate, and streak.
* **Medication Management:** Easily add, view, and update medication schedules.
* **Smart Notifications:** A dedicated page to view all medication reminders and alerts.
* **AI-Powered Health Agents:** A multi-agent chat interface to interact with specialized AI assistants for medical knowledge, personal health tracking, medication information, and emergency triage.
* **Health Profile:** A section for users to manage their personal health information.

### 🛠️ Tech Stack

* **Framework:** React 19
# Alchemist's Grimoire (Insight-X)

Comprehensive README: project overview, setup, and a file-by-file explanation so contributors can quickly understand the codebase.

## Table of contents

- Project summary
- Quick setup (dev + production)
- Environment variables
- Client (frontend) — structure and file explanations
- Server (backend) — structure and file explanations
- How to contribute
- Troubleshooting & notes

---

## Project summary

Alchemist's Grimoire (a.k.a Insight-X) is a medication-adherence assistant: a React frontend + Express backend that helps users manage medications, receive reminders/notifications, maintain health profiles, and interact with AI-powered health agents.

This repository is a monorepo with two main packages:

- `client/` — React + Vite frontend
- `server/` — Node.js + Express backend

Both sides communicate over a JSON REST API (and WebSockets for realtime events).

---

## Quick setup

Prerequisites:

- Node.js (18+ recommended)
- npm
- MongoDB (remote or local)

Root-level common steps:

1. Clone the repo and open workspace root.
2. Create a `.env` files as described below for server and client (if needed).

Client (development):

```powershell
cd client
npm install
npm run dev
```

Server (development):

```powershell
cd server
npm install
npm run dev
```

Server start (production-like):

```powershell
cd server
npm start
```

The client defaults to Vite's dev server (port 5173). The server listens on port configured via env (default 8080 in README notes).

---

## Environment variables

Create `server/.env` with at least:

- MONGODB_URI — connection string to MongoDB
- JWT_SECRET — secret for signing tokens
- GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET — for Google OAuth (if used)
- PORT — optional server port
- Any API keys required by LangChain/LLM providers (e.g., GOOGLE_API_KEY, GROQ_KEY, HUGGINGFACE_TOKEN)

The client may optionally need an API base URL override (if not using a proxy).

---

## Client — structure & file usecases

Path: `client/`

Top-level important files

- `package.json` — scripts and dependencies. Key scripts: `dev`, `build`, `preview`.
- `vite.config.js` — Vite configuration.
- `index.html` — app host.

Source files: `client/src/`

- `main.jsx` — client entry point, renders `<App />` and wraps providers.
- `App.jsx` — routes and global layout; mounts pages and shared components.
- `global.css` — global styles.

Pages (`src/pages`)

- `landingPage.jsx` — public landing / marketing page.
- `Login.jsx` / `Signup.jsx` — auth pages.
- `Dashboard.jsx` — main protected dashboard showing today's medicines, adherence stats, and navigation.
- `addMedication.jsx` — form and flow for adding a new medication.
- `agents.jsx` — multi-agent chat UI to interact with AI assistants (medical, emergency, personal health, report analysis).
- `ConnectCalendar.jsx` — UI for connecting Google Calendar.
- `Notifications.jsx` — lists/controls for scheduled notifications and history.
- `HealthProfile.jsx` — view/edit personal health profile.

Reusable components (`src/components`)

- `Navbar.jsx` — top navigation bar.
- `ProtectedRoute.jsx` — route wrapper that enforces authentication and redirects to login.
- `NotificationToast.jsx` — toast UI for in-app notifications.

Context providers (`src/context`)

- `medicationContext.jsx` — manages medication state, CRUD operations, and provides helper methods to components.
- `notificationContext.jsx` — manages notifications state and socket interactions.
- `socketContext.jsx` — provides socket connection and helpers for real-time events.
- `calendarSyncContext.jsx` — manages state related to Google Calendar sync.

Services

- `src/services/socketService.js` — wraps `socket.io-client` usage and reconnect logic.

Assets and static files

- `src/assets/*` — images and icons used in the UI.

Notes and assumptions

- The client uses React Context for state; adding Redux or Zustand is possible but not present.
- The client uses Axios for HTTP requests; look for a default base URL in the code (or the environment config).

---

## Server — structure & file usecases

Path: `server/`

Top-level

- `package.json` — server scripts (important: `dev` runs nodemon, `start` runs node). Dependencies for LangChain, Mongoose, Express, etc.
- `src/index.js` — server entry point (sets up Express, routes, middlewares, DB connection, and socket.io integration).

Main folders

- `src/routes/` — Express route definitions. Each file groups endpoints by feature.
    - `auth.js` — authentication endpoints (signup, login, token refresh, possibly OAuth). Uses `src/api` controllers.
    - `medicineRoutes.js` — endpoints to add, update, fetch, delete medications.
    - `notificationRoutes.js` — endpoints to manage notifications and mark them as sent/received.
    - `calendarSyncRoutes.js` — endpoints to connect/authorize calendar sync (Google Calendar flows).
    - `reportRoutes.js` — endpoints to request report generation, search or download reports.
    - `analytics.js` — analytics endpoints for dashboards and metrics.
    - `agentsRoutes.js` — endpoints to interact with the AI agents (medical, emergency, personal health, report analysis).
    - `oauth.js` — OAuth callback and related flows for third-party provider connections.

- `src/api/` — controllers: functions implementing business logic for routes. Examples:
    - `addMedicineController.js` — logic for validating request + persisting medication to DB.
    - `todaysMedicineController.js` — computes today's scheduled meds for a user.
    - `statusMedicineController.js` — marks medicine taken/missed etc.
    - `notificationController.js` — schedules or dispatches notifications.
    - `calendarSyncController.js` — orchestrates calendar connection and event creation.
    - `analyticsController.js` — aggregates data for charts/metrics.
    - `reportController.js` — orchestrates report generation (PDF parsing, analysis, storage).
    - `googleAuth.js` — Google OAuth helper controller.

- `src/models/` — Mongoose schemas and models:
    - `User.js` — user schema (email, password hash, profile info, tokens or provider IDs).
    - `medicineModel.js` — medication schema (name, dose, schedule, userId, reminders).
    - `todayMedicine.js` — representation of computed schedule for a day (may store cached items).
    - `todayNotifications.js` — notifications generated for a day.
    - `ReportModel.js` — stores generated reports and metadata.
    - `ConversationModel.js` — stores chat logs with AI agents (if enabled).
    - `HealthProfile.js` — user health profile (height, weight, conditions, allergies).

- `src/middlewares/`:
    - `authMiddleware.js` — verifies JWT and attaches user to req; used by protected routes.

- `src/utils/` — utility helpers and the LLM model wrappers. Important files:
    - `medical_model.js` — LangChain/LLM code tailored to medical queries (prompts, tool setup).
    - `emergency_model.js` — special prompt/handler for emergency triage/response.
    - `medicine_model.js` — helper functions for formatting medicine prompts and parsing LLM responses.
    - `personal_health_model.js` — handles personal health assistant prompts.
    - `reportAnalysis.js` — utilities to analyze PDFs and generate insights (uses `pdf-parse`, `puppeteer`, etc.).
    - `googleCalendar.js` — helpers to interact with Google Calendar API and create events.

Other server-level files

- `src/services/sendNotification.js` — service to push notifications (email, in-app, or other channels).
- `uploads/` — storage place for uploaded files (reports, attachments). Be sure to protect and ignore this in git.

Notes on important patterns

- Controllers are usually thin: validate input, call model/service/util, then return JSON.
- LLM helpers encapsulate prompt engineering and provider configuration. Keep secrets out of repo and rely on env variables.

---

## Files map (quick reference)

Client (high-level):

- `client/package.json` — dev scripts and dependencies.
- `client/src/main.jsx` — app bootstrap.
- `client/src/App.jsx` — routes and providers.
- `client/src/context/*` — state providers: medication, notifications, calendar, socket.
- `client/src/pages/*` — UI pages.
- `client/src/components/*` — shared components (Navbar, ProtectedRoute, NotificationToast).

Server (high-level):

- `server/package.json` — server scripts and dependencies.
- `server/src/index.js` — Express app + DB + socket initialization.
- `server/src/routes/*` — route declarations for each feature.
- `server/src/api/*` — controllers implementing the endpoints.
- `server/src/models/*` — Mongoose schemas and models.
- `server/src/utils/*` — LLM wrappers and other helpers (report analysis, calendar helpers).

---

## How to contribute

1. Fork and create a feature branch.
2. Run the client and server locally and ensure the feature works end-to-end.
3. Add tests where relevant (server controller/unit, client component tests).
4. Open a PR with a clear description and a list of changed files.

Coding conventions

- Follow existing patterns for controllers and model files.
- Keep LLM prompt logic inside `src/utils/*` and avoid leaking secrets.

---

## Troubleshooting & notes

- If the server fails to start, check `.env` and MongoDB connection string.
- For LLM/AI features, ensure API keys are available in environment variables and that required provider packages are installed.
- If socket events are not received by the client, check CORS and socket.io origins in `src/index.js`.

---

If you'd like, I can now:

1. Generate a per-file markdown sub-section that lists every single file found and a short one-line usecase (more verbose than the section above).
2. Create a CONTRIBUTING.md and a small checklist for local setup and testing.

Tell me which of these you'd like next, or if you want the README trimmed to a shorter summary.

---

## Per-file reference (complete)

Below is a compact one-line description for every file in `client/` and `server/` so contributors can quickly locate responsibilities.

Client

- `client/package.json` — npm scripts and dependency manifest for frontend (dev, build, preview).
- `client/vite.config.js` — Vite dev/build configuration.
- `client/README.md` — frontend notes and quickstart specific to the client package.
- `client/package-lock.json` — pinned dependency tree for reproducible installs.
- `client/index.html` — static HTML host page and root element for React.
- `client/eslint.config.js` — ESLint settings for the client codebase.
- `client/.gitignore` — ignore patterns for the client package.
- `client/src/main.jsx` — React entrypoint that mounts `<App />` and registers providers.
- `client/src/global.css` — global styles (Tailwind directives and overrides).
- `client/public/vite.svg` — static asset (logo/example image).
- `client/src/App.jsx` — top-level router, layout and app-level providers.
- `client/src/context/medicationContext.jsx` — medication state manager (CRUD helpers, fetch/today logic).
- `client/src/pages/Dashboard.jsx` — dashboard UI showing today's meds, charts and quick actions.
- `client/src/pages/HealthProfile.jsx` — UI for viewing & editing health profile details.
- `client/src/context/calendarSyncContext.jsx` — state and helpers for Google Calendar sync flows.
- `client/src/pages/ConnectCalendar.jsx` — page to start OAuth/connect flow for Google Calendar.
- `client/src/pages/Analytics.jsx` — analytics dashboard UI (recharts usage).
- `client/src/pages/agents.jsx` — multi-agent chat interface to talk to AI assistants.
- `client/src/pages/addMedication.jsx` — form and submission flow to add medication schedules.
- `client/src/components/ProtectedRoute.jsx` — route wrapper enforcing JWT auth before rendering protected pages.
- `client/src/components/NotificationToast.jsx` — in-app toast component for transient notifications.
- `client/src/context/socketContext.jsx` — provides socket.io connection and event handlers to the tree.
- `client/src/components/Navbar.jsx` — top navigation bar and links.
- `client/src/context/notificationContext.jsx` — manages notification list, marks, and socket-driven updates.
- `client/src/pages/Signup.jsx` — signup page with registration form and validations.
- `client/src/pages/Reports.jsx` — list view for generated/available reports.
- `client/src/pages/ReportChat.jsx` — chat UI for interacting with report-specific agents.
- `client/src/pages/ReportAnalysis.jsx` — page to display results of report analysis and extracted insights.
- `client/src/pages/OAuthCallback.jsx` — page to handle OAuth redirect/callback responses.
- `client/src/pages/notifications.jsx` — full notifications page with history and management actions.
- `client/src/pages/Login.jsx` — login form, JWT receive and storage flow.
- `client/src/pages/landingPage.jsx` — public landing page and marketing content.
- `client/src/services/socketService.js` — socket.io-client wrapper with connect/emit/receive helpers.
- `client/src/assets/react.svg` — image asset.

Server

- `server/.gitignore` — ignore patterns for server package.
- `server/package.json` — server scripts (`start`, `dev`) and dependency list.
- `server/package-lock.json` — server dependency lockfile.
- `server/src/models/User.js` — Mongoose user schema (auth fields + profile data).
- `server/src/models/todayNotifications.js` — schema for daily notifications stored/cached for a user.
- `server/src/models/todayMedicine.js` — schema representing computed daily medicine schedule (cache/derived items).
- `server/src/api/todaysMedicineController.js` — controller returning today's medicine schedule.
- `server/src/models/ReportModel.js` — schema to store report metadata, file paths and results.
- `server/src/api/streakController.js` — controller that calculates and updates medication adherence streaks.
- `server/src/models/medicineModel.js` — medicine schema: name, dose, schedule, user, reminders.
- `server/src/models/HealthProfile.js` — health profile schema for storing user's health attributes.
- `server/src/api/statusMedicineController.js` — marks medication as taken/missed and updates state.
- `server/src/models/ConversationModel.js` — stores AI conversation logs for audit/history.
- `server/src/api/reportController.js` — handles uploads, triggers analysis, and persists report results.
- `server/src/api/notificationController.js` — CRUD and dispatch endpoints for notifications.
- `server/src/api/googleAuth.js` — helper/controller for Google OAuth flows and token exchange.
- `server/src/api/calendarSyncController.js` — coordinates calendar event creation and sync with Google Calendar.
- `server/src/api/analyticsController.js` — aggregates metrics (adherence, usage) for dashboards.
- `server/src/api/addMedicineController.js` — validates and saves new medicine documents to DB.
- `server/test/data/05-versions-space.pdf` — test sample PDF for report analysis development.
- `server/src/index.js` — Express server boot: middleware, DB connect, route wiring, and socket.io.
- `server/src/routes/reportRoutes.js` — HTTP endpoints for report actions (upload, fetch, analyze).
- `server/src/routes/oauth.js` — OAuth endpoints and callback route definitions.
- `server/src/routes/notificationRoutes.js` — routes for notification lifecycle (list, update, ack).
- `server/src/routes/medicineRoutes.js` — routes for medication CRUD and status updates.
- `server/src/routes/healthRoutes.js` — endpoints for health profile read/write.
- `server/src/routes/calendarSyncRoutes.js` — routes for calendar auth and sync tooling.
- `server/src/routes/auth.js` — signup/login endpoints, token issuance.
- `server/src/routes/analytics.js` — routes to return analytics datasets for the client.
- `server/src/routes/agentsRoutes.js` — entrypoints for agent queries (medical, emergency, personal health).
- `server/src/services/sendNotification.js` — encapsulates notification delivery (node-notifier / push adapters).
- `server/src/utils/reportAnalysis.js` — parsing and analysis utilities (pdf-parse, puppeteer scraping, heuristics).
- `server/src/utils/personal_health_model.js` — LangChain prompt builder for personal-health assistant.
- `server/src/utils/medicine_model.js` — helpers for medication-specific prompt engineering and parsing.
- `server/src/utils/medical_model.js` — LLM wrapper for medical-knowledge queries.
- `server/src/utils/googleCalendar.js` — Google Calendar API wrapper and helpers for event creation.
- `server/src/utils/emergency_model.js` — emergency triage prompt + handler for urgent guidance from LLMs.
- `server/src/middlewares/authMiddleware.js` — protects routes by verifying JWT and attaching user object.

---

## Feature workflows (how each major feature works and which files are involved)

Below are end-to-end workflows for the main features — each step lists the primary files involved so you can trace the implementation.

1) Authentication (signup / login / token handling)

- Flow summary: user submits credentials -> server verifies -> server returns JWT -> client stores token -> client attaches token to API requests.
- Client files: `src/pages/Login.jsx`, `src/pages/Signup.jsx`, `src/context/*` (contexts often read/store token), `src/components/ProtectedRoute.jsx` (enforces token presence).
- Server files: `src/routes/auth.js` (routes), `src/api/*` controllers for signup/login (e.g., validate input, hash password), `src/models/User.js` (user schema), `src/middlewares/authMiddleware.js` (validates token on protected endpoints).
- Typical sequence:
    1. User posts to `POST /api/auth/signup` or `POST /api/auth/login` -> `auth.js` routes to controller.
    2. Controller checks credentials (bcrypt/hash) and issues JWT signed with `JWT_SECRET`.
    3. Client stores token (localStorage or memory context) and navigates to `Dashboard`.
    4. `ProtectedRoute.jsx` reads token, optionally validates by calling server `/me` endpoint, then allows route rendering.

2) Medication lifecycle (add, schedule, take, status)

- Flow summary: user adds medicine -> server stores `medicineModel` -> scheduler generates notifications / `todayMedicine` entries -> user marks dose taken -> `statusMedicineController` updates status and streak.
- Client files: `src/pages/addMedication.jsx` (form), `src/context/medicationContext.jsx` (calls API + updates UI), `src/pages/Dashboard.jsx` (shows today's meds).
- Server files: `src/routes/medicineRoutes.js`, `src/api/addMedicineController.js`, `src/api/todaysMedicineController.js`, `src/api/statusMedicineController.js`, `src/models/medicineModel.js`, `src/models/todayMedicine.js`.
- Typical sequence:
    1. Client posts new medication to `POST /api/medicine` -> `addMedicineController` validates and saves `medicineModel`.
    2. A background scheduler or on-demand endpoint computes today's doses and writes `todayMedicine` entries (used by `todaysMedicineController`).
    3. Client fetches `/api/medicine/today` to render the dashboard.
    4. When the user marks taken/missed, client calls `/api/medicine/:id/status` -> `statusMedicineController` updates `todayMedicine` and `medicineModel` as needed and triggers streak recalculation via `streakController`.

3) Notifications lifecycle (create, deliver, acknowledge)

- Flow summary: server schedules notifications -> pushes via socket or local notifier -> client shows toast and persists history.
- Client files: `src/context/notificationContext.jsx`, `src/components/NotificationToast.jsx`, `src/services/socketService.js`, `src/context/socketContext.jsx`.
- Server files: `src/api/notificationController.js`, `src/services/sendNotification.js`, `src/models/todayNotifications.js`, `src/index.js` (socket emit).
- Typical sequence:
    1. Server (scheduler or on-demand) creates notification records in `todayNotifications` and uses `sendNotification.js` to deliver (for local testing, `node-notifier`, for real deployment, push/email).
    2. For realtime delivery, server emits socket events from `src/index.js` -> client `socketService` receives and `notificationContext` updates UI and shows `NotificationToast`.
    3. Client can acknowledge a notification via an API call to `notificationRoutes` which marks it as read.

4) Calendar sync (Google Calendar integration)

- Flow summary: user initiates connect -> client opens OAuth flow -> server handles callback -> server stores tokens -> controller creates calendar events for scheduled meds.
- Client files: `src/pages/ConnectCalendar.jsx`, `src/pages/OAuthCallback.jsx`, `src/context/calendarSyncContext.jsx`.
- Server files: `src/routes/oauth.js`, `src/api/googleAuth.js`, `src/api/calendarSyncController.js`, `src/utils/googleCalendar.js`.
- Typical sequence:
    1. Client navigates to `ConnectCalendar` and calls server `/api/oauth/google` to get auth URL.
    2. User consents with Google and Google hits `/api/oauth/callback` -> `oauth.js` -> `googleAuth.js` exchanges code for tokens and stores refresh token on user profile.
    3. When medicines are scheduled, `calendarSyncController` or a background job creates calendar events via `googleCalendar.js` using stored tokens.

5) AI Agents (medical assistant, emergency triage, personal health, report chat)

- Flow summary: client sends user's prompt + context to agents endpoint -> server uses LangChain helpers to build prompts -> provider (Groq/Google/ HuggingFace) returns structured text -> controller returns to client and optionally stores chat in `ConversationModel`.
- Client files: `src/pages/agents.jsx`, `src/pages/ReportChat.jsx`, any chat UI components.
- Server files: `src/routes/agentsRoutes.js`, `src/api/reportController.js` (for report-specific agents), `src/utils/medical_model.js`, `src/utils/emergency_model.js`, `src/utils/personal_health_model.js`, `src/models/ConversationModel.js`.
- Typical sequence:
    1. Client posts to `/api/agents/medical` with user input.
    2. `agentsRoutes` forwards to an appropriate util (e.g., `medical_model`) which builds the LangChain prompt and calls provider SDK.
    3. Server receives LLM response, formats it, stores conversation (optional), and returns payload to client.
    4. Client displays the response in the chat UI and may offer follow-up actions (create calendar event, escalate to emergency flow).

6) Report upload & analysis (PDF parsing + insights)

- Flow summary: user uploads PDF -> `reportController` stores file -> `reportAnalysis.js` extracts text and runs analysis (LLM) -> results persisted in `ReportModel` and returned to client.
- Client files: `src/pages/ReportAnalysis.jsx`, `src/pages/Reports.jsx` (upload + results view).
- Server files: `src/routes/reportRoutes.js`, `src/api/reportController.js`, `src/utils/reportAnalysis.js`, `src/models/ReportModel.js`.
- Typical sequence:
    1. Client uploads PDF via `POST /api/reports/upload` -> `reportController` stores file in `uploads/`.
    2. Controller triggers `reportAnalysis.js` which uses `pdf-parse` and optionally `puppeteer` to extract content and call LLMs for structured insights.
    3. Results saved to `ReportModel` and client can fetch analysis or view reports list.

7) Analytics & streaks (dashboard metrics)

- Flow summary: server aggregates usage and adherence data -> client fetches analytic endpoints to render charts.
- Client files: `src/pages/Analytics.jsx`, chart components.
- Server files: `src/api/analyticsController.js`, `src/api/streakController.js`, routes under `analytics.js`.
- Typical sequence:
    1. Client calls `/api/analytics/summary` or similar.
    2. `analyticsController` queries `medicineModel`, `todayMedicine`, `ReportModel`, and computes aggregates for charts.
    3. Client renders charts and uses `streakController` to show ongoing adherence streaks.

8) Realtime architecture (socket events and notifications)

- Flow summary: server boots `socket.io` in `src/index.js` -> emits events (new notification, conversation updates) -> client listens with `socketService` and updates contexts/UI.
- Client files: `src/services/socketService.js`, `src/context/socketContext.jsx`, `notificationContext.jsx`.
- Server files: `src/index.js` (socket server), controllers that call `io.emit` when relevant.

---

If you want, I can now commit this file-mapping and workflows as a separate `FILE_MAP.md` instead of appending to `README.md`. I can also expand any workflow step into a sequence diagram or a short sequence of code pointers (for example, show the exact route names and sample request/response payloads). Which do you prefer?
