const STORAGE_KEY = "small-wins-state-v1";
const PREFS_KEY = "small-wins-prefs-v1";
const LEVEL_STEP = 120;
const EFFORT_POINTS = { light: 1, steady: 2, deep: 3 };
const XP_TABLE = {
  focus: { light: 12, steady: 20, deep: 32 },
  momentum: { light: 10, steady: 18, deep: 28 },
  milestone: { light: 14, steady: 22, deep: 34 },
};
const THEMES = {
  light: { color: "#f4efe8" },
  dark: { color: "#121617" },
  grove: { color: "#edf3ee" },
  dusk: { color: "#171c25" },
};
const LANGUAGES = ["en", "ru"];
const COLOR_TONES = ["clay", "moss", "gold", "berry", "sand", "teal", "rose", "ink"];
const FALLBACK_STARTER_KITS = [
  {
    category: "study",
    default_mode: "focus",
    target_value: 12,
    color: "clay",
    suggested_steps: ["Open the notes", "Do one focused study block", "Write a short summary"],
  },
  {
    category: "work",
    default_mode: "milestone",
    target_value: 5,
    color: "ink",
    suggested_steps: ["Outline the work", "Clear one blocker", "Ship the first draft"],
  },
  {
    category: "cleaning",
    default_mode: "milestone",
    target_value: 6,
    color: "gold",
    suggested_steps: ["Clear one surface", "Remove clutter", "Do a short reset pass"],
  },
  {
    category: "exercise",
    default_mode: "momentum",
    target_value: 10,
    color: "moss",
    suggested_steps: ["Warm up", "Do a short movement block", "Log how it felt"],
  },
  {
    category: "reading",
    default_mode: "focus",
    target_value: 8,
    color: "berry",
    suggested_steps: ["Read for ten minutes", "Underline one idea", "Write a quick note"],
  },
  {
    category: "routine",
    default_mode: "momentum",
    target_value: 14,
    color: "sand",
    suggested_steps: ["Do the two-minute version", "Do the normal version", "Leave things a bit better"],
  },
  {
    category: "creative",
    default_mode: "focus",
    target_value: 9,
    color: "teal",
    suggested_steps: ["Open the file", "Make one imperfect pass", "Leave a note for next time"],
  },
  {
    category: "reset",
    default_mode: "momentum",
    target_value: 7,
    color: "rose",
    suggested_steps: ["Pick the smallest honest move", "Work for ten minutes", "Leave a clear next step"],
  },
];
const UI_TEXT = {
  en: {
    metaDescription: "A calm app for turning avoided work into lighter, clearer progress.",
    topbar: {
      theme: "Theme",
    },
    themes: {
      light: "Light",
      dark: "Dark",
      grove: "Grove",
      dusk: "Dusk",
    },
    start: {
      kicker: "Start here",
      title: "Start a track.",
      subtitle: "Name one thing you want to move today.",
      inputLabel: "What do you want to work on?",
      modeLabel: "Mode",
      categoryLabel: "Type",
      suggestionLabel: "Quick ideas",
      create: "Start track",
      demo: "Load sample",
    },
    modes: {
      focus: {
        label: "Focus",
        note: "Sessions and repeatable reps",
      },
      momentum: {
        label: "Momentum",
        note: "Gentle consistency for routines",
      },
      milestone: {
        label: "Milestone",
        note: "Checklist progress for bigger tasks",
      },
    },
    categories: {
      study: "Study",
      work: "Work",
      cleaning: "Cleaning",
      exercise: "Exercise",
      reading: "Reading",
      routine: "Routine",
      creative: "Creative",
      reset: "Restart",
    },
    summary: {
      level: "Level",
      levelShort: "Lv.",
      today: "Today",
      run: "Run",
      momentum: "Momentum",
      toNext: "{count} xp to next",
      todayReady: "Start bonus ready",
      todayActive: "Already moving",
      recoveryReady: "+{count} recovery xp ready",
      runReady: "Resume friendly",
      momentumLow: "Ready for a first move",
      momentumMid: "Warming up",
      momentumHigh: "Holding steady",
    },
    board: {
      kicker: "Board",
      title: "Your tracks",
      add: "New track",
      emptyTitle: "Nothing on the board yet.",
      emptyBody: "Start one track above and the board becomes useful fast.",
    },
    daily: {
      kicker: "Today",
      title: "Next moves",
      empty: "Start one track and the easiest next moves will show up here.",
      brief: {
        emptyHead: "Start with one honest move.",
        emptyBody: "Useful boards begin small.",
        comebackHead: "A return still counts.",
        comebackBody: "One small action is enough to restart the day.",
        startHead: "Pick the easiest real step.",
        startBody: "Let the first move be light but true.",
        warmHead: "The day is moving.",
        warmBody: "Keep it warm with one more clean rep.",
        strongHead: "Momentum is already here.",
        strongBody: "Leave yourself an easy next step.",
      },
      log: "Log now",
    },
    activity: {
      kicker: "Recent",
      title: "Recent wins",
      empty: "Recent wins will land here.",
    },
    analytics: {
      one: "Week",
      two: "Trend",
      three: "Consistency",
      weekly: "Wins this week",
      momentum: "Momentum trend",
      heatmap: "Last 21 days",
      lighter: "Lighter",
      stronger: "Stronger",
      last14: "Last 14 days",
      up: "Moving upward",
      recoverable: "Still recoverable",
    },
    tools: {
      kicker: "Tools",
      title: "Local board",
      reflectionTitle: "Daily reflection",
      reflectionBody: "Quiet support, once a day.",
      styleLabel: "Style",
      toggleShow: "Show reflection",
      toggleHide: "Hide reflection",
      exportTitle: "Export data",
      exportBody: "Save a local backup.",
      export: "Export JSON",
      importTitle: "Import data",
      importBody: "Restore a saved board.",
      import: "Import JSON",
      resetTitle: "Clear board",
      resetBody: "Remove local tracks from this browser.",
      reset: "Clear local board",
    },
    quote: {
      kicker: "Daily reflection",
      hide: "Hide",
      styles: {
        general: "General",
        reflective: "Reflective",
        bible: "Bible-inspired",
      },
    },
    dialog: {
      kicker: "Track setup",
      firstTitle: "Build your first track",
      firstBody: "Keep it light. You can tune it later.",
      createTitle: "New track",
      createBody: "Keep the first version light.",
      editTitle: "Edit track",
      editBody: "Refine the setup without losing matching move history.",
      titleLabel: "Track name",
      categoryLabel: "Category",
      targetLabel: "Target",
      unitLabel: "Unit",
      modeLegend: "Mode",
      whyLabel: "Why it matters",
      whyPlaceholder: "A short reason helps the board feel grounded.",
      stepListLabel: "Moves",
      suggestions: "Suggested moves",
      fill: "Use suggestions",
      focusNote: "Repeatable blocks for sessions and reps.",
      momentumNote: "Gentle consistency for habits and routines.",
      milestoneNote: "Checklist progress for bigger jobs.",
      cancel: "Cancel",
      save: "Save track",
      close: "Close",
    },
    actions: {
      edit: "Edit",
      remove: "Remove",
      deleteConfirm: 'Remove "{title}" and its local history from this browser?',
      resetConfirm: "Clear the local board in this browser?",
      sampleConfirm: "Replace the current local board with the sample board?",
      exportDone: "Backup exported.",
      importDone: "Backup imported.",
      importError: "That file could not be imported.",
      resetDone: "Local board cleared.",
      sampleLoaded: "Sample board loaded.",
      trackCreated: "Track ready. Your next move is visible now.",
      trackUpdated: "Track updated.",
      quoteHidden: "Daily reflection hidden.",
      quoteShown: "Daily reflection is back.",
    },
    track: {
      moveList: "Moves",
      next: "Next up",
      repeatable: "Reusable",
      targetReached: "Target reached",
      toNext: "{count} to next milestone",
      reusable: "{count} reusable moves",
      openDone: "{open} open, {done} done",
      resumeFriendly: "Resume friendly",
      dayRun: "{count} day run",
      uses: "{count} uses",
      doneToday: "Done today",
      completed: "Done",
      xp: "xp",
    },
    feedback: {
      comeback: "Welcome back. +{count} recovery xp.",
      milestone: "Nice. That moved {title} through a milestone.",
      lines: [
        "That counts. One honest move changes the day.",
        "Nice. Starting again is part of the skill.",
        "Progress is real now, even if the move was small.",
        "A lighter step still changes the shape of the day.",
        "Momentum likes evidence. You just gave it some.",
        "The board is clearer now. That matters.",
      ],
    },
  },
  ru: {
    metaDescription: "Спокойное приложение, которое превращает тяжёлые дела в более ясный и посильный прогресс.",
    topbar: {
      theme: "Тема",
    },
    themes: {
      light: "Светлая",
      dark: "Тёмная",
      grove: "Роща",
      dusk: "Сумерки",
    },
    start: {
      kicker: "Старт",
      title: "Начните трек.",
      subtitle: "Назовите одно дело, которое хотите сдвинуть сегодня.",
      inputLabel: "Над чем хотите поработать?",
      modeLabel: "Режим",
      categoryLabel: "Тип",
      suggestionLabel: "Быстрые идеи",
      create: "Запустить трек",
      demo: "Загрузить пример",
    },
    modes: {
      focus: {
        label: "Фокус",
        note: "Сессии и повторяемые заходы",
      },
      momentum: {
        label: "Ритм",
        note: "Мягкая регулярность для привычек",
      },
      milestone: {
        label: "Этапы",
        note: "Чеклист для более крупных дел",
      },
    },
    categories: {
      study: "Учёба",
      work: "Работа",
      cleaning: "Порядок",
      exercise: "Тренировки",
      reading: "Чтение",
      routine: "Рутина",
      creative: "Творчество",
      reset: "Перезапуск",
    },
    summary: {
      level: "Уровень",
      levelShort: "Ур.",
      today: "Сегодня",
      run: "Серия",
      momentum: "Ритм",
      toNext: "{count} xp до следующего",
      todayReady: "Бонус за старт готов",
      todayActive: "День уже сдвинулся",
      recoveryReady: "Готово +{count} xp за возвращение",
      runReady: "Можно спокойно вернуться",
      momentumLow: "Готово к первому шагу",
      momentumMid: "Ритм разогревается",
      momentumHigh: "Ритм держится",
    },
    board: {
      kicker: "Доска",
      title: "Ваши треки",
      add: "Новый трек",
      emptyTitle: "На доске пока ничего нет.",
      emptyBody: "Создайте один трек выше, и пространство сразу станет полезным.",
    },
    daily: {
      kicker: "Сегодня",
      title: "Следующие шаги",
      empty: "Создайте один трек, и здесь появятся самые лёгкие следующие шаги.",
      brief: {
        emptyHead: "Начните с одного честного шага.",
        emptyBody: "Полезная доска всегда начинается с малого.",
        comebackHead: "Возвращение тоже считается.",
        comebackBody: "Одного небольшого действия достаточно, чтобы перезапустить день.",
        startHead: "Выберите самый лёгкий реальный шаг.",
        startBody: "Пусть первый ход будет лёгким, но настоящим.",
        warmHead: "День уже движется.",
        warmBody: "Поддержите это ещё одним чистым подходом.",
        strongHead: "Ритм уже появился.",
        strongBody: "Оставьте себе лёгкий следующий шаг.",
      },
      log: "Отметить",
    },
    activity: {
      kicker: "Недавно",
      title: "Последние победы",
      empty: "Здесь будут появляться последние маленькие победы.",
    },
    analytics: {
      one: "Неделя",
      two: "Тренд",
      three: "Ровность",
      weekly: "Победы за неделю",
      momentum: "Динамика ритма",
      heatmap: "Последние 21 день",
      lighter: "Слабее",
      stronger: "Сильнее",
      last14: "Последние 14 дней",
      up: "Есть рост",
      recoverable: "Можно спокойно вернуть",
    },
    tools: {
      kicker: "Инструменты",
      title: "Локальная доска",
      reflectionTitle: "Мысль дня",
      reflectionBody: "Тихая поддержка, один раз в день.",
      styleLabel: "Стиль",
      toggleShow: "Показать мысль",
      toggleHide: "Скрыть мысль",
      exportTitle: "Экспорт данных",
      exportBody: "Сохранить локальную копию.",
      export: "Экспорт JSON",
      importTitle: "Импорт данных",
      importBody: "Вернуть сохранённую доску.",
      import: "Импорт JSON",
      resetTitle: "Очистить доску",
      resetBody: "Удалить локальные треки в этом браузере.",
      reset: "Очистить локальную доску",
    },
    quote: {
      kicker: "Мысль дня",
      hide: "Скрыть",
      styles: {
        general: "Общее",
        reflective: "Размышление",
        bible: "С библейским вдохновением",
      },
    },
    dialog: {
      kicker: "Настройка трека",
      firstTitle: "Соберите первый трек",
      firstBody: "Пусть первая версия будет лёгкой. Потом можно настроить точнее.",
      createTitle: "Новый трек",
      createBody: "Первая версия должна быть посильной.",
      editTitle: "Изменить трек",
      editBody: "Настройте трек точнее, не теряя историю совпадающих шагов.",
      titleLabel: "Название трека",
      categoryLabel: "Категория",
      targetLabel: "Цель",
      unitLabel: "Единица",
      modeLegend: "Режим",
      whyLabel: "Зачем это важно",
      whyPlaceholder: "Короткая причина делает трек более живым.",
      stepListLabel: "Шаги",
      suggestions: "Подсказки",
      fill: "Подставить шаги",
      focusNote: "Повторяемые блоки для сессий и подходов.",
      momentumNote: "Мягкая регулярность для привычек и рутины.",
      milestoneNote: "Чеклист для больших задач и уборки.",
      cancel: "Отмена",
      save: "Сохранить трек",
      close: "Закрыть",
    },
    actions: {
      edit: "Изменить",
      remove: "Удалить",
      deleteConfirm: 'Удалить "{title}" и его локальную историю в этом браузере?',
      resetConfirm: "Очистить локальную доску в этом браузере?",
      sampleConfirm: "Заменить текущую локальную доску примером?",
      exportDone: "Резервная копия сохранена.",
      importDone: "Резервная копия импортирована.",
      importError: "Этот файл не удалось импортировать.",
      resetDone: "Локальная доска очищена.",
      sampleLoaded: "Пример доски загружен.",
      trackCreated: "Трек готов. Следующий шаг уже виден.",
      trackUpdated: "Трек обновлён.",
      quoteHidden: "Мысль дня скрыта.",
      quoteShown: "Мысль дня снова включена.",
    },
    track: {
      moveList: "Шаги",
      next: "Дальше",
      repeatable: "Повторяемо",
      targetReached: "Цель достигнута",
      toNext: "{count} до следующего этапа",
      reusable: "{count} повторяемых шагов",
      openDone: "{open} открыто, {done} сделано",
      resumeFriendly: "Можно спокойно вернуться",
      dayRun: "{count} дней подряд",
      uses: "{count} использований",
      doneToday: "Сегодня уже было",
      completed: "Сделано",
      xp: "xp",
    },
    feedback: {
      comeback: "С возвращением. +{count} xp за новый заход.",
      milestone: "Хорошо. В треке «{title}» вы закрыли ещё один этап.",
      lines: [
        "Это считается. Один честный шаг уже меняет день.",
        "Хорошо. Умение начинать заново тоже навык.",
        "Прогресс уже стал реальным, даже если шаг был маленьким.",
        "Даже лёгкий шаг меняет форму дня.",
        "Ритму нужны доказательства. Вы как раз дали одно.",
        "Доска стала яснее. Это важно.",
      ],
    },
  },
};
const SHELL_TEXT = {
  en: {
    today: "Today",
    progress: "Progress",
    settings: "Settings",
    progressTitle: "Progress over time",
    progressEmpty: "Start one track and progress will show up here.",
  },
  ru: {
    today: "Сегодня",
    progress: "Прогресс",
    settings: "Настройки",
    progressTitle: "Прогресс во времени",
    progressEmpty: "Создайте первый трек, и здесь появится прогресс.",
  },
};
const KIT_COPY = {
  en: {
    study: {
      prompt: "Finish the material hanging over me",
      description: "Lighter study reps with visible momentum.",
      unit: "study blocks",
      ideas: ["Review one lecture", "Prepare for the exam", "Catch up on reading"],
      steps: [
        "Open the notes and choose one section",
        "Do one focused study block",
        "Write three recall questions from memory",
        "Close with a two-line summary",
      ],
    },
    work: {
      prompt: "Ship the project without carrying it all day in my head",
      description: "Keep meaningful work moving when tasks feel sticky.",
      unit: "moves",
      ideas: ["Move one project forward", "Finish a rough draft", "Clear one blocker"],
      steps: [
        "Write the rough outline",
        "Clear one blocking decision",
        "Ship the first usable draft",
        "Review and tighten the final pass",
      ],
    },
    cleaning: {
      prompt: "Reset the space without turning it into a whole event",
      description: "Make maintenance feel finite and satisfying.",
      unit: "zones",
      ideas: ["Reset the desk", "Do a kitchen reset", "Tidy one room"],
      steps: [
        "Clear one visible surface",
        "Collect and remove obvious clutter",
        "Do a ten-minute reset pass",
        "Finish with one room that feels lighter",
      ],
    },
    exercise: {
      prompt: "Make exercise easier to return to",
      description: "Reward showing up, not just heroic sessions.",
      unit: "movement wins",
      ideas: ["Do a short workout", "Restart training", "Take a movement session"],
      steps: [
        "Put on workout clothes and warm up",
        "Do a short movement block",
        "Finish one stronger set or interval",
        "Log how the session felt",
      ],
    },
    reading: {
      prompt: "Read more consistently without making it feel like homework",
      description: "Keep books and articles active with a light rhythm.",
      unit: "reading sessions",
      ideas: ["Read one chapter", "Return to the book", "Read for ten minutes"],
      steps: [
        "Read for ten focused minutes",
        "Underline one useful idea",
        "Write a quick note on what stayed with me",
      ],
    },
    routine: {
      prompt: "Keep my baseline routine warm",
      description: "Build gentle consistency for the things that make life easier.",
      unit: "daily wins",
      ideas: ["Restart my morning routine", "Keep the basics warm", "Do the small usual things"],
      steps: [
        "Do the two-minute version",
        "Complete the usual version",
        "Leave the space a little better than I found it",
      ],
    },
    creative: {
      prompt: "Make creative work easier to enter and easier to continue",
      description: "Protect momentum in meaningful work that is easy to avoid.",
      unit: "creative reps",
      ideas: ["Return to the draft", "Touch the creative work", "Make one imperfect pass"],
      steps: [
        "Open the file and touch the work",
        "Make one imperfect pass",
        "Push one section until it feels alive",
        "Leave a note for the next session",
      ],
    },
    reset: {
      prompt: "Get unstuck without making the day feel lost",
      description: "A flexible track for days when the main goal is simply to begin.",
      unit: "restart wins",
      ideas: ["Get unstuck", "Restart the day", "Do one honest next step"],
      steps: [
        "Pick the smallest honest next move",
        "Do ten minutes with the timer on",
        "Close one open loop",
        "Leave a clear next step for later",
      ],
    },
  },
  ru: {
    study: {
      prompt: "Закрыть материал, который давно висит надо мной",
      description: "Учёба через более лёгкие и повторяемые заходы.",
      unit: "учебных блока",
      ideas: ["Повторить одну лекцию", "Подготовиться к экзамену", "Дочитать конспекты"],
      steps: [
        "Открыть конспект и выбрать один раздел",
        "Сделать один сфокусированный учебный блок",
        "Записать три вопроса по памяти",
        "Закрыть всё коротким итогом в две строки",
      ],
    },
    work: {
      prompt: "Сдвинуть проект, не таская его весь день в голове",
      description: "Держать важную работу в движении, когда она начинает вязнуть.",
      unit: "шагов",
      ideas: ["Продвинуть проект", "Закрыть черновик", "Снять один блокер"],
      steps: [
        "Набросать грубый каркас",
        "Разобрать одно блокирующее решение",
        "Собрать первую рабочую версию",
        "Сделать финальный проход и подтянуть слабые места",
      ],
    },
    cleaning: {
      prompt: "Вернуть порядок без ощущения большого мероприятия",
      description: "Сделать поддержание порядка конечным и приятным.",
      unit: "зон",
      ideas: ["Собрать рабочий стол", "Сделать кухонный ресет", "Привести в порядок одну комнату"],
      steps: [
        "Освободить одну заметную поверхность",
        "Собрать и убрать очевидный лишний хаос",
        "Сделать десятиминутный проход по пространству",
        "Закончить одной зоной, где реально стало легче дышать",
      ],
    },
    exercise: {
      prompt: "Сделать возвращение к тренировкам проще",
      description: "Награждать за появление, а не только за героические сессии.",
      unit: "побед движения",
      ideas: ["Сделать короткую тренировку", "Вернуться к движению", "Провести одну сессию"],
      steps: [
        "Переодеться и размяться",
        "Сделать короткий блок движения",
        "Закончить одним более сильным подходом или интервалом",
        "Коротко отметить, как ощущалось занятие",
      ],
    },
    reading: {
      prompt: "Читать регулярнее, не превращая это в домашнее задание",
      description: "Держать книги и статьи живыми через лёгкий ритм.",
      unit: "сессий чтения",
      ideas: ["Прочитать одну главу", "Вернуться к книге", "Почитать десять минут"],
      steps: [
        "Почитать десять минут без отвлечений",
        "Подчеркнуть одну полезную мысль",
        "Оставить короткую заметку о том, что осталось в голове",
      ],
    },
    routine: {
      prompt: "Поддержать базовую рутину в тёплом состоянии",
      description: "Мягкая регулярность для вещей, которые облегчают жизнь.",
      unit: "ежедневных побед",
      ideas: ["Вернуть утреннюю рутину", "Поддержать базу", "Сделать обычные мелочи"],
      steps: [
        "Сделать двухминутную версию",
        "Сделать обычную версию",
        "Оставить пространство немного лучше, чем было",
      ],
    },
    creative: {
      prompt: "Сделать вход в творческую работу проще, а продолжение естественнее",
      description: "Беречь ритм в важной работе, которую легко откладывать.",
      unit: "творческих заходов",
      ideas: ["Вернуться к черновику", "Коснуться работы", "Сделать один несовершенный проход"],
      steps: [
        "Открыть файл и просто войти в работу",
        "Сделать один несовершенный проход",
        "Дотянуть один кусок до живого состояния",
        "Оставить заметку для следующей сессии",
      ],
    },
    reset: {
      prompt: "Выйти из застоя, не превращая день в потерянный",
      description: "Гибкий трек для дней, когда главное просто начать.",
      unit: "побед перезапуска",
      ideas: ["Сдвинуться с места", "Перезапустить день", "Сделать один честный шаг"],
      steps: [
        "Выбрать самый маленький честный следующий шаг",
        "Поработать десять минут с таймером",
        "Закрыть одну открытую петлю",
        "Оставить понятный следующий шаг на потом",
      ],
    },
  },
};
const QUOTE_POOLS = {
  en: {
    general: [
      { text: "Small work still counts." },
      { text: "A clear next step can be enough for today." },
      { text: "You do not need a dramatic start." },
      { text: "A short return still changes the day." },
      { text: "Steady is enough for today." },
      { text: "One honest move beats a lot of pressure." },
      { text: "Progress can be quiet and still be real." },
      { text: "Leave the next step easy to find." },
    ],
    reflective: [
      { text: "What feels heavy often gets lighter after contact." },
      { text: "You can begin again without turning it into a story." },
      { text: "Patience is also part of good work." },
      { text: "A calm pace can still carry real weight." },
      { text: "You are allowed to build trust with yourself slowly." },
      { text: "Careful work grows from repeatable beginnings." },
      { text: "Not every good day has to feel intense." },
      { text: "Enough to begin is enough to respect." },
    ],
    bible: [
      { text: "Faithful work often looks small at first.", source: "Inspired by Luke 16:10" },
      { text: "Do the good that fits inside today.", source: "Inspired by Galatians 6:9" },
      { text: "Quiet strength can still hold the day.", source: "Inspired by Isaiah 30:15" },
      { text: "Light placed well can guide the next step.", source: "Inspired by Psalm 119:105" },
      { text: "Begin with what is in your hands.", source: "Inspired by Ecclesiastes 9:10" },
      { text: "Peace and clear attention often work together.", source: "Inspired by 1 Corinthians 14:33" },
      { text: "It is enough to return and keep going.", source: "Inspired by Philippians 3:13-14" },
      { text: "Care for today’s work with a steady heart.", source: "Inspired by Colossians 3:23" },
    ],
  },
  ru: {
    general: [
      { text: "Маленькая работа тоже считается." },
      { text: "На сегодня может хватить одного ясного шага." },
      { text: "Не нужен большой драматичный старт." },
      { text: "Даже короткое возвращение меняет день." },
      { text: "На сегодня достаточно спокойной ровности." },
      { text: "Один честный ход лучше, чем много внутреннего давления." },
      { text: "Прогресс может быть тихим и всё равно настоящим." },
      { text: "Оставьте следующий шаг там, где его легко найти." },
    ],
    reflective: [
      { text: "То, что кажется тяжёлым, часто становится легче после первого касания." },
      { text: "Можно начать заново и не делать из этого отдельную историю." },
      { text: "Терпение тоже часть хорошей работы." },
      { text: "Спокойный темп тоже может нести реальный вес." },
      { text: "С собой можно заново выстраивать доверие медленно." },
      { text: "Аккуратная работа растёт из повторяемых начал." },
      { text: "Не каждый хороший день должен быть интенсивным." },
      { text: "Достаточно того, что помогает начать по-настоящему." },
    ],
    bible: [
      { text: "Верность часто начинается с малого.", source: "Лк. 16:10" },
      { text: "Сделайте сегодня то доброе, что помещается в день.", source: "Гал. 6:9" },
      { text: "Тихая сила тоже держит день.", source: "Ис. 30:15" },
      { text: "Свет, поставленный верно, помогает сделать следующий шаг.", source: "Пс. 118:105" },
      { text: "Начните с того, что уже есть в ваших руках.", source: "Еккл. 9:10" },
      { text: "Мир и ясность хорошо работают вместе.", source: "1 Кор. 14:33" },
      { text: "Достаточно вернуться и идти дальше.", source: "Флп. 3:13-14" },
      { text: "Позаботьтесь о сегодняшнем деле с ровным сердцем.", source: "Кол. 3:23" },
    ],
  },
};
// bible-inspired lines stay original and only reference the verse.
const BIBLE_QUOTES = [
  {
    id: "quote-001",
    mode: "bible-inspired",
    category: "small-steps",
    text: {
      ru: "Маленький шаг тоже считается.",
      en: "A small step still counts.",
    },
    source: {
      ref: "Luke 16:10",
      labelRu: "По мотивам Лк. 16:10",
      labelEn: "Inspired by Luke 16:10",
    },
  },
  {
    id: "quote-002",
    mode: "bible-inspired",
    category: "small-steps",
    text: {
      ru: "То, что ты делаешь в малом, уже строит большее.",
      en: "What you do in small things already builds something bigger.",
    },
    source: {
      ref: "Luke 16:10",
      labelRu: "По мотивам Лк. 16:10",
      labelEn: "Inspired by Luke 16:10",
    },
  },
  {
    id: "quote-003",
    mode: "bible-inspired",
    category: "small-steps",
    text: {
      ru: "Верность малому — не мелочь, а начало.",
      en: "Faithfulness in small things is not trivial; it is a beginning.",
    },
    source: {
      ref: "Luke 16:10",
      labelRu: "По мотивам Лк. 16:10",
      labelEn: "Inspired by Luke 16:10",
    },
  },
  {
    id: "quote-004",
    mode: "bible-inspired",
    category: "small-steps",
    text: {
      ru: "Не обесценивай тихий прогресс.",
      en: "Do not dismiss quiet progress.",
    },
    source: {
      ref: "Luke 16:10",
      labelRu: "По мотивам Лк. 16:10",
      labelEn: "Inspired by Luke 16:10",
    },
  },
  {
    id: "quote-005",
    mode: "bible-inspired",
    category: "small-steps",
    text: {
      ru: "Сегодняшнее малое усилие может держать завтрашний рост.",
      en: "Today’s small effort can hold tomorrow’s growth.",
    },
    source: {
      ref: "Luke 16:10",
      labelRu: "По мотивам Лк. 16:10",
      labelEn: "Inspired by Luke 16:10",
    },
  },
  {
    id: "quote-006",
    mode: "bible-inspired",
    category: "small-beginnings",
    text: {
      ru: "Малое начало — не слабость, а путь.",
      en: "A small beginning is not weakness; it is a path.",
    },
    source: {
      ref: "Zechariah 4:10",
      labelRu: "По мотивам Зах. 4:10",
      labelEn: "Inspired by Zechariah 4:10",
    },
  },
  {
    id: "quote-007",
    mode: "bible-inspired",
    category: "small-beginnings",
    text: {
      ru: "Не всё великое выглядит большим в первый день.",
      en: "Not everything great looks big on the first day.",
    },
    source: {
      ref: "Zechariah 4:10",
      labelRu: "По мотивам Зах. 4:10",
      labelEn: "Inspired by Zechariah 4:10",
    },
  },
  {
    id: "quote-008",
    mode: "bible-inspired",
    category: "small-beginnings",
    text: {
      ru: "Сегодня достаточно начать скромно.",
      en: "Today, it is enough to begin modestly.",
    },
    source: {
      ref: "Zechariah 4:10",
      labelRu: "По мотивам Зах. 4:10",
      labelEn: "Inspired by Zechariah 4:10",
    },
  },
  {
    id: "quote-009",
    mode: "bible-inspired",
    category: "small-beginnings",
    text: {
      ru: "Не смотри свысока на маленький прогресс.",
      en: "Do not look down on small progress.",
    },
    source: {
      ref: "Zechariah 4:10",
      labelRu: "По мотивам Зах. 4:10",
      labelEn: "Inspired by Zechariah 4:10",
    },
  },
  {
    id: "quote-010",
    mode: "bible-inspired",
    category: "small-beginnings",
    text: {
      ru: "Небольшое, но настоящее — уже хорошо.",
      en: "Small but real is already good.",
    },
    source: {
      ref: "Zechariah 4:10",
      labelRu: "По мотивам Зах. 4:10",
      labelEn: "Inspired by Zechariah 4:10",
    },
  },
  {
    id: "quote-011",
    mode: "bible-inspired",
    category: "keep-going",
    text: {
      ru: "Не всё приходит сразу, но не всё теряется.",
      en: "Not everything comes at once, but not everything is lost.",
    },
    source: {
      ref: "Galatians 6:9",
      labelRu: "По мотивам Гал. 6:9",
      labelEn: "Inspired by Galatians 6:9",
    },
  },
  {
    id: "quote-012",
    mode: "bible-inspired",
    category: "keep-going",
    text: {
      ru: "Продолжать тихо — тоже сила.",
      en: "Quietly continuing is also a form of strength.",
    },
    source: {
      ref: "Galatians 6:9",
      labelRu: "По мотивам Гал. 6:9",
      labelEn: "Inspired by Galatians 6:9",
    },
  },
  {
    id: "quote-013",
    mode: "bible-inspired",
    category: "keep-going",
    text: {
      ru: "Не сдавайся только потому, что результат ещё не виден.",
      en: "Do not give up just because the result is not visible yet.",
    },
    source: {
      ref: "Galatians 6:9",
      labelRu: "По мотивам Гал. 6:9",
      labelEn: "Inspired by Galatians 6:9",
    },
  },
  {
    id: "quote-014",
    mode: "bible-inspired",
    category: "keep-going",
    text: {
      ru: "Усталость не отменяет смысла пути.",
      en: "Tiredness does not cancel the meaning of the path.",
    },
    source: {
      ref: "Galatians 6:9",
      labelRu: "По мотивам Гал. 6:9",
      labelEn: "Inspired by Galatians 6:9",
    },
  },
  {
    id: "quote-015",
    mode: "bible-inspired",
    category: "keep-going",
    text: {
      ru: "Иногда победа — просто не бросить.",
      en: "Sometimes the win is simply not quitting.",
    },
    source: {
      ref: "Galatians 6:9",
      labelRu: "По мотивам Гал. 6:9",
      labelEn: "Inspired by Galatians 6:9",
    },
  },
  {
    id: "quote-016",
    mode: "bible-inspired",
    category: "start-again",
    text: {
      ru: "Срыв — не конец, если ты встаёшь снова.",
      en: "A setback is not the end if you stand up again.",
    },
    source: {
      ref: "Proverbs 24:16",
      labelRu: "По мотивам Притч. 24:16",
      labelEn: "Inspired by Proverbs 24:16",
    },
  },
  {
    id: "quote-017",
    mode: "bible-inspired",
    category: "start-again",
    text: {
      ru: "Возвращение после паузы — тоже прогресс.",
      en: "Returning after a pause is also progress.",
    },
    source: {
      ref: "Proverbs 24:16",
      labelRu: "По мотивам Притч. 24:16",
      labelEn: "Inspired by Proverbs 24:16",
    },
  },
  {
    id: "quote-018",
    mode: "bible-inspired",
    category: "start-again",
    text: {
      ru: "Ошибка не определяет весь день.",
      en: "One mistake does not define the whole day.",
    },
    source: {
      ref: "Proverbs 24:16",
      labelRu: "По мотивам Притч. 24:16",
      labelEn: "Inspired by Proverbs 24:16",
    },
  },
  {
    id: "quote-019",
    mode: "bible-inspired",
    category: "start-again",
    text: {
      ru: "Главное не идеальность, а способность продолжить.",
      en: "What matters is not perfection, but the ability to continue.",
    },
    source: {
      ref: "Proverbs 24:16",
      labelRu: "По мотивам Притч. 24:16",
      labelEn: "Inspired by Proverbs 24:16",
    },
  },
  {
    id: "quote-020",
    mode: "bible-inspired",
    category: "start-again",
    text: {
      ru: "Ты можешь начать заново без стыда.",
      en: "You can begin again without shame.",
    },
    source: {
      ref: "Proverbs 24:16",
      labelRu: "По мотивам Притч. 24:16",
      labelEn: "Inspired by Proverbs 24:16",
    },
  },
  {
    id: "quote-021",
    mode: "bible-inspired",
    category: "today",
    text: {
      ru: "Не тащи завтра в сегодняшний шаг.",
      en: "Do not carry tomorrow into today’s step.",
    },
    source: {
      ref: "Matthew 6:34",
      labelRu: "По мотивам Мф. 6:34",
      labelEn: "Inspired by Matthew 6:34",
    },
  },
  {
    id: "quote-022",
    mode: "bible-inspired",
    category: "today",
    text: {
      ru: "Сегодняшняя задача уже достаточно важна.",
      en: "Today’s task is important enough.",
    },
    source: {
      ref: "Matthew 6:34",
      labelRu: "По мотивам Мф. 6:34",
      labelEn: "Inspired by Matthew 6:34",
    },
  },
  {
    id: "quote-023",
    mode: "bible-inspired",
    category: "today",
    text: {
      ru: "Иногда лучший способ идти дальше — вернуться в сегодня.",
      en: "Sometimes the best way forward is to return to today.",
    },
    source: {
      ref: "Matthew 6:34",
      labelRu: "По мотивам Мф. 6:34",
      labelEn: "Inspired by Matthew 6:34",
    },
  },
  {
    id: "quote-024",
    mode: "bible-inspired",
    category: "today",
    text: {
      ru: "Сделай то, что перед тобой сейчас.",
      en: "Do what is in front of you now.",
    },
    source: {
      ref: "Matthew 6:34",
      labelRu: "По мотивам Мф. 6:34",
      labelEn: "Inspired by Matthew 6:34",
    },
  },
  {
    id: "quote-025",
    mode: "bible-inspired",
    category: "today",
    text: {
      ru: "День становится легче, когда не живёшь за двоих — за себя и за завтра.",
      en: "The day gets lighter when you stop living for both today and tomorrow.",
    },
    source: {
      ref: "Matthew 6:34",
      labelRu: "По мотивам Мф. 6:34",
      labelEn: "Inspired by Matthew 6:34",
    },
  },
  {
    id: "quote-026",
    mode: "bible-inspired",
    category: "new-morning",
    text: {
      ru: "Новое утро не обязано повторять вчерашнюю тяжесть.",
      en: "A new morning does not have to repeat yesterday’s weight.",
    },
    source: {
      ref: "Lamentations 3:22–23",
      labelRu: "По мотивам Плач. 3:22–23",
      labelEn: "Inspired by Lamentations 3:22–23",
    },
  },
  {
    id: "quote-027",
    mode: "bible-inspired",
    category: "new-morning",
    text: {
      ru: "Сегодня можно начать мягче.",
      en: "Today can begin more gently.",
    },
    source: {
      ref: "Lamentations 3:22–23",
      labelRu: "По мотивам Плач. 3:22–23",
      labelEn: "Inspired by Lamentations 3:22–23",
    },
  },
  {
    id: "quote-028",
    mode: "bible-inspired",
    category: "new-morning",
    text: {
      ru: "Утро — это не отчёт о провале, а шанс продолжить.",
      en: "Morning is not a failure report; it is a chance to continue.",
    },
    source: {
      ref: "Lamentations 3:22–23",
      labelRu: "По мотивам Плач. 3:22–23",
      labelEn: "Inspired by Lamentations 3:22–23",
    },
  },
  {
    id: "quote-029",
    mode: "bible-inspired",
    category: "new-morning",
    text: {
      ru: "Новая попытка не выглядит глупо. Она выглядит живой.",
      en: "A new attempt does not look foolish. It looks alive.",
    },
    source: {
      ref: "Lamentations 3:22–23",
      labelRu: "По мотивам Плач. 3:22–23",
      labelEn: "Inspired by Lamentations 3:22–23",
    },
  },
  {
    id: "quote-030",
    mode: "bible-inspired",
    category: "new-morning",
    text: {
      ru: "Сегодняшняя милость больше вчерашнего срыва.",
      en: "Today’s mercy is greater than yesterday’s slip.",
    },
    source: {
      ref: "Lamentations 3:22–23",
      labelRu: "По мотивам Плач. 3:22–23",
      labelEn: "Inspired by Lamentations 3:22–23",
    },
  },
  {
    id: "quote-031",
    mode: "bible-inspired",
    category: "action",
    text: {
      ru: "Движение меняет больше, чем бесконечное обдумывание.",
      en: "Movement changes more than endless thinking.",
    },
    source: {
      ref: "Proverbs 14:23",
      labelRu: "По мотивам Притч. 14:23",
      labelEn: "Inspired by Proverbs 14:23",
    },
  },
  {
    id: "quote-032",
    mode: "bible-inspired",
    category: "action",
    text: {
      ru: "Даже небольшой труд даёт больше, чем откладывание.",
      en: "Even small work gives more than delay.",
    },
    source: {
      ref: "Proverbs 14:23",
      labelRu: "По мотивам Притч. 14:23",
      labelEn: "Inspired by Proverbs 14:23",
    },
  },
  {
    id: "quote-033",
    mode: "bible-inspired",
    category: "action",
    text: {
      ru: "Сделанное лучше идеального плана без шага.",
      en: "Done is better than a perfect plan with no step.",
    },
    source: {
      ref: "Proverbs 14:23",
      labelRu: "По мотивам Притч. 14:23",
      labelEn: "Inspired by Proverbs 14:23",
    },
  },
  {
    id: "quote-034",
    mode: "bible-inspired",
    category: "action",
    text: {
      ru: "Не жди идеального настроения, чтобы сделать полезное.",
      en: "Do not wait for the perfect mood to do something useful.",
    },
    source: {
      ref: "Proverbs 14:23",
      labelRu: "По мотивам Притч. 14:23",
      labelEn: "Inspired by Proverbs 14:23",
    },
  },
  {
    id: "quote-035",
    mode: "bible-inspired",
    category: "action",
    text: {
      ru: "Иногда лучший ответ тревоге — простое действие.",
      en: "Sometimes the best answer to anxiety is a simple action.",
    },
    source: {
      ref: "Proverbs 14:23",
      labelRu: "По мотивам Притч. 14:23",
      labelEn: "Inspired by Proverbs 14:23",
    },
  },
  {
    id: "quote-036",
    mode: "bible-inspired",
    category: "wholehearted-work",
    text: {
      ru: "То, что ты делаешь с сердцем, уже имеет вес.",
      en: "What you do wholeheartedly already carries weight.",
    },
    source: {
      ref: "Colossians 3:23",
      labelRu: "По мотивам Кол. 3:23",
      labelEn: "Inspired by Colossians 3:23",
    },
  },
  {
    id: "quote-037",
    mode: "bible-inspired",
    category: "wholehearted-work",
    text: {
      ru: "Даже обычное дело можно сделать достойно.",
      en: "Even an ordinary task can be done with dignity.",
    },
    source: {
      ref: "Colossians 3:23",
      labelRu: "По мотивам Кол. 3:23",
      labelEn: "Inspired by Colossians 3:23",
    },
  },
  {
    id: "quote-038",
    mode: "bible-inspired",
    category: "wholehearted-work",
    text: {
      ru: "Смысл появляется не только в больших делах.",
      en: "Meaning does not live only in big work.",
    },
    source: {
      ref: "Colossians 3:23",
      labelRu: "По мотивам Кол. 3:23",
      labelEn: "Inspired by Colossians 3:23",
    },
  },
  {
    id: "quote-039",
    mode: "bible-inspired",
    category: "wholehearted-work",
    text: {
      ru: "Делай честно то, что дано тебе сегодня.",
      en: "Do honestly what has been given to you today.",
    },
    source: {
      ref: "Colossians 3:23",
      labelRu: "По мотивам Кол. 3:23",
      labelEn: "Inspired by Colossians 3:23",
    },
  },
  {
    id: "quote-040",
    mode: "bible-inspired",
    category: "wholehearted-work",
    text: {
      ru: "Тихая добросовестность тоже красива.",
      en: "Quiet diligence is beautiful too.",
    },
    source: {
      ref: "Colossians 3:23",
      labelRu: "По мотивам Кол. 3:23",
      labelEn: "Inspired by Colossians 3:23",
    },
  },
  {
    id: "quote-041",
    mode: "bible-inspired",
    category: "discipline",
    text: {
      ru: "Не всё полезное приятно в моменте.",
      en: "Not everything helpful feels pleasant in the moment.",
    },
    source: {
      ref: "Hebrews 12:11",
      labelRu: "По мотивам Евр. 12:11",
      labelEn: "Inspired by Hebrews 12:11",
    },
  },
  {
    id: "quote-042",
    mode: "bible-inspired",
    category: "discipline",
    text: {
      ru: "Трудный ритм может позже стать тихим миром.",
      en: "A difficult rhythm can later become quiet peace.",
    },
    source: {
      ref: "Hebrews 12:11",
      labelRu: "По мотивам Евр. 12:11",
      labelEn: "Inspired by Hebrews 12:11",
    },
  },
  {
    id: "quote-043",
    mode: "bible-inspired",
    category: "discipline",
    text: {
      ru: "Дисциплина не всегда радует сразу, но часто спасает позже.",
      en: "Discipline does not always feel good at once, but it often saves later.",
    },
    source: {
      ref: "Hebrews 12:11",
      labelRu: "По мотивам Евр. 12:11",
      labelEn: "Inspired by Hebrews 12:11",
    },
  },
  {
    id: "quote-044",
    mode: "bible-inspired",
    category: "discipline",
    text: {
      ru: "Маленькая устойчивость сегодня может стать опорой завтра.",
      en: "Small steadiness today can become support tomorrow.",
    },
    source: {
      ref: "Hebrews 12:11",
      labelRu: "По мотивам Евр. 12:11",
      labelEn: "Inspired by Hebrews 12:11",
    },
  },
  {
    id: "quote-045",
    mode: "bible-inspired",
    category: "discipline",
    text: {
      ru: "Мир иногда приходит через тренировку, а не через избегание.",
      en: "Peace sometimes comes through training, not avoidance.",
    },
    source: {
      ref: "Hebrews 12:11",
      labelRu: "По мотивам Евр. 12:11",
      labelEn: "Inspired by Hebrews 12:11",
    },
  },
  {
    id: "quote-046",
    mode: "bible-inspired",
    category: "renewed-strength",
    text: {
      ru: "Сила не всегда громкая. Иногда она просто возвращается.",
      en: "Strength is not always loud. Sometimes it simply returns.",
    },
    source: {
      ref: "Isaiah 40:31",
      labelRu: "По мотивам Ис. 40:31",
      labelEn: "Inspired by Isaiah 40:31",
    },
  },
  {
    id: "quote-047",
    mode: "bible-inspired",
    category: "renewed-strength",
    text: {
      ru: "Можно идти медленно и всё равно не сдаваться.",
      en: "You can move slowly and still not give up.",
    },
    source: {
      ref: "Isaiah 40:31",
      labelRu: "По мотивам Ис. 40:31",
      labelEn: "Inspired by Isaiah 40:31",
    },
  },
  {
    id: "quote-048",
    mode: "bible-inspired",
    category: "renewed-strength",
    text: {
      ru: "Если сегодня нет рывка, пусть будет шаг.",
      en: "If there is no burst today, let there be a step.",
    },
    source: {
      ref: "Isaiah 40:31",
      labelRu: "По мотивам Ис. 40:31",
      labelEn: "Inspired by Isaiah 40:31",
    },
  },
  {
    id: "quote-049",
    mode: "bible-inspired",
    category: "renewed-strength",
    text: {
      ru: "Обновление приходит не всегда быстро, но приходит.",
      en: "Renewal does not always come quickly, but it comes.",
    },
    source: {
      ref: "Isaiah 40:31",
      labelRu: "По мотивам Ис. 40:31",
      labelEn: "Inspired by Isaiah 40:31",
    },
  },
  {
    id: "quote-050",
    mode: "bible-inspired",
    category: "renewed-strength",
    text: {
      ru: "Иногда достаточно просто продолжать идти.",
      en: "Sometimes it is enough to simply keep walking.",
    },
    source: {
      ref: "Isaiah 40:31",
      labelRu: "По мотивам Ис. 40:31",
      labelEn: "Inspired by Isaiah 40:31",
    },
  },
];

