<<<<<<< HEAD
FROM node:13
RUN npm i npm@latest -g
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node app.js
EXPOSE 5000
=======
FROM nginx:alpine
>>>>>>> 8596b63afe8c04b1175190c9fe46f5b9725daa54
