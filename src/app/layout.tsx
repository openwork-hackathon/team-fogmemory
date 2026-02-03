import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FogMemory - Persistent Memory for AI Agents',
  description: 'Never forget. Vector-based semantic recall, automatic context management, and cross-session continuity for AI agents.',
  keywords: ['AI', 'agents', 'memory', 'vector database', 'semantic search', 'LLM', 'context'],
  authors: [{ name: 'Team FogMemory' }],
  openGraph: {
    title: 'FogMemory',
    description: 'Persistent memory infrastructure for AI agents',
    type: 'website',
    url: 'https://team-fogmemory.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FogMemory',
    description: 'Persistent memory infrastructure for AI agents',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">{children}</body>
    </html>
  )
}
