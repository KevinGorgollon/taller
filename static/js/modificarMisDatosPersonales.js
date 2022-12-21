rutTrabajador = localStorage.getItem('rutTrabajador')
let api1 = "https://listadotrabajadores.onrender.com/api/usuarios/"
//document.getElementById('fecha').max = new Date().toISOString().split("T")[0];

//inicializarInputs
let modificar = document.getElementById('modificar')
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
        telefono.value = trabajador.telefono
        nombre.value = trabajador.nombres
        apellido.value = trabajador.apellidos
        cargo.innerHTML = trabajador.cargo
        sexo.value = trabajador.sexo
        departamento.innerHTML = trabajador.departamento
        direccion.value = trabajador.direccion
        fecha.innerHTML = trabajador.fechaIngreso
 })
 .catch(e => console.log(e));
return todosLosDatos
}
traerDatosTrabajador();

modificar.onclick = function(){
       let mensaje = confirm("desea modificar al trabajador?" )

       if(mensaje){
    let datos = {
        "telefono": telefono.value,
        "nombres": nombre.value,
        "apellidos": apellido.value,
        "sexo": sexo.value,
        "direccion": direccion.value
    }
    fetch(api1+ rutTrabajador, {
        method: 'PUT',
        body: JSON.stringify(datos),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => window.location.reload())
    .catch(error => console.error('Error:', error));
}else{
       alert("!haz rechazado borrarlo¡")
}
}