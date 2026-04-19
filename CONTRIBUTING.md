# Contributing

This project is intentionally modest in scope. The goal is not to build a bloated productivity suite. The goal is to make avoided work feel lighter, clearer, and easier to return to.

## Pull Request Guidelines

- keep the product practical and emotionally supportive
- avoid guilt-driven copy and punitive mechanics
- prefer simple architecture over clever abstractions
- keep GitHub Pages compatibility intact
- if a change adds complexity, make sure the user benefit is obvious

## Local workflow

```bash
python scripts/build_site.py
python -m unittest discover -s tests
python -m http.server 8000 --directory docs
```

## Design notes

- small steps should matter
- returning after a gap should feel normal
- the interface should lower mental resistance, not add ceremony
- game mechanics should stay tasteful and adult-friendly

## Pull request shape

Small, focused pull requests are easiest to review and keep the product coherent.

Changes to copy or interaction design should include the product reason, not only the code change.
