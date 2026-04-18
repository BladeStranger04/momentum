const STORAGE_KEY = "small-wins-state-v1";
const LEVEL_STEP = 120;
const EFFORT_POINTS = { light: 1, steady: 2, deep: 3 };
const XP_TABLE = {
  focus: { light: 12, steady: 20, deep: 32 },
  momentum: { light: 10, steady: 18, deep: 28 },
  milestone: { light: 14, steady: 22, deep: 34 },
};
const MODE_META = {
  focus: {
    label: "focus",
    note: "repeatable blocks for sessions, reps, and deep work",
  },
  momentum: {
    label: "momentum",
    note: "gentle consistency for habits and routines",
  },
  milestone: {
    label: "milestone",
    note: "checklist progress for projects, chores, and resets",
  },
};
const CATEGORY_LABELS = {
  study: "study",
  work: "work",
  cleaning: "cleaning",
  exercise: "exercise",
  reading: "reading",
  routine: "routine",
  creative: "creative",
  reset: "anti-procrastination",
};
const FEEDBACK_LINES = [
  "That counts. The day usually gets easier after the first honest move.",
  "Progress is real now. You do not need a dramatic session for it to matter.",
  "Nice. Starting again is a skill, not a consolation prize.",
  "A smaller move still changes the shape of the day.",
  "Momentum likes evidence. You just gave it some.",
  "You lowered the friction. That's often the whole game.",
];
const DAILY_LINES = [
  "Keep it light enough to begin and solid enough to feel real.",
  "One clean rep is often better than waiting for ideal energy.",
  "You're building continuity, not trying to win the whole week at once.",
  "A short return still counts as a return.",
];
const FALLBACK_STARTER_KITS = [
  {
    category: "study",
    label: "study",
    description: "turn heavy study into smaller, repeatable reps with visible momentum",
    default_mode: "focus",
    target_value: 12,
    unit_label: "study blocks",
    prompt: "Finish the material that's been hanging over me",
    suggested_steps: [
      "open the notes and choose one section",
      "do one focused study block",
      "write three recall questions from memory",
      "close with a two-line summary",
    ],
    color: "clay",
  },
  {
    category: "exercise",
    label: "exercise",
    description: "reward showing up, not just heroic sessions",
    default_mode: "momentum",
    target_value: 10,
    unit_label: "movement wins",
    prompt: "Make exercise easier to return to",
    suggested_steps: [
      "put on workout clothes and warm up",
      "do a short movement block",
      "finish one stronger set or interval",
    ],
    color: "moss",
  },
  {
    category: "work",
    label: "work",
    description: "keep meaningful work moving when tasks feel vague or mentally sticky",
    default_mode: "milestone",
    target_value: 5,
    unit_label: "moves",
    prompt: "Ship the project without carrying it around all day in my head",
    suggested_steps: [
      "write the rough outline",
      "clear one blocking decision",
      "ship the first usable draft",
      "review and tighten the final pass",
    ],
    color: "ink",
  },
];

let starterKits = [];
let state = loadState();
let elements = {};
let toastTimer = null;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindElements();
  bindEvents();
  starterKits = await loadStarterKits();
  populateCategoryOptions();
  syncFormDefaults(true);
  render();
}

function bindElements() {
  elements = {
    summaryRow: document.getElementById("summaryRow"),
    tracksGrid: document.getElementById("tracksGrid"),
    boardEmpty: document.getElementById("boardEmpty"),
    dailyBrief: document.getElementById("dailyBrief"),
    dailyList: document.getElementById("dailyList"),
    activityFeed: document.getElementById("activityFeed"),
    weeklyWinsChart: document.getElementById("weeklyWinsChart"),
    momentumChart: document.getElementById("momentumChart"),
    heatmapChart: document.getElementById("heatmapChart"),
    starterKitGrid: document.getElementById("starterKitGrid"),
    previewHeadline: document.getElementById("previewHeadline"),
    previewBody: document.getElementById("previewBody"),
    previewMeterFill: document.getElementById("previewMeterFill"),
    heroStartButton: document.getElementById("heroStartButton"),
    loadDemoButton: document.getElementById("loadDemoButton"),
    newTrackButton: document.getElementById("newTrackButton"),
    emptyStateButton: document.getElementById("emptyStateButton"),
    trackDialog: document.getElementById("trackDialog"),
    trackForm: document.getElementById("trackForm"),
    trackId: document.getElementById("trackId"),
    dialogTitle: document.getElementById("dialogTitle"),
    dialogBody: document.getElementById("dialogBody"),
    trackTitle: document.getElementById("trackTitle"),
    trackCategory: document.getElementById("trackCategory"),
    targetValue: document.getElementById("targetValue"),
    unitLabel: document.getElementById("unitLabel"),
    trackWhy: document.getElementById("trackWhy"),
    stepList: document.getElementById("stepList"),
    modeNote: document.getElementById("modeNote"),
    suggestionChips: document.getElementById("suggestionChips"),
    fillSuggestionsButton: document.getElementById("fillSuggestionsButton"),
    cancelDialogButton: document.getElementById("cancelDialogButton"),
    feedbackToast: document.getElementById("feedbackToast"),
    exportDataButton: document.getElementById("exportDataButton"),
    importDataButton: document.getElementById("importDataButton"),
    resetDataButton: document.getElementById("resetDataButton"),
    importFileInput: document.getElementById("importFileInput"),
  };
}

