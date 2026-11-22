FROM node:24.20.0
WORKDIR /app
COPY package.json package-lock.json wait-for.sh startup.sh ./
RUN apt-get update \
    && apt-get install -y netcat-openbsd \
    && chmod +x ./wait-for.sh ./startup.sh \
    && npm install --omit=dev \
    && rm -rf /var/lib/apt/lists/*
COPY . .
EXPOSE 5000
CMD ["./startup.sh"]