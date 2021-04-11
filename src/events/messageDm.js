const Discord = require('discord.js');
const config = require('../../config.json');
const lastMessages = new Map();
module.exports = async (client) => {
    client.on('message', async (message) => {
    if(message.channel.type !== "DM") return;
        
    const lastMessage = lastMessages.get('lastMessage');
        
    if(lastMessages.has('lastMessage')) {
    if(lastMessage.content === message.content) return;
    }
    
    const DM = new Discord.MessageEmbed()
    .setAuthor(`Log de dms | ${message.author.tag}(${message.author.id})`, message.author.avatarURL())
 .setDescription(`**mensagem**\n\`||${message.content}||\``)
    .setFooter(`ID ${message.author.id}, tag ${message.author.tag}`)
    .setTimestamp()
    .setColor(config.color)
    const channel = client.channels.cache.get('id');
        
     if(channel !== undefined || channel !== null) {
     channel.send(DM)
     } else return console.log('id errado')
        
    lastMessages.set('lastMessage', {
    content: message.content
    })
    });
    }
//n recomendo por causa do MASS DM
