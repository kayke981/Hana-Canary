const {prefix} = require('../config/json/config.json');

 exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.inlineReply(`Você não tem permissão \`Gerenciar Servidor\``)
    if(!message.guild.me.hasPermission("MANAGE_GUILD")) return message.inlineReply(`Eu não tenho permissão de \`Gerenciar Servidor\``)

    
    message.channel.createOverwrite(message.guild.id, { SEND_MESSAGES: false, reason: `comando usado por ${message.author.tag}, ID: ${message.author.id}`})

    message.inlineReply(`:lock: | ${message.author} Canal bloqueado, para desbloquear use ${prefix}unlock`)
};
exports.config = {
    name: 'lock',
    aliases: ['trancar', 'fechar']
    }