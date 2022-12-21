//inicializar los tags del front
let tabla = document.getElementById('cuerpoTabla')

let _rut = document.getElementById("rut")

let botonEliminar = document.getElementById('botonEliminar')
let datos 


const api1 = "https://listadotrabajadores.onrender.com/api/usuarios"
const api2 = "https://listadotrabajadores.onrender.com/api/usuarios/"

// Solicitud GET (Request).
// API for get requests
let fetchRes = fetch(
    api1);
    let result = fetchRes.then(res =>
                res.json()).then(datos => {
                    for (i in datos) {
                        $("#cuerpoTabla").append(
                            '<tr>' + 
                            '<td>' + datos[i].rut + '</td>'+ 
                            '<td>' + datos[i].nombres + '</td>'+
                            '<td>' + datos[i].apellidos + '</td>'+
                            '<td>' + datos[i].sexo + '</td>'+
                            '<td>' + datos[i].direccion + '</td>'+
                            '<td>' + datos[i].telefono + '</td>'+
                            
                            '</tr>'
                        )
                    }
                    
                })

botonEliminar.onclick = (() =>{
    let rut = document.getElementById('rut')
    let mensaje = confirm("desea eliminar al trabajador con rut: " + rut.value)
    console.log(rut.value)
    if(mensaje){
        fetch(api2 + rut.value, {
            method: 'DELETE'
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
   
})



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