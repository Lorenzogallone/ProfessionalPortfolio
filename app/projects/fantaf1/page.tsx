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
        Fanta F1 – Real-Time Fantasy Scoring App
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

      <p className="text-lg mb-8">
        A full-stack fantasy Formula 1 platform with live race scoring, sprint logic, jolly picks and automatic standings.
      </p>

      <Section title="Stack & Tools" text={`React.js · TypeScript · Tailwind CSS · Bootstrap
Firebase Firestore · Firebase Auth · React-Select`} />

      <Section title="Main Features" text={`• Race results input with instant scoring
• Sprint race & jolly bonus support
• Double points for final round
• Real-time user standings`} />

      <Section title="Firestore Schema" text={`/races → metadata, officialResults, submissions
/ranking → points per user and race
/championship/results → final podium`} />

      <Section title="Deployment" text={`• Firebase Hosting
• Local testing with full Firestore emulator
• Mobile-ready and deployed via Firebase`} />

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

function Section({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-base text-gray-700 whitespace-pre-line">{text}</p>
    </div>
  );
}