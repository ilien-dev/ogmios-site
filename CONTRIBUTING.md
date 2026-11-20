# Contributing to Ogmios site

Thanks for wanting to help. A contribution does not have to be a pull request: a clear issue
that reports a bug or proposes an improvement is a contribution too.

Ogmios site is the product page of Ogmios, in English and Spanish, whose demos play the app's real interface. **A contribution that drifts away from that purpose will be rejected**,
however well it is made.

<!-- This file is generated from .github/repo-rules.json by Nabu (https://github.com/ilien-dev/nabu).
     Project-specific notes go in .github/contributing-notes.md, which is copied below. -->

## Nothing is guaranteed

Opening an issue or a pull request does not guarantee that it will be accepted or merged.
Every change is reviewed before it goes in, the maintainer's own included. A change can be
declined for its scope, its approach or the cost of maintaining it.

## Before you start

- **Search first.** Look through the [pull requests](https://github.com/ilien-dev/ogmios-site/pulls?q=is%3Apr)
  and the [issues](https://github.com/ilien-dev/ogmios-site/issues?q=is%3Aissue), open and closed. If someone
  already works on it, or it was declined, add to that conversation instead.
- **Every change starts with an issue**, a typo or a broken link included. Say what is wrong and
  what you would change, and wait until it is accepted. A pull request that does not link an
  open issue (`Closes #12`) is closed automatically.

## Issues

Use the forms: **Bug report** or **Feature request**. One issue per problem or idea. A bug report
says what you did, what you expected and what happened; a feature request says the problem
first and the solution after. Never paste tokens, keys or private data.

## One change per pull request

Each pull request does **one thing**. A new feature comes alone: no settings change, no visual
tweak elsewhere, no unrelated cleanup. Those go in their own pull requests. The smaller and more
focused a PR is, the faster it can be reviewed and merged; a PR that mixes changes will be asked
to split, or closed.

## Branch name

```
<type>/<1 to 5 words>
```

`<type>` is the Conventional Commit type of the change, the same one the title starts with:
`feat`, `fix`, `perf`, `refactor`, `docs`, `test`, `build`, `ci`, `chore`, `style` or `revert`. Then 1 to 5 words of lowercase letters and digits joined by single
hyphens.

- `feat/export-cover-image` ✓
- `fix/progress-bar-width` ✓
- `feat/Export-Cover` ✗ (uppercase)
- `feature/export-cover-image` ✗ (the type is `feat`)
- `fix/add-a-new-progress-bar-width` ✗ (more than 5 words)

## Title

The title is a [Conventional Commit](https://www.conventionalcommits.org/) of at most
72 characters, with the same type as the branch: `fix: broken link on the home page`.
Pull requests are squash-merged, so the title becomes the commit on `main` and has to
describe the change exactly. This repository publishes no versions.

## Description

Start from the template GitHub fills in
([`.github/pull_request_template.md`](.github/pull_request_template.md)). It is short on purpose:
it holds what a reviewer needs to decide quickly, and nothing else.

| Section | Limit | What goes in it |
|---|---|---|
| **What** | 280 characters | The one change this PR makes. |
| **Why** | 280 characters | The problem it solves. Link the issue (`Closes #12`). |
| **How** | 500 characters | The approach, and the main files it touches. |
| **Risk** | 200 characters | What could break, and how to undo it. |
| **Evidence** | 300 characters of text | How you checked it, how a reviewer can check it; screenshots. |
| **Checklist** | — | Every box ticked. |

**Screenshots** are optional and always welcome, one or as many as it takes to make the change
easy to understand; for a visual change, before and after. Take them yourself
or ask your agent to; capture only that window or page, never the whole screen. Drag the files
into the description box on GitHub. Images, GIFs and links do not count toward the limit.

A check verifies the branch, the title and the description. Run it before opening the PR:

```
node .github/scripts/check-pr.cjs --branch feat/export-cover-image \
  --title "feat: export the cover image" --body-file pr.md --files-from-git main
```

## Before you push

```
bun run check
bun run build
```

Every command must pass.

## Review

A pull request is merged after an approval from someone with write access to the repository and
with every check green. A new push dismisses an earlier approval. Answer review comments in the
PR; keep extra changes for another PR.

## Working with an AI agent

The rules are the same. Agents that read `.claude/skills` or `.agents/skills` have an
`uncontributing` skill that walks through them step by step and checks the result.