function bindEvents() {
  elements.heroStartButton.addEventListener("click", () => openTrackDialog(!state.tracks.length));
  elements.newTrackButton.addEventListener("click", () => openTrackDialog(false));
  elements.emptyStateButton.addEventListener("click", () => openTrackDialog(true));
  elements.loadDemoButton.addEventListener("click", loadDemoState);
  elements.trackForm.addEventListener("submit", handleTrackSubmit);
  elements.trackCategory.addEventListener("change", () => syncFormDefaults(false));
  elements.fillSuggestionsButton.addEventListener("click", fillSuggestions);
  elements.cancelDialogButton.addEventListener("click", () => elements.trackDialog.close());
  elements.exportDataButton.addEventListener("click", exportData);
  elements.importDataButton.addEventListener("click", () => elements.importFileInput.click());
  elements.importFileInput.addEventListener("change", importData);
  elements.resetDataButton.addEventListener("click", resetLocalBoard);

  document.querySelectorAll('input[name="mode"]').forEach((input) => {
    input.addEventListener("change", () => syncFormDefaults(false));
  });

  document.addEventListener("click", (event) => {
    const completeButton = event.target.closest("[data-complete-track]");
    if (completeButton) {
      completeStep(completeButton.dataset.completeTrack, completeButton.dataset.completeStep);
      return;
    }

    const kitButton = event.target.closest("[data-load-kit]");
    if (kitButton) {
      openTrackDialog(!state.tracks.length, kitButton.dataset.loadKit);
      return;
    }

    const suggestionButton = event.target.closest("[data-add-suggestion]");
    if (suggestionButton) {
      appendSuggestion(suggestionButton.dataset.addSuggestion);
      return;
    }

    const editButton = event.target.closest("[data-edit-track]");
    if (editButton) {
      editTrack(editButton.dataset.editTrack);
      return;
    }

    const deleteButton = event.target.closest("[data-delete-track]");
    if (deleteButton) {
      deleteTrack(deleteButton.dataset.deleteTrack);
    }
  });
}

async function loadStarterKits() {
  try {
    const response = await fetch("data/starter-kits.json", { cache: "no-cache" });
    if (!response.ok) {
      throw new Error("starter kits unavailable");
    }
    return await response.json();
  } catch (error) {
    return FALLBACK_STARTER_KITS;
  }
}

function createInitialState() {
  return {
    version: 1,
    onboardingComplete: false,
    tracks: [],
    activity: [],
  };
}

