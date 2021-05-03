const Discord = require('discord.js');

module.exports = async (client) => {
client.on('guildCreate', async (guild) => {
   let connection = client.mysql()
    let sql;
let ID = guild.id
connection.query(`SELECT * FROM guild WHERE id = '${guild.id}'`, async (err, rows) => {
if(err) {
console.log(err)
}
if(rows.length < 1) {
sql = `INSERT INTO guild (id) VALUES('${guild.id}')`
}
connection.query(sql, async (err) => {
if(err) console.log(err)
    
   if(guild.channels.cache.size >= 2) { client.channels.cache.get(guild.channels.cache.map((a) => a.id)[2]).send(`Servidor registrado a minha database \`(${guild.name}/${guild.id})\``)
                           } else if(!guild.channels.cache.size < 2) {
                          return;
                           }
    
});
});
    
    let icon = (!guild.iconURL()?'https://cdn.discordapp.com/attachments/795130563916595270/838503065836584960/PSX_20210502_165304.jpg':guild.iconURL())
    
    client.shard.broadcastEval(`let channel = this.channels.cache.get("id do canal")

let embed = {
color: "#b600ff",
author: {
 name: \`Novo servidor | (${guild.name}/${guild.id})\`,
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
name: \`Shard:\`,
value: \`${guild.shard.id}\`,
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
    });
};
