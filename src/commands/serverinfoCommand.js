const {MessageEmbed} = require('discord.js');
const {color} = require('../config/json/config.json');
const moment = require("moment")
require("moment-duration-format");
exports.run = async (client, message, args) => {
    moment.locale('pt-br')
    let server = await client.guilds.cache.get(args[0]) || message.guild;
    if(!server) return message.inlineReply(`Eu não estou no servidor com o ID \`${args[0]}\``)
    
    let voiceChannel = await server.channels.cache.filter((c) => c.type == 'voice').size
    let textChannel = await server.channels.cache.filter((c) => c.type == 'text').size
    
    const embed = new MessageEmbed()
    .setTitle(`${server.name}`)
    .setDescription(`**Nome:**\n\`${server.name}\`\n**ID:**\n\`${server.id}\`\n**Shard:**\n\`${server.shard.id}\`\n**Dono:**\n${server.owner}\n(\`${server.owner.user.tag}/${server.owner.id}\`)\n**Região:**\n\`${server.region.replace('brazil', 'brasil')}\`\n**Canais(${textChannel + voiceChannel}):**\n**Texto: ${textChannel}**\n**Voz: ${voiceChannel}**\n**Criado há:**\n\`${moment.duration(Date.now() - server.createdTimestamp).format("y[ anos] M[ meses] d[ dias] h[ horas]")}\`\n**Entrei aqui há:**\n\`${moment.duration(Date.now() - message.guild.members.cache.get(client.user.id).joinedTimestamp).format("y[ anos] M[ meses] d[ dias] h[ horas]")}\`\n**Total de membros:**\n\`${server.memberCount}\``)
    .setColor(color)
    .setImage(message.guild.splashURL({size: 2048, format: 'png'}))
    .setThumbnail(server.iconURL({dynamic: true, size: 2048, format: 'png'}))
    
    message.inlineReply(message.author, embed)
}
exports.config = {
    name: "serverinfo",
    aliases: ["infoserver"]
    }