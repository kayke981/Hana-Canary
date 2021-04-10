const config = require("./config.json");

const {ShardingManager} = require('discord.js');

try {
const manager = new ShardingManager('./index.js', {
totalShards: 4, 
token: config.token
});

manager.on('shardCreate', shard => {
console.log(`[SHARD] Iniciando shard ${shard.id}`)
});
manager.spawn();
} catch (err) {
    console.log('erro' + err)
}