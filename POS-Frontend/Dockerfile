# Build stage
FROM node:20 AS builder
WORKDIR /app

ARG VITE_BACKEND_DOMAIN
ENV VITE_BACKEND_DOMAIN=$VITE_BACKEND_DOMAIN

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Runtime stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
