# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --ignore-scripts --legacy-peer-deps

COPY . ./
RUN npm run postinstall
RUN npm run build

# Runtime stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3101

# Keep package metadata + node_modules so `vite preview` can run.
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3101

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD sh -c 'wget -q --spider "http://127.0.0.1:${PORT}/" || exit 1'

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3101"]
