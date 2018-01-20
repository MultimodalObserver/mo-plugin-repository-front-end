# MO Front End

Ejecutar

```bash
ng serve
```

Luego ir al sitio `http://localhost:4200/`

O el despliegue en Heroku `http://mo-front.herokuapp.com/explore/keyboard`

## Compilar para produccion

```bash
ng build --prod --env=prod
```


## Docker

Crear la imagen.

```bash
docker build -t mospanginx .
```

El nombre *mospanginx* se lo di yo, pero puede ser cualquiera.

Ejecutar imagen en un nuevo contenedor.

```
docker run -d --name mospanginx -p 80:80 mospanginx
```

Modificar el archivo de configuracion de variables de entorno (punto de entrada de la API REST, API key del recaptcha, etc)

```
docker exec -it mospanginx vim.tiny /usr/share/nginx/html/prod.config.js
```

**Nota**: Al configurar el archivo `prod.config.js` y poner la URL de la API, se debe colocar no URLs de servidores de aplicacion independientes, sino que la URL de la API como esta configurada en Nginx, para que asi haya balanceamiento de carga (en otras palabras, no poner ninguna en puerto de Rails 3000, sino que debe ser el puerto por defecto http o https en caso que este disponible).
