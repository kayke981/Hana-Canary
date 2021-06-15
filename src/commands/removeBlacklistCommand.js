exports.run = async (client, message, args) => {

    if(!
      [
        '392087996821667841',
        '409710803550208000'
    ].includes(message.author.id)) return message.inlineReply(`Apenas para pessoas especiais`)

    let pessoa = message.mentions.users.first() || client.users.cache.get(args[0])
    
    let botban = await client.db.get(`blacklist`)

   if(!botban) {
       client.db.push(`blacklist`, client.user.id)
       }

    if(!botban.includes(pessoa.id)) return message.inlineReply(`O usuário ${pessoa.id}\`(${pessoa.tag})\` não está banido :)`)

    if(!pessoa) return message.inlineReply(`Mencione alguem ou coloque o ID`)

    if(Number(args[0])) {

    if(!pessoa) return message.inlineReply(`Não encontrei um usuário com id \`${args[0]}\``)

        }

   await client.db.pull(`blacklist`, pessoa.id)
    await client.db.delete(`motivo-${pessoa.id}`)

    message.inlineReply(`O usuário ${pessoa.id}\`(${pessoa.tag})\` pode me usar novamente`)

    }
exports.config = {
    name: 'removeblacklist',
    aliases: ['removebl']
    }