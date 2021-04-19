const Discord = require('discord.js');
const ms = require('ms')
const {color} = require('../../config.json');

exports.run = async (client, message, args) => {
  
    let canal = (client.channels.cache.size > 2?client.channels.cache.map((a) => a)[2]:message.channel)
    
    const embed = new Discord.MessageEmbed()
    .setTitle(`**Ajuda giveaway**`)
    .setDescription('**Tipo de comandos giveaway**\n\n**giveaway start:** para começar um sorteio\n**Como usar:**\n`giveaway start <tempo> <numero de ganhadores> [canal] <preço>`\n**Exemplo:** `giveaway start 1d 1` <#' + canal + '> `Um cargo legal`\n**Tempo:** `d` para dia, `h` para horas, `m` para minutos, `s` para segundos\n**Exemplo:**\n`giveaway start 1d 1` <#' + canal + '> `Um nitro`\n**giveaway stop:** para terminar um sorteio\n**Como usar:** `giveaway stop <id da mensagem do sorteio>`\n**Exemplo:** `giveaway stop 832696485740937226`\n**giveaway reroll:** para você rolar o sorteio de novo e cair outra pessoa\n**Como usar:** `giveaway reroll <id da mensagem do sorteio>`\n**Exemplo:** `giveaway reroll 832696485740937226`\n\n**Argumentos**\n`<>` -> **Argumento obrigatório**\n`[]` -> **Argumento opcional**')
    .setColor(color)
    if(!message.member.hasPermission("ADMINISTRATOR") || (!message.member.hasPermission("MANAGE_MESSAGES"))) return message.inlineReply('Você tem q ter a permissão `Administrador` ou `Gerenciar Mensagens`');
    if(!args[0] || (args[0] !== 'start' && args[0] !== 'reroll' && args[0] !== 'stop')) return message.inlineReply(message.author, embed)
    if(args[0] === 'start' || args[0] === 'começar') {
    let time = args[1];
        if(!time || isNaN(ms(time)))  return message.inlineReply(`Coloque um tempo valido, exemplo 1d, d para dias, h para horas, m para minutos, s para segundos`)
        if(!time.includes('d') && (!time.includes('h')) && (!time.includes('m')) && (!time.includes('s'))) return message.inlineReply('Coloque `d` para dias, `h` para horas, `m` para minutos, `s` para segundos')
        let winner = args[2];
        if(isNaN(winner) || (parseInt(winner) <= 0)) return message.inlineReply(`Coloque o numero de ganhadores valido, exemplo: 1`)
        let channel = message.mentions.channels.first() || (!isNaN(args[3])? await message.guild.channels.cache.get(args[4]).messages.channel:message.channel)
        let prize = args.slice(4).join(" ")
        if(!args[4]) {
            prize = args.slice(3).join(" ");
        }
        if(!prize) return message.inlineReply(`Coloque o preço do sorteio`)
client.giveawaysManager.start(channel, {
    time: ms(time),
    prize: prize,
    winnerCount: parseInt(winner),
    hostedBy: message.author,
    messages: {
        giveaway: '🎉🎉 **Sorteio Começou** 🎉🎉',
        giveawayEnded: '🎉🎉 **Sorteio terminou** 🎉🎉',
        timeRemaining: 'Tempo faltando: **{duration}**!',
        inviteToParticipate: 'Reaga com 🥳 para participar',
        winMessage: 'Parabéns, {winners}! Você ganhou **{prize}**!\n{messageURL}',
        embedFooter: 'Sorteios',
        noWinner: 'Sorteio foi cancelado por não ter um número de participantes válido',
        hostedBy: 'Feito por: {user}',
        winners: 'ganhador(es)',
        endedAt: 'Acaba em',
        units: {
            seconds: 'segundos',
            minutes: 'minutos',
            hours: 'horas',
            days: 'dias',
            pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
        }
    }


});
           }
    if(args[0] === 'reroll') {
        
        let messageID = args[1]
        client.giveawaysManager.reroll(messageID, {
        messages: {
            congrat: ':tada: Novo(s) ganhador(es) : {winners}! Congratulations!\n{messageURL}',
            error: 'Sem participantes válidos, não tem como usar esse comando'
        }
    })
    .catch((err) => {
        message.channel.send(`O id da mensagem \`${messageID}\` não foi encontrado`);
    });
    }
    if(args[0] === 'end' || args[0] === 'terminar') {
        let messageID = args[1];
        
        client.giveawaysManager.delete(messageID).then(() => {

            message.channel.send('Sorteio foi deletado com sucesso');
        })
        .catch((err) => {
            message.channel.send(`O id da mensagem \`${messageID}\` não foi encontrado`);
        });
    
    }
}
exports.config = {
 name: "giveaway",
 aliases: ['sorteio']
}
