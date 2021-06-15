const {MessageEmbed} = require('discord.js');
const {color} = require('../../config/json/config.json');
module.exports = async (client) => {
                         
    const error = new MessageEmbed()
    .setDescription(`<:emoji_25:840764422153699339> **|** **Erro ao tocar a musica, mande o comando novamente**`)
    .setColor(color)
    
    const botDisconnect = new MessageEmbed()
    .setDescription(`<:emoji_24:840764402277416991> **|** **Fui desconectado pois as musicas estão paradas**`)
    .setColor(color)
    
    const channelEmpety = new MessageEmbed()
    .setDescription(`<:emoji_26:840765375359614997> **|** **Tem ninguém no canal de voz, então eu sai**`)
    .setColor(color)
    
    const queueEnd = new MessageEmbed()
    .setDescription(`<:emoji_23:840761161485910057> **|** **A fila acabou, irei sair do canal de voz**`)
    .setColor(color)

// Create a new Player (you don't need any API Key)
    
    client.player.on('trackStart', (message, track) => {
        
        let mention = `<@!${track.requestedBy.id}>`
        
      const embed = new MessageEmbed()
      .setDescription(`<:emoji_18:840698540027150387> **|** **tocando agora** [${track.title}](${track.url})`)
      .setColor(color)
      message.channel.send(mention, embed)
    });

    client.player.on('searchCancel', (message, query, tracks) => message.channel.send(error)) 
    client.player.on('noResults', (message, query) => { 
        
        const error1 = new MessageEmbed()
   .setDescription(`<:emoji_25:840764422153699339> **|** **Não encontrei o resultado** \`${query}\` **no YouTube**`)
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
        
        const addPlaylist = new MessageEmbed()
    .setDescription(`<:emoji_18:840698540027150387> **|** [${track.title}](${track.url}) foi adicionado a fila [ ${message.author} ]`)
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