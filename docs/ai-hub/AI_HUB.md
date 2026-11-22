# Melonia AI Hub

**Branch:** `feat/pixel-visual-slice`

**Goal:** centralize instructions and handoffs for Gemini, Claude Web, Codex and ChatGPT.

**Status:** coordination protocol, **not** an automated agent runner.

## Rules

1. Git repository is the source of truth. Each agent must read the specific task file and linked references, not rely on an old chat summary.
2. Codex is the designated source writer unless the owner assigns another agent. Claude and Gemini produce proposals, assets or patches in their own lanes; do not concurrently edit the same working tree. Web-only outputs are imported by the designated writer.
3. Never commit/push/merge or change an `Approved` decision without the human owner's approval. Keep work on the pixel branch.
4. Handoff reports must distinguish observed evidence, unverified claims, and blockers.
5. User-approved art reference overrides newly generated character variations. Do not claim an image is production-quality because a technical validator passes.
6. Do not autonomously invoke another model unless access/integration and permission were explicitly configured. Merely writing a markdown task file does not summon another chatbot.
7. The owner's current instructions take priority. Reading TASK.md does not authorize starting it or continuing past a requested review stop. Task status and agent role are explicit, not inferred from a file appearing.

## Roles

| Agent | Responsibility | Deliverable |
| --- | --- | --- |
| Gemini Neon | Art direction, character turnaround, visual critique | Visual candidate or specific art feedback |
| Claude Web | Animation design, code review, asset validation pipeline | Code/patch/QA report |
| Codex | Repository edits, integration, browser tests and screenshots | Diff, build logs, screenshots |
| ChatGPT | Task assignment, synthesis, conflict resolution with owner | Next approved task and acceptance notes |

## Workflow

1. Owner or coordinator updates `docs/ai-hub/TASK.md` with a clear scope and references.
2. Agent reads `TASK.md`, consults files in `docs/ai-hub/references/` and posts output as `docs/ai-hub/handoffs/<agent>.md` (or its own draft branch/PR).
3. Codex gathers handoffs into `docs/ai-hub/REVIEW.md` with links to artifacts and actual tests; never silently treats suggestions as approved.
4. Owner reviews screenshots/actual demo; only then is an asset marked accepted and integrated into production.
5. If web-only Claude/Gemini cannot write the repository, Codex can import their downloaded files or pasted output *once per task*, not every interim thought. The web chats cannot read unpushed local changes.

## Hub index

- [Active task](TASK.md): PIXEL-CHAR-001 is IN_PROGRESS following owner dispatch; the current step activates the task and installs its selected design reference. Next artwork output is one idle-down master, not animation frames.
- [Handoff template](HANDOFF_TEMPLATE.md) and [handoff lanes](handoffs/README.md): `gemini.md`, `claude.md`, `codex.md`. Codex records task activation; Gemini/Claude lanes still await their own submissions.
- [References and provenance](references/README.md): selected Gemini front/back/right-side turnaround is installed unchanged as a design reference, not an approved production sprite.
- [Review](REVIEW.md): setup evidence and outstanding approvals; distinguish setup readiness from art acceptance.
- [GitHub sync](GITHUB_SYNC.md): manual review, explicit path staging and branch verification, no automatic sync.

## Access limits

This setup creates files only. No Gemini/Claude connector, repository permission, browser automation, API, background worker or notification is configured or verified. An agent can read/write only if its own environment already has repository access. A GitHub integration needs explicit access to this repository and branch; it does not automatically receive local uncommitted files. Otherwise provide TASK.md and references once, then import the returned handoff. A link alone does not establish access to a private repository.

This Hub-only publication excludes the local renderer, preview, pipeline and trial assets. References to those files may therefore be unavailable on GitHub until the owner separately approves their publication; report missing inputs instead of assuming access.

## Status tags

`TODO`, `IN_PROGRESS`, `NEEDS_REVIEW`, `APPROVED`, `BLOCKED`, `DONE`.

Only the human owner grants design/art approval. An agent may record APPROVED only with a reference to the owner's explicit acceptance of the exact decision/artifact; passing tests or another agent's recommendation is not approval. Approval to publish the Hub does not approve PIXEL-CHAR-001 or its artwork.

## Startup prompt (use once per agent chat)

> You are working on Melonia. Read `docs/ai-hub/AI_HUB.md` and `docs/ai-hub/TASK.md` on branch `feat/pixel-visual-slice`. Follow only the assigned role and scope. Record your final deliverable as a handoff using the template in `docs/ai-hub/HANDOFF_TEMPLATE.md`. Do not silently treat proposals as approvals. If you cannot access those files, say so explicitly and request the task text once.
