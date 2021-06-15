const ms = require('pretty-ms');
const {color, versão, shards} = require('../config/json/config.json');
const {MessageEmbed} = require('discord.js');
const byteSize = require('byte-size');

exports.run = async (client, message, args) => {
    
    let promise = [
        client.shard.fetchClientValues('ws.ping'),
client.shard.fetchClientValues('uptime'),
    ];
    Promise.all(promise)
    .then(async results => {
        let Ping = results[0].reduce((acc, pingTotal) => acc + pingTotal, 0);
        let uptime = results[1].reduce((acc, uptimeTotal) => acc + uptimeTotal, 0);
        let description = "";
        for(let i = 0;i < 1;i++) {
        let uptime0 = await client.shard.fetchClientValues('uptime', i)
                     let ping0 = await client.shard.fetchClientValues('ws.ping', i);
                     let guilds = await client.shard.fetchClientValues('guilds.cache.size', i);
                     let users = await client.shard.fetchClientValues('users.cache.size', i);
            let cpuUsageUser = await client.shard.broadcastEval(`process.cpuUsage().user`, i);
            let cpuUsageSystem = await client.shard.broadcastEval(`process.cpuUsage().system`, i);
            let memoryUsageRss = await client.shard.broadcastEval(`process.memoryUsage().rss`, i)
            
            let memoryUsageExternal = await client.shard.broadcastEval(`process.memoryUsage().external`, i)
            
                  description += `**[Shard ${i}]**\n\`ping ${ping0}ms | uptime ${ms(uptime0)}\`\n\`servidores ${guilds} | users ${users}\`\n\`cpu user ${byteSize(cpuUsageUser).value}% | cpu system ${byteSize(cpuUsageSystem).value}%\`\n\`ram rss ${byteSize(memoryUsageRss).value}${byteSize(memoryUsageRss).unit} | ram external ${byteSize(memoryUsageExternal).value}${byteSize(memoryUsageExternal).unit}\`\n`   
        }
        const embed = new MessageEmbed()
        .setTitle(`**ShardInfo**`)
        .setDescription(description)
        .setThumbnail('https://cdn.discordapp.com/attachments/795130563916595270/838840049893244948/pngtree-server-data-storage-cloud-files-blue-dotted-line-line-icon-png-image_1620207.jpg')
        .setColor(color)
        .setFooter('Versão ' + versão + ' shards ' + shards)
        .setTimestamp()
        
        message.inlineReply(message.author, embed)
    })
}
exports.config = {
    name: "shardinfo",
    aliases: ["shards", "shardi", "shi"]
}