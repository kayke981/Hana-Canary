const Discord = require('discord.js');
const DIG = require('discord-image-generation');

exports.run = async (client, message, args) => {

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

  let img = await new DIG.Wanted().getImage(avatar, '$');

  let attach = new Discord.MessageAttachment(img, "wanted.png");

  message.inlineReply(attach)

}
exports.config = {
  name: 'wanted',
  aliases: ['procurado'],
  category: 'diver'
}