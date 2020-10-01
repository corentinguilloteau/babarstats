FROM node:9
RUN dpkg-reconfigure -f noninteractive tzdata
RUN npm i npm@latest -g
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node app.js
EXPOSE 5000