const discord = require('discord.js');
const db = require('quick.db');
module.exports.run = async (client, message, args) => {
		if (
			![
				'id'
			].includes(message.author.id)
		)
			return message.reply('Só meus devs podem usar);
		let code = args.slice(0).join(' ');
		if (code === 'client.token') return message.reply('QI isso?');
		
		if (code === 'message.channel.send(`${client.token}`)') return message.reply(`Quer um sorvete?`);
		if (code === 'message.inlineReply(`${client.token}`)') return message.reply(`Você tá de sacanagem né?`);
		
		try {
			let ev = require('util').inspect(eval(code));
			if (ev.length > 1950) {
				ev = ev.subtr(0, 1950);
			}
			let embed = new discord.MessageEmbed()
				.setColor('RANDOM')
				.setDescription(`Resposta:\n\`\`\`${ev}\`\`\``);
			message.inlineReply(embed);
		} catch (err) {
			let erro = new discord.MessageEmbed()
				.setColor('#B600F')
				.setDescription(`Eu detectei um erro:\n\`\`\`diff\n - ${err}\`\`\``);
			message.inlineReply(erro);
		}
	}
	exports.config = {
		name: 'eval',
		aliases: ['ev', 'e', 'cmd'],
		category: 'dev'
		}
