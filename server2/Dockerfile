FROM node:8

WORKDIR /usr/src/app

COPY server2.js ./
COPY package*.json ./
RUN npm install

EXPOSE 8081

CMD [ "node", "server2.js" ]
