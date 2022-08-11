class Usuarios {
    constructor(){
        this.personas =[]
    }
    agregarPersona(id, nombre, sala) {
        this.personas.push({id, nombre, sala})
        return this.personas
    }

    getPersona(id){
        const persona = this.personas.find(element => element.id == id)
        return persona
    }

    getPersonas(){
        return this.personas 
    }
    
    getPersonasPorSala(sala){
        const personas = this.personas.filter(element => element.sala == sala)
        return personas
    }

    borrarPersona(id){
        const personaELminada = this.getPersona(id)
        this.personas = this.personas.filter(element => element.id != id)
       
        return personaELminada
       
        
    }

}

module.exports = Usuarios