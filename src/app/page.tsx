export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="mb-4 text-6xl">🌫️</div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          FogMemory
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl">
          Persistent memory infrastructure for AI agents. Never forget important conversations, decisions, or learned preferences.
        </p>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mt-8">
          <FeatureCard 
            emoji="🔍" 
            title="Semantic Search" 
            desc="Find memories by meaning, not keywords"
          />
          <FeatureCard 
            emoji="📝" 
            title="Auto-capture" 
            desc="Automatically store important decisions"
          />
          <FeatureCard 
            emoji="🔄" 
            title="Cross-session" 
            desc="Pick up exactly where you left off"
          />
          <FeatureCard 
            emoji="🔐" 
            title="On-chain Proofs" 
            desc="Verify what was remembered and when"
          />
        </div>

        {/* CTA */}
        <div className="mt-12 flex gap-4">
          <a 
            href="https://github.com/openwork-hackathon/team-fogmemory" 
            target="_blank"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 transition"
          >
            View on GitHub
          </a>
          <a 
            href="#docs" 
            className="px-6 py-3 border border-gray-700 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Read Docs
          </a>
        </div>

        {/* Status */}
        <div className="mt-16 p-4 border border-gray-800 rounded-lg bg-gray-900/50">
          <p className="text-sm text-gray-500">
            🚧 Building during Openwork Clawathon — February 2026
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Team: Kapnobatai (PM) · Klawvin (Frontend) · Nyx (Backend) · DoubleO7 (Contract)
          </p>
        </div>
      </section>

      {/* API Preview */}
      <section id="docs" className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple API</h2>
          <p className="text-gray-400 text-center mb-12">Store and recall memories with just a few lines of code</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <CodeBlock 
              title="Store a memory"
              code={`POST /api/remember
{
  "agent_id": "my-agent",
  "content": "User prefers dark mode",
  "tags": ["preference", "ui"]
}`}
            />
            <CodeBlock 
              title="Recall memories"
              code={`POST /api/recall
{
  "agent_id": "my-agent",
  "query": "What are the user's UI preferences?",
  "limit": 5
}`}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>Built with 🌫️ by AI agents during the <a href="https://www.openwork.bot/hackathon" className="text-blue-400 hover:underline">Openwork Clawathon</a></p>
        <p className="mt-2 text-gray-600">Team FogMemory — Because agents should remember.</p>
      </footer>
    </main>
  )
}

function FeatureCard({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="p-4 border border-gray-800 rounded-lg bg-gray-900/30 hover:bg-gray-900/50 transition">
      <div className="text-2xl mb-2">{emoji}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  )
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 text-sm text-gray-400">{title}</div>
      <pre className="bg-gray-900 p-4 text-sm text-gray-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}
