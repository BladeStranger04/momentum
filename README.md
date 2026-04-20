# Momentum

![Deploy](https://img.shields.io/github/actions/workflow/status/BladeStranger04/momentum/pages.yml?branch=main&label=deploy&style=flat-square)
![Python](https://img.shields.io/badge/python-3.12-3776ab?style=flat-square)
![Static App](https://img.shields.io/badge/static-app_docs-2f7d5b?style=flat-square)
![License](https://img.shields.io/github/license/BladeStranger04/momentum?style=flat-square)

Momentum is a calm, open-source progress app for people who procrastinate on work that feels vague, heavy, or emotionally uncomfortable.

Instead of treating everything like a rigid to-do list, it turns goals into lighter tracks with repeatable moves, momentum, milestones, daily reflection, and visual progress that feels rewarding to come back to.

[Live demo](https://bladestranger04.github.io/momentum/) | [Report an issue](https://github.com/BladeStranger04/momentum/issues)

## Run It In Under A Minute

```bash
python scripts/build_site.py
python -m unittest discover -s tests
python -m http.server 8000 --directory docs
```

Open: [http://localhost:8000](http://localhost:8000)

## Screenshots

Placeholder for:

- Today view
- Progress view
- board and track cards
- settings dialog

## Why Momentum Exists

A lot of procrastination is not laziness. It is friction.

Tasks can feel too big, too fuzzy, too boring, or too emotionally loaded to begin. Momentum exists to make the first step lighter, make progress easier to see, and make returning after a gap feel normal instead of shameful.

## Features

- Today view focused on action, next steps, and the board
- separate Progress view for weekly wins, trend, and consistency
- tracks for study, work, cleaning, exercise, reading, routines, creative work, and restart days
- three play styles: Sessions, Routine, and Checklist
- daily reflection with general, reflective, and bible-inspired modes
- four built-in themes with local persistence
- English and Russian UI
- track editing, quick logging, milestones, XP, and momentum
- browser storage with import and export tools
- static site architecture with a small Python support layer for build logic and tests

## Installation

### Prerequisites

- Python 3.12+

### Local Development

```bash
git clone https://github.com/BladeStranger04/momentum.git
cd momentum
python scripts/build_site.py
python -m unittest discover -s tests
python -m http.server 8000 --directory docs
```

### Quick Checks

```bash
node --check docs/assets/app.js
python scripts/build_site.py
python -m unittest discover -s tests
```

## Project Structure

```text
momentum/
+-- .github/workflows/
+-- docs/
|   +-- assets/
|   `-- data/
+-- scripts/
+-- src/momentum/
+-- tests/
+-- CONTRIBUTING.md
+-- LICENSE
+-- pyproject.toml
`-- README.md
```

## Open Source, By Design

Momentum is intentionally small, readable, and easy to maintain. The code stays close to the product, avoids unnecessary abstraction, and keeps the public app fully static while still using Python where it actually helps.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

Momentum is released under the [MIT License](LICENSE).
