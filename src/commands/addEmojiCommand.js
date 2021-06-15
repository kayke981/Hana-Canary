const {Util} = require('discord.js')

exports.run = async (client, message, args) => {

    if(! message.member.hasPermission("MANAGE_EMOJIS")) return message.inlineReply(`Você não tem permissão de \`Gerenciar Emojis\``)
    if(! message.guild.me.hasPermission("MANAGE_EMOJIS")) return message.inlineReply(`Eu não tenho permissão de \`Gerenciar Emojis\``)
    
    const emoji = args[0];
    const name = args.slice(1).join(' ');

    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    
    let imageURL = args[0]
    
    if (message.attachments.length) {
      imageURL = message.attachments[0].url;
      name = args[0];
    }
   if(urlRegex.test(args[0])) {
       
       if(!name) return message.inlineReply(`Coloque o nome depois do link`)
          message.guild.emojis.create(imageURL, name).then(emoji => {

  message.channel.send(`${emoji} **|** Emoji adicionado com sucesso`);
}).catch(async (err) => {
              if (err.message.includes('image: File cannot be larger than 256.0 kb')) return message.inlineReply(`Algo deu muito errado, a imagem ou emoji é mais de 256.0 kb`)
              if(err.message.includes('Maximum number of emojis reached')) return message.inlineReply(`Algo deu muito errado, o espaço de emojis antingiu o limite`)
})
} else if(!urlRegex.test(args[0])) {
if (!emoji) return message.inlineReply(`Coloque o emoji, ou link`);

let customemoji = Util.parseEmoji(emoji);
    
    if(!customemoji.id) return message.inlineReply(`Isso não é um emoji válido`)
    
    else if(customemoji.id) {

    const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${

        customemoji.animated ? 'gif' : 'png'

    }`;

let emojiname = (name?name:customemoji.name)

message.guild.emojis.create(Link, emojiname).then(emoji => {

  message.channel.send(`${emoji} **|** Emoji adicionado com sucesso`);
}).catch(async (err) => {
    if (err.message.includes('image: File cannot be larger than 256.0 kb')) return message.inlineReply(`Algo deu muito errado, a imagem ou emoji é mais de 256.0 kb`)
              if(err.message.includes('Maximum number of emojis reached')) return message.inlineReply(`Algo deu muito errado, o espaço de emojis antingiu o limite`)
})
}
}
        }
exports.config = {
    name: "addemoji",
    aliases: ['adicionaremoji']
    }