const guildSchema = require('../mongoDB/guild.js');

module.exports = async (client) => {
client.on('guildCreate', async (guild) => {
    
    guildSchema.findOne({ Guild: guild.id }, async (err, data) => {
if(err) return console.log(err)
            if(!data) {

                let guildID = new guildSchema({
                    Guild: guild.id,
                    Name: guild.name,
                    Vip: false
                })
                guildID.save();
            }
        })
    
    
    
    let icon = (!guild.iconURL()?'https://cdn.discordapp.com/attachments/795130563916595270/838503065836584960/PSX_20210502_165304.jpg':guild.iconURL())
    
    client.shard.broadcastEval(`
(async () => {
let channel = this.channels.cache.get("818539587538386964")
const webhooks = await channel.fetchWebhooks(); 		
const webhook = webhooks.first();

let embed = {
color: "#5B00FF",
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
webhook.send({embeds: [embed] })
})()`, 0)
    });
};