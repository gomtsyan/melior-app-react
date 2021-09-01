FROM node:10

RUN npm install -g serve

WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./
RUN npm install

# Build the app
COPY src ./src
COPY public ./public
COPY .env ./.env
RUN PUBLIC_URL="/analytics" npm run build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
