// Every piece of copy on the site lives here, so updating the portfolio
// means editing data, not components.

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://professional-portfolio-three-snowy.vercel.app";

export const profile = {
  name: "Lorenzo Gallone",
  role: "Full-Stack Engineer",
  company: "MarketLabs",
  location: "Rome, Italy",
  email: "lorenzo.gallone@gmail.com",
  github: "https://github.com/Lorenzogallone",
  linkedin: "https://www.linkedin.com/in/lorenzo-gallone/",
  resume: "/resume.pdf",
  eyebrow: "Full-Stack Engineer · AI & LLM Integration",
  headline: "Building enterprise platforms with",
  headlineAccent: "AI built in.",
  intro:
    "I'm Lorenzo, a full-stack engineer at MarketLabs in Rome. I build web applications end to end and bring AI into them as part of the architecture, not as an afterthought.",
  description:
    "Lorenzo Gallone is a full-stack engineer in Rome building enterprise web platforms with AI built in: TypeScript, React, Next.js, NestJS, PostgreSQL, Kubernetes and LLM integration.",
};

export type Link = { label: string; href: string; note?: string };

export type CaseSection = {
  title: string;
  body?: string;
  points?: { title?: string; text: string }[];
};

export type Project = {
  slug: string;
  name: string;
  tag: string;
  period: string;
  context: string;
  summary: string;
  intro: string;
  stack: string[];
  links: Link[];
  facts: { value: string; label: string }[];
  flow: { title: string; steps: string[]; loop?: string };
  sections: CaseSection[];
  /** Phone screenshots of the installed PWA; the first one is the cover. */
  screens?: { src: string; alt: string; caption: string }[];
  screensNote?: string;
};

