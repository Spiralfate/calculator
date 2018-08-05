FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./
COPY webpack.config.js ./
COPY server.js ./
COPY package-lock.json ./
COPY src ./src
RUN npm install

RUN npm run build:prod

EXPOSE 8080

CMD [ "node", "server.js" ]
