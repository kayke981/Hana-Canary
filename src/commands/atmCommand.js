exports.run = async (client, message, args) => {
    
    const atm = require('../mongoDB/user.js');

let user = message.mentions.users.first() || (!isNaN(args[0])?await client.users.fetch(String(args[0])):message.author)

if(!user) return message.inlineReply(`O usuário não foi encontrado`)

atm.findOne({ User: user.id }, async(err, data) => {
    
    if(!data) return message.inlineReply(`O usuário <@!${user.id}>(\`${user.tag}/${user.id}\`) não está registrado em minha database`)
    
    let descrip = (args[0]?`${message.author}, <@!${user.id}>(\`${user.tag}/${user.id}\`) tem **${data.Daily} créditos**`:`${message.author}, você tem **${data.Daily} créditos**`)
                   
 message.inlineReply(descrip)
})
}
exports.config = {
    name: "atm",
    aliases: ["bal", "saldo", "créditos", "creditos"]
}