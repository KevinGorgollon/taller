function maximizar() {
  window.moveTo(0, 0);
  window.resizeTo(screen.width, screen.height);
}
maximizar();

let titulo = document.getElementById('titulo')
titulo.innerHTML = localStorage.getItem('tipo')

tipo = localStorage.getItem("tipo");
usuarios = {
  jefe: {
    opciones: [
      "Consultar Datos de trabajadores",
      "Crear Ficha de Trabajador",
      "Modificar Ficha de Trabajador",
      "Eliminar Ficha de Trabajador",
      "Salir",
    ],
    urls: [
      "../templates/consultarDatosTrabajadores.html",
      "../templates/crearTrabajador.html",
      "../templates/modificarTrabajadores.html",
      "../templates/eliminarTrabajador.html",
      "../index.html",
    ],
  },
  personalRRHH: {
    opciones: [
      "Consultar Datos de trabajadores",
      "Crear Ficha de Trabajador",
      "salir",
    ],
    urls: [
      "../templates/consultarDatosTrabajadores.html",
      "../templates/crearTrabajador.html",
      "../index.html",
    ],
  },
  trabajador: {
    opciones: [
      "Consultar Mis Datos",
      "Modificar Mis Datos Personales",
      "Consultar Mis Cargas Familiares",
      "Consultar Mis Contactos de Emergencia",
      "Cerrar Sesion"
    ],
    urls: [
      "../templates/consultarMisDatos.html",
      "../templates/modificarMisDatosPersonales.html",
      "../templates/modificarCargaFamiliarTrabajador.html",
      "../templates/modificarContactoEmergenciaTrabajador.html",
      "../index.html"
    ]
  },
  administrador: {
    opciones: [
      "Crear Departamento",
      "Crear Cuenta Jefe RRHH",
      "Cerrar Sesion"
    ],
    urls:[
      "../templates/crearDepartamento.html",
      "../templates/crearJefe.html",
      "../index.html"
    ]
  }

};
var contadorLi = 0;
//El primer If crea el menu, las dos primeras variables trae los datos del json y el for pregunta cuantas opciones tiene, y luego pide el id del html y despues se alimenta el menu con las opciones y los href con los urls
if (localStorage.getItem("tipo") == "jefe") {
  opciones = usuarios.jefe["opciones"];
  urls = usuarios.jefe["urls"];
  for (i in opciones) {
    var int = document.getElementById("option" + i);
    int.innerHTML = opciones[i];
    int.href = urls[i];
  }
} 
//este if inicializa las variables de personalRRHH luego el for contadorLi lo que hace es guarda cuantas veces inicio el ciclo del for para luego usarlo para borrar los siguientes datos del menu
else if (localStorage.getItem("tipo") == "Personal RRHH") {
  opciones = usuarios.personalRRHH["opciones"];
  urls = usuarios.personalRRHH["urls"];
  for (i in opciones) {
    contadorLi = contadorLi + 1;
    var int = document.getElementById("option" + i);
    int.innerHTML = opciones[i];
    int.href = urls[i];
  }
  console.log(contadorLi);
  for (contadorLi; contadorLi <= 5; contadorLi++) {
    console.log(contadorLi);
    document.getElementById("option" + contadorLi).remove();
  }
}

else if (localStorage.getItem("tipo") == "trabajador") {
  opciones = usuarios.trabajador["opciones"];
  urls = usuarios.trabajador["urls"];
  for (i in opciones) {
    contadorLi = contadorLi + 1;
    var int = document.getElementById("option" + i);
    int.innerHTML = opciones[i];
    int.href = urls[i];
  }
  console.log(contadorLi);
  for (contadorLi; contadorLi <= 5; contadorLi++) {
    console.log(contadorLi);
    document.getElementById("option" + contadorLi).remove();
  }
} else if (localStorage.getItem("tipo") == "administrador") {
  opciones = usuarios.administrador["opciones"];
  urls = usuarios.administrador["urls"];
  for (i in opciones) {
    contadorLi = contadorLi + 1;
    var int = document.getElementById("option" + i);
    int.innerHTML = opciones[i];
    int.href = urls[i];
  }
  console.log(contadorLi);
  for (contadorLi; contadorLi <= 5; contadorLi++) {
    console.log(contadorLi);
    document.getElementById("option" + contadorLi).remove();
  }
}
