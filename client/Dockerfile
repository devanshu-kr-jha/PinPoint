FROM node:20.7.0-alpine as build 

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]
