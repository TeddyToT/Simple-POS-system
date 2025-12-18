# --- Build Stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install


# Copy source
COPY . .

# Build project
RUN npm run build

# --- Production Stage ---
FROM node:20-alpine AS runner
WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy build files
COPY --from=builder /app/dist ./dist

# Serve production build
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
