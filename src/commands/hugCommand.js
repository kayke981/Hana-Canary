const {MessageEmbed} = require('discord.js');
const Client = require('nekos.life');
const {color} = require('../config/json/config.json');


exports.run = async (client, message, args) => { 

    let {sfw} = new Client();

    let hug = await sfw.hug();

    let clicar = await sfw.hug();

    let users = message.mentions.users.first()

    const abraço = new MessageEmbed()
    .setDescription(` **${message.author} abraçou ${users}** `)
    .setColor(color)
    .setImage(hug.url)
    .setFooter(`clique em 🔄 para retribuir`)
    

    if(!users) return message.inlineReply(`Lembre-se de mencionar alguém para abraçar alguém`)
    if(users.id === client.user.id) return message.inlineReply(abraço)
    if(users.id === `${message.author.id}`) return message.inlineReply(abraço)

    



    const retribuido = new MessageEmbed()
    .setDescription(`**${message.mentions.users.first()} abraçou ${message.author}**`)
    .setImage(clicar.url)
    .setColor(color)

    message.inlineReply(abraço).then(msg => {
        msg.react('🔄')
        const devolta = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '🔄' && x.id == message.mentions.users.first(), {max: 1, time: 30000})
        devolta.on('collect', async (r) => {
            msg.channel.send(retribuido)
        })

    })


}
exports.config = {
    name: 'hug',
    aliases: ['abracar', 'abraca', 'abraçar', 'abraço', 'abraco', 'abraça']
    }