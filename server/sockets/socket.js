const Usuarios = require('../classes/usuarios');
const { io } = require('../server');
const crearMensaje = require('./utilidades/utilidades')

const usuario = new Usuarios()

io.on('connection', (client) => {
    
    


    client.on('enetrarChat', (data, callback) =>{
        if(!data.nombre || !data.sala){
            callback({
                error: true,
                msg: 'Sin nombre o sala'
            })
        }
        client.join(data.sala)
        const personas = usuario.agregarPersona(client.id, data.nombre, data.sala)
        client.broadcast.to(data.sala).emit('listaDePersonas', usuario.getPersonasPorSala(data.sala))
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Admin', `${data.nombre} se unió`))
        callback(usuario.getPersonasPorSala(data.sala))  
    })

    client.on('disconnect', () =>{

        const persona = usuario.borrarPersona(client.id)

        client.broadcast.to(persona.sala).emit('listaDePersonas', usuario.getPersonasPorSala(persona.sala))
        client.broadcast.to(persona.sala).emit('crearMensaje', crearMensaje('Admin', `${persona.nombre} salió`))

    })

    client.on('crearMensaje', (data, callback) =>{
        const persona = usuario.getPersona(client.id)
        const mensaje = crearMensaje(persona.nombre, data.mensaje)
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)
        callback(mensaje)
    })

    client.on('mensajePrivado', (data) =>{
        const persona = usuario.getPersona(client.id)
        if(data.id){
            client.to(data.id).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
        }
    })
    

});