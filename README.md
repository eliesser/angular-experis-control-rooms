# Prueba Técnica Angular

## Objetivo

Se quiere llevar un control de las salas que hay en las distintas plantas de un edificio para ver el porcentaje de ocupación y la capacidad máxima que tienen. Además, se debe poder editar esta información, así como añadir nuevas salas o eliminar las existentes.

## Obligatorio

- Listar salas de una planta seleccionada (mínimo 2 plantas a elegir).
- Añadir nuevas salas a una planta.
- Editar la información de una sala.
- Readme con las siguientes secciones:
  - Pasos para arrancar el proyecto.
  - Explicación de las decisiones que hayas tomado.
  - Dificultades encontradas.

## Extras

- Simular la conexión con backend con una API mockeada (puedes crearla con https://apimocha.com/ u otra plataforma que conozcas).
- Eliminar salas de una planta.
- Filtrar las salas por capacidad y ocupación.
- Responsive.

## Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas en tu máquina:

- [Node.js](https://nodejs.org/) (versión 20.14.0)
- [npm](https://www.npmjs.com/) (versión 10.7.0)
- La aplicación se ha generado con el CLI de Angular (versión 18).

## Configuración del Entorno de Desarrollo 💻

1. **Clonar repositorio**: clonar el repositorio en tu entorno de desarrollo.

   ```bash
   git clone https://github.com/eliesser/angular-experis-control-rooms.git
   cd angular-experis-control-rooms
   ```

2. **Instalar dependencias**: Abre una terminal en el directorio del proyecto y ejecuta `npm install` para instalar todas las dependencias necesarias.
   ```bash
   npm install
   ```

## Generar la Base de Datos 🏃

Antes de ejecutar la aplicación, necesitarás generar la base de datos:

1. **Generar la base de datos**: Ejecuta `npm run generate-db` en tu terminal. Esto ejecutará el script `generate-db.js` para generar el archivo `db.json` con datos aleatorios de rooms.

   ```bash
   npm run generate-db
   ```

2. **Ejecuta la app**: Ejecuta `npm run start` para iniciar el servidor de desarrollo de Angular. La aplicación estará disponible en `http://localhost:4200`. Así mismo, al levantar la aplicación, también se iniciará `json-server`, que servirá la API en `http://localhost:3000/room`.

   ```bash
   npm run start
   ```

## Notas 💡

Eh intentado cubrir muchas de las funcionalidades de angular, entre las cuales se han implementado module, componentes standalone, pipe, interceptor, model, interface, servicios, peticiones http, programación reactiva.

- Para mockear las peticiones decidí usar `json-server` junto con `faker-js` se me hace mas simple poder configurar y obtener las peticiones http
- En cuando al los estilos he decidido usar unicamente scss, para demostrar que tengo capacidad de hacer diseños responsivos, también pude usar un framework de css tal como `tailwind` o `Bootstrap` que fuera maquetado mucho mas rápido.
- Me apasiona desarrollar funcionalidades, los retos me motivan a aprender cosas nuevas y pongo mis mejores ganas y positivismos para lograr el objetivo.
- En cuanto a dificultades a nivel de funcionalidad no tuve mayor problema, pero si que imaginar como debe ser el flujo de la interfaz y los propios diseños hacen que me demore mucho, normalmente si tengo alguna herramienta de diseño colaborativo basada en la web tal como `Figma`, `Zeplin`, `Adobe XD` entre otros, mi desarrollo es mas rápido y preciso a nivel de maquetación.

## Enlaces de Interés 💡

- **Novedades de Angular**: Para conocer las últimas funcionalidades y mejoras introducidas en Angular en sus últimas versiones, puedes visitar el [blog oficial de Angular](https://blog.angular.io/).

- **faker-js**: Hemos utilizado `faker-js` para generar datos falsos de hoteles de manera sencilla. Es muy útil para el desarrollo y pruebas de aplicaciones. Puedes encontrar más información y la documentación en el [repositorio de GitHub de faker-js](https://github.com/faker-js/faker).

- **json-server**: Hemos utilizado `json-server` para generar de una manera rápida un servidor REST API completo con operaciones CRUD a partir de un archivo JSON. Es útil para mockear APIs durante el desarrollo de aplicaciones frontend. Para más detalles, visita el [repositorio de GitHub de json-server](https://github.com/typicode/json-server).
