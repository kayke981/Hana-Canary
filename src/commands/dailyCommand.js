exports.run = async (client, message, args) => {
const eco = require('../mongoDB/user.js');
    const ms = require('parse-ms');
    
    let amount = Math.floor(Math.random() * 2000) + 500 * 2
    let timeout = 84600000;
    const user = await eco.findOne({User: message.author.id})
   if(!user) {
new eco ({
User: message.author.id,
Tag: message.author.tag,
Daily: 0,
DailyTime: null,
Reps: 0,
RepTime: null,
AboutMe: `Olá, eu sou ${message.author.tag.replace('   ', ' ')}, sou muito incrível! Você pode mudar essa mensagem escrevendo "${prefix}aboutme"`,
LinkBackground: `https://cdn.discordapp.com/attachments/795130563916595270/843704152684756994/images_6.png`
}).save()
        } else {
            eco.findOne({ User: message.author.id }, async (err, data) => {
            if(data.DailyTime !== null && timeout - (Date.now() - data.DailyTime) > 0) {
            let time = ms(timeout - (Date.now() - data.DailyTime))
                          
                          message.inlineReply(`Você ja coletou seu daily, tente novamente em **${time.hours} horas ${time.minutes} minutos ${time.seconds} segundos**`)
        } else {
            data.Daily = data.Daily + amount;
            data.DailyTime = Date.now();
            data.save();
            message.inlineReply(`Você ganhou ${amount} de créditos.`)
        }       
            }) 
            }
    }
exports.config = {
    name: "daily",
    aliases: ['diário', 'diaro']
}