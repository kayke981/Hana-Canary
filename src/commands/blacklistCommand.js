const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    
    if(![
        '392087996821667841', '409710803550208000'].includes(message.author.id)
      ) 
        return message.inlineReply(`Apenas para pessoas especiais`)
    
   let botban = await client.db.get(`blacklist`)
   
   if(!botban) {
       client.db.push(`blacklist`, client.user.id)
       }
    
    let pessoa = message.mentions.users.first() || client.users.cache.get(args[0])
    
    if(botban.includes(pessoa.id)) return message.inlineReply(`O usuário ${pessoa.id}\`(${pessoa.tag})\` ja está banido :/`)
    
    let motivo = args.slice(1).join(" ")
    if(!motivo) {
        motivo = "não definido"
        }
    
    if(!pessoa) return message.inlineReply(`Mencione alguem ou coloque o ID`)
    
    if(Number(args[0])) {
    
    if(!pessoa) return message.inlineReply(`Não encontrei um usuário com id \`${args[0]}\``)
        }
    
   await client.db.push(`blacklist`, pessoa.id)
   await client.db.set(`motivo`, motivo)
    
    message.inlineReply(`O usuário ${pessoa.id}\`(${pessoa.tag})\` foi proibido de me usar`)
    
    
    }
exports.config = {
    name: 'addblacklist',
    aliases: ['addbl']
    }
