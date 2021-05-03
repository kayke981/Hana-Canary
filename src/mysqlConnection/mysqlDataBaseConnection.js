const c = require('colors')
const mysql = require('mysql');

var mySqlConnection = () => {

  const connection = mysql.createConnection({
        host: 'ip',

        port: 'porta',

        user: 'user',

        password: 'senha',

        database: 'db'
  })
  connection.connect(function(err) {
    if (err) {
      console.error('[ DataBase - MySql ] Ocorreu um erro ao tentar se conectar: \n\n' + err.stack);
      return;
    }
  });
  return connection;
}
module.exports = async (client) => {
    client.mysql = mySqlConnection
}
