// arrays para almacenar los datos de usuarios y productos
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let productos = JSON.parse(localStorage.getItem('productos')) || [];

function mostrarUsuarios() {
    const usersListContainer = document.getElementById('users-list-js');
    usersListContainer.innerHTML = '';

    usuarios.forEach(usuario => {
        const userItem = document.createElement('div');
        userItem.classList.add('user-item', 'card', 'mb-3', 'p-3');
        userItem.innerHTML = `
            <h5 class="card-title">${usuario.nombre}</h5>
            <p class="card-text">Email: ${usuario.email}</p>
            <p class="card-text">Edad: ${usuario.edad} años</p>
        `;
        usersListContainer.appendChild(userItem);
    });
}

function mostrarProductos() {
    const productsListContainer = document.getElementById('products-list-js');
    productsListContainer.innerHTML = ''; 

    productos.forEach(producto => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item', 'card', 'mb-3', 'p-3');
        productItem.innerHTML = `
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
            <p class="card-text">Categoría: ${producto.categoria}</p>
        `;
        productsListContainer.appendChild(productItem);
    });
}

// manejar el formulario de usuario
document.getElementById('user-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const edad = document.getElementById('edad').value;

    const nuevoUsuario = { nombre, email, edad };

    usuarios = [...usuarios, nuevoUsuario];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    mostrarUsuarios();
    generarReporte();
    this.reset(); // limpiar el formulario despues de enviar
});

// manejar el formulario de producto
document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombreProducto = document.getElementById('nameProduct').value;
    const precio = parseFloat(document.getElementById('cost').value);
    const categoria = document.getElementById('category').value;

    const nuevoProducto = { nombre: nombreProducto, precio, categoria };
    productos = [...productos, nuevoProducto];
    localStorage.setItem('productos', JSON.stringify(productos));

    mostrarProductos();
    generarReporte();
    this.reset(); // limpiar el formulario despues de enviar
});

function generarReporte() {
    const reportContainer = document.getElementById('report-container');
    reportContainer.innerHTML = ''; 

    const combinedData = [...usuarios, ...productos];

    const combinedDetails = combinedData.map((item, index) => {
    // verifica si el elemento es un usuario o un producto
        if (item.edad) { // tiene el atributo 'edad', por lo tanto, es un usuario
            return `<p>${index + 1}. Usuario - Nombre: ${item.nombre}, Email: ${item.email}, Edad: ${item.edad}</p>`;
        } else { // De lo contrario, es un producto
            return `<p>${index + 1}. Producto - Nombre: ${item.nombre}, Precio: $${item.precio.toFixed(2)}, Categoría: ${item.categoria}</p>`;
        }
    }).join('');

    const totalUsuarios = usuarios.length;
    const totalProductos = productos.length;
    const totalPrecioProductos = productos.reduce((total, producto) => total + producto.precio, 0);
    const promedioEdadUsuarios = totalUsuarios > 0 ? (usuarios.reduce((total, usuario) => total + parseInt(usuario.edad), 0) / totalUsuarios).toFixed(2) : 0;

    const reportContent = `
        <div class="col-12 text-center">
            <h3>Reporte de Usuarios y Productos</h3>
            <p>Total de Usuarios Registrados: ${totalUsuarios}</p>
            <p>Promedio de Edad de Usuarios: ${promedioEdadUsuarios}</p>
            <p>Total de Productos Registrados: ${totalProductos}</p>
            <p>Total de Precio de Productos: $${totalPrecioProductos.toFixed(2)}</p>
            <div class="combined-details">
            ${combinedDetails}
        </div>
        </div>
    `;

    reportContainer.innerHTML = reportContent;
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarUsuarios();
    mostrarProductos();
    generarReporte();
});