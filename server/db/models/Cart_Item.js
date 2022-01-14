const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./Product');
const Order = require('./Order')

const Cart_Item = db.define('Cart_Item', {
	total: {
		type: Sequelize.DECIMAL(10,2),
		defaultValue: 0
	},
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
});

Order.belongsToMany(Product, { through: Cart_Item });
Product.belongsToMany(Order, { through: Cart_Item });

Cart_Item.prototype.priceTotal = function () {
	//Return the sum price of all items in cart
};

module.exports = Cart_Item

//Methods for deleteing relationship between user and product
//AKA When you remove a product from the cart

//Method for creating relationship between user and product
//AKA when you add a product to the cart
