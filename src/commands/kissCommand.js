const {MessageEmbed} = require('discord.js');
const Client = require('nekos.life');
const {color} = require('../config/json/config.json');
exports.run = async (client, message, args) => { 
    const {sfw} = new Client()
let kissE = await sfw.kiss();

    let clicar = await sfw.kiss();


    let users = message.mentions.users.first()
    
    if(!users) return message.inlineReply(`Lembre-se de mencionar alguém para beijar alguém`)
    const beijo = new MessageEmbed()
    .setDescription(`:kissing_heart: **${message.author} beijou ${users}** :kissing_heart:`)
    .setColor(color)
    .setImage(kissE.url)
        .setFooter(`clique em 🔄 para retribuir`)
    if(users.id === client.user.id) return message.inlineReply(`Eu não quero te beijar, sou apenas um bot`)
    if(users.id === `${message.author.id}`) return message.inlineReply(beijo)


    const retribuido = new MessageEmbed()
    .setDescription(`:kissing_heart: **${message.mentions.users.first()} beijou ${message.author}** :kissing_heart:`)
    .setImage(clicar.url)
    .setColor(color)

    message.inlineReply(beijo).then(msg => {
        msg.react('🔄')
        const devolta = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '🔄' && x.id == message.mentions.users.first(), {max: 1, time: 30000})
        devolta.on('collect', async (r) => {
            msg.channel.send(retribuido)
        })

    })


}
exports.config = {
    name: 'kiss',
    aliases: ['beijar', 'beijo', 'beija']
    }