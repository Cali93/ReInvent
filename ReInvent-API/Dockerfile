FROM node:10

WORKDIR /var/www

COPY ./src /var/www/src
COPY ./dist /var/www/dist
COPY ./wait-for-it.sh /var/www/wait-for-it.sh
COPY ./package.json /var/www/package.json
COPY ./package-lock.json /var/www/package-lock.json

RUN npm install

CMD ["node", "index.js"]

