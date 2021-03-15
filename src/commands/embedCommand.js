const Discord = require('discord.js'); 
exports.run = async (client, message, args) => { 
    
const canal = new Discord.MessageEmbed() 
.setDescription(`**qual o canal você quer?**`) 
.setColor('#B600FF') 

const título = new Discord.MessageEmbed() 
.setDescription(`**qual título vc quer?**`) 
.setColor('#B600FF') 

const descrição = new Discord.MessageEmbed() 
.setDescription(`**qual descrição você quer?**`) 
.setColor('#B600FF') 

message.inlineReply(canal).then(msg1 => { 
    let canalC = message.channel.createMessageCollector(c => c.author.id === message.author.id, {max: 1, time: 60000}) 
    
canalC.on('collect', async (msg) => {	
    
let channel = msg.mentions.channels.first();	
if (!channel) return message.channel.send('mencione o canal'); 
    
    msg1.channel.send(título).then(msg2 => {
        
let cana = message.channel.createMessageCollector(v => v.author.id === message.author.id, {max: 1, time: 60000})
cana.on('collect', async (msg3) => { 
    
let title = msg3.content; 
    
msg2.channel.send(descrição).then(msg3 => { 
    
let can = message.channel.createMessageCollector(b => b.author.id === message.author.id, {max: 1, time: 60000})
can.on('collect', async (msg4) => {
    
let description = msg4.content; 
const mandar = new Discord.MessageEmbed() 
.setTitle(`${title}`) 
.setDescription(`${description}`) 
.setColor('#B600FF') 
channel.send(mandar) 
});
});
});
}); 
}); 
});
}
exports.config = { 
name: 'embed', 
aliases: ['anuncio', 'anúncio', 'news', 'novidades']
}
