const Discord = require('discord.js');
const config = require('../../config.json');

exports.run = async (client, message, args) => {
    
    let svPing = Date.now() - message.createdTimestamp
    
    message.inlineReply('Ping?').then(msg => {
    
    msg.edit(`🏓 **|** ${message.author} pong\n:satellite: **|** **Shards:**(${message.guild.shard.id}/${config.shards})\n:stopwatch: **|** Latência da API: ${svPing}\n:zap: **|** Ping: ${client.ws.ping}`)
        });
    }
exports.config = {
    name: 'ping',
    aliases: ['pingar']
}