let starterKits = [];
let state = createInitialState();
let prefs = createDefaultPrefs();
let elements = {};
let toastTimer = 0;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindElements();
  bindEvents();
  starterKits = await loadStarterKits();
  prefs = loadPrefs();
  state = loadState();
  applyTheme();
  render();
}

function bindElements() {
  elements = {
    viewToggle: document.getElementById("viewToggle"),
    settingsButton: document.getElementById("settingsButton"),
    themeFieldLabel: document.getElementById("themeFieldLabel"),
    themeSelect: document.getElementById("themeSelect"),
    languageToggle: document.getElementById("languageToggle"),
    todayView: document.getElementById("todayView"),
    progressView: document.getElementById("progressView"),
    startPanel: document.getElementById("startPanel"),
    startKicker: document.getElementById("startKicker"),
    startTitle: document.getElementById("startTitle"),
    startSubtitle: document.getElementById("startSubtitle"),
    quickInputLabel: document.getElementById("quickInputLabel"),
    quickTrackTitle: document.getElementById("quickTrackTitle"),
    quickCategoryLabel: document.getElementById("quickCategoryLabel"),
    quickSuggestionLabel: document.getElementById("quickSuggestionLabel"),
    quickCategoryRow: document.getElementById("quickCategoryRow"),
    quickSuggestionRow: document.getElementById("quickSuggestionRow"),
    quickCreateButton: document.getElementById("quickCreateButton"),
    quickStartForm: document.getElementById("quickStartForm"),
    loadDemoButton: document.getElementById("loadDemoButton"),
    quoteSection: document.getElementById("quoteSection"),
    quoteKicker: document.getElementById("quoteKicker"),
    hideQuoteButton: document.getElementById("hideQuoteButton"),
    quoteText: document.getElementById("quoteText"),
    quoteSource: document.getElementById("quoteSource"),
    summaryRow: document.getElementById("summaryRow"),
    workspaceGrid: document.getElementById("workspaceGrid"),
    boardKicker: document.getElementById("boardKicker"),
    boardTitle: document.getElementById("boardTitle"),
    newTrackButton: document.getElementById("newTrackButton"),
    boardEmpty: document.getElementById("boardEmpty"),
    boardEmptyTitle: document.getElementById("boardEmptyTitle"),
    boardEmptyBody: document.getElementById("boardEmptyBody"),
    tracksGrid: document.getElementById("tracksGrid"),
    sidebar: document.getElementById("sidebar"),
    activityPanel: document.getElementById("activityPanel"),
    dailyKicker: document.getElementById("dailyKicker"),
    dailyTitle: document.getElementById("dailyTitle"),
    dailyBrief: document.getElementById("dailyBrief"),
    dailyList: document.getElementById("dailyList"),
    activityKicker: document.getElementById("activityKicker"),
    activityTitle: document.getElementById("activityTitle"),
    activityFeed: document.getElementById("activityFeed"),
    progressEmpty: document.getElementById("progressEmpty"),
    progressKicker: document.getElementById("progressKicker"),
    progressTitle: document.getElementById("progressTitle"),
    progressEmptyBody: document.getElementById("progressEmptyBody"),
    analyticsGrid: document.getElementById("analyticsGrid"),
    analyticsKickerOne: document.getElementById("analyticsKickerOne"),
    analyticsKickerTwo: document.getElementById("analyticsKickerTwo"),
    analyticsKickerThree: document.getElementById("analyticsKickerThree"),
    weeklyChartTitle: document.getElementById("weeklyChartTitle"),
    weeklyWinsChart: document.getElementById("weeklyWinsChart"),
    momentumChartTitle: document.getElementById("momentumChartTitle"),
    momentumChart: document.getElementById("momentumChart"),
    heatmapChartTitle: document.getElementById("heatmapChartTitle"),
    heatmapChart: document.getElementById("heatmapChart"),
    toolsKicker: document.getElementById("toolsKicker"),
    toolsTitle: document.getElementById("toolsTitle"),
    reflectionToolTitle: document.getElementById("reflectionToolTitle"),
    reflectionToolBody: document.getElementById("reflectionToolBody"),
    quoteStyleLabel: document.getElementById("quoteStyleLabel"),
    quoteStyleSelect: document.getElementById("quoteStyleSelect"),
    toggleQuoteButton: document.getElementById("toggleQuoteButton"),
    exportTitle: document.getElementById("exportTitle"),
    exportBody: document.getElementById("exportBody"),
    exportDataButton: document.getElementById("exportDataButton"),
    importTitle: document.getElementById("importTitle"),
    importBody: document.getElementById("importBody"),
    importDataButton: document.getElementById("importDataButton"),
    resetTitle: document.getElementById("resetTitle"),
    resetBody: document.getElementById("resetBody"),
    resetDataButton: document.getElementById("resetDataButton"),
    importFileInput: document.getElementById("importFileInput"),
    settingsDialog: document.getElementById("settingsDialog"),
    settingsCloseButton: document.getElementById("settingsCloseButton"),
    dialogCloseButton: document.getElementById("dialogCloseButton"),
    trackDialog: document.getElementById("trackDialog"),
    trackForm: document.getElementById("trackForm"),
    trackId: document.getElementById("trackId"),
    dialogKicker: document.getElementById("dialogKicker"),
    dialogTitle: document.getElementById("dialogTitle"),
    dialogBody: document.getElementById("dialogBody"),
    trackTitleLabel: document.getElementById("trackTitleLabel"),
    trackTitle: document.getElementById("trackTitle"),
    trackCategoryLabel: document.getElementById("trackCategoryLabel"),
    trackCategory: document.getElementById("trackCategory"),
    targetValueLabel: document.getElementById("targetValueLabel"),
    targetValue: document.getElementById("targetValue"),
    unitLabelLabel: document.getElementById("unitLabelLabel"),
    unitLabel: document.getElementById("unitLabel"),
    dialogModeLegend: document.getElementById("dialogModeLegend"),
    dialogModeFocusLabel: document.getElementById("dialogModeFocusLabel"),
    dialogModeFocusNote: document.getElementById("dialogModeFocusNote"),
    dialogModeMomentumLabel: document.getElementById("dialogModeMomentumLabel"),
    dialogModeMomentumNote: document.getElementById("dialogModeMomentumNote"),
    dialogModeMilestoneLabel: document.getElementById("dialogModeMilestoneLabel"),
    dialogModeMilestoneNote: document.getElementById("dialogModeMilestoneNote"),
    modeNote: document.getElementById("modeNote"),
    trackWhyLabel: document.getElementById("trackWhyLabel"),
    trackWhy: document.getElementById("trackWhy"),
    stepListLabel: document.getElementById("stepListLabel"),
    stepList: document.getElementById("stepList"),
    dialogSuggestionLabel: document.getElementById("dialogSuggestionLabel"),
    fillSuggestionsButton: document.getElementById("fillSuggestionsButton"),
    suggestionChips: document.getElementById("suggestionChips"),
    cancelDialogButton: document.getElementById("cancelDialogButton"),
    saveTrackButton: document.getElementById("saveTrackButton"),
    feedbackToast: document.getElementById("feedbackToast"),
  };
}

