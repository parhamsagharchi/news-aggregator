# 🧭 News Aggregator

A modern, scalable **News Aggregator** application that aggregates articles from multiple news sources and displays them in a unified, responsive interface.

Built with cutting-edge technologies and following best practices:

- **React 19 + TypeScript + Vite**
- **React Query** for async data fetching + caching
- **Zustand** for global state management
- **TailwindCSS** for styling
- **React Router** with lazy loading
- **Axios** for HTTP requests
- **Headless UI** for accessible components

This project aggregates articles from **multiple news APIs** (NewsAPI, The Guardian, NYTimes) and displays them in a unified, responsive interface.

---

## ✨ Features

- ⚡️ **Vite + React 19 + TypeScript** - Lightning-fast development and build
- 🌐 **Multi-Source Integration** - NewsAPI, The Guardian, NYTimes APIs
- 🔄 **Lazy Loading** - React Suspense for optimal performance
- 🎨 **Unified Article Display** - Normalized data from all sources with beautiful cards
- 🔍 **Advanced Filtering** - Search by keyword, date range, category, source, and author
- 📱 **Fully Responsive** - Mobile-first design optimized for all devices
- ♾️ **Infinite Scroll** - Seamless pagination with Intersection Observer
- 🎯 **Clean Architecture** - Following DRY, KISS, and SOLID principles
- 🎨 **Custom Theme** - Beautiful gradient-based design system with theme colors
- 🚨 **Error Handling** - Graceful error handling with toast notifications
- ⚡️ **Code Splitting** - Optimal bundle size with lazy loading
- 🔐 **State Persistence** - URL query parameters sync with application state
- 🎛️ **User Preferences** - Saveable default settings for sources, categories, and authors
- 🎨 **Custom Favicon** - Beautiful SVG favicon matching the brand
- 🖼️ **Image Fallback** - Graceful image error handling with source name display

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
 │  ├─ filter-bar/       # Filter and search bar component
 │  ├─ Litepicker/       # Custom date picker component
 │  ├─ news-card/        # News article card component
 │  ├─ scroll-to-top/    # Scroll to top on route change
 │  ├─ scroll-to-top-button/  # Floating scroll to top button
 │  ├─ spinner/          # Loading spinner component
 │  └─ ui/               # Base UI components (Button, Input, Select, etc.)
 ├─ hooks/                # Custom React hooks
 │  ├─ use-filter-fallback.ts    # Filter values with priority fallback
 │  ├─ use-news-articles.ts      # Hook for fetching all news sources
 │  ├─ use-scroll.ts             # Hook for scroll position tracking
 │  └─ use-sync-query-params.ts  # Sync URL params with Zustand stores
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
 │  └─ settings/        # Settings/Configuration page
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
 │  ├─ article-normalizer.ts  # Article normalization utilities
 │  ├─ article-filter.utils.ts # Article filtering logic
 │  ├─ date-range.utils.ts     # Date range parsing/formatting
 │  ├─ filter.utils.ts         # Filter utilities
 │  ├─ query-params.utils.ts   # URL query parameter utilities
 │  └─ configuration.utils.ts   # Configuration utilities
 ├─ index.css            # Main CSS entry point
 └─ main.tsx             # Application entry point
```

## 🏗️ Architecture & Design Principles

The project follows **DRY, KISS, and SOLID** principles to ensure maintainability, scalability, and code quality.

### 📐 Design Principles

#### **DRY (Don't Repeat Yourself)**

- **Utility Functions**: Centralized date parsing, filtering, and formatting logic
  - `date-range.utils.ts`: Date range parsing and formatting
  - `article-normalizer.ts`: Unified article normalization from different APIs
  - `filter.utils.ts`: Reusable filter logic
  - `query-params.utils.ts`: URL query parameter utilities
- **Custom Hooks**: Reusable logic extracted into hooks
  - `useFilterFallback`: Centralizes filter value priority logic
  - `useNewsArticles`: Aggregates data from multiple sources
  - `useSyncQueryParams`: Synchronizes URL with state
- **Constants**: Shared constants for categories, sources, and options
- **Component Reusability**: UI components (Button, Select, Input) used across the app

#### **KISS (Keep It Simple, Stupid)**

- **Simple State Management**: Zustand for straightforward global state
- **Straightforward Infinite Scroll**: Intersection Observer with simple refs
- **Clear Component Structure**: Each component has a single, clear purpose
- **Minimal Dependencies**: Only essential libraries used
- **Readable Code**: Clear naming conventions and logical flow

#### **SOLID Principles**

1. **Single Responsibility Principle (SRP)**

   - Each component has one clear responsibility
   - `NewsCard`: Displays a single article
   - `FilterBar`: Handles filtering UI
   - `Layout`: Manages page structure
   - Utility functions: Each handles one specific task

2. **Open-Closed Principle (OCP)**

   - Components are open for extension via props
   - New news sources can be added without modifying existing code
   - Filter logic extensible through utility functions

3. **Liskov Substitution Principle (LSP)**

   - Consistent interfaces across components
   - `IArticle` interface ensures all sources provide same structure

4. **Interface Segregation Principle (ISP)**

   - Focused interfaces (`INewsCard`, `IArticle`, etc.)
   - Components only depend on what they need

5. **Dependency Inversion Principle (DIP)**
   - Components depend on abstractions (hooks, utilities)
   - Not on concrete implementations
   - Custom hooks abstract away data fetching complexity

### 🎯 Key Patterns

#### **Unified Data Model**

- **Single `IArticle` Interface**: All news sources normalized to one structure
- **Article Normalization**: Utility functions transform API-specific data to unified format
- **Type Safety**: Full TypeScript coverage for type safety

#### **Service Layer Architecture**

Each API service follows a consistent, modular structure:

```
services/
  ├─ guardian/
  │  ├─ guardian.apis.ts    # API call functions
  │  ├─ guardian.queries.ts # React Query hooks (useInfiniteQuery)
  │  ├─ guardian.types.ts   # TypeScript interfaces
  │  └─ guardian.keys.ts    # Query key factories
  ├─ newsapi/
  └─ nyt/
