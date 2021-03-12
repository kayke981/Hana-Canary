const config = require("../config.json")
module.exports = async (client) => {	const { Database } = require('quickmongo');
                                                                                            try {
    client.db = new Database(config.mongo); client.db.on('ready', () => {
    console.log('[DATABASE CONNECTED] Database conectada com sucesso.'.brightGreen);	 
    });
                                                                                                                                                } catch(e) {
                                                                                                                                                    console.log('[DATABASE ERROR] Falha ao se conectar, erro:'.red + e) 
                                                                                                                                                };
    };

//do ADG, https://github.com/yADGithub
