const Discord = require('discord.js');
const mongoose = require('mongoose');
const bot = require(`./index.js`);
const colors = require('colors');

mongoose.connect("url", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, colors.brightRed("[ERRO]" + colors.brightWhite(" erro ao conectar a databse"))));
db.on('open', () => console.log(colors.brightGreen('[DATABASE CONNECTED]' + colors.brightWhite(' Databse conectada'))));

db.on('open', () => {
const {channel} = require(`./index.js`);
const webhook = new Discord.WebhookClient('id', 'token');

const embed = new Discord.MessageEmbed()
.setTitle(`**Hana Canary**`)
.setDescription(`**[DATABASE CONNECTED] database conectada com sucesso**`)
.setColor(`#FF0000`)

webhook.send(embed)
});
