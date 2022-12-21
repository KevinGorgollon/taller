let rutCargaFamiliar = localStorage.getItem('rutCargaFamiliar');
console.log('rutCargaFamiliar: ' + rutCargaFamiliar)
// inicializar variables
let _rut = document.getElementById("rut")
let nombres = document.getElementById("nombres")
let relacion = document.getElementById("relacion")
let telefono = document.getElementById("telefono")
let modificar = document.getElementById("modificar")

//llenar inputs con los datos de la carga familiar
const api1 = "https://listadotrabajadores.onrender.com/api/usuarios/"
function traerDatos(){
    let fetchRes = fetch(api1 + localStorage.getItem('rutTrabajador'));
    let result = fetchRes
    .then((res) => res.json())
    .then((datos) => {
        datos.contactosEmergencia.forEach(element => {
            if(element.rut == rutCargaFamiliar){
                _rut.value = element.rut
                nombres.value = element.nombres
                relacion.value = element.relacion
                telefono.value = element.telefono
            }
        }
        );
    });
}
traerDatos()

//funcion para modificar la carga familiar
const api2 = "https://listadotrabajadores.onrender.com/api/usuarios/contactosEmergencia/actualizar/"
modificar.onclick = modificarCargaFamiliar

function modificarCargaFamiliar(){
    let mensaje = confirm("desea modificar el contacto de emergencia?")
    if(mensaje){
    let fetchRes = fetch(api2 + localStorage.getItem('rutTrabajador') + '/' + rutCargaFamiliar, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                    "rut": _rut.value,
                    "nombres": nombres.value,
                    "relacion": relacion.value,
                    "telefono": telefono.value
        })
    })
    .then(data => data.json())
    .then(json => {
        alert("Se ha modificado con exito")
        window.location.reload()
    });
}
else {
    alert("No se ha modificado")
}
}


// oír los cambios en la caja de texto e ir dando formato al RUT
document.addEventListener('input', (e) => {
    const rut = document.getElementById('rut');
  
    if (e.target === rut) {
      let rutFormateado = darFormatoRUT(rut.value);
      rut.value = rutFormateado;
    }
  });
  
  // dar formato XX.XXX.XXX-X
  function darFormatoRUT(rut) {
    // dejar solo números y letras 'k'
    const rutLimpio = rut.replace(/[^0-9kK]/g, '');
  
    // asilar el cuerpo del dígito verificador
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();
  
    if (rutLimpio.length < 2) return rutLimpio;
  
    // colocar los separadores de miles al cuerpo
    let cuerpoFormatoMiles = cuerpo
      .toString()
      .split('')
      .reverse()
      .join('')
      .replace(/(?=\d*\.?)(\d{3})/g, '$1.');
  
    cuerpoFormatoMiles = cuerpoFormatoMiles
      .split('')
      .reverse()
      .join('')
      .replace(/^[\.]/, '');
  
    return `${cuerpoFormatoMiles}-${dv}`;
  }
  

  
  // oír el clic y si presiona el botón 'Validar RUT' ejecutar la validación
  _rut.onkeyup = function() {
      ejecutarValidacion();
  };
  
  function ejecutarValidacion(result) {
    const rut = document.getElementById('rut').value;
    const resultado = validarRUT(rut);
    const salida = document.querySelector('.salida');
  
    
     if (resultado === true) {
      salida.innerHTML = `<p style="color: darkgreen; font-size: 15px; font">El RUT ${rut} es válido</p>`;
      setTimeout(() => {
        salida.innerHTML = ""
    }, 2000)
      return resultado;
    } else {
      salida.innerHTML = `<p style="color: red; font-size: 15px;">El RUT ${rut} no es válido</p>`;
            setTimeout(() => {
              salida.innerHTML = ""
          }, 2000)
      return resultado;
    }
  
  }
  
  function validarRUT(rut) {
    // dejar solo números y letras 'k'
    const rutLimpio = rut.replace(/[^0-9kK]/g, '');
  
    // verificar que ingrese al menos 2 caracteres válidos
    if (rutLimpio.length < 2) return false;
  
    // asilar el cuerpo del dígito verificador
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1).toUpperCase();
  
    // validar que el cuerpo sea numérico
    if (!cuerpo.replace(/[^0-9]/g, '')) return false;
  
    // calcular el DV asociado al cuerpo del RUT
    const dvCalculado = calcularDV(cuerpo);
  
    // comparar el DV del RUT recibido con el DV calculado
    return dvCalculado == dv;
  }
  
  function calcularDV(cuerpoRUT) {
    let suma = 1;
    let multiplo = 0;
  
    for (; cuerpoRUT; cuerpoRUT = Math.floor(cuerpoRUT / 10))
      suma = (suma + (cuerpoRUT % 10) * (9 - (multiplo++ % 6))) % 11;
  
    return suma ? suma - 1 : 'K';
  }