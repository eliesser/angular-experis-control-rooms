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
   git clone https://github.com/eliesser/angular-experis-control-room.git
   cd angular-experis-control-room
   ```

2. **Instalar dependencias**: Abre una terminal en el directorio del proyecto y ejecuta `npm install` para instalar todas las dependencias necesarias.
   ```bash
   npm install
   ```

## Ejecutar la aplicación 🏃

Antes de ejecutar la aplicación, necesitarás generar la base de datos:

1. **Generar la base de datos**: Ejecuta `npm run generate-db` en tu terminal. Esto ejecutará el script `generate-db.js` para generar el archivo `db.json` con datos aleatorios de room.

   ```bash
   npm run generate-db
   ```

2. **Ejecuta la app**: Ejecuta `npm run start` para iniciar el servidor de desarrollo de Angular. La aplicación estará disponible en `http://localhost:4200`. Así mismo, al levantar la aplicación, también se iniciará `node server.js`, que servirá la API en `http://localhost:3000/room` esto es una api sencilla con `node` y `express` que para almacenar la data se esta usando un archivo plano, en este caso un .json `db.json` en el cual se realizan las peticiones agregando, editando y eliminando registros con `fs`.

   ```bash
   npm run start
   ```

## Ejecutar la pruebas unitarias

Cabe destacar que este reto no exige la implementación de pruebas unitarias. Sin embargo, mi intención es abordar algunos elementos de Angular, y en ese sentido he realizado pruebas unitarias para los elementos, he intentado cubrir el nivel mínimo de cobertura del 80% exigido para que el código pase el mínimo de calidad posible, para las pruebas he utilizado unos helpers que están ubicados en `src/testing` para simplificar la escritura de código en mis pruebas, asi como también `faker-js`, por otro lado he realizado una configuración para la integración continua en la ruta `.github/workflows/ci.yml` para `GitHub Actions`, donde me aseguro que el código al hacer push a la rama main debe tener mínimo de cobertura del 80% para posteriormente poder hacer acciones como despegarlo automáticamente si esta pasa correctamente.

1. **Pruebas unitarias**: Ejecuta `ng test` en tu terminal. Esto ejecutará el proceso de correr todas las pruebas unitarias del proyecto.

   ```bash
   ng test
   ```

2. **Código de cobertura**: Ejecuta `ng test --code-coverage` en tu terminal. Esto ejecutará el proceso de correr todas las pruebas unitarias del proyecto y generar los archivos en la carpeta `coverage/angular-experis-control-room`.

   ```bash
   ng test --code-coverage
   ```

## Notas 💡

He abarcado una amplia gama de funcionalidades en Angular con algunas de las novedades de las versiones mas recientes de este maravilloso framework para esta prueba técnica, incluyendo:

- **Rutas**: Implementación del enrutamiento para permitir la navegación dentro de la aplicación en este caso hay una ruta principal y otra de room para mostrar como interactúan entre si.
- **Lazy Loading**: Configuración de carga diferida para mejorar el rendimiento de la aplicación.
- **Componentes Standalone**: Desarrollo de componentes independientes para mayor flexibilidad.
- **Métodos del Ciclo de Vida**: Utilización de `OnChanges`, `OnInit`, `OnDestroy` para gestionar el ciclo de vida de los componentes.
- **Directivas**: Aplicación de directivas de atributos y estructurales para manipulación avanzada del DOM.
- **Comunicación entre Componentes**: Implementación de la comunicación entre componentes con `@Input` para `Padre a Hijo` y `@Output` junto con `EventEmitter` para `Hijo a Padre`.
- **Pipes**: Creación y uso de pipes para la transformación de datos en las vistas.
- **Interceptors**: Implementación de interceptores para manejar peticiones HTTP y respuestas y mostrar un loading.
- **Modelos e Interfaces**: Definición de modelos e interfaces para una estructura de datos robusta.
- **Servicios**: Desarrollo de servicios para la lógica de negocio y la realización de peticiones HTTP a una API REST mockeada.
- **Programación Reactiva con RxJS**: Uso de `Observables`, `BehaviorSubject` y operadores como `defer`, `of` ,`finalize` para gestionar flujos de datos asíncronos.

Para simular las peticiones, utilicé `Node`, `Express` y `faker-js`, lo que facilitó la configuración y proporcionó respuestas HTTP más realistas, también he dado 1 segundo de espera en cada petición para que se aprecie el uso del interceptor de loading.

En cuanto a los estilos, elegí trabajar exclusivamente con `SCSS` para demostrar mi habilidad en el diseño de interfaces responsivas, he utilizado variables y estructurado mixin con los colores y breakpoints de la app. Aunque también podría haber usado frameworks de CSS como `Tailwind` o `Bootstrap`, que permitirían una maquetación más rápida.

A nivel funcional, no encontré mayores dificultades. Sin embargo, definir el flujo de la interfaz y diseñar los elementos me tomó más tiempo del esperado. Normalmente, herramientas de diseño colaborativo basadas en la web, como `Figma`, `Zeplin` o `Adobe XD`, acelerarían mi proceso de desarrollo y mejorarían la precisión en la maquetación.

Por ultimo pero no menos importante mencionarles, que me apasiona desarrollar funcionalidades y los retos me motivan a aprender cosas nuevas. Siempre pongo todo mi empeño y optimismo para alcanzar los objetivos propuestos.

## Enlaces de Interés 💡

- **Novedades de Angular**: Para conocer las últimas funcionalidades y mejoras introducidas en Angular en sus últimas versiones, puedes visitar el [blog oficial de Angular](https://blog.angular.io/).

- **faker-js**: he utilizado `faker-js` para generar datos falsos de hoteles de manera sencilla. Es muy útil para el desarrollo y pruebas de aplicaciones. Puedes encontrar más información y la documentación en el [repositorio de GitHub de faker-js](https://github.com/faker-js/faker).

- **node y express**: he utilizado `node` y `express` para generar de una manera rápida un servidor REST API completo con operaciones CRUD a partir de un archivo JSON. Es útil para realizar REST API o mockear APIs durante el desarrollo de aplicaciones frontend. Para más detalles, visita la [documentación oficial](https://developer.mozilla.org/es/docs/Learn/Server-side/Express_Nodejs/Introduction).
