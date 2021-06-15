const {MessageEmbed} = require('discord.js');
const {color} = require('../config/json/config.json');
const user = require('../mongoDB/user.js');
exports.run = async (client, message, args) => {

            let splitArgs = args.join(" ").split(" | "),

		n = 0, m = 10, p = 0, page = 0, nn = 0, value, number = 0;

		

     user.find()

        	.sort([['Daily', 'descending']])

        	.exec(async (err, res) => {

            		let array = [],
                 
            		Return = false;
            		for (var i in res) {

					if(args[0] && ['local'].includes(args[0].toLowerCase())) {

                     if(!isNaN(args[1])) page = args[1]-1;
						if(message.guild.members.cache.get(res[i].User) && res[i].Daily) {

							let member = message.guild.members.cache.get(res[i].User);

							number++;

							

							if(member.id === message.author.id) p = `> **${Number(number)}**`;

							array.push(`> **${Number(number)} ${member.user.tag} - ${res[i].Daily}**`);

						} 

					}

				

					else {

                				await client.users.fetch(res[i].User).then(async (user) => {
                                    if(!isNaN(args[0])) page = args[0]-1	

							if(user.id === message.author.id) p = `> **${Number(i) + 1}**`;

							if(res[i].Daily) array.push(`> **${Number(i) + 1} ${user.tag} - ${res[i].Daily}**`);

                                   
                                 
                				}).catch(e => {

							array.push(`> **${Number(i) + 1} ????? - ${res[i].Daily}**`);

						})

					}

            		}

			if(page) {

				n = n + 10 * page;

				m = m + 10 * page;

			} 

         
			

			array = array.slice(n, m).join("\n")
         
         if(!array) return message.inlineReply(`Essa página não existe`)
   
         
         

      
         
  const embed = new MessageEmbed()

				.setColor(color)

				.setDescription("\n" + array + "\n")		
        message.inlineReply(message.author, embed)

     })
}
exports.config = {
    name: "top",
    aliases: ['rank']
    }