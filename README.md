# MO Front End



## Docker

Crear la imagen. Antes de hacerlo es necesario que exista la carpeta `/dist`, la cual se puede compilar usando el comando para compilacion de produccion descrito mas abajo, aunque este repositorio incluye esa carpeta por lo que no es necesario.

```bash
docker build -t mospanginx .
```

El nombre *mospanginx* se lo di yo, pero puede ser cualquiera. Usar un nombre original, no utilizar el nombre `nginx` porque crea un conflicto con la imagen oficial de nginx.

Ejecutar imagen en un nuevo contenedor.

```
docker run -d --name mospanginx -p 80:80 mospanginx
```

Modificar el archivo de configuracion de variables de entorno (punto de entrada de la API REST, API key del recaptcha, etc)

```
docker exec -it mospanginx vim.tiny /usr/share/nginx/html/prod.config.js
```

La API Key de Recaptcha debe hacerse primero registrando el sitio en Recaptcha (servicio gratuito de Google), y copiando la llave pública.

**Nota**: Al configurar el archivo `prod.config.js` y poner la URL de la API, se debe colocar no URLs de servidores de aplicacion independientes, sino que la URL de la API como esta configurada en los `location` de Nginx, para que asi haya balanceamiento de carga (en otras palabras, no poner ninguna en puerto 3000 de Rails).


## Modo desarrollo


```bash
ng serve -p <PORT>
```


## Compilar para produccion

```bash
ng build --prod --env=prod
```

