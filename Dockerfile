FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# for production
# RUN npm ci --only=production

COPY . .

EXPOSE 3000 80 443
CMD [ "npm", "run", "dev" ]