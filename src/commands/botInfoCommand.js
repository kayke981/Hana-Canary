const {MessageEmbed} = require('discord.js')
const {color, versão, prefix} = require('../config/json/config.json');
const byteSize = require('byte-size');
const ms = require('pretty-ms');

exports.run = async (client, message, args) => {
 const promises = [ client.shard.fetchClientValues('guilds.cache.size'), 
client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
client.shard.fetchClientValues('ws.ping'),
client.shard.fetchClientValues('uptime'),
client.shard.broadcastEval(`process.cpuUsage().system`),
client.shard.broadcastEval(`process.memoryUsage().rss`)
];

 Promise.all(promises) 	
.then(async results => { 	
	const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0); 	
	const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
     let totalPing = results[2].reduce((acc, ping) => acc + ping, 0);
     let totalUptime = results[3].reduce((acc, uptime) => acc + uptime, 0);
     let totalCpu = results[4].reduce((acc, cpu) => acc + cpu, 0);
     let totalRam = results[5].reduce((acc, ram) => acc + ram, 0)
     
     let kayake = await client.users.fetch("392087996821667841")

    const embed = new MessageEmbed()

    .setTitle(`**BotInfo**`)

    .setDescription('**Olá, me chamo ' + client.user.username + ', sou um bot feito para tentar ajudar a configurar o server :3**\n\n**Minhas informações:**\n**versão:** `' + versão + '`\n**livraria usada:** `Discord.js`\n**feita em:** `node.js`\n**CPU:** `' + byteSize(totalCpu).value + '%`\n**Ram:** `' + byteSize(totalRam).value + byteSize(totalRam).unit + '`\n**Ping:** `' + totalPing + 'ms` \n**Uptime:** `' + ms(totalUptime) + '`\n**Desenvolvedor:**\n> `' + kayake.tag + '`\n\n**obrigada por me adicionar, agora estou com ' + totalGuilds + ' servers e ' + totalMembers + ' usuários \nE obrigada a você <@!' + message.author + '> por me usar**')
    .setColor(color)
    .setFooter(`versão ${versão}`)
    .setTimestamp()

return message.inlineReply(message.author, embed)

}) 	

.catch(console.error);
}
exports.config = {
    name: "botinfo",
    aliases: ["infobot", "informações"]
}