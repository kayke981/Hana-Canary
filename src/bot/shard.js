const {token, shards} = require("../config/json/config.json");

const {ShardingManager} = require('discord.js');

const manager = new ShardingManager('./src/bot/index.js', {
totalShards: Number(shards), 
token: token,
respawn: true
});

manager.on('shardCreate', shard => {
console.log(`[SHARD] Iniciando shard ${shard.id}`)
});
manager.spawn();
