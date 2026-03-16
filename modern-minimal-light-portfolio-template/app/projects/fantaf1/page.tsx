'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function FantaF1ProjectPage() {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto text-gray-800">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-4"
      >
        Fanta F1 – Full-Stack F1 Fantasy League Platform
      </motion.h1>

      <p className="mb-6 text-blue-600 text-lg">
        🌍{' '}
        <a
          href="https://fanta-f1-bfb7b.web.app"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline hover:text-blue-800"
        >
          Live Demo → fanta-f1.web.com
        </a>
      </p>

      <p className="text-lg mb-8 leading-relaxed">
        A full-stack web application to manage a Formula 1 fantasy league among friends — real-time standings,
        automatic points calculation via REST API, sprint race support, advanced admin tools, PWA installability,
        and push notifications.
      </p>

      {/* Landing page screenshot */}
      <div className="mb-10 max-w-lg mx-auto">
        <Image
          src="/landing_page.PNG"
          alt="Fanta F1 – Home Page"
          width={720}
          height={450}
          className="rounded-xl border shadow-md w-full object-cover"
        />
        <p className="text-sm text-gray-500 mt-2 text-center">Home page — quick access to submissions, F1 hub, race history, and standings</p>
      </div>

      {/* How It Works */}
      <Section title="🎮 How It Works">
        <p className="text-base text-gray-700 leading-relaxed mb-3">
          Before each Grand Prix, every player submits a <strong>formation before qualifying starts</strong>.
          Points are calculated automatically once official results are fetched from the Ergast F1 API.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-base">
          <li><strong>3 Drivers (P1, P2, P3)</strong> — predict the top 3 finishers in order</li>
          <li><strong>Joker</strong> — bonus driver: +5 pts if they finish on the podium</li>
          <li><strong>Joker 2</strong> — unlockable via the 29→30 rule</li>
          <li><strong>Sprint Formation</strong> — separate picks for sprint weekends (SP1/SP2/SP3 + Sprint Joker)</li>
          <li><strong>Championship Formation</strong> — mid-season prediction of top 3 drivers and constructors</li>
        </ul>
      </Section>

      {/* Scoring System */}
      <Section title="🏆 Scoring System">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Main Race</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>1st correct → <strong>12 pts</strong> · 2nd → <strong>10</strong> · 3rd → <strong>8</strong></li>
              <li>Joker on podium → <strong>+5 pts</strong></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Sprint Race</h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>1st correct → <strong>8 pts</strong> · 2nd → <strong>6</strong> · 3rd → <strong>4</strong></li>
              <li>Sprint Joker on podium → <strong>+2 pts</strong></li>
            </ul>
          </div>
        </div>
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-base">
          <li><strong>29→30 Rule:</strong> guessing the full podium in order (30 pts) earns 1 extra Joker for a future race — applies to race, sprint, and championship</li>
          <li><strong>Last Race – Double Points:</strong> all points doubled in the final race of the season</li>
          <li><strong>Late Submission:</strong> −3 pts penalty if submitted after qualifying starts (within grace window)</li>
          <li><strong>Cancelled Races:</strong> no points awarded, formations not required</li>
        </ul>
      </Section>

      {/* Screenshots grid */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Image src="/submit_page.PNG" alt="Formation Submission" width={600} height={400} className="rounded-lg border shadow w-full object-cover" />
          <p className="text-sm text-gray-500 mt-1 text-center">Submit page — formation submission with driver selection</p>
        </div>
        <div>
          <Image src="/f1_calendar.PNG" alt="F1 Calendar" width={600} height={400} className="rounded-lg border shadow w-full object-cover" />
          <p className="text-sm text-gray-500 mt-1 text-center">F1 Calendar — admin race calendar management</p>
        </div>
        <div>
          <Image src="/personal_profile.PNG" alt="Personal Profile" width={600} height={400} className="rounded-lg border shadow w-full object-cover" />
          <p className="text-sm text-gray-500 mt-1 text-center">Personal profile — participant detail and formation history</p>
        </div>
        <div>
          <Image src="/personal_statistics.PNG" alt="Personal Statistics" width={600} height={400} className="rounded-lg border shadow w-full object-cover" />
          <p className="text-sm text-gray-500 mt-1 text-center">Personal statistics — performance metrics and points breakdown</p>
        </div>
      </div>

      {/* App Features */}
      <Section title="📱 App Features">
        <ul className="text-gray-700 space-y-2 text-base">
          <li><strong>📊 Real-Time Leaderboard</strong> — standings with gap from leader, jokers, championship points, and season points-progression chart</li>
          <li><strong>👤 Participant Detail</strong> — per-race breakdown (main + sprint), best/worst race, average score, joker usage, and full formation history</li>
          <li><strong>🏁 Race History</strong> — official podium results, all player formations, individual points earned, sprint results</li>
          <li><strong>🎯 Formation Submission</strong> — searchable dropdowns with team logos, real-time duplicate validation, formation preview, and deadline countdown</li>
          <li><strong>📈 Statistics Dashboard</strong> — top performers, hardest race to predict, most popular picks, and trend charts</li>
        </ul>
      </Section>

      {/* Race statistics screenshot */}
      <div className="mb-10 max-w-lg mx-auto">
        <Image
          src="/race_statistics.PNG"
          alt="Race Statistics"
          width={720}
          height={420}
          className="rounded-xl border shadow-md w-full object-cover"
        />
        <p className="text-sm text-gray-500 mt-2 text-center">Race statistics — per-race results and scoring</p>
      </div>

      {/* REST API Integration */}
      <Section title="🔌 REST API Integration – Ergast F1 API">
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-base">
          <li>Automatic podium fetching after each race with one-click admin trigger</li>
          <li>Dynamic driver and constructor roster synced from the API (cached 72 h in localStorage)</li>
          <li>Fallback to manual <code className="bg-gray-100 px-1 rounded">f1-data.json</code> if the API is unavailable</li>
        </ul>
      </Section>

      {/* Admin Panel */}
      <Section title="⚙️ Admin Panel">
        <p className="text-base text-gray-700 mb-4">
          Secured via <strong>Firebase Custom Claims</strong> — no shared passwords, no client-side bypass. Privileges are granted via a server-side Node.js script.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-800 mb-2">📝 Formation Management</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>Submit or edit any user&apos;s formation, bypassing the deadline</li>
              <li>Apply or override late submission penalty</li>
              <li>Manage sprint formations separately</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-800 mb-2">📅 Calendar Management</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>Edit race, qualifying, and sprint deadlines</li>
              <li>Add/remove sprint weekends</li>
              <li>Cancel races/sprints (skips points calc)</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-800 mb-2">🧮 Points Calculation</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>Auto-fetch results from Ergast API or manual entry</li>
              <li>One-click calculation with 29→30 and double-points auto-detection</li>
              <li>Ranking snapshot saved after every calculation</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-800 mb-2">💾 Backup & Restore</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>Auto-backup before every critical operation</li>
              <li>Browse, preview, and one-click restore from any snapshot</li>
              <li>Export as JSON; destructive ops require typing &quot;RESTORE&quot;</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Auth + PWA side by side */}
      <Section title="🔐 Authentication & 📲 PWA">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-gray-700">
          <ul className="list-disc list-inside space-y-1">
            <li>Email/Password and Google Sign-In</li>
            <li>Account linking: same email → merged profile</li>
            <li>Unique nickname enforcement at registration</li>
            <li>Password reset via Firebase secure email</li>
            <li>Route guards: <code className="bg-gray-100 px-1 rounded">ProtectedRoute</code> + <code className="bg-gray-100 px-1 rounded">AdminRoute</code></li>
          </ul>
          <ul className="list-disc list-inside space-y-1">
            <li>Installable on Android, iOS, and desktop</li>
            <li>Offline-capable via Workbox service worker</li>
            <li>Auto-update on next launch</li>
            <li>FCM push notifications: qualifying reminders 1 h and 5 min before (night sessions → 21:00 the day before)</li>
            <li>Delivered by Firebase Cloud Functions on cron schedule</li>
          </ul>
        </div>
      </Section>

      {/* F1 Hub screenshot */}
      <div className="mb-10 max-w-lg mx-auto">
        <Image
          src="/f1_hub.PNG"
          alt="F1 Hub"
          width={720}
          height={420}
          className="rounded-xl border shadow-md w-full object-cover"
        />
        <p className="text-sm text-gray-500 mt-2 text-center">F1 Hub — real-time standings and season leaderboard</p>
      </div>

      {/* Customization */}
      <Section title="🎨 Customization">
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-base">
          <li><strong>Points system</strong> — all values, joker bonuses, late penalty, and grace window configurable in <code className="bg-gray-100 px-1 rounded">racing.js</code></li>
          <li><strong>F1 data</strong> — auto-synced from Ergast API; override with custom <code className="bg-gray-100 px-1 rounded">f1-data.json</code> for any season</li>
          <li><strong>Theme</strong> — CSS variables for primary color, dark palette, and accent; full dark mode with localStorage persistence</li>
          <li><strong>i18n</strong> — Italian and English via <code className="bg-gray-100 px-1 rounded">LanguageContext</code>, easily extensible</li>
        </ul>
      </Section>

      {/* Tech Stack */}
      <Section title="🛠️ Tech Stack">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-800 mb-2">Frontend</h3>
            <p>React 19 · React Router v7 · React Bootstrap · React-Select · Recharts · Vite 6 · vite-plugin-pwa</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-800 mb-2">Backend & Database</h3>
            <p>Firebase Firestore · Firebase Auth · FCM · Cloud Functions (Node.js 20) · Firebase Hosting · Ergast F1 REST API</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h3 className="font-semibold text-gray-800 mb-2">Deployment</h3>
            <p>GitHub Actions CI/CD · Firebase Hosting auto-deploy · Firestore Security Rules · GitHub Secrets</p>
          </div>
        </div>
      </Section>

      <div className="mt-10 flex justify-between items-center">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← Back to Projects
        </Link>
        <Link
          href="https://github.com/Lorenzogallone/fanta-f1.git"
          target="_blank"
          className="inline-block text-blue-600 hover:underline"
        >
          View Source Code on GitHub →
        </Link>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