export const projects: Project[] = [
  {
    slug: "zitto-e-corri",
    name: "Zitto e Corri",
    tag: "AI coach · PWA",
    period: "2026",
    context: "Personal project",
    summary:
      "A mobile-first running coach where an LLM reads your training data and proposes plan changes that you approve.",
    intro:
      "Training apps are good at recording runs and bad at changing the plan when life gets in the way. Zitto e Corri puts activity tracking, a rolling training plan and a conversational coach in one installable web app, with the model working inside clear boundaries.",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Gemini",
      "OpenRouter",
      "Zod",
      "MapLibre",
      "Web Push",
      "Vercel Cron",
    ],
    links: [
      { label: "Live app", href: "https://zitto-and-corri.vercel.app", note: "Google sign-in, Italian UI" },
      { label: "Source on GitHub", href: "https://github.com/Lorenzogallone/ZittoAndCorri" },
    ],
    facts: [
      { value: "2", label: "LLM providers, routed per task" },
      { value: "100+", label: "automated tests" },
      { value: "7 days", label: "of plan synced to the watch" },
    ],
    screensNote: "Screens from the installed app (PWA) on a phone, with the author's own training data.",
    screens: [
      {
        src: "/screens/zitto-chat.jpg",
        alt: "Coach chat in Zitto e Corri: the athlete asks to move a session and the coach answers and updates the plan",
        caption: "The coach answers with the athlete's real data and updates the plan. Every reply shows tokens and cost.",
      },
      {
        src: "/screens/zitto-home.jpg",
        alt: "Zitto e Corri home with the next session, its intensity profile and the week at a glance",
        caption: "Home: the next session with its intensity profile, the week at a glance and the coach.",
      },
      {
        src: "/screens/zitto-analysis.jpg",
        alt: "AI analysis of a 13 km run with heart-rate zones and the coach's comment",
        caption: "AI analysis of a run against the plan, with heart-rate zones and the cost of the call.",
      },
      {
        src: "/screens/zitto-plan.jpg",
        alt: "Training plan towards a half marathon with phases and the current week",
        caption: "A rolling plan towards the goal race, with training phases and what was done.",
      },
      {
        src: "/screens/zitto-profile.jpg",
        alt: "Profile with a readiness score of 83 computed from recovery and sleep",
        caption: "Readiness from recovery and sleep, synced from the watch.",
      },
    ],
    flow: {
      title: "How a coach suggestion reaches the plan",
      steps: ["Training data", "Context contract", "LLM", "Zod validation", "Proposal", "Athlete approves"],
    },
    sections: [
      {
        title: "AI as part of the architecture",
        points: [
          {
            title: "Structured output only",
            text: "Every model call returns JSON against a schema and is validated with Zod before anything reaches the database. Free text is for the chat bubble, never for state.",
          },
          {
            title: "Human in the loop",
            text: "The coach proposes new, moved or removed sessions and the athlete approves them. Actions on recorded runs, like excluding an aborted session, are reversible.",
          },
          {
            title: "A typed context contract",
            text: "Athlete profile, training state, current plan, memories and recent evaluations are assembled into named sections, so each prompt carries what its task needs.",
          },
          {
            title: "Model routing and cost tracking",
            text: "Chat and run analysis can use different models across Gemini and OpenRouter. Tokens and cost are recorded per call and summed per month.",
          },
        ],
      },
      {
        title: "Data and integrations",
        points: [
          { text: "FIT and GPX imports with pace-coloured maps, splits, heart rate and training load." },
          {
            text: "Two-way Intervals.icu sync: runs, sleep and HRV come in; the next seven days of the plan go out as structured workouts on Amazfit watches.",
          },
          { text: "Heat-adjusted target paces from the Open-Meteo forecast, and an import API secured by a personal key." },
        ],
      },
      {
        title: "Engineering",
        body: "Supabase Postgres with row-level security keeps each athlete's data separate. Scheduled jobs on Vercel run the daily and weekly syncs, web push handles reminders, and the core logic is covered by more than a hundred tests.",
      },
    ],
  },
  {
    slug: "tiger",
    name: "TIGER",
    tag: "MSc thesis · Research",
    period: "2025",
    context: "Master's thesis · University of Illinois Chicago",
    summary: "Testing and Improving Generated code with LLMs: a test-feedback loop that makes generated code pass.",
    intro:
      "Can an LLM write correct, maintainable code when it only sees what a developer would see: documentation, signatures and tests, but never the original implementation? TIGER answers that with a loop that behaves like a developer running the test suite.",
    stack: ["Python", "PyTest", "AST parsing", "Call-graph analysis", "OpenRouter", "Gemini", "Qwen Coder", "GitHub Actions"],
    links: [],
    facts: [
      { value: "10", label: "open-source Python repositories" },
      { value: "+30%", label: "success rate vs one-shot, at best" },
      { value: "1.9", label: "iterations on average to pass" },
    ],
    flow: {
      title: "The TIGER loop",
      steps: ["Repository", "Docs, signatures, tests", "Prompt", "LLM", "Run tests"],
      loop: "Failing tests become feedback for the next prompt, until they pass or the retry limit is hit.",
    },
    sections: [
      {
        title: "How it works",
        points: [
          {
            title: "Preprocess",
            text: "Parse the repository with the AST and a call graph to extract each function's signature, docstring, related documentation and tests.",
          },
          {
            title: "Generate",
            text: "Ask the model for the implementation with a structured prompt built only from that specification.",
          },
          {
            title: "Test and feed back",
            text: "Run the test suite. When tests fail, turn the failures into targeted feedback and prompt again.",
          },
        ],
      },
      {
        title: "Results",
        body: "Across 10 open-source Python repositories (around 230 functions in boltons alone), the iterative loop outperformed single-pass generation by up to 30% in success rate, needing 1.9 iterations on average.",
      },
      {
        title: "Why it matters",
        body: "TIGER uses public LLM APIs as any third-party developer would: no fine-tuning and no special hardware. The improvement comes from the method around the model, which is what makes it practical for real engineering teams.",
      },
    ],
  },
  {
    slug: "fanta-f1",
    name: "Fanta F1",
    tag: "Real-time · PWA",
    period: "2025 – today",
    context: "Personal project",
    summary:
      "A Formula 1 fantasy league for friends, with automatic data sync, live standings and push reminders before qualifying.",
    intro:
      "A fantasy game for a group of friends, built as a full product: players pick the podium and their jokers for every Grand Prix and sprint, and the app does the rest, from scoring to reminders.",
    stack: ["React", "Vite", "Firebase", "Firestore", "Cloud Functions", "Cloud Messaging", "Recharts", "GitHub Actions"],
    links: [
      { label: "Live app", href: "https://fantaf1-b5410.web.app" },
      { label: "Source on GitHub", href: "https://github.com/Lorenzogallone/fanta-f1" },
    ],
    facts: [
      { value: "PWA", label: "installable on any phone" },
      { value: "3", label: "push reminders before qualifying" },
      { value: "CI/CD", label: "deploy on every push to main" },
    ],
    screensNote: "Screens from the installed app (PWA), running locally against the Firebase emulators with test data.",
    screens: [
      {
        src: "/screens/fantaf1-home.jpg",
        alt: "Fanta F1 home with the next Grand Prix, the lineup deadline countdown and the standings",
        caption: "Home: the next race, the countdown to the lineup deadline and live standings.",
      },
      {
        src: "/screens/fantaf1-lineup.jpg",
        alt: "Lineup form with podium picks and jokers for the Las Vegas Grand Prix",
        caption: "Lineup for the next Grand Prix, with podium picks, jokers and duplicate checks.",
      },
      {
        src: "/screens/fantaf1-results.jpg",
        alt: "Race results with the official podium and every player's lineup and points",
        caption: "Race results with every player's lineup and the points it earned.",
      },
      {
        src: "/screens/fantaf1-stats.jpg",
        alt: "Player statistics with a bar chart of points per Grand Prix",
        caption: "Per-player statistics: points per Grand Prix and championship position.",
      },
      {
        src: "/screens/fantaf1-reminders.jpg",
        alt: "Prompt asking to enable race reminders one hour and five minutes before the start",
        caption: "Push reminders before every race, offered on the first launch of the installed app.",
      },
    ],
    flow: {
      title: "From the track to the standings",
      steps: ["Jolpica F1 API", "Scheduled sync", "Hash check", "Firestore", "Live standings"],
    },
    sections: [
      {
        title: "The game",
        body: "Points for the podium in order, jokers for a driver on the podium, sprint races, a bonus joker for a perfect podium and double points at the season finale. Mid-season, players also predict the drivers' and constructors' championships.",
      },
      {
        title: "Built for real use",
        points: [
          { text: "Live leaderboard with a points-progression chart, race history and per-player statistics." },
          { text: "Formation entry with search, team logos, duplicate checks and a countdown to the deadline." },
          { text: "Admin tools for results, late-submission penalties, backups and restores." },
        ],
      },
      {
        title: "Automation",
        body: "Scheduled Cloud Functions keep the calendar and drivers in sync with the Jolpica F1 API. The sync is cheap by design: when the data hash is unchanged it stops after one read and one write, it never deletes, and it leaves races with saved results alone. Push notifications remind players the evening before, one hour and five minutes before qualifying.",
      },
      {
        title: "Delivery",
        body: "Firestore security rules and admin custom claims protect the data. GitHub Actions builds and deploys on every push to main, and seed scripts run the whole app against the Firebase emulators.",
      },
    ],
  },
];

