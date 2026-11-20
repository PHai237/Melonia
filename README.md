# Fantasy Sandbox 2D

Early web-based fantasy life sandbox prototype for a small group. **Not an MMORPG yet.**

## Project goals
- Hand-painted / anime-inspired HD 2D direction (placeholder graphics for now)
- Friendly cooperative/PvE experiences, exploration and relaxed everyday activities
- NPCs with schedules and meaningful lives (planned)
- Player freedom over mandatory grind

## Requirements
- Node.js 20.19+ or 22.12+ recommended; Git; modern browser

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (typically http://localhost:5173/).

Controls: **WASD** move, **E** interact near merchant. The world clock is a nonpersistent local testing clock. The starter has no server, save system, multiplayer or approved final art.

## Validate
```bash
npm run build
```

## Start with these files
- `AGENTS.md` — common rules for any coding agent
- `docs/VISION.md` — core experience
- `docs/DECISIONS.md` — approved decisions vs proposals
- `docs/ROADMAP.md` — versions and exit criteria
- `docs/AI_WORKFLOW.md` — safe handoff between Antigravity and Codex

## First GitHub push (Windows PowerShell)
Create an **empty private** repository on GitHub named `FantasySandbox2D` (do not auto-add README or .gitignore). Then, inside this project folder:
```powershell
git init -b main
git add .
git commit -m "chore: initialize fantasy sandbox 2d"
git remote add origin https://github.com/YOUR_USERNAME/FantasySandbox2D.git
git push -u origin main
```
Replace `YOUR_USERNAME` with your GitHub account. Authenticate via your Git credential manager or GitHub CLI. Do not commit secret keys.

## Status of tests
The source was assembled for handoff. Build and browser checks must be executed on a machine with npm network access before claiming it works.
