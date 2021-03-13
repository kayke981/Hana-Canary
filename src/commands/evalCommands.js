const Discord = require('discord.js');
const config = require('../../config.json');

exports.run = async (client, message, args) => {
    
    let botperm = await client.db.get(`botperm`)
    
    if(!botperm) {
        client.db.push(`botperm`, client.users.cache.get('392087996821667841'))
                       }
    
    if(!botperm.includes(message.author.id)
      ) 
        return message.inlineReply(`Apenas para pessoas especiais`)
    
if(!args.length) return message.channel.send("Da um eval ai meu patrão")

    try {      
    var ram = process.memoryUsage().rss/1024/1024;     
        let db = client.db;
        let msgch = message.channel;
        let msgin = message.inlineReply;
    let c = client;
    let bot = client;
    let msg = message;
    let m = msg;
    let code = await eval(args.join(" "));      
    if (typeof code !== 'string') 
    code = await require('util').inspect(code, { 
    depth: 0 
    });      
        const embedEval = new Discord.MessageEmbed()    
    .setDescription(`📩 Entrada \`\`\`js\n${args.join(" ")}\`\`\`\n🚩 Saída \`\`\`js\n${code.slice(0, 1010)}\n\`\`\``)
        .setColor(config.color)
        .setFooter(`Versão ${config.versão} • shards ${config.shards}`)
        
        message.channel.send(embedEval)
    
    } catch(e) {
        const brReg = new RegExp(`\n`);
    message.channel.send(`\`\`\`diff\n- ${e.message.replace(brReg, '\n- ')}\n\`\`\``);   
    };

}
exports.config = {
name: 'eval',
aliases: ['ev', 'e', 'cmd']
}
//Do adg, https://github.com/yADGithub
