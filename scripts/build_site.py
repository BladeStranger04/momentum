from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
DOCS = ROOT / "docs"
DATA = DOCS / "data"

sys.path.insert(0, str(SRC))

from momentum import starter_kit_payload


def validate_docs() -> None:
    required = [
        DOCS / "index.html",
        DOCS / "assets" / "site.css",
        DOCS / "assets" / "app.js",
    ]
    missing = [path for path in required if not path.exists()]
    if missing:
        missing_paths = ", ".join(str(path.relative_to(ROOT)) for path in missing)
        raise FileNotFoundError(f"missing static site files: {missing_paths}")


def build_starter_kits() -> Path:
    DATA.mkdir(parents=True, exist_ok=True)
    target = DATA / "starter-kits.json"
    payload = starter_kit_payload()
    target.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    return target


def main() -> None:
    validate_docs()
    target = build_starter_kits()
    print(f"wrote {target.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
