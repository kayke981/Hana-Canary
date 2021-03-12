const m = require('moment');
const colors = require('colors');
const config = require('../../config.json');

module.exports = (client) => {

client.on('ready', async () => {
    
const status = [ 
    {name: 'alegria pelo ar', type: 'PLAYING'}, 
    {name: 'Meu criador me fazendo', type: 'WATCHING'}, 
    {name: `Versão ${config.versão}`, type: 'LISTENING'}
] 
function Presence() { 
        const base = status[Math.floor(Math.random() * status.length)] 
        client.user.setActivity(base)
    } 
    Presence(); 
    setInterval(() => Presence(), 6100) 	
    let tempo = m(Date.now()).format('LTS');	
    let temp = m(Date.now()).format('L'); 				client.user.setStatus('online').catch(console.error);	console.log(colors.brightRed(`---------------------------[CONNECTED AT ${tempo}]---------------------------`));
    });
          };
