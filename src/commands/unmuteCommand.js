exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.inlineReply(`Você não tem permissão de \`Gerenciar Servidor\``)
    if(!message.guild.me.hasPermission("MANAGE_GUILDS")) return message.inlineReply(`Eu não tenho permissão de \`Gerenciar Servidor\``)
    
    let member = message.mentions.users.first()
    
    if(!member) return message.inlineReply(`Mencione alguém para desmutar`)

    
    if(!message.mentions.members.first().roles.cache.some(role => role.name === 'Muted')) return message.inlineReply(`Este usuário não está mutado`)

    
    let cargo = message.guild.roles.cache.find(r => r.name === 'Muted')
    message.mentions.members.first().roles.remove(cargo)

    message.inlineReply(`Usuário desmutado`)



}
exports.config = {
    name: 'unmute',
    aliases: ['desmutar']
    }