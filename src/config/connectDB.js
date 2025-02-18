// const sequelize = require('sequelize')
const {Sequelize} = require('sequelize')


const sequelize = new Sequelize('finalexample', 'root', null,{
    host:'localhost',
    dialect: 'mysql',
    logging: false
})

let connectDb = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been establish successfully');
    }catch (error) {
        console.error('Unable to connect to the DB', error)
    };
    
}

module.exports = connectDb