const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = async (client, message, args) => {

    let { body } = await superagent.get("https://nekos.life/api/v2/img/slap")

    let img = [
        '001',
        '002',
        '003',
        '004',
        '005',
        '006',
        '007',
        '008',
        '009',
        '010',
        '011',
        '012',
        '013',
        '014',
        '015',
        '016'
    ]

    let random = img[Math.floor(Math.random () * img.length)]

    let users = message.mentions.users.first()

    const bot = new Discord.MessageEmbed()
    .setDescription(`**${users} deu um tapa em ${message.author}**`)
    .setColor(`#B600FF`)
    .setImage(body.url)

    const sozinho = new Discord.MessageEmbed()
    .setDescription(`**${message.author} deu um tapa em ${message.author}**`)
    .setColor('#B600FF')
    .setImage(body.url)

    if(!users) return message.inlineReply(`Mencione alguém para dar tapa`)
    if(users.id === '795076645827903569') return message.inlineReply(bot)
    if(users.id === message.author.id) return message.inlineReply(sozinho)

    const Tapa = new Discord.MessageEmbed()
    .setDescription(`**${message.author} deu um tapa em ${users}**`)
    .setColor('#B600FF')
    .setImage(body.url)
    .setFooter(`clique em 🔄 para retribuir`)

    const retrebuido = new Discord.MessageEmbed()
    .setDescription(`**${message.mentions.users.first()} deu um tapa em ${message.author}**`)
    .setColor('#B600FF')
    .setImage(`https://cdn.nekos.life/slap/slap_${random}.gif`)

    message.inlineReply(Tapa).then(msg => {
        msg.react('🔄')
        const devolta = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '🔄' && x.id == message.mentions.users.first(), {max: 1, time: 30000})
        devolta.on('collect', async (r) => {
            msg.channel.send(retrebuido)
        })
        
    })
}
exports.config = {
    name: 'slap',
    aliases: ['tapinha', 'tapa'],
    category: 'diver'
}