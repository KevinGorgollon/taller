let tabla = document.getElementById('cuerpoTabla')
let mensajito = document.getElementById("mensajito");
let datos 

const api1 = "https://listadotrabajadores.onrender.com/api/usuarios/"
const api2 = "https://listadotrabajadores.onrender.com/api/usuarios/contactosEmergencia/eliminar/"

function traerCosas(){
      let fetchRes = fetch(api1 + localStorage.getItem('rutTrabajador'));
      let result = fetchRes
        .then((res) => res.json())
        .then((datos) => {
          if (datos != null) {
            if(Object.keys(datos.contactosEmergencia).length == 0)
            {
              mensajito.innerHTML = "No tiene asignadas cargas familiares"
            }else {
              console.log('aqui')
              for (i in datos.contactosEmergencia) {
                let contactosEmergencia = datos.contactosEmergencia;
                $("#cuerpoTabla").append(
                  "<tr>" +
                    "<td>" +
                    contactosEmergencia[i].rut +
                    "</td>" +
                    "<td>" +
                    contactosEmergencia[i].nombres +
                    "</td>" +
                    "<td>" +
                    contactosEmergencia[i].relacion +
                    "</td>" +
                    "<td>" +
                    contactosEmergencia[i].telefono +
                    "</td>" +
                    `<td> <a onclick="editar('${contactosEmergencia[i].rut}')" class="btn btn-success btn-sm"><i class="bi bi-pencil-square"></i></td>
                    <td> <a href="#" onclick="borrar('${contactosEmergencia[i].rut}')" class="btn btn-danger btn-sm"><i class="bi bi-trash"></i></td> `+
                    "</tr>"
                );
              }
            }
            
          } else {
            mensajito.innerHTML = "";
            setTimeout(() => {
              mensajito.innerHTML = ""
          }, 5000)
          }
        });
    }  
traerCosas()

function borrar(rut){
    console.log(rut)
    let mensaje = confirm("desea eliminar el contacto de emergencia? ")
    if(mensaje){
        fetch(api2 + localStorage.getItem('rutTrabajador') + '/' + rut, {
            method: 'PUT'
        })
        .then(data => data.json())
        .then(json => {
            alert("Se ha borrado con exito")
            location.reload()})
        .catch(error => alert(error))
    }
    else{
        alert("!haz rechazado borrarlo¡")
    }

}


function editar(rut){
  localStorage.setItem('rutCargaFamiliar', rut)
  window.location.href = "../templates/formularioModificarContactoEmergencia.html"
}