function bindEvents() {
  elements.quickStartForm.addEventListener("submit", handleQuickCreate);
  elements.loadDemoButton.addEventListener("click", loadDemoState);
  elements.newTrackButton.addEventListener("click", () => openTrackDialog(!state.tracks.length));
  elements.themeSelect.addEventListener("change", handleThemeChange);
  elements.settingsButton.addEventListener("click", openSettingsDialog);
  elements.quoteStyleSelect.addEventListener("change", handleQuoteStyleChange);
  elements.toggleQuoteButton.addEventListener("click", toggleQuoteVisibility);
  elements.hideQuoteButton.addEventListener("click", () => {
    prefs.quoteVisible = false;
    savePrefs();
    renderDailyQuote();
    renderSettingsPanel();
    showToast(t("actions.quoteHidden"));
  });
  elements.exportDataButton.addEventListener("click", exportData);
  elements.importDataButton.addEventListener("click", () => elements.importFileInput.click());
  elements.importFileInput.addEventListener("change", importData);
  elements.resetDataButton.addEventListener("click", resetLocalBoard);
  elements.trackForm.addEventListener("submit", handleTrackSubmit);
  elements.trackCategory.addEventListener("change", () => syncDialogDefaults(false));
  elements.fillSuggestionsButton.addEventListener("click", fillDialogSuggestions);
  elements.cancelDialogButton.addEventListener("click", () => elements.trackDialog.close());

  document.querySelectorAll('input[name="mode"]').forEach((input) => {
    input.addEventListener("change", () => syncDialogDefaults(false));
  });

  document.addEventListener("click", (event) => {
    const languageButton = event.target.closest("[data-language]");
    if (languageButton) {
      setLanguage(languageButton.dataset.language);
      return;
    }

    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      setView(viewButton.dataset.view);
      return;
    }

    const categoryButton = event.target.closest("[data-quick-category]");
    if (categoryButton) {
      prefs.quickCategory = starterKit(categoryButton.dataset.quickCategory).category;
      savePrefs();
      renderStartPanel();
      return;
    }

    const suggestionButton = event.target.closest("[data-quick-suggestion]");
    if (suggestionButton) {
      elements.quickTrackTitle.value = suggestionButton.dataset.quickSuggestion || "";
      elements.quickTrackTitle.focus();
      return;
    }

    const logButton = event.target.closest("[data-complete-track]");
    if (logButton) {
      completeStep(logButton.dataset.completeTrack, logButton.dataset.completeStep);
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
      return;
    }

    const addSuggestionButton = event.target.closest("[data-add-suggestion]");
    if (addSuggestionButton) {
      appendSuggestion(addSuggestionButton.dataset.addSuggestion || "");
    }
  });
}

