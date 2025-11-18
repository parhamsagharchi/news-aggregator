# 🧭 Innoscripta News Aggregator Challenge

A modern, scalable **News Aggregator** built with:

- **React + TypeScript + Vite**
- **Zustand** for global state management  
- **React Query** for async data fetching + caching  
- **React Virtualized** for high-performance list rendering  
- **TailwindCSS** for styling  

This project aggregates articles from **multiple news APIs** and provides search, filtering, and personalization.

---

## ✨ Features

- ⚡️ **Vite + React + TypeScript**
- 🌐 Integrates **NewsAPI**, **The Guardian**, **NYTimes**
- 🔎 Article **search & filtering**
- ⭐ Personalized **user preferences** (sources, authors, categories)
- 🔁 **Zustand** for filters & preferences
- 🔍 **React Query** for API communication + caching
- 🚀 **React Virtualized** for smooth infinite scrolling
- 📱 Fully responsive layout
- 🧱 Clean architecture with separate services, hooks & stores
- 🐳 Docker support (production-ready)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + TypeScript |
| Tooling | Vite |
| State | Zustand |
| Server State | React Query |
| Virtual List | react-virtualized |
| UI | TailwindCSS |
| Deployment | Docker |

---

## 🚀 Development Setup

### 1. Clone the repository

```bash
git clone git@github.com:parhamsagharchi/news-aggregator.git
cd news-aggregator
```

### 2. Install dependencies

```bash
nvm use v22.13.1
pnpm install
```

---

## ▶️ Local Development

```bash
pnpm run dev
```

Runs at: http://localhost:3000

---

## 🔧 Build for Production

```bash
pnpm run build
pnpm run preview
```

---

## 🔑 API Keys & Setup

Create a `.env` in the root:

```env
VITE_APP_BRAND_NAME=Innoscripta
VITE_NEWSAPI_API_KEY=
VITE_GUARDIAN_API_KEY=
VITE_NYTIMES_API_KEY=
```

### NewsAPI  
1. https://newsapi.org  
2. Create account → get API key  
3. Add to `.env`

### The Guardian API  
1. https://open-platform.theguardian.com  
2. Sign up → dashboard → copy key  
3. Add to `.env`

### New York Times API  
1. https://developer.nytimes.com  
2. Create account → Create App  
3. Enable *Article Search API*  
4. Add key to `.env`

Restart dev server afterward:

```bash
pnpm run dev
```

---

## 📁 Project Structure

```
src/
 ├─ assets/
 ├─ components/
 ├─ pages/
 ├─ stores/          # zustand stores
 ├─ services/        # API integrations
 ├─ providers/       # ReactQuery, etc.
 ├─ hooks/
 ├─ router/
 └─ main.tsx
```

---

## 🧪 Common Scripts

| Command | Description |
|--------|-------------|
| pnpm run dev | Start dev server |
| pnpm run build | Build for production |
| pnpm run preview | Preview build |
| pnpm run lint | Run ESLint |
| pnpm run format | Run Prettier |

---

## 🧾 License

MIT © 2025 — Innoscripta
