//dependências
const {color, token} = require('../config/json/config.json');
const { Client, Collection } = require('discord.js');
const client = new Client();
const { Player } = require("discord-player")
const player = new Player(client);
const { GiveawaysManager } = require('discord-giveaways');
// Starts updating currents giveaways
const manager = new GiveawaysManager(client, {
    storage: './src/bot/storage/giveaway/giveaways.json',
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
client.commands = new Collection();
client.aliases = new Collection();
client.player = player;
client.cooldowns = new Collection();
client.giveawaysManager = manager;
client.gatilhos = new Collection()

//arquivos
require('../reply/reply.js');


const { loadCommand } = require('./handler/handler.js')

loadCommand(client.commands, client.aliases, 'comando de nº{number} carregado: ${cmd}')

//carregar os arquivos aqui
require('./loader/event.js')(client)

require('./loader/db.js')(client)

require('./hanaPlayers/player.js')(client)

require('./loader/db2.js')(client)

//https://github.com/yADGithub foi onde eu peguei o handler de eventos e a db.js :)
client.login(token).catch(err => {
    console.log(err.code)
    })