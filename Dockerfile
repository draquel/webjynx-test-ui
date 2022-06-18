FROM node:16-alpine as angular-build
WORKDIR /dist/src/app
COPY package.json package-lock.json ./
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular-build /dist/src/app/dist /usr/share/nginx/html
COPY ./angular-nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
