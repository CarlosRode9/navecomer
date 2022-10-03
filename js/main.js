//* <------------- Simulador de shop --------------->*//
// Usando onclick en Carrito(NavBar)
const users = "admin";
const pass_users = "1234";
function solicitarDatos (){
	let user = prompt("Ingrese nombre de usuario");
	let pass = prompt("Ingrese su contraseña");
	if (validarDatos (user,pass)){
		iniciar_carrito()
	}else{
		alert("Usuario o contraseña no validas")
	}
}

function validarDatos(user,pass){
	if(user === users && pass === pass_users){
		return true;
	}else{
		return false;
	}
}

function iniciar_carrito(){
	let productos = "";
	let  finalizar_carrito = false;
	while(!finalizar_carrito){
		let code = prompt("Ingrese codigo del producto que desea comprar:\n1 Monitor\n2 Teclado\n3 Mouse\n4 Cpu completo\n5 Placa de video \napretar cancelar para finalizar")
		let producto = obtenerProducto(code)
		
		if(producto){
			console.log("producto agregado con exito: "+producto)
			productos += "\n"+producto

		}else{
			if (code == null){
				finalizar_carrito = true;
			}else{
			alert("Ingrese un producto valido")
			
		}
	}
}
if (productos != ""){
	let respuesta = confirm ("Desea concretar la compra de :"+productos);
	if (respuesta){
	alert("Gracias por comprar en nuestra tienda online");
	}
}
}
function obtenerProducto(code){ 


    let producto  ;
    switch(code){
		case "1" : 
                    producto = "Monitor";
                    break;
        case "2" : 
                    producto = "Teclado";
                    break;
        case "3" : 
                    producto = "Mouse" ;
                    break;
        case "4" : 
                    producto = "Cpu completo"
                    break;       
        case "5" : 
                    producto = "Placa de video" ;
                    break;

        default :
                    producto = false;           

    }
	return producto ;
}  

//Nav Bar.
//***********************************//

const btnDepartamentos = document.getElementById('btn-departamentos'),
	btnCerrarMenu = document.getElementById('btn-menu-cerrar'),
	grid = document.getElementById('grid'),
	contenedorEnlacesNav = document.querySelector('#menu .contenedor-enlaces-nav'),
	contenedorSubCategorias = document.querySelector('#grid .contenedor-subcategorias'),
	esDispositivoMovil = () => window.innerWidth <= 800;

btnDepartamentos.addEventListener('mouseover', () => {
	if(!esDispositivoMovil()){
		grid.classList.add('activo');
	}
});

grid.addEventListener('mouseleave', () => {
	if(!esDispositivoMovil()){
		grid.classList.remove('activo');
	}
});

document.querySelectorAll('#menu .categorias a').forEach((elemento) => {
	elemento.addEventListener('mouseenter', (e) => {
		if(!esDispositivoMovil()){
			document.querySelectorAll('#menu .subcategoria').forEach((categoria) => {
				categoria.classList.remove('activo');
				if(categoria.dataset.categoria == e.target.dataset.categoria){
					categoria.classList.add('activo');
				}
			});
		};
	});
});

// EventListeners para dispositivo movil.
document.querySelector('#btn-menu-barras').addEventListener('click', (e) => {
	e.preventDefault();
	if(contenedorEnlacesNav.classList.contains('activo')){
		contenedorEnlacesNav.classList.remove('activo');
		document.querySelector('body').style.overflow = 'visible';
	} else {
		contenedorEnlacesNav.classList.add('activo');
		document.querySelector('body').style.overflow = 'hidden';
	}
});

// Click en boton de todos los departamentos (Para version movil).
btnDepartamentos.addEventListener('click', (e) => {
	e.preventDefault();
	grid.classList.add('activo');
	btnCerrarMenu.classList.add('activo');
});

// Boton de regresar en el menu de categorias
document.querySelector('#grid .categorias .btn-regresar').addEventListener('click', (e) => {
	e.preventDefault();
	grid.classList.remove('activo');
	btnCerrarMenu.classList.remove('activo');
});

document.querySelectorAll('#menu .categorias a').forEach((elemento) => {
	elemento.addEventListener('click', (e) => {
		if(esDispositivoMovil()){
			contenedorSubCategorias.classList.add('activo');
			document.querySelectorAll('#menu .subcategoria').forEach((categoria) => {
				categoria.classList.remove('activo');
				if(categoria.dataset.categoria == e.target.dataset.categoria){
					categoria.classList.add('activo');
				}
			});
		}
	});
});

// Boton de regresar en el menu de categorias
document.querySelectorAll('#grid .contenedor-subcategorias .btn-regresar').forEach((boton) => {
	boton.addEventListener('click', (e) => {
		e.preventDefault();
		contenedorSubCategorias.classList.remove('activo');
	});
});

btnCerrarMenu.addEventListener('click', (e)=> {
	e.preventDefault();
	document.querySelectorAll('#menu .activo').forEach((elemento) => {
		elemento.classList.remove('activo');
	});
	document.querySelector('body').style.overflow = 'visible';
});