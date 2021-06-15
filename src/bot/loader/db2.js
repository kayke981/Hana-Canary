const {mongo} = require('../../config/json/config.json');
module.exports = async (client) => {
const {connect} = require('mongoose');

connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('Conectada a MongoDB')
    })
.catch(async () => {
    console.log('Erro ao conectar a mongoDB')
    })
    }