function sanitizeState(parsed) {
  const base = createInitialState();
  if (!parsed || typeof parsed !== "object") {
    return base;
  }

  return {
    ...base,
    ...parsed,
    tracks: Array.isArray(parsed.tracks)
      ? parsed.tracks
          .filter((track) => track && typeof track === "object")
          .map((track) => {
            const mode = MODE_META[track.mode] ? track.mode : "focus";
            return {
              id: typeof track.id === "string" && track.id ? track.id : uid("track"),
              title: typeof track.title === "string" && track.title.trim() ? track.title.trim() : "untitled track",
              category:
                typeof track.category === "string" && track.category.trim()
                  ? track.category.trim()
                  : "study",
              mode,
              why: typeof track.why === "string" ? track.why.trim() : "",
              targetValue: clamp(Number(track.targetValue) || 1, 1, 100),
              unitLabel:
                typeof track.unitLabel === "string" && track.unitLabel.trim()
                  ? track.unitLabel.trim()
                  : mode === "milestone"
                    ? "moves"
                    : "wins",
              color: typeof track.color === "string" && track.color.trim() ? track.color.trim() : "clay",
              createdAt: track.createdAt || new Date().toISOString(),
              steps: Array.isArray(track.steps)
                ? track.steps
                    .filter((step) => step && typeof step === "object")
                    .map((step, index) => ({
                      id: typeof step.id === "string" && step.id ? step.id : uid("step"),
                      title:
                        typeof step.title === "string" && step.title.trim()
                          ? step.title.trim()
                          : `step ${index + 1}`,
                      effort: EFFORT_POINTS[step.effort] ? step.effort : inferEffort(index, mode),
                      repeatable: typeof step.repeatable === "boolean" ? step.repeatable : mode !== "milestone",
                      doneAt: step.doneAt || null,
                    }))
                : [],
            };
          })
      : [],
    activity: Array.isArray(parsed.activity)
      ? [...parsed.activity]
          .filter((entry) => entry && typeof entry === "object" && entry.trackId && entry.stepId)
          .map((entry) => ({
            id: typeof entry.id === "string" && entry.id ? entry.id : uid("entry"),
            trackId: entry.trackId,
            stepId: entry.stepId,
            title: typeof entry.title === "string" && entry.title.trim() ? entry.title.trim() : "completed move",
            xp: Number(entry.xp) || 0,
            progressDelta: Number(entry.progressDelta) || 0,
            momentumDelta: Number(entry.momentumDelta) || 0,
            completedAt: entry.completedAt || new Date().toISOString(),
          }))
          .sort((left, right) => new Date(right.completedAt).getTime() - new Date(left.completedAt).getTime())
      : [],
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createInitialState();
    }
    return sanitizeState(JSON.parse(raw));
  } catch (error) {
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function populateCategoryOptions() {
  elements.trackCategory.innerHTML = starterKits
    .map((kit) => `<option value="${kit.category}">${escapeHtml(kit.label)}</option>`)
    .join("");
}

function openTrackDialog(isFirstTrack = false, presetCategory = null, track = null) {
  elements.trackForm.reset();
  if (track) {
    elements.trackId.value = track.id;
    elements.trackCategory.value = track.category;
    setMode(track.mode);
    elements.dialogTitle.textContent = "edit track";
    elements.dialogBody.textContent =
      "You can refine the setup without starting from scratch. Matching move titles keep their history.";
    renderSuggestionChips(kitFor(track.category), track.mode);
    elements.modeNote.textContent = MODE_META[track.mode].note;
    elements.trackTitle.value = track.title;
    elements.targetValue.value = track.targetValue;
    elements.unitLabel.value = track.unitLabel;
    elements.trackWhy.value = track.why || "";
    elements.stepList.value = track.steps.map((step) => step.title).join("\n");
  } else {
    elements.trackId.value = "";
    const selectedKit = kitFor(presetCategory || starterKits[0]?.category || "study");
    elements.trackCategory.value = selectedKit.category;
    setMode(selectedKit.default_mode);
    elements.dialogTitle.textContent = isFirstTrack ? "build your first track" : "build another track";
    elements.dialogBody.textContent = isFirstTrack
      ? "Make the first version light. You can always raise the bar after the system feels good to use."
      : "Keep the setup practical. A useful track beats an ambitious one that becomes a burden.";
    syncFormDefaults(true);
  }
  elements.trackDialog.showModal();
}

function syncFormDefaults(forceReplace) {
  const kit = kitFor(elements.trackCategory.value);
  const mode = selectedMode();

  renderSuggestionChips(kit, mode);
  elements.trackTitle.placeholder = kit.prompt;
  elements.trackWhy.placeholder = kit.description;
  elements.modeNote.textContent = MODE_META[mode].note;

  if (forceReplace || !elements.targetValue.value) {
    elements.targetValue.value = mode === "milestone" ? Math.max(kit.suggested_steps.length, 3) : kit.target_value;
  }

  if (forceReplace || !elements.unitLabel.value.trim()) {
    elements.unitLabel.value = mode === "milestone" ? "moves" : kit.unit_label;
  }

  if (forceReplace || !elements.stepList.value.trim()) {
    elements.stepList.value = deriveSuggestedStepText(kit, mode);
  }
}

function fillSuggestions() {
  const kit = kitFor(elements.trackCategory.value);
  const mode = selectedMode();
  elements.stepList.value = deriveSuggestedStepText(kit, mode);
  if (mode === "milestone") {
    elements.targetValue.value = Math.max(kit.suggested_steps.length, 3);
    elements.unitLabel.value = "moves";
  }
}

function renderSuggestionChips(kit, mode) {
  const suggestions = mode === "milestone" ? kit.suggested_steps : kit.suggested_steps.slice(0, 3);
  elements.suggestionChips.innerHTML = suggestions
    .map(
      (step) =>
        `<button class="suggestion-chip" type="button" data-add-suggestion="${escapeAttribute(step)}">${escapeHtml(step)}</button>`,
    )
    .join("");
}

function handleTrackSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.trackForm);
  const title = String(formData.get("title") || "").trim();
  if (!title) {
    return;
  }

  const trackId = String(formData.get("trackId") || "").trim();
  const existingTrack = state.tracks.find((track) => track.id === trackId) || null;
  const category = String(formData.get("category") || "study");
  const mode = String(formData.get("mode") || "focus");
  const kit = kitFor(category);
  const steps = buildSteps(String(formData.get("steps") || ""), mode, kit, existingTrack?.steps || []);
  const rawTarget = clamp(Number(formData.get("targetValue")) || kit.target_value, 1, 100);
  const targetValue = mode === "milestone" ? Math.max(rawTarget, steps.length || 1) : rawTarget;
  const unitLabel = String(formData.get("unitLabel") || "").trim() || (mode === "milestone" ? "moves" : kit.unit_label);

  const track = {
    id: existingTrack?.id || uid("track"),
    title,
    category,
    mode,
    why: String(formData.get("why") || "").trim() || kit.description,
    targetValue,
    unitLabel,
    color: kit.color,
    createdAt: existingTrack?.createdAt || new Date().toISOString(),
    steps,
  };

  if (existingTrack) {
    state.tracks = state.tracks.map((item) => (item.id === track.id ? track : item));
  } else {
    state.tracks.unshift(track);
  }
  state.onboardingComplete = true;
  saveState();
  render();
  elements.trackDialog.close();
  showToast(existingTrack ? "Track updated. The board should feel a little cleaner now." : "Track ready. Your next move is smaller and easier to see now.");
}

function buildSteps(rawText, mode, kit, existingSteps = []) {
  const rawLines = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const sourceLines = rawLines.length ? rawLines : deriveSuggestedStepText(kit, mode).split("\n");
  const stepPool = existingSteps.reduce((pool, step) => {
    const key = normalizeStepTitle(step.title);
    if (!pool[key]) {
      pool[key] = [];
    }
    pool[key].push(step);
    return pool;
  }, {});
  const usedStepIds = new Set();

  return sourceLines.slice(0, 8).map((line, index) => {
    const normalized = line
      .replace(/\[(light|steady|deep)\]/i, "")
      .replace(/\((light|steady|deep)\)/i, "")
      .trim();
    const explicitEffort = extractEffort(line);
    const repeatable = mode !== "milestone";
    const candidates = stepPool[normalizeStepTitle(normalized)] || [];
    const reusedStep = candidates.find((step) => !usedStepIds.has(step.id));
    if (reusedStep) {
      usedStepIds.add(reusedStep.id);
    }
    return {
      id: reusedStep?.id || uid("step"),
      title: normalized || `step ${index + 1}`,
      effort: explicitEffort || reusedStep?.effort || inferEffort(index, mode),
      repeatable,
      doneAt: repeatable ? null : reusedStep?.doneAt || null,
    };
  });
}

function loadDemoState() {
  if (state.tracks.length && !window.confirm("Load the sample board and replace your current local data?")) {
    return;
  }

  const demoState = buildDemoState();
  state = demoState;
  saveState();
  render();
  showToast("Sample board loaded. Try logging a few moves to feel the loop.");
}

function editTrack(trackId) {
  const track = state.tracks.find((item) => item.id === trackId);
  if (!track) {
    return;
  }
  openTrackDialog(false, track.category, track);
}

