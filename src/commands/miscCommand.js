const Discord = require('discord.js');
const {color, prefix} = require('../../config.json');

exports.run = async (client, message, args) => {
    
    if(!args[0]) return message.inlineReply(`${message.author}, tem dois tipos de comandos, ${prefix}misc pause, ${prefix}misc resume`)

    if(args[0] === 'pause' || args[0] === 'pausa') {
        const embed = new Discord.MessageEmbed()
        .setDescription(`▶️ **|** **a música foi pausada** \`[ ${message.author.tag}/${message.author.id} ]\``)
        .setColor(color)
    if(!client.player.isPlaying(message)) return message.inlineReply(`Não estou tocando nada`)
if(message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("Você não está no mesmo canal de voz que eu");
        
        client.player.pause(message)
        
        message.inlineReply(message.author, embed)
    }
    if(args[0] === 'resume' || args[0] === 'despause') {
              const embed = new Discord.MessageEmbed()

        .setDescription(`⏸ **|** **a música foi despausada** \`[ ${message.author.tag}/${message.author.id} ]\``)
        .setColor(color)

    if(!client.player.isPlaying(message)) return message.inlineReply(`Não estou tocando nada`)

if(message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("Você não está no mesmo canal de voz que eu");

        

        client.player.resume(message)

        

        message.inlineReply(message.author, embed)
    }
    if(args[0] === 'volume' || args[0] === 'vol') {
 if(!client.player.isPlaying(message)) return message.inlineReply(`Não estou tocando nada`)
if(message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("Você não está no mesmo canal de voz que eu");
        let volumeArgs = args[1];
        if(!volumeArgs) return message.inlineReply(`Coloque um número de 1 a 150`) 
        if(isNaN(volumeArgs)) return message.inlineReply(`Coloque um número válido`)
        if(volumeArgs < 1 || volumeArgs > 150) return message.inlineReply(`Coloque um número de 1 a 150, o volume ${volumeArgs} não é suportado`)
        const volume = new Discord.MessageEmbed()
        .setDescription(`🔊 **|** **volume foi setado para** \`${volumeArgs}%\``)
        .setColor(color)
        client.player.setVolume(message, parseInt(volumeArgs))
    message.inlineReply(message.author, volume)
    };
    if(args[0] === 'loop') {
        if(!client.player.isPlaying(message)) return message.inlineReply(`Não estou tocando nada`) 
       let loopArgs = args[1];
        if(!loopArgs) return message.inlineReply(`use ${prefix}misc loop <on/off>`)
        if(loopArgs !== 'off' || loopArgs !== 'on') return message.inlineReply('Coloque on ou off')
        if(message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("Você não está no mesmo canal de voz que eu")
        const loopMessage = new Discord.MessageEmbed()
        .setDescription(`A [${client.player.getQueue(message).playing.title}](${client.player.getQueue(message).playing.title}) está com loop ${loopArgs}`)
        .setColor(color)
        
        client.player.setRepeatMode(message, loopArgs.replace('on', false).replace('off', false))
        message.inlineReply(message.author, loopMessage)
    }
}
exports.config = {
    name: "misc",
    aliases: ['music', 'música', 'musica', 'msc']
}