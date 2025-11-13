"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function SmartDomainWizard() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

const handleGenerate = async () => {
  if (!input.trim()) return

  setLoading(true)
  setResults(null)

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input })
    })

    const data = await res.json()

    if (data.results) {
      setResults(data.results)
    }
  } catch (err) {
    console.error("Error generating domains:", err)
    setResults([])
  }

  setLoading(false)
}


  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      <div className="relative">
        <header className="border-b border-white/5 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-white/20 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#4da6ff] shadow-[0_0_12px_#4da6ff]" />
              </div>
              <h1 className="text-xl font-light tracking-wide">DOMAIN/FLUX</h1>
            </div>
            <div className="text-sm text-white/40 font-mono">v2.0</div>
          </div>
        </header>

        <section className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 border border-white/10 text-xs font-mono text-white/50 tracking-wider">
            AI-POWERED DOMAIN GENERATION
          </div>

          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-balance">
            Intelligent Domain
            <br />
            <span className="text-white/40">Discovery System</span>
          </h2>

          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-16 leading-relaxed">
            Advanced neural networks analyze your concept to generate optimal domain names. 
            Precision-engineered for technical teams and forward-thinking organizations.
          </p>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="relative group">
              <Input
                type="text"
                placeholder="Enter your concept or brand name..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-none font-light tracking-wide text-lg focus:border-[#4da6ff] focus:shadow-[0_0_20px_rgba(77,166,255,0.1)] transition-all duration-300"
              />
              <div className="absolute inset-0 border border-[#4da6ff]/0 group-hover:border-[#4da6ff]/30 pointer-events-none transition-colors duration-300" />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="w-full h-14 bg-white text-black hover:bg-white/90 rounded-none font-light tracking-wider text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border border-black/20 border-t-black animate-spin" />
                  <span>PROCESSING</span>
                </div>
              ) : (
                "GENERATE DOMAINS"
              )}
            </Button>
          </div>
        </section>

        {results && (
          <section className="max-w-4xl mx-auto px-6 pb-32 animate-in fade-in duration-700">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-xs font-mono text-white/40 tracking-wider">GENERATED RESULTS</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="grid gap-4">
              {results.map((item, index) => (
                <Card
                  key={index}
                  onClick={() => {
                    if (item.available) {
                      window.open(`https://porkbun.com/checkout/search?q=${item.name}`, "_blank")
                    }
                  }}
                  className={`
                    group 
                    bg-white/5 
                    rounded-none 
                    p-6 
                    transition-all 
                    duration-300
                    ${
                      item.available
                        ? "border border-green-400/40 hover:border-green-300/60 cursor-pointer hover:bg-white/[0.07]"
                        : "border border-red-400/40 cursor-default opacity-90"
                    }
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col gap-2">

                    {/* Domain Name + Copy Icon */}
                    <div className="flex items-center gap-2">
                      <div className="text-xl font-light tracking-wide text-white group-hover:text-[#4da6ff] transition-colors duration-300">
                        {item.name}
                      </div>

                      {/* Copy Icon */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation()
                          navigator.clipboard.writeText(item.name)
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-white/40 hover:text-[#4da6ff] transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 16h8M8 12h8m-5 8h3a2 2 0 002-2V7a2 2 0 00-2-2h-3m-4 3H7a2 2 0 00-2 2v9a2 2 0 002 2h3"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Availability */}
                    <div
                      className={`text-xs font-mono mt-1 ${
                        item.available ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {item.available ? "Available" : "Registered"}
                    </div>

                    {/* Score */}
                    <div className="text-xs text-white/40 font-mono">
                      Score: {item.score}
                    </div>

                    {/* DNS Metadata (only for registered domains) */}
                    {!item.available && item.metadata && (
                      <div className="mt-1 text-xs text-white/30 font-mono">
                        DNS: {item.metadata.primaryNS}
                      </div>
                    )}

                    {/* Subtle hint only for available domains */}
                    {item.available && (
                      <div className="text-[10px] text-white/20 font-mono mt-2">
                        Click to check availability →
                      </div>
                    )}
                  </div>
                </Card>



              ))}
            </div>
          </section>
        )}

        <section className="max-w-6xl mx-auto px-6 py-32 border-t border-white/5">
          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                title: "Neural Analysis",
                description:
                  "Advanced AI algorithms process semantic meaning and brand context",
              },
              {
                title: "Real-Time Validation",
                description:
                  "Instant availability checking across multiple domain registries",
              },
              {
                title: "Strategic Optimization",
                description:
                  "Results optimized for memorability, SEO, and brand alignment",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-black p-8 hover:bg-white/[0.02] transition-colors duration-300 group"
              >
                <div className="w-8 h-8 border border-white/20 mb-6 flex items-center justify-center group-hover:border-[#4da6ff]/50 transition-colors duration-300">
                  <div className="w-2 h-2 bg-white/50 group-hover:bg-[#4da6ff] group-hover:shadow-[0_0_10px_#4da6ff] transition-all duration-300" />
                </div>
                <h3 className="text-lg font-light tracking-wide mb-3">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-xs text-white/30 font-mono">
            <div>© 2025 Smart Domain Wizard</div>
            <div className="flex items-center gap-6">
              <span>POWERED BY AI</span>
              <span className="w-1 h-1 bg-[#4da6ff] shadow-[0_0_6px_#4da6ff]" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
