//VARIABLES
const API_URL = "https://mongodb-lo0u.onrender.com/api"
const xhr = new XMLHttpRequest();
const jsonWebTocken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzE4ODZiMzkwZTEzMDViODRlOWZjMSIsImlhdCI6MTY3MzYyNzc1NSwiZXhwIjoxNjczNzE0MTU1fQ.Y0O_3aCCGNF0Nd21WbB14uPjbHEEARhOMH01uAKenOo'
const reloadButn = document.getElementById('reloadTable')
const createButn = document.getElementById('createUser')


//HACER LA PETICION I OBTENER LOS DATOS
function onRequestHandler() {
    if (this.resdyState === 4 && this.status === 200) {
        // POSIBLES ESTADOS
        // 0 UNSET, no se ha llamado al metodo open
        // 1 OPENED, se ha llamado al metodo open
        // 2 HEADERS_RECIEVED, se esta llamando al metodo send()
        // 3 LOADING, esta reciviendo la respuesta
        // 4 DONE, se ha completado la operacion
        const data = JSON.parse(this.response)
        console.log(data); 
    }
}

//BUTTONS
reloadButn.addEventListener('click', () => {
    displayUsers(API_URL,xhr,jsonWebTocken)
})

createButn.addEventListener('click', () => {
    createUser(API_URL,xhr,jsonWebTocken)
})

//FUNCIONES

displayUsers(API_URL,xhr,jsonWebTocken)

function displayUsers (API_URL, xhr,jsonWebTocken) {
    let petitionTable = []
    const tabla = document.getElementById('displayTable')
    const thTabla = document.getElementsByTagName('th')
    //const  myHeaders = new Headers()
    xhr.addEventListener('load', onRequestHandler)
    // Recive 2 parametros [El tipo de petición] [Y la URL]
    xhr.open('GET',API_URL + "user/get")
    //Hacer dinámico el x-access-token
    xhr.setRequestHeader('x-access-token', jsonWebTocken)
    xhr.send()
    // La respuesta es tipo json
    xhr.responseType = "json"
    // Imprimimos la respuesta [es como un try catch]
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            petitionTable = xhr.response
            //CARGAR LOS DATOS EN UNA TABLA
            console.log(petitionTable)
            for (let i = 0; i < petitionTable.length; i++) {
                const tdTabla='<td>'+petitionTable[i]._id+'</td>'+'<td>'+petitionTable[i].name+'</td>'+'<td>'+petitionTable[i].mail+'</td>'+'<td>'+petitionTable[i].passwd+'</td>'+'<td>'+petitionTable[i].roles+'</td>'+'<td>'+petitionTable[i].createdAt+'</td>'+'<td>'+petitionTable[i].updatedAt+'</td>'
                tabla.insertAdjacentHTML('beforeend',tdTabla)        
            }
        }else {
        console.log(`Error: ${xhr.status}`);
        }
    }
}


function createUser (API_URL, xhr, jsonWebTocken) {
    const userData = {
        "name": "Pablo",
        "mail": "pablo@pablo.com",
        "passwd": "ASDasd123",
        "cpasswd": "ASDasd123",
        "roles": []
    }
    xhr.addEventListener('load', onRequestHandler)
    xhr.open('POST',API_URL + "user/new")
    xhr.setRequestHeader('x-access-token', jsonWebTocken)
    xhr.send(userData)
}
