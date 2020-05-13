# FROM node:13.12.0-alpine3.10
FROM node:13

WORKDIR /usr/src/app/
COPY . .

WORKDIR /usr/src/app/my-next-app
RUN npm install
RUN npm run build

EXPOSE 3000

# CMD [ "npm", "run", "dev" ]
CMD [ "npm", "start" ]
