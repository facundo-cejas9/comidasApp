Aplicación de comidas con el stack MERN.
Se utilizó React JS para el frontend y CSS puro para los estilos.
Para el backend utilicé mongoDB para la base de datos y express.

La aplicación cuenta con distintas caracteristicas:
*- Login page y creación de cuentas (cuenta con sus respectivas verificaciónes, no se puede crear una cuenta con el mismo mail por ejemplo).
*- Cuenta con un carrito de compras, con posibilidad de agregar, eliminar o vaciar completamente el mismo (se creo un endpoint para vaciar el carrito desde el backend).
*- Cuenta con un buscador para filtrar las comidas por su nombre o categoria.
*- Cuenta un payment el cual se utilizó Stripe para el mismo.

Además tambien cuenta con un panel de administración en el cual se pueden realizar las siguientes funciones:
*- Agregar comidas al backend.
*- Eliminar comidas desde el backend.
*- Lectura de los pedidos de los clientes, cambiar su estado "en proceso", "enviiado", "cancelado".
