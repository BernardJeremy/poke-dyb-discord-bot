FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Build app from TypeScript
RUN npm run build

CMD [ "npm", "start" ]
