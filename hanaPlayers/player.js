const Discord = require('discord.js');
const {color} = require('../config.json');
module.exports = async (client) => {
                         
    const error = new Discord.MessageEmbed()
    .setDescription(`❌ **|** **Erro ao tocar a musica, mande o comando novamente**`)
    .setColor(color)
    
    const botDisconnect = new Discord.MessageEmbed()
    .setDescription(`📤 **|** **Fui desconectado pois as musicas estão paradas**`)
    .setColor(color)
    
    const channelEmpety = new Discord.MessageEmbed()
    .setDescription(`🔊 **|** **Tem ninguém no canal de voz, então eu sai**`)
    .setColor(color)
    
    const queueEnd = new Discord.MessageEmbed()
    .setDescription(`🗂 **|** **A fila acabou, irei sair do canal de voz**`)
    .setColor(color)
    
    const { Player } = require("discord-player");

// Create a new Player (you don't need any API Key)
const player = new Player(client);
// To easily access the player
  client.player = player
    
    client.player.on('trackStart', (message, track) => {
        
        let mention = `<@!${track.requestedBy.id}>`
        
      const embed = new Discord.MessageEmbed()
      .setDescription(`🎶 **|** **tocando agora** [${track.title}](${track.url})`)
      .setColor(color)
      message.channel.send(mention, embed)
    });

    client.player.on('searchCancel', (message, query, tracks) => message.channel.send(error)) 
    client.player.on('noResults', (message, query) => { 
        
        const error1 = new Discord.MessageEmbed()
   .setDescription(`❌ **|** **Não encontrei o resultado** \`${query}\` **no YouTube**`)
   .setColor(color)
        
        message.channel.send(error1)
  }) // Send a message when the music is stopped 
      client.player.on('queueEnd', (message, queue) => {
        message.channel.send(queueEnd)
          });
        client.player.on('channelEmpty', (message, queue) => { 
            message.channel.send(channelEmpety)
           }) 
            client.player.on('botDisconnect', (message) => { message.channel.send(botDisconnect)
                                               });
    
    client.player.on('trackAdd', (message, queue, track) => { 
        
        const mention = `<@!${track.requestedBy.id}>`
        
        const addPlaylist = new Discord.MessageEmbed()
    .setDescription(`🎶 **|** [${track.title}](${track.url}) foi adicionado a fila [ ${message.author} ]`)
        .setColor(color)
        
        message.channel.send(mention, addPlaylist)
        });
    
    //erros
    client.player.on('error', (error, message) => {

    switch(error){
        case 'NotPlaying':
            message.channel.send('Eu ja estou tocando música nesse server')
            break;
        case 'UnableToJoin':
            message.channel.send('ocorreu um erro ao entrar, verifique se eu tenho permissão de entrar no canal de voz')
            break;
        case 'LiveVideo':
message.channel.send('Lives do YouTube não são suportadas')
            break;
        case 'VideoUnavailable':
            message.channel.send('Esse vídeo não está disponível!');
            break;
        default:
            message.channel.send(`😭 algum erro ocorreu, Erro: ${error}`)
    }
        });

}