const {Util, MessageAttachment} = require('discord.js');
exports.run = async (client, message, args) => {
    let emoji = args[0]
   
    let emojiInfo = Util.parseEmoji(emoji)
    if(!emojiInfo.id) return message.inlineReply(`Coloque um emoji válido`)
    
    else {
    let url = await message.guild.emojis.cache.get(emojiInfo.id).url
    
    
    let img = new MessageAttachment(url, `${emojiInfo.name}.png`)
    
    message.inlineReply(message.author, img);
        
    }
    }
    exports.config = {
        name: "emoji",
        aliases: ["emj", "emojo"]
        }