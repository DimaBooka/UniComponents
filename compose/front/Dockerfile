FROM sinet/nginx-node:6.9.1

ADD ./ dashboard-front/
WORKDIR dashboard-front

RUN npm install
RUN npm rebuild node-sass
RUN npm run build --prod

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
