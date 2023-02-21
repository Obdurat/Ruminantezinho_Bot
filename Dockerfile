FROM node:16-alpine
COPY . /bot
WORKDIR /bot
RUN npm install
CMD ["npm", "start"]