FROM node:carbon

RUN yarn global add nodemon

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .
