const config = require('../../config.json');
const Discord = require('discord.js');
module.exports = (client) => {
client.on('guildMemberAdd', async (member) => {
    const peaceHolders = {
    '{member}': member.user.username,
    '{@member}': member.user.toString(),
    '{guild}': member.guild.name,
    '{guild.id}': member.guild.id,
    '{memberCount}': member.guild.members.filter(m => m.user.bot !== true).size,
    '{botCount}': member.guild.members.filter(m => m.user.bot !== false).size
    }
    
    const peaceReq = new RegExp(Object.keys(peaceHolders).join('|'), 'ig')
    let channel = await client.db.get(`welcome-${member.guild.id}`)
    
    if(channel === null) return;
    
    const embed = new Discord.MessageEmbed()
    .setTitle(`**Bem vindo**`)
 .setDescription(config.frases.welcome.replace(peaceReq, match => peaceHolders[match]))
    
    client.channels.cache.get(channel).send(embed)
    });
}
