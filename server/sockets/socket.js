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
        callback(personas)  
    })

    client.on('disconnect', () =>{

        const persona = usuario.borrarPersona(client.id)

        client.broadcast.to(persona.sala).emit('listaDePersonas', usuario.getPersonas())
        client.broadcast.to(persona.sala).emit('crearMensaje', crearMensaje('Administrador', `${persona.nombre} salió`))

    })

    client.on('crearMensaje', (data) =>{
        const persona = usuario.getPersona(client.id)
        client.broadcast.to(persona.sala).emit('crearMensaje', crearMensaje(persona.nombre, data.mensaje))
    })

    client.on('mensajePrivado', (data) =>{
        const persona = usuario.getPersona(client.id)
        if(data.id){
            client.to(data.id).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
        }
    })
    

});