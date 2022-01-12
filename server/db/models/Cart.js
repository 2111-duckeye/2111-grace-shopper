const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {});

module.exports = Cart;

Cart.prototype.priceTotal = function () {
	//Return the sum price of all items in cart
};

//Methods for deleteing relationship between user and product
//AKA When you remove a product from the cart

//Method for creating relationship between user and product
//AKA when you add a product to the cart
