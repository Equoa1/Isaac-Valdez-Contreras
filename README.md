## Descripción del Proyecto
Este proyecto es una API para gestionar productos en una tienda de comercio electrónico. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en productos, así como operaciones en batch para actualización y eliminación.
## Arquitectura del Proyecto
```bash
├── src
│   ├── config
│   │   ├── db.js                # Configuración de la base de datos
│   ├── controllers
│   │   ├── productController.js # Controladores para la gestión de productos
│   ├── database
│   │   ├── product_table (1).sql # Script SQL para la creación de la tabla de productos
│   ├── middleware
│   │   ├── authMiddleware.js    # Middleware para la autenticación
│   ├── models
│   │   ├── accessTokenModel.js  # Modelo para los tokens de acceso
│   │   ├── Productmodel.js      # Modelo para los productos
│   │   ├── userModel.js         # Modelo para los usuarios
│   ├── routes
│   │   ├── authRoutes.js        # Rutas de autenticación
│   │   ├── productRoutes.js     # Rutas para la gestión de productos
│   ├── test
│   │   ├── test.js              # Archivo de pruebas para el proyecto
├── .env                         # Archivo de variables de entorno
├── app.js                       # Archivo principal de la aplicación

```

## Requisitos Previos
Antes de comenzar, asegúrate de tener los siguientes programas instalados en tu sistema
- MySQL.
- Node.js.
## Clona el Repositorio
```bash
  git clone https://github.com/Equoa1/Isaac-Valdez-Contreras.git
  cd Isaac-Valdez-Contreras
```
## Instala las Dependencias
```bash
  npm install
```
## Crea una tabla llamada product_table en mysql
```bash
  CREATE DATABASE product_table;
```
## Importa el archivo .sql que esta en la ruta
```bash
   src\database\product_table.sql
```
## Inicia el Servidor
```bash
  npm start
```
## Importar colección de Postman desde archivo local
Este comentario indica que existe un archivo de colección de Postman llamado Isaac Valdez Api.postman_collection.json ubicado en el directorio src\Http. 
1. Abre Postman.
2. Ve al menú "File" > "Import".
3. Selecciona "Upload Files" y busca el archivo Isaac Valdez Api.postman_collection.json en el directorio src\Http.
4. Haz clic en "Open" para importar la colección.
5. Una vez importada, la colección aparecerá en la lista lateral izquierda bajo "Collections". Puedes expandirla para acceder a las solicitudes individuales.







