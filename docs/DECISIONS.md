# Design decision log

Each item must be marked `Approved`, `Proposed`, or `Rejected`. AI agents must not promote proposals to approved.

| ID | State | Decision / question | Why |
| --- | --- | --- | --- |
| D-001 | Approved | 2D HD hand-painted/anime direction; no pixel-art target | Distinct from iconic pixel style; preferred by group owner |
| D-002 | Approved | PvE + cooperative + sandbox, without mandatory PvP | Group preference |
| D-003 | Approved | World worth living in; social and peaceful activities matter as much as dungeons | Design principle |
| D-004 | Approved | Git repository and persistent docs are source of truth; coding agents interchangeable | Avoid tool/model lock-in |
| D-005 | Proposed | 150 real minutes per game day | Needs group playtesting; avoid repeating same game-time at fixed login hours |
| D-006 | Proposed | Phaser 3 + TypeScript + Vite for the first slice | Simple browser-first 2D stack; replaceable if evidence suggests better |
| D-007 | Proposed | NPC trade journeys and offline event-driven simulation | Needs design for time, fairness and persistence |
| D-008 | Proposed | Future 2–4 player shared world | Need core game tested first |
| D-009 | Proposed | Fishing as initial leisure minigame | Not a required long-term focus |
