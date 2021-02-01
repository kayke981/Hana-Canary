const Discord = require('discord.js');
const DIG = require('discord-image-generation');

exports.run = async (client, message, args) => {

    let user = message.mentions.users.first() || message.author;

    let last = message.mentions.users.last()

    if(Number(args[0])) {
        last = client.users.cache.get(args[0])
    }

    if(Number(args[1])) {
        last = client.users.cache.get(args[1])
    }

    if(Number(args[2])) {
        last = client.users.cache.get(args[2])
    }

    if(!last) return message.inlineReply(`Mencione/ID do usuário para bater`)
  
  let primeiro = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

  let segundo = last.avatarURL({ dynamic: true, format: "png", size: 1024 });

  let img = await new DIG.Batslap().getImage(primeiro, segundo);

  let attach = new Discord.MessageAttachment(img, "batslap.png");

  message.inlineReply(attach)
}
exports.config = {
    name: 'batslap',
    aliases: ['btsl'],
    category: 'diver'
}