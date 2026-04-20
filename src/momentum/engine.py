from __future__ import annotations

from collections import Counter
from dataclasses import dataclass
from datetime import datetime, timedelta

LEVEL_STEP = 120


@dataclass(frozen=True)
class ActivityEntry:
    track_id: str
    completed_at: datetime
    xp: int
    progress_delta: int = 1


def level_for_xp(total_xp: int) -> int:
    return max(1, total_xp // LEVEL_STEP + 1)


def progress_ratio(total_progress: int, target_value: int) -> float:
    if target_value <= 0:
        return 0.0
    return min(1.0, total_progress / target_value)


def recovery_bonus(entries: list[ActivityEntry], now: datetime) -> int:
    if not entries:
        return 0

    latest = max(entry.completed_at for entry in entries)
    gap = (now.date() - latest.date()).days
    if gap < 2:
        return 0
    return min(14, 6 + gap * 2)


def streak_length(entries: list[ActivityEntry], now: datetime) -> int:
    if not entries:
        return 0

    active_days = {entry.completed_at.date() for entry in entries}
    cursor = now.date()
    if cursor not in active_days and cursor - timedelta(days=1) in active_days:
        cursor -= timedelta(days=1)

    streak = 0
    while cursor in active_days:
        streak += 1
        cursor -= timedelta(days=1)
    return streak


def momentum_score(entries: list[ActivityEntry], now: datetime) -> int:
    if not entries:
        return 0

    counts = Counter(entry.completed_at.date() for entry in entries)
    score = 0
    for offset in range(7):
        day = (now - timedelta(days=offset)).date()
        weight = 7 - offset
        score += min(counts.get(day, 0), 3) * weight
    return min(100, score * 2)


def weekly_wins(entries: list[ActivityEntry], now: datetime, days: int = 7) -> list[int]:
    counts = Counter(entry.completed_at.date() for entry in entries)
    values: list[int] = []
    for offset in range(days - 1, -1, -1):
        day = (now - timedelta(days=offset)).date()
        values.append(counts.get(day, 0))
    return values
