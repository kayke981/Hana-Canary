const {MessageAttachment, Util} = require('discord.js');
const petPetGif = require('pet-pet-gif')
exports.run = async (client, message, args) => {
    
    const emoji = args[0];
let delay = 40
   let user = message.mentions.users.first() || (!isNaN(args[0])?await client.users.fetch(args[0]):message.author)

    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

    

    let imageURL = args[0]

    

    if (message.attachments.length) {

      imageURL = message.attachments[0].url;

    }

   if(urlRegex.test(args[0])) {

      
    
let animatedGif = await petPetGif(imageURL, {
            delay: delay
});

       const attachment = new MessageAttachment(animatedGif, 'petpet.gif');

message.inlineReply(message.author, attachment);
       } else if(!urlRegex.test(args[0]) && emoji && emoji.includes('<:')) {
           
let customemoji = Util.parseEmoji(emoji);

    

    
    if(customemoji.id) {

    const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${

        customemoji.animated ? 'gif' : 'png'
}`;
    let animatedGif = await petPetGif(Link, {
            delay: delay
});
     const attachment = new MessageAttachment(animatedGif, 'petpet.gif');
message.inlineReply(message.author, attachment);   
    } 
    } else {
        let animatedGif = await petPetGif(user.displayAvatarURL({dynamic: true, format: 'png'}), {
            delay: delay
});
        
        const attachment = new MessageAttachment(animatedGif, 'petpet.gif');
message.inlineReply(message.author, attachment);   
        }
    }
exports.config = {
    name: "petpet",
    aliases: []
    }