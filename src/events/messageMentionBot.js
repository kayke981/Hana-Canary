const {Collection} = require('discord.js');
const {color, prefix} = require('../config/json/config.json');
const mention = 'mention';


module.exports = async (client) => {
  client.on('message', async (message) => {
    if(message.channel.type == 'dm') return;
    if(message.author.bot) return;
       if(message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
  
let botban = await client.db.get(`blacklist`)
if(botban.includes(message.author.id)) return;
if (!client.cooldowns.has(mention)) {
            client.cooldowns.set(mention, new Collection());

        }

        const now = Date.now(); 

        const timestamps = client.cooldowns.get(mention); 

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
        
    message.channel.send(`Olá ${message.author}, meu prefixo é \`${prefix}\`, então digite \`${prefix}help\``);
           }
      })
}

