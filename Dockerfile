FROM node:13.12.0-alpine3.10

WORKDIR /usr/src/app/

RUN apk update

COPY . .

WORKDIR /usr/src/app/nextjs-blog

RUN npm install
RUN npm update

RUN npm run build

# CMD [ "npm", "start" ]
CMD ["/bin/ash"]
