const Discord = require('discord.js');

module.exports = async (client) => {
client.on('guildDelete', async (guild) => {
    
    let icon = (!guild.iconURL()?'https://cdn.discordapp.com/attachments/795130563916595270/838503065836584960/PSX_20210502_165304.jpg':guild.iconURL())
    
    client.shard.broadcastEval(`let channel = this.channels.cache.get("818539587538386964")

let embed = {
color: "#b600ff",
author: {
 name: \`Sai de um servidor | (${guild.name}/${guild.id})\`,
icon_url: \`${icon}\`,
},
thumbnail: {
url: \`${icon}\`,
},
fields: [
{
name: \`Nome:\`,
value: \`(\\\`${guild.name}/${guild.id}\\\`)\`,
},
{
name: \`Dono:\`,
value: \`(\\\`${guild.owner.user.tag}/${guild.owner.id}\\\`)\`,
},
{
name: \`Total de membros\`,
value: \`${guild.memberCount}\`,
},
],
timestamp: new Date(),
footer: {
text: \`${guild.id}\`, 
icon_url: \`${icon}\`, 	
},
}
channel.send({embed: embed })`, 2)
    
    client.mysql().query(`DELETE FROM guild WHERE id = '${guild.id}'`, async (err) => {
        if(err) {
            console.log(err)
        }
    })
    /*const newServer = new Discord.MessageEmbed()
    .setAuthor(`Sai de um servidor (${guild.name}/${guild.id}`, guild.iconURL())
    .setDescription(`**Nome do servidor**\n\`${guild.name}\`\n**ID**\n\`${guild.id}\`**Shard**\n\`${guild.shard.id}\`**Dono**\n(\`${guild.owner.tag}/${guild.owner.id}\`)\n**Total de membros**\n\`${guild.totalMembers}\``)
    .setThumbnail(guild.iconURL())
    
    let channel = await client.channels.cache.get("818539587538386964")
    if(!channel) return;
    channel.send(newServer)*/
    /*let icon = (!guilds.iconURL()?'https://cdn.discordapp.com/attachments/795130563916595270/838503065836584960/PSX_20210502_165304.jpg':guilds.iconURL())
    
    client.shard.broadcastEval(`let channel = this.channels.cache.get("id do canal")

let embed = {
color: "#b600ff",
author: {
 name: \`Sai de um servidor | (${guilds.name}/${guilds.id})\`,
icon_url: \`${icon}\`,
},
thumbnail: {
url: \`${icon}\`,
},
fields: [
{
name: \`Nome:\`,
value: \`(\\\`${guilds.name}/${guilds.id}\\\`)\`,
},
{
name: \`Dono:\`,
value: \`(\\\`${guilds.owner.user.tag}/${guilds.owner.id}\\\`)\`,
},
{
name: \`Total de membros\`,
value: \`${guilds.memberCount}\`,
},
],
timestamp: new Date(),
footer: {
text: \`${guilds.id}\`, 
icon_url: \`${icon}\`, 	
},
}
channel.send({embed: embed })`, 2)*/
    });
};
