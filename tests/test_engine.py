from __future__ import annotations

import sys
import unittest
from datetime import datetime, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from momentum.engine import (
    ActivityEntry,
    level_for_xp,
    momentum_score,
    progress_ratio,
    recovery_bonus,
    streak_length,
    weekly_wins,
)


class EngineTests(unittest.TestCase):
    def setUp(self) -> None:
        self.now = datetime(2026, 4, 18, 9, 0, 0)

    def test_level_for_xp_scales_in_even_steps(self) -> None:
        self.assertEqual(level_for_xp(0), 1)
        self.assertEqual(level_for_xp(119), 1)
        self.assertEqual(level_for_xp(120), 2)
        self.assertEqual(level_for_xp(361), 4)

    def test_progress_ratio_clamps_at_complete(self) -> None:
        self.assertEqual(progress_ratio(5, 10), 0.5)
        self.assertEqual(progress_ratio(15, 10), 1.0)
        self.assertEqual(progress_ratio(1, 0), 0.0)

    def test_recovery_bonus_only_appears_after_a_real_gap(self) -> None:
        recent = [ActivityEntry("track-1", self.now - timedelta(days=1), xp=16)]
        delayed = [ActivityEntry("track-1", self.now - timedelta(days=4), xp=16)]

        self.assertEqual(recovery_bonus(recent, self.now), 0)
        self.assertEqual(recovery_bonus(delayed, self.now), 14)

    def test_streak_length_allows_yesterday_as_the_current_run_anchor(self) -> None:
        entries = [
            ActivityEntry("track-1", self.now - timedelta(days=1), xp=12),
            ActivityEntry("track-1", self.now - timedelta(days=2), xp=12),
            ActivityEntry("track-1", self.now - timedelta(days=3), xp=12),
        ]
        self.assertEqual(streak_length(entries, self.now), 3)

    def test_momentum_score_rewards_recent_consistency(self) -> None:
        steady_entries = [
            ActivityEntry("track-1", self.now - timedelta(days=offset), xp=12)
            for offset in range(4)
        ]
        sparse_entries = [ActivityEntry("track-1", self.now - timedelta(days=6), xp=12)]

        self.assertGreater(momentum_score(steady_entries, self.now), momentum_score(sparse_entries, self.now))

    def test_weekly_wins_returns_oldest_to_newest(self) -> None:
        entries = [
            ActivityEntry("track-1", self.now - timedelta(days=2), xp=12),
            ActivityEntry("track-1", self.now - timedelta(days=2, hours=2), xp=12),
            ActivityEntry("track-1", self.now - timedelta(days=0), xp=12),
        ]

        self.assertEqual(weekly_wins(entries, self.now, days=3), [2, 0, 1])


if __name__ == "__main__":
    unittest.main()
