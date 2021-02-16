const Discord = require('discord.js');
const m = require('moment');

exports.run = async (client, message, args) => {
    
    const region = { 
        brazil: 'Brasil', 
        europe: 'Europa', 
        hongkong: 'Hong Kong',
        india: 'Índia', 
        japan: 'Japão', 
        russia: 'Rússia', 
        singapore: 'Singapore', 
        southafrica: 'Africa do Sul', 
        sydney: 'sydney',
        uscentral: 'US Central',    
        useast: 'US Leste', 
        ussouth: 'US Sul', 
        uswest: 'US Oeste'
    };



    let serverInfo = message.guild;

    if(Number(args[0])) {

       serverInfo = client.guilds.cache.get(args[0])
        };
    
    if(!serverInfo) return message.inlineReply(`:x: | Não encontrei o server com o ID **\`${args[0]}\`**`)
    
    let allRegion = region[serverInfo.region.replace(/-/g, '')]
    
    let criado = m(serverInfo.createdAt).format('LLLL');
    
    let entrei = m(serverInfo.joinedAt).format('LLLL');
   
    let texto = serverInfo.channels.cache.filter(m => m.type === 'text').size
    
    let voz = serverInfo.channels.cache.filter(m => m.type === 'voice').size
    
    let icon = serverInfo.iconURL({ dynamic: true })
    
    
   const semIcon = new Discord.MessageEmbed()
 .setThumbnail('https://cdn.discordapp.com/attachments/785232738437169165/810988917212971008/PSX_20210207_234030.jpg')
   .setTitle(`${serverInfo.name}`)
 .setDescription(`**Nome**\n\`${serverInfo.name}\`\n**ID**\n\`${serverInfo.id}\`\n**Dona(o)**\n\`${serverInfo.owner.user.tag}\`\n(${serverInfo.owner.id})\n**Região**\n\`${allRegion}\`\n**Canais(${Number(voz) + Number(texto)})**\n**Voz**\n\`${voz}\`\n**Texto**\n\`${texto}\`\n**Membros**\n\`${serverInfo.memberCount}\`\n**Criado em**\n\`${criado}\`\n**Entrei nesse server em**\n\`${entrei}\``)
   .setColor('#B600FF')
   
   if(!icon) return message.inlineReply(semIcon)

    

   const embed = new Discord.MessageEmbed()
 .setThumbnail(icon)
   .setTitle(`${serverInfo.name}`)
 .setDescription(`**Nome**\n\`${serverInfo.name}\`\n**ID**\n\`${serverInfo.id}\`\n**Dona(o)**\n\`${serverInfo.owner.user.tag}\`\n(${serverInfo.owner.id})\n**Região**\n\`${allRegion}\`\n**Canais(${Number(voz) + Number(texto)})**\n**Voz**\n\`${voz}\`\n**Texto**\n\`${texto}\`\n**Membros**\n\`${serverInfo.memberCount}\`\n**Criado em**\n\`${criado}\`\n**Entrei nesse server em**\n\`${entrei}\``)
   .setColor('#B600FF')

   

   message.inlineReply(embed)

}

exports.config = {
    name: 'serverinfo',
    aliases: ['server'],
    category: 'util'
}
