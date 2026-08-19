# syntax=docker/dockerfile:1.7

# ---- deps? install node_modules ----
FROM node:20-alpine AS deps
WORKDIR /web-app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

# ---- builder: compile Next.js ----
FROM node:20-alpine AS builder
WORKDIR /web-app
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /web-app/node_modules ./node_modules
COPY . . 
RUN npm run build
RUN npm prune --omit=dev

# ---- runner: minimal prod image ----
FROM node:20-alpine AS runner
WORKDIR /web-app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user for runtime
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder --chown=nextjs:nodejs /web-app/public ./public
COPY --from=builder --chown=nextjs:nodejs /web-app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /web-app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /web-app/package.json ./package.json

USER nextjs

EXPOSE 3034

CMD ["npm", "start"]
