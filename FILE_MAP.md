# Project file map — per-file one-line descriptions

This file is an extracted, machine-friendly file map listing every important file in the repository with a short one-line purpose. Use this as a quick reference to find responsibilities.

## Client

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
- `client/src/components/ProtectedRoute.jsx` — route wrapper enforcing auth before rendering protected pages.
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

## Server

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
- `server/src/routes/agentsRoutes.js` — entrypoints for agent queries (medical, emergency, personal-health).
- `server/src/services/sendNotification.js` — encapsulates notification delivery (node-notifier / push adapters).
- `server/src/utils/reportAnalysis.js` — parsing and analysis utilities (pdf-parse, puppeteer scraping, heuristics).
- `server/src/utils/personal_health_model.js` — LangChain prompt builder for personal-health assistant.
- `server/src/utils/medicine_model.js` — helpers for medication-specific prompt engineering and parsing.
- `server/src/utils/medical_model.js` — LLM wrapper for medical-knowledge queries.
- `server/src/utils/googleCalendar.js` — Google Calendar API wrapper and helpers for event creation.
- `server/src/utils/emergency_model.js` — emergency triage prompt + handler for urgent guidance from LLMs.
- `server/src/middlewares/authMiddleware.js` — protects routes by verifying JWT and attaching user object.

---

If you want these descriptions expanded into short paragraphs for particular files (for example `reportAnalysis.js`, `medical_model.js`, or `src/index.js`), tell me which files and I'll add deeper explanations (3–6 lines each).
