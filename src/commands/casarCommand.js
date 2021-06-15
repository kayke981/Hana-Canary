const user = require('../mongoDB/user.js');
exports.run = async (client, message, args) => {
    let use = message.mentions.users.first()
 
    if(!isNaN(args[0])) {
        use = await client.users.fetch(String(args[0]))
        if(!use) return message.inlineReply(`O usuário não existe`)
    }
    if(!use) return message.inlineReply(`Mencione ou coloque o ID do usuário`)
    
    let data = await user.findOne({User: message.author.id})
    let dataUser = await user.findOne({User: use.id})
    if(!data) return message.inlineReply(`O usuário <@!${use.id}>(\`${use.tag}/${use.id}\`) não está registrado em minha database`)

    if(!dataUser) return message.inlineReply(`O usuário <@!${use.id}>(\`${use.tag}/${use.id}\`) não está registrado em minha database`)
    if(data.CasadoID) return message.inlineReply(`Você já está casada(o)`)
    if(dataUser.CasadoID) return message.inlineReply(`O usuário ja está casada(o)`)
    if(use.id === message.author.id) return message.inlineReply(`A vida é triste, eu sei disso, mas você não pode casar com você mesmo :(`)
    if(data.Daily < 7000) return message.inlineReply(`Você não possui **7000 créditos**`)
    if(dataUser.Daily < 7000) return message.inlineReply(`A(o) parceira(o) não tem **7000 créditos**`)
    
    message.inlineReply(`<@!${use.id}>, você quer casar com o ${message.author}`).then(msg => {
        msg.react('💍');
        
        const co = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '💍' && x.id === use.id, {time: 60000, max: 1})
        co.on('collect', async (r, u) => {
            msg.delete()
            msg.channel.send(`<@!${use.id}> ${message.author}, agora vocês estão casados, muitas felicidades e espero que dure bastante`)
            data.CasadoID = use.id
            data.Daily = data.Daily - 7000
            data.CasadoTime = Date.now()
            data.save()
            dataUser.CasadoID = message.author.id
            dataUser.Daily = dataUser.Daily - 7000
            dataUser.CasadoTime = Date.now()
            dataUser.save()
        })
    })
    
}
exports.config = {
    name: "casar",
    aliases: ['marry']
}