const {versão} = require('../config/json/config.json');
const {brightRed} = require('colors');
const ms = require('pretty-ms');

module.exports = (client) => {
    
client.once('ready', async () => {
    
    if(!client.shard === null) return;
    setInterval(async () => {
        
        
        //let totalUptime = await Number(client.shard.fetchClientValues('uptime', 0)) + await Number(client.shard.fetchClientValues('uptime', 1)) + await Number(client.shard.fetchClientValues('uptime', 2));
        
        let user = await client.users.fetch("392087996821667841")
            
const status = [ 
    {name: `😁 alegria pelo ar || shard ${client.shard.ids} [${client.guilds.cache.size}]`, type: 'PLAYING'}, 
    {name: `🤓 meu criador me fazendo || shard ${client.shard.ids} [${client.guilds.cache.size}]`, type: 'WATCHING'}, 
    {name: `⚙ versão ${versão} || shard ${client.shard.ids} [${client.guilds.cache.size}]`, type: 'LISTENING'},
    {name: `🗂 com ${client.commands.size} comandos || shard ${client.shard.ids} [${client.guilds.cache.size}]`, type: 'PLAYING'},
    {name: `💤 estou acordada desde de ${ms(client.uptime)} || shard ${client.shard.ids} [${client.guilds.cache.size}]`, type: 'PLAYING'},
    {name: `📡 ping ${client.ws.ping}ms || shard ${client.shard.ids} [${client.guilds.cache.size}]`, type: 'PLAYING'},
    {name: `🤔 nome do meu criador é ${user.tag} || shard ${client.shard.ids} [${client.guilds.cache.size}]`, type: 'WATCHING'},
    {name: `🌎 shardID: ${client.shard.ids} [${client.guilds.cache.size}]`, type: 'PLAYING'},
    {name: `🐱 meu repositório: https://github.com/kayke981/Hana-Canary || shard ${client.shard.ids}[${client.guilds.cache.size}]`, type: 'LISTENING'}
] 
function Presence() { 
        const base = status[Math.floor(Math.random() * status.length)] 
        client.user.setActivity(base)
    } 
    Presence();
    }, 2520)
  		client.user.setStatus('online').catch(console.error);	console.log(brightRed(`---------------------------[CONNECTED]---------------------------`));
        });
          };
