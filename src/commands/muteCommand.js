exports.run = async (client, message, args) => {

    let check = message.guild.roles.cache.find(r => r.name === 'Muted');

    let member = message.mentions.members.first()

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.inlineReply(`Você não tem permissão de \`Gerenciar Servidor\``)
    if(!message.guild.me.hasPermission("MANAGE_GUILDS")) return message.inlineReply(`Eu não tenho permissão de \`Gerenciar Servidor\``)
    
    let user = message.mentions.users.first()

    if(!user) return message.inlineReply(`Mencione o usuário`)
    if(member.roles.cache.get(check.id)) return message.inlineReply(`O usuário já está mutado`)
    if(!message.guild.roles.cache.filter(m => m.name === 'Muted')) {
        message.guild.roles.create({ data: { name: 'Muted', permissions: [] } });

    }

    if(user.id === message.author.id) return message.inlineReply(`Você não pode se mutar`)

    message.inlineReply(`Olá ${message.author}, você está prestes a mutar um usuário, você realmente quer mutar esse usuário? Se sim clique na reação abaixo`).then(msg => {

        msg.react('✅')

        const aceitar = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '✅' && x.id == message.author.id, {max: 1, time: 6000})

        aceitar.on('collect', async (r) => {
            const role = message.guild.roles.cache.find(x => x.name === 'Muted');

        message.mentions.members.first().roles.add(role);

        msg.channel.send(`:no_entry_sign: | o usuário foi mutado ninguém mandou quebrar as regras`)
        })
    })
}
exports.config = {
    name: 'mute',
    aliases: ['mutar']
}