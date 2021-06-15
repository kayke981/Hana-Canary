exports.run = async (client, message, args) => {
    if(![
        '392087996821667841', '409710803550208000'].includes(message.author.id)
      ) 
        return;
    let pessoa = message.mentions.users.first() || client.users.cache.get(args[0])
    
    let botban = await client.db.get(`blacklist`)
    
    if(!pessoa) return message.inlineReply(`Mencione ou coloque o ID válido 😡😡😡😡😡😡😡`)
    
    if(botban.includes(pessoa.id)) return message.inlineReply(`O usuário ${pessoa.id}\`(${pessoa.tag})\` está banida de me usar :/`)
    
   let botperm = await client.db.get(`botperm`)
   
   if(!botperm) {
       client.db.push(`botperm`, client.users.cache.get('392087996821667841'))
       }
   
    
    if(botperm.includes(pessoa.id)) return message.inlineReply(`O usuário ${pessoa.id}\`${pessoa.tag}\` ja é especial`)
    
    client.db.push(`botperm`, pessoa.id)
    
    message.inlineReply(`O usuário ${pessoa.id}\`(${pessoa.tag})\` agora é muito especial :33`)
    }
exports.config = {
    name: 'setbotperm',
    aliases: ['sbpm']
}