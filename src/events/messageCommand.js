const config = require('../../config.json');
const Discord = require('discord.js');
const stringS = require('string-similarity');

module.exports = (client) => {
client.on('message', async (message) => { 
if (message.author.bot) return;    
if (message.channel.type == 'dm') return;
if (!message.content.toLowerCase().startsWith(config.prefix)) return;
    //verificar se tomou ban no bot
    
if(client.cooldown.has(message.author.id)) {

let authorTime = client.cooldown.get(message.author.id);

if(Date.now() >= authorTime.timeout) {

    client.cooldown.delete(message.author.id)

} else {

let time = ms(authorTime.timeout - (Date.now() - authorTime.date))

 return message.inlineReply(`😑 calma, faltam **${time.seconds} segundos** restantes para usar o comando`)
}

} else {

  client.cooldown.set(message.author.id, {
date: Date.now(),
timeout: Date.now() + 3210
});
}

    const cmds = message.content.split(' ')[0].slice(config.prefix.length)
        const {bestMatch} = stringS.findBestMatch(cmds, client.commands.map((a) => a.config.name))
        
    let botban = await client.db.get(`blacklist`)
    let motivo = await client.db.get(`motivo`)
    //quando n tiver IDs, tem q colocar qualquer um ID, pode ser até mesmo do bot
    if(!botban) {
        await client.db.push(`blacklist`, client.user.id)
        }
    
    if(botban.includes(message.author.id)) return;
    if(!client.cooldown.get(message.author.id).timeout) {
const args = message.content        .trim()        .slice(config.prefix.length)        .split(/ +/g);    
const command = args.shift().toLowerCase();   
const commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    
     if(!cmds) return;
            if(cmds.includes("@everyone")) return;
            if(cmds.includes('`')) return;
            if(!commandFile) return message.channel.send(`o comando \`${cmds}\` não existe, mas você não quis dizer \`${bestMatch.target}\``)
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
