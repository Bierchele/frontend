FROM node:16-alpine

WORKDIR /app

ARG NPM_TOKEN  

COPY .npmrc .npmrc
COPY package.*json ./
RUN npm i
COPY . .

EXPOSE 3000

CMD ["npm", "start"]    