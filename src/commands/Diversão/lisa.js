const Discord = require('discord.js');
const DIG = require('discord-image-generation');

exports.run = async (client, message, args) => {
    let fala = args.join(' ')

    if(!fala) message.inlineReply(`Escreva algo`)

    if(fala.lenght > 300) return message.inlineReply(`Uma frase menos de 300 caracteres`)

    const img = await new DIG.LisaPresentation().getImage(fala)

    let attach = new Discord.MessageAttachment(img, "lisa.png")
    message.inlineReply(attach)
}
exports.config = {
    name: 'lisa',
    aliases: ['lisaay', 'lisafala'],
    category: 'diver'
}