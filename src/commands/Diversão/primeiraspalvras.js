const Discord = require("discord.js")
const jimp = require("jimp")

exports.run = async (client, message, args) => {

        let img = jimp.read("https://cdn.discordapp.com/attachments/672188275963854879/709074434283143208/PrimeirasPalavras2.png")
        if (!args[0]) return message.reply("**Indique as Primeiras Palavras do Bebe.**")
        img.then(image => {
            jimp.loadFont(jimp.FONT_SANS_32_BLACK).then(font => {
                image.resize(485, 450)
                image.print(font, 10, 230, args.join(" "), 330)
                image.getBuffer(jimp.MIME_PNG, (err, i) => {
                    message.channel.send({files: [{ attachment: i, name: "PrimeirasPalavras.png"}]})
                })
            })
        })
    }
    exports.config = {
        name: 'primeiraspalavras',
        aliases: ['firstwords'],
        category: 'diver'
    }