function deleteTrack(trackId) {
  const track = state.tracks.find((item) => item.id === trackId);
  if (!track) {
    return;
  }

  const confirmed = window.confirm(`Remove "${track.title}" and its local history from this browser?`);
  if (!confirmed) {
    return;
  }

  state.tracks = state.tracks.filter((item) => item.id !== trackId);
  state.activity = state.activity.filter((entry) => entry.trackId !== trackId);
  saveState();
  render();
  showToast("Track removed from the local board.");
}

function exportData() {
  const payload = {
    app: "small-wins",
    exportedAt: new Date().toISOString(),
    state,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `small-wins-backup-${dayKey(new Date())}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Backup exported.");
}

async function importData(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    state = sanitizeState(parsed.state || parsed);
    saveState();
    render();
    showToast("Backup imported.");
  } catch (error) {
    showToast("That file could not be imported.");
  } finally {
    event.target.value = "";
  }
}

function resetLocalBoard() {
  if (!state.tracks.length && !state.activity.length) {
    showToast("The local board is already clear.");
    return;
  }

  const confirmed = window.confirm("Clear every local track and activity entry from this browser?");
  if (!confirmed) {
    return;
  }

  state = createInitialState();
  saveState();
  render();
  showToast("Local board cleared.");
}

function buildDemoState() {
  const now = new Date();
  const studyTrack = makeTrack(
    "Finish chapter notes",
    "study",
    "focus",
    12,
    "study blocks",
    "The material feels smaller once I'm already inside it.",
    "clay",
    [
      "open the notes and choose one section",
      "do one focused study block",
      "write three recall questions from memory",
    ],
  );
  const resetTrack = makeTrack(
    "Apartment reset",
    "cleaning",
    "milestone",
    4,
    "moves",
    "A lighter room takes pressure off the rest of the day.",
    "gold",
    [
      "clear the desk",
      "collect stray clothes and dishes",
      "wipe the kitchen counters",
      "do a ten-minute floor reset",
    ],
  );
  const movementTrack = makeTrack(
    "Morning movement",
    "exercise",
    "momentum",
    10,
    "movement wins",
    "A short session is enough to keep the habit warm.",
    "moss",
    [
      "change clothes and warm up",
      "do a short movement block",
      "finish one stronger set or interval",
    ],
  );
  const creativeTrack = makeTrack(
    "Novel draft",
    "creative",
    "focus",
    9,
    "creative reps",
    "Touching the work matters more than waiting for ideal energy.",
    "teal",
    [
      "open the draft and write one imperfect paragraph",
      "push one scene forward for twenty minutes",
      "leave a note for the next session",
    ],
  );

  const tracks = [studyTrack, resetTrack, movementTrack, creativeTrack];
  const activity = [];

  const seed = (track, stepIndex, daysAgo, hour, bonus = 0) => {
    const step = track.steps[stepIndex];
    const completedAt = new Date(now);
    completedAt.setDate(completedAt.getDate() - daysAgo);
    completedAt.setHours(hour, 12, 0, 0);
    activity.push({
      id: uid("entry"),
      trackId: track.id,
      stepId: step.id,
      title: step.title,
      xp: XP_TABLE[track.mode][step.effort] + bonus,
      progressDelta: track.mode === "milestone" ? 1 : EFFORT_POINTS[step.effort],
      momentumDelta: EFFORT_POINTS[step.effort] * 5,
      completedAt: completedAt.toISOString(),
    });
    if (!step.repeatable) {
      step.doneAt = completedAt.toISOString();
    }
  };

  seed(studyTrack, 0, 0, 9, 8);
  seed(studyTrack, 1, 1, 8);
  seed(studyTrack, 0, 2, 10);
  seed(studyTrack, 2, 4, 17);
  seed(studyTrack, 1, 6, 9);

  seed(resetTrack, 0, 1, 18);
  seed(resetTrack, 1, 3, 19);

  seed(movementTrack, 0, 0, 7, 4);
  seed(movementTrack, 1, 1, 7);
  seed(movementTrack, 1, 2, 7);
  seed(movementTrack, 2, 3, 7);
  seed(movementTrack, 0, 5, 7);

  seed(creativeTrack, 0, 0, 20);
  seed(creativeTrack, 1, 2, 21);
  seed(creativeTrack, 2, 4, 19);

  activity.sort((left, right) => new Date(right.completedAt) - new Date(left.completedAt));

  return {
    version: 1,
    onboardingComplete: true,
    tracks,
    activity,
  };
}

function makeTrack(title, category, mode, targetValue, unitLabel, why, color, stepLines) {
  return {
    id: uid("track"),
    title,
    category,
    mode,
    targetValue,
    unitLabel,
    why,
    color,
    createdAt: new Date().toISOString(),
    steps: buildSteps(stepLines.join("\n"), mode, kitFor(category)),
  };
}

function render() {
  renderSummary();
  renderTracks();
  renderDailyPanel();
  renderActivityFeed();
  renderWeeklyWins();
  renderMomentumChart();
  renderHeatmap();
  renderStarterKitGrid();
  renderPreview();
}

function renderSummary() {
  const metrics = globalMetrics();
  const cards = [
    {
      label: "today's wins",
      value: metrics.todayWins,
      note: metrics.todayWins
        ? `${pluralize(metrics.todayWins, "move")} logged today`
        : "one small move is enough to change the tone of the day",
    },
    {
      label: "level",
      value: `L${metrics.level}`,
      note: `${metrics.xpToNext} xp to the next level`,
    },
    {
      label: "momentum",
      value: `${metrics.momentum}%`,
      note: metrics.momentum >= 60 ? "recent consistency is warming up nicely" : "momentum is still buildable today",
    },
    {
      label: "current run",
      value: metrics.run ? pluralize(metrics.run, "day") : "ready",
      note:
        metrics.recoveryBonus && !metrics.todayWins
          ? `comeback bonus +${metrics.recoveryBonus} xp is waiting`
          : `${pluralize(metrics.activeTracks, "active track")} in play`,
    },
  ];

  elements.summaryRow.innerHTML = cards
    .map(
      (card) => `
        <article class="summary-card panel">
          <span class="summary-card__label">${escapeHtml(card.label)}</span>
          <strong class="summary-card__value">${escapeHtml(String(card.value))}</strong>
          <span class="summary-card__note">${escapeHtml(card.note)}</span>
        </article>
      `,
    )
    .join("");
}

function renderTracks() {
  if (!state.tracks.length) {
    elements.boardEmpty.classList.remove("is-hidden");
    elements.tracksGrid.innerHTML = "";
    return;
  }

  elements.boardEmpty.classList.add("is-hidden");
  const tracks = [...state.tracks].sort((left, right) => lastActivityTime(right) - lastActivityTime(left));

  elements.tracksGrid.innerHTML = tracks
    .map((track) => {
      const stats = trackStats(track);
      const openStepRows = renderTrackSteps(track, stats);

      return `
        <article class="track-card tone-${escapeAttribute(track.color || "clay")}">
          <div class="track-card__top">
            <div class="track-card__copy">
              <div class="track-card__header">
                <span class="track-badge">${escapeHtml(MODE_META[track.mode].label)}</span>
                <div class="track-card__actions">
                  <button class="chip-action" type="button" data-edit-track="${track.id}">edit</button>
                  <button class="chip-action chip-action--danger" type="button" data-delete-track="${track.id}">remove</button>
                </div>
              </div>
              <h3>${escapeHtml(track.title)}</h3>
              <p>${escapeHtml(track.why)}</p>
            </div>
            ${renderRing(stats.progressPercent, `${Math.round(stats.progressPercent)}%`, track.mode)}
          </div>

          <div class="track-meta">
            <span>${escapeHtml(CATEGORY_LABELS[track.category] || track.category)}</span>
            <span>${escapeHtml(stats.runLabel)}</span>
            <span>${escapeHtml(`+${stats.totalXp} xp`)}</span>
          </div>

          <div class="track-progress">
            <div class="progress-bar">
              <span style="width: ${stats.progressPercent}%"></span>
            </div>
            <div class="track-progress__labels">
              <span>${escapeHtml(stats.progressLabel)}</span>
              <span>${escapeHtml(stats.nextMilestoneLabel)}</span>
            </div>
          </div>

          <div class="move-list">
            <div class="move-list__head">
              <h4>${track.mode === "milestone" ? "next moves" : "repeatable moves"}</h4>
              <span>${escapeHtml(stats.moveSummary)}</span>
            </div>
            ${openStepRows}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderTrackSteps(track, stats) {
  const stepCounts = countCompletionsByStep(track.id);
  const completedStepIds = completedStepIdsForTrack(track);
  const openSteps = track.steps.filter((step) => step.repeatable || !completedStepIds.has(step.id));
  const doneSteps = track.steps.filter((step) => !step.repeatable && completedStepIds.has(step.id));

  const openRows = openSteps.slice(0, 4).map((step) => {
    const xp = XP_TABLE[track.mode][step.effort];
    const timesLogged = step.repeatable ? `${stepCounts[step.id] || 0} logged` : "one-off move";
    return `
      <div class="move-row">
        <button
          class="move-button"
          type="button"
          data-complete-track="${track.id}"
          data-complete-step="${step.id}"
        >
          <span class="move-title">${escapeHtml(step.title)}</span>
          <span class="move-meta">
            <span>${escapeHtml(timesLogged)}</span>
            <span class="move-pill">+${xp} xp</span>
          </span>
        </button>
      </div>
    `;
  });

  const doneRows = doneSteps.slice(0, 2).map((step) => `
    <div class="move-row is-done">
      <div class="move-button">
        <span class="move-title">${escapeHtml(step.title)}</span>
        <span class="move-meta">
          <span>done</span>
          <span class="move-pill">kept</span>
        </span>
      </div>
    </div>
  `);

  if (!openRows.length && track.mode === "milestone") {
    openRows.push(`
      <div class="move-row is-done">
        <div class="move-button">
          <span class="move-title">everything in this track is complete</span>
          <span class="move-meta">
            <span>nice clean finish</span>
            <span class="move-pill">${escapeHtml(stats.progressLabel)}</span>
          </span>
        </div>
      </div>
    `);
  }

  return [...openRows, ...doneRows].join("");
}

function renderDailyPanel() {
  const metrics = globalMetrics();
  const brief = buildDailyBrief(metrics);
  const nextMoves = suggestedNextMoves();

  elements.dailyBrief.innerHTML = `
    <strong>${escapeHtml(brief.headline)}</strong>
    <p>${escapeHtml(brief.body)}</p>
  `;

  if (!nextMoves.length) {
    elements.dailyList.innerHTML = `<div class="empty-copy">Create a track and Small Wins will suggest the easiest next moves here.</div>`;
    return;
  }

  elements.dailyList.innerHTML = nextMoves
    .map(
      (item) => `
        <div class="micro-card">
          <div class="micro-card__copy">
            <strong>${escapeHtml(item.step.title)}</strong>
            <span>${escapeHtml(`${item.track.title} - ${CATEGORY_LABELS[item.track.category]}`)}</span>
          </div>
          <button
            class="pill-button"
            type="button"
            data-complete-track="${item.track.id}"
            data-complete-step="${item.step.id}"
          >
            log now
          </button>
        </div>
      `,
    )
    .join("");
}

function renderActivityFeed() {
  if (!state.activity.length) {
    elements.activityFeed.innerHTML = `<div class="empty-copy">Your recent wins will show up here so progress feels visible instead of abstract.</div>`;
    return;
  }

  elements.activityFeed.innerHTML = state.activity
    .slice(0, 8)
    .map((entry) => {
      const track = state.tracks.find((item) => item.id === entry.trackId);
      return `
        <div class="activity-row">
          <div class="activity-row__copy">
            <strong>${escapeHtml(entry.title)}</strong>
            <span>${escapeHtml(`${track?.title || "track"} - ${formatRelativeTime(entry.completedAt)}`)}</span>
          </div>
          <span class="activity-row__xp">+${entry.xp} xp</span>
        </div>
      `;
    })
    .join("");
}

function renderWeeklyWins() {
  const days = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = shiftDays(new Date(), -offset);
    const count = state.activity.filter((entry) => dayKey(entry.completedAt) === dayKey(date)).length;
    days.push({
      label: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date).slice(0, 2),
      count,
    });
  }

  const maxCount = Math.max(...days.map((day) => day.count), 1);

  elements.weeklyWinsChart.innerHTML = `
    <div class="bar-chart">
      ${days
        .map(
          (day) => `
            <div class="bar-column">
              <div class="bar" style="height: ${Math.max(14, (day.count / maxCount) * 150)}px"></div>
              <strong>${day.count}</strong>
              <span>${escapeHtml(day.label)}</span>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderMomentumChart() {
  const values = [];
  const today = new Date();
  for (let offset = 13; offset >= 0; offset -= 1) {
    const point = shiftDays(today, -offset);
    const cutoff = new Date(point);
    cutoff.setHours(23, 59, 59, 999);
    const subset = state.activity.filter((entry) => new Date(entry.completedAt) <= cutoff);
    values.push(momentumScore(subset, cutoff));
  }

  const latest = values[values.length - 1] || 0;
  const start = values[0] || 0;

  elements.momentumChart.innerHTML = `
    <div class="sparkline-card">
      ${renderSparkline(values)}
      <div class="sparkline-meta">
        <span>last 14 days</span>
        <span>${latest >= start ? "moving upward" : "still recoverable"}</span>
      </div>
    </div>
  `;
}

function renderHeatmap() {
  const days = [];
  for (let offset = 20; offset >= 0; offset -= 1) {
    const date = shiftDays(new Date(), -offset);
    const count = state.activity.filter((entry) => dayKey(entry.completedAt) === dayKey(date)).length;
    days.push({
      label: formatDate(date),
      count,
      intensity: count >= 4 ? 4 : count >= 3 ? 3 : count >= 2 ? 2 : count >= 1 ? 1 : 0,
    });
  }

  elements.heatmapChart.innerHTML = `
    <div>
      <div class="heatmap">
        ${days
          .map(
            (day) => `<div class="heatmap-day" data-intensity="${day.intensity}" title="${escapeAttribute(
              `${day.label}: ${pluralize(day.count, "win")}`,
            )}"></div>`,
          )
          .join("")}
      </div>
      <div class="heatmap-legend">
        <span>lighter</span>
        <span>stronger consistency</span>
      </div>
    </div>
  `;
}

function renderStarterKitGrid() {
  elements.starterKitGrid.innerHTML = starterKits
    .map(
      (kit) => `
        <article class="kit-card tone-${escapeAttribute(kit.color || "clay")}">
          <div>
            <p class="section-kicker">${escapeHtml(kit.label)}</p>
            <h3>${escapeHtml(kit.prompt)}</h3>
          </div>
          <p>${escapeHtml(kit.description)}</p>
          <ul>
            ${kit.suggested_steps
              .slice(0, 3)
              .map((step) => `<li>${escapeHtml(step)}</li>`)
              .join("")}
          </ul>
          <button class="button button--secondary" type="button" data-load-kit="${kit.category}">use this setup</button>
        </article>
      `,
    )
    .join("");
}

function renderPreview() {
  const metrics = globalMetrics();
  const brief = buildDailyBrief(metrics);
  elements.previewHeadline.textContent = brief.headline;
  elements.previewBody.textContent = brief.body;
  elements.previewMeterFill.style.width = `${Math.max(18, metrics.momentum)}%`;
}

function completeStep(trackId, stepId) {
  const track = state.tracks.find((item) => item.id === trackId);
  if (!track) {
    return;
  }

  const step = track.steps.find((item) => item.id === stepId);
  if (!step) {
    return;
  }

  if (!step.repeatable && step.doneAt) {
    return;
  }

  const now = new Date();
  const reward = rewardForStep(track, step, now);

  state.activity.unshift({
    id: uid("entry"),
    trackId: track.id,
    stepId: step.id,
    title: step.title,
    xp: reward.xp,
    progressDelta: reward.progressDelta,
    momentumDelta: reward.momentumDelta,
    completedAt: now.toISOString(),
  });

  if (!step.repeatable) {
    step.doneAt = now.toISOString();
  }

  saveState();
  render();
  showToast(feedbackForCompletion(track, step, reward));
}

function rewardForStep(track, step, now) {
  const baseXp = XP_TABLE[track.mode][step.effort];
  const anyToday = state.activity.some((entry) => dayKey(entry.completedAt) === dayKey(now));
  const trackToday = state.activity.some(
    (entry) => entry.trackId === track.id && dayKey(entry.completedAt) === dayKey(now),
  );
  const startBonus = !anyToday ? 8 : !trackToday ? 4 : 0;
  const comebackBonus = !anyToday ? recoveryBonus(state.activity, now) : 0;
  const run = streakLength(state.activity.filter((entry) => entry.trackId === track.id), now);
  const consistencyBonus = track.mode === "momentum" && run >= 2 ? 4 : 0;
  const milestoneBonus =
    track.mode === "milestone" && (trackStats(track).progressUnits + 1) % 3 === 0 ? 10 : 0;

  return {
    xp: baseXp + startBonus + comebackBonus + consistencyBonus + milestoneBonus,
    progressDelta: track.mode === "milestone" ? 1 : EFFORT_POINTS[step.effort],
    momentumDelta: EFFORT_POINTS[step.effort] * 5 + (track.mode === "momentum" ? 3 : 0),
    startBonus,
    comebackBonus,
    milestoneBonus,
  };
}

function feedbackForCompletion(track, step, reward) {
  if (reward.comebackBonus) {
    return `Welcome back. The return counted immediately with +${reward.comebackBonus} recovery xp.`;
  }
  if (reward.milestoneBonus) {
    return `Nice. That hit a milestone in ${track.title.toLowerCase()} and kept the board moving.`;
  }
  return FEEDBACK_LINES[(trackStats(track).progressUnits + EFFORT_POINTS[step.effort]) % FEEDBACK_LINES.length];
}

function globalMetrics() {
  const now = new Date();
  const totalXp = state.activity.reduce((sum, entry) => sum + entry.xp, 0);
  const todayWins = state.activity.filter((entry) => dayKey(entry.completedAt) === dayKey(now)).length;
  const activeTracks = state.tracks.length;
  const level = levelForXp(totalXp);
  const progressInLevel = totalXp % LEVEL_STEP;
  const xpToNext = LEVEL_STEP - progressInLevel || LEVEL_STEP;

  return {
    totalXp,
    todayWins,
    activeTracks,
    level,
    xpToNext,
    momentum: momentumScore(state.activity, now),
    recoveryBonus: recoveryBonus(state.activity, now),
    run: streakLength(state.activity, now),
  };
}

function trackStats(track) {
  const activity = state.activity.filter((entry) => entry.trackId === track.id);
  const progressUnits = progressUnitsForTrack(track, activity);
  const target = track.mode === "milestone" ? Math.max(track.targetValue, track.steps.length, 1) : track.targetValue;
  const progressPercent = clamp((progressUnits / Math.max(target, 1)) * 100, 0, 100);
  const milestoneStep = track.mode === "focus" ? 4 : track.mode === "momentum" ? 5 : 3;
  const nextMilestone = Math.min(target, Math.max(milestoneStep, Math.ceil((progressUnits + 0.001) / milestoneStep) * milestoneStep));
  const completedStepCount = completedStepIdsForTrack(track).size;
  const openCount = track.mode === "milestone" ? Math.max(track.steps.length - completedStepCount, 0) : track.steps.length;

  return {
    totalXp: activity.reduce((sum, entry) => sum + entry.xp, 0),
    progressUnits,
    progressPercent,
    progressLabel: `${progressUnits}/${target} ${track.unitLabel}`,
    nextMilestoneLabel:
      progressUnits >= target ? "target reached" : `${Math.max(nextMilestone - progressUnits, 0)} to next milestone`,
    runLabel: streakLength(activity, new Date()) ? `${pluralize(streakLength(activity, new Date()), "day")} run` : "resume friendly",
    moveSummary:
      track.mode === "milestone"
        ? `${openCount} open, ${completedStepCount} done`
        : `${track.steps.length} reusable moves`,
  };
}

function suggestedNextMoves() {
  return [...state.tracks]
    .sort((left, right) => lastActivityTime(left) - lastActivityTime(right))
    .map((track) => {
      const step = nextStepForTrack(track);
      if (!step) {
        return null;
      }
      return { track, step };
    })
    .filter(Boolean)
    .slice(0, 3);
}

function nextStepForTrack(track) {
  const stepCounts = countCompletionsByStep(track.id);
  const completedStepIds = completedStepIdsForTrack(track);
  const candidates = track.steps.filter((step) => step.repeatable || !completedStepIds.has(step.id));
  if (!candidates.length) {
    return null;
  }

  return [...candidates].sort((left, right) => {
    const leftCount = stepCounts[left.id] || 0;
    const rightCount = stepCounts[right.id] || 0;
    if (leftCount !== rightCount) {
      return leftCount - rightCount;
    }
    return EFFORT_POINTS[left.effort] - EFFORT_POINTS[right.effort];
  })[0];
}

function countCompletionsByStep(trackId) {
  return state.activity
    .filter((entry) => entry.trackId === trackId)
    .reduce((counts, entry) => {
      counts[entry.stepId] = (counts[entry.stepId] || 0) + 1;
      return counts;
    }, {});
}

function progressUnitsForTrack(track, activity = state.activity.filter((entry) => entry.trackId === track.id)) {
  if (track.mode === "milestone") {
    return completedStepIdsForTrack(track, activity).size;
  }
  return activity.reduce((sum, entry) => sum + (entry.progressDelta || 0), 0);
}

function completedStepIdsForTrack(track, activity = state.activity.filter((entry) => entry.trackId === track.id)) {
  const validStepIds = new Set(track.steps.map((step) => step.id));
  const ids = new Set();
  activity.forEach((entry) => {
    if (track.mode !== "milestone" || validStepIds.has(entry.stepId)) {
      ids.add(entry.stepId);
    }
  });
  return ids;
}

function buildDailyBrief(metrics) {
  if (!state.tracks.length) {
    return {
      headline: "Everything starts smaller than it feels.",
      body: "Pick one avoided thing, give it a few lighter moves, and let the first win make the rest easier.",
    };
  }

  if (!metrics.todayWins && metrics.recoveryBonus) {
    return {
      headline: "A comeback day still counts as momentum.",
      body: `You do not have to erase the gap. Just take one honest step and collect the +${metrics.recoveryBonus} xp recovery bonus.`,
    };
  }

  if (!metrics.todayWins) {
    return {
      headline: "Start with the easiest move that still feels real.",
      body: DAILY_LINES[0],
    };
  }

  if (metrics.todayWins < 3) {
    return {
      headline: "Good. The day is already less stuck than it was.",
      body: DAILY_LINES[(metrics.todayWins + 1) % DAILY_LINES.length],
    };
  }

  return {
    headline: "You have momentum now. Protect it with one more clean rep.",
    body: DAILY_LINES[3],
  };
}

function renderRing(progressPercent, label, mode) {
  const circumference = 2 * Math.PI * 40;
  const dash = (progressPercent / 100) * circumference;
  return `
    <div class="ring">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="40" stroke="rgba(31, 42, 36, 0.08)"></circle>
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="var(--track-accent)"
          stroke-linecap="round"
          stroke-dasharray="${dash} ${circumference}"
        ></circle>
      </svg>
      <div class="ring__copy">
        <div>
          <strong>${escapeHtml(label)}</strong>
          <span>${escapeHtml(mode)}</span>
        </div>
      </div>
    </div>
  `;
}

function renderSparkline(values) {
  const width = 320;
  const height = 120;
  const max = Math.max(...values, 10);
  const points = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * width;
    const y = height - (value / max) * 92 - 12;
    return { x, y };
  });
  const line = points.map((point, index) => `${index ? "L" : "M"} ${point.x} ${point.y}`).join(" ");
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;

  return `
    <svg class="sparkline" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
      <path d="${area}" fill="rgba(209, 109, 74, 0.15)"></path>
      <path d="${line}" fill="none" stroke="var(--clay)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  `;
}

