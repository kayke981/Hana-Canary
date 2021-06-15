const user = require('../mongoDB/user.js');
exports.run = async (client, message, args) => {
    let frase = args.join(" ")
    if(!frase) return message.inlineReply(`Qual será a sua frase`)
    user.findOne({ User: message.author.id }, async (err, data) => {
           if(!data) return message.inlineReply(`Parece que você não está registrado em minha database, use o comando de novo`)
        data.AboutMe = frase
        data.save()
  
  message.inlineReply(`A sua frase foi trocada para \`${frase.replace('`', '')}\``)
        })
}
exports.config = {
    name: "aboutme",
    aliases: ['sobremim']
}