export const earlierWork: { name: string; text: string; stack: string }[] = [
  {
    name: "WhatDoYouMeme",
    text: "Real-time multiplayer web game built in a cross-university course, with a focus on backend security.",
    stack: "React · Node.js · Express",
  },
  {
    name: "Team task manager",
    text: "Android app for multi-team collaboration with task handling and real-time chat.",
    stack: "Kotlin · Android",
  },
  {
    name: "OS/161 shell",
    text: "Multiprogramming, process control, file and memory management and a syscall interface for the OS/161 kernel.",
    stack: "C · Operating systems",
  },
];

export const experience: {
  role: string;
  company: string;
  place: string;
  period: string;
  text: string;
  stack: string[];
}[] = [
  {
    role: "Full-Stack Engineer",
    company: "MarketLabs",
    place: "Rome",
    period: "Oct 2026 – today",
    text: "I work on Compass, an enterprise project-management and intelligence platform for large industrial organizations: product features across the stack, automations and AI-agent capabilities on company data, from requirements to production.",
    stack: ["TypeScript", "React", "Next.js", "LLM integration"],
  },
  {
    role: "Front-End Software Engineer",
    company: "Altec",
    place: "Turin",
    period: "Sep 2025 – Oct 2026",
    text: "Front ends in Vue and TypeScript for a NestJS and PostgreSQL platform, shipped on on-prem Docker and Kubernetes with GitLab CI/CD and OAuth2/JWT authentication.",
    stack: ["Vue", "TypeScript", "NestJS", "PostgreSQL", "Kubernetes"],
  },
];

export const education: { degree: string; school: string; detail: string }[] = [
  {
    degree: "MSc Computer Software Engineering",
    school: "University of Illinois Chicago",
    detail: "GPA 4.0/4.0 · 2025 · double degree",
  },
  {
    degree: "MSc (Laurea Magistrale)",
    school: "Politecnico di Torino",
    detail: "110 cum laude · 2025 · double degree",
  },
  {
    degree: "BSc Computer Engineering",
    school: "Politecnico di Torino",
    detail: "108/110",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Vue", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "NestJS", "REST APIs", "OAuth2 / JWT"] },
  { group: "Data", items: ["PostgreSQL", "Supabase", "Firebase"] },
  { group: "Infrastructure", items: ["Docker", "Kubernetes", "CI/CD", "Vercel"] },
  { group: "AI", items: ["LLM integration", "Structured output", "RAG", "Tool calling", "Agents"] },
];

export const about = {
  paragraphs: [
    "I like clean architecture, systems that are simple to reason about, and shipping things people actually use. My favourite problems sit where product and AI meet: deciding what the model should do, what it must never do, and how to check its work.",
    "Before MarketLabs I built front ends at Altec in Turin. I hold a double MSc from the University of Illinois Chicago and Politecnico di Torino, where my thesis, TIGER, studied how test feedback makes LLM-generated code better.",
  ],
  offline:
    "Away from the keyboard I'm a certified ski instructor, teaching on weekends and in my free time.",
  languages: "Italian (native) · English (professional, IELTS 7)",
};
