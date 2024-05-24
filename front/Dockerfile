FROM nginx

ENV HOME_DIR /usr/share/nginx/html

WORKDIR $HOME_DIR

COPY ./dist/accountant/browser .

RUN echo "<h1>Actualizado 2 I am $degree $(whoami)<h2>" > user.html
RUN ls > list.html

CMD nginx -g 'daemon off;'
