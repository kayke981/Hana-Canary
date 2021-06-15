exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.inlineReply(`Você precisa da permissão \`Banir membros\``)
     if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.inlineReply(`Eu preciso da permissão \`Banir membros\``)
    let user = message.mentions.users.first();
    let days = args[1];
    let reason = (!isNaN(days)?args.slice(2).join(" "):args.slice(1).join(" "))
    
    if(!isNaN(args[0])) {
        user = await client.users.fetch(args[0]);
        }
    if(!user) return message.inlineReply(`Mencione ou coloque o ID do usuário`)
   if(!isNaN(args[1])) {

       message.inlineReply(`Você tem certeza que quer banir o usuário (\`${user.tag}/${user.id}\`)?`).then(msg => {
           msg.react("✅")
           
           const co = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '✅' && x.id === message.author.id, {time: 60000, max: 1})
           
           co.on('collect', async (u, r) => {
       if(!reason) {
           reason = `Não informado`
       }
       message.guild.members.ban(user, {days: days,reason: `banido por ${message.author.tag}, motivo: ${reason}`})
               msg.delete()
               
               message.inlineReply(`Usuário banido, quebrou as regras, levou ban ¯\\_(ツ)\_/¯`)
               })
           })
   } else if(isNaN(args[1])) {
       message.inlineReply(`Você tem certeza que quer banir o usuário (\`${user.tag}/${user.id}\`)?`).then(msg => {

           msg.react("✅")

           

           const co = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '✅' && x.id === message.author.id, {time: 60000, max: 1})
           co.on('collect', async (u, r) => {
       if(!reason) {
           reason = `Não informado`
       }
       message.guild.members.ban(user, {reason: `banido por ${message.author.tag}, motivo: ${reason}`})
               msg.delete()
               
               message.inlineReply(`Usuário banido, quebrou as regras, levou ban ¯\\_(ツ)\_/¯`)
               })
           })
       }
}
exports.config = {
    name: "ban",
    aliases: ['banir', 'hackban']
    }