var socket = io();

const params = new URLSearchParams(window.location.search)

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html'
}
if (params.get('nombre') == '' || params.get('sala') == '') {
    window.location = 'index.html'
}

const user = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enetrarChat', (user), (response) =>{
        renderizarUsuarios(response, true)
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


socket.on('listaDePersonas', (data) =>{
    renderizarUsuarios(data)
})


socket.on('crearMensaje', (data) =>{
    renderizarMensajes(data)
    scrollBottom()
})



// Enviar información
// socket.emit('crearMensaje', {
//     nombre: params.get('nombre'),
//     mensaje: 'Hola Mundo'
// });

// Escuchar información
socket.on('mensajePrivado', (data) =>{
    console.log(data);
})