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
                    <button>Editar</button>
                    <button>Eliminar</button>
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
    modal.close(); //Abrir el modal al hcaer click en el botón
});



//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //"e" representa a "submit". Evita que el formulario se envíe de un solo.

    //Capturar los valores del formulario
    const Nombre = document.getElementById("txtNombre").Value.trim();
    const Apellido = document.getElementById("txtApellido").Value.trim();
    const Correo = document.getElementById("txtCorreo").Value.trim();

});
