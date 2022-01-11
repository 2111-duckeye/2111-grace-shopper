const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    imageURL:{
        type: Sequelize.STRING,
        defaultValue: "https://cdn-icons-png.flaticon.com/512/1303/1303440.png"
    },
    description:{
        type: Sequelize.TEXT
    },
    price:{
        type:Sequelize.FLOAT,
        allowNull: false
    },

})

module.exports = Product
