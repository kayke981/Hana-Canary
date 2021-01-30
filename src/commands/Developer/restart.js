const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (
        ![
            'id'
        ].includes(message.author.id)
    ) 
     return message.inlineReply(`Você não pode usar esse comando`)

     message.inlineReply(`${message.author} você realmente quer me reiniciar? :/`).then(msg => {
         msg.react('✅')

         const collector = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '✅' && x.id == message.author.id, {max: 1, time:6000})
         collector.on('collect', async (r) => {
             await message.channel.send(`ok ;(, reiniciando...`)

             process.exit();
         })
     })
}
exports.config = {
    name: 'restart',
    aliases: ['shutdown', 'restart'],
    category: 'dev'
}
