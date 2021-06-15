const ms = require('ms');

exports.run = async (client, message, args) => {
    
    let time = args[0]
    if(!time || isNaN(ms(time)))  return message.inlineReply(`Coloque um tempo valido, exemplo 1d, d para dias, h para horas, m para minutos, s para segundos`)

        if(!time.includes('d') && (!time.includes('h')) && (!time.includes('m')) && (!time.includes('s'))) return message.inlineReply('Coloque `d` para dias, `h` para horas, `m` para minutos, `s` para segundos')
    let lembrete = args.slice(1).join(" ")
    if(!lembrete) return message.inlineReply(`Coloque qual lembrete você quer`)
    
    message.inlineReply(`Lembrete: \`${lembrete}\`, você irá ser avisado daqui a ${time.replace('d', ' dia').replace('h', ' hora').replace('m', ' minuto').replace('s', ' segundo')}`)
    
    setTimeout(async() => {
        message.channel.send(`${message.author}, Lembrete de hoje: \`${lembrete}\`, tempo ${time.replace('d', ' dia').replace('h', ' hora').replace('m', ' minuto').replace('s', ' segundo')}`)
    }, ms(time))
}
exports.config = {
    name: "lembrete",
    aliases: ["lembrar"]
}