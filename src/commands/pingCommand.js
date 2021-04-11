const Discord = require('discord.js');
const config = require('../../config.json');

exports.run = async (client, message, args) => {
    
    let svPing = Date.now() - message.createdTimestamp
    
let ping = await client.db.ping()

let shardPing = await client.shard.fetchClientValues('ws.ping', 0)

    message.inlineReply('Ping?').then(msg => {
    
    msg.edit(`🏓 **|** ${message.author} pong\n:satellite: **|** **Shards:**(${message.guild.shard.id}/${config.shards})\n:stopwatch: **|** Latência da API: ${svPing}\n:zap: **|** Ping: ${client.ws.ping}\n🌐 **|** Ping da DataBase:\n📖 **|** ${ping.read}ms read\n✏ **|** ${ping.write}ms write\n🌏 **|** Ping da shard: ${shardPing}ms`) 
});
    }
exports.config = {
    name: 'ping',
    aliases: ['pingar']
}
