# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm ci

# Prisma
COPY prisma ./prisma/
RUN npx prisma generate

# Source code
COPY . .

# Build
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Dependencies (production only)
COPY package*.json ./
RUN npm ci --only=production

# Prisma
COPY prisma ./prisma/
RUN npx prisma generate

# Build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

EXPOSE 3000

CMD ["npm", "start"]
