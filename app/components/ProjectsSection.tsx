'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
	{
		id: 1,
		title: 'LLM-Powered Code Generation System',
		description:
			'Master’s thesis project: an AI system that generates and tests Python code using LLMs, with iterative prompt refinement.',
		image: '/llm.jpg', 
		link: '/projects/tiger', 
		github: 'https://github.com/Lorenzogallone/LLM-Code-Generator.git', 
	},
	{
		id: 2,
		title: 'Secure Web Application',
		description:
			'Cross-university project: a real-time multiplayer web app built with React, Node.js, and Express, focused on backend security.',
		image: '/wdym.png',
		link: 'projects/wdym',
		github: 'https://github.com/Lorenzogallone/WhatDoYouMeme.git',
	},
	{
		id: 3,
		title: 'Fanta F1 Game',
		description:
    		'Full-stack React app with Firebase backend for real-time F1 fantasy: automated result entry, live point calculation (main & sprint), jolly bonuses, championship mode, historical archive, and CI/CD deploys on push. Includes rich UI with team logos, responsive mobile layout, and role-based access controls.',
		image: '/fantaf1.png',
		link: '/projects/fantaf1',
		github: 'https://github.com/Lorenzogallone/fanta-f1.git',
	},
	{
		id: 4,
		title: 'Task Manager Android App',
		description:
			'A Kotlin-based task manager for multi-team collaboration with real-time chat and task handling, built in an academic sprint.',
		image: '/android.png',
		link: '/projects/mad',
		github: 'https://github.com/polito-MAD-2024/lab5-g27.git',
	},
	{
		id: 5,
		title: 'OS/161 Shell – Multi-Process Kernel',
		description:
			'Academic OS project for the OS/161 kernel: implemented multiprogramming, process control, file and memory management, and a user-level shell with syscall interface.',
		image: '/os.jpg',
		link: '/projects/os',
		github: 'https://github.com/andre-carbo/os161shell.git',
	},
];

export default function ProjectsSection() {
	return (
		<section className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-gray-800"
			>
				Featured Projects
			</motion.h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{projects.map((project, index) => (
					<motion.div
						key={project.id}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: index * 0.1 }}
						whileHover={{ scale: 1.02 }}
						className="group relative aspect-video bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] transition-all duration-300"
					>
						<Image
							src={project.image}
							alt={project.title}
							fill
							className="object-cover transition-transform duration-300 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 group-hover:to-black/95 transition-colors duration-300" />
						<div className="absolute inset-0 p-6 flex flex-col justify-end">
							<h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
							<p className="text-gray-200 mb-4 line-clamp-2">{project.description}</p>
							<div className="flex gap-4">
								<Link
									href={project.link}
									className="text-sm px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
								>
									View Project
								</Link>
								<Link
									href={project.github}
									className="text-sm px-4 py-2 bg-white hover:bg-gray-100 text-gray-900 rounded-full transition-all duration-300 backdrop-blur-sm"
								>
									GitHub
								</Link>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}