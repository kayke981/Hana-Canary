const config = require('../../config.json');
const Discord = require('discord.js');
const stringS = require('string-similarity');

module.exports = (client) => {
client.on('message', async (message) => { 
if (message.author.bot) return;    
if (message.channel.type == 'dm') return;
if (!message.content.toLowerCase().startsWith(config.prefix)) return;
    //verificar se tomou ban no bot

    const cmds = message.content.split(' ')[0].slice(config.prefix.length)
        const {bestMatch} = stringS.findBestMatch(cmds, client.commands.map((a) => a.config.name))
        
    let botban = await client.db.get(`blacklist`)
    let motivo = await client.db.get(`motivo`)
    //quando n tiver IDs, tem q colocar qualquer um ID, pode ser até mesmo do bot
    if(!botban) {
        await client.db.push(`blacklist`, client.user.id)
        }
    
    if(botban.includes(message.author.id)) return;
    if(!client.cooldown.has(message.author.id).timeout) {
const args = message.content        .trim()        .slice(config.prefix.length)        .split(/ +/g);    
const command = args.shift().toLowerCase();   
const commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    
     if(!cmds) return;
            if(cmds.includes("@everyone")) return;
            if(cmds.includes('`')) return;
            if(!commandFile) return message.channel.send(`o comando \`${cmds}\` não existe, mas você não quis dizer \`${bestMatch.target}\``)

if (!client.cooldowns. has(commandFile.name)) {
client.cooldowns.set(commandFile.name, new Discord.Collection());
}
const now = Date.now();
const timestamps = client.cooldowns.get(commandFile.name);
const cooldownAmoun = (5) * 1000;
let cooldownAmount = (timestamps.has(message. author.id)? (Number(cooldownAmoun)) + 4000:coo
if (timestamps.has(message. author.id)) {
const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
if (now < expirationTime) {
if(client.gatilhos.has(message. author.id)) {
let time = client.gatilhos.get(message. author.id)
if(time > 35) {
client.gatilhos.delete(message.author.id)
await client.db.set('motivo-${message.author.id}', 'fez uma raid no bot para t
await client.db.push("blacklist', message.author.id)
let motivo = await client.db.get('motivo-${message author.id}')
return message.author.send("**Você foi banida(o) de me usar, provalvelmente você fe
comandos meus e etc..., o motivo do ban foi \ '${motivo}\'\nE sim, foi permanente o ban**')
}
}
let quantidade = (client.gatilhos.has(message.author.id)?client.gatilhos.get(message.
client.gatilhos.set(message. author.id, quantidade + 1)
const timeLeft = (expirationTime - now) / 1000;
return message. inlineReply **|** você está usando comando rápido demais, espere ${ti
segundos)
}
}
timestamps.set(message. author.id, now);
setTimeout(( => timestamps.delete(message. author.id), cooldown Amount);
setTimeout(( => {
client.gatilhos.delete(message author.id)
}, 120000);

if(commandFile) {
    
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Log de comandos | ${message.guild.name}(${message.guild.id})`, message.guild.iconURL())
    .setDescription(`**Usuário:**\n\`${message.author.tag}(${message.author.id})\`\n**Comando usado**\n\`${message.content}\``)
    .setFooter(`ID ${message.author.id}`)
    .setTimestamp()
    .setColor(config.color)
    
    client.channels.cache.get("id do canal").send(embed)
commandFile.run(client, message, args);
}
}
});

}