```

**Benefits:**

- Easy to add new news sources
- Consistent error handling
- Centralized query management
- Type-safe API interactions

#### **State Management Strategy**

**Priority Order for Filter Values:**

1. **URL Query Parameters** (highest priority)
2. **Filter Store** (Zustand - user's current filters)
3. **Configuration Store** (Zustand - user's saved preferences)
4. **Defaults** (fallback values)

This ensures:

- State persistence across page refreshes
- Shareable URLs with filter state
- User preference persistence
- Predictable behavior

#### **Infinite Scroll Implementation**

- **Intersection Observer API**: Detects when user scrolls near bottom
- **React Query Infinite Queries**: Handles pagination automatically
- **Debouncing**: Prevents duplicate API calls
- **Scroll Management**: Prevents infinite loops by adjusting scroll position

#### **Responsive Design Strategy**

- **Mobile-First Approach**: Base styles for mobile, enhanced for larger screens
- **Breakpoints**:
  - Mobile: `< 640px` (default)
  - Tablet: `sm: 640px+`
  - Desktop: `md: 768px+`, `lg: 1024px+`, `xl: 1280px+`
- **Grid System**: Responsive grid with `col-span-12` on mobile, adaptive on larger screens
- **Flexible Components**: All components adapt to screen size
- **Touch-Friendly**: Adequate spacing and touch targets on mobile

#### **Error Handling**

- **Centralized Error Strategies**: `http-error-strategies.ts`
- **User-Friendly Messages**: Toast notifications via react-hot-toast
- **Graceful Degradation**: App continues working even if one API fails
- **Error Boundaries**: React error boundaries for component-level errors

#### **Performance Optimizations**

- **Code Splitting**: Lazy loading for pages with React Suspense
- **React Query Caching**: Automatic caching and background refetching
- **Debounced Search**: Prevents excessive API calls during typing
- **Image Error Handling**: Graceful fallback to source name when images fail to load
- **Optimized Rendering**: Efficient component rendering with proper memoization
- **Bundle Optimization**: Minimal dependencies, only essential packages

### 📱 Responsive Design Details

#### **Layout Breakpoints**

- **Mobile (< 640px)**: Single column, full-width components
- **Tablet (640px - 1024px)**: 2-column grid for articles, stacked filters
- **Desktop (1024px+)**: 3-4 column grid, side-by-side filters

#### **Component Responsiveness**

- **Header**: Responsive navigation with icon-only buttons on mobile, full labels on desktop
- **Filter Bar**: Stacked on mobile, responsive grid (1→2→4 columns) on larger screens
- **Article Cards**: 1 column (mobile) → 2 columns (tablet) → 3-4 columns (desktop)
- **Settings Page**: Full-width on mobile, centered container on desktop with proper padding
- **Typography**: Responsive font sizes optimized for each breakpoint

#### **Touch Optimization**

- Minimum touch target size: 44x44px
- Adequate spacing between interactive elements
- Swipe-friendly layouts on mobile

### 🎨 UI/UX Features

- **Custom Dropdown Components**: Beautiful Headless UI-based select components (MUI/Ant Design style)
- **Date Picker**: Custom Litepicker integration with proper styling
- **Loading States**: Skeleton loaders and spinners for better UX
- **Empty States**: Attractive empty state messages with icons
- **Error States**: User-friendly error messages with toast notifications
- **Author Display**: Author information displayed in article cards
- **Source Gradients**: Beautiful gradient colors for each news source
- **Responsive Typography**: Optimized font sizes for readability across devices

### 📦 Dependencies Management

- **Production Dependencies**: Only runtime-required packages
- **Dev Dependencies**: Properly separated development tools
- **Clean Package.json**: Alphabetically sorted, no unused dependencies
- **Version Consistency**: Consistent versioning strategy

---

## 🧪 Common Scripts

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `pnpm run dev`     | Start development server         |
| `pnpm run build`   | Build for production             |
| `pnpm run preview` | Preview production build locally |
| `pnpm run lint`    | Run ESLint to check code quality |

---

## 🧾 License

MIT © 2025 — Innoscripta
