exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.inlineReply(`Você precisa da permissão \`Expulsar membros\``)
     if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.inlineReply(`Eu preciso da permissão \`Expulsar membros\``)
    let user = message.mentions.users.first();
    let reason = args.slice(1).join(" ")
    
    
    if(!isNaN(args[0])) {
        user = await message.guild.members.cache.get(args[0]);
        }
    if(!user) return message.inlineReply(`Mencione ou coloque o ID do usuário desse servidor`)

       message.inlineReply(`Você tem certeza que quer expulsar o usuário (\`${user.tag}/${user.id}\`)?`).then(msg => {
           msg.react("✅")
           
           const co = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '✅' && x.id === message.author.id, {time: 60000, max: 1})
           
           co.on('collect', async (u, r) => {
       if(!reason) {
           reason = `Não informado`
       }
       message.guild.members.kick(user, `expulso por ${message.author.tag}, motivo: ${reason}`)
               msg.delete()
               
               message.inlineReply(`Usuário expulso, quebrou as regras, expulso ¯\\_(ツ)\_/¯`)
               })
           })
           }
exports.config = {
    name: "kick",
    aliases: ['expulsar']
    }