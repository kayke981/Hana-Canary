const {MessageEmbed} = require('discord.js');
const {color} = require('../config/json/config.json');
const moment = require("moment")
require("moment-duration-format")
exports.run = async (client, message, args) => {
    if(!args[0]) return message.inlineReply(`Coloque o código do convite`)
  
    let invi = await client.fetchInvite(args[0])
    
    if(!invi) return message.inlineReply(`Esse convite não existe`)
    message.guild.fetchInvites().then(async invites => {
   let invit = await invites.find((invite) => invite.code === invi.code)
   
    const embed = new MessageEmbed()
    .setTitle(`**${invit.code}**`)
    .setDescription(`**Usuário que criou:**\n\`${invit.inviter.tag}\`\n**Vezes que foram usados:**\n\`${invit.uses}\`\n**Canal:**\n\`${invit.channel.name}\`\n**Criado há:**\n\`${moment.duration(Date.now() - invit.createdTimestamp).format("y[ anos] M[ meses] d[ dias] h[ horas] m[ minutos] s[ segundos]").replace('minsutos', 'minutos')}\``)
    .setColor(color)
    .setImage(message.guild.splashURL({size: 2048, format: 'png'}))
    .setThumbnail(message.guild.iconURL({dynamic: true, size: 2048, format: 'png'}))
    message.inlineReply(message.author, embed)
        })
}
exports.config = {
    name: "inviteinfo",
    aliases: []
    }