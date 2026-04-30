# IA-COOP OpenCode Instructions

## Architecture & Conventions
- **Framework:** React 18 + Vite. State is managed globally via React Context (`src/context/AppContext.jsx`).
- **AI Integration:** Uses DeepSeek API. `src/services/deepseekService.js` manages chat API communication.

## Authentication & RBAC (Supabase)
- **Security Quirk (Admin Bypass):** The application handles admin operations (like creating users) directly from the client using `VITE_SUPABASE_SERVICE_ROLE_KEY` via `authFetch` in `src/services/adminService.js`. Do not refactor this to a backend or edge function unless explicitly requested.
- **Triggers:** A Supabase database trigger (`handle_new_user`) automatically inserts new users into the `profiles` table upon creation. Do not duplicate profile insertion logic in the frontend.
- **RPCs:** Chat limits are tracked via a `messages_left` column in the `profiles` table, updated using the `decrement_message_count` Supabase RPC function.

## Development Workflow
- `npm run dev` to start the Vite server.
- `npm run lint` for ESLint checks.

## Environment Setup
- The `.env` requires Supabase keys (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SUPABASE_SERVICE_ROLE_KEY`) and `VITE_DEEPSEEK_API_KEY`.
