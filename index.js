//dependências
const Discord = require('discord.js');
const client = new Discord.Client({

//restTimeOffset: 1,
//ws: {
   //intents: 1539
// }
    
});
const { Player } = require("discord-player")
const player = new Player(client);
//clients
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.player = player;
client.cooldown = new Discord.Collection();

//arquivos
const config = require('./config.json');
require('./src/reply/reply.js');


const handler = require('./handler/handler.js')

handler.loadCommand(client.commands, client.aliases, 'comando de nº{number} carregado: ${cmd}')

//carregar os arquivos aqui
require('./loader/event.js')(client)

require('./loader/db.js')(client)

require('./hanaPlayers/player.js')(client)

//https://github.com/yADGithub foi onde eu peguei o handler de eventos e a db.js :)
client.login(config.token).catch(err => {
    console.log(err.code)
    })