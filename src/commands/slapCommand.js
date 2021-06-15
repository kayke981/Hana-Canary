const {MessageEmbed} = require('discord.js');
const Client = require('nekos.life');
const {color} = require('../config/json/config.json');


exports.run = async (client, message, args) => { 

    let {sfw} = new Client();

    let clicar = await sfw.slap();

    let slap = await sfw.slap();
    


    let users = message.mentions.users.first()


    if(!users) return message.inlineReply(`Lembre-se de mencionar alguém para dar um tapa`)
    const tapa = new MessageEmbed()
    .setDescription(`**${message.author} deu um tapa em ${users}**`)
    .setColor(color)
    .setImage(slap.url)
    .setFooter(`clique em 🔄 para retribuir`)
    if(users.id === client.user.id) return message.inlineReply(tapa)
    if(users.id === `${message.author.id}`) return message.inlineReply(tapa)


    const retribuido = new MessageEmbed()
    .setDescription(`**${users} deu um tapa em ${message.author}**`)
    .setImage(clicar.url)
    .setColor(color)

    message.inlineReply(tapa).then(msg => {
        msg.react('🔄')
        const devolta = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '🔄' && x.id == message.mentions.users.first(), {max: 1, time: 30000})
        devolta.on('collect', async (r) => {
            msg.channel.send(retribuido)
        })

    })


}
exports.config = {
    name: 'tapa',
    aliases: ['slap', 'bater']
    }