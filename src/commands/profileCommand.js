const { registerFont, loadImage, createCanvas} = require("canvas");
registerFont('./src/fonts/fonteLinda.ttf', { family: 'Hana' });
const user = require('../mongoDB/user.js');
const { MessageAttachment } = require('discord.js');
const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');
const moment = require("moment")
require("moment-duration-format")

exports.run = async (client, message, args) => {
    
    function addBreakLines(str, max) { 
max = max + 1; 
for (let i = 0; i < str.length / max; i++) { 
str = str.substring(0, max * i) + `\n` + str.substring(max * i, str.length); 
} 
return str; 
}
    
    let use = message.mentions.users.first() || (!isNaN(args[0])?await client.users.fetch(String(args[0])):message.author)

user.findOne({ User: use.id }, async (err, data) => {
       if(!data) return message.inlineReply(`O usuário <@!${use.id}>(\`${use.tag}/${use.id}\`) não está registrado em minha database`)
    let casadoID = "";
    if(data.CasadoID) {
let casadoI = await client.users.fetch(data.CasadoID)
casadoID = `casada(o) com ${casadoI.tag} há ${moment.duration(Date.now() - Number(data.CasadoTime)).format("y[y] M[m] d[d] h[h] m[min] s[s]")}`
        }
    const canvas = createCanvas(1440, 800);
    const ctx = canvas.getContext('2d');
const background2 = await loadImage(data.LinkBackground)
  ctx.drawImage(background2, 0, 65, 1440, 550);
const background = await loadImage(`https://cdn.discordapp.com/attachments/795130563916595270/843907419099758602/1621273630681.png`)
  ctx.drawImage(background, 0, 0, 1440, 800)
    
    ctx.font = '30px "Hana"';
  ctx.fillStyle = "#FFFFFF";
  await ctx.fillText(`CRÉDITOS`, 270, 175)
    ctx.font = '30px "Hana"';
  ctx.fillStyle = "#FFFFFF";
  await ctx.fillText(data.Daily, 280, 210)
    ctx.font = '50px "Hana"';
  ctx.fillStyle = "#FFFFFF";
  await fillTextWithTwemoji(ctx, use.username.replace('   ', ''), 40, 65)
    ctx.font = '25px "Hana"';
  ctx.fillStyle = "#FFFFFF";
  await fillTextWithTwemoji(ctx, casadoID, 230, 95)
    ctx.font = '30px "Hana"';
  ctx.fillStyle = "#FFFFFF";
  await ctx.fillText(`${data.Reps} REPS`, 270, 140)
    ctx.font = '22px "Hana"';
  ctx.fillStyle = "#FFFFFF";
  await fillTextWithTwemoji(ctx, addBreakLines(data.AboutMe), 5, 690)
    ctx.font = '35px "Hana"';
  ctx.fillStyle = "#FFFFFF";
await fillTextWithTwemoji(ctx, 'SOBRE MIM', 8, 650);

let flags;
     if(client.users.cache.get(use.id).flags == null) flags = ""

        else flags = client.users.cache.get(use.id).flags.toArray().join("")

          .replace("EARLY_VERIFIED_DEVELOPER", "<:dev:808175160543936513>")

            .replace("HOUSE_BRILLIANCE", "<:BFL_hypesquad_brilliance:808174544443146260>")
    .replace("VERIFIED_DEVELOPER", "")

            .replace("HOUSE_BRAVERY", "<:bot_badgehypebravery:808175196401696780>")

            .replace("HOUSE_BALANCE", "<:BFL_hypesquad_balance:808174423701717022>")

            .replace("EARLY_SUPPORTER", "<:emoji_28:844623646642798635>")

            .replace("VERIFIED_BOT", "<:verified_bot:808692257242611788>")

            .replace("PARTNERED_SERVER_OWNER", "<:ND_DiscordPartner:808682493380526090>")
            .replace("TEAM_USER", "")

            .replace("DISCORD_PARTNER", "")
.replace("HYPESQUAD_EVENTS", "<:hypesquad:808175142999818280>")
    .replace("BUGHUNTER_LEVEL_1", "<:Cfn_BotbugHunter_verd:808682675979943947>")
    .replace("BUGHUNTER_LEVEL_2", "<:y_Bug_Hunter_Gold:808682913944043542>")
    .replace("DISCORD_EMPLOYEE", "<:Cfn_Botstaff:808683709099802624>")
    .replace("SYSTEM", "")
    ctx.font = '55px "Hana"';
  ctx.fillStyle = "#FFFFFF";
await fillTextWithTwemoji(ctx, flags, 270, 659);
    
    const avatar = await loadImage(use.displayAvatarURL({dynamic: true, format: 'png', size: 1024}))
  ctx.beginPath();
ctx.strokeStyle = `#000000`;
ctx.arc(140, 220, 126, 0, Math.PI * 2);
ctx.fill();
ctx.lineWidth = 10;
ctx.stroke();
ctx.clip();
ctx.drawImage(avatar, 15, 95, 250, 250);

const attachment = new MessageAttachment(canvas.toBuffer(), 'perfil.png');

  message.inlineReply(message.author, attachment)
    


    })
}
exports.config = {
    name: "profile",
    aliases: ['perfil']
}