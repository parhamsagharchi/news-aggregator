# Development Stage
FROM node:23-alpine AS dev

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Expose port 3000 (as per vite.config.ts)
EXPOSE 3000

# Set environment variables for API endpoints (can be overridden)
ENV VITE_NEWSAPI_API_ENDPOINT=https://newsapi.org/v2/everything
ENV VITE_GUARDIAN_API_ENDPOINT=https://content.guardianapis.com/search
ENV VITE_NYTIMES_API_ENDPOINT=https://api.nytimes.com/svc/search/v2/articlesearch.json

CMD ["pnpm", "dev", "--host"]

# Production Build Stage
FROM node:23-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production Stage - Serve with Nginx
FROM nginx:alpine AS production

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

