from __future__ import annotations

from dataclasses import asdict, dataclass


@dataclass(frozen=True)
class StarterKit:
    category: str
    label: str
    description: str
    default_mode: str
    target_value: int
    unit_label: str
    prompt: str
    suggested_steps: tuple[str, ...]
    color: str


STARTER_KITS = [
    StarterKit(
        category="study",
        label="study",
        description="turn heavy study into smaller, repeatable reps with visible momentum",
        default_mode="focus",
        target_value=12,
        unit_label="study blocks",
        prompt="Finish the material that's been quietly hanging over me",
        suggested_steps=(
            "open the notes and choose one section",
            "do one focused study block",
            "write three recall questions from memory",
            "close with a two-line summary",
        ),
        color="clay",
    ),
    StarterKit(
        category="work",
        label="work",
        description="keep meaningful work moving when tasks feel vague or mentally sticky",
        default_mode="milestone",
        target_value=5,
        unit_label="moves",
        prompt="Ship the project without carrying it around all day in my head",
        suggested_steps=(
            "write the rough outline",
            "clear one blocking decision",
            "ship the first usable draft",
            "review and tighten the final pass",
        ),
        color="ink",
    ),
    StarterKit(
        category="cleaning",
        label="cleaning",
        description="make maintenance feel finite and satisfying instead of endless",
        default_mode="milestone",
        target_value=6,
        unit_label="zones",
        prompt="Reset the space without turning it into a whole event",
        suggested_steps=(
            "clear one visible surface",
            "collect and remove obvious clutter",
            "do a ten-minute reset pass",
            "finish with one room that feels noticeably lighter",
        ),
        color="gold",
    ),
    StarterKit(
        category="exercise",
        label="exercise",
        description="reward showing up, not just heroic sessions",
        default_mode="momentum",
        target_value=10,
        unit_label="movement wins",
        prompt="Make exercise easier to return to",
        suggested_steps=(
            "put on workout clothes and warm up",
            "do a short movement block",
            "finish one stronger set or interval",
            "log how the session felt",
        ),
        color="moss",
    ),
    StarterKit(
        category="reading",
        label="reading",
        description="keep books and articles active with a light but steady rhythm",
        default_mode="focus",
        target_value=8,
        unit_label="reading sessions",
        prompt="Read more consistently without making it feel like homework",
        suggested_steps=(
            "read for ten focused minutes",
            "underline one useful idea",
            "write a quick note on what stayed with me",
        ),
        color="berry",
    ),
    StarterKit(
        category="routine",
        label="routine",
        description="build gentle consistency for the habits that keep life easier",
        default_mode="momentum",
        target_value=14,
        unit_label="daily wins",
        prompt="Keep my baseline routine warm",
        suggested_steps=(
            "do the two-minute version",
            "complete the usual version",
            "leave the space a little better than I found it",
        ),
        color="sand",
    ),
    StarterKit(
        category="creative",
        label="creative",
        description="protect momentum in work that is meaningful but easy to avoid",
        default_mode="focus",
        target_value=9,
        unit_label="creative reps",
        prompt="Make creative work easier to enter and easier to continue",
        suggested_steps=(
            "open the file and touch the work",
            "make one imperfect pass",
            "push one section until it feels alive",
            "leave a note for the next session",
        ),
        color="teal",
    ),
    StarterKit(
        category="reset",
        label="anti-procrastination",
        description="a flexible track for days when the main goal is simply to begin",
        default_mode="momentum",
        target_value=7,
        unit_label="restart wins",
        prompt="Get unstuck without making the day feel lost",
        suggested_steps=(
            "pick the smallest honest next move",
            "do ten minutes with the timer on",
            "close one open loop",
            "leave a clear next step for later",
        ),
        color="rose",
    ),
]


def starter_kit_payload() -> list[dict[str, object]]:
    payload: list[dict[str, object]] = []
    for kit in STARTER_KITS:
        item = asdict(kit)
        item["suggested_steps"] = list(kit.suggested_steps)
        payload.append(item)
    return payload
