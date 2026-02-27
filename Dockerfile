FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx playwright install-deps
RUN npx playwright install

