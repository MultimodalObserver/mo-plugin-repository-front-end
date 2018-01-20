FROM nginx

# Empezar con Nginx y borrar sus archivos HTML iniciales y pasar configuracion

FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/


# Copiar los archivos estaticos

COPY dist/ /usr/share/nginx/html

# Instalar VIM para que se pueda editar el archivo de configuracion de la SPA
RUN apt-get update
RUN apt-get install -y vim-tiny










