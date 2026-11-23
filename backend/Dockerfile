FROM node:24.20.0
WORKDIR /app
COPY package.json package-lock.json ./
RUN apt-get update \
    && apt-get install -y netcat-openbsd \
    && npm install --omit=dev \
    && rm -rf /var/lib/apt/lists/*  
COPY . .
RUN chmod +x ./wait-for.sh ./startup.sh
EXPOSE 5000
CMD ["sh", "./startup.sh"]