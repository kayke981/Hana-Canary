const {MessageEmbed} = require('discord.js');
const config = require('../../config.json');


module.exports = (client) => {
  client.on('message', (message) => {
  if(message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
    const embed = new MessageEmbed()
    .setTitle('<:paste:794205638120570911> <a:SH_da_seta:783516413448159313> Prefixo')
    .setDescription(`<:user:793984556197740606> <a:SH_da_seta:783516413448159313> Olá ${message.author}!\n
<:information:793890482068914228> <a:SH_da_seta:783516413448159313> Meu prefixo é \`${config.prefix}\``)
  }
  })
}

