
const guardar = document.getElementById('guardar')

api1 = "https://listadotrabajadores.onrender.com/api/estructura/departamento/"

//traerDatos
let _nombre = document.getElementById('nombre')


guardar.onclick = function(){
    datos = {
        nombre: _nombre.value
    };

    console.log(datos)

    //mandarDatosAlservidorNode
    fetch(api1 , {
    method:"POST",
    body: JSON.stringify(datos),
    headers:{"Content-type": "application/json"}
    })
    .then(response => response.json())
    .then(json => alert('Se ha creado con exito'))
    .catch(err => console.log(err))
    }

