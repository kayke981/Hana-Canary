//dependências
const {color} = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const { Player } = require("discord-player")
const player = new Player(client);
const { GiveawaysManager } = require('discord-giveaways');
// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: './storage/giveaway/giveaways.json',
    updateCountdownEvery: 5000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
        embedColor: color,
        reaction: '🥳'
    }


});
//clients
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.player = player;
client.cooldowns = new Discord.Collection();
client.giveawaysManager = manager;
client.gatilhos = new Discord.Collection();


//arquivos
const config = require('./config.json');
require('./src/reply/reply.js');


const handler = require('./handler/handler.js')

handler.loadCommand(client.commands, client.aliases, 'comando de nº{number} carregado: ${cmd}')

//carregar os arquivos aqui
require('./loader/events.js')(client)

require('./loader/db.js')(client)

require('./hanaPlayers/player.js')(client)

require('./src/mysqlConnection/mysqlDataBaseConnection')(client)

//https://github.com/yADGithub foi onde eu peguei o handler de eventos e a db.js :)
client.login(config.token).catch(err => {
    console.log(err.code)
    })
