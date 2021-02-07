const Discord = require('discord.js');
const moment = require('moment'); 

exports.run = async (client, message, args) => {
   
    
    let user = message.mentions.users.first() || message.author
    
     let userCreate = moment(user.createdAt).format('LLLL')
     
     
     
    
    moment.locale('pt-br')
    
    
    
    
    if(Number(args[0])) {
        user = await client.users.fetch(args[0])
        }
    
    const sem = new Discord.MessageEmbed()
    .setTitle(`**${user.username}**`)
    .setDescription(`**TAG**\n\`${user.tag}\`\n**ID**\n\`${user.id}\`\n**Conta criada em:**\n\`${userCreate}\``)
    .setColor('#B600FF')
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setFooter(`Informações do ${user.tag}`)
    .setTimestamp()
    
    if(Number(args[0])) {
       
        if(!message.guild.members.cache.find((m) => m.user.id === args[0])) return message.inlineReply(sem)
        }
    
    if(!user) return message.inlineReply(`:x: | Não encontrei este usuário`)
  
    
    let userJoinedAt = moment(message.guild.member(user).joinedAt).format('LLLL')
    
    const embed = new Discord.MessageEmbed()
    .setTitle(`**${user.username}**`)
    .setDescription(`**TAG**\n\`${user.tag}\`\n**ID**\n\`${user.id}\`\n**Conta criada em:**\n\`${userCreate}\`\n**Entrou em:**\n\`${userJoinedAt}\``)
    .setColor('#B600FF')
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setFooter(`Informações do ${user.tag}`)
    .setTimestamp()
    
    
    
    message.inlineReply(embed)
}
exports.config = {
    name: 'userinfo',
    aliases: ['sobreconta', 'infoconta', 'infoaccount', 'user'],
    category: 'util'
}
