# -------- Base --------
FROM node:20-slim AS base

# -------- Dependencies --------
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# -------- Builder --------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# -------- Runner --------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN groupadd -r nodejs && useradd -r -g nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 🔥 FIX PERMISSIONS
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]