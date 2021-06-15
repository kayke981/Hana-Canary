const {MessageEmbed} = require('discord.js');
const {color, shards, versão} = require('../config/json/config.json');

exports.run = async (client, message, args) => {
    
    let botperm = await client.db.get(`botperm`)
    
    if(!botperm) {
        client.db.push(`botperm`, client.users.cache.get('392087996821667841'))
                       }
    
    if(!botperm.includes(message.author.id)
      ) 
        return message.inlineReply(`Apenas para pessoas especiais`)
    
    if(args.includes('mongo')) return message.inlineReply('NO')
    if(args.includes('token')) return message.inlineReply('NO')
    
if(!args.length) return message.channel.send("Da um eval ai meu patrão")

    try {      
    let code = await eval(args.join(" "));      
    if (typeof code !== 'string')
        code = await require('util').inspect(code, { depth: 0 }); 
        
        let embedEval = new MessageEmbed()    
    .setDescription(`📩 Entrada \`\`\`js\n${args.join(" ")}\`\`\`\n🚩 Saída \`\`\`js\n${code.slice(0, 1010)}\n\`\`\``)
        .setColor(color)
        .setFooter(`Versão ${versão} • shards ${shards}`)
        
        message.channel.send(embedEval)
    
    } catch(e) {      
    message.channel.send(`\`\`\`js\n${e}\n\`\`\``);   
    };

}
exports.config = {
name: 'eval',
aliases: ['ev', 'e', 'cmd']
}
//Do adg, https://github.com/yADGithub