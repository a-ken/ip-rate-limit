FROM node:8.0

WORKDIR /usr/src/app

RUN npm i -g typescript

COPY . .
RUN npm i
RUN tsc

EXPOSE 5000
CMD ["npm", "start"]