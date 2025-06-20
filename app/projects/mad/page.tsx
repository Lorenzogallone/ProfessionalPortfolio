'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function AndroidTaskAppPage() {
	return (
		<section className="py-16 px-6 max-w-5xl mx-auto text-gray-800">
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-4xl font-bold mb-6"
			>
				Multi-Team Task Manager Android App
			</motion.h1>

			<p className="text-lg mb-8">
				An Android-native application developed in Kotlin to manage tasks within multiple teams, track progress, communicate in real-time, and monitor statistics. Designed for flexibility and productivity, the app supports both phones and tablets, including horizontal layout support.
			</p>

			<Section
				title="Key Features"
				text={`- 📋 Create and manage tasks per team with assignees, due dates, status tracking
				- 👥 Multi-team support with switchable context
				- 💬 Real-time group and private chat with notifications
				- 📊 Team statistics and task completion rankings
				- 🔐 Google Sign-In authentication
				- ☁️ Firebase integration (Realtime DB, Firestore, Auth)
				- 📱 Responsive layout for phones and tablets (portrait and landscape modes)`}
				/>

			<Section title="Architecture" text="The app uses Firebase as backend to manage authentication, database storage, and real-time messaging. UI is built in Kotlin using Jetpack Compose and Material Design, with strong separation of concerns between data, UI and logic. State management is handled with ViewModel and LiveData." />

			<Section title="User Experience" text="Users can switch between teams, view shared tasks, assign responsibilities, and discuss via chat without leaving the app. Each task has metadata (status, due date, assignee, history). Charts and completion bars help visualize progress across teams." />

			<Section title="Use Case" text="Built as part of an academic team sprint, this app targets collaborative team environments such as project groups, labs, or internal work squads. Its goal is to unify task tracking and communication into a mobile-first workspace." />

			<div className="mt-12 space-y-8">
				<h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Image src="/team_list.jpg" alt="Team List" width={450} height={533} className="rounded-lg border" />
					<Image src="/task_info.jpg" alt="Task Detail" width={450} height={533} className="rounded-lg border" />
					<Image src="/chats.jpg" alt="Chat View" width={450} height={533} className="rounded-lg border" />
					<Image src="/team_profile.jpg" alt="Team Profile Stats" width={450} height={533} className="rounded-lg border" />
				</div>
			</div>


			<div className="mt-10 flex justify-between items-center">

				<Link
					href="/"
					className="text-blue-600 hover:underline text-sm"
				>
					← Back to Projects
				</Link>
				<Link
					href="https://github.com/polito-MAD-2024/lab5-g27.git"
					className="text-blue-600 hover:underline text-sm"
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
			<h2 className="text-2xl font-semibold mb-2">{title}</h2>
			<p className="text-base leading-relaxed text-gray-700 whitespace-pre-line">{text}</p>
		</div>
	);
}