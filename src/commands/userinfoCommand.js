const {MessageEmbed} = require('discord.js');
const moment = require("moment")
require("moment-duration-format");
const {color} = require('../config/json/config.json');

exports.run = async (client, message, args) => {
    moment.locale('pt-br');
    
    let use = message.mentions.users.first() || (!isNaN(args[0])? await client.users.fetch(args[0]):message.author)
   let dono = ""
    if(use.id === message.guild.owner.id) {
       dono = ':crown:'
    }
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
    
    let entrada = ""
    
    let member;
    if(message.guild.members.cache.get(use.id)) {
        member = message.mentions.members.first() || (!isNaN(args[0])?await message.guild.members.cache.get(args[0]):message.member)
        entrada = `\n📆 **Entrou aqui há**\n\`${moment.duration(Date.now() - member.joinedTimestamp).format("y[ anos] M[ meses] d[ dias] h[ horas]")}\``
    }
    
    let embed = new MessageEmbed()
    .setTitle(`${dono}${flags} ${use.username}`)
    .setDescription(`#️⃣ **Tag**\n\`${use.tag}\`\n🔢 **ID**\n\`${use.id}\`\n📆 **Conta criada há**\n\`${moment.duration(Date.now() - use.createdTimestamp).format("y[ anos] M[ meses] d[ dias] h[ horas]")}\`${entrada}`)
    .setThumbnail(use.displayAvatarURL({dynamic: true, size: 2048, format: 'png'}))
    .setColor(color)
    
    message.inlineReply(message.author, embed)
}
exports.config = {
    name: "userinfo",
    aliases: ["infouser"]
    }