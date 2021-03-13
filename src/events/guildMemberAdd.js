const Discord = require('discord.js');
module.exports = (client) => {
client.on('guildMemberAdd', async (member) => {
    let channel = await client.db.get(`welcome-${member.guild.id}`)
    
    if(channel === null) return;
    
    const embed = new Discord.MessageEmbed()
    .setTitle(`**Bem vindo**`)
 .setDescription(`**${member.user}\`(${member.user.tag})\`Bem vindo ao servidor ${member.guild.name}, atualmente estamos com ${member.guild.memberCount} membros**`)
    
    client.channels.cache.get(channel).send(embed)
    });
}