async function loadStarterKits() {
  try {
    const response = await fetch("data/starter-kits.json", { cache: "no-cache" });
    if (!response.ok) {
      throw new Error("starter kits unavailable");
    }
    const parsed = await response.json();
    return Array.isArray(parsed) && parsed.length ? parsed : FALLBACK_STARTER_KITS;
  } catch (error) {
    return FALLBACK_STARTER_KITS;
  }
}

function createInitialState() {
  return {
    version: 2,
    onboardingComplete: false,
    tracks: [],
    activity: [],
  };
}

function createDefaultPrefs() {
  return {
    theme: "light",
    language: "en",
    view: "today",
    quickCategory: "study",
    quoteVisible: true,
    quoteStyle: "reflective",
  };
}

function sanitizeState(parsed) {
  const base = createInitialState();
  if (!parsed || typeof parsed !== "object") {
    return base;
  }

  const tracks = Array.isArray(parsed.tracks) ? parsed.tracks : [];
  const activity = Array.isArray(parsed.activity) ? parsed.activity : [];

  return {
    ...base,
    version: 2,
    onboardingComplete: Boolean(parsed.onboardingComplete || tracks.length),
    tracks: tracks
      .filter((track) => track && typeof track === "object")
      .map((track) => sanitizeTrack(track))
      .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()),
    activity: activity
      .filter((entry) => entry && typeof entry === "object" && entry.trackId && entry.stepId)
      .map((entry) => ({
        id: typeof entry.id === "string" && entry.id ? entry.id : uid("entry"),
        trackId: String(entry.trackId),
        stepId: String(entry.stepId),
        title: typeof entry.title === "string" && entry.title.trim() ? entry.title.trim() : "",
        xp: clampNumber(entry.xp, 0, 999),
        progressDelta: clampNumber(entry.progressDelta, 0, 99),
        momentumDelta: clampNumber(entry.momentumDelta, 0, 99),
        completedAt: safeIso(entry.completedAt),
      }))
      .sort((left, right) => new Date(right.completedAt).getTime() - new Date(left.completedAt).getTime()),
  };
}

