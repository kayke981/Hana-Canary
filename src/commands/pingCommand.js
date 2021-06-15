const {shards} = require('../config/json/config.json');
const moment = require("moment")
require("moment-duration-format")

exports.run = async (client, message, args) => {
  
 let promise = [
client.shard.fetchClientValues('ws.ping')
];
Promise.all(promise)
.then(async results => {
let Ping = results[0].reduce((acc, totalPing) => acc + totalPing, 0);

let svPing = Date.now() - message.createdTimestamp
    
    
    let ping = await client.db.ping()
    message.inlineReply(`**|** ${message.author} pong\n:satellite: **|** **Shards:**(.../...)\n:stopwatch: **|** **Latência da API:** \`...ms\` **(**\`...\`**)**\n:zap: **|** **Ping:** \`...ms\` **(**\`...\`**)**\n🌐 **|** **Ping da DataBase:**\n➥📖 **|** **read:** \`...ms\` **(**\`...\`**)**\n➥✏ **|** **write:** \`...ms\` **(**\`...\`**)**\n🌏 **|** **Ping da shard:** \`...ms\` **(**\`...\`**)**`).then(msg => {
    
    msg.edit(`🏓 **|** ${message.author} pong\n:satellite: **|** **Shards:**(${message.guild.shard.id}/0)\n:stopwatch: **|** **Latência da API:** \`${svPing}ms\` **(**\`${(svPing < 1000?'0.':'')}${moment.duration(svPing).format("y[anos] M[meses] d[dias] h[horas] m[minutos] s.S[s]")}\`**)**\n:zap: **|** **Ping:** \`${Ping}ms\` **(**\`${(Ping < 1000?'0.':'')}${moment.duration(Ping).format("y[anos] M[meses] d[dias] h[horas] m[minutos] s.S[s]")}\`**)**\n🌐 **|** **Ping da DataBase:**\n➥📖 **|** **read:** \`${ping.read}ms\` **(**\`${(Ping < 1000?'0.':'')}${moment.duration(ping.read).format("y[anos] M[meses] d[dias] h[horas] m[minutos] s.S[s]")}\`**)**\n➥✏ **|** **write:** \`${ping.write}ms\` **(**\`${(Ping < 1000?'0.':'')}${moment.duration(ping.write).format("y[anos] M[meses] d[dias] h[horas] m[minutos] s.S[s]")}\`**)**\n🌏 **|** **Ping da shard:** \`${client.ws.ping}ms\` **(**\`${(Ping < 1000?'0.':'')}${moment.duration(client.ws.ping).format("y[anos] M[meses] d[dias] h[horas] m[minutos] s.S[s]")}\`**)**`)
        });
            })
    }
exports.config = {
    name: 'ping',
    aliases: ['pingar']
}