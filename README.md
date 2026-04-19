# Momentum

Momentum is a static, supportive progress app for people who procrastinate on work that feels vague, heavy, or emotionally uncomfortable.

Instead of treating everything like a rigid to-do list, it turns goals into lighter tracks with repeatable moves, momentum, milestones, XP, and visual feedback. The point is not to gamify life for its own sake. The point is to make starting easier, progress clearer, and returning after a gap feel normal instead of shameful.

Live demo: [Momentum](https://bladestranger04.github.io/small-wins/)

## Why this exists

A lot of procrastination is not laziness. It is friction.

Tasks feel too big, too fuzzy, too boring, or too emotionally loaded to begin. Momentum is built around a simple product bet:

- if the first move feels smaller, people start more often
- if progress becomes visible quickly, they keep going
- if the system is warm instead of punitive, they come back after misses

## What the MVP does

- app-first `Today` view focused on starting and doing
- separate `Progress` view for trends and visual history
- three play styles: Focus, Momentum, Milestone
- four built-in themes with local persistence
- English and Russian UI
- optional daily reflection with general, reflective, and bible-inspired modes
- works for study, work, cleaning, exercise, reading, routines, creative work, and general restart days
- breaks goals into smaller moves
- logs completions with XP and supportive feedback
- track editing and removal without leaving the board
- keeps import, export, and reset actions in Settings
- shows progress bars, levels, weekly wins, momentum trend, and a consistency map
- keeps everything in browser storage
- ships as a static site that works on GitHub Pages

## Stack

- static site: HTML, CSS, vanilla JavaScript in `docs/`
- Python support layer in `src/small_wins/` for domain logic, starter-kit data, and tests
- `scripts/build_site.py` generates the static JSON used by the app
- GitHub Actions workflow for GitHub Pages deployment
- MIT licensed open-source project

This split is intentional. GitHub Pages is static hosting, so the public app stays serverless. Python is still useful here for product rules, data generation, testable logic, and project structure without forcing the wrong runtime onto the deployed site.

## Local development

Typical local workflow:

```bash
python scripts/build_site.py
python -m unittest discover -s tests
python -m http.server 8000 --directory docs
```

Local app URL: [http://localhost:8000](http://localhost:8000)

## GitHub Pages

Deployment lives in `.github/workflows/pages.yml`.

The repository is set up for GitHub Pages via GitHub Actions:

- `python scripts/build_site.py` generates the static data
- `docs/` is uploaded as the Pages artifact
- pushes to `main` trigger a new deploy

Repository setting required once:

- `Settings -> Pages -> Source -> GitHub Actions`

## Project structure

```text
small-wins/
+-- .github/workflows/pages.yml
+-- docs/
|   +-- assets/
|   |   +-- app.js
|   |   +-- favicon.svg
|   |   `-- site.css
|   +-- data/
|   |   `-- starter-kits.json
|   `-- index.html
+-- scripts/
|   `-- build_site.py
+-- src/
|   `-- small_wins/
|       +-- __init__.py
|       +-- engine.py
|       `-- starter_kits.py
+-- tests/
|   `-- test_engine.py
+-- pyproject.toml
+-- CONTRIBUTING.md
+-- LICENSE
`-- README.md
```

## Screenshots

Placeholder for:

- Today view
- Progress view
- first-track setup dialog
- settings dialog

## Notes on product design

- Small steps matter as much as big sessions.
- Momentum is more important than punishment.
- Missing a day should not make the system feel hostile.
- The app rewards starting early and returning after gaps.
- Different kinds of work should feel at home in the same product.

## Future ideas

- reusable move templates
- richer milestone history
- optional calendar planning
- gentle reminders
- offline install with a service worker
- more reflection packs and personal quote collections

## Contributing

Issues, refinements, and thoughtful product feedback help keep the project sharp.

The same product tone applies across code, copy, and interaction design:

- practical over theatrical
- supportive over guilt-driven
- clear over clever
- polished without overengineering
