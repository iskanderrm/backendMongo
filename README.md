**Instalación e inicialización de backend**

Para instalar e inicializar el backend, siga estos pasos:

1. Clone el repositorio e instale las dependencias necesarias:

Para instalar este proyecto, necesitará tener instalado Node.js, MongoDB y Git. Una vez que los tenga instalados, puede clonar el proyecto con el siguiente comando:

```
git clone https://github.com/[tu-nombre]/web-api-mongodb.git
```

```
npm install
```

2. Cree un archivo `.env` en la raíz del proyecto y configure las variables de entorno necesarias. Para obtener más información, consulte la sección Variables de entorno: #variables-de-entorno.

3. Inicie el servidor:

```
npm start
```

**Tecnologías utilizadas**

Este proyecto utiliza las siguientes tecnologías:

* Node.js: Es un entorno de ejecución JavaScript de código abierto.
* Express: Es un marco web para Node.js.
* MongoDB: Es una base de datos NoSQL de documentos.
* Bcrypt: Es una biblioteca para el cifrado de contraseñas.
* Crypto: Es una biblioteca para el cifrado y la descifrado de datos.
* Dotenv: Es una biblioteca para leer variables de entorno de un archivo .env.
* JSONWebToken: Es una biblioteca para generar y validar tokens JSON.
* Multer: Es una biblioteca para el manejo de archivos en Node.js.
* Path: Es una biblioteca para trabajar con rutas de archivos.
* Socket.io: Es una biblioteca para la creación de aplicaciones web en tiempo real.

**Información relevante**

El backend proporciona una API para crear, leer, actualizar y eliminar usuarios. También proporciona operaciones en tiempo real basado en Socket.io.

**Importar un archivo de thunder client de colección de peticiones a su extensión en visual studio code**

Para importar un archivo de thunder client de colección de peticiones a su extensión en visual studio code, siga estos pasos:

1. Abra la colección de peticiones que desea importar.
2. En la barra de menú, seleccione **Thunder Client** > **Import Collection**.
3. Seleccione el archivo de colección de peticiones que desea importar.
4. Haga clic en **Abrir**.

La colección de peticiones se importará a su extensión en visual studio code.

**Variables de entorno**

El archivo `.env` contiene las variables de entorno necesarias para el backend. Las variables de entorno se utilizan para almacenar información confidencial, como la contraseña de la base de datos y la clave secreta del token JWT.

Las variables de entorno que se utilizan en este proyecto son:

* `PORT`: Es el puerto en el cual se ejecutará el backend.
* `URL_MONGODB`: Es el enlace de conexión a MongoDB.
* `SALTOS_BCRYPT`: Son las veces que se encriptará la contraseña.
* `JWT_SECRET`: La clave secreta del token JWT.
* `DB_NAME`: El nombre de la base de datos.


Para obtener más información sobre las variables de entorno, consulte la documentación de Node.js.

**Ejemplo de archivo .env**

```
PORT=3000
URL_MONGODB=mongodb://localhost:27017/db
SALTOS_BCRYPT=10
JWT_SECRET=secret
URL_BASE_MONGODB=mongodb://localhost:27017
DB_NAME=motomania
```