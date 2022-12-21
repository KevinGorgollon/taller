rutTrabajador = localStorage.getItem('rutTrabajador')
let api1 = "https://listadotrabajadores.onrender.com/api/usuarios/"
//document.getElementById('fecha').max = new Date().toISOString().split("T")[0];
//inicializarInputs
let rut = document.getElementById('rut')
let telefono = document.getElementById('telefono')
let nombre = document.getElementById('nombre')
let apellido = document.getElementById('apellido')
let cargo = document.getElementById('cargo')
let sexo = document.getElementById('sexo')
let departamento = document.getElementById('departamento')
let direccion = document.getElementById('direccion')
let fecha = document.getElementById('fechaIngreso')

//traerDatosTrabajadores
async function traerDatosTrabajador(){
let todosLosDatos
 await fetch(api1+ rutTrabajador)
 .then(response => response.json())
 .then(trabajador =>  {
        rut.innerHTML = trabajador.rut
        telefono.innerHTML = trabajador.telefono
        nombre.innerHTML = trabajador.nombres
        apellido.innerHTML = trabajador.apellidos
        cargo.innerHTML = trabajador.cargo
        sexo.innerHTML = trabajador.sexo
        departamento.innerHTML = trabajador.departamento
        direccion.innerHTML = trabajador.direccion
        fecha.innerHTML = trabajador.fechaIngreso
 })
 .catch(e => console.log(e));
return todosLosDatos
}
traerDatosTrabajador();



//cargarDatosAInput
