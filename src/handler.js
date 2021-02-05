const fs = require('fs');
const Asciitable = require('ascii-table');
const Discord = require('discord.js');

 let cmds = []
 const colors = require('colors')
exports.loadCommand = function (commands, aliases, log)  {
fs.readdir("./commands/", (err, files) => {

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  console.log('carregando mais de ' + jsfile.length + ' comandos!!!')
  if (jsfile.length <= 0) {
    return console.log("[LOGS] não acho comandos :|");
  }

  jsfile.forEach((f, i) => {
    
    let pull = require(`./commands/${f}`);
    commands.set(pull.config.name, pull);

    pull.config.aliases.forEach(alias => {

      aliases.set(alias, pull.config.name);
    });
    console.log(`${log.replace(/{cmd}/g, f).replace(/{number}/g, i += 1)}`.green);
    cmds.push({name: pull.config.name, n: i , ali: pull.config.aliases.join(',')});
  });
  const table = new Asciitable('comandos')
  table.setHeading('número', 'nome', 'aliases')
  cmds.forEach(i => {
   table.addRow(i.n, i.name, i.ali)
  })
  console.log(colors.cyan(table.toString()))

  const {channel} = require(`./index.js`);
  const webhook = new Discord.WebhookClient('803633539853189190', 'ziQeFgwjQw1OJQuj-NJnDp5oVJt7dcCYW6tp8oYJXLFGRHp79EVixucEeSBU-cKeyvdF');
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`**Hana Canary**`)
  .setDescription(`**[COMMANDS] comandos carregados**`)
  .setColor(`#FF0000`)
  
  webhook.send(embed)

});

}
exports.getInfo = function() {
const files = fs.readdirSync("./commands")
let jsfile = files.filter(f => f.split(".").pop() === "js");
let frase = [];
    jsfile.forEach((f, i) => {
      let pull = require(`./commands/${f}`)
      frase.push(`${pull.config.category} - ${pull.config.name}|${pull.config.aliases.join('|')}`)
    })
    return frase;
}
exports.getCategory = function(category) {
  let arr = [];
const files = fs.readdirSync("./commands")
let jsfile = files.filter(f => f.split(".").pop() === "js");
jsfile.forEach((f, i) => {
  const pull = require(`./commands/${f}`)
  let c = pull.config.category;
  if(c !== category) return;
  else {
  arr.push(`\`${pull.config.name}\``)
  }
})
return arr;
}
