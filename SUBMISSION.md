# Deploy Sprint Finale Submission

Complete this file on `main` as tasks are completed. Do not paste secrets, private keys, token values, or screenshots that reveal credentials.

## Team

- Team name: sonic
- Team members: 
- Live IP URL:
- Assigned domain URL:
- Repository URL:

## Release Evidence

- Current production commit:
- Current artifact/image identifier:
- Current deployment workflow run:
- Current release manifest path or URL:
- Notes on live evidence or fallback evidence:

## Score Summary

- Automated points out of 800:
- Judge points out of 200:
- Final total points out of 1000:

## Completed Tasks

Use this section for short public notes and links. Full task instructions and checks are in the finalist dashboard.

| Task | PR | Evidence | Notes |
| --- | --- | --- | --- |
| T01 |  |  |  |
| T02 |  |  |  |
| T03 | #2 | .github/workflows/artifact-verify.yml | Adds a workflow that downloads the exact CI-built site-dist-<sha> artifact (no rebuild) and records its identity in artifact.json. Verified end-to-end run pending post-merge since GitHub only runs workflows present on main. |
| T04 | #4 | GitHub Actions rollback workflow completed successfully | Added manual rollback workflow with workflow_dispatch and release_ref input. Verified successful rollback execution and workflow summary. |
| T05 |  |  |  |
| T06 | #6 | .github/workflows/ci.yml | Documents that ci.yml already satisfies the CI-gate requirements (Node 20, npm ci, npm run build, artifact upload) and that deploy.yml only triggers after CI succeeds via workflow_run. |
| T07 |  |  |  |
| T08 | #8 | task-assets/rebase-feature rebased onto main | Fetched organizer branch task-assets/rebase-feature, rebased cleanly onto main with git rebase main (no conflicts, no force-push). Brings in LearningVelocity component + wiring + styles. |
| T09 |  |  |  |
| T10 |  |  |  |
| T11 |  |  |  |
| T12 | #12 | .github/workflows/ci.yml | Documents that ci.yml already satisfies T12: npm caching via setup-node keyed on team-site/package-lock.json, with npm ci preserved for deterministic installs. |
| T13 |  |  |  |
| T14 |  |  |  |
| T15 |  |  |  |
| T16 |  |  |  |
| T17 |  |  |  |
| T18 |  |  |  |
| T19 |  |  |  |
| T20 |  |  |  |
| T21 |  |  |  |
| T22 |  |  |  |
| T23 |  |  |  |
| T24 |  |  |  |
| T25 |  |  |  |
| T26 |  |  |  |
| T27 |  |  |  |
| T28 |  |  |  |
| T29 |  |  |  |
| T30 |  |  |  |

## Public Notes

List anything judges should know without exposing credentials or private infrastructure details.

Verified:
- DNS A record resolves correctly.
- TXT verification record exists.
- HTTP domain responds successfully.
- Raw IP responds successfully.
- Status manifest reports domain.connected=true.
