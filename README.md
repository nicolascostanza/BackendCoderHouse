# BackendCoderHouse

## Para inizializar el proyecto debemos

### 1- Clonar El repositorio en su computadora
### 2- Ingresar dentro de la carpeta clonada desde la terminal
### 3- Realizar un npm install
### 4- Realizar un npm start

# Endpoints

## PRODUCTOS
### Listar los productos disponibles o ver un producto por id
#### url: /api/productos/:id?
#### metodo: GET

### Incorporar un producto al listado
#### url: /api/productos
#### metodo: POST

### Editar un producto por su id
#### url: /api/productos/:id
#### metodo: PUT

### Elimina un producto por su id
#### url: /api/productos/:id
#### metodo: DELETE

## CARRITO

### Crea un carrito y devuelve su id.
#### url: /api/carrito
#### metodo: POST

### Vacía un carrito y lo elimina.
#### url: /api/carrito
#### metodo: DELETE

### Permite listar todos los productos guardados en el carrito
#### url: /api/carrito/:idDelCarrito/productos
#### metodo: GET

### Agrega un producto a un carrito enviandoles sus ids respectivos
#### url: /api/carrito/:idCarrito/productos/IdProducto
#### metodo: POST

### Eliminar un producto del carrito por su id de carrito y de producto
#### url: /api/carrito/:id/productos/:idProducto
#### metodo: DELETE
