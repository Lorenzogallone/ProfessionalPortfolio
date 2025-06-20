'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WhatDoYouMemeProjectPage() {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto text-gray-800">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-4"
      >
        WhatDoYouMeme – Real-Time Meme Guessing Game
      </motion.h1>

      <p className="mb-6 text-blue-600 text-lg">
        🎮 <a
          href="https://whatdoyoumeme-0r2t.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline hover:text-blue-800"
        >
          Live Demo → https://whatdoyoumeme-0r2t.onrender.com
        </a>
      </p>

      <p className="text-lg mb-8">
        A real-time meme guessing game with multiplayer rooms, single-player demo mode, and live socket-based interaction for 2+ players.
      </p>

      <Section title="Stack & Tools" text={`React.js · TypeScript · Tailwind CSS
Node.js · Express · WebSocket (ws)
SQLite · Google Auth · Render`} />

      <Section title="Game Modes" text={`• 👤 Single Player (Demo)
  → Guess 1 meme without registration

  • 👥 Multiplayer (2+ players)
  → Real-time rooms with 3+ rounds
  → Leaderboard and scoring system
  → Join or create private rooms
  → Access full game history
  `} />

      <Section title="Authentication" text={`• Google OAuth login
• Traditional registration form (email + password)
• Session-based auth with secure JWT tokens`} />

      <Section title="Database & Deployment" text={`• SQLite 
• Deployed on Render (server + static frontend)
• WebSocket server with room management and presence tracking`} />

      <Section title="Security Highlights" text={`• Input validation on both client and server
• Password hashing with bcrypt
• Rate-limiting & session expiration
• Secure WebSocket message dispatching`} />

      <div className="mt-10 flex justify-between items-center">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← Back to Projects
        </Link>
        <Link
          href="https://github.com/Lorenzogallone/WhatDoYouMeme.git"
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