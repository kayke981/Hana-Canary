const Discord = require('discord.js');
const config = require('../../config.json');


module.exports = (client) => {
  client.on('message', (message) => {
    if(message.channel.type == 'dm') return;
    if(message.author.bot) return;
let botban = await client.db.get(`blacklist`)
if(!botban.includes(message.author.id)) return;
if (!client.cooldowns.has(commandFile.name)) {
            client.cooldowns.set(commandFile.name, new Discord.Collection());

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
        
  if(message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
    const embed = new Discord.MessageEmbed()
    .setTitle('<:paste:794205638120570911> <a:SH_da_seta:783516413448159313> Prefixo')
    .setDescription(`<:user:793984556197740606> <a:SH_da_seta:783516413448159313> Olá ${message.author}!\n
<:information:793890482068914228> <a:SH_da_seta:783516413448159313> Meu prefixo é \`${config.prefix}\``)
    .setColor(config.color)
    message.inlineReply(embed);
  }
  })
}

