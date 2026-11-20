---
name: uncontributing
description: Use before opening an issue, creating a branch, committing for a pull request, or writing a pull request title or description in the Ogmios site repository (ilien-dev/ogmios-site), even when the user only says "open a PR", "send this upstream" or "make a branch". Walks through CONTRIBUTING.md (one change per PR, <type>/ branch names, Conventional Commit titles, the short PR format, screenshots) and checks the result with .github/scripts/check-pr.cjs.
---

# Contributing to Ogmios site

`CONTRIBUTING.md` is the source of truth and `.github/repo-rules.json` holds every limit;
this skill is the order to apply them in. If they disagree, follow `CONTRIBUTING.md` and point
out the difference. The check script decides, not this text: run it.

## 1. In scope, and new?

- Ogmios site is the product page of Ogmios, in English and Spanish, whose demos play the app's real interface. If the change does not serve that, say so and stop: it will be rejected.
- Search before writing anything:
  ```
  gh pr list --repo ilien-dev/ogmios-site --state all --search "<keywords>"
  gh issue list --repo ilien-dev/ogmios-site --state all --search "<keywords>"
  ```
  If a PR or issue already covers it, report it to the user instead of duplicating it.
- Every change here starts with an issue. Open it (or find it) and wait until the maintainer
  accepts it; a PR without `Closes #N` to an open issue is closed automatically.

## 2. One thing only

Name the single change in one sentence. If it needs an "and", it is two PRs. Propose the split
to the user and do the first one. Unrelated fixes you notice: mention them, leave them out.

## Branch and title

- Pick the Conventional Commit type that tells the truth: `feat`, `fix`, `perf`, `refactor`, `docs`, `test`, `build`, `ci`, `chore`, `style` or `revert`.
- Branch: that type, a slash, 1 to 5 lowercase words joined by hyphens
  (`feat/export-cover-image`). Never `feature/`.
- Title: the same type, at most 72 characters, lowercase after the type, no final period
  (`feat: export the cover image`). It becomes the commit on `main`.

## Before committing

```
bun run check
bun run build
```

Every command must pass.

Report failures with their output; do not open the PR while one fails.

## Description

Copy `.github/pull_request_template.md` and fill every section, deleting the comments. Plain
sentences: what changed, not how hard it was. No other headings, no summary at the end.

- **What** (280): the one change. **Why** (280): the problem; `Closes #N`.
- **How** (500): the approach and main files. **Risk** (200): what could break, how to undo it.
- **Evidence** (300 of text): how you checked it and how the reviewer can, in a minute.
- **Checklist**: tick only what is true; if one is not, say why instead of ticking it.

**Screenshots** are optional. Never take them unasked: ask the user "Do you want screenshots
for this PR?" and take them only on a yes; for a visual change, propose before and after. On a
no, take none. Capture only that window or page (a headless
browser screenshot of the URL, or the window by its handle), never the whole screen. Save them
in a temporary folder, not the repository. GitHub has no API to attach images to a PR: open the
PR, give the user the absolute paths and ask them to drag the files into the description; put
`Screenshots: to be attached.` in Evidence meanwhile.

## Check, then open

```
node .github/scripts/check-pr.cjs --branch <branch> --title "<title>" --body-file <file> --files-from-git main
gh pr create --title "<title>" --body-file <file>
```

Fix every problem the check lists before opening; CI runs the same check as `PR rules`. Do not
merge: every PR needs an approval from someone with write access.
