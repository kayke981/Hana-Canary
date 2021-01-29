const Discord = require('discord.js');

exports.run = async (client, message, args) => {

let papel = [

    'você ganhou, eu joguei pedra e você papel',
    'eu ganhei, eu joguei tesoura e você papel',
    'deu empate, eu joguei papel e você papel',

]

let pedra = [

    'você ganhou, eu joguei tesoura e você pedra',
    'eu ganhei, eu joguei papel e você pedra',
    'deu empate, eu joguei pedra e você pedra',

]

let tesoura = [
    
    'você ganhou, eu joguei papel e você tesoura',
    'eu ganhei, eu joguei pedra e você tesoura',
    'deu empate, eu joguei tesoura e você tesoura',

]

let pe = pedra[Math.floor(Math.random() * pedra.length)]

let te = tesoura[Math.floor(Math.random() * tesoura.length)]

let pa = papel[Math.floor(Math.random() * papel.length)]

const embed = new Discord.MessageEmbed()
.setTitle(`**Pedra, papel e tesoura**`)
.setDescription(`Olá ${message.author}, parece que quer jogar pedra papel e tesoura comigo, certo? se sim basta reagir as reações abaixo\n✊ - \`pedra\`\n🤚 - \`papel\`\n✌️ - \`Tesoura\`\n\n**Para mais informações, escreva hc!ppt info**`)
.setColor('#B600FF')
.setFooter(`Usado por ${message.author.tag} ID: ${message.author.id}`)

const pedr = new Discord.MessageEmbed()
.setTitle(`**Pedra, papel, tesoura**`)
.setDescription(`${pe}`)
.setColor('#B600FF')

const pape = new Discord.MessageEmbed()
.setTitle(`**Pedra, papel, tesoura**`)
.setDescription(`${pa}`)
.setColor('#B600FF')

const tesour = new Discord.MessageEmbed()
.setTitle(`**Pedra, papel, tesoura**`)
.setDescription(`${te}`)
.setColor('#B600FF')

var msg = await message.inlineReply(embed)
msg.react('✊')
const collector = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '✊' && x.id == message.author.id, {max: 1, time: 60000})
collector.on('collect', async (r) => {
    msg.edit(pedr)
})

msg.react('🤚')
const collecto = msg.createReactionCollector((reactio, d) => reactio.emoji.name === '🤚' && d.id == message.author.id, {max: 1, time: 60000})
collecto.on('collect', async (r) => {
    msg.edit(pape)
})

msg.react('✌️')
const collec = msg.createReactionCollector((reacti, c) => reacti.emoji.name === '✌️' && c.id == message.author.id, {max: 1, time: 60000})
collec.on('collect', async (r) => {
    msg.edit(tesour)
})

}
exports.config = {
    name: 'ppt',
    aliases: ['pedrapapeltesoura', 'jogarppt'],
    category: 'diver'
}