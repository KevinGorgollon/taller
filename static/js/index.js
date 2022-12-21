async function iniciarSesion() {
  let user = document.getElementById("user").value;
  let passwd = document.getElementById("passwd").value;
  let datos;
  api1 = "https://listadotrabajadores.onrender.com/api/usuarios/"
  const usuarios =  
    await fetch(api1)
    .catch(e => console.log(e));
  const listUsers = await usuarios.json().catch(e => console.log(e))
  data = JSON.stringify(listUsers);
  localStorage.setItem('listadoRut', data)

  const fetchResult = await fetch(
    `https://listadotrabajadores.onrender.com/api/usuarios/${user}/${passwd}`,
    {
      method: "GET",
      headers: { "Content-type": "application/json" },
    }
  ).catch((e) => console.log(e));
  const response = await fetchResult.json().catch((e) => console.log(e));
  datos = response;


  if (datos != null) {
    if (datos.cargo == "Jefe RRHH") {
      window.location.href = "./templates/Menu.html";
      localStorage.setItem("tipo", "jefe");
    } else if (datos.cargo == "Personal RRHH") {
      window.location.href = "./templates/Menu.html";
      localStorage.setItem("tipo", "Personal RRHH");
    } else if (datos.cargo == "Admin") {
      window.location.href = "./templates/Menu.html";
      localStorage.setItem("tipo", "administrador");
    } else {
      localStorage.setItem("tipo", "trabajador");
      localStorage.setItem('rutTrabajador', datos.rut)
      window.location.href = "./templates/Menu.html";

      console.log(datos)
  } 
}
else {
  let div = document.getElementById("validar");
  let alerta = document.createElement("h4");
  alerta.textContent = "Error vuelva a ingresar los datos";
  alerta.style.color = "red";
  div.appendChild(alerta);
}
}
