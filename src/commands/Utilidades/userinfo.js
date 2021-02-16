const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (client, message, args) => {
   
    
    let user = message.mentions.users.first()
     
     
    
    moment.locale('pt-br')
    
    if(!args[0]) {
        user = message.author;
        }
    
    
    if(Number(args[0])) {
        user = await client.users.fetch(args[0])
        };
    if(!user) { message.guild.members.cache.forEach(member => { 
        if(member.displayName === args.join(' ')) 
        user = member.user; 
                                                               }); 
               }; 
    if (!user) { message.guild.members.cache.forEach(member => { 
        if(member.displayName.toLowerCase().startsWith(args.join(' ').toLowerCase())) { 
            user = member.user; 
         };
       });
                };
    
    if(!user) return message.inlineReply(`:x: | Não encontrei o usuário`)
    
    const flags = user.flags.toArray()
    
    const flag = {
        
        HOUSE_BALANCE: '<:BFL_hypesquad_balance:808174423701717022>',
        VERIFIED_DEVELOPER: '<:dev:808175160543936513> ',
        HOUSE_BRAVERY: '<:bot_badgehypebravery:808175196401696780>',
        HOUSE_BRILLIANCE: '<:BFL_hypesquad_brilliance:808174544443146260>',
        HYPESQUAD_EVENTS: '<:hypesquad:808175142999818280>',
        BUGHUNTER_LEVEL_1: '<:Cfn_BotbugHunter_verd:808682675979943947>',
        BUGHUNTER_LEVEL_2: '<:y_Bug_Hunter_Gold:807288031248646164>',
        DISCORD_PARTNER: '<:ND_DiscordPartner:808682493380526090>',
        VERIFIED_BOT: '<:verified_bot:808692257242611788>'
    }
    
            const detectar = flags.map((b) => Object.keys(flag).includes(b) ? flag[b] : "").join(" ")
    
    let userCreate = moment(user.createdAt).format('LLLL')
    
    const sem = new Discord.MessageEmbed()
    .setTitle(`<:hero_wumpus:808176835514335273>${detectar}**${user.username}**`)
    .setDescription(`**TAG**\n\`${user.tag}\`\n**ID**\n\`${user.id}\`\n**Conta criada em:**\n\`${userCreate}\``)
    .setColor('#B600FF')
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setFooter(`Informações do ${user.tag}`)
    .setTimestamp()
    
    const bot = new Discord.MessageEmbed()
    .setTitle(`<:bot:808176872684912690>**${user.username}**`)
    .setDescription(`**TAG**\n\`${user.tag}\`\n**ID**\n\`${user.id}\`\n**Conta criada em:**\n\`${userCreate}\``)
    .setColor('#B600FF')
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setFooter(`Informações do ${user.tag}`)
    .setTimestamp()
    
    if(user.bot) return message.inlineReply(bot)
    
    if(Number(args[0])) {
       
        if(!message.guild.members.cache.find((m) => m.user.id === args[0])) return message.inlineReply(sem) 
        };
    
    let userJoinedAt = moment(message.guild.member(user).joinedAt).format('LLLL')
    
    
    const owner = new Discord.MessageEmbed()
    .setTitle(`:crown:<:hero_wumpus:808176835514335273>${detectar}**${user.username}**`)
    .setDescription(`**TAG**\n\`${user.tag}\`\n**ID**\n\`${user.id}\`\n**Conta criada em:**\n\`${userCreate}\`\n**Entrou em:**\n\`${userJoinedAt}\``)
    .setColor('#B600FF')
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setFooter(`Informações do ${user.tag}`)
    .setTimestamp()
    
    if(user.id === message.guild.owner.id) return message.inlineReply(owner)
    
    const embed = new Discord.MessageEmbed()
    .setTitle(`<:hero_wumpus:808176835514335273>${detectar}**${user.username}**`)
    .setDescription(`**TAG**\n\`${user.tag}\`\n**ID**\n\`${user.id}\`\n**Conta criada em:**\n\`${userCreate}\`\n**Entrou em:**\n\`${userJoinedAt}\``)
    .setColor('#B600FF')
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setFooter(`Informações do ${user.tag}`)
    .setTimestamp()
    
    
    
    message.inlineReply(embed)
}
exports.config = {
    name: 'userinfo',
    aliases: ['sobreconta', 'infoconta', 'infoaccount', 'user'],
    category: 'util'
};
