const Discord = require('discord.js');
const neko = require('neko.js');

exports.run = async (client, message, args) => { 

    let nekoClient = new neko.Client();

    let igual = await nekoClient.hug();


    let users = message.mentions.users.first()

    const sozinho = new Discord.MessageEmbed()
    .setDescription(` **${message.author} abraçou ${users}** `)
    .setColor('#B600FF')
    .setImage(igual.url)

    if(!users) return message.inlineReply(`Lembre-se de mencionar alguém para abraçar alguém`)
    if(users.id === '795076645827903569') return message.inlineReply(sozinho)
    if(users.id === `${message.author.id}`) return message.inlineReply(sozinho)

    let hug = await nekoClient.hug();

    let clicar = await nekoClient.hug();


    const abraço = new Discord.MessageEmbed()
    .setDescription(`**${message.author} abraçou ${users}**`)
    .setColor('#B600FF')
    .setImage(hug.url)
    .setFooter(`clique em 🔄 para retribuir`)


    const retribuido = new Discord.MessageEmbed()
    .setDescription(`**${message.mentions.users.first()} abraçou ${message.author}**`)
    .setImage(clicar.url)
    .setColor('#B600FF')

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
    aliases: ['abracar', 'abraca', 'abraçar', 'abraço', 'abraco', 'abraça'],
    category: 'diver'
}