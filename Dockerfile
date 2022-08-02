FROM node:16

WORKDIR /app

ENV APP_ROOT=/app

COPY . .
RUN npm i

CMD [ "npm", "run", "start" ]
