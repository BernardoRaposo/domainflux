# DOMAIN/FLUX

A minimalist, high-performance, AI-powered domain intelligence tool built in a few hours.  
DOMAIN/FLUX generates brand-aligned domain names, evaluates investment potential using AI, and performs real DNS availability checks — all inside a single-page, production-ready interface.

---

## Features

### 🔹 AI Domain Generation  
Input a concept or brand name and DOMAIN/FLUX generates smart, modern, and brandable domain suggestions.

### 🔹 Real DNS Availability Check  
Each generated domain is validated through real DNS queries using public DoH resolvers (Cloudflare, Google, etc.).

### 🔹 Investment Scoring  
A lightweight AI evaluation analyzes naming strength, memorability, and potential resale value.

### 🔹 Clean, Modern UI  
Inspired by xAI / SpaceX design principles:  
dark aesthetics, mono-styled micro-typography, subtle neon cues, and high-tech visual hierarchy.

### 🔹 Copy-to-Clipboard  
Quickly copy any domain name.  
(Icon only appears on hover — clean and non-intrusive.)

### 🔹 Click to Register  
Available domains link directly to a registrar (Porkbun) so users can instantly purchase.

---

## Tech Stack

- **Next.js 14+ (App Router)**  
- **React**  
- **TailwindCSS**  
- **Shadcn/UI Components**  
- **Vercel Edge APIs**  
- **Cloudflare DNS-over-HTTPS**  
- **OpenAI API (Domain scoring logic)**  
- **Deployed on Vercel**

---

## Environment Variables

Create a `.env.local` file:
OPENAI_API_KEY=your_key_here

Then redeploy on Vercel with the same variable.

---

## Local Development

npm install
npm run dev

Visit:
http://localhost:3000
