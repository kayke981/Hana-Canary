const Discord = require('discord.js');
const config = require('../../config.json');

exports.run = async (client, message, args) => {
  
let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author

let avatar = user.avatarURL({size: 4096, dynamic: true, format: 'png'})
  
  let descrição = `**Clique [aqui](${avatar}) para baixar**`

  if(user.id.includes(client.user.id)) {
  descrição = `**Clique [aqui](${avatar}) para baixar** \n **Eu sei que eu sou linda :3**`;
      }

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
