const user = require('../mongoDB/user.js');
exports.run = async (client, message, args) => {
    
    let data = await user.findOne({User: message.author.id})
    let dataUser = await user.findOne({User: data.CasadoID})
    if(!data) return message.inlineReply(`Você não estava registrado na minha database, use o comando novamente`)
    if(!data.CasadoID) return message.inlineReply(`Você não está casada(o)`)
    
    let userCasado = await client.users.fetch(data.CasadoID)
  
    message.inlineReply(`${message.author}, você tem certeza que quer terminar com **${userCasado.username}/${userCasado.tag}?**`).then(msg => {
        msg.react('💔');
        
        const co = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '💔' && x.id === message.author.id, {time: 60000, max: 1})
        co.on('collect', async (r, u) => {
            msg.delete()
            msg.channel.send(`<@!${data.CasadoID}> ${message.author}, vocês se separaram 😔`)
           await user.findOneAndUpdate({User: message.author.id}, {$set: {
            CasadoID: null
                                                             }})
           await user.findOneAndUpdate({User: data.CasadoID}, {$set: {
            CasadoID: null
                }})
            })
        })
    }
exports.config = {
    name: "divorce",
    aliases: ['divorciar', 'separar']
}