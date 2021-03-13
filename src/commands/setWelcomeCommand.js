const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILDS")) return message.inlineReply(`Você não tem permissão de \`Gerencia Servidor\``)
    let channel = message.mentions.channels.first()
    
    if(Number(args[0])) {
        channel = client.channels.cache.get(args[0])
        
        if(!message.guild.channels.cache.find((b) => b.id === args[0])) return message.inlineReply(`Não achei um canal com o ID \`${args[0]}\``)
        }
    if(!channel) return message.inlineReply(`Mencione ou coloque o ID do canal`)
    
    client.db.set(`welcome-${message.guild.id}`, channel.id)
    
    await message.inlineReply(`Pronto, agora irei notificar quando alguem entrar no servidor, irei notificar no canal ${channel.id}\`(${channel.name})\``)
    }
exports.config = {
    name: 'setwelcome',
    aliases: ['setentrada', 'stwl']
}
