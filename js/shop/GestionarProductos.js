

/**
 * 
 */
class GestionarProductos {

    iniciar() {

        //Arreglo de productos
        productos = [
            

            {
                "id": 1,
                "nombre": "",
                "descripcion": "",
                "precio": 8858,
                "stock": 50,
                "img": "ntGamer.png",
                "destacado": 0
            },
            {
                "id": 2,
                "nombre": "Lenovo Legion i7 13700",
                "descripcion": "Desarrollada por procesadores hasta Intel® Core™ i7 generacion 13 "+"Gráficos hasta NVIDIA® GeForce RTX™",
                "precio": 150000,
                "stock": 50,
                "img": "ntLenovo.png",
                "destacado": 1
            },

            {
                "id": 3,
                "nombre": "",
                "descripcion": "",
                "precio": 8858,
                "stock": 50,
                "img": "",
                "destacado": 0
            },
            {
                "id": 4,
                "nombre": "Mac Book",
                "descripcion": "Desarrollada por procesadores hasta Intel® Core™ i5 generacion 7ma",
                "precio": 23371,
                "stock": 50,
                "img": "ntMac.png",
                "destacado": 1
            }
        ]

        // Solo quiero mostrar los articulos destacados.
        let productosDestacados = productos.filter( prod => prod.destacado == 1 );

        this.cargarProductos( productosDestacados );
        
        this.mostrarCarrito();
        
        this.actualizarContador();
    }


    // Funcion encargada de cargar los productos en la pagina
    cargarProductos( productos ) { 
        
        const divProductos    = document.querySelector('#productos');
        divProductos.innerHTML = '';

        if( productos.length === 0 ) {

            this.mostrarHeader('Sin Datos :(');
            return false;
        } 
        else {          

            productos.forEach( (producto) => {

                const {  id : id_prod,
                    nombre : nombre_prod,
                    precio: precio_prod,
                    img : img_prod,
                    cantidad : cant_prod ,
                    descripcion : descripcion_prod} = producto;


    
                let prod = document.createElement('div');
                prod.classList.add('col-12', 'h200', 'border', 'bg-white', 'rounded', 'mt-3', 'd-flex', 'align-items-center', 'p-5', 'flex-row', 'producto');
                prod.setAttribute('id', 'row_'+id_prod);    
        
                prod.innerHTML = `      <div class="w-20">
                                            <img src="./img/Productos/${img_prod}" alt="" width="190" height="150" >
                                        </div>
    
                                        <div class="p-4 d-flex flex-column w-60 h-150">
                                            <h3>${nombre_prod}</h3>                                            
                                            <p>${descripcion_prod.substring(0,120)}</p>
                                        </div>
    
                                        <div class="d-flex align-items-center justify-content-center flex-column w-20 h-150">
                                            <p class="precio">$${precio_prod}</p>
                                            <a href="javascript:addCarrito(${id_prod})" class="btn btn-primary">Comprar</a>
                                        </div>`;
    
                divProductos.appendChild( prod );
    
            } )    
        }
    }

    // Funcion para buscar un producto
    buscar( q ) { 

        let resultado = productos.filter( producto => producto.nombre.toLowerCase().includes( q.toLowerCase() ) || producto.descripcion.toLowerCase().includes( q.toLowerCase() ));      
        this.cargarProductos( resultado );                   
    }



    addCart( infoProducto ) {
        
        
       const existe = carrito.some( producto => producto.id === infoProducto.id );

       // si ya existe necesito aumentar el contador
       if(existe) 
       {
          
           const articulos = carrito.map( producto => {

               if(producto.id === infoProducto.id)
               {
                   producto.cantidad++;
                   return producto;
               }
               else
               {
                   return producto;
               }

               carrito = articulos;               

           })

                      // Mostramos un msg con el resultado de la operacion
                      Toastify({
                        text: "Se actualizo la cantidad del producto",
                        duration: 2000,
                        gravity: 'bottom'
        
                    }).showToast();
           
    
       }
       else 
       {
           // Como no existe lo agrego
           carrito.push(infoProducto);

           Toastify({
            text: "Se agrego el producto",
            duration: 3000,
            gravity: 'bottom'

        }).showToast();
          

       }

       this.actualizarCarrito();
    }

