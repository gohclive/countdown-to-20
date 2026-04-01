---
name: Don't run build checks
description: User runs the dev server continuously; don't interrupt with build commands
type: feedback
---

Don't run `npm run build` or similar commands to verify changes — the user already has the dev server running and can see changes live.

**Why:** They explicitly told me "im already running" twice when I tried to run builds.

**How to apply:** Skip the build verification step at the end of code changes. Trust the TypeScript in the editor and move on.
