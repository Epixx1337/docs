# Epixx Scripts — documentation

Source of the docs site at **https://epixx1337.github.io/docs/** — documentation, installation guides and FAQs for the Epixx Qbox scripts (qbx_properties, qbx_appearance, qbx_skills, qbx_propplacer and our qbx_core build).

## How it works

- Hand-written pages (`docs/index.md`, `docs/faq.md`, every `*/index.md`, `*/install.md` and `*/faq.md`) live only here — edit them in this repo.
- The **Full reference** pages and the per-topic guides are mirrored from each script repository's `README.md` and `docs/*.md` by [`sync.mjs`](sync.mjs). Don't edit those copies here — edit them in the script repo and re-run the sync.
- The site is built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) and served by GitHub Pages from the `gh-pages` branch.
- `.gitbook.yaml` + `docs/SUMMARY.md` make the same content importable into [GitBook](https://gitbook.com) (Git Sync), should we ever want their hosting instead.

## Updating the site

From a machine with [uv](https://docs.astral.sh/uv/) (or any Python with `mkdocs-material`) and push access:

```
node sync.mjs                                        # refresh the mirrored pages
uvx --with mkdocs-material mkdocs serve              # preview at http://127.0.0.1:8000
uvx --with mkdocs-material mkdocs gh-deploy --force  # build + publish
git add -A && git commit -m "docs: ..." && git push  # keep the source in sync too
```

## Automation (currently parked)

`.github/workflows/` in the working copy holds a deploy workflow and a daily sync workflow, but they are **git-ignored**: the gh CLI token on the dev machine lacks the `workflow` scope, and GitHub refuses workflow files without it. To turn the automation on, run `gh auth refresh -h github.com -s workflow` once (device-code login), remove `.github/` from `.gitignore`, commit and push — from then on every push builds the site and the mirrors refresh daily on their own.
