const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    let user = message.mentions.users.first()

    if(!user) return message.inlineReply(`Mencione o usuário para ser banido`)

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.inlineReply(`Você não tem permissão de \`Expulsar Membros\``)

    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.inlineReply(`eu não tenho permissão de \`Expulsar Membros\``)

    if(user.id === message.author.id) return message.inlineReply(`Você não pode se expulsar`)
    if(user.id === '795076645827903569') return message.inlineReply(`Você não pode me expulsar, se quiser me tirar me expulse sem usar os meus comandos`)

    message.inlineReply(`Olá ${message.author}, você está prestes a expulsar um usuário, você realmente quer expulsar esse usuário? Se sim clique na reação abaixo`).then(msg => {
        msg.react('✅')

        const collector = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '✅' && x.id == message.author.id, {max: 1, time: 60000})

        collector.on('collect', async (r) => {
            msg.channel.send(`:no_entry_sign: | o usuário foi expulso ninguém mandou quebrar as regras`)

            message.mentions.members.first().kick()
        })
    })

}
exports.config = {
    name: 'kick',
    aliases: ['expulsar', 'expulsa'],
    category: 'moder'
}