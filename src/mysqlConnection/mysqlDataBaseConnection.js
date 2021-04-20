module.exports = async (client) => { 
const c = require('colors') 
const mysql = require('mysql'); 
let connection = mysql.createConnection({
 host: 'ip', 
port: 'porta', 
user: 'usuário', 
password: 'senha', 
database: 'database' 
}); 
connection.connect(function(err) { 
if (err) { 
console.error(c.red('erro ao conectar ' + err.stack));
 return; 
} 
console.log(c.green('[DATABASE MYSQL CONNECTED] conectado ao id ' + connection.threadId)); 
client.mysql = connection; 
}); 
let poolCluster = mysql.createPoolCluster(); 
poolCluster.add('NOME1', 'nome1Config'); 
poolCluster.add('NOME2', 'nome2Config'); 
poolCluster.getConnection('Wumpus', function(err, err) { 
if(err) { 
console.error(c.red('erro ao conectar ao cluster', err.stack)) 
return; 
} 
console.log(c.green('[CLUSTER CONNECTED] cluster conectado')) 
})
poolCluster.getConnection('NOME', function(err, err) { 
if(err) { 
console.error(c.red('erro ao conectar ao cluster', err.stack)) 
return; 
} 
console.log(c.green('[CLUSTER CONNECTED] cluster conectado')) 
}) 
}
