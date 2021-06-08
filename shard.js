const { token } = require("./config.json");

const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', {
  totalShards: 4, 
  token: token
})

manager.on('shardCreate', shard => {
  console.log(`[SHARD] Iniciando shard ${shard.id}`)
})

manager.spawn().catch(e => console.log("Erro " + e))
