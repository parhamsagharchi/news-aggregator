# 🧭 Innoscripta News Aggregator Challenge

A modern, scalable **News Aggregator** built with:

- **React 19 + TypeScript + Vite**
- **React Query** for async data fetching + caching
- **Zustand** for global state management
- **TailwindCSS** for styling
- **React Router** with lazy loading
- **Axios** for HTTP requests

This project aggregates articles from **multiple news APIs** (NewsAPI, The Guardian, NYTimes) and displays them in a unified, responsive interface.

---

## ✨ Features

- ⚡️ **Vite + React 19 + TypeScript**
- 🌐 Integrates **NewsAPI**, **The Guardian**, **NYTimes** APIs
- 🔄 **Lazy loading** with React Suspense
- 🎨 **Unified article display** with normalized data from all sources
- 🔍 **React Query** for API communication + caching
- 🔁 **Zustand** for state management
- 📱 **Fully responsive** grid layout
- 🎯 **Clean architecture** following DRY, KISS, and SOLID principles
- 🎨 **Custom theme** with CSS variables
- 🚨 **Error handling** with react-hot-toast notifications
- ⚡️ **Code splitting** for optimal performance

---

## 🛠 Tech Stack

| Layer         | Technology                       |
| ------------- | -------------------------------- |
| Framework     | React 19 + TypeScript            |
| Build Tool    | Vite 7                           |
| Routing       | React Router 6 with lazy loading |
| Server State  | React Query (TanStack Query)     |
| Client State  | Zustand                          |
| HTTP Client   | Axios                            |
| Styling       | TailwindCSS 3 + PostCSS          |
| Icons         | Lucide React                     |
| Notifications | React Hot Toast                  |
| UI Components | Headless UI                      |

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
 ├─ assets/              # Static assets (CSS, fonts, images)
 │  ├─ css/              # Global styles, theme, components
 │  ├─ fonts/            # Custom fonts
 │  └─ images/           # Image assets
 ├─ components/           # Reusable UI components
 │  ├─ error-message/    # Error display component
 │  ├─ nav-button/       # Navigation button component
 │  ├─ news-card/        # News article card component
 │  ├─ scroll-to-top/    # Scroll to top functionality
 │  └─ spinner/          # Loading spinner component
 ├─ hooks/                # Custom React hooks
 │  ├─ use-news-articles.ts  # Hook for fetching all news sources
 │  └─ use-scroll.ts         # Hook for scroll tracking
 ├─ http-core/            # HTTP client and API layer
 │  ├─ api/              # Base API functions, error handling
 │  ├─ config/           # API configuration (base URLs, keys)
 │  └─ services/         # API service modules
 │     ├─ guardian/       # Guardian API service
 │     ├─ newsapi/       # NewsAPI service
 │     └─ nyt/           # NYTimes API service
 ├─ layout/              # Main layout component
 ├─ pages/               # Page components
 │  ├─ home/            # Home page with news articles
 │  └─ configuration/   # Configuration page
 ├─ providers/           # React context providers
 │  └─ react-query/     # React Query provider
 ├─ router/              # Route configuration
 ├─ store/               # Zustand stores
 │  ├─ store.enum.ts     # News source enums
 │  ├─ store.hooks.ts    # Zustand store hooks
 │  └─ store.types.ts    # Store type definitions
 ├─ types/               # Shared TypeScript types
 │  └─ article.types.ts  # Unified article type
 ├─ utils/               # Utility functions
 │  └─ article-normalizer.ts  # Article normalization utilities
 ├─ index.css            # Main CSS entry point
 └─ main.tsx             # Application entry point
```

## 🏗️ Architecture

The project follows **DRY, KISS, and SOLID** principles:

### Key Patterns:

- **Unified Article Type**: Single `IArticle` interface for all news sources
- **Article Normalization**: Utility functions to normalize data from different APIs
- **Custom Hooks**: `useNewsArticles` centralizes fetching logic for all sources
- **Service Layer**: Separate services for each API with consistent structure
  - Each service has: `*.apis.ts`, `*.queries.ts`, `*.types.ts`, `*.keys.ts`
- **Error Handling**: Centralized error strategies with toast notifications
- **Code Splitting**: Lazy loading for pages with Suspense boundaries
- **Reusable Components**: Modular, single-responsibility components

### Service Structure:

Each API service follows a consistent pattern:

- **`*.apis.ts`**: API call functions
- **`*.queries.ts`**: React Query hooks
- **`*.types.ts`**: TypeScript interfaces
- **`*.keys.ts`**: Query key factories

---

## 🧪 Common Scripts

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `pnpm run dev`     | Start development server         |
| `pnpm run build`   | Build for production             |
| `pnpm run preview` | Preview production build locally |
| `pnpm run lint`    | Run ESLint to check code quality |

---

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel will auto-detect Vite configuration

2. **Add Environment Variables**
   In Vercel dashboard, add these environment variables:
   ```
   VITE_APP_BRAND_NAME=Innoscripta
   VITE_NEWSAPI_API_KEY=your_newsapi_key
   VITE_GUARDIAN_API_KEY=your_guardian_key
   VITE_NYTIMES_API_KEY=your_nytimes_key
   ```

3. **Deploy**
   - Vercel will automatically build and deploy
   - The `vercel.json` file handles API proxying to avoid CORS issues

**Note:** The proxy configuration in `vercel.json` routes API requests through Vercel's edge network, which helps with CORS and keeps API keys server-side.

---

## 🧾 License

MIT © 2025 — Innoscripta