function sanitizeTrack(track) {
  const category = starterKit(track.category).category;
  const mode = safeMode(track.mode);
  const kit = localizedKit(category);
  const rawSteps = Array.isArray(track.steps) ? track.steps : [];
  const steps = rawSteps.length
    ? rawSteps
        .filter((step) => step && typeof step === "object")
        .map((step, index) => ({
          id: typeof step.id === "string" && step.id ? step.id : uid("step"),
          title:
            typeof step.title === "string" && step.title.trim() ? step.title.trim() : fallbackStepTitle(kit, index),
          effort: safeEffort(step.effort, inferEffort(index, mode)),
          repeatable: typeof step.repeatable === "boolean" ? step.repeatable : mode !== "milestone",
          doneAt: step.doneAt ? safeIso(step.doneAt) : null,
        }))
    : buildSteps("", mode, kit);

  return {
    id: typeof track.id === "string" && track.id ? track.id : uid("track"),
    title: typeof track.title === "string" && track.title.trim() ? track.title.trim() : kit.prompt,
    category,
    mode,
    why: typeof track.why === "string" ? track.why.trim() : "",
    targetValue: sanitizeTargetValue(track.targetValue, mode, steps, kit.target_value),
    unitLabel:
      typeof track.unitLabel === "string" && track.unitLabel.trim()
        ? track.unitLabel.trim()
        : defaultUnitLabel(mode, kit),
    color: safeColor(track.color, kit.color),
    createdAt: safeIso(track.createdAt),
    steps,
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? sanitizeState(JSON.parse(raw)) : createInitialState();
  } catch (error) {
    return createInitialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadPrefs() {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return sanitizePrefs(raw ? JSON.parse(raw) : null);
  } catch (error) {
    return createDefaultPrefs();
  }
}

function sanitizePrefs(parsed) {
  const base = createDefaultPrefs();
  if (!parsed || typeof parsed !== "object") {
    return base;
  }

  const theme = THEMES[parsed.theme] ? parsed.theme : base.theme;
  const language = LANGUAGES.includes(parsed.language) ? parsed.language : base.language;
  const view = ["today", "progress"].includes(parsed.view) ? parsed.view : base.view;
  const quickCategory = starterKit(parsed.quickCategory).category;
  const quoteStyle = ["general", "reflective", "bible"].includes(parsed.quoteStyle)
    ? parsed.quoteStyle
    : base.quoteStyle;

  return {
    theme,
    language,
    view,
    quickCategory,
    quoteVisible: parsed.quoteVisible !== false,
    quoteStyle,
  };
}

function savePrefs() {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

function render() {
  applyTheme();
  renderChrome();
  renderStartPanel();
  renderDailyQuote();
  renderSummary();
  renderBoard();
  renderDailyPanel();
  renderActivityFeed();
  renderProgressPanel();
  renderAnalytics();
  renderSettingsPanel();
  renderDialogChrome();
  toggleLayoutState();
  applyView();
}

function renderChrome() {
  document.documentElement.lang = prefs.language;
  document.title = "Momentum";
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", t("metaDescription"));
  }

  elements.themeFieldLabel.textContent = t("topbar.theme");
  elements.settingsButton.textContent = shellText("settings");
  elements.viewToggle.innerHTML = ["today", "progress"]
    .map(
      (view) => `
        <button
          type="button"
          class="${view === prefs.view ? "is-active" : ""}"
          aria-pressed="${view === prefs.view}"
          data-view="${view}"
        >
          ${escapeHtml(shellText(view))}
        </button>
      `,
    )
    .join("");
  elements.languageToggle.innerHTML = LANGUAGES.map(
    (language) => `
      <button
        type="button"
        class="${language === prefs.language ? "is-active" : ""}"
        aria-pressed="${language === prefs.language}"
        data-language="${language}"
      >
        ${escapeHtml(language.toUpperCase())}
      </button>
    `,
  ).join("");

  elements.themeSelect.innerHTML = Object.keys(THEMES)
    .map((theme) => `<option value="${theme}">${escapeHtml(t(`themes.${theme}`))}</option>`)
    .join("");
  elements.themeSelect.value = prefs.theme;
}

function renderStartPanel() {
  const kit = localizedKit(prefs.quickCategory);

  elements.startKicker.textContent = t("start.kicker");
  elements.startTitle.textContent = t("start.title");
  elements.startSubtitle.textContent = t("start.subtitle");
  elements.quickInputLabel.textContent = t("start.inputLabel");
  elements.quickCategoryLabel.textContent = t("start.categoryLabel");
  elements.quickSuggestionLabel.textContent = t("start.suggestionLabel");
  elements.quickCreateButton.textContent = t("start.create");
  elements.loadDemoButton.textContent = t("start.demo");
  elements.quickTrackTitle.placeholder = kit.prompt;
  elements.startPanel.classList.toggle("start-panel--compact", state.tracks.length > 0);

  elements.quickCategoryRow.innerHTML = starterKits
    .map((entry) => localizedKit(entry.category))
    .map((item) => {
      const active = prefs.quickCategory === item.category;
      return `
        <button
          class="choice-button choice-button--compact ${active ? "is-active" : ""}"
          type="button"
          aria-pressed="${active}"
          data-quick-category="${item.category}"
        >
          <strong>${escapeHtml(item.label)}</strong>
        </button>
      `;
    })
    .join("");

  elements.quickSuggestionRow.innerHTML = kit.ideas
    .map(
      (idea) => `
        <button
          class="suggestion-chip"
          type="button"
          data-quick-suggestion="${escapeAttribute(idea)}"
        >
          ${escapeHtml(idea)}
        </button>
      `,
    )
    .join("");
}

function renderProgressPanel() {
  elements.progressKicker.textContent = shellText("progress");
  elements.progressTitle.textContent = shellText("progressTitle");
  elements.progressEmptyBody.textContent = shellText("progressEmpty");
}

function renderDailyQuote() {
  const visible = prefs.quoteVisible;
  elements.quoteSection.classList.toggle("is-hidden", !visible);
  if (!visible) {
    return;
  }

  const quote = quoteForToday();
  elements.quoteKicker.textContent = t("quote.kicker");
  elements.hideQuoteButton.textContent = t("quote.hide");
  elements.quoteText.textContent = quote.text;

  if (quote.source) {
    elements.quoteSource.textContent = quote.source;
    elements.quoteSource.classList.remove("is-hidden");
  } else {
    elements.quoteSource.textContent = "";
    elements.quoteSource.classList.add("is-hidden");
  }
}

function renderSummary() {
  const metrics = globalMetrics();
  const cards = [
    {
      label: t("summary.level"),
      value: `${t("summary.levelShort")} ${metrics.level}`,
      note: t("summary.toNext", { count: metrics.xpToNext }),
    },
    {
      label: t("summary.today"),
      value: countLabel(metrics.todayWins, "win"),
      note: metrics.todayWins
        ? t("summary.todayActive")
        : metrics.recoveryBonus
          ? t("summary.recoveryReady", { count: metrics.recoveryBonus })
          : t("summary.todayReady"),
    },
    {
      label: t("summary.run"),
      value: metrics.run ? countLabel(metrics.run, "day") : "0",
      note: metrics.run ? t("track.dayRun", { count: metrics.run }) : t("summary.runReady"),
    },
    {
      label: t("summary.momentum"),
      value: `${metrics.momentum}%`,
      note:
        metrics.momentum >= 70
          ? t("summary.momentumHigh")
          : metrics.momentum >= 35
            ? t("summary.momentumMid")
            : t("summary.momentumLow"),
    },
  ];

  elements.summaryRow.innerHTML = cards
    .map(
      (card) => `
        <article class="panel summary-card">
          <span class="summary-card__label">${escapeHtml(card.label)}</span>
          <strong class="summary-card__value">${escapeHtml(card.value)}</strong>
          <span class="summary-card__note">${escapeHtml(card.note)}</span>
        </article>
      `,
    )
    .join("");
}

function renderBoard() {
  elements.boardKicker.textContent = t("board.kicker");
  elements.boardTitle.textContent = t("board.title");
  elements.newTrackButton.textContent = t("board.add");
  elements.boardEmptyTitle.textContent = t("board.emptyTitle");
  elements.boardEmptyBody.textContent = t("board.emptyBody");

  elements.tracksGrid.innerHTML = state.tracks.map((track) => renderTrackCard(track)).join("");
}

function renderTrackCard(track) {
  const stats = trackStats(track);
  const categoryLabel = t(`categories.${track.category}`);
  const modeLabel = t(`modes.${track.mode}.label`);
  const hasActivity = state.activity.some((entry) => entry.trackId === track.id);
  const nextStep = nextStepForTrack(track);
  const nextLabel = track.mode === "milestone" ? t("track.next") : t("track.repeatable");
  const nextTitle = nextStep?.title || t("track.targetReached");

  return `
    <article class="track-card tone-${escapeAttribute(track.color)}" data-fresh="${!hasActivity}">
      <div class="track-card__header">
        <div class="track-card__main">
          <div class="track-card__tags">
            <span class="track-badge">${escapeHtml(categoryLabel)}</span>
            <span class="track-chip">${escapeHtml(modeLabel)}</span>
          </div>
          <h3>${escapeHtml(track.title)}</h3>
          ${track.why ? `<p class="track-card__why">${escapeHtml(track.why)}</p>` : ""}
        </div>
        <div class="track-card__actions">
          <button class="chip-action" type="button" data-edit-track="${track.id}">${escapeHtml(t("actions.edit"))}</button>
          <button class="chip-action chip-action--danger" type="button" data-delete-track="${track.id}">${escapeHtml(
            t("actions.remove"),
          )}</button>
        </div>
      </div>

      <div class="track-card__next">
        <span class="track-card__eyebrow">${escapeHtml(nextLabel)}</span>
        <strong>${escapeHtml(nextTitle)}</strong>
      </div>

      <div class="track-progress">
        <div class="track-progress__head">
          <div class="track-progress__text">
            <strong class="track-progress__value">${escapeHtml(stats.progressLabel)}</strong>
            <span class="track-progress__meta">${escapeHtml(stats.nextMilestoneLabel)}</span>
          </div>
          ${renderRing(stats.progressPercent, `${Math.round(stats.progressPercent)}%`, modeLabel, track.color)}
        </div>
        <div class="progress-bar"><span style="width: ${stats.progressPercent}%"></span></div>
        <div class="track-meta">
          <span>+${stats.totalXp} ${escapeHtml(t("track.xp"))}</span>
          <span>${escapeHtml(stats.moveSummary)}</span>
          <span>${escapeHtml(stats.runLabel)}</span>
        </div>
      </div>

      <section class="move-list">
        <div class="move-list__head">
          <h4>${escapeHtml(t("track.moveList"))}</h4>
          <span>${escapeHtml(track.mode === "milestone" ? t("track.next") : t("track.repeatable"))}</span>
        </div>
        ${renderMoveRows(track)}
      </section>
    </article>
  `;
}

function renderMoveRows(track) {
  if (!track.steps.length) {
    return `<div class="empty-copy">${escapeHtml(t("daily.empty"))}</div>`;
  }

  if (track.mode === "milestone") {
    const completedIds = completedStepIdsForTrack(track);
    const openRows = track.steps
      .filter((step) => !completedIds.has(step.id))
      .map((step) => renderOpenMove(track, step));
    const doneRows = track.steps
      .filter((step) => completedIds.has(step.id))
      .slice(0, 1)
      .map((step) => renderDoneMove(track, step));

    if (!openRows.length) {
      openRows.push(`
        <div class="move-row is-done">
          <div class="move-button">
            <span class="move-title">${escapeHtml(t("track.targetReached"))}</span>
            <span class="move-meta">
              <span>${escapeHtml(trackStats(track).progressLabel)}</span>
              <span class="move-pill">${escapeHtml(t("track.completed"))}</span>
            </span>
          </div>
        </div>
      `);
    }

    return [...openRows, ...doneRows].join("");
  }

  const counts = countCompletionsByStep(track.id);
  const rows = [...track.steps]
    .sort((left, right) => {
      const leftCount = counts[left.id] || 0;
      const rightCount = counts[right.id] || 0;
      if (leftCount !== rightCount) {
        return leftCount - rightCount;
      }
      return EFFORT_POINTS[left.effort] - EFFORT_POINTS[right.effort];
    })
    .slice(0, 3)
    .map((step) => renderRepeatableMove(track, step, counts[step.id] || 0));

  return rows.join("");
}

function renderOpenMove(track, step) {
  const xp = XP_TABLE[track.mode][step.effort];
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
          <span>+${xp} ${escapeHtml(t("track.xp"))}</span>
          <span class="move-pill">${escapeHtml(t("daily.log"))}</span>
        </span>
      </button>
    </div>
  `;
}

function renderDoneMove(track, step) {
  return `
    <div class="move-row is-done">
      <div class="move-button">
        <span class="move-title">${escapeHtml(step.title)}</span>
        <span class="move-meta">
          <span>${escapeHtml(t("track.completed"))}</span>
          <span class="move-pill">${escapeHtml(formatShortDate(step.doneAt))}</span>
        </span>
      </div>
    </div>
  `;
}

function renderRepeatableMove(track, step, uses) {
  const xp = XP_TABLE[track.mode][step.effort];
  const doneToday = state.activity.some(
    (entry) => entry.trackId === track.id && entry.stepId === step.id && dayKey(entry.completedAt) === dayKey(new Date()),
  );

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
          <span>+${xp} ${escapeHtml(t("track.xp"))}</span>
          <span class="move-pill">${escapeHtml(doneToday ? t("track.doneToday") : t("track.uses", { count: uses }))}</span>
        </span>
      </button>
    </div>
  `;
}

function renderDailyPanel() {
  elements.dailyKicker.textContent = t("daily.kicker");
  elements.dailyTitle.textContent = t("daily.title");

  const brief = buildDailyBrief();
  elements.dailyBrief.innerHTML = `
    <strong>${escapeHtml(brief.headline)}</strong>
    <p>${escapeHtml(brief.body)}</p>
  `;

  const nextMoves = suggestedNextMoves();
  if (!nextMoves.length) {
    elements.dailyList.innerHTML = `<div class="empty-copy">${escapeHtml(t("daily.empty"))}</div>`;
    return;
  }

  elements.dailyList.innerHTML = nextMoves
    .map(
      ({ track, step }) => `
        <div class="micro-card">
          <div class="micro-card__copy">
            <strong>${escapeHtml(step.title)}</strong>
            <span>${escapeHtml(`${track.title} · ${t(`categories.${track.category}`)}`)}</span>
          </div>
          <button
            class="pill-button"
            type="button"
            data-complete-track="${track.id}"
            data-complete-step="${step.id}"
          >
            ${escapeHtml(t("daily.log"))}
          </button>
        </div>
      `,
    )
    .join("");
}

function renderActivityFeed() {
  elements.activityKicker.textContent = t("activity.kicker");
  elements.activityTitle.textContent = t("activity.title");

  if (!state.activity.length) {
    elements.activityFeed.innerHTML = `<div class="empty-copy">${escapeHtml(t("activity.empty"))}</div>`;
    return;
  }

  elements.activityFeed.innerHTML = state.activity
    .slice(0, 5)
    .map((entry) => {
      const track = state.tracks.find((item) => item.id === entry.trackId);
      return `
        <div class="activity-row">
          <div class="activity-row__copy">
            <strong>${escapeHtml(entry.title)}</strong>
            <span>${escapeHtml(`${track?.title || ""} · ${formatRelativeTime(entry.completedAt)}`)}</span>
          </div>
          <span class="activity-row__xp">+${entry.xp} ${escapeHtml(t("track.xp"))}</span>
        </div>
      `;
    })
    .join("");
}

function renderAnalytics() {
  elements.analyticsKickerOne.textContent = t("analytics.one");
  elements.analyticsKickerTwo.textContent = t("analytics.two");
  elements.analyticsKickerThree.textContent = t("analytics.three");
  elements.weeklyChartTitle.textContent = t("analytics.weekly");
  elements.momentumChartTitle.textContent = t("analytics.momentum");
  elements.heatmapChartTitle.textContent = t("analytics.heatmap");
  elements.analyticsGrid.dataset.density = state.activity.length < 6 ? "quiet" : "active";

  renderWeeklyWins();
  renderMomentumChart();
  renderHeatmap();
}

function renderWeeklyWins() {
  const days = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = shiftDays(new Date(), -offset);
    const count = state.activity.filter((entry) => dayKey(entry.completedAt) === dayKey(date)).length;
    days.push({
      label: formatWeekday(date),
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
    const cutoff = endOfDay(point);
    const subset = state.activity.filter((entry) => new Date(entry.completedAt) <= cutoff);
    values.push(momentumScore(subset, point));
  }

  const latest = values[values.length - 1] || 0;
  const start = values[0] || 0;

  elements.momentumChart.innerHTML = `
    <div class="sparkline-card">
      ${renderSparkline(values)}
      <div class="sparkline-meta">
        <span>${escapeHtml(t("analytics.last14"))}</span>
        <span>${escapeHtml(latest >= start ? t("analytics.up") : t("analytics.recoverable"))}</span>
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
      label: formatShortDate(date),
      count,
      intensity: count >= 4 ? 4 : count >= 3 ? 3 : count >= 2 ? 2 : count >= 1 ? 1 : 0,
    });
  }

  elements.heatmapChart.innerHTML = `
    <div>
      <div class="heatmap">
        ${days
          .map(
            (day) => `
              <div
                class="heatmap-day"
                data-intensity="${day.intensity}"
                title="${escapeAttribute(`${day.label}: ${countLabel(day.count, "win")}`)}"
              ></div>
            `,
          )
          .join("")}
      </div>
      <div class="heatmap-legend">
        <span>${escapeHtml(t("analytics.lighter"))}</span>
        <span>${escapeHtml(t("analytics.stronger"))}</span>
      </div>
    </div>
  `;
}

function renderSettingsPanel() {
  if (elements.settingsDialog) {
    elements.settingsDialog.dataset.density = state.activity.length < 4 ? "quiet" : "active";
  }

  elements.toolsKicker.textContent = t("tools.kicker");
  elements.toolsTitle.textContent = shellText("settings");
  elements.reflectionToolTitle.textContent = t("tools.reflectionTitle");
  elements.reflectionToolBody.textContent = t("tools.reflectionBody");
  elements.quoteStyleLabel.textContent = t("tools.styleLabel");
  elements.toggleQuoteButton.textContent = prefs.quoteVisible ? t("tools.toggleHide") : t("tools.toggleShow");
  elements.exportTitle.textContent = t("tools.exportTitle");
  elements.exportBody.textContent = t("tools.exportBody");
  elements.exportDataButton.textContent = t("tools.export");
  elements.importTitle.textContent = t("tools.importTitle");
  elements.importBody.textContent = t("tools.importBody");
  elements.importDataButton.textContent = t("tools.import");
  elements.resetTitle.textContent = t("tools.resetTitle");
  elements.resetBody.textContent = t("tools.resetBody");
  elements.resetDataButton.textContent = t("tools.reset");
  elements.settingsCloseButton.textContent = t("dialog.close");

  elements.quoteStyleSelect.innerHTML = ["general", "reflective", "bible"]
    .map((style) => `<option value="${style}">${escapeHtml(t(`quote.styles.${style}`))}</option>`)
    .join("");
  elements.quoteStyleSelect.value = prefs.quoteStyle;
}

function renderDialogChrome() {
  const currentTrack = currentDialogTrack();
  const currentCategory = currentTrack?.category || elements.trackCategory.value || prefs.quickCategory;

  elements.dialogKicker.textContent = t("dialog.kicker");
  elements.dialogCloseButton.textContent = t("dialog.close");
  elements.trackTitleLabel.textContent = t("dialog.titleLabel");
  elements.trackCategoryLabel.textContent = t("dialog.categoryLabel");
  elements.targetValueLabel.textContent = t("dialog.targetLabel");
  elements.unitLabelLabel.textContent = t("dialog.unitLabel");
  elements.dialogModeLegend.textContent = t("dialog.modeLegend");
  elements.dialogModeFocusLabel.textContent = t("modes.focus.label");
  elements.dialogModeFocusNote.textContent = t("dialog.focusNote");
  elements.dialogModeMomentumLabel.textContent = t("modes.momentum.label");
  elements.dialogModeMomentumNote.textContent = t("dialog.momentumNote");
  elements.dialogModeMilestoneLabel.textContent = t("modes.milestone.label");
  elements.dialogModeMilestoneNote.textContent = t("dialog.milestoneNote");
  elements.trackWhyLabel.textContent = t("dialog.whyLabel");
  elements.trackWhy.placeholder = t("dialog.whyPlaceholder");
  elements.stepListLabel.textContent = t("dialog.stepListLabel");
  elements.dialogSuggestionLabel.textContent = t("dialog.suggestions");
  elements.fillSuggestionsButton.textContent = t("dialog.fill");
  elements.cancelDialogButton.textContent = t("dialog.cancel");
  elements.saveTrackButton.textContent = t("dialog.save");

  const categoryValue = starterKit(currentCategory).category;
  elements.trackCategory.innerHTML = starterKits
    .map((entry) => starterKit(entry.category))
    .map(
      (entry) =>
        `<option value="${entry.category}">${escapeHtml(t(`categories.${entry.category}`))}</option>`,
    )
    .join("");
  elements.trackCategory.value = categoryValue;

  if (currentTrack) {
    elements.dialogTitle.textContent = t("dialog.editTitle");
    elements.dialogBody.textContent = t("dialog.editBody");
  } else if (!state.tracks.length) {
    elements.dialogTitle.textContent = t("dialog.firstTitle");
    elements.dialogBody.textContent = t("dialog.firstBody");
  } else {
    elements.dialogTitle.textContent = t("dialog.createTitle");
    elements.dialogBody.textContent = t("dialog.createBody");
  }

  renderDialogSuggestions();
  renderModeNote();
}

function toggleLayoutState() {
  const hasTracks = state.tracks.length > 0;
  const hasAnalytics = state.activity.length > 0;
  elements.summaryRow.classList.toggle("is-hidden", !hasTracks);
  elements.sidebar.classList.toggle("is-hidden", !hasTracks);
  elements.activityPanel.classList.toggle("is-hidden", !hasAnalytics);
  elements.progressEmpty.classList.toggle("is-hidden", hasTracks);
  elements.analyticsGrid.classList.toggle("is-hidden", !hasAnalytics);
  elements.workspaceGrid.classList.toggle("main-grid--solo", !hasTracks);
  elements.boardEmpty.classList.toggle("is-hidden", hasTracks);
  elements.tracksGrid.classList.toggle("is-hidden", !hasTracks);
}

function handleQuickCreate(event) {
  event.preventDefault();
  const kit = localizedKit(prefs.quickCategory);
  const title = elements.quickTrackTitle.value.trim() || kit.prompt;
  const track = makeTrack({
    title,
    category: kit.category,
    mode: kit.default_mode,
    why: kit.description,
    existingTrack: null,
  });

  state.tracks.unshift(track);
  state.onboardingComplete = true;
  saveState();
  elements.quickTrackTitle.value = "";
  render();
  showToast(t("actions.trackCreated"));
}

function openTrackDialog(isFirstTrack = false, category = null, track = null) {
  const selectedKit = localizedKit(category || track?.category || prefs.quickCategory);
  elements.trackForm.reset();
  elements.trackId.value = track?.id || "";
  elements.trackCategory.value = selectedKit.category;
  setMode(track?.mode || selectedKit.default_mode);

  if (track) {
    elements.trackTitle.value = track.title;
    elements.trackCategory.value = track.category;
    elements.targetValue.value = track.targetValue;
    elements.unitLabel.value = track.unitLabel;
    elements.trackWhy.value = track.why;
    elements.stepList.value = track.steps.map((step) => step.title).join("\n");
  } else {
    elements.trackTitle.value = "";
    elements.trackWhy.value = selectedKit.description;
    elements.stepList.value = deriveSuggestedStepText(selectedKit, selectedMode());
    elements.targetValue.value = sanitizeTargetValue(selectedKit.target_value, selectedMode(), buildSteps("", selectedMode(), selectedKit), selectedKit.target_value);
    elements.unitLabel.value = defaultUnitLabel(selectedMode(), selectedKit);
  }

  renderDialogChrome();
  syncDialogDefaults(!track);
  if (!track) {
    elements.dialogTitle.textContent = isFirstTrack ? t("dialog.firstTitle") : t("dialog.createTitle");
    elements.dialogBody.textContent = isFirstTrack ? t("dialog.firstBody") : t("dialog.createBody");
  }
  elements.trackDialog.showModal();
}

function handleTrackSubmit(event) {
  event.preventDefault();
  const title = elements.trackTitle.value.trim();
  if (!title) {
    elements.trackTitle.focus();
    return;
  }

  const existingTrack = currentDialogTrack();
  const category = starterKit(elements.trackCategory.value).category;
  const mode = selectedMode();
  const kit = localizedKit(category);
  const steps = buildSteps(elements.stepList.value, mode, kit, existingTrack?.steps || []);
  const track = makeTrack({
    title,
    category,
    mode,
    why: elements.trackWhy.value.trim() || kit.description,
    targetValue: elements.targetValue.value,
    unitLabel: elements.unitLabel.value.trim(),
    steps,
    existingTrack,
  });

  if (existingTrack) {
    state.tracks = state.tracks.map((item) => (item.id === track.id ? track : item));
  } else {
    state.tracks.unshift(track);
  }

  state.onboardingComplete = true;
  saveState();
  elements.trackDialog.close();
  render();
  showToast(existingTrack ? t("actions.trackUpdated") : t("actions.trackCreated"));
}

function makeTrack({ title, category, mode, why, targetValue, unitLabel, steps, existingTrack = null }) {
  const kit = localizedKit(category);
  const resolvedSteps = steps && steps.length ? steps : buildSteps("", mode, kit, existingTrack?.steps || []);
  return {
    id: existingTrack?.id || uid("track"),
    title,
    category,
    mode,
    why,
    targetValue: sanitizeTargetValue(targetValue, mode, resolvedSteps, kit.target_value),
    unitLabel: unitLabel || defaultUnitLabel(mode, kit),
    color: safeColor(existingTrack?.color, kit.color),
    createdAt: existingTrack?.createdAt || new Date().toISOString(),
    steps: resolvedSteps,
  };
}

function syncDialogDefaults(forceReplace) {
  const kit = localizedKit(elements.trackCategory.value || prefs.quickCategory);
  const mode = selectedMode();

  renderDialogSuggestions();
  renderModeNote();
  elements.trackTitle.placeholder = kit.prompt;

  if (forceReplace || !elements.targetValue.value) {
    const steps = buildSteps(elements.stepList.value, mode, kit);
    elements.targetValue.value = sanitizeTargetValue(kit.target_value, mode, steps, kit.target_value);
  }

  if (forceReplace || !elements.unitLabel.value.trim()) {
    elements.unitLabel.value = defaultUnitLabel(mode, kit);
  }

  if (forceReplace || !elements.trackWhy.value.trim()) {
    elements.trackWhy.value = kit.description;
  }

  if (forceReplace || !elements.stepList.value.trim()) {
    elements.stepList.value = deriveSuggestedStepText(kit, mode);
  }
}

function renderDialogSuggestions() {
  const kit = localizedKit(elements.trackCategory.value || prefs.quickCategory);
  const suggestions = modeSuggestions(kit, selectedMode());
  elements.suggestionChips.innerHTML = suggestions
    .map(
      (step) => `
        <button
          class="suggestion-chip"
          type="button"
          data-add-suggestion="${escapeAttribute(step)}"
        >
          ${escapeHtml(step)}
        </button>
      `,
    )
    .join("");
}

function renderModeNote() {
  const mode = selectedMode();
  const key = {
    focus: "dialog.focusNote",
    momentum: "dialog.momentumNote",
    milestone: "dialog.milestoneNote",
  }[mode];
  elements.modeNote.textContent = t(key);
}

function fillDialogSuggestions() {
  const kit = localizedKit(elements.trackCategory.value || prefs.quickCategory);
  const mode = selectedMode();
  elements.stepList.value = deriveSuggestedStepText(kit, mode);
  elements.targetValue.value = sanitizeTargetValue(kit.target_value, mode, buildSteps("", mode, kit), kit.target_value);
  elements.unitLabel.value = defaultUnitLabel(mode, kit);
}

function buildSteps(rawText, mode, kit, existingSteps = []) {
  const lines = String(rawText || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const source = lines.length ? lines : modeSuggestions(kit, mode);
  const pool = existingSteps.reduce((memo, step) => {
    const key = normalizeStepTitle(step.title);
    if (!memo[key]) {
      memo[key] = [];
    }
    memo[key].push(step);
    return memo;
  }, {});
  const used = new Set();

  return source.slice(0, 8).map((title, index) => {
    const normalized = title.replace(/\[(light|steady|deep)\]/gi, "").trim();
    const reuse = (pool[normalizeStepTitle(normalized)] || []).find((step) => !used.has(step.id));
    if (reuse) {
      used.add(reuse.id);
    }

    return {
      id: reuse?.id || uid("step"),
      title: normalized || fallbackStepTitle(kit, index),
      effort: reuse?.effort || inferEffort(index, mode),
      repeatable: mode !== "milestone",
      doneAt: mode === "milestone" ? reuse?.doneAt || null : null,
    };
  });
}

function loadDemoState() {
  if (state.tracks.length && !window.confirm(t("actions.sampleConfirm"))) {
    return;
  }

  state = buildDemoState();
  saveState();
  render();
  showToast(t("actions.sampleLoaded"));
}

function buildDemoState() {
  const demo = createInitialState();
  const study = makeTrack({
    title: prefs.language === "ru" ? "Повторить материал к экзамену" : "Review the exam material",
    category: "study",
    mode: "focus",
    why:
      prefs.language === "ru"
        ? "Хочу убрать тяжесть и сделать учёбу более понятной."
        : "I want study to feel lighter and more visible.",
  });
  const routine = makeTrack({
    title: prefs.language === "ru" ? "Держать утреннюю рутину тёплой" : "Keep the morning routine warm",
    category: "routine",
    mode: "momentum",
    why:
      prefs.language === "ru"
        ? "Мне проще держать день, когда база не остывает."
        : "The day goes better when the basics stay warm.",
  });
  const cleaning = makeTrack({
    title: prefs.language === "ru" ? "Сделать вечерний ресет комнаты" : "Reset the room in the evening",
    category: "cleaning",
    mode: "milestone",
    why:
      prefs.language === "ru"
        ? "Хочу, чтобы пространство помогало, а не тянуло вниз."
        : "I want the space to help instead of dragging on me.",
  });

  demo.tracks = [study, routine, cleaning];
  const seed = [
    { track: study, step: study.steps[0], daysAgo: 4 },
    { track: routine, step: routine.steps[0], daysAgo: 3 },
    { track: study, step: study.steps[1], daysAgo: 2 },
    { track: routine, step: routine.steps[1], daysAgo: 1 },
    { track: cleaning, step: cleaning.steps[0], daysAgo: 1 },
    { track: study, step: study.steps[0], daysAgo: 0 },
    { track: routine, step: routine.steps[2], daysAgo: 0 },
  ];

  seed.forEach((item) => {
    const completedAt = shiftDays(new Date(), -item.daysAgo);
    const reward = rewardForStep(item.track, item.step, completedAt, demo.activity);
    demo.activity.unshift({
      id: uid("entry"),
      trackId: item.track.id,
      stepId: item.step.id,
      title: item.step.title,
      xp: reward.xp,
      progressDelta: reward.progressDelta,
      momentumDelta: reward.momentumDelta,
      completedAt: completedAt.toISOString(),
    });
    if (!item.step.repeatable) {
      item.step.doneAt = completedAt.toISOString();
    }
  });

  demo.activity.sort((left, right) => new Date(right.completedAt).getTime() - new Date(left.completedAt).getTime());
  demo.onboardingComplete = true;
  return demo;
}

function editTrack(trackId) {
  const track = state.tracks.find((item) => item.id === trackId);
  if (track) {
    openTrackDialog(false, track.category, track);
  }
}

function deleteTrack(trackId) {
  const track = state.tracks.find((item) => item.id === trackId);
  if (!track) {
    return;
  }

  const confirmed = window.confirm(t("actions.deleteConfirm", { title: track.title }));
  if (!confirmed) {
    return;
  }

  state.tracks = state.tracks.filter((item) => item.id !== trackId);
  state.activity = state.activity.filter((entry) => entry.trackId !== trackId);
  saveState();
  render();
}

function exportData() {
  const payload = {
    app: "momentum",
    exportedAt: new Date().toISOString(),
    state,
    prefs,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `momentum-backup-${dayKey(new Date())}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast(t("actions.exportDone"));
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
    if (parsed.prefs) {
      prefs = sanitizePrefs(parsed.prefs);
      savePrefs();
    }
    saveState();
    render();
    showToast(t("actions.importDone"));
  } catch (error) {
    showToast(t("actions.importError"));
  } finally {
    elements.importFileInput.value = "";
  }
}

function resetLocalBoard() {
  const confirmed = window.confirm(t("actions.resetConfirm"));
  if (!confirmed) {
    return;
  }

  state = createInitialState();
  saveState();
  render();
  showToast(t("actions.resetDone"));
}

function handleThemeChange(event) {
  prefs.theme = THEMES[event.target.value] ? event.target.value : prefs.theme;
  savePrefs();
  applyTheme();
  render();
}

function setView(view) {
  if (!["today", "progress"].includes(view) || view === prefs.view) {
    return;
  }

  prefs.view = view;
  savePrefs();
  render();
}

function handleQuoteStyleChange(event) {
  prefs.quoteStyle = ["general", "reflective", "bible"].includes(event.target.value)
    ? event.target.value
    : prefs.quoteStyle;
  savePrefs();
  renderDailyQuote();
}

function toggleQuoteVisibility() {
  prefs.quoteVisible = !prefs.quoteVisible;
  savePrefs();
  renderDailyQuote();
  renderSettingsPanel();
  showToast(t(prefs.quoteVisible ? "actions.quoteShown" : "actions.quoteHidden"));
}

function setLanguage(language) {
  if (!LANGUAGES.includes(language) || language === prefs.language) {
    return;
  }

  prefs.language = language;
  prefs = sanitizePrefs(prefs);
  savePrefs();
  render();
}

function applyTheme() {
  document.documentElement.dataset.theme = prefs.theme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute("content", THEMES[prefs.theme].color);
  }
}

