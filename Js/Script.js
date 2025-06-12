//Endpoint de intregrantes - API
const API_URL = "https://retoolapi.dev/QQN2jw/Integrantes"; 

//Función que manda a traer el JSON con GET
async function ObtenerIntegrantes() {

    //Respuesta de el servidor
    const respuesta = await fetch(API_URL);
    
    //Pasamos a JSON la respuesta del servidor
    const data = await respuesta.json(); //Esto es un JSON

    //Enviamos el JSON a la función que genera las filas en la tabla
    MostrarDatos(data);
    
}



//Función para crear las filas de la tabla en base a un JSON
//"datos" representará al JSON donde viene la información
function MostrarDatos(datos){

    //Se llama a la tabla con elemento "id" y luego al tbody
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar código HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla

    datos.forEach(integrante => {
        tabla.innerHTML += `
            <tr>
                <td>${integrante.id}</td>
                <td>${integrante.Nombre}</td>
                <td>${integrante.Apellido}</td>
                <td>${integrante.Correo}</td>
                <td>
                    <button onclick="AbrirModalEditar('${integrante.id}', '${integrante.Nombre}', '${integrante.Apellido}', '${integrante.Correo}')">Editar</button>
                    <button onclick="EliminarPersona(${integrante.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

ObtenerIntegrantes();




//Proceso para agragar un nuevo integrante
const modal = document.getElementById("mdAgregar"); //Cuadro de diálogo
const btnAgregar = document.getElementById("btnAgregar"); //Botón para agregar
const btnClose = document.getElementById("btnClose"); //Botón para cerrar el cuadro

btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //Abrir el modal al hcaer click en el botón
});

btnClose.addEventListener("click", ()=>{
    modal.close(); //Cerrar el modal al hcaer click en la X
});



//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //"e" representa a "submit". Evita que el formulario se envíe de un solo.

    //Capturar los valores del formulario
    const Nombre = document.getElementById("txtNombre").value.trim();
    const Apellido = document.getElementById("txtApellido").value.trim();
    const Correo = document.getElementById("txtEmail").value.trim();

    //Validación básica
    if(!Nombre || !Apellido || !Correo){
        alert("Ingrese los valores correctamente");
        return; //Para evitar que el código se siga ejecutando
    }

    //Llamar a la API para enviar el registro
    const respuesta = await fetch(API_URL, {
        method: "POST", //Tipo de solicitud 
        headers: {'Content-Type' : 'application/json'}, //Tipo de dato enviado
        body: JSON.stringify({Nombre, Apellido, Correo}) //Datos enviados
    });

    //Verificar si la API responde que los datos gueron enviados correctamente
    if(respuesta.ok){
        alert("El registro fué agregado correctamente")

        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();

        //Cerrar el modal (dialog)
        modal.close();

        //Recarga la tabla
        ObtenerIntegrantes();
    }
    else{
        //En caso de que la API devuelva un código diferente a 200-299
        alert("El registro no pudo ser agregado");
    }

});


//Función para borrar registros
async function EliminarPersona(id){
    const confirmacion = confirm("¿Realmente deseas eliminar el registro?");

    //Validamos si el usuario si escogió borrar
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        //Recargar la tabla después de eliminar
        ObtenerIntegrantes();
        alert("El registro fué eliminado correctamente");
    }
}



//Proceso para editar un registro
const modalEditar = document.getElementById("mdEditar");
const btnCloseEditar = document.getElementById("btnCloseEditar");

btnCloseEditar.addEventListener("click", ()=>{
    modalEditar.close(); //Cerrar el modal al hacer click en la X
});


function AbrirModalEditar(id, nombre, apellido, correo){
    //Se asignan los valores del registro en los input
    document.getElementById("txtIdEditar").value = id;
    document.getElementById("txtNombreEditar").value = nombre;
    document.getElementById("txtApellidoEditar").value = apellido;
    document.getElementById("txtEmailEditar").value = correo;

    //Abrimos el modal después de pasar
    modalEditar.showModal();
}