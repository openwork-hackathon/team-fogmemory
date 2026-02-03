export default function Home() {
  return (
    <main className="min-h-screen animated-gradient">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="mb-4 text-6xl animate-fade-in">🌫️</div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-fade-in animate-delay-100">
          FogMemory
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl animate-fade-in animate-delay-200">
          Persistent memory infrastructure for AI agents. Never forget important conversations, decisions, or learned preferences.
        </p>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mt-8">
          <FeatureCard 
            emoji="🔍" 
            title="Semantic Search" 
            desc="Find memories by meaning, not keywords"
            delay="animate-delay-100"
          />
          <FeatureCard 
            emoji="📝" 
            title="Auto-capture" 
            desc="Automatically store important decisions"
            delay="animate-delay-200"
          />
          <FeatureCard 
            emoji="🔄" 
            title="Cross-session" 
            desc="Pick up exactly where you left off"
            delay="animate-delay-300"
          />
          <FeatureCard 
            emoji="🔐" 
            title="On-chain Proofs" 
            desc="Verify what was remembered and when"
            delay="animate-delay-400"
          />
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 animate-fade-in animate-delay-300">
          <a 
            href="https://github.com/openwork-hackathon/team-fogmemory" 
            target="_blank"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:opacity-90 hover:scale-105 transition-all"
          >
            View on GitHub
          </a>
          <a 
            href="#docs" 
            className="px-6 py-3 border border-gray-700 rounded-lg font-semibold hover:bg-gray-800/50 hover:border-gray-600 transition-all"
          >
            Read Docs
          </a>
        </div>

        {/* Status */}
        <div className="mt-16 p-4 border border-gray-800 rounded-lg bg-gray-900/50 backdrop-blur-sm animate-fade-in animate-delay-400">
          <p className="text-sm text-gray-500">
            🚧 Building during Openwork Clawathon — February 2026
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Team: Kapnobatai (PM) · Klawvin (Frontend) · Nyx (Backend) · DoubleO7 (Contract)
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-bounce text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 border-t border-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-400 text-center mb-12">Three simple steps to give your agent perfect memory</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              title="Connect"
              desc="Integrate FogMemory with your agent using our simple SDK or REST API"
            />
            <StepCard 
              number="2"
              title="Remember"
              desc="Store conversations, decisions, and preferences automatically"
            />
            <StepCard 
              number="3"
              title="Recall"
              desc="Semantic search surfaces the right context at the right time"
            />
          </div>
        </div>
      </section>

      {/* API Preview */}
      <section id="docs" className="py-20 px-4 border-t border-gray-800/50">
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

      {/* Token Section */}
      <section className="py-20 px-4 border-t border-gray-800/50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-4">🪙</div>
          <h2 className="text-3xl font-bold mb-4">$FOGMEM Token</h2>
          <p className="text-gray-400 mb-8">
            Platform token for API access, premium features, and governance. 
            Backed by $OPENWORK on Base via Mint Club V2.
          </p>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 border border-gray-800 rounded-lg bg-gray-900/30">
              <div className="text-2xl font-bold text-blue-400">1B</div>
              <div className="text-xs text-gray-500">Max Supply</div>
            </div>
            <div className="p-4 border border-gray-800 rounded-lg bg-gray-900/30">
              <div className="text-2xl font-bold text-purple-400">3-Step</div>
              <div className="text-xs text-gray-500">Bonding Curve</div>
            </div>
            <div className="p-4 border border-gray-800 rounded-lg bg-gray-900/30">
              <div className="text-2xl font-bold text-green-400">1%</div>
              <div className="text-xs text-gray-500">Royalties</div>
            </div>
          </div>
          
          <p className="mt-6 text-sm text-gray-600">🔄 Deployment in progress...</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800/50 text-center text-gray-500 text-sm">
        <p>Built with 🌫️ by AI agents during the <a href="https://www.openwork.bot/hackathon" className="text-blue-400 hover:underline">Openwork Clawathon</a></p>
        <p className="mt-2 text-gray-600">Team FogMemory — Because agents should remember.</p>
      </footer>
    </main>
  )
}

function FeatureCard({ emoji, title, desc, delay }: { emoji: string; title: string; desc: string; delay?: string }) {
  return (
    <div className={`p-4 border border-gray-800 rounded-lg bg-gray-900/30 hover:bg-gray-800/50 hover:border-gray-700 transition-all glow-hover animate-fade-in ${delay || ''}`}>
      <div className="text-2xl mb-2">{emoji}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  )
}

function StepCard({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold">
        {number}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  )
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden glow-hover">
      <div className="bg-gray-800 px-4 py-2 text-sm text-gray-400 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500/50"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-500/50"></span>
        <span className="w-3 h-3 rounded-full bg-green-500/50"></span>
        <span className="ml-2">{title}</span>
      </div>
      <pre className="bg-gray-900/80 p-4 text-sm text-gray-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}
