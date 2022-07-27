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
ENV DAILY_GOLD_AMOUNT=
ENV DAILY_DUST_AMOUNT=
ENV BONUS_GOLD_AMOUNT=
ENV BONUS_DUST_AMOUNT=
ENV RANDOM_CARD_COST=

CMD [ "node", "index.js" ]
