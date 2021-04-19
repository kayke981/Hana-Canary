const Discord = require('discord.js');
const {color, prefix} = require('../../config.json');

exports.run = async (client, message, args) => {
    
    const embed = new Discord.MessageEmbed()
    .setTitle('**Ajuda música**')
    .setDescription('**Tipo de comandos misc**\n\n**misc pause:** pause a música\n**Como usar:** `pause`\n**misc resume:** despause a música\n**Como usar:** `despause`\n**Como usar:** `resume`\n**misc volume:** aumente ou abaixe o volume da música\n**Como usar:** `volume <volume que você quer>`\n**Exemplos:** `volume 50`\n**misc loop:** deixar a música em loop\n**Como usar:** `loop`\n\n**Argumentos**\n`<>` -> **Argumento obrigatório**\n`[]` -> **Argumento opicional**')
 .setColor(color)
    
    if(!args[0] || (args[0] !== 'pause' && args[0] !== 'resume' && args[0] !== 'volume' && args[0] !== 'loop')) return message.inlineReply(message.author, embed)

    if(args[0] === 'pause' || args[0] === 'pausa') {
        
        const embed = new Discord.MessageEmbed()
        .setDescription(`▶️ **|** **a música foi pausada** \`[ ${message.author.tag}/${message.author.id} ]\``)
        .setColor(color)
    if(!client.player.isPlaying(message)) return message.inlineReply(`Não estou tocando nada`)
        if(client.player.getQueue(message).paused) return message.inlineReply(`A música já está pausada`)
if(message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("Você não está no mesmo canal de voz que eu");
        
        client.player.pause(message)
        
        message.inlineReply(message.author, embed)
    }
    if(args[0] === 'resume' || args[0] === 'despause') {
     
              const embed = new Discord.MessageEmbed()

        .setDescription(`⏸ **|** **a música foi despausada** \`[ ${message.author.tag}/${message.author.id} ]\``)
        .setColor(color)

    if(!client.player.isPlaying(message)) return message.inlineReply(`Não estou tocando nada`)
        
        if(!client.player.getQueue(message).paused) return message.inlineReply(`A música ja está despausada`)

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
        if(message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel) return message.channel.send("Você não está no mesmo canal de voz que eu")
        const loopMessageOn = new Discord.MessageEmbed()
        .setDescription(`🔄 **|** A [${client.player.getQueue(message).playing.title}](${client.player.getQueue(message).playing.url}) está em loop`)
        .setColor(color)
        const loopMessageOff = new Discord.MessageEmbed()
        .setDescription(`🔄 **|** A [${client.player.getQueue(message).playing.title}](${client.player.getQueue(message).playing.url}) não está em loop mais`)
        .setColor(color)
        
        if (client.player.getQueue(message).repeatMode) {

        client.player.setRepeatMode(message, false);

        return message.inlineReply(message.author, loopMessageOff);

    } else {

        client.player.setRepeatMode(message, true);

        return message.inlineReply(message.author, loopMessageOn);

    };
    }
}
exports.config = {
    name: "misc",
    aliases: ['music', 'música', 'musica', 'msc']
}
