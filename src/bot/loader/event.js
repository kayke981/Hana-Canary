module.exports = (client) => {
    
    const {readdir} = require('fs')  
    readdir('./src/events', (erro, eventos) => {   
        
        eventos.forEach(evento => {
        
        evento = evento.replace('.js', '')     
        require(`../../events/${evento}`)(client)     
         console.log(`[EVENTS COMPLETED] ${evento} carregado com sucesso.`.brightYellow)    
    });  
                                                                            });
};