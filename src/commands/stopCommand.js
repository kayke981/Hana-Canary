const Discord = require('discord.js');
const {color} = require('../../config.json');

exports.run = async (client, message, args) => {
    
     if(!client.player.isPlaying(message)) return message.inlineReply(`Não estou tocando nada`)
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Você não está no mesmo canal de voz que eu");
    
    const embed = new Discord.MessageEmbed()
    .setDescription(`🔊 **|** **parei com a musica, estou saindo do canal de voz**`)
    .setColor(color)
    
client.player.stop(message)
    
    message.inlineReply(embed)
}
exports.config = {
    name: "stop",
    aliases: ['parar', 'leave', 'dc', 'disconnect', 'desconectar', 'sair']
}