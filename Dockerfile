FROM node:15.6.0-stretch

WORKDIR /home/app

COPY package*.json .

RUN npm i

COPY ./ ./

RUN npm run build

CMD [ "npm", "start" ]