function levelForXp(totalXp) {
  return Math.max(1, Math.floor(totalXp / LEVEL_STEP) + 1);
}

function momentumScore(activity, now = new Date()) {
  if (!activity.length) {
    return 0;
  }

  let score = 0;
  for (let offset = 0; offset < 7; offset += 1) {
    const date = shiftDays(now, -offset);
    const count = activity.filter((entry) => dayKey(entry.completedAt) === dayKey(date)).length;
    score += Math.min(count, 3) * (7 - offset);
  }
  return clamp(score * 2, 0, 100);
}

function recoveryBonus(activity, now = new Date()) {
  if (!activity.length) {
    return 0;
  }
  const latest = new Date(activity[0].completedAt);
  const gap = dayDifference(now, latest);
  if (gap < 2) {
    return 0;
  }
  return Math.min(14, 6 + gap * 2);
}

function streakLength(activity, now = new Date()) {
  if (!activity.length) {
    return 0;
  }

  const activeDays = new Set(activity.map((entry) => dayKey(entry.completedAt)));
  let cursor = startOfDay(now);
  if (!activeDays.has(dayKey(cursor)) && activeDays.has(dayKey(shiftDays(cursor, -1)))) {
    cursor = shiftDays(cursor, -1);
  }

  let streak = 0;
  while (activeDays.has(dayKey(cursor))) {
    streak += 1;
    cursor = shiftDays(cursor, -1);
  }
  return streak;
}

