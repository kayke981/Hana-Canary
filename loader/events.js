module.exports = (client) => {
    
    const fs = require('fs')  
    fs.readdir('./src/events', (erro, eventos) => {   
        
        eventos.forEach(evento => {
        
        evento = evento.replace('.js', '')     
        require(`../src/events/${evento}`)(client)     
        console.log(`[EVENTS COMPLETED] ${evento} carregado com sucesso.`.brightYellow)    
    });  
                                                                            });
};
//do ADG, https://github.con/yADGithub
