# Handoff lanes

Use [HANDOFF_TEMPLATE.md](../HANDOFF_TEMPLATE.md). Current lanes are [Gemini](gemini.md), [Claude](claude.md), [Codex](codex.md). Each initial file is TODO with no submitted result.

Before submitting, record task ID, agent, source branch/commit and any uncommitted inputs used. A commit SHA alone does not identify local WIP. List exact input/reference paths and checksums for artwork, output/artifact paths, actual commands/exit codes, observations, unverified claims and blockers. Record approval as pending unless the owner has explicitly accepted the exact artifact.

Only one agent writes a working tree at a time. Agents with file access write only their assigned lane during an agreed handoff window; web-only agents return one report/artifact for the designated repository writer to import. Do not overwrite another agent's result. Before starting a new task, preserve prior results under `handoffs/archive/<task-id>/` and update the active task/lanes deliberately.

Writing a handoff does not send a notification or summon another agent. The coordinator reads returned files, then updates [REVIEW.md](../REVIEW.md) for owner review.
