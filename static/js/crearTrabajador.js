const guardar = document.getElementById('guardar')
const agregarCargasFamiliares = document.getElementById('agregarCargasFamiliares')
const agregarContactosEmergencia = document.getElementById('contactosEmergencia')
const mensajito2 = document.getElementById('mensajito')
let api1 = "https://listadotrabajadores.onrender.com/api/usuarios/"



//traerDatos
let _rut = document.getElementById('rut')
let _nombre = document.getElementById('nombre')
let _apellido = document.getElementById('apellido')
let _sexo = document.getElementById('sexo')
let _direccion = document.getElementById('direccion')
let _telefono = document.getElementById('telefono')
let _cargo = document.getElementById('cargo')
let _departamento = document.getElementById('departamento')
let _fechaIngreso = document.getElementById('fecha')
let _usuario = document.getElementById('usuario')
let _clave = document.getElementById('clave')
let estatus = false;

function ShowSelected()
{
/* Para obtener el valor */
var cod = document.getElementById("sexo").value;
/* Para obtener el texto */
var combo = document.getElementById("sexo");
var selected = combo.options[combo.selectedIndex].text;
return selected;
}

console.log(ShowSelected())

// validar

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
  





guardar.onclick = function(){
    datos = {
        rut: _rut.value,
        nombres: _nombre.value,
        apellidos: _apellido.value,
        sexo: ShowSelected(),
        direccion:_direccion.value,
        telefono:_telefono.value,
        cargo:_cargo.value,
        departamento:_departamento.value,
        fechaIngreso:_fechaIngreso.value,
        cargasFamiliares:[],
        contactosEmergencia:[],
        usuario:_usuario.value,
        clave:_clave.value
    };

    //esta es la validacion para que el personal, no pueda crear ni jefes ni Admin y que el jefe pueda crear otros jefes pero no admin
      if(_rut.value == "" || _nombre.value =="" || _apellido.value  == "" || _direccion.value =="" || _telefono.value == "" || _cargo.value == "" || _departamento.value == "" || _departamento.value =="" || _fechaIngreso.value == ""){
            mensajito2.innerHTML = "Rellene todo los campos antes de guardar"
            setTimeout(() => {
                mensajito2.innerHTML = ""
            }, 5000)
        }

        
        else { 
            if(ejecutarValidacion()){
                if(localStorage.getItem('listadoRut').includes(_rut.value) ){
                    mensajito2.innerHTML = "Ese rut ya esta en uso"
                }else {
                    if(_cargo.value != 'Admin'){
                        if(_cargo.value != 'Jefe RRHH' && localStorage.getItem('tipo') == 'Personal RRHH'){
                            //mandarDatosAlservidorNode
                            fetch(api1 , {
                            method:"POST",
                            body: JSON.stringify(datos),
                            headers:{"Content-type": "application/json"}
                            })
                            .then(response => response.json())
                            .then(json => alert('Se ha creado con exito'))
                            .catch(err => console.log(err))
                        }else if(localStorage.getItem('tipo') == 'jefe'){
                             //mandarDatosAlservidorNode
                             fetch(api1 , {
                                method:"POST",
                                body: JSON.stringify(datos),
                                headers:{"Content-type": "application/json"}
                                })
                                .then(response => response.json())
                                .then(json => alert('Se ha creado con exito'))
                                .catch(err => console.log(err))
                        }else{
                        alert('Ingrese un cargo que no sea admin')
                    }
                } 
                }

            }else {
                mensajito2.innerHTML = "El rut sigue siendo invalido"
                setTimeout(() => {
                    mensajito2.innerHTML = ""
                }, 5000)
            }



            
            }
    
    }
    

agregarCargasFamiliares.onclick = (() => {
    if(_rut.value == ""){
        mensajito.innerHTML = "Ingrese un rut antes de continuar"
        setTimeout(() => {
            mensajito.innerHTML = ""
        }, 2000)
    }else{
        fetch(api1 + _rut.value,
            {
                method:"GET"
            })
            .then(response=> response.json())
            .then(data => {
                
                if(data != null){
                localStorage.setItem('rutTrabajador', _rut.value)
                location.href="../templates/ingresarCargasFamiliares.html"
                }else{
                    mensajito.innerHTML = "Ese rut no existe"
                    setTimeout(() => {
                        mensajito.innerHTML = ""
                    }, 2000)
                }
            })
            .catch(err => {
                mensajito.innerHTML= "Error en el servidor"
                setTimeout(() => {
                    mensajito.innerHTML = ""
                }, 2000)
            })
    }
})

agregarContactosEmergencia.onclick = (() => {
    if(_rut.value == ""){
        mensajito.innerHTML = "Ingrese un rut antes de continuar"
        setTimeout(() => {
            mensajito.innerHTML = ""
        }, 2000)
    }else{
        fetch(api1 + _rut.value,
            {
                method:"GET"
            })
            .then(response=> response.json())
            .then(data => {
                
                if(data != null){
                console.log(data)
                localStorage.setItem('rutTrabajador', _rut.value)
                location.href="../templates/ingresarContactoEmergencia.html"
                }else{
                    mensajito.innerHTML = "Ese rut no existe"
                    setTimeout(() => {
                        mensajito.innerHTML = ""
                    }, 2000)
                }
            })
            .catch(err => console.log(err))
    }
})