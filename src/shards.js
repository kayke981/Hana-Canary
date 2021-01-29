const { ShardingManager } = require('discord.js');
const colors = require('colors');
const Discord = require('discord.js');

const manager = new ShardingManager('./index.js', {
    
    totalShards: 0,

    token: 'token do bot',

    autoSpawn: true
});

manager.spawn();

manager.on('shardCreate', (shard) => {
    console.log(colors.brightRed(`.----------------------[SHARD CONNECTED]---------------------.
|                   O shard ${shard.id} foi iniciada                   |
'------------------------------------------------------------'`));
});

manager.on('shardCreate', (shard) => {
    const {channel} = require(`./index.js`);
    const webhook = new Discord.WebhookClient('id', 'token');
    
    const embed = new Discord.MessageEmbed()
    .setTitle(`**Hana Canary**`)
    .setDescription(`**[SHARDS] a ${shard.id} foi iniciada**`)
    .setColor(`#FF0000`)
    
    webhook.send(embed)
    });
