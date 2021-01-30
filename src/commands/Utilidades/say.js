const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    let say = args.join(' ');

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.inlineReply(`Você precisa da permissão \`Administrador\``)
    if(!say) return message.inlineReply(`Escreva algo para falar`)

    message.inlineReply(`${say}\n\n:speaking_head: | *Mensagem enviada por ${message.author}*`)
}
exports.config = {
    name: 'say',
    aliases: ['falar', 'dizer', 'speak', 'tell'],
    category: 'util'
}