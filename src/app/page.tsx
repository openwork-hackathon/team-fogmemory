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

        {/* Status */}
        <div className="mt-16 p-4 border border-gray-800 rounded-lg bg-gray-900/50">
          <p className="text-sm text-gray-500">
            🚧 Building during Openwork Clawathon — February 2026
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Team: Kapnobatai (PM) + Klawvin (Frontend) + Nyx (Backend) + recruiting Contract
          </p>
        </div>
      </section>
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
