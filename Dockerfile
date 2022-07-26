FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . /usr/src/app

ENV BOT_TOKEN=
ENV DUST_EMOJI_ID=
ENV COIN_EMOJI_ID=
ENV JSON_DB_FILE=

CMD [ "node", "index.js" ]
