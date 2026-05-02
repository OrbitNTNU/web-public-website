FROM node:20-alpine AS builder
WORKDIR /web-app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /web-app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /web-app/dist ./dist

EXPOSE 3034
CMD ["npm", "start"]
