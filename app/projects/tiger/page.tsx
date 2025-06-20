'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TigerProjectPage() {
	return (
		<section className="py-16 px-6 max-w-5xl mx-auto text-gray-800">
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-4xl font-bold mb-6"
			>
				TIGER: Testing and Improving Generated Code with LLMs
			</motion.h1>

			<p className="text-lg mb-8">
				Master&apos;s thesis project developed at the University of Illinois at Chicago. TIGER is a system that generates and improves Python code using LLMs by leveraging test-driven development and iterative feedback cycles.
			</p>

			<Section title="Overview" text="TIGER uses documentation, docstrings, and tests from a codebase to generate function implementations using LLMs, without ever showing the model the actual code. The system mimics a real-world development loop, generating code, testing it, analyzing failures, and prompting the model again until the tests pass or a max retry limit is reached." />

			<Section title="Workflow" text="The process includes preprocessing the repo, extracting function signatures and tests, generating code using structured prompts, executing the test suite, and providing LLM-generated feedback if any tests fail. This loop continues iteratively." />

			<Section title="Objectives & Results" text="TIGER aims to test whether LLMs can write correct, maintainable code using only test specifications. Experiments across 10 open-source Python repositories showed the iterative method outperforms single-pass generation, achieving up to 30% better success rates." />

			<Section title="Technologies" text="Python, PyTest, LLMs (Gemini, QwenCoder), AST parsing, call graph analysis, GitHub Actions, OpenRouter API." />

			<Section title="Why it matters" text="TIGER simulates a realistic developer workflow, making LLMs more effective in practical software engineering tasks by integrating test-based feedback. It showcases automation, code quality evaluation, and prompt engineering in one system. Notably, it uses public LLM APIs as a third-party user — no custom training or powerful hardware is needed, making the system cost-efficient and accessible. The strength lies in the methodology, not the model itself." />

			<div className="overflow-x-auto mt-10">
				<h2 className="text-2xl font-semibold mb-4">Key Results</h2>
				<table className="min-w-full table-auto border border-gray-300 text-sm">
					<thead className="bg-gray-100">
						<tr>
							<th className="border px-4 py-2 text-left">Metric</th>
							<th className="border px-4 py-2 text-left">Value</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border px-4 py-2">Repositories Tested</td>
							<td className="border px-4 py-2">10 Python projects</td>
						</tr>
						<tr>
							<td className="border px-4 py-2">Functions Processed</td>
							<td className="border px-4 py-2">~230 (e.g., in boltons)</td>
						</tr>
						<tr>
							<td className="border px-4 py-2">Average Iterations to Success</td>
							<td className="border px-4 py-2">1.9</td>
						</tr>
						<tr>
							<td className="border px-4 py-2">Success Rate (Iterative vs One-Shot)</td>
							<td className="border px-4 py-2">+30% improvement</td>
						</tr>
						<tr>
							<td className="border px-4 py-2">Model Type</td>
							<td className="border px-4 py-2">OpenRouter LLM APIs (no fine-tuning)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="mt-10 flex justify-between items-center">
				<Link
					href="/"
					className="text-blue-600 hover:underline text-sm"
				>
					← Back to Projects
				</Link>
				<Link
					href="https://github.com/Lorenzogallone/LLM-Code-Generator.git"
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
			<h2 className="text-2xl font-semibold mb-2">{title}</h2>
			<p className="text-base leading-relaxed text-gray-700">{text}</p>
		</div>
	);
}