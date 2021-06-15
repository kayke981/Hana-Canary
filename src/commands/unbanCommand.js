exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.inlineReply(`Você precisa da permissão \`Banir membros\``)
     if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.inlineReply(`Eu preciso da permissão \`Banir membros\``)
    let user = message.mentions.users.first();
    let reason = args.slice(1).join(" ")
    
    
    if(!isNaN(args[0])) {
        user = await client.users.fetch(args[0]);
        }
    if(!user) return message.inlineReply(`Mencione ou coloque o ID do usuário`)

       message.inlineReply(`Você tem certeza que quer desbanir o usuário (\`${user.tag}/${user.id}\`)?`).then(msg => {
           msg.react("✅")
           
           const co = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '✅' && x.id === message.author.id, {time: 60000, max: 1})
           
           co.on('collect', async (u, r) => {
       if(!reason) {
           reason = `Não informado`
       }
       message.guild.members.unban(user, `desbanido por ${message.author.tag}, motivo: ${reason}`)
               msg.delete()
               
               message.inlineReply(`Usuário desbanido, não quebre as regras novamente`)
               })
           })
           }
exports.config = {
    name: "desban",
    aliases: ['unban']
    }