const Discord = require('discord.js');
const neko = require('neko.js');''

exports.run = async (client, message, args) => { 

    let nekoClient = new neko.Client();

    let igual = await nekoClient.kiss();


    let users = message.mentions.users.first()

    const sozinho = new Discord.MessageEmbed()
    .setDescription(`:kissing_heart: **${message.author} beijou ${users}** :kissing_heart:`)
    .setColor('#B600FF')
    .setImage(igual.url)

    if(!users) return message.inlineReply(`Lembre-se de mencionar alguém para beijar alguém`)
    if(users.id === '795076645827903569') return message.inlineReply(`Eu não quero te beijar, sou apenas um bot`)
    if(users.id === `${message.author.id}`) return message.inlineReply(sozinho)

    let kiss = await nekoClient.kiss();

    let clicar = await nekoClient.kiss();


    const beijo = new Discord.MessageEmbed()
    .setDescription(`:kissing_heart: **${message.author} beijou ${users}** :kissing_heart:`)
    .setColor('#B600FF')
    .setImage(kiss.url)


    const retribuido = new Discord.MessageEmbed()
    .setDescription(`:kissing_heart: **${message.mentions.users.first()} beijou ${message.author}** :kissing_heart:`)
    .setImage(clicar.url)
    .setColor('#B600FF')

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
    aliases: ['beijar'],
    category: 'diver'
}