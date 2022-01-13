const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order',{
    completed:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    product:{
        type: Sequelize.ARRAY(Sequelize.TEXT),
        deafultValue: []
    },
    total:{
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
    },
})

module.exports = Order
