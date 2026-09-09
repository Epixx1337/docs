# Epixx Scripts — documentation

Source of the docs site at **https://epixx1337.github.io/docs/** — documentation and FAQs for the Epixx Qbox scripts (qbx_properties, qbx_appearance, qbx_skills, qbx_propplacer and our qbx_core build).

## How it works

- Hand-written pages (`docs/index.md`, every `*/index.md` and `*/faq.md`) live only here — edit them in this repo.
- The **Full reference** pages and the per-topic guides are mirrored from each script repository's `README.md` and `docs/*.md` by [`sync.mjs`](sync.mjs). The [sync workflow](.github/workflows/sync.yml) refreshes them daily (or run it from the Actions tab); don't edit those copies here, edit them in the script repo.
- Every push to `main` builds the site with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) and deploys it to GitHub Pages ([deploy workflow](.github/workflows/deploy.yml)).
- `.gitbook.yaml` + `docs/SUMMARY.md` make the same content importable into [GitBook](https://gitbook.com) (Git Sync), should we ever want their hosting instead.

## Local preview

```
pip install mkdocs-material
node sync.mjs        # refresh the mirrored pages (optional)
mkdocs serve
```
