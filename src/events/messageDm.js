const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = async (client) => {
    client.on('message', async (message) => {
    if(message.channel.type !== "DM") return;
    
    const DM = new Discord.MessageEmbed()
    .setAuthor(`Log de dms | ${message.author.tag}(${message.author.id})`, message.author.avatarURL())
 .setDescription(`**mensagem**\n\`||${message.content}||\``)
    .setFooter(`ID ${message.author.id}, tag ${message.author.tag}`)
    .setTimestamp()
    .setColor(config.color)
    client.channels.cache.get("id").send(DM)
    });
    }
//n recomendo por causa do MASS DM
