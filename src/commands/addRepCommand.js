exports.run = async (client, message, args) => {

const eco = require('../mongoDB/user.js');

    const ms = require('parse-ms');

    

    let amount = 1

    let timeout = 84600000;

   const user = message.mentions.users.first()

    try {

   if(!isNaN(args[0])) {

       user = client.users.fetch(String(args[0]))

}

   } catch (err) {

       message.inlineReply(`O usuário não existe`)

       }
    
    if(!user) return message.inlineReply(`Mencione ou coloque o ID do usuário`)

       const data =  await eco.findOne({ User: message.author.id })

const dataUser = await eco.findOne({User: user.id})

                   if(!data) return message.inlineReply(`O usuário <@!${user.id}>(\`${user.tag}/${user.id}\`) não está registrado em minha database`)
    if(!dataUser) return message.inlineReply(`O usuário <@!${user.id}>(\`${user.tag}/${user.id}\`) não está registrado em minha database`)

            if(data.RepTime !== null && timeout - (Date.now() - data.RepTime) > 0) {

            let time = ms(timeout - (Date.now() - data.RepTime))

                          

                          message.inlineReply(`Você ja deu reps, tente novamente em **${time.hours} horas ${time.minutes} minutos ${time.seconds} segundos**`)

                

        } else {

            await eco.findOneAndUpdate({User: user.id}, {$set: {

Reps: dataUser.Reps + amount

}})

       await eco.findOneAndUpdate({User: message.author.id}, {$set: {

RepTime: Date.now()

}})

 message.channel.send(`<@!${user.id}>(\`${user.tag}/${user.id}\`), ${message.author}(\`${message.author.tag}/${message.author.id}\`) deu uma reputação para você, agora você tem **${Number(data.Reps) + 1} reps**`)

       

            }

    

            }

exports.config = {

    name: "rep",

    aliases: ['addrep', 'reputação']

}

