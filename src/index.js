const express = require('express');
require('./reply.js')//puxando a api de resposta
const app = express();
app.get('/', (request, response) => {
	const ping = new Date();
	ping.setHours(ping.getHours() - 3);
	console.log(
		`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`
	);
	response.sendStatus(200);
});
app.listen(process.env.PORT);

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const db = require('quick.db');
const fs = require('fs');
const colors = require('colors');
const shard = require('./shards.js');
const m = require('moment');
const webhook = new Discord.WebhookClient('id', 'token');
const mongoose = require('./mongoose.js');
const pretty = require('pretty-ms');

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const handler = require('./handler.js');
handler.loadCommand(client.commands, client.aliases, 'comando de nº{number} carregado: ${cmd}')

client.on("message", message => {
    
if(message.content === `<@!${client.user.id}>`) message.inlineReply(`Meu prefixo é ${config.prefix}`)
  
if(message.content === `<@${client.user.id}>`) message.inlineReply(`Meu prefixo é ${config.prefix}`)

});

client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;
      const args = message.content
        .trim()
        .slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();
    const commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
if(commandFile) commandFile.run(client, message, args);
});

client.on('ready', () => {

const m = require('moment');
const colors = require('colors');
const webhook = new Discord.WebhookClient('id', 'token');
const channel = client.channels.cache.get('canal');
const webhooks = channel.fetchWebhooks();
const pretty = require('pretty-ms');
const moment = require('moment');
require('moment-duration-format');

moment.locale('pt-br')

const Hana = moment(client.createdAt).format('DD');

let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;

	const status = [
    {name: 'Jogando alegria pelo ar', type: 'PLAYING'},
    {name: 'Meu criador me fazendo', type: 'WATCHING'},
    {name: 'Seu texto aqui', type: 'LISTENING'},
    {name: 'seu texto aqui', type: 'STREAMING', url: 'url da twitch'}
  ]
  function Presence() {
    const base = status[Math.floor(Math.random() * status.length)]
    client.user.setActivity(base)
  }
  Presence();
  setInterval(() => Presence(), 6100)

	let tempo = m(Date.now()).format('LTS');
	let temp = m(Date.now()).format('L');

			
	client.user.setStatus('online').catch(console.error);
	console.log(colors.brightRed(`---------------------------[CONNECTED AT ${tempo}]---------------------------`));

	const z = new Discord.MessageEmbed()
	.setTitle('**Hana Canary**')
	.setDescription(`**[RESTART] fui desligada mas fui ligada de novo, voltei \`[${temp}, ${tempo}]\`**`)
	.setColor('#FF0000')

	webhook.send(z)

	const n = new Discord.MessageEmbed()
	.setTitle('**Hana Canary**')
	.setDescription(`**[CONNECTED] Conectado a Hana Canary\n[SERVERS CONECTADOS] ${client.guilds.cache.size}\n[STATUS] Onlinee!**`)
	.setColor('#FF0000')

	webhook.send(n)

});

let ngc = 'canal'

client.on("guildCreate", guild => {
const p = new Discord.MessageEmbed()

.setTitle(`Entrei em um server`)
.setDescription(`**Nome\n\`${guild.name}\`\n\nMembros\n\`${guild.memberCount}\`\n\nID\n\`${guild.id}\`\n\nDono\n${guild.owner}\n\nId do dono**\n\`${guild.owner.id}\``)
.setColor('#B600FF')
    client.channels.cache.get(ngc).send(p)
    
    guild.owner.send(`Olá, sou a Hana Canary, bot de testes  meu prefixo é \`hc!\``)
});

client.on("guildMemberAdd", (member) => {
	let chx = db.get(`welcome_${member.guild.id}`);

	if(chx === null) {

	return;
	}

let titulo = db.get(`titulo_${member.guild.id}`)
	
let texto = db.get(`teste_${member.guild.id}`)//pegar a var

let footer = db.get(`footer_${member.guild.id}`)
	
	
 texto = texto.replace(/{id}/g, member.user.id).replace(/{@user}/g, member.user).replace(/{member}/g, member.guild.memberCount).replace(/{nicktag}/g, member.user.tag).replace(/{nickname}/g, member.user.username).replace(/{guildname}/g, member.guild.name)

 titulo = titulo.replace(/{id}/g, member.user.id).replace(/{@user}/g, member.user).replace(/{member}/g, member.guild.memberCount).replace(/{nicktag}/g, member.user.tag).replace(/{nickname}/g, member.user.username).replace(/{guildname}/g, member.guild.name)

footer = footer.replace(/{id}/g, member.user.id).replace(/{@user}/g, member.user).replace(/{member}/g, member.guild.memberCount).replace(/{nicktag}/g, member.user.tag).replace(/{nickname}/g, member.user.username).replace(/{guildname}/g, member.guild.name)
	

	const embed = new Discord.MessageEmbed()
	.setAuthor(member.user.username, member.user.avatarURL())
	.setColor("#B600FF")
	.setTitle(titulo)
	.setDescription(texto)
	.setFooter(footer)

	
client.channels.cache.get(chx).send(embed);

const text = new Discord.MessageEmbed()
.setTitle(titulo)
.setDescription(`**Seja Bem vindo ao \`${member.guild.name}\`**`)
.setFooter(footer)
.setColor('#B600FF')


const titul = new Discord.MessageEmbed()
.setTitle(`**Seja Bem Vindo**`)
.setDescription(texto)
.setFooter(footer)
.setColor('#B600FF')


const foote = new Discord.MessageEmbed()
.setTitle(titulo)
.setDescription(texto)
.setFooter(`ID do usúario: ${member.user.id} Tag: ${member.user.tag}`)
.setColor('#B600FF')


const tudo = new Discord.MessageEmbed()
.setTitle(`**Seja Bem Vindo**`)
.setDescription(`**Seja Bem vindo ao \`${member.guild.name}\`**`)
.setFooter(`ID do usúario: ${member.user.id} Tag: ${member.user.tag}`)
.setColor('#B600FF')


if(texto === null) return client.channels.cache.get(chx).send(text);

if(titulo === null) return client.channels.cache.get(chx).send(titul);

if(footer === null) return client.channels.cache.get(chx).send(foote);

if(texto === null || titulo === null || footer === null) return client.channels.cache.get(chx).send(tudo);

});

client.on("guildDelete", guild => {
const b = new Discord.MessageEmbed()

.setTitle(`Sai de um server`)
.setDescription(`**Nome\n\`${guild.name}\`\n\nMembros\n\`${guild.memberCount}\`\n\nID\n\`${guild.id}\`\n\nDono\n${guild.owner}\n\nId do dono**\n\`${guild.owner.id}\``)
.setColor('#B600FF')
    client.channels.cache.get(ngc).send(b)
    
    guild.owner.send(`Pena que me tirou do seu server, se algo não te agradou me desculpe`)
});



client.login(`token`);
