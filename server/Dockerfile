FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm ci

COPY prisma ./prisma
ENV DATABASE_URL="postgresql://test:test@localhost:5432/test"
RUN npx prisma generate

COPY . .

EXPOSE 5000

CMD ["node", "src/index.js"]
