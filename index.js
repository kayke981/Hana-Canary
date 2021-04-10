//dependências
const Discord = require('discord.js');
const client = new Discord.Client()
//clients
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//arquivos
const config = require('./config.json');
require('./src/reply/reply.js');

const handler = require('./handler/handler.js')
handler.loadCommand(client.commands, client.aliases, 'comando de nº{number} carregado: ${cmd}')

//carregar os arquivos aqui
require('./loader/event.js')(client)

require('./loader/db.js')(client)

//https://github.com/yADGithub foi onde eu peguei o handler de eventos e a db.js :)
client.login(config.token)
