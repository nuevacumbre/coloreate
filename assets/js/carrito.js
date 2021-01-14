window.onload = function () {
    // Variables
    let baseDeDatos = [
        {
            id: 1,
            nombre: 'TÉ VERDE MAO JIAN',
            precio: 18500,
            cantidad: 'Bolsa 1 Kg',
            imagen: 'https://source.unsplash.com/random/360x360/?tea&sig=1'
        },
        {
            id: 2,
            nombre: 'TÉ VERDE GUNPOWDER',
            precio: 7900,
            cantidad: 'Bolsa 1 Kg',
            imagen: 'https://source.unsplash.com/random/360x360/?potion&sig=2'
        },
        {
            id: 3,
            nombre: 'TÉ VERDE GRADO 1',
            precio: 7200,
            cantidad: 'Bolsa 1 Kg',
            imagen: 'https://source.unsplash.com/random/360x360/?infusion&sig=3'
        },
        {
            id: 4,
            nombre: 'TÉ VERDE SABORIZADO CON FRUTILLA',
            precio: 9900,
            cantidad: 'Bolsa 1 Kg',
            imagen: 'https://source.unsplash.com/random/360x360/?tea&sig=4'
        },
        {
            id: 5,
            nombre: 'TÉ VERDE SABORIZADO CON GUAYABA',
            precio: 9900,
            cantidad: 'Bolsa 1 Kg',
            imagen: 'https://source.unsplash.com/random/360x360/?herbal&sig=5'
        },
        {
            id: 6,
            nombre: 'TÉ VERDE SABORIZADO CON MANZANA',
            precio: 9900,
            cantidad: 'Bolsa 1 Kg',
            imagen: 'https://source.unsplash.com/random/360x360/?infusions&sig=6' 
        },
        {
            id: 7,
            nombre: 'TÉ VERDE SABORIZADO CON DURAZNO',
            precio: 9900,
            cantidad: 'Bolsa 1 Kg',
            imagen: 'https://source.unsplash.com/random/360x360/?mug&sig=7' 
        },
        {
            id: 8,
            nombre: 'TÉ VERDE SABORIZADO CON MENTA',
            precio: 9900,
            cantidad: 'Bolsa 1 Kg',
            imagen: 'https://source.unsplash.com/random/360x360/?mint&sig=8' 
        },
        {
            id: 9,
            nombre: 'SPICY MUSE(Té verde con anís, canela, clavo de olor y manzana)',
            precio: 9900,
            cantidad: 'Bolsa 1 Kg',
            imagen: 'https://source.unsplash.com/random/360x360/?teapot&sig=9' 
        }

    ];
    
    let $items = document.querySelector('#items');
    let carrito = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
    let $iva = document.querySelector('#iva'); 
    let $tot_final = document.querySelector('#tot_final');
    let $botonVaciar = document.querySelector('#boton-vaciar');

    // Funciones
    function renderItems() {
        for (let info of baseDeDatos) {
            // Estructura
            let miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-12-small', 'col-4-large');
            // Body
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info['nombre'];
            // Imagen
            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info['imagen']);
            // Cantidad
            let miNodoCantidad = document.createElement('p');
            miNodoCantidad.classList.add('card-cant');
            miNodoCantidad.textContent = info['cantidad'];
            // Precio
            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = '$' + info['precio'];
            // Boton 
            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info['id']);
            miNodoBoton.addEventListener('click', anyadirCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoCantidad);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            $items.appendChild(miNodo);
        }
    }

    function anyadirCarrito () {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(this.getAttribute('marcador'))
        // Calculo el total
        calcularTotal();
        // Renderizamos el carrito 
        renderizarCarrito();
    }

    function renderizarCarrito() {
        // Vaciamos todo el html
        $carrito.textContent = '';
        // Quitamos los duplicados
        let carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach(function (item, indice) {
            // Obtenemos el item que necesitamos de la variable base de datos
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            // Cuenta el número de veces que se repite el producto
            let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - ${miItem[0]['precio']}$`;
            // Boton de borrar
            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.setAttribute('item', item);
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        });
    }

    function borrarItemCarrito() {
        // Obtenemos el producto ID que hay en el boton pulsado
        let id = this.getAttribute('item');
        // Borramos todos los productos
        carrito = carrito.filter(function (carritoId) {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
        calcularTotal();
    }

    function calcularTotal() {
        // Limpiamos precio anterior
        total = 0;
        iva = 0;
        tot_final = 0;
        // Recorremos el array del carrito
        for (let item of carrito) {
            // De cada elemento obtenemos su precio
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];
            iva = total * 0.19;
            tot_final = total + iva;
        }
        // Formateamos el total para que solo tenga dos decimales
        let totalDosDecimales = total.toFixed(0); //se cambia el 2 por 0
        let totalUnDecimal = iva.toFixed(0);
        let totalSinDecimal = tot_final.toFixed(0);
        // Renderizamos el precio en el HTML
        $total.textContent = totalDosDecimales;
        $iva.textContent = totalUnDecimal;
        $tot_final.textContent = totalSinDecimal;
    }

    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        calcularTotal();
    }

    // Eventos
    $botonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    renderItems();
} 
