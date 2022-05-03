FROM node:14 AS builder

ENV HOME=/home/app
# COPY . $HOME/web
# WORKDIR $HOME/web

COPY ./dist $HOME/web/dist

FROM nginx:alpine

ENV HOME=/home/app

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder $HOME/web/dist .

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

ENTRYPOINT ["nginx", "-g", "daemon off;"]