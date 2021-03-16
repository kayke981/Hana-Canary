const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    
    
    let botperm = await client.db.get(`botperm`)
    
    if(!botperm) {
        client.db.push(`botperm`, client.users.cache.get('392087996821667841'))
                       }
    
    if(!botperm.includes(message.author.id)
      ) 
        return message.inlineReply(`Apenas para pessoas especiais`)
        
        let data = await client.db.get(`botperm`)
        
        let ban1;
    let motivo;
    
     if(data.length > 10){
            bot1 = 10
        }else{
            bot1 = data.length
        }
        data = data.sort((a, b) => b.data - a.data)

        
        if(!data) return message.inlineReply(`NGM BANIDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`)
        let content = "";
        
        for(let i = 0; i < bot1; i++) {
            let user = await client.users.fetch(data[i]) || null;
            content += `${i+1} - \`${user.tag}(${user.id})\`\n`
}
const embed = new Discord.MessageEmbed()
.setTitle(`**Perms**`)
.setDescription(content)
.setColor('#b600ff')

message.inlineReply(embed)
}
exports.config = {
name: "listbotperm",
aliases: ['listbpm']
}
