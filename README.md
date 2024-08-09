## Descripción del Proyecto
Este proyecto es una API para gestionar productos en una tienda de comercio electrónico. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en productos, así como operaciones en batch para actualización y eliminación.

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







