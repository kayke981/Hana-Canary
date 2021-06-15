const {MessageEmbed} = require('discord.js');
const {color, versão, prefix} = require('../config/json/config.json');

exports.run = async (client, message, args) => {
   let kayake = await client.users.fetch("392087996821667841")
const embed = new MessageEmbed()
.setTitle(`**Ajuda ${client.user.username}**`)
.setDescription('> prefixo: `' + prefix + '`\n> qualquer dúvida, use o `' + prefix + 'invite` para entrar no meu servidor de suporte\n> meu criador: `' + kayake.tag + '`\n\n👮‍♂️ **Moderação**\n`unmute` **|** `mute` **|** `lock` **|** `unlock` **|** `ban` **|** `kick` **|** `unban` **|** `addemoji`\n🤣 **Diversão**\n`kiss` **|** `hug` **|** `pat` **|** `slap` **|** `petpet`\n📖 **Úteis**\n`ping` **|** `avatar` **|** `botinfo` **|** `lembrete` **|** `say` **|** `addrep` **|** `perfil` **|** `aboutme` **|** `invite` **|** `userinfo` **|** `emoji` **|** `serverinfo` **|** `servericon` **|** `shardinfo`\n🎉 **Sorteio**\n`giveaway start` **|** `giveaway reroll` **|** `giveaway stop`\n🎶 **Música**\n`play` **|** `stop` **|** `skip` **|** `queue` **|** `misc pause` **|** `misc resume` **|** `misc volume` **|** `misc loop`\n💸 **Economia**\n`casar` **|** `pay` **|** `atm` **|** `daily` **|** `divorce`')
.setColor(color)
.setFooter(`versão ${versão}`)
.setTimestamp()

message.inlineReply(message.author, embed)
}
exports.config = {
    name: "help",
    aliases: ["comandos", "commands", "ajuda"]
}