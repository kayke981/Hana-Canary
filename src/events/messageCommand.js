const {prefix, color} = require('../config/json/config.json');
const {Collection} = require('discord.js');
const {findBestMatch} = require('string-similarity');
const user = require('../mongoDB/user.js');
const guild = require('../mongoDB/guild.js');

module.exports = async (client) => {
client.on('message', async (message) => {
    try {
if (message.author.bot) return;    
if (message.channel.type == 'dm') return;
if (!message.content.toLowerCase().startsWith(prefix)) return;
        
        let botban = await client.db.get(`blacklist`)
        
           if(botban.includes(message.author.id)) return;
        
        user.findOne({ User: message.author.id}, async (err, data) => {
         
            if(!data) {
                let userID = new user({
                    User: message.author.id,
                    Tag: message.author.tag,
                    Daily: 0,
                    DailyTime: null,
                    Reps: 0,
                    RepTime: null,
                    AboutMe: `Olá, eu sou ${message.author.tag.replace('   ', ' ')}, sou muito incrível! Você pode mudar essa mensagem escrevendo "${prefix}aboutme"`,
                    LinkBackground: `https://cdn.discordapp.com/attachments/795130563916595270/843704152684756994/images_6.png`
                })
                userID.save();
           }
        })
        
        guild.findOne({ Guild: message.guild.id }, async (err, data) => {

            if(!data) {

                let guildID = new guild({
                    Guild: message.guild.id,
                    Name: message.guild.name,
                    Vip: false
                })
                guildID.save();
            }
        })
        
   
    //verificar se tomou ban no bot
        const args = message.content        .trim()        .slice(prefix.length)        .split(/ +/g);    
const command = args.shift().toLowerCase();   
const commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        
        const cmds = message.content.split(' ')[0].slice(prefix.length)

        const {bestMatch, bestMatchIndex} = findBestMatch(command, client.commands.map((a) => a.config.name.slice("\n") || a.config.aliases.join("\n")))
       if(!commandFile) {        
           if(bestMatchIndex > 21) {
            return message.inlineReply(`🤔 **|** O comando não existe, digite \`${prefix}help\`\nMas talvez você quis dizer \`${prefix}${bestMatch.target}\``).then(msg => {
               setTimeout(() => {
                   msg.delete()
               }, 3600)
            })
        } 
           if(bestMatchIndex < 21) {
        return message.inlineReply(`🤔 **|** O comando não existe, digite \`${prefix}help\``).then(msg => {
               setTimeout(() => {
                   msg.delete()
               }, 3600)
            })
        }
            } else {
          if (!client.cooldowns.has(commandFile.name)) {
            client.cooldowns.set(commandFile.name, new Collection());

        }

        const now = Date.now(); 

        const timestamps = client.cooldowns.get(commandFile.name); 

        const cooldownAmoun = (5) * 1000;
        let cooldownAmount = (timestamps.has(message.author.id)? (Number(cooldownAmoun)) + 4000:cooldownAmoun)
            

        if (timestamps.has(message.author.id)) { 
            
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount; 

          if (now < expirationTime) { 
              
              if(client.gatilhos.has(message.author.id)) {
                  let time = client.gatilhos.get(message.author.id)
                 if(time > 35) {
                     
                     client.gatilhos.delete(message.author.id)
                     
                     await client.db.set(`motivo-${message.author.id}`, 'fez uma raid no bot para tentar derruba-la')
                await client.db.push(`blacklist`, message.author.id)
                let motivo = await client.db.get(`motivo-${message.author.id}`)
                
               return message.author.send(`**Você foi banida(o) de me usar, provalvelmente você fez algo, como spamar comandos meus e etc..., o motivo do ban foi \`${motivo}\`\nE sim, foi permanente o ban**`)
                     

                 }
              }
              
              let quantidade = (client.gatilhos.has(message.author.id)?client.gatilhos.get(message.author.id):0)
              
              client.gatilhos.set(message.author.id, quantidade + 1)

            const timeLeft = (expirationTime - now) / 1000; 

          return  message.inlineReply(`😑 **|** você está usando comando rápido demais, espere ${timeLeft.toFixed(1)} segundos`)
              }
        }
 timestamps.set(message.author.id, now);      
                
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        setTimeout(() => {

            client.gatilhos.delete(message.author.id)
        }, 120000);
    
    if(!botban) {
        await client.db.push(`blacklist`, client.user.id)
        await client.db.set(`motivo-${client.user.id}`, 'automático')
        }
    
   let icon = (!message.guild.iconURL()?'https://cdn.discordapp.com/attachments/795130563916595270/838503065836584960/PSX_20210502_165304.jpg':message.guild.iconURL())
    
    client.shard.broadcastEval(`
(async () => {
let channel = this.channels.cache.get("838173419374641204")
const webhooks = await channel.fetchWebhooks();

const webhook = webhooks.first();

let embed = {
color: "#5B00FF",
author: {
 name: \`Log de comandos | (${message.guild.name}/${message.guild.id})\`,
icon_url: \`${icon}\`,
},
thumbnail: {
url: \`${icon}\`,
},
fields: [
{
name: \`Usuário:\`,
value: \`(\\\`${message.author.tag}/${message.author.id}\\\`)\`,
},
{
name: \`Comando usado:\`,
value: \`${message.content}\`,
},
{
name: \`Canal:\`,
value: \`(\\\`${message.channel.name}/${message.channel.id}\\\`)\`,
},
{
name: \`Link da mensagem:\`,
value: \`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}\`
},
],
timestamp: new Date(),
footer: {
text: \`${message.author.id}\`,
icon_url: \`${message.author.displayAvatarURL()}\`, 	
},
}

webhook.send({embeds: [embed] })
})()`, 0)
    
    console.log(`Comando\n(${message.author.tag}/${message.guild.id}) - ${message.content} guild - (${message.guild.name}/${message.guild.id}`)

commandFile.run(client, message, args);
  }
    } catch (err) {
            message.inlineReply(`Ocorreu erro, o erro: ${err}`)

        console.log(err)
            }
        })
    
    }
