const {MessageEmbed} = require('discord.js');
const {color} = require('../config/json/config.json');

exports.run = async (client, message, args) => {

if(!client.player.isPlaying(message)) return message.inlineReply(`Não estou tocando nada`)

let i0 = 0; 
let i1 = 10;
 let page = 1; 

let description = `Fila \n\n **Tocando agora** [${client.player.getQueue(message).playing.title}](${client.player.getQueue(message).playing.url})\n\n` + client.player.getQueue(message) 

.tracks.map((track, i) => `**${i + 1}** - [${track.title}](${track.url}) **[ <@!${track.requestedBy.id}>/${track.requestedBy.id} ]**`)
.slice(i0, i1) 
.join("\n");




const embed = new MessageEmbed()

.setDescription(description)
.setColor(color)

let msg = await message.channel.send(embed); 

await msg.react("⬅"); 

await msg.react("➡"); 

await msg.react("❌"); 

let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id );

 collector.on("collect", async (reaction, user) => {
     
 if (reaction._emoji.name === "⬅") {
 if(client.player.getQueue < 0) {
     msg.delete()
 }

 i0 = i0 - 10; 
i1 = i1 - 10; 
page = page - 1; 

if (i0 + 1 < 0) { 
console.log(i0) 
return msg.delete(); 
} 

if (!i0 || !i1) {
 return msg.delete(); 
}

description = `Fila \n\n **Tocando agora** [${client.player.getQueue(message).playing.title}](${client.player.getQueue(message).playing.url})\n\n` + client.player.getQueue(message) 

.tracks.map((track, i) => `**${i + 1}** - [${track.title}](${track.url}) **[ <@!${track.requestedBy.id}>/${track.requestedBy.id} ]**`)
.slice(i0, i1) 
.join("\n");

     
     embed.setDescription(description)
embed.setColor(color)


 

msg.edit(embed);
};
if (reaction._emoji.name === "➡") {
    if(!client.player.getQueue >= 0) {
     msg.delete()
 }
    
i0 = i0 + 10; 
i1 = i1 + 10;
 page = page + 1; 
 if (i1 > client.player.getQueue(message) + 10) { 
return msg.delete(); 
} 

if (!i1 || i0) { 
return msg.delete();
 }

 description = `Fila \n\n **Tocando agora** [${client.player.getQueue(message).playing.title}](${client.player.getQueue(message).playing.url})\n\n` + client.player.getQueue(message) 

.tracks.map((track, i) => `**${i + 1}** - [${track.title}](${track.url}) **[ <@!${track.requestedBy.id}>/${track.requestedBy.id} ]**`)

.slice(i0, i1) 

.join("\n");
    
embed.setDescription(description)
embed.setColor(color)
 msg.edit(embed); 

} 

if (reaction._emoji.name === "❌") { 
return msg.delete(); 
} 

 await reaction.users.remove(message.author.id);

 });

 }
exports.config = {
    name: "queue",
    aliases: ['fila']
}