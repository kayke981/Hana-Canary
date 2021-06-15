const {MessageEmbed} = require('discord.js');
const {color} = require('../config/json/config.json');

exports.run = async (client, message, args) => {
    
    const entrandoNaCall = new MessageEmbed()
    .setDescription(`**Estou entrando no canal de voz, tenha paciência para eu entrar no canal de voz e tocar algo ou tocar algo da fila, se eu demorar mais de** *20 segundos*, **algo de errado aconteceu, desculpe**`)
    .setColor(color)
    
    const query = args.join(' ');
    
    if(!query) return message.inlineReply('coloque um título ou URL!');
    
    if(!message.member.voice.channel) return message.inlineReply('entre em um canal de voz!')
    
client.player.play(message, query, { firstResult: true });
    
    message.inlineReply(message.author, entrandoNaCall)
}
exports.config = {
    name: "play",
    aliases: ['p', 'tocar']
}