function selectedMode() {
  return document.querySelector('input[name="mode"]:checked')?.value || "focus";
}

function setMode(mode) {
  const input = document.querySelector(`input[name="mode"][value="${mode}"]`);
  if (input) {
    input.checked = true;
  }
}

function kitFor(category) {
  return starterKits.find((kit) => kit.category === category) || starterKits[0] || FALLBACK_STARTER_KITS[0];
}

function deriveSuggestedStepText(kit, mode) {
  const steps = mode === "milestone" ? kit.suggested_steps : kit.suggested_steps.slice(0, 3);
  return steps.join("\n");
}

function appendSuggestion(step) {
  const current = elements.stepList.value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (!current.includes(step)) {
    current.push(step);
  }
  elements.stepList.value = current.join("\n");
}

function normalizeStepTitle(value) {
  return String(value)
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function inferEffort(index, mode) {
  if (mode === "focus") {
    return ["light", "steady", "deep"][Math.min(index, 2)];
  }
  if (mode === "momentum") {
    return index === 0 ? "light" : index >= 2 ? "deep" : "steady";
  }
  return index >= 2 ? "deep" : "steady";
}

function extractEffort(line) {
  const match = line.match(/\b(light|steady|deep)\b/i);
  return match ? match[1].toLowerCase() : "";
}

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function startOfDay(date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function dayKey(date) {
  return startOfDay(date).toISOString().slice(0, 10);
}

function shiftDays(date, amount) {
  const value = new Date(date);
  value.setDate(value.getDate() + amount);
  return value;
}

function dayDifference(later, earlier) {
  const start = startOfDay(later).getTime();
  const end = startOfDay(earlier).getTime();
  return Math.round((start - end) / 86400000);
}

function pluralize(count, noun) {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

function lastActivityTime(track) {
  const entry = state.activity.find((item) => item.trackId === track.id);
  return entry ? new Date(entry.completedAt).getTime() : new Date(track.createdAt).getTime();
}

function formatRelativeTime(isoString) {
  const deltaHours = Math.round((Date.now() - new Date(isoString).getTime()) / 3600000);
  if (deltaHours < 1) {
    return "just now";
  }
  if (deltaHours < 24) {
    return `${deltaHours}h ago`;
  }
  const deltaDays = Math.round(deltaHours / 24);
  return `${deltaDays}d ago`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(date));
}

function showToast(message) {
  elements.feedbackToast.textContent = message;
  elements.feedbackToast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    elements.feedbackToast.classList.remove("is-visible");
  }, 2600);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
