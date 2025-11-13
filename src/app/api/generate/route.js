import { NextResponse } from "next/server"
import OpenAI from "openai"
import axios from "axios"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req) {
  try {
    const { input } = await req.json()
    if (!input || !input.trim()) {
      return NextResponse.json({ error: "Missing input" }, { status: 400 })
    }

    // -----------------------------------
    // 1. AI DOMAIN GENERATION
    // -----------------------------------
    const prompt = `
    Generate 5 brandable domain name ideas for the concept: "${input}".
    Follow these rules:
    - Prefer short, clean names.
    - Mix TLDs: .com, .ai, .io, .dev, .shop.
    - No explanation, only one domain per line.
    `

    const aiRes = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: prompt
    })

    const text = aiRes.output_text.trim()
    const domains = text
      .split("\n")
      .map((d) => d.replace(/^-/, "").trim())
      .slice(0, 5)


    // -----------------------------------
    // 2. DOMAIN SCORING FUNCTION
    // -----------------------------------
    function scoreDomain(domain) {
      let score = 0

      const base = domain.replace(/\..+$/, "")

      // Length scoring
      const length = base.length
      score += length < 8 ? 25 : length < 12 ? 15 : 5

      // TLD scoring
      if (domain.endsWith(".com")) score += 25
      else if (domain.endsWith(".ai")) score += 20
      else if (domain.endsWith(".io")) score += 15
      else score += 10

      // Hyphens/numbers
      score += !/[-0-9]/.test(domain) ? 20 : 5

      // Brandability (simple vowels check)
      score += /[aeiou]/.test(base) ? 15 : 5

      return Math.min(score, 100)
    }


    // -----------------------------------
    // 3. DOMAIN AVAILABILITY CHECK (FREE)
    // Using Google DoH + SOA lookup
    // -----------------------------------
    async function checkDomainSOA(domain) {
      try {
        const url = `https://dns.google/resolve?name=${domain}&type=SOA`
        const res = await axios.get(url)
        const data = res.data

        // Status 3 = NXDOMAIN = available
        if (data.Status === 3) {
          return {
            available: true,
            registered: false,
            metadata: null
          }
        }

        // Status 0 = SOA exists = registered
        if (data.Status === 0 && data.Answer?.length > 0) {
          const soaRaw = data.Answer[0].data
          const [primaryNS, admin, serial, refresh, retry, expire, minTTL] =
            soaRaw.split(" ")

          return {
            available: false,
            registered: true,
            metadata: {
              primaryNS,
              admin,
              serial,
              refresh: Number(refresh),
              retry: Number(retry),
              expire: Number(expire),
              minTTL: Number(minTTL),
              ttl: data.Answer[0].TTL
            }
          }
        }

        return { available: false, registered: false, metadata: null }

      } catch (err) {
        console.log("DoH error:", err)
        return { available: false, registered: false, metadata: null }
      }
    }


    // -----------------------------------
    // 4. PROCESS ALL DOMAINS
    // -----------------------------------
    const results = await Promise.all(
      domains.map(async (name) => {
        const availability = await checkDomainSOA(name)
        const score = scoreDomain(name)

        return {
          name,
          score,
          ...availability
        }
      })
    )


    // -----------------------------------
    // 5. RETURN RESPONSE
    // -----------------------------------
    return NextResponse.json({ results })

  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
