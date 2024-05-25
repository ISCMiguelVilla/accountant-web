FROM node as builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
ENV HOME_DIR /usr/share/nginx/html
WORKDIR $HOME_DIR
COPY --from=builder /app/dist/accountant/browser .
CMD nginx -g 'daemon off;'
