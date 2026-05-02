FROM node:20-alpine

WORKDIR /web-app

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

RUN npm run build

EXPOSE 3034

CMD ["npm", "start"]
