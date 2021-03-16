const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    if(![
        '392087996821667841', '409710803550208000'].includes(message.author.id)
      ) 
        return;
    
    let pessoa = message.mentions.users.first() || client.users.cache.get(args[0])
    
    if(!pessoa) return message.inlineReply(`Mencione ou coloque o ID de uma pessoa, obrigada`)

        
   
    
    let perms = await client.db.get(`botperm`)
   if(!perms.includes(pessoa.id)) return message.inlineReply(`O usuário ${pessoa.id}\`(${pessoa.tag})\` não tem perms :|`)
    
    client.db.pull(`botperm`, pessoa.id)
    
    message.inlineReply(`Pronto, o usuário ${pessoa.id}\`(${pessoa.tag})\` não é permitido para usar comandos apenas para devs`)

}
exports.config = {
    name: 'removebotperm',
    aliases: ['removebtpm']
}
