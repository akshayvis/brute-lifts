# Brute Lifts

Private, responsive workout tracker built with React, Vinext and Cloudflare D1 via Sites.

**[Open Brute Lifts](https://brute-lifts.beamingchasm.chatgpt.site)**

## Features
- Four-session round-robin, starting at Lower B; skips hold the rotation.
- Six strength exercises per session with muscle targets, form cues, pounds and per-set actuals.
- Add an extra working or reduced-weight back-off set whenever needed.
- Barbell and dumbbell bench press alternate on Upper A sessions.
- Temporary substitutions restricted to the confirmed equipment catalog; independent exercise histories.
- Elliptical / treadmill prescription and actuals.
- Persistent draft workouts, editable completed actuals, exportable JSON, exercise and cardio charts.
- Optional Easy / Moderate /Hard feedback. Three equal-load sets at the upper rep target rated Easy propose a 5 lb increase, editable before approval. No automatic increases.
- User-scoped database records with optimistic revision checks, explicit Save and unsaved-change warnings.

## Development
Use Node >=22.13 and pnpm. `pnpm install`, `pnpm dev`, `pnpm build`.
Generate schema migrations with `pnpm db:generate`. Hosted migrations are applied by Sites.
Apply generated migrations to local D1 before preview. Local databases are separate from production.
`node --experimental-strip-types tests/model.test.mjs` tests rotation and suggestion behavior.
`pnpm exec tsc --noEmit` checks types.

## Access and data
Sites enforces owner-private access. API handlers additionally require the authenticated visitor identity and scope every query to it. No browser-local logs are used as the source of truth. Internet access is required to save. Refresh reloads the latest saved record; concurrent stale writes are rejected.

## GitHub handoff
Push to the user's GitHub repository only after access is supplied. Keep it separate from the Sites publishing remote. Do not commit runtime databases, exports, credentials or build outputs. Review and remove personal initialization (the requested initial skip date) and individual training configuration before making source public if the owner does not want those settings public. No completed workout data is stored in source.

## Current boundaries
No offline syncing, reminders, or AI-generated coaching. Suggested weights carry the last completed set's load forward unless an approved proposal exists. Always record a consistent load convention for each machine. Three initial loads are unset until the user logs them. Video coverage is limited; every exercise has text cues, and hip thrust includes an official manufacturer YouTube form video.
