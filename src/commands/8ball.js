const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	
	let ball = [
		
		'não sei',
		'sim',
		'provavelmente sim',
		'não',
		'provavelmente não',
		'talvez sim',
		'talvez não',
		'siga seu coração',
		'não posso falar isso agr',
		'isso pode machucar outras pessoas,  melhor nem falar',
		'como assim?',
		'eu, sei nada que eu falo faz sentido, :(',
		'também queria saber',
		'eu sei lá',
		'nem teho resposta para isso',
		
		]
		
		let pergunta = args.join(' ');

		const usar = new Discord.MessageEmbed()
		.setTitle(`**8ball**`)
		.setDescription(`❓\`hc!gru\` \nServe para responder perguntas, algumas vezes não tem uma resposta certa, como se fosse um 8ball de verdade \n\n❗ **Como usar?** \`hc!gru <texto>\`\n**Motivos para não funcionar**\n\`Se no canal que você usou tiver 10 webhooks, ele não vai responder\`\n\n✅ **Sinônimos** \n\n \`8b\`, \`8bola\`, \`pergunta\`, \`b\`, \`ball\`, \`8ball\` `)
		.setColor("#B600FF")

		const mais = new Discord.MessageEmbed()
		.setTitle(`**Funções dos argumentos**`)
		.setDescription(`**Argumentos**\n\`<>\` - obrigatório\n\`()\` - opcional`)
		.setColor('#B600FF')


		if(!pergunta) return message.inlineReply(usar).then(msg => {
			msg.react("❓");
			const collector = msg.createReactionCollector((reaction, x) => reaction.emoji.name === '❓' && x.id == message.author.id, {time: 60000})
    collector.on('collect', async (r) => {
        msg.edit(mais)
    });
	});

	let random = ball[Math.floor(Math.random() * ball.length).toString(16)]

	const perms = new Discord.MessageEmbed()
	.setTitle(`**8ball**`)
	.setDescription(`**Pergunta**\n\`${pergunta}\`\n<:Capturadetela20210127164018:804073511043203093>**Resposta**\n\`${random}\``)
	.setColor('#B600FF')
	.setFooter(`triste, modo pobre, não tenho permissão de criar webhooks`)

		if(!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return message.inlineReply(perms)

		
		const webhook = await message.channel.createWebhook('qualquer-nome', {
			avatar: 'url'
		})

		.send(`${message.author}, ${random}`)

		setTimeout(() => {
			delete()
		}, 2 * 1000)
	}
exports.config = {
	name: '8ball',
	aliases: ['8b', '8bola', 'pergunta', 'b', 'ball', 'gru'],
	category: 'diver'
	}
