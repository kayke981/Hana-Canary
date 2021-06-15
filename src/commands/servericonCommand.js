const {MessageEmbed} = require('discord.js');
const {color} = require('../config/json/config.json');
exports.run = async (client, message, args) => {
    let server = await client.guilds.cache.get(args[0]) || message.guild;
    if(!server) return message.inlineReply(`Não encontrei o server com o ID \`${args[0]}\``)
    if(!server.iconURL()) return message.inlineReply(`O servidor não tem um Icone`)
    const embed = new MessageEmbed()
    .setTitle(server.name)
.setDescription(`<:emoji_19:840737153729429524> **|** **Clique [aqui](${server.iconURL({dynamic: true, size: 2048, format: 'png'})}) para baixar**`)
    .setImage(server.iconURL({dynamic: true, size: 2048, format: 'png'}))
    .setColor(color)
    message.inlineReply(message.author, embed)
}
exports.config = {
    name: "servericon",
    aliases: ["iconserver"]
    }