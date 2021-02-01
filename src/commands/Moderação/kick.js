const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    let member = message.mentions.members.first()

    if(Number(args[0])) {
        member = message.guild.members.cache.get(args[0])

            if(!message.guild.members.cache.find((m) => m.user.id === args[0])) return message.inlineReply(`O usuário não existe nesse servidor!`)

    }

    if(!member) return message.inlineReply(`Mencione/ID o usuário para ser expulso`)

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.inlineReply(`Você não tem permissão de \`Expulsar Membros\``)

    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.inlineReply(`eu não tenho permissão de \`Expulsar Membros\``)

    if(member.id === message.author.id) return message.inlineReply(`Você não pode se expulsar`)
    if(member.id === '795076645827903569') return message.inlineReply(`Você não pode me expulsar, se quiser me tirar me expulse sem usar os meus comandos`)

    message.inlineReply(`Olá ${message.author}, você está prestes a expulsar um usuário, você realmente quer expulsar esse usuário? Se sim clique na reação abaixo`).then(msg => {
        msg.react('✅')

        const collector = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '✅' && x.id == message.author.id, {max: 1, time: 60000})

        collector.on('collect', async (r) => {
            msg.channel.send(`:no_entry_sign: | o usuário foi expulso ninguém mandou quebrar as regras`)

            message.mentions.members.first() || message.guild.members.cache.get(args[0]).kick()
        })
    })

}
exports.config = {
    name: 'kick',
    aliases: ['expulsar', 'expulsa'],
    category: 'moder'
}