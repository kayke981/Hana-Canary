const {MessageEmbed} = require('discord.js');
const {color} = require('../config/json/config.json');

exports.run = async (client, message, args) => {
    
    const embed = new MessageEmbed()
    .setTitle(`**Convite**`)
    .setDescription(`**Quer me adicionar em um servidor? então clique [aqui](https://discord.com/oauth2/authorize?client_id=795076645827903569&scope=bot&permissions=8589803511)**\n\n**Meu servidor de suporte você pode entrar clicando [aqui](https://discord.gg/2hBhSZMX4Q)**`)
    .setColor(color)
    
    message.inlineReply(message.author, embed)
}
exports.config = {
    name: 'invite',
    aliases: ['convite', 'invi', 'botinvite', 'botconvite']
}