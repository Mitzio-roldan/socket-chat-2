const divChatbox = document.querySelector('#divChatbox')
const divUsuarios = document.querySelector('#divUsuarios')
const formEnviar = document.querySelector('#formEnviar')
const txtMensaje = document.querySelector('#txtMensaje')

const renderizarUsuarios = (personas) =>{
    console.log(personas);

    let html = `<li><a href="javascript:void(0)" class="active"> Chat de <span> ${params.get('sala')}</span></a></li>`

    personas.forEach(element => {
        html += '<li>'
        html += `<a data-id="${element.id}" onclick="obtenerId(this)" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${element.nombre} <small class="text-success">online</small></span></a>`
        html += '</li>'
    });

    divUsuarios.innerHTML = html

}

// listeners

const obtenerId = ( id ) => {
    console.log(id);
}

formEnviar.addEventListener('submit', (e)=>{
    e.preventDefault()
    // Enviar información
    socket.emit('crearMensaje', {
       nombre: params.get('nombre'),
       mensaje: txtMensaje.value
    }, callback =>{
        renderizarMensajes(callback, true)
        txtMensaje.value = ''
        scrollBottom()
    });
    
    
})

const renderizarMensajes = (mensaje, yo = false) =>{

    let fecha = new Date(mensaje.fecha);
    let hora = fecha.getHours() + ':' + fecha.getMinutes()

    let html = ''
    let adminClass = 'info'
    if (mensaje.nombre == 'Admin') {
        adminClass = 'danger'
    }
    if(yo){
        html += `<li class="reverse">`
        html += `<div class="chat-content">`
        html += `<h5>${mensaje.nombre}</h5>`
        html += `<div class="box bg-light-inverse">${mensaje.mensaje}</div>`
        html += `</div>`
        html += `<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>`
        html += `<div class="chat-time">${hora}</div>`
        html += `</li>`
        
    }
    else{

        html += `<li class="animated fadeIn">`
        if (mensaje.nombre !== 'Admin') {
            
            html += `<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>`
        }
        html += `<div class="chat-content">`
        html += `<h5>${mensaje.nombre}</h5>`
        html += `<div class="box bg-light-${adminClass}">${mensaje.mensaje}</div>`
        html += `</div>`
        html += `<div class="chat-time">10:56 am</div>`
        html += `</li>`

    }

    divChatbox.innerHTML += html


}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}
