FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn

# Bundle app source
COPY . .

RUN cd client && yarn install --production && yarn build

EXPOSE 8000

RUN yarn sequelize-cli db:migrate --env production

CMD ["node", "server.js"]