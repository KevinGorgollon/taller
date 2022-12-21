trabajador = JSON.parse(localStorage.getItem('trabajador'))
console
let api1 = "https://listadotrabajadores.onrender.com/api/usuarios/"
document.getElementById('fecha').max = new Date().toISOString().split("T")[0];

let botonModificar = document.getElementById('botonModificar')
//inicializarInputs
let rut = document.getElementById('rut')
let telefono = document.getElementById('telefono')
let nombre = document.getElementById('nombre')
let apellido = document.getElementById('apellido')
let cargo = document.getElementById('cargo')
let sexo = document.getElementById('sexo')
let departamento = document.getElementById('departamento')
let direccion = document.getElementById('direccion')
let fecha = document.getElementById('fecha')


//cargarDatosAInput
function llenarDatos(){
rut.value = trabajador.rut
telefono.value = trabajador.telefono
nombre.value = trabajador.nombres
apellido.value = trabajador.apellidos
cargo.value = trabajador.cargo
sexo.value = trabajador.sexo
departamento.value = trabajador.departamento
direccion.value = trabajador.direccion
fecha.value = trabajador.fechaIngreso
}
//actualizar


botonModificar.onclick = (() => {
    let datos = {
        nombres:nombre.value,
        apellidos:apellido.value,
        cargo:cargo.value,
        sexo:sexo.value,
        telefono: telefono.value,
        departamento:departamento.value,
        direccion:direccion.value,
        fechaIngreso:fecha.value
    }
    let mensaje = confirm("desea modificar al trabajador?" )

    if(mensaje){
        fetch(api1 + rut.value, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers:{"Content-type": "application/json"}
            })
            .then(response => response.json())
            .then(json => {
                alert('se ha modificado con exito')
                window.history.back()
            })
            .catch(err => console.log(err))
    }else{
        alert("!haz rechazado borrarlo¡")
    }
    
})

llenarDatos()