function applyView() {
  elements.todayView.classList.toggle("is-hidden", prefs.view !== "today");
  elements.progressView.classList.toggle("is-hidden", prefs.view !== "progress");
}

function openSettingsDialog() {
  if (!elements.settingsDialog.open) {
    elements.settingsDialog.showModal();
  }
}

function currentDialogTrack() {
  const trackId = elements.trackId.value.trim();
  return state.tracks.find((item) => item.id === trackId) || null;
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
  const reward = rewardForStep(track, step, now, state.activity);
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

function rewardForStep(track, step, now, activity = state.activity) {
  const baseXp = XP_TABLE[track.mode][step.effort];
  const anyToday = activity.some((entry) => dayKey(entry.completedAt) === dayKey(now));
  const trackToday = activity.some(
    (entry) => entry.trackId === track.id && dayKey(entry.completedAt) === dayKey(now),
  );
  const startBonus = !anyToday ? 8 : !trackToday ? 4 : 0;
  const comebackBonus = !anyToday ? recoveryBonus(activity, now) : 0;
  const trackEntries = activity.filter((entry) => entry.trackId === track.id);
  const run = streakLength(trackEntries, now);
  const consistencyBonus = track.mode === "momentum" && run >= 2 ? 4 : 0;
  const milestoneProgress = trackStats(track, activity).progressUnits;
  const milestoneBonus = track.mode === "milestone" && (milestoneProgress + 1) % 3 === 0 ? 10 : 0;

  return {
    xp: baseXp + startBonus + comebackBonus + consistencyBonus + milestoneBonus,
    progressDelta: track.mode === "milestone" ? 1 : EFFORT_POINTS[step.effort],
    momentumDelta: EFFORT_POINTS[step.effort] * 5 + (track.mode === "momentum" ? 3 : 0),
    comebackBonus,
    milestoneBonus,
  };
}

function feedbackForCompletion(track, step, reward) {
  if (reward.comebackBonus) {
    return t("feedback.comeback", { count: reward.comebackBonus });
  }
  if (reward.milestoneBonus) {
    return t("feedback.milestone", { title: track.title });
  }
  const lines = getText("feedback.lines");
  return lines[(trackStats(track).progressUnits + EFFORT_POINTS[step.effort]) % lines.length];
}

function globalMetrics() {
  const now = new Date();
  const totalXp = state.activity.reduce((sum, entry) => sum + entry.xp, 0);
  const todayWins = state.activity.filter((entry) => dayKey(entry.completedAt) === dayKey(now)).length;
  const level = levelForXp(totalXp);
  const progressInLevel = totalXp % LEVEL_STEP;
  const xpToNext = LEVEL_STEP - progressInLevel || LEVEL_STEP;

  return {
    totalXp,
    todayWins,
    level,
    xpToNext,
    momentum: momentumScore(state.activity, now),
    recoveryBonus: recoveryBonus(state.activity, now),
    run: streakLength(state.activity, now),
  };
}

function trackStats(track, activity = state.activity) {
  const trackActivity = activity.filter((entry) => entry.trackId === track.id);
  const progressUnits = progressUnitsForTrack(track, trackActivity);
  const target = track.mode === "milestone" ? Math.max(track.targetValue, track.steps.length, 1) : track.targetValue;
  const progressPercent = clamp(Math.round((progressUnits / Math.max(target, 1)) * 100), 0, 100);
  const milestoneStep = track.mode === "focus" ? 4 : track.mode === "momentum" ? 5 : 3;
  const nextMilestone = progressUnits >= target
    ? target
    : Math.min(target, Math.max(milestoneStep, Math.ceil((progressUnits + 0.001) / milestoneStep) * milestoneStep));
  const completedCount = completedStepIdsForTrack(track, trackActivity).size;
  const openCount = track.mode === "milestone" ? Math.max(track.steps.length - completedCount, 0) : track.steps.length;
  const run = streakLength(trackActivity, new Date());

  return {
    totalXp: trackActivity.reduce((sum, entry) => sum + entry.xp, 0),
    progressUnits,
    progressPercent,
    progressLabel: `${progressUnits}/${target} ${track.unitLabel}`,
    nextMilestoneLabel:
      progressUnits >= target ? t("track.targetReached") : t("track.toNext", { count: Math.max(nextMilestone - progressUnits, 0) }),
    runLabel: run ? t("track.dayRun", { count: run }) : t("track.resumeFriendly"),
    moveSummary:
      track.mode === "milestone"
        ? t("track.openDone", { open: openCount, done: completedCount })
        : t("track.reusable", { count: track.steps.length }),
  };
}

function buildDailyBrief() {
  const metrics = globalMetrics();

  if (!state.tracks.length) {
    return {
      headline: t("daily.brief.emptyHead"),
      body: t("daily.brief.emptyBody"),
    };
  }

  if (!metrics.todayWins && metrics.recoveryBonus) {
    return {
      headline: t("daily.brief.comebackHead"),
      body: t("daily.brief.comebackBody"),
    };
  }

  if (!metrics.todayWins) {
    return {
      headline: t("daily.brief.startHead"),
      body: t("daily.brief.startBody"),
    };
  }

  if (metrics.todayWins < 3) {
    return {
      headline: t("daily.brief.warmHead"),
      body: t("daily.brief.warmBody"),
    };
  }

  return {
    headline: t("daily.brief.strongHead"),
    body: t("daily.brief.strongBody"),
  };
}

function suggestedNextMoves() {
  return [...state.tracks]
    .sort((left, right) => lastActivityTime(left) - lastActivityTime(right))
    .map((track) => {
      const step = nextStepForTrack(track);
      return step ? { track, step } : null;
    })
    .filter(Boolean)
    .slice(0, 3);
}

function nextStepForTrack(track) {
  const completedIds = completedStepIdsForTrack(track);
  const counts = countCompletionsByStep(track.id);
  const candidates = track.steps.filter((step) => step.repeatable || !completedIds.has(step.id));

  if (!candidates.length) {
    return null;
  }

  return [...candidates].sort((left, right) => {
    const leftCount = counts[left.id] || 0;
    const rightCount = counts[right.id] || 0;
    if (leftCount !== rightCount) {
      return leftCount - rightCount;
    }
    return EFFORT_POINTS[left.effort] - EFFORT_POINTS[right.effort];
  })[0];
}

function countCompletionsByStep(trackId) {
  return state.activity
    .filter((entry) => entry.trackId === trackId)
    .reduce((memo, entry) => {
      memo[entry.stepId] = (memo[entry.stepId] || 0) + 1;
      return memo;
    }, {});
}

function progressUnitsForTrack(track, activity = state.activity.filter((entry) => entry.trackId === track.id)) {
  if (track.mode === "milestone") {
    return completedStepIdsForTrack(track, activity).size;
  }

  return activity.reduce((sum, entry) => sum + (entry.progressDelta || 0), 0);
}

function completedStepIdsForTrack(track, activity = state.activity.filter((entry) => entry.trackId === track.id)) {
  const ids = new Set();
  const validStepIds = new Set(track.steps.map((step) => step.id));

  track.steps.forEach((step) => {
    if (step.doneAt) {
      ids.add(step.id);
    }
  });
  activity.forEach((entry) => {
    if (validStepIds.has(entry.stepId)) {
      ids.add(entry.stepId);
    }
  });
  return ids;
}

function quoteForToday() {
  if (prefs.quoteStyle === "bible") {
    const quote = pickBibleQuoteForToday();
    return {
      text: quote.text[prefs.language],
      source: prefs.language === "ru" ? quote.source.labelRu : quote.source.labelEn,
    };
  }

  const pool = QUOTE_POOLS[prefs.language]?.[prefs.quoteStyle] || QUOTE_POOLS.en.reflective;
  const seed = hashString(`${dayKey(new Date())}:${prefs.quoteStyle}:${prefs.language}`);
  return pool[seed % pool.length];
}

function pickBibleQuoteForToday() {
  const preferredCategories = preferredBibleQuoteCategories();
  const matchingQuotes = BIBLE_QUOTES.filter((quote) => preferredCategories.includes(quote.category));
  const pool = matchingQuotes.length ? matchingQuotes : BIBLE_QUOTES;
  const seed = hashString(`${dayKey(new Date())}:${prefs.language}:${preferredCategories.join("|")}`);
  return pool[seed % pool.length];
}

function preferredBibleQuoteCategories() {
  const categories = [
    "small-steps",
    "small-beginnings",
    "keep-going",
    "start-again",
    "today",
    "new-morning",
    "action",
    "wholehearted-work",
    "discipline",
    "renewed-strength",
  ];
  const start = hashString(`${dayKey(new Date())}:bible-categories`) % categories.length;
  return [
    categories[start],
    categories[(start + 1) % categories.length],
    categories[(start + 2) % categories.length],
  ];
}

function renderRing(progressPercent, label, note, color) {
  const circumference = 2 * Math.PI * 40;
  const dash = (progressPercent / 100) * circumference;
  return `
    <div class="progress-ring tone-${escapeAttribute(color)}">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="40" stroke="var(--ring-track)"></circle>
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="var(--track-accent)"
          stroke-linecap="round"
          stroke-dasharray="${dash} ${circumference}"
        ></circle>
      </svg>
      <div class="ring-copy">
        <strong>${escapeHtml(label)}</strong>
        <span>${escapeHtml(note)}</span>
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
      <path d="${area}" fill="var(--accent-soft)"></path>
      <path d="${line}" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
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
  const input = document.querySelector(`input[name="mode"][value="${safeMode(mode)}"]`);
  if (input) {
    input.checked = true;
  }
}

function starterKit(category) {
  return starterKits.find((kit) => kit.category === category) || FALLBACK_STARTER_KITS[0];
}

function localizedKit(category) {
  const base = starterKit(category);
  const copy = KIT_COPY[prefs.language]?.[base.category] || KIT_COPY.en[base.category];
  return {
    ...base,
    label: t(`categories.${base.category}`),
    description: copy.description,
    prompt: copy.prompt,
    unitLabel: copy.unit,
    suggestedSteps: copy.steps,
    ideas: copy.ideas,
  };
}

function modeSuggestions(kit, mode) {
  return mode === "milestone" ? [...kit.suggestedSteps] : kit.suggestedSteps.slice(0, 3);
}

function deriveSuggestedStepText(kit, mode) {
  return modeSuggestions(kit, mode).join("\n");
}

function appendSuggestion(stepTitle) {
  const current = elements.stepList.value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (!current.includes(stepTitle)) {
    current.push(stepTitle);
  }
  elements.stepList.value = current.join("\n");
}

function defaultUnitLabel(mode, kit) {
  return mode === "milestone" ? fallbackMilestoneUnit() : kit.unitLabel;
}

function fallbackMilestoneUnit() {
  return prefs.language === "ru" ? "шагов" : "moves";
}

function sanitizeTargetValue(value, mode, steps, fallback) {
  const raw = clampNumber(value, 1, 100) || fallback || 1;
  return mode === "milestone" ? Math.max(raw, steps.length || 1) : raw;
}

function safeMode(value, fallback = "focus") {
  return ["focus", "momentum", "milestone"].includes(value) ? value : fallback;
}

function safeEffort(value, fallback = "steady") {
  return ["light", "steady", "deep"].includes(value) ? value : fallback;
}

function safeColor(value, fallback = "clay") {
  return COLOR_TONES.includes(value) ? value : fallback;
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

function fallbackStepTitle(kit, index) {
  return kit.suggestedSteps[index] || `${kit.label} ${index + 1}`;
}

function normalizeStepTitle(value) {
  return String(value).toLowerCase().replace(/\s+/g, " ").trim();
}

function lastActivityTime(track) {
  const entry = state.activity.find((item) => item.trackId === track.id);
  return entry ? new Date(entry.completedAt).getTime() : new Date(track.createdAt).getTime();
}

function formatRelativeTime(isoString) {
  const deltaMinutes = Math.round((Date.now() - new Date(isoString).getTime()) / 60000);
  if (deltaMinutes < 1) {
    return prefs.language === "ru" ? "только что" : "just now";
  }
  const rtf = new Intl.RelativeTimeFormat(localeCode(), { numeric: "auto" });
  if (deltaMinutes < 60) {
    return rtf.format(-deltaMinutes, "minute");
  }
  if (deltaMinutes < 1440) {
    return rtf.format(-Math.round(deltaMinutes / 60), "hour");
  }
  return rtf.format(-Math.round(deltaMinutes / 1440), "day");
}

function formatShortDate(date) {
  return new Intl.DateTimeFormat(localeCode(), { month: "short", day: "numeric" }).format(new Date(date));
}

function formatWeekday(date) {
  return new Intl.DateTimeFormat(localeCode(), { weekday: "short" }).format(new Date(date));
}

function localeCode() {
  return prefs.language === "ru" ? "ru-RU" : "en-US";
}

function countLabel(count, key) {
  return `${count} ${pluralWord(count, key)}`;
}

function pluralWord(count, key) {
  const forms = {
    en: {
      win: ["win", "wins"],
      day: ["day", "days"],
    },
    ru: {
      win: ["победа", "победы", "побед"],
      day: ["день", "дня", "дней"],
    },
  };
  const set = forms[prefs.language][key];
  if (prefs.language === "en") {
    return count === 1 ? set[0] : set[1];
  }
  const abs = Math.abs(count) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) {
    return set[2];
  }
  if (last > 1 && last < 5) {
    return set[1];
  }
  if (last === 1) {
    return set[0];
  }
  return set[2];
}

function t(path, params = {}) {
  const value = getText(path);
  if (typeof value !== "string") {
    return "";
  }
  return value.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ""));
}

function getText(path) {
  const parts = path.split(".");
  let cursor = UI_TEXT[prefs.language];
  for (const part of parts) {
    cursor = cursor?.[part];
  }
  if (cursor === undefined) {
    cursor = UI_TEXT.en;
    for (const part of parts) {
      cursor = cursor?.[part];
    }
  }
  return cursor;
}

function shellText(key) {
  return SHELL_TEXT[prefs.language]?.[key] || SHELL_TEXT.en[key] || "";
}

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function clampNumber(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return 0;
  }
  return clamp(Math.round(number), min, max);
}

function safeIso(value) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function startOfDay(date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function endOfDay(date) {
  const value = new Date(date);
  value.setHours(23, 59, 59, 999);
  return value;
}

function dayKey(date) {
  const value = new Date(date);
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, "0");
  const day = `${value.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shiftDays(date, amount) {
  const value = new Date(date);
  value.setDate(value.getDate() + amount);
  return value;
}

function dayDifference(later, earlier) {
  return Math.round((startOfDay(later).getTime() - startOfDay(earlier).getTime()) / 86400000);
}

function hashString(value) {
  return [...String(value)].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7);
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
