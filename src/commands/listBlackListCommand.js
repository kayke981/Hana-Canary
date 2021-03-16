const Discord = require('discord.js');

exports.run = async (client, message, args) => {
        
        let data = await client.db.get(`blacklist`)
        
        let ban1;
    let motivo;
    
     if(data.length > 10){
            ban1 = 10
        }else{
            ban1 = data.length
        }
        data = data.sort((a, b) => b.data - a.data)

        
        if(!data) return message.inlineReply(`NGM BANIDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`)
        let content = "";
        
        for(let i = 0; i < ban1; i++) {
            let user = await client.users.fetch(data[i]) || null;
             let dat = await client.db.get(`motivo-${user.id}`, [i])
            let motiv = dat;
            content += `${i+1} - \`${user.tag}(${user.id})\` - **motivo:** ${motiv}\n`
}
       
            const embed = new Discord.MessageEmbed()

.setTitle(`Banidos`)

.setDescription(content)

.setColor("#b600ff")

message.inlineReply(embed)

    }
exports.config = {
    name: 'listblacklist',
    aliases: ['listbl']
    }
