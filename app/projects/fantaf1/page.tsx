'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FantaF1ProjectPage() {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto text-gray-800">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-4"
      >
        Fanta F1 – Fantasy League Management Platform
      </motion.h1>

      <p className="mb-6 text-blue-600 text-lg">
        🌍 <a
          href="https://fantaf1-b5410.web.app"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline hover:text-blue-800"
        >
          Live Demo → fantaf1-b5410.web.app
        </a>
      </p>

      <p className="text-lg mb-8 italic text-gray-600">
        Personal project – A comprehensive web application to manage Formula 1 fantasy league among friends, 
        featuring real-time standings, automatic points calculation, advanced statistics, and professional administration tools.
      </p>

      <Section 
        title="Tech Stack" 
        text={`React 19 · React Router v7 · Vite 6
Firebase Firestore · Firebase Hosting
React Bootstrap · Material-UI · Recharts
React-Select · i18n Multi-language`} 
      />

      <Section 
        title="Core Features" 
        text={`• Auto-fetch race results from Ergast F1 API
• Real-time leaderboard with progression charts
• Sprint race & joker bonus system (29→30 rule)
• Late submission with -3 penalty tracking
• Championship predictions (drivers + constructors)
• Full dark mode support`} 
      />

      <Section 
        title="Advanced Statistics" 
        text={`• Personal dashboards: performance metrics, formation history, joker analytics
• Global analytics: top performers, race insights, driver popularity trends
• Visual charts: line graphs, pie charts, histograms (Recharts)
• Prediction accuracy tracking with position breakdown`} 
      />

      <Section 
        title="Admin Panel" 
        text={`• Submit/edit formations for any user (bypass deadlines)
• Modify race dates, deadlines, and sprint configuration
• Automatic backup before calculations
• Manual backup/restore system with JSON export
• Database reset operations (formations, scores, complete)
• Ranking snapshots after each calculation`} 
      />

      <Section 
        title="Database Architecture" 
        text={`Firestore Collections:
/races → metadata, official results, submissions subcollection
/ranking → user points, jokers, championship predictions
/backups → auto/manual snapshots with metadata
/rankingSnapshots → historical standings after each race
/championship → final season results`} 
      />

      <Section 
        title="Key Technical Implementations" 
        text={`• Dynamic driver/team resolution (manual DB + API cache)
• Points calculation engine with double points logic
• Anti-duplicate validation for formations
• Deadline countdown and grace period system
• Environment-based configuration (dev/prod)
• Responsive design (mobile/tablet/desktop)`} 
      />

      <Section 
        title="Deployment & Hosting" 
        text={`• Production: Firebase Hosting
• Database: Cloud Firestore (NoSQL real-time)
• Build: Vite with optimized production bundle
• Version control: Git with feature branches`} 
      />

      <div className="mt-10 flex justify-between items-center">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← Back to Projects
        </Link>
        <Link
          href="https://github.com/Lorenzogallone/fanta-f1"
          target="_blank"
          className="inline-block text-blue-600 hover:underline"
        >
          View Source Code on GitHub →
        </Link>
      </div>
    </section>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-base text-gray-700 whitespace-pre-line">{text}</p>
    </div>
  );
}
