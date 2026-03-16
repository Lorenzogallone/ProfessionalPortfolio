import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Lorenzo Gallone – Software Engineer',
	description:
		"I'm Lorenzo Gallone, a software engineer specializing in databases, LLM integration, and modern full-stack development. I build clean, efficient, and maintainable software systems with a focus on real-world applications and smart design.",
	keywords: [
		'Lorenzo Gallone',
		'Software Engineer',
		'LLM Integration',
		'Databases',
		'PostgreSQL',
		'Python',
		'React',
		'Next.js',
		'Node.js',
		'Full-Stack Development',
		'Prompt Engineering',
		'Code Automation',
		'Firebase',
		'Web Apps',
	],
	authors: [{ name: 'Lorenzo Gallone' }],
	creator: 'Lorenzo Gallone',
	openGraph: {
		title: 'Lorenzo Gallone – Software Engineer Portfolio',
		description:
			"Explore the portfolio of Lorenzo Gallone – software engineer focused on database systems, LLM-powered development, and full-stack applications. Discover clean and efficient project solutions.",
		url: 'https://your-domain.com',
		siteName: 'Lorenzo Gallone – Portfolio',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Lorenzo Gallone – Software Engineer Portfolio',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Lorenzo Gallone – Software Engineer',
		description:
			"Explore the portfolio of Lorenzo Gallone – software engineer focused on database systems, LLM-powered development, and full-stack applications. Discover clean and efficient project solutions.",
		creator: '@yourusername',
		images: ['/og-image.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}