    //Contabilizo las cantidad de productos
    contarProductos() { 

        let contadorProductos = 0;

        carrito.forEach(( producto ) => {

            contadorProductos = contadorProductos + parseInt(producto.cantidad);
        })

        return contadorProductos;
    }

    //Actualizo el carrito
    actualizarCarrito() {

        
        this.actualizarContador();

        
        this.mostrarCarrito();

        
        this.guardarCarrito();
    }

    // Actualizar contador carrito
    actualizarContador() { 

        let totalArticulos = this.contarProductos();

        let countCarrito = document.querySelector('#badgeCarrito');

        // Actualizar contador del carrito
        countCarrito.innerHTML = totalArticulos;

    }

    // Actualizar detalle del carrito
    mostrarCarrito() { 

        let detalleCarrito = document.querySelector('#idCarrito');
    
        detalleCarrito.innerHTML = '';

        let total = 0;

        carrito.forEach( ( producto ) => {


            /*
            const id = producto.id ;
            const nombre = producto.nombre ;
            const precio = producto.precio ;
            const img = producto.img ;
            const cantidad = producto.cantidad ;
            */

           // aplicamos desestructuracion de objeto
            const { id, nombre, precio, img, cantidad  } = producto;

    

            const row = document.createElement('div');
            row.classList.add('row');
            
            total += parseInt(precio);

            row.innerHTML = `
                
                        <div class="col-3 d-flex align-items-center p-2 border-bottom">
                            <img src="${img}" width="80"/>
                        </div>

                        <div class="col-3 d-flex align-items-center p-2 border-bottom">
                            ${nombre}
                        </div>

                        <div class="col-3 d-flex align-items-center justify-content-end p-2 border-bottom">
                            $ ${precio}
                        </div>

                        <div class="col-1 d-flex align-items-center justify-content-end p-2 border-bottom">
                            ${cantidad}
                        </div>

                        <div class="col-2 d-flex align-items-center justify-content-center p-2 border-bottom">
                            <a href="javascript:eliminar(${id})">
                                <i class="fa-solid fa-square-minus fa-2x"></i>
                            </a>
                        </div>
            `;
    
            
            detalleCarrito.appendChild(row);

        })

        let row = document.createElement('div');
        row.classList.add('row');
        
        row.innerHTML = `   <div class="col-4 d-flex align-items-center justify-content-start p-2 border-bottom">
                                Total a pagar:
                            </div>
                            <div class="col-8 d-flex align-items-center justify-content-end p-2 border-bottom">
                                <b> $ ${total}</b>
                            </div>`;

        // Agrega el HTML del carrito en el tbody
        detalleCarrito.appendChild(row);
    }

  
    // A partir de un id se elimina el producto
    eliminarArticulo( id ) { 

        Swal.fire({
            title: '"Esta seguro de eliminar el producto ?"',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo',
            cancelButtonText: `Cancelar`,
          }).then((result) => {
            
            if (result.isConfirmed) 
            {
                carrito = carrito.filter( articulo => articulo.id != id);
                this.actualizarCarrito();

                this.mostrar_notificacion("el articulo fue eliminado del carrito",2000,"bottom");

            }            
          })         
          
    }
    
    // Guardar en Storage
    guardarCarrito() { 
       
        localStorage.setItem(key_carrito, JSON.stringify( carrito ));
        const dt = DateTime.now();
        let date =  dt.toLocaleString();       
        localStorage.setItem(key_actualizacion,date);

    }

    //Muestra un detalle de lo mostrado en pantalla
    mostrarHeader( msg ) { 
        const headerProductos = document.querySelector('#headerProductos');
        headerProductos.innerHTML = msg;
    }


mostrar_notificacion (texto,duracion,posicion){


                          // Mostramos un msg con el resultado de la operacion
                          Toastify({
                            text: texto,
                            duration: duracion,
                            gravity: posicion
            
                        }).showToast();


}


}

