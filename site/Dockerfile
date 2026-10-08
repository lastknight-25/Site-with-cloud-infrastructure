FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better Docker layer caching)
COPY my-api/package*.json ./my-api/
RUN cd my-api && npm install --production

# Copy everything else (HTML files + API code)
COPY . .

WORKDIR /app/my-api

EXPOSE 3000

CMD ["node", "main.js"]