const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    let user = message.mentions.users.first()

    if(!user) return message.inlineReply(`Mencione o usuário para ser banido`)

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.inlineReply(`Você não tem permissão de \`Banir Membros\``)

    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.inlineReply(`eu não tenho permissão de \`Banir Membros\``)

    //if(!user.bannable) return message.inlineReply(`Esse membro não pode ser banido`)

    message.inlineReply(`Olá ${message.author}, você está prestes a banir um usuário, você realmente quer banir esse usuário? Se sim clique na reação abaixo`).then(msg => {
        msg.react('✅')

        const collector = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '✅' && x.id == message.author.id, {max: 1, time: 60000})

        collector.on('collect', async (r) => {
            msg.channel.send(`:no_entry_sign: | o usuário foi banido ninguém mandou quebrar as regras`)

            message.guild.members.ban(user)
        })
    })


}
exports.config = {
    name: 'ban',
    aliases: ['banir'],
    category: 'mod'
}
