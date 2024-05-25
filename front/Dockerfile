FROM nginx

ENV HOME_DIR /usr/share/nginx/html

WORKDIR $HOME_DIR

COPY ./dist/accountant/browser .

CMD nginx -g 'daemon off;'
