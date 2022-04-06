FROM node:lts-slim

ENV HOME=/home/app
COPY . $HOME/api
WORKDIR $HOME/api

RUN npm update && npm install
RUN npm i -g nodemon

# EXPOSE 3333 3334
CMD ["npm", "start"]
