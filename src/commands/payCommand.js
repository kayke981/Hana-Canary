const user = require('../mongoDB/user.js');
exports.run = async (client, message, args) => {
    
    let member = message.mentions.users.first()
 
    if(!isNaN(args[0])) { 
        member = await client.users.fetch(args[0])
        }
    if(!member) return message.inlineReply(`Mencione ou coloque o ID do usuário`)
    
    if(member.id === message.author.id) return message.inlineReply(`Você não pode se pagar`)
    
    let amount = args[1]
    if(isNaN(amount)) return message.inlineReply(`Coloque um número válido`)
    
    let data = await user.findOne({ User: message.author.id })
    let dataUser = await user.findOne({ User: member.id })
    if(!data) return message.inlineReply(`Você não estava registrado em minha database, use o comando novamente`)
    if(!dataUser) return message.inlineReply(`O usuário <@!${member.id}>(\`${member.tag}/${member.id}\`) não está registrado na minha database`)
    if(data.Daily < amount) return message.inlineReply(`Você não tem essa quantia`)
let i = 0;
message.inlineReply(`${message.author}, você tem certeza que quer pagar **${amount} créditos** para <@!${member.id}>?\nSe sim, os dois tem que reagir`).then(msg => {
    msg.react("✅")
    
    const co = msg.createReactionCollector((reaction, x) => reaction.emoji.name === "✅" && x.id == message.author.id || x.id == member.id, {time: 60000, max: 2})
    
    co.on('collect', async (u, r) => {
       i++
        if(i >= 2) {
            
          await user.findOneAndUpdate({ User: message.author.id }, {$set: {
                Daily: data.Daily - Number(amount)
            }})
            await user.findOneAndUpdate({ User: member.id }, {$set: {
                Daily: dataUser.Daily + Number(amount)
            }})
            
            message.inlineReply(`${message.author}, **${amount} créditos** foi pago para <@!${member.id}>`)
        }
    })
})
}
exports.config = {
    name: "pay",
    aliases: ['pagar']
    }