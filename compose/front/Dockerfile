FROM node:boron

ADD ./ dashboard-front/
WORKDIR dashboard-front

RUN mkdir -p node_modules/node-sass/vendor/linux-x64-48
RUN curl -L https://github.com/sass/node-sass/releases/download/v4.7.1/linux_musl-x64-48_binding.node

EXPOSE 4200
RUN npm install
RUN npm rebuild node-sass

COPY . .
