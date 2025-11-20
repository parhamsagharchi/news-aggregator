# 🧭 News Aggregator

A modern **News Aggregator** that aggregates articles from multiple news sources (NewsAPI, The Guardian, NYTimes) and displays them in a unified, responsive interface.

## ✨ Features

- ⚡️ **React 19 + TypeScript + Vite** - Fast development and build
- 🌐 **Multi-Source Integration** - NewsAPI, The Guardian, NYTimes APIs
- 🔍 **Advanced Filtering** - Search by keyword, date range, category, source, and author
- 📱 **Fully Responsive** - Mobile-first design
- ♾️ **Infinite Scroll** - Seamless pagination
- 🎛️ **User Preferences** - Saveable default settings
- 🚨 **Error Handling** - Graceful error handling with toast notifications

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **State Management**: React Query + Zustand
- **Styling**: TailwindCSS 3
- **HTTP Client**: Axios

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

The development server runs at: **http://localhost:3000**

---

## 🔧 Build for Production

```bash
pnpm run build
pnpm run preview
```

---

## 🔑 API Keys & Setup

Create a `.env` file in the root directory:

```env
VITE_APP_BRAND_NAME=Innoscripta

# External API Endpoints
VITE_NEWSAPI_API_ENDPOINT=https://newsapi.org/v2/everything
VITE_GUARDIAN_API_ENDPOINT=https://content.guardianapis.com/search
VITE_NYTIMES_API_ENDPOINT=https://api.nytimes.com/svc/search/v2/articlesearch.json

# External API Keys
VITE_NEWSAPI_API_KEY=your_newsapi_key_here
VITE_GUARDIAN_API_KEY=your_guardian_key_here
VITE_NYTIMES_API_KEY=your_nytimes_key_here
```

### NewsAPI

1. Visit https://newsapi.org
2. Create account → get API key
3. Add `VITE_NEWSAPI_API_KEY` to `.env`

### The Guardian API

1. Visit https://open-platform.theguardian.com
2. Sign up → dashboard → copy API key
3. Add `VITE_GUARDIAN_API_KEY` to `.env`

### New York Times API

1. Visit https://developer.nytimes.com
2. Create account → Create App
3. Enable _Article Search API_
4. Add `VITE_NYTIMES_API_KEY` to `.env`

**Note:** Restart the dev server after updating `.env`:

```bash
pnpm run dev
```

---

## 📁 Project Structure

```
src/
 ├─ components/    # UI components (filter-bar, news-card, ui, etc.)
 ├─ hooks/         # Custom React hooks
 ├─ http-core/     # API layer (services, config, error handling)
 ├─ pages/         # Page components (home, settings)
 ├─ store/         # Zustand stores
 ├─ utils/         # Utility functions
 └─ types/         # TypeScript types
```

---

## 🐳 Docker

### Development

```bash
docker-compose up dev
```

### Production

```bash
docker build --target production -t news-app:prod .
docker run -p 8080:80 news-app:prod
```

---

## 🧾 License

MIT © 2025 — Innoscripta
