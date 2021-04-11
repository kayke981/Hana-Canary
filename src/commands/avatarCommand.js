const Discord = require('discord.js');
const config = require('../../config.json');

exports.run = async (client, message, args) => {
  
let user = message.mentions.users.first() || (!isNaN(args[0])? await client.users.fetch(args[0]) : message.author);

let avatar = user.avatarURL({size: 4096, dynamic: true, format: 'png'})
  
  let descrição = user.id === client.user.id? `**Clique [aqui](${avatar}) para baixar** \n **Eu sei que eu sou linda :3**` : `**Clique [aqui](${avatar}) para baixar**`

  let embed = new Discord.MessageEmbed() 
    .setColor(config.color) 
    .setTitle(`Avatar de ${user.username}`) 
  .setDescription(descrição)
 .setImage(avatar)
    .setFooter(`Autor: ${message.author.tag}`);

 await message.channel.send(embed); 

    }
exports.config = {
    name: 'avatar',
    aliases: ['avata', 'avat']
}
