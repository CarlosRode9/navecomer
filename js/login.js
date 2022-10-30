//* <------------- Agregando login --------------->*//
// Usando .addEventListener .getElementById
const username = document.getElementById('username')
const password = document.getElementById ('password')
const button = document.getElementById('button')
button.addEventListener('click', (e) => {
	e.preventDefault();
	let registros ={
		username: username.value,
		password: password.value,
	}
	console.log(registros)
})