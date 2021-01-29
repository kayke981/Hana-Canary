const Discord = require('discord.js');
 
 module.exports.run = async (client, message, args) => {
let svPing = Date.now() - message.createdTimestamp
const embed = new Discord.MessageEmbed()
   .setColor('#B600FF')
   .setTitle("<a:carregando_1:783026280126742538> | Ping")
   .setDescription(`**\nLatência da API: ${svPing}ms\n\nLatência do Bot: ${client.ws.ping}ms**`)
  

   message.inlineReply(embed);
 }
 exports.config = {
  name: 'ping',
  aliases: ['pingar', 'ms'],
  category: 'util'
  }