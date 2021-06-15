const {MessageEmbed} = require('discord.js');
const Client = require('nekos.life');
const {color} = require('../config/json/config.json');

exports.run = async (client, message, args) => { 

    let {sfw} = new Client();

    let pat = await sfw.pat();
    let clicar = await sfw.pat();


    let users = message.mentions.users.first()

    const pete = new MessageEmbed()
    .setDescription(` **${message.author} deu um cafuné em ${users}** `)
    .setColor(color)
    .setImage(pat.url)

    if(!users) return message.inlineReply(`Lembre-se de mencionar alguém para cafuné alguém`)
    if(users.id === client.user.id) return message.inlineReply(pete)
    if(users.id === `${message.author.id}`) return message.inlineReply(pete)


    const retribuido = new MessageEmbed()
    .setDescription(`**${message.mentions.users.first()} deu um cafuné em ${message.author}**`)
    .setImage(clicar.url)
    .setColor(color)

    message.inlineReply(pete).then(msg => {
        msg.react('🔄')
        const devolta = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '🔄' && x.id == message.mentions.users.first(), {max: 1, time: 30000})
        devolta.on('collect', async (r) => {
            msg.channel.send(retribuido)
        })

    })


}
exports.config = {
    name: 'pat',
    aliases: ['headpet', 'cafuné', 'cafune', 'headpat']
    }