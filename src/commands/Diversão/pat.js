const Discord = require('discord.js');
const neko = require('neko.js');

exports.run = async (client, message, args) => { 

    let nekoClient = new neko.Client();

    let igual = await nekoClient.pat();


    let users = message.mentions.users.first()

    const sozinho = new Discord.MessageEmbed()
    .setDescription(` **${message.author} deu um cafuné em ${users}** `)
    .setColor('#B600FF')
    .setImage(igual.url)

    if(!users) return message.inlineReply(`Lembre-se de mencionar alguém para cafuné alguém`)
    if(users.id === '795076645827903569') return message.inlineReply(sozinho)
    if(users.id === `${message.author.id}`) return message.inlineReply(sozinho)

    let pat = await nekoClient.pat();

    let clicar = await nekoClient.pat();


    const cafuné = new Discord.MessageEmbed()
    .setDescription(`**${message.author} deu um cafuné em ${users}**`)
    .setColor('#B600FF')
    .setImage(pat.url)
    .setFooter(`clique em 🔄 para retribuir`)


    const retribuido = new Discord.MessageEmbed()
    .setDescription(`**${message.mentions.users.first()} deu um cafuné em ${message.author}**`)
    .setImage(clicar.url)
    .setColor('#B600FF')

    message.inlineReply(cafuné).then(msg => {
        msg.react('🔄')
        const devolta = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '🔄' && x.id == message.mentions.users.first(), {max: 1, time: 30000})
        devolta.on('collect', async (r) => {
            msg.channel.send(retribuido)
        })

    })


}
exports.config = {
    name: 'pat',
    aliases: ['headpet', 'cafuné', 'cafune', 'headpat'],
    category: 'diver'
}