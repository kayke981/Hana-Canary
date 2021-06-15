const {MessageEmbed} = require('discord.js');
const {color} = require('../config/json/config.json');

exports.run = async (client, message, args) => {
  
let user = message.mentions.users.first() || (!isNaN(args[0])? await client.users.fetch(args[0]) : message.author);
    
    let avatar = user.displayAvatarURL({size: 2048, dynamic: true, format: 'png'})
  
  let descrição = user.id === client.user.id? `<:emoji_17:840693502643011594> **| Clique [aqui](${avatar}) para baixar** \n **Eu sei que eu sou linda :3**` : `<:emoji_17:840693502643011594> **| Clique [aqui](${avatar}) para baixar**`
      
 let embed = new MessageEmbed() 
    .setColor(color) 
    .setTitle(`Avatar de ${user.username}`) 
  .setDescription(descrição)
 .setImage(avatar)
    .setFooter(`Autor: ${message.author.tag}`);

 await message.inlineReply(embed); 

    }
exports.config = {
    name: 'avatar',
    aliases: ['avata', 'avat']
}