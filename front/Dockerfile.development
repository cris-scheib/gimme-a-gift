FROM ubuntu

ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir /opt/app/

COPY . /opt/app/

WORKDIR /opt/app

RUN apt update && apt install -y \
        nodejs \
        npm

RUN npm install

CMD [ "npm", "run", "serve" ]
