FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . /usr/src/app

ENV BOT_TOKEN=

CMD [ "node", "